import { db } from "@/db";
import {
  milestoneCreateSchema,
  milestones,
  milestoneUpdateSchema,
} from "@/db/schema";
import { booleanTypeEnum } from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import { generateUniqueSlug } from "@/server/utils/generateUniqueSlug";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, gt, gte, ilike, or, sql } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import z from "zod";

export const milestonesRouter = createTRPCRouter({
  getFiltered: protectedProcedure
    .input(
      z.object({
        year: z.number().optional(),
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const { year, isActive, searchQuery } = input;

      const filters = and(
        year ? eq(milestones.year, year) : undefined,
        isActive
          ? eq(milestones.isActive, isActive === "true" ? "true" : "false")
          : undefined,
        searchQuery
          ? or(
              ilike(milestones.title, `%${searchQuery}%`),
              ilike(milestones.description, `%${searchQuery}%`),
              ilike(milestones.year, `%${searchQuery}%`)
            )
          : undefined
      );

      const result = await db
        .select()
        .from(milestones)
        .where(filters)
        .orderBy(
          asc(milestones.isActive),
          asc(milestones.order),
          asc(milestones.year),
          asc(milestones.title)
        );

      return result;
    }),
  remove: protectedProcedure
    .input(
      z.object({
        milestoneId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { milestoneId } = input;

      const milestone = await db
        .select()
        .from(milestones)
        .where(eq(milestones.id, milestoneId))
        .then((res) => res[0]);

      if (!milestone) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const currentOrder = milestone.order ?? 0;

      if (milestone.imageKey) {
        const utapi = new UTApi();
        try {
          await utapi.deleteFiles(milestone.imageKey);
          console.log(`Deleted logo from UploadThing: ${milestone.imageKey}`);
        } catch (error) {
          console.error(
            "⚠️ Failed to delete milestone image from UploadThing:",
            error
          );
          // Not critical enough to stop milestone deletion
        }
      }

      const [deletedMilestone] = await db
        .delete(milestones)
        .where(eq(milestones.id, milestoneId))
        .returning();

      if (!deletedMilestone) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete milestone.",
        });
      }

      if (milestone.isActive === "true") {
        await db
          .update(milestones)
          .set({
            order: sql`${milestones.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(milestones.order, currentOrder),
              eq(milestones.isActive, "true")
            )
          );
      }

      return deletedMilestone;
    }),
  create: protectedProcedure
    .input(milestoneCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const [milestone] = await db
        .insert(milestones)
        .values({
          slug: await generateUniqueSlug(input.title, milestones),
          ...input,
        })
        .returning();

      if (!milestone) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create milestone.",
        });
      }

      return milestone;
    }),
  // update: protectedProcedure
  //   .input(milestoneUpdateSchema.extend({ id: z.string().uuid() }))
  //   .mutation(async ({ input, ctx }) => {
  //     const { id: userId } = ctx.user;
  //     await requireRole(userId, ["super_admin", "admin"]);

  //     const { id, ...rest } = input;

  //     const [existing] = await db
  //       .select()
  //       .from(milestones)
  //       .where(eq(milestones.id, id));
  //     if (!existing)
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Milestone not found",
  //       });

  //     const updateData: Partial<typeof milestones.$inferInsert> = {
  //       updatedAt: new Date(),
  //     };
  //     if (rest.title) updateData.title = rest.title;
  //     if (rest.description) updateData.description = rest.description;
  //     if (rest.imageUrl) updateData.imageUrl = rest.imageUrl;
  //     if (rest.imageKey) updateData.imageKey = rest.imageKey;

  //     const newYear = rest.year ?? existing.year;
  //     const yearChanged = rest.year && rest.year !== existing.year;
  //     let orderUpdate: number | undefined;

  //     // Case 1: Activate
  //     if (rest.isActive === "true" && existing.isActive === "false") {
  //       const [maxInYear] = await db
  //         .select({
  //           maxOrder: sql<number>`CAST(MAX(${milestones.order}) AS INT)`,
  //         })
  //         .from(milestones)
  //         .where(
  //           and(eq(milestones.isActive, "true"), eq(milestones.year, newYear))
  //         );

  //       let newOrder: number;
  //       if (maxInYear?.maxOrder) {
  //         newOrder = maxInYear.maxOrder + 1;
  //       } else {
  //         const [globalMax] = await db
  //           .select({
  //             maxOrder: sql<number>`CAST(MAX(${milestones.order}) AS INT)`,
  //           })
  //           .from(milestones)
  //           .where(eq(milestones.isActive, "true"));
  //         newOrder = (globalMax?.maxOrder ?? 0) + 1;
  //       }

  //       await db
  //         .update(milestones)
  //         .set({ order: sql`${milestones.order} + 1`, updatedAt: new Date() })
  //         .where(
  //           and(
  //             eq(milestones.isActive, "true"),
  //             eq(milestones.year, newYear),
  //             gte(milestones.order, newOrder)
  //           )
  //         );

  //       orderUpdate = newOrder;
  //       updateData.isActive = "true";
  //       updateData.year = newYear;
  //     }

  //     // Case 2: Deactivate
  //     if (rest.isActive === "false" && existing.isActive === "true") {
  //       const currentOrder = existing.order ?? 0;

  //       await db
  //         .update(milestones)
  //         .set({ order: sql`${milestones.order} - 1`, updatedAt: new Date() })
  //         .where(
  //           and(
  //             eq(milestones.isActive, "true"),
  //             eq(milestones.year, existing.year),
  //             gt(milestones.order, currentOrder)
  //           )
  //         );

  //       orderUpdate = 0;
  //       updateData.isActive = "false";
  //     }

  //     // Case 3: Year change while active
  //     if (yearChanged && (rest.isActive ?? existing.isActive) === "true") {
  //       const currentOrder = existing.order ?? 0;

  //       // compact old year
  //       await db
  //         .update(milestones)
  //         .set({ order: sql`${milestones.order} - 1`, updatedAt: new Date() })
  //         .where(
  //           and(
  //             eq(milestones.year, existing.year),
  //             eq(milestones.isActive, "true"),
  //             gt(milestones.order, currentOrder)
  //           )
  //         );

  //       // find new order
  //       const [maxInYear] = await db
  //         .select({
  //           maxOrder: sql<number>`CAST(MAX(${milestones.order}) AS INT)`,
  //         })
  //         .from(milestones)
  //         .where(
  //           and(eq(milestones.isActive, "true"), eq(milestones.year, newYear))
  //         );

  //       let newOrder: number;
  //       if (maxInYear?.maxOrder) {
  //         newOrder = maxInYear.maxOrder + 1;
  //       } else {
  //         const [globalMax] = await db
  //           .select({
  //             maxOrder: sql<number>`CAST(MAX(${milestones.order}) AS INT)`,
  //           })
  //           .from(milestones)
  //           .where(eq(milestones.isActive, "true"));
  //         newOrder = (globalMax?.maxOrder ?? 0) + 1;
  //       }

  //       await db
  //         .update(milestones)
  //         .set({ order: sql`${milestones.order} + 1`, updatedAt: new Date() })
  //         .where(
  //           and(
  //             eq(milestones.isActive, "true"),
  //             eq(milestones.year, newYear),
  //             gte(milestones.order, newOrder)
  //           )
  //         );

  //       orderUpdate = newOrder;
  //       updateData.year = newYear;
  //     }

  //     const [milestone] = await db
  //       .update(milestones)
  //       .set({ ...updateData, order: orderUpdate ?? existing.order })
  //       .where(eq(milestones.id, id))
  //       .returning();

  //     if (!milestone)
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Milestone not found",
  //       });
  //     return milestone;
  //   }),
  // updateActiveAndOrder: protectedProcedure
  //   .input(
  //     z.object({
  //       milestoneId: z.string(),
  //       action: z.enum(["toggleActive", "up", "down"]),
  //       activate: z.boolean().optional(), // only for toggleActive
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { id: userId } = ctx.user;
  //     await requireRole(userId, ["super_admin", "admin"]);

  //     const { milestoneId, action, activate } = input;

  //     const [milestone] = await db
  //       .select()
  //       .from(milestones)
  //       .where(eq(milestones.id, milestoneId));

  //     if (!milestone) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Milestone not found.",
  //       });
  //     }

  //     const milestoneYear = milestone.year!;

  //     // Toggle Active / Deactivate
  //     if (action === "toggleActive") {
  //       if (activate) {
  //         // Find last order within the same year
  //         const [maxInYear] = await db
  //           .select({
  //             maxOrder: sql<number>`CAST(MAX(${milestones.order}) AS INT)`,
  //           })
  //           .from(milestones)
  //           .where(
  //             and(
  //               eq(milestones.isActive, "true"),
  //               eq(milestones.year, milestoneYear)
  //             )
  //           );

  //         const newOrder = (maxInYear?.maxOrder ?? 0) + 1;

  //         // Shift all milestones in *later years* by +1
  //         await db
  //           .update(milestones)
  //           .set({
  //             order: sql`${milestones.order} + 1`,
  //             updatedAt: new Date(),
  //           })
  //           .where(
  //             and(
  //               eq(milestones.isActive, "true"),
  //               gt(milestones.year, milestoneYear)
  //             )
  //           );

  //         // Activate this milestone
  //         await db
  //           .update(milestones)
  //           .set({
  //             isActive: "true",
  //             order: newOrder,
  //             updatedAt: new Date(),
  //           })
  //           .where(eq(milestones.id, milestoneId));
  //       } else {
  //         // Deactivate: remove order and shift later ones up
  //         const currentOrder = milestone.order ?? 0;

  //         await db
  //           .update(milestones)
  //           .set({ isActive: "false", order: 0, updatedAt: new Date() })
  //           .where(eq(milestones.id, milestoneId));

  //         await db
  //           .update(milestones)
  //           .set({
  //             order: sql`${milestones.order} - 1`,
  //             updatedAt: new Date(),
  //           })
  //           .where(
  //             and(
  //               gt(milestones.order, currentOrder),
  //               eq(milestones.isActive, "true")
  //             )
  //           );
  //       }
  //     }

  //     // Reorder within the same year
  //     if (action === "up" || action === "down") {
  //       if (milestone.isActive !== "true") {
  //         throw new TRPCError({
  //           code: "FORBIDDEN",
  //           message: "Only active milestones can be reordered",
  //         });
  //       }

  //       const direction = action === "up" ? -1 : 1;
  //       const targetOrder = milestone.order! + direction;

  //       // Look for another milestone in the same year with target order
  //       const [targetMilestone] = await db
  //         .select()
  //         .from(milestones)
  //         .where(
  //           and(
  //             eq(milestones.isActive, "true"),
  //             eq(milestones.year, milestoneYear),
  //             eq(milestones.order, targetOrder)
  //           )
  //         );

  //       if (!targetMilestone) return true; // at boundary of year

  //       // Swap orders
  //       await db
  //         .update(milestones)
  //         .set({ order: targetOrder, updatedAt: new Date() })
  //         .where(eq(milestones.id, milestone.id));

  //       await db
  //         .update(milestones)
  //         .set({ order: milestone.order })
  //         .where(eq(milestones.id, targetMilestone.id));
  //     }

  //     return true;
  //   }),

  // getMaxOrder: protectedProcedure
  //   .input(
  //     z.object({
  //       year: z.number(),
  //     })
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const { id: userId } = ctx.user;
  //     await requireRole(userId, ["super_admin", "admin"]);

  //     const [result] = await db
  //       .select({
  //         maxOrder: sql<number>`CAST(MAX(${milestones.order}) AS INT)`,
  //       })
  //       .from(milestones)
  //       .where(
  //         and(eq(milestones.isActive, "true"), eq(milestones.year, input.year))
  //       );

  //     return result?.maxOrder ?? 0;
  //   }),

  // getMinOrder: protectedProcedure
  //   .input(
  //     z.object({
  //       year: z.number(),
  //     })
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const { id: userId } = ctx.user;
  //     await requireRole(userId, ["super_admin", "admin"]);

  //     const [result] = await db
  //       .select({
  //         minOrder: sql<number>`CAST(MIN(${milestones.order}) AS INT)`,
  //       })
  //       .from(milestones)
  //       .where(
  //         and(eq(milestones.isActive, "true"), eq(milestones.year, input.year))
  //       );

  //     return result?.minOrder ?? 0;
  //   }),

  update: protectedProcedure
    .input(
      milestoneUpdateSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { id, ...rest } = input;

      const [existing] = await db
        .select()
        .from(milestones)
        .where(eq(milestones.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Milestone not found",
        });
      }

      const updateData: Partial<typeof milestones.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.title !== undefined) {
        if (rest.title !== existing.title) {
          updateData.title = rest.title;
          updateData.slug = await generateUniqueSlug(rest.title, milestones);
        }
      }
      if (rest.description !== undefined) {
        updateData.description = rest.description;
      }
      if (rest.year !== undefined) {
        updateData.year = rest.year;
      }
      if (rest.imageUrl !== undefined) {
        updateData.imageUrl =
          typeof rest.imageUrl === "string" && rest.imageUrl.trim() === ""
            ? null
            : rest.imageUrl;
      }
      if (rest.isActive !== undefined) {
        updateData.isActive = rest.isActive;
      }
      if (rest.imageKey !== undefined) {
        updateData.imageKey = rest.imageKey;
      }
      if (rest.order !== undefined) {
        updateData.order = rest.order;
      }

      let orderUpdate: number | undefined = undefined;

      if (rest.isActive === "true" && existing.isActive === "false") {
        const [maxRow] = await db
          .select({ maxOrder: sql<number>`max(${milestones.order})` })
          .from(milestones)
          .where(eq(milestones.isActive, "true"));

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
          .update(milestones)
          .set({
            order: sql`${milestones.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(milestones.order, currentOrder),
              eq(milestones.isActive, "true")
            )
          );
      }

      const [milestone] = await db
        .update(milestones)
        .set({
          ...updateData,
          order: orderUpdate ?? existing.order,
        })
        .where(eq(milestones.id, id))
        .returning();

      if (!milestone) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Milestone not found.",
        });
      }
      return milestone;
    }),
  updateActiveAndOrder: protectedProcedure
    .input(
      z.object({
        milestoneId: z.string(),
        action: z.enum(["toggleActive", "up", "down"]),
        activate: z.boolean().optional(), // only for toggleActive
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { milestoneId, action, activate } = input;

      const [milestone] = await db
        .select()
        .from(milestones)
        .where(eq(milestones.id, milestoneId));

      if (!milestone) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Milestone not found.",
        });
      }

      if (action === "toggleActive") {
        if (activate) {
          // Count active milestones
          const activeCount = await db
            .select()
            .from(milestones)
            .where(eq(milestones.isActive, "true"));

          await db
            .update(milestones)
            .set({
              isActive: "true",
              order: activeCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(milestones.id, milestoneId));
        } else {
          // Deactivate: reorder others if needed
          const currentOrder = milestone.order;
          await db
            .update(milestones)
            .set({ isActive: "false", order: 0, updatedAt: new Date() })
            .where(eq(milestones.id, milestoneId));

          // Reorder other active milestones
          await db
            .update(milestones)
            .set({
              order: sql`${milestones.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(milestones.order, currentOrder),
                eq(milestones.isActive, "true")
              )
            );
        }
      }

      // Up / Down order
      if (action === "up" || action === "down") {
        if (milestone.isActive !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only active milestones can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = milestone.order! + direction;

        const [targetMilestone] = await db
          .select()
          .from(milestones)
          .where(
            and(
              eq(milestones.isActive, "true"),
              eq(milestones.order, targetOrder)
            )
          );

        if (!targetMilestone) return; // already at boundary

        // Swap orders
        await db
          .update(milestones)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(milestones.id, milestone.id));
        await db
          .update(milestones)
          .set({ order: milestone.order })
          .where(eq(milestones.id, targetMilestone.id));
      }
      return true;
    }),

  getMaxOrder: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    await requireRole(userId, ["super_admin", "admin"]);
    const [result] = await db
      .select({ maxOrder: sql<number>`CAST(MAX(${milestones.order}) AS INT)` })
      .from(milestones)
      .where(eq(milestones.isActive, "true"));

    // result.maxOrder might be null if no active milestones
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
      const milestone = await db.query.milestones.findFirst({
        where: (p, { eq }) => eq(p.id, input.id),
      });

      if (!milestone) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Milestone not found.",
        });
      }

      return milestone;
    }),

  getAllYears: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    await requireRole(userId, ["super_admin", "admin"]);

    const years = await db
      .selectDistinct({ year: milestones.year })
      .from(milestones)
      .orderBy(milestones.year);

    return years.map((y) => y.year).filter((y): y is number => !!y);
  }),
  getMany: baseProcedure.query(async () => {
    const data = await db
      .select()
      .from(milestones)
      .where(eq(milestones.isActive, "true"))
      .orderBy(asc(milestones.order));
    return data;
  }),
});
