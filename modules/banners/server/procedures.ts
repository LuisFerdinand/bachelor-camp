import { db } from "@/db";
import { bannerCreateSchema, banners, bannerUpdateSchema } from "@/db/schema";
import {
  BooleanType,
  booleanTypeEnum,
  PageType,
  pageTypeEnum,
} from "@/db/schema/enums";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq, ilike, or, sql } from "drizzle-orm";
import { z } from "zod";

type BannerUpdate = {
  type?: PageType;
  headline?: string;
  subheadline?: string;
  mediaUrl?: string;
  mediaKey?: string;
  ctaText1?: string;
  ctaText2?: string;
  ctaText3?: string;
  ctaLink1?: string;
  ctaLink2?: string;
  ctaLink3?: string;
  isShown1?: BooleanType;
  isShown2?: BooleanType;
  isShown3?: BooleanType;
  badgeText?: string;
  isActive?: BooleanType;
  updatedAt: Date;
};

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
  getAll: baseProcedure.query(async ({ input }) => {
    const data = await db.select().from(banners);
    return data;
  }),

  getFiltered: baseProcedure
    .input(
      z.object({
        type: z.enum(pageTypeEnum.enumValues).optional(),
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { type, isActive, searchQuery } = input;

      // Build filters dynamically
      const filters = and(
        type ? eq(banners.type, type) : undefined,
        isActive !== undefined
          ? eq(banners.isActive, isActive ? "true" : "false")
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
          isActive: sql<string>`coalesce(${banners.isActive}, 'false')`.as(
            "isActive"
          ),
          createdAt: banners.createdAt,
          updatedAt: banners.updatedAt,
          ctas: banners.ctas,
        })
        .from(banners)
        .where(filters)
        .orderBy(banners.updatedAt);

      return result;
    }),

  remove: baseProcedure
    .input(
      z.object({
        bannerId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { bannerId } = input;

      // Step 1: Fetch the product to get the bannerId
      const product = await db
        .select()
        .from(banners)
        .where(eq(banners.id, bannerId))
        .then((res) => res[0]);

      if (!product) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // if (product.imageKey) {
      //   const utapi = new UTApi();
      //   try {
      //     await utapi.deleteFiles(product.imageKey);
      //     console.log(`Deleted logo from UploadThing: ${product.imageKey}`);
      //   } catch (error) {
      //     console.error("⚠️ Failed to delete logo from UploadThing:", error);
      //     // Not critical enough to stop store deletion
      //   }
      // }

      // Step 3: Perform deletion
      const [deletedProduct] = await db
        .delete(banners)
        .where(eq(banners.id, bannerId))
        .returning();

      if (!deletedProduct) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete store.",
        });
      }

      return deletedProduct;
    }),
  create: baseProcedure
    .input(bannerCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const [banner] = await db
        .insert(banners)
        .values({
          ...input,
          badgeText: input.badgeText || null,
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

  update: baseProcedure
    .input(
      bannerUpdateSchema.extend({
        id: z.string().uuid(),
        mediaUrl: z.string().optional(),
        mediaKey: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const {
        id,
        badgeText,
        ctaLink1,
        ctaLink2,
        ctaLink3,
        ctaText1,
        ctaText2,
        ctaText3,
        headline,
        mediaKey,
        mediaUrl,
        isActive,
        isShown1,
        isShown2,
        isShown3,
        subheadline,
        type,
      } = input;
      // const { id: userId } = ctx.user;

      if (!id) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      // Step 1: Fetch product to get its bannerId
      const banner = await db
        .select()
        .from(banners)
        .where(eq(banners.id, id))
        .then((res) => res[0]);

      if (!banner) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Banner not found.",
        });
      }

      // Step 2: Check if user has access to the banner
      // await requireBannerAccess(userId, banner.id);
      // Step 3: Prepare update data
      const updateData: BannerUpdate = { updatedAt: new Date() };
      // and append the fields conditionally as before
      if (type) {
        updateData.type = type;
      }
      if (headline) {
        updateData.headline = headline;
      }
      if (subheadline) {
        updateData.subheadline = subheadline;
      }
      if (mediaUrl) {
        updateData.mediaUrl = mediaUrl;
      }
      if (mediaKey) {
        updateData.mediaKey = mediaKey;
      }
      if (ctaText1) {
        updateData.ctaText1 = ctaText1;
      }
      if (ctaText2) {
        updateData.ctaText2 = ctaText2;
      }
      if (ctaText3) {
        updateData.ctaText3 = ctaText3;
      }
      if (ctaLink1) {
        updateData.ctaLink1 = ctaLink1;
      }
      if (ctaLink2) {
        updateData.ctaLink2 = ctaLink2;
      }
      if (ctaLink3) {
        updateData.ctaLink3 = ctaLink3;
      }
      if (isShown1) {
        updateData.isShown1 = isShown1;
      }
      if (isShown2) {
        updateData.isShown2 = isShown2;
      }
      if (isShown3) {
        updateData.isShown3 = isShown3;
      }
      if (badgeText) {
        updateData.badgeText = badgeText;
      }
      if (isActive) {
        updateData.isActive = isActive;
      }

      try {
        // Update banner
        const [updatedBanner] = await db
          .update(banners)
          .set(updateData)
          .where(eq(banners.id, id))
          .returning();

        if (!updatedBanner) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Failed to update banner",
          });
        }
        // Update categories if provided

        return updatedBanner;
      } catch (error) {
        console.error("Banner update failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update banner",
        });
      }
    }),
});
