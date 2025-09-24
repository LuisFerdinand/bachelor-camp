import { db } from "@/db";
import {
  socialMediaCreateSchema,
  socialMedias,
  socialMediaUpdateSchema,
} from "@/db/schema";
import { booleanTypeEnum, socialPlatformEnum } from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
import z from "zod";

// --- Router
export const socialMediasRouter = createTRPCRouter({
  // public fetch of active socials
  getMany: baseProcedure.query(async () => {
    return await db
      .select()
      .from(socialMedias)
      .where(eq(socialMedias.isActive, "true"))
      .orderBy(asc(socialMedias.order));
  }),

  // admin filtered table
  getFiltered: protectedProcedure
    .input(
      z.object({
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { isActive, searchQuery } = input;

      const filters = and(
        isActive ? eq(socialMedias.isActive, isActive) : undefined,
        searchQuery
          ? or(
              ilike(socialMedias.platform, `%${searchQuery}%`),
              ilike(socialMedias.url, `%${searchQuery}%`)
            )
          : undefined
      );

      return await db
        .select()
        .from(socialMedias)
        .where(filters)
        .orderBy(
          asc(socialMedias.isActive),
          asc(socialMedias.order),
          asc(socialMedias.platform)
        );
    }),

  update: protectedProcedure
    .input(
      socialMediaUpdateSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { id, ...rest } = input;
      const [existing] = await db
        .select()
        .from(socialMedias)
        .where(eq(socialMedias.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Social media not found",
        });
      }

      const updateData: Partial<typeof socialMedias.$inferInsert> = {
        updatedAt: new Date(),
      };
      if (rest.url !== undefined) updateData.url = rest.url;

      let orderUpdate: number | undefined = undefined;

      // ✅ Handle activation
      if (rest.isActive === "true" && existing.isActive === "false") {
        const [maxRow] = await db
          .select({ maxOrder: sql<number>`max(${socialMedias.order})` })
          .from(socialMedias)
          .where(eq(socialMedias.isActive, "true"));

        const maxOrder = maxRow?.maxOrder ?? 0;
        orderUpdate = maxOrder + 1;
        updateData.isActive = "true";
      }

      if (rest.isActive === "false" && existing.isActive === "true") {
        const currentOrder = existing.order ?? 0;
        updateData.isActive = "false";
        orderUpdate = 0;

        await db
          .update(socialMedias)
          .set({
            order: sql`${socialMedias.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(socialMedias.order, currentOrder),
              eq(socialMedias.isActive, "true")
            )
          );
      }

      const [updated] = await db
        .update(socialMedias)
        .set({ ...updateData, order: orderUpdate ?? existing.order })
        .where(eq(socialMedias.id, id))
        .returning();

      if (!updated) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update social media",
        });
      }

      return updated;
    }),

  remove: protectedProcedure
    .input(z.object({ socialId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { socialId } = input;

      const [deleted] = await db
        .delete(socialMedias)
        .where(eq(socialMedias.id, socialId))
        .returning();

      if (!deleted) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Social media not found",
        });
      }

      // re-order if necessary
      if (deleted.isActive === "true") {
        await db
          .update(socialMedias)
          .set({
            order: sql`${socialMedias.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(socialMedias.order, deleted.order),
              eq(socialMedias.isActive, "true")
            )
          );
      }

      return deleted;
    }),

  updateActiveAndOrder: protectedProcedure
    .input(
      z.object({
        socialId: z.string().uuid(),
        action: z.enum(["toggleActive", "up", "down"]),
        activate: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { socialId, action, activate } = input;

      const [social] = await db
        .select()
        .from(socialMedias)
        .where(eq(socialMedias.id, socialId));

      if (!social) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Social media not found",
        });
      }

      if (action === "toggleActive") {
        if (activate) {
          const activeCount = await db
            .select()
            .from(socialMedias)
            .where(eq(socialMedias.isActive, "true"));

          await db
            .update(socialMedias)
            .set({
              isActive: "true",
              order: activeCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(socialMedias.id, socialId));
        } else {
          const currentOrder = social.order;
          await db
            .update(socialMedias)
            .set({ isActive: "false", order: 0, updatedAt: new Date() })
            .where(eq(socialMedias.id, socialId));

          await db
            .update(socialMedias)
            .set({
              order: sql`${socialMedias.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(socialMedias.order, currentOrder),
                eq(socialMedias.isActive, "true")
              )
            );
        }
      }

      if (action === "up" || action === "down") {
        if (social.isActive !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only active socials can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = social.order! + direction;

        const [target] = await db
          .select()
          .from(socialMedias)
          .where(
            and(
              eq(socialMedias.isActive, "true"),
              eq(socialMedias.order, targetOrder)
            )
          );

        if (!target) return;

        await db
          .update(socialMedias)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(socialMedias.id, social.id));
        await db
          .update(socialMedias)
          .set({ order: social.order })
          .where(eq(socialMedias.id, target.id));
      }

      return true;
    }),

  getMaxOrder: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    await requireRole(userId, ["super_admin", "admin"]);

    const [result] = await db
      .select({
        maxOrder: sql<number>`CAST(MAX(${socialMedias.order}) AS INT)`,
      })
      .from(socialMedias)
      .where(eq(socialMedias.isActive, "true"));

    return result?.maxOrder ?? 0;
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
      const socialMedia = await db.query.socialMedias.findFirst({
        where: (p, { eq }) => eq(p.id, input.id),
      });

      if (!socialMedia) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Social media not found.",
        });
      }

      return socialMedia;
    }),
});
