import { db } from "@/db";
import { booleanTypeEnum } from "@/db/schema/enums";
import {
  principleCreateSchema,
  principles,
  principleUpdateSchema,
} from "@/db/schema/marketing/principles";
import { requireRole } from "@/lib/access";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
import z from "zod";

export const principlesRouter = createTRPCRouter({
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
          ? eq(principles.isActive, isActive === "true" ? "true" : "false")
          : undefined,
        searchQuery
          ? or(
              ilike(principles.subtitle, `%${searchQuery}%`),
              ilike(principles.title, `%${searchQuery}%`),
              ilike(sql`principles.features::text`, `%${searchQuery}%`)
            )
          : undefined
      );

      const result = await db
        .select()
        .from(principles)
        .where(filters)
        .orderBy(
          asc(principles.isActive),
          asc(principles.order),
          asc(principles.title)
        );

      return result;
    }),
  create: protectedProcedure
    .input(principleCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      // const slug = await generateUniqueSlug(input.title, principles);

      const [principle] = await db
        .insert(principles)
        .values({
          title: input.title,
          subtitle: input.subtitle,
          iconUrl: input.iconUrl,
          isActive: "false",
        })
        .returning();

      if (!principle) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create principle.",
        });
      }
      return principle;
    }),

  update: protectedProcedure
    .input(
      principleUpdateSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { id, ...rest } = input;

      const [existing] = await db
        .select()
        .from(principles)
        .where(eq(principles.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Principle not found",
        });
      }

      const updateData: Partial<typeof principles.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.title) {
        updateData.title = rest.title;
      }
      if (rest.subtitle) updateData.subtitle = rest.subtitle;
      if (rest.iconUrl) updateData.iconUrl = rest.iconUrl;

      let orderUpdate: number | undefined = undefined;

      // ✅ Handle activation
      if (rest.isActive === "true" && existing.isActive === "false") {
        const [maxRow] = await db
          .select({ maxOrder: sql<number>`max(${principles.order})` })
          .from(principles)
          .where(eq(principles.isActive, "true"));

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
          .update(principles)
          .set({
            order: sql`${principles.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(principles.order, currentOrder),
              eq(principles.isActive, "true")
            )
          );
      }

      const [principle] = await db
        .update(principles)
        .set({
          ...updateData,
          order: orderUpdate ?? existing.order,
        })
        .where(eq(principles.id, id))
        .returning();

      if (!principle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Principle not found.",
        });
      }
      return principle;
    }),

  updateActiveAndOrder: protectedProcedure
    .input(
      z.object({
        principleId: z.string(),
        action: z.enum(["toggleActive", "up", "down"]),
        activate: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { principleId, action, activate } = input;

      const [principle] = await db
        .select()
        .from(principles)
        .where(eq(principles.id, principleId));

      if (!principle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Principle not found.",
        });
      }

      if (action === "toggleActive") {
        if (activate) {
          const activeCount = await db
            .select()
            .from(principles)
            .where(eq(principles.isActive, "true"));

          await db
            .update(principles)
            .set({
              isActive: "true",
              order: activeCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(principles.id, principleId));
        } else {
          const currentOrder = principle.order;
          await db
            .update(principles)
            .set({ isActive: "false", order: 0, updatedAt: new Date() })
            .where(eq(principles.id, principleId));

          await db
            .update(principles)
            .set({
              order: sql`${principles.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(principles.order, currentOrder),
                eq(principles.isActive, "true")
              )
            );
        }
      }

      if (action === "up" || action === "down") {
        if (principle.isActive !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only active principles can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = principle.order! + direction;

        const [targetPrinciple] = await db
          .select()
          .from(principles)
          .where(
            and(
              eq(principles.isActive, "true"),
              eq(principles.order, targetOrder)
            )
          );

        if (!targetPrinciple) return;

        await db
          .update(principles)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(principles.id, principle.id));
        await db
          .update(principles)
          .set({ order: principle.order })
          .where(eq(principles.id, targetPrinciple.id));
      }

      return true;
    }),

  getMaxOrder: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    await requireRole(userId, ["super_admin", "admin"]);

    const [result] = await db
      .select({ maxOrder: sql<number>`MAX(${principles.order}) AS INT` })
      .from(principles)
      .where(eq(principles.isActive, "true"));

    return result?.maxOrder ?? 0;
  }),
  remove: protectedProcedure
    .input(
      z.object({
        principleId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { principleId } = input;

      const principle = await db
        .select()
        .from(principles)
        .where(eq(principles.id, principleId))
        .then((res) => res[0]);

      if (!principle) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const currentOrder = principle.order ?? 0;

      const [deletedPrinciple] = await db
        .delete(principles)
        .where(eq(principles.id, principleId))
        .returning();

      if (!deletedPrinciple) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete principle.",
        });
      }

      if (principle.isActive === "true") {
        await db
          .update(principles)
          .set({
            order: sql`${principles.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(principles.order, currentOrder),
              eq(principles.isActive, "true")
            )
          );
      }

      return deletedPrinciple;
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
      const principle = await db.query.principles.findFirst({
        where: (p, { eq }) => eq(p.id, input.id),
      });

      if (!principle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Principle not found.",
        });
      }

      return principle;
    }),
});
