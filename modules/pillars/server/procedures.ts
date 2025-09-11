import { db } from "@/db";
import { pillarCreateSchema, pillars, pillarUpdateSchema } from "@/db/schema";
import { booleanTypeEnum } from "@/db/schema/enums";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import z from "zod";

export const pillarsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db
      .select()
      .from(pillars)
      .where(eq(pillars.isActive, "true"));
    return data;
  }),

  getFiltered: protectedProcedure
    .input(
      z.object({
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { isActive, searchQuery } = input;

      const filters = and(
        isActive
          ? eq(pillars.isActive, isActive === "true" ? "true" : "false")
          : undefined,
        searchQuery
          ? or(
              ilike(pillars.title, `%${searchQuery}%`),
              ilike(pillars.subtitle, `%${searchQuery}%`),
              ilike(pillars.ctaText, `%${searchQuery}%`),
              ilike(sql`pillars.features::text`, `%${searchQuery}%`)
            )
          : undefined
      );

      const result = await db
        .select()
        .from(pillars)
        .where(filters)
        .orderBy(desc(pillars.updatedAt));

      return result;
    }),
  remove: protectedProcedure
    .input(
      z.object({
        pillarId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { pillarId } = input;

      const pillar = await db
        .select()
        .from(pillars)
        .where(eq(pillars.id, pillarId))
        .then((res) => res[0]);

      if (!pillar) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (pillar.imageKey) {
        const utapi = new UTApi();
        try {
          await utapi.deleteFiles(pillar.imageKey);
          console.log(`Deleted logo from UploadThing: ${pillar.imageKey}`);
        } catch (error) {
          console.error(
            "⚠️ Failed to delete pillar image from UploadThing:",
            error
          );
          // Not critical enough to stop store deletion
        }
      }

      const [deletedPillar] = await db
        .delete(pillars)
        .where(eq(pillars.id, pillarId))
        .returning();

      if (!deletedPillar) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete store.",
        });
      }

      return deletedPillar;
    }),
  create: protectedProcedure
    .input(pillarCreateSchema)
    .mutation(async ({ input }) => {
      const [pillar] = await db
        .insert(pillars)
        .values({
          title: input.title,
          subtitle: input.subtitle,
          iconUrl: input.iconUrl,
          imageUrl: input.imageUrl,
          imageKey: input.imageKey,
          ctaText: input.ctaText,
          ctaLink: input.ctaLink,
          features: input.features ?? [],
          isActive: "false", // default inactive
        })
        .returning();

      if (!pillar) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create pillar.",
        });
      }

      return pillar;
    }),
  update: protectedProcedure
    .input(
      pillarUpdateSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...rest } = input;

      const [existing] = await db
        .select()
        .from(pillars)
        .where(eq(pillars.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pillar not found",
        });
      }

      const updateData: Partial<typeof pillars.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.title) {
        updateData.title = rest.title;
      }
      if (rest.subtitle) {
        updateData.subtitle = rest.subtitle;
      }
      if (rest.iconUrl) {
        updateData.iconUrl = rest.iconUrl;
      }
      if (rest.imageUrl) {
        updateData.imageUrl = rest.imageUrl;
      }
      if (rest.isActive) {
        updateData.isActive = rest.isActive;
      }
      if (rest.imageKey) {
        updateData.imageKey = rest.imageKey;
      }
      if (rest.ctaText) {
        updateData.ctaText = rest.ctaText;
      }
      if (rest.ctaLink) {
        updateData.ctaLink = rest.ctaLink;
      }
      if (rest.features) {
        updateData.features = rest.features;
      }

      let orderUpdate: number | undefined = undefined;

      if (rest.isActive === "true" && existing.isActive === "false") {
        const [maxRow] = await db
          .select({ maxOrder: sql<number>`max(${pillars.order})` })
          .from(pillars)
          .where(eq(pillars.isActive, "true"));

        const maxOrder = maxRow?.maxOrder ?? 0;
        orderUpdate = maxOrder + 1;
        updateData.isActive = "true";
      }

      // ✅ Handle deactivation
      if (rest.isActive === "false" && existing.isActive === "true") {
        const currentOrder = existing.order ?? 0;

        // First deactivate
        updateData.isActive = "false";
        orderUpdate = 0;

        // Reorder others above it
        await db
          .update(pillars)
          .set({
            order: sql`${pillars.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(gt(pillars.order, currentOrder), eq(pillars.isActive, "true"))
          );
      }

      const [pillar] = await db
        .update(pillars)
        .set({
          ...updateData,
          order: orderUpdate ?? existing.order,
        })
        .where(eq(pillars.id, id))
        .returning();

      if (!pillar) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pillar not found.",
        });
      }
      return pillar;
    }),
  updateActiveAndOrder: protectedProcedure
    .input(
      z.object({
        pillarId: z.string(),
        action: z.enum(["toggleActive", "up", "down"]),
        activate: z.boolean().optional(), // only for toggleActive
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { pillarId, action, activate } = input;

      const [pillar] = await db
        .select()
        .from(pillars)
        .where(eq(pillars.id, pillarId));

      if (!pillar) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pillar not found.",
        });
      }

      if (action === "toggleActive") {
        if (activate) {
          // Count active pillars
          const activeCount = await db
            .select()
            .from(pillars)
            .where(eq(pillars.isActive, "true"));

          await db
            .update(pillars)
            .set({
              isActive: "true",
              order: activeCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(pillars.id, pillarId));
        } else {
          // Deactivate: reorder others if needed
          const currentOrder = pillar.order;
          await db
            .update(pillars)
            .set({ isActive: "false", order: 0, updatedAt: new Date() })
            .where(eq(pillars.id, pillarId));

          // Reorder other active pillars
          await db
            .update(pillars)
            .set({
              order: sql`${pillars.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(gt(pillars.order, currentOrder), eq(pillars.isActive, "true"))
            );
        }
      }

      // Up / Down order
      if (action === "up" || action === "down") {
        if (pillar.isActive !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only active pillars can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = pillar.order! + direction;

        const [targetPillar] = await db
          .select()
          .from(pillars)
          .where(
            and(eq(pillars.isActive, "true"), eq(pillars.order, targetOrder))
          );

        if (!targetPillar) return; // already at boundary

        // Swap orders
        await db
          .update(pillars)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(pillars.id, pillar.id));
        await db
          .update(pillars)
          .set({ order: pillar.order, updatedAt: new Date() })
          .where(eq(pillars.id, targetPillar.id));
      }

      return true;
    }),

  getMaxOrder: protectedProcedure.query(async () => {
    const [result] = await db
      .select({ maxOrder: sql<number>`MAX(${pillars.order})` })
      .from(pillars)
      .where(eq(pillars.isActive, "true"));

    // result.maxOrder might be null if no active pillars
    return result?.maxOrder ?? 0;
  }),
  getOneProtected: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const pillar = await db.query.pillars.findFirst({
        where: (p, { eq }) => eq(p.id, input.id),
      });

      if (!pillar) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pillar not found.",
        });
      }

      return pillar;
    }),
});
