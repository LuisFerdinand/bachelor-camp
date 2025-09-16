import { db } from "@/db";
import { booleanTypeEnum } from "@/db/schema/enums";
import {
  highlightCreateSchema,
  highlights,
  highlightUpdateSchema,
} from "@/db/schema/marketing/highlights";
import { requireRole } from "@/lib/access";
import { generateUniqueSlug } from "@/lib/utils";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
import z from "zod";

export const highlightsRouter = createTRPCRouter({
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
          ? eq(highlights.isActive, isActive === "true" ? "true" : "false")
          : undefined,
        searchQuery
          ? or(
              ilike(highlights.subtitle, `%${searchQuery}%`),
              ilike(highlights.title, `%${searchQuery}%`),
              ilike(sql`highlights.features::text`, `%${searchQuery}%`)
            )
          : undefined
      );

      const result = await db
        .select()
        .from(highlights)
        .where(filters)
        .orderBy(desc(highlights.updatedAt));

      return result;
    }),
  create: protectedProcedure
    .input(highlightCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      // const slug = await generateUniqueSlug(input.title, highlights);

      const [highlight] = await db
        .insert(highlights)
        .values({
          title: input.title,
          subtitle: input.subtitle,
          iconUrl: input.iconUrl,
          features: input.features ?? [],
          isActive: "false",
        })
        .returning();

      if (!highlight) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create highlight.",
        });
      }
      return highlight;
    }),

  update: protectedProcedure
    .input(
      highlightUpdateSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { id, ...rest } = input;

      const [existing] = await db
        .select()
        .from(highlights)
        .where(eq(highlights.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Highlight not found",
        });
      }

      const updateData: Partial<typeof highlights.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.title) {
        updateData.title = rest.title;
      }
      if (rest.subtitle) updateData.subtitle = rest.subtitle;
      if (rest.iconUrl) updateData.iconUrl = rest.iconUrl;
      if (rest.features) updateData.features = rest.features;

      let orderUpdate: number | undefined = undefined;

      // ✅ Handle activation
      if (rest.isActive === "true" && existing.isActive === "false") {
        const [maxRow] = await db
          .select({ maxOrder: sql<number>`max(${highlights.order})` })
          .from(highlights)
          .where(eq(highlights.isActive, "true"));

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
          .update(highlights)
          .set({
            order: sql`${highlights.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(highlights.order, currentOrder),
              eq(highlights.isActive, "true")
            )
          );
      }

      const [highlight] = await db
        .update(highlights)
        .set({
          ...updateData,
          order: orderUpdate ?? existing.order,
        })
        .where(eq(highlights.id, id))
        .returning();

      if (!highlight) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Highlight not found.",
        });
      }
      return highlight;
    }),

  updateActiveAndOrder: protectedProcedure
    .input(
      z.object({
        highlightId: z.string(),
        action: z.enum(["toggleActive", "up", "down"]),
        activate: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { highlightId, action, activate } = input;

      const [highlight] = await db
        .select()
        .from(highlights)
        .where(eq(highlights.id, highlightId));

      if (!highlight) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Highlight not found.",
        });
      }

      if (action === "toggleActive") {
        if (activate) {
          const activeCount = await db
            .select()
            .from(highlights)
            .where(eq(highlights.isActive, "true"));

          await db
            .update(highlights)
            .set({
              isActive: "true",
              order: activeCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(highlights.id, highlightId));
        } else {
          const currentOrder = highlight.order;
          await db
            .update(highlights)
            .set({ isActive: "false", order: 0, updatedAt: new Date() })
            .where(eq(highlights.id, highlightId));

          await db
            .update(highlights)
            .set({
              order: sql`${highlights.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(highlights.order, currentOrder),
                eq(highlights.isActive, "true")
              )
            );
        }
      }

      if (action === "up" || action === "down") {
        if (highlight.isActive !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only active highlights can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = highlight.order! + direction;

        const [targetHighlight] = await db
          .select()
          .from(highlights)
          .where(
            and(
              eq(highlights.isActive, "true"),
              eq(highlights.order, targetOrder)
            )
          );

        if (!targetHighlight) return;

        await db
          .update(highlights)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(highlights.id, highlight.id));
        await db
          .update(highlights)
          .set({ order: highlight.order })
          .where(eq(highlights.id, targetHighlight.id));
      }

      return true;
    }),

  getMaxOrder: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    await requireRole(userId, ["super_admin", "admin"]);

    const [result] = await db
      .select({ maxOrder: sql<number>`MAX(${highlights.order}) AS INT` })
      .from(highlights)
      .where(eq(highlights.isActive, "true"));

    return result?.maxOrder ?? 0;
  }),
  remove: protectedProcedure
    .input(
      z.object({
        highlightId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { highlightId } = input;

      const highlight = await db
        .select()
        .from(highlights)
        .where(eq(highlights.id, highlightId))
        .then((res) => res[0]);

      if (!highlight) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const currentOrder = highlight.order ?? 0;

      const [deletedHighlight] = await db
        .delete(highlights)
        .where(eq(highlights.id, highlightId))
        .returning();

      if (!deletedHighlight) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete highlight.",
        });
      }

      if (highlight.isActive === "true") {
        await db
          .update(highlights)
          .set({
            order: sql`${highlights.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(highlights.order, currentOrder),
              eq(highlights.isActive, "true")
            )
          );
      }

      return deletedHighlight;
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
      const highlight = await db.query.highlights.findFirst({
        where: (p, { eq }) => eq(p.id, input.id),
      });

      if (!highlight) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Highlight not found.",
        });
      }

      return highlight;
    }),
});
