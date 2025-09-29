import { db } from "@/db";
import {
  faqCategories,
  faqCategoryRelations,
  faqCreateSchema,
  faqs,
  faqUpdateSchema,
} from "@/db/schema";
import { booleanTypeEnum } from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import { FAQsSection } from "@/modules/dashboard/ui/sections/content/faqs/FAQsSection";
import { generateUniqueSlug } from "@/server/utils/generateUniqueSlug";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
import z from "zod";

export const faqsRouter = createTRPCRouter({
  getAllCategories: protectedProcedure.query(async ({ ctx }) => {
    const result = await db.select().from(faqCategories);
    return result;
  }),
  getFiltered: protectedProcedure
    .input(
      z.object({
        category: z.string().optional(),
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { category, isActive, searchQuery } = input;

      // build filters for faqs table
      const faqFilters = and(
        isActive
          ? eq(faqs.isActive, isActive === "true" ? "true" : "false")
          : undefined,
        searchQuery
          ? or(
              ilike(faqs.answer, `%${searchQuery}%`),
              ilike(faqs.question, `%${searchQuery}%`)
            )
          : undefined
      );

      // base query
      const rows = await db
        .select({
          id: faqs.id,
          question: faqs.question,
          answer: faqs.answer,
          iconUrl: faqs.iconUrl,
          isActive: faqs.isActive,
          order: faqs.order,
          createdAt: faqs.createdAt,
          updatedAt: faqs.updatedAt,
          categoryId: faqCategories.id,
          categoryName: faqCategories.name,
          categorySlug: faqCategories.slug,
        })
        .from(faqs)
        .leftJoin(faqCategoryRelations, eq(faqCategoryRelations.faqId, faqs.id))
        .leftJoin(
          faqCategories,
          eq(faqCategories.id, faqCategoryRelations.categoryId)
        )
        .where(
          and(
            faqFilters,
            category ? eq(faqCategories.slug, category) : undefined
          )
        )
        .orderBy(asc(faqs.isActive), asc(faqs.order), asc(faqs.question));

      const grouped = rows.reduce(
        (acc, row) => {
          if (!acc[row.id]) {
            acc[row.id] = {
              id: row.id,
              question: row.question,
              answer: row.answer,
              iconUrl: row.iconUrl,
              isActive: row.isActive,
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
  create: protectedProcedure
    .input(faqCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const [faq] = await db
        .insert(faqs)
        .values({
          question: input.question,
          slug: await generateUniqueSlug(input.question, faqs),
          answer: input.answer,
          iconUrl: input.iconUrl,
        })
        .returning();

      if (!faq) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create faq.",
        });
      }
      // If categories are provided, insert relations
      if (input.categories && input.categories.length > 0) {
        await db.insert(faqCategoryRelations).values(
          input.categories.map((categoryId) => ({
            faqId: faq.id,
            categoryId,
          }))
        );
      }

      return faq;
    }),
  update: protectedProcedure
    .input(
      faqUpdateSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { id, ...rest } = input;

      const [existing] = await db.select().from(faqs).where(eq(faqs.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Faq not found",
        });
      }

      const updateData: Partial<typeof faqs.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.question !== undefined) {
        if (rest.question !== existing.question) {
          updateData.question = rest.question;
          updateData.slug = await generateUniqueSlug(rest.question, faqs);
        }
      }
      if (rest.answer !== undefined) updateData.answer = rest.answer;
      if (rest.iconUrl !== undefined) updateData.iconUrl = rest.iconUrl;

      let orderUpdate: number | undefined = undefined;

      // ✅ Handle activation
      if (rest.isActive === "true" && existing.isActive === "false") {
        const [maxRow] = await db
          .select({ maxOrder: sql<number>`max(${faqs.order})` })
          .from(faqs)
          .where(eq(faqs.isActive, "true"));

        const maxOrder = maxRow?.maxOrder ?? 0;
        orderUpdate = maxOrder + 1;
        updateData.isActive = "true";
      }

      // ✅ Handle deactivation
      if (rest.isActive === "false" && existing.isActive === "true") {
        const currentOrder = existing.order ?? 0;
        updateData.isActive = "false";
        orderUpdate = 0;

        await db
          .update(faqs)
          .set({
            order: sql`${faqs.order} - 1`,
            updatedAt: new Date(),
          })
          .where(and(gt(faqs.order, currentOrder), eq(faqs.isActive, "true")));
      }

      try {
        const [faq] = await db
          .update(faqs)
          .set({
            ...updateData,
            order: orderUpdate ?? existing.order,
          })
          .where(eq(faqs.id, id))
          .returning();

        if (!faq) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Faq not found.",
          });
        }
        if (rest.categories) {
          await db
            .delete(faqCategoryRelations)
            .where(eq(faqCategoryRelations.faqId, id));

          if (rest.categories.length > 0) {
            await db.insert(faqCategoryRelations).values(
              rest.categories.map((categoryId) => ({
                faqId: id,
                categoryId,
                createdAt: new Date(),
                updatedAt: new Date(),
              }))
            );
          }
        }

        return faq;
      } catch (error) {
        console.error("Faq update failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update faq",
        });
      }
    }),

  updateActiveAndOrder: protectedProcedure
    .input(
      z.object({
        faqId: z.string(),
        action: z.enum(["toggleActive", "up", "down"]),
        activate: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { faqId, action, activate } = input;

      const [faq] = await db.select().from(faqs).where(eq(faqs.id, faqId));

      if (!faq) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Faq not found.",
        });
      }

      if (action === "toggleActive") {
        if (activate) {
          const activeCount = await db
            .select()
            .from(faqs)
            .where(eq(faqs.isActive, "true"));

          await db
            .update(faqs)
            .set({
              isActive: "true",
              order: activeCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(faqs.id, faqId));
        } else {
          const currentOrder = faq.order;
          await db
            .update(faqs)
            .set({ isActive: "false", order: 0, updatedAt: new Date() })
            .where(eq(faqs.id, faqId));

          await db
            .update(faqs)
            .set({
              order: sql`${faqs.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(gt(faqs.order, currentOrder), eq(faqs.isActive, "true"))
            );
        }
      }

      if (action === "up" || action === "down") {
        if (faq.isActive !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only active faqs can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = faq.order! + direction;

        const [targetFaq] = await db
          .select()
          .from(faqs)
          .where(and(eq(faqs.isActive, "true"), eq(faqs.order, targetOrder)));

        if (!targetFaq) return;

        await db
          .update(faqs)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(faqs.id, faq.id));
        await db
          .update(faqs)
          .set({ order: faq.order })
          .where(eq(faqs.id, targetFaq.id));
      }

      return true;
    }),

  getMaxOrder: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    await requireRole(userId, ["super_admin", "admin"]);

    const [result] = await db
      .select({ maxOrder: sql<number>`MAX(${faqs.order}) AS INT` })
      .from(faqs)
      .where(eq(faqs.isActive, "true"));

    return result?.maxOrder ?? 0;
  }),
  remove: protectedProcedure
    .input(
      z.object({
        faqId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { faqId } = input;

      const faq = await db
        .select()
        .from(faqs)
        .where(eq(faqs.id, faqId))
        .then((res) => res[0]);

      if (!faq) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const currentOrder = faq.order ?? 0;

      const [deletedFaq] = await db
        .delete(faqs)
        .where(eq(faqs.id, faqId))
        .returning();

      if (!deletedFaq) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete faq.",
        });
      }

      if (faq.isActive === "true") {
        await db
          .update(faqs)
          .set({
            order: sql`${faqs.order} - 1`,
            updatedAt: new Date(),
          })
          .where(and(gt(faqs.order, currentOrder), eq(faqs.isActive, "true")));
      }

      return deletedFaq;
    }),

  getOneProtected: protectedProcedure
    .input(z.object({ faqId: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);
      const { faqId } = input;

      const [faq] = await db.select().from(faqs).where(eq(faqs.id, faqId));

      if (!faq) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const assignedCategories = await db
        .select({
          id: faqCategories.id,
        })
        .from(faqCategoryRelations)
        .innerJoin(
          faqCategories,
          eq(faqCategoryRelations.categoryId, faqCategories.id)
        )
        .where(eq(faqCategoryRelations.faqId, faqId));
      const categoryIds = assignedCategories.map((row) => row.id);

      const allCategories = await db.query.faqCategories.findMany();

      return {
        faq: { ...faq, categories: categoryIds },
        allCategories: allCategories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
        })),
      };
    }),
});
