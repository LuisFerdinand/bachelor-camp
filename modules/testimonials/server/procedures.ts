import { db } from "@/db";
import {
  testimonialCategories,
  testimonialCategoryRelations,
  testimonialCreateSchema,
  testimonials,
  testimonialUpdateSchema,
} from "@/db/schema";
import { booleanTypeEnum, testimonialSourceEnum } from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import z from "zod";

export const testimonialsRouter = createTRPCRouter({
  getFiltered: protectedProcedure
    .input(
      z.object({
        category: z.string().optional(),
        source: z.enum(testimonialSourceEnum.enumValues).optional(),
        isFeatured: z.enum(booleanTypeEnum.enumValues).optional(),
        isShown: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { category, source, isFeatured, isShown, searchQuery } = input;

      // build filters for testimonials table
      const testimonialFilters = and(
        isFeatured
          ? eq(
              testimonials.isFeatured,
              isFeatured === "true" ? "true" : "false"
            )
          : undefined,
        isShown
          ? eq(testimonials.isShown, isShown === "true" ? "true" : "false")
          : undefined,
        source ? eq(testimonials.source, source) : undefined,
        searchQuery
          ? or(
              ilike(testimonials.content, `%${searchQuery}%`),
              ilike(testimonials.name, `%${searchQuery}%`),
              ilike(testimonials.role, `%${searchQuery}%`),
              ilike(testimonials.source, `%${searchQuery}%`)
            )
          : undefined
      );

      // base query
      const rows = await db
        .select({
          id: testimonials.id,
          name: testimonials.name,
          role: testimonials.role,
          source: testimonials.source,
          imageUrl: testimonials.imageUrl,
          imageKey: testimonials.imageKey,
          content: testimonials.content,
          rating: testimonials.rating,
          score: testimonials.score,
          isFeatured: testimonials.isFeatured,
          isShown: testimonials.isShown,
          order: testimonials.order,
          createdAt: testimonials.createdAt,
          updatedAt: testimonials.updatedAt,
          categoryId: testimonialCategories.id,
          categoryName: testimonialCategories.name,
          categorySlug: testimonialCategories.slug,
        })
        .from(testimonials)
        .leftJoin(
          testimonialCategoryRelations,
          eq(testimonialCategoryRelations.testimonialId, testimonials.id)
        )
        .leftJoin(
          testimonialCategories,
          eq(testimonialCategories.id, testimonialCategoryRelations.categoryId)
        )
        .where(
          and(
            testimonialFilters,
            category ? eq(testimonialCategories.slug, category) : undefined
          )
        )
        .orderBy(desc(testimonials.updatedAt));

      const grouped = rows.reduce(
        (acc, row) => {
          if (!acc[row.id]) {
            acc[row.id] = {
              id: row.id,
              name: row.name,
              role: row.role,
              source: row.source,
              imageUrl: row.imageUrl,
              imageKey: row.imageKey,
              content: row.content,
              rating: row.rating,
              score: row.score,
              isFeatured: row.isFeatured,
              isShown: row.isShown,
              order: row.order,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
              categories: [],
            };
          }
          if (row.categoryId) {
            acc[row.id].categories.push({
              id: row.categoryId,
              name: row.categoryName,
              slug: row.categorySlug,
            });
          }
          return acc;
        },
        {} as Record<string, any>
      );

      return Object.values(grouped);
    }),
  getAllCategories: protectedProcedure.query(async ({ ctx }) => {
    const result = await db.select().from(testimonialCategories);
    return result;
  }),
  remove: protectedProcedure
    .input(
      z.object({
        testimonialId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { testimonialId } = input;

      const testimonial = await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.id, testimonialId))
        .then((res) => res[0]);

      if (!testimonial) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (testimonial.imageKey) {
        const utapi = new UTApi();
        try {
          await utapi.deleteFiles(testimonial.imageKey);
          console.log(
            `Deleted image from UploadThing: ${testimonial.imageKey}`
          );
        } catch (error) {
          console.error(
            "⚠️ Failed to delete testimonial image from UploadThing:",
            error
          );
          // Not critical enough to stop store deletion
        }
      }
      const [deletedTestimonial] = await db
        .delete(testimonials)
        .where(eq(testimonials.id, testimonialId))
        .returning();

      if (!deletedTestimonial) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete testimonial.",
        });
      }

      return deletedTestimonial;
    }),
  setShown: protectedProcedure
    .input(z.object({ id: z.string(), shown: z.boolean() })) // pass true/false
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      await db
        .update(testimonials)
        .set({ isShown: input.shown ? "true" : "false" })
        .where(eq(testimonials.id, input.id));

      return { success: true };
    }),
  create: protectedProcedure
    .input(testimonialCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const [testimonial] = await db
        .insert(testimonials)
        .values({
          userId: input.userId,
          name: input.name,
          role: input.role,
          source: input.source ?? "student",
          imageUrl: input.imageUrl,
          imageKey: input.imageKey,
          content: input.content,
          rating: input.rating ?? null,
        })
        .returning();

      if (!testimonial) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create testimonial.",
        });
      }

      // If categories are provided, insert relations
      if (input.categories && input.categories.length > 0) {
        await db.insert(testimonialCategoryRelations).values(
          input.categories.map((categoryId) => ({
            testimonialId: testimonial.id,
            categoryId,
          }))
        );
      }

      return testimonial;
    }),
  update: protectedProcedure
    .input(testimonialUpdateSchema.extend({ id: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { id, ...rest } = input;

      const [existing] = await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Testimonial not found",
        });
      }
      const updateData: Partial<typeof testimonials.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.content) {
        updateData.content = rest.content;
      }
      if (rest.imageKey) {
        updateData.imageKey = rest.imageKey;
      }
      if (rest.imageUrl) {
        updateData.imageUrl = rest.imageUrl;
      }
      if (rest.isFeatured) {
        updateData.isFeatured = rest.isFeatured;
      }
      if (rest.isShown) {
        updateData.isShown = rest.isShown;
      }
      if (rest.name) {
        updateData.name = rest.name;
      }
      if (rest.rating) {
        updateData.rating = rest.rating;
      }
      if (rest.role) {
        updateData.role = rest.role;
      }
      if (rest.source) {
        updateData.source = rest.source;
      }
      if (rest.userId) {
        updateData.userId = rest.userId;
      }

      try {
        const [testimonial] = await db
          .update(testimonials)
          .set({ ...updateData })
          .where(eq(testimonials.id, id))
          .returning();

        if (!testimonial) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Testimonial not found.",
          });
        }

        if (rest.categories) {
          await db
            .delete(testimonialCategoryRelations)
            .where(eq(testimonialCategoryRelations.testimonialId, id));

          if (rest.categories.length > 0) {
            await db.insert(testimonialCategoryRelations).values(
              rest.categories.map((categoryId) => ({
                testimonialId: id,
                categoryId,
                createdAt: new Date(),
                updatedAt: new Date(),
              }))
            );
          }
        }

        return testimonial;
      } catch (error) {
        console.error("Testimonial update failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update testimonial",
        });
      }
    }),
  getOneProtected: protectedProcedure
    .input(z.object({ testimonialId: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);
      const { testimonialId } = input;

      const [testimonial] = await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.id, testimonialId));

      if (!testimonial) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const assignedCategories = await db
        .select({
          id: testimonialCategories.id,
        })
        .from(testimonialCategoryRelations)
        .innerJoin(
          testimonialCategories,
          eq(testimonialCategoryRelations.categoryId, testimonialCategories.id)
        )
        .where(eq(testimonialCategoryRelations.testimonialId, testimonialId));
      const categoryIds = assignedCategories.map((row) => row.id);

      const allCategories = await db.query.testimonialCategories.findMany();

      return {
        testimonial: { ...testimonial, categories: categoryIds },
        allCategories: allCategories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
        })),
      };
    }),
});
