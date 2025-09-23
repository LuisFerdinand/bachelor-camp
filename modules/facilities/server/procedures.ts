import { db } from "@/db";
import {
  facilities,
  facilityCreateSchema,
  facilityUpdateSchema,
  testimonialCategories,
} from "@/db/schema";
import {
  booleanTypeEnum,
  facilityCategoryEnum,
  facilityStatusEnum,
  facilityTypeEnum,
  testimonialSourceEnum,
} from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import { generateUniqueSlug } from "@/server/utils/generateUniqueSlug";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, eq, gt, ilike, or, sql } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import z from "zod";

export const facilitiesRouter = createTRPCRouter({
  getFiltered: protectedProcedure
    .input(
      z.object({
        featured: z.enum(booleanTypeEnum.enumValues).optional(),
        status: z.enum(facilityStatusEnum.enumValues).optional(),
        type: z.enum(facilityTypeEnum.enumValues).optional(),
        category: z.enum(facilityCategoryEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const { featured, status, type, category, searchQuery } = input;

      const filters = and(
        featured
          ? eq(facilities.isFeatured, featured === "true" ? "true" : "false")
          : undefined,
        status ? eq(facilities.status, status) : undefined,
        type ? eq(facilities.type, type) : undefined,
        category ? eq(facilities.category, category) : undefined,
        searchQuery
          ? or(
              ilike(facilities.category, `%${searchQuery}%`),
              ilike(facilities.description, `%${searchQuery}%`),
              ilike(facilities.name, `%${searchQuery}%`),
              ilike(facilities.type, `%${searchQuery}%`),
              ilike(facilities.status, `%${searchQuery}%`)
            )
          : undefined
      );

      const result = await db
        .select()
        .from(facilities)
        .where(filters)
        .orderBy(asc(facilities.isFeatured), asc(facilities.updatedAt));

      return result;
    }),
  remove: protectedProcedure
    .input(z.object({ facilityId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { facilityId } = input;
      const facility = await db
        .select()
        .from(facilities)
        .where(eq(facilities.id, facilityId))
        .then((res) => res[0]);

      if (!facility) throw new TRPCError({ code: "NOT_FOUND" });

      const currentOrder = facility.order ?? 0;

      if (facility.imageKey) {
        const utapi = new UTApi();
        try {
          await utapi.deleteFiles(facility.imageKey);
        } catch (error) {
          console.error("⚠️ Failed to delete facility image:", error);
        }
      }

      const [deletedFacility] = await db
        .delete(facilities)
        .where(eq(facilities.id, facilityId))
        .returning();

      if (!deletedFacility)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete facility.",
        });

      if (facility.isFeatured === "true") {
        await db
          .update(facilities)
          .set({
            order: sql`${facilities.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(facilities.order, currentOrder),
              eq(facilities.isFeatured, "true")
            )
          );
      }

      return deletedFacility;
    }),
  create: protectedProcedure
    .input(facilityCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const [facility] = await db
        .insert(facilities)
        .values({
          name: input.name,
          slug: (await generateUniqueSlug(input.name, facilities)) || "",
          type: input.type,
          status: input.status ?? "active",
          description: input.description,
          iconUrl: input.iconUrl,
          category: input.category ?? "general",
          isFeatured: "false",
          order: 0,
        })
        .returning();

      if (!facility)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create facility.",
        });

      return facility;
    }),
  update: protectedProcedure
    .input(facilityUpdateSchema.extend({ id: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { id, ...rest } = input;
      const [existing] = await db
        .select()
        .from(facilities)
        .where(eq(facilities.id, id));
      if (!existing)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Facility not found",
        });

      const updateData: Partial<typeof facilities.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.name !== undefined) {
        updateData.name = rest.name;
        if (rest.name !== existing.name) {
          updateData.slug = await generateUniqueSlug(rest.name, facilities);
        }
      }
      if (rest.type !== undefined) updateData.type = rest.type;
      if (rest.status !== undefined) updateData.status = rest.status;
      if (rest.isFeatured !== undefined)
        updateData.isFeatured = rest.isFeatured;
      if (rest.description !== undefined)
        updateData.description = rest.description;
      if (rest.iconUrl !== undefined) updateData.iconUrl = rest.iconUrl;
      if (rest.imageUrl !== undefined)
        updateData.imageUrl =
          rest.imageUrl.trim() === "" ? null : rest.imageUrl;
      if (rest.imageKey !== undefined) updateData.imageKey = rest.imageKey;
      if (rest.category !== undefined) updateData.category = rest.category;

      let orderUpdate: number | undefined = undefined;

      if (rest.isFeatured === "true" && existing.isFeatured === "false") {
        const [maxRow] = await db
          .select({ maxOrder: sql<number>`max(${facilities.order})` })
          .from(facilities)
          .where(eq(facilities.isFeatured, "true"));

        const maxOrder = maxRow?.maxOrder ?? 0;
        orderUpdate = maxOrder + 1;
        updateData.isFeatured = "true";
      }

      // ✅ Handle deactivation
      if (rest.isFeatured === "false" && existing.isFeatured === "true") {
        const currentOrder = existing.order ?? 0;

        // First deactivate
        updateData.isFeatured = "false";
        orderUpdate = 0;

        // Reorder others above it
        await db
          .update(facilities)
          .set({
            order: sql`${facilities.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(facilities.order, currentOrder),
              eq(facilities.isFeatured, "true")
            )
          );
      }

      const [facility] = await db
        .update(facilities)
        .set({ ...updateData, order: orderUpdate ?? existing.order })
        .where(eq(facilities.id, id))
        .returning();

      if (!facility)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update facility.",
        });

      return facility;
    }),
  updateFeaturedAndOrder: protectedProcedure
    .input(
      z.object({
        facilityId: z.string().uuid(),
        action: z.enum(["toggleFeatured", "up", "down"]),
        feature: z.boolean().optional(), // only for toggleFeatured
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { facilityId, action, feature } = input;
      const [facility] = await db
        .select()
        .from(facilities)
        .where(eq(facilities.id, facilityId));

      if (!facility)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Facility not found",
        });

      if (action === "toggleFeatured") {
        if (feature) {
          const featuredCount = await db
            .select()
            .from(facilities)
            .where(eq(facilities.isFeatured, "true"));
          await db
            .update(facilities)
            .set({
              isFeatured: "true",
              order: featuredCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(facilities.id, facilityId));
        } else {
          const currentOrder = facility.order || 0;
          await db
            .update(facilities)
            .set({
              isFeatured: "false",
              order: 0,
              updatedAt: new Date(),
            })
            .where(eq(facilities.id, facilityId));

          await db
            .update(facilities)
            .set({
              order: sql`${facilities.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(facilities.order, currentOrder),
                eq(facilities.isFeatured, "true")
              )
            );
        }
      }

      if (action === "up" || action === "down") {
        if (facility.isFeatured !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only featured facilities can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = facility.order! + direction;

        const [target] = await db
          .select()
          .from(facilities)
          .where(
            and(
              eq(facilities.isFeatured, "true"),
              eq(facilities.order, targetOrder)
            )
          );

        if (!target) return;

        await db
          .update(facilities)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(facilities.id, facility.id));
        await db
          .update(facilities)
          .set({ order: facility.order })
          .where(eq(facilities.id, target.id));
      }

      return true;
    }),
  getMaxOrder: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    await requireRole(userId, ["super_admin", "admin"]);

    const [result] = await db
      .select({ maxOrder: sql<number>`CAST(MAX(${facilities.order}) AS INT)` })
      .from(facilities)
      .where(eq(facilities.isFeatured, "true"));

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
      const facility = await db.query.facilities.findFirst({
        where: (p, { eq }) => eq(p.id, input.id),
      });

      if (!facility) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Facility not found.",
        });
      }

      return facility;
    }),
});
