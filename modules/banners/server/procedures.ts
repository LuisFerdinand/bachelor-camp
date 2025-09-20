import { db } from "@/db";
import { bannerCreateSchema, banners, bannerUpdateSchema } from "@/db/schema";
import {
  BooleanType,
  booleanTypeEnum,
  PageType,
  pageTypeEnum,
} from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { z } from "zod";

export const bannersRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        type: z.enum(pageTypeEnum.enumValues),
      })
    )
    .query(async ({ input }) => {
      const data = await db
        .select()
        .from(banners)
        .where(and(eq(banners.type, input.type), eq(banners.isActive, "true")))
        .then((res) => res[0]);
      return data;
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

      const banner = await db.query.banners.findFirst({
        where: (b, { eq }) => eq(b.id, input.id),
      });

      if (!banner) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Banner not found.",
        });
      }

      return banner;
    }),
  getAll: protectedProcedure.query(async ({ input }) => {
    const data = await db.select().from(banners);
    return data;
  }),

  getFiltered: protectedProcedure
    .input(
      z.object({
        type: z.enum(pageTypeEnum.enumValues).optional(),
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { type, isActive, searchQuery } = input;
      await requireRole(userId, ["super_admin", "admin"]);

      // Build filters dynamically
      const filters = and(
        type ? eq(banners.type, type) : undefined,
        isActive !== undefined
          ? eq(banners.isActive, isActive === "true" ? "true" : "false")
          : undefined,
        searchQuery
          ? or(
              ilike(banners.headline, `%${searchQuery}%`),
              ilike(banners.subheadline, `%${searchQuery}%`),
              ilike(banners.badgeText, `%${searchQuery}%`)
            )
          : undefined
      );

      const result = await db
        .select({
          id: banners.id,
          type: banners.type,
          headline: banners.headline,
          subheadline: banners.subheadline,
          badgeText: banners.badgeText,
          mediaUrl: banners.mediaUrl,
          mediaKey: banners.mediaKey,
          isActive: banners.isActive,
          createdAt: banners.createdAt,
          updatedAt: banners.updatedAt,
          ctas: banners.ctas,
        })
        .from(banners)
        .where(filters)
        .orderBy(
          asc(banners.isActive),
          asc(banners.type),
          asc(banners.headline)
        );

      return result;
    }),

  remove: protectedProcedure
    .input(
      z.object({
        bannerId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const { bannerId } = input;

      await requireRole(userId, ["super_admin", "admin"]);

      // Step 1: Fetch the banner to get the bannerId
      const banner = await db
        .select()
        .from(banners)
        .where(eq(banners.id, bannerId))
        .then((res) => res[0]);

      if (!banner) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (banner.mediaKey) {
        const utapi = new UTApi();
        try {
          await utapi.deleteFiles(banner.mediaKey);
          console.log(`Deleted logo from UploadThing: ${banner.mediaKey}`);
        } catch (error) {
          console.error(
            "⚠️ Failed to delete banner media from UploadThing:",
            error
          );
        }
      }

      // Step 3: Perform deletion
      const [deletedBanner] = await db
        .delete(banners)
        .where(eq(banners.id, bannerId))
        .returning();

      if (!deletedBanner) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete store.",
        });
      }

      return deletedBanner;
    }),
  create: protectedProcedure
    .input(bannerCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const [banner] = await db
        .insert(banners)
        .values({
          type: input.type,
          headline: input.headline,
          subheadline: input.subheadline,
          badgeText: input.badgeText || "",
          mediaUrl: input.mediaUrl,
          mediaKey: input.mediaKey,
          ctas: input.ctas ?? [],
        })
        .returning();

      if (!banner) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create banner.",
        });
      }

      return banner;
    }),

  update: protectedProcedure
    .input(
      bannerUpdateSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const { id, ...rest } = input;
      await requireRole(userId, ["super_admin", "admin"]);

      const updateData: Partial<typeof banners.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.headline !== undefined) {
        updateData.headline = rest.headline;
      }
      if (rest.subheadline !== undefined) {
        updateData.subheadline = rest.subheadline;
      }
      if (rest.badgeText !== undefined) {
        updateData.badgeText = rest.badgeText;
      }
      if (rest.ctas !== undefined) {
        updateData.ctas = rest.ctas;
      }
      if (rest.isActive !== undefined) {
        updateData.isActive = rest.isActive;
      }
      if (rest.mediaKey !== undefined) {
        updateData.mediaKey = rest.mediaKey;
      }
      if (rest.mediaUrl !== undefined) {
        updateData.mediaUrl =
          typeof rest.mediaUrl === "string" && rest.mediaUrl.trim() === ""
            ? null
            : rest.mediaUrl;
      }

      if (rest.type !== undefined) {
        updateData.type = rest.type;
      }

      const [banner] = await db
        .update(banners)
        .set({
          ...updateData,
        })
        .where(eq(banners.id, id))
        .returning();

      if (!banner) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Banner not found.",
        });
      }

      return banner;
    }),
  activate: protectedProcedure
    .input(
      z.object({ id: z.string().uuid(), type: z.enum(pageTypeEnum.enumValues) })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const { id, type } = input;

      await requireRole(userId, ["super_admin", "admin"]);

      await db
        .update(banners)
        .set({ isActive: "false", updatedAt: new Date() })
        .where(and(eq(banners.type, type), eq(banners.isActive, "true")));

      await db
        .update(banners)
        .set({ isActive: "true", updatedAt: new Date() })
        .where(eq(banners.id, id));
      return { success: true, id };
    }),
});
