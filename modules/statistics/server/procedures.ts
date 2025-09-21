import { db } from "@/db";
import { booleanTypeEnum } from "@/db/schema/enums";
import {
  statisticCreateSchema,
  statistics,
  statisticUpdateSchema,
} from "@/db/schema/marketing/statistics";
import { requireRole } from "@/lib/access";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
import z from "zod";

export const statisticsRouter = createTRPCRouter({
  getFiltered: protectedProcedure
    .input(
      z.object({
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { isActive, searchQuery } = input;
      await requireRole(userId, ["super_admin", "admin"]);

      // Build filters dynamically
      const filters = and(
        isActive !== undefined
          ? eq(statistics.isActive, isActive === "true" ? "true" : "false")
          : undefined,
        searchQuery
          ? or(
              ilike(statistics.label, `%${searchQuery}%`),
              ilike(statistics.value, `%${searchQuery}%`),
              ilike(statistics.description, `%${searchQuery}%`)
            )
          : undefined
      );

      const result = await db
        .select()
        .from(statistics)
        .where(filters)
        .orderBy(
          asc(statistics.isActive),
          asc(statistics.order),
          asc(statistics.label)
        );

      return result;
    }),
  create: protectedProcedure
    .input(statisticCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      // const slug = await generateUniqueSlug(input.title, statistics);

      const [statistic] = await db
        .insert(statistics)
        .values({
          label: input.label,
          value: input.value,
          description: input.description,
          iconUrl: input.iconUrl,
          isActive: "false",
          order: 0,
        })
        .returning();

      if (!statistic) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create statistic.",
        });
      }
      return statistic;
    }),

  update: protectedProcedure
    .input(
      statisticUpdateSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { id, ...rest } = input;

      const [existing] = await db
        .select()
        .from(statistics)
        .where(eq(statistics.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Statistic not found",
        });
      }

      const updateData: Partial<typeof statistics.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.label) {
        updateData.label = rest.label;
      }
      if (rest.value) updateData.value = rest.value;
      if (rest.description) updateData.description = rest.description;
      if (rest.iconUrl) updateData.iconUrl = rest.iconUrl;
      if (rest.isActive) updateData.isActive = rest.isActive;

      let orderUpdate: number | undefined = undefined;

      // ✅ Handle activation
      if (rest.isActive === "true" && existing.isActive === "false") {
        const [maxRow] = await db
          .select({ maxOrder: sql<number>`max(${statistics.order})` })
          .from(statistics)
          .where(eq(statistics.isActive, "true"));

        const maxOrder = maxRow?.maxOrder ?? 0;
        orderUpdate = maxOrder + 1;
        updateData.isActive = "true";
      }

      // ✅ Handle deactivation
      if (rest.isActive === "false" && existing.isActive === "true") {
        const currentOrder = existing.order ?? 0;
        updateData.isActive = "false";
        orderUpdate = 0;

        console.log("AAA1");
        await db
          .update(statistics)
          .set({
            order: sql`${statistics.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(statistics.order, currentOrder),
              eq(statistics.isActive, "true")
            )
          );
      }

      const [statistic] = await db
        .update(statistics)
        .set({
          ...updateData,
          order: orderUpdate ?? existing.order,
        })
        .where(eq(statistics.id, id))
        .returning();

      if (!statistic) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Statistic not found.",
        });
      }
      return statistic;
    }),

  updateActiveAndOrder: protectedProcedure
    .input(
      z.object({
        statisticId: z.string(),
        action: z.enum(["toggleActive", "up", "down"]),
        activate: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { statisticId, action, activate } = input;

      const [statistic] = await db
        .select()
        .from(statistics)
        .where(eq(statistics.id, statisticId));

      if (!statistic) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Statistic not found.",
        });
      }

      if (action === "toggleActive") {
        if (activate) {
          const activeCount = await db
            .select()
            .from(statistics)
            .where(eq(statistics.isActive, "true"));

          await db
            .update(statistics)
            .set({
              isActive: "true",
              order: activeCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(statistics.id, statisticId));
        } else {
          const currentOrder = statistic.order;
          await db
            .update(statistics)
            .set({ isActive: "false", order: 0, updatedAt: new Date() })
            .where(eq(statistics.id, statisticId));

          await db
            .update(statistics)
            .set({
              order: sql`${statistics.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(statistics.order, currentOrder),
                eq(statistics.isActive, "true")
              )
            );
        }
      }

      if (action === "up" || action === "down") {
        if (statistic.isActive !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only active statistics can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = statistic.order! + direction;

        const [targetStatistic] = await db
          .select()
          .from(statistics)
          .where(
            and(
              eq(statistics.isActive, "true"),
              eq(statistics.order, targetOrder)
            )
          );

        if (!targetStatistic) return;

        await db
          .update(statistics)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(statistics.id, statistic.id));
        await db
          .update(statistics)
          .set({ order: statistic.order })
          .where(eq(statistics.id, targetStatistic.id));
      }

      return true;
    }),

  getMaxOrder: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    await requireRole(userId, ["super_admin", "admin"]);

    const [result] = await db
      .select({ maxOrder: sql<number>`MAX(${statistics.order}) AS INT` })
      .from(statistics)
      .where(eq(statistics.isActive, "true"));

    return result?.maxOrder ?? 0;
  }),
  remove: protectedProcedure
    .input(
      z.object({
        statisticId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { statisticId } = input;

      const statistic = await db
        .select()
        .from(statistics)
        .where(eq(statistics.id, statisticId))
        .then((res) => res[0]);

      if (!statistic) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const currentOrder = statistic.order ?? 0;

      const [deletedStatistic] = await db
        .delete(statistics)
        .where(eq(statistics.id, statisticId))
        .returning();

      if (!deletedStatistic) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete statistic.",
        });
      }

      if (statistic.isActive === "true") {
        await db
          .update(statistics)
          .set({
            order: sql`${statistics.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(statistics.order, currentOrder),
              eq(statistics.isActive, "true")
            )
          );
      }

      return deletedStatistic;
    }),

  getOneProtected: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const statistic = await db.query.statistics.findFirst({
        where: (p, { eq }) => eq(p.id, input.id),
      });

      if (!statistic) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Statistic not found.",
        });
      }

      return statistic;
    }),
});
