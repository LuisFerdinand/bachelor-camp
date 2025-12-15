import { db } from "@/db";
import {
  buildingCourses,
  buildings,
  courseCreateSchema,
  courses,
  updateCourseSchema,
} from "@/db/schema";
import {
  booleanTypeEnum,
  courseCategoryEnum,
  courseLevelEnum,
} from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import { generateUniqueSlug } from "@/server/utils/generateUniqueSlug";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, eq, gt, ilike, inArray, or, sql } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import z from "zod";

export const coursesRouter = createTRPCRouter({
  getFiltered: protectedProcedure
    .input(
      z.object({
        category: z.enum(courseCategoryEnum.enumValues).optional(),
        level: z.enum(courseLevelEnum.enumValues).optional(),
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        isFeatured: z.enum(booleanTypeEnum.enumValues).optional(),
        buildingId: z.string().optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const { category, level, isActive, isFeatured, buildingId, searchQuery } =
        input;

      // Base filters
      const filters = and(
        category ? eq(courses.category, category) : undefined,
        level ? eq(courses.level, level) : undefined,
        isActive ? eq(courses.isActive, isActive) : undefined,
        isFeatured ? eq(courses.isFeatured, isFeatured) : undefined,
        buildingId ? eq(buildingCourses.buildingId, buildingId) : undefined,
        searchQuery
          ? or(
              ilike(courses.title, `%${searchQuery}%`),
              ilike(courses.description, `%${searchQuery}%`)
            )
          : undefined
      );

      let query = db
        .select()
        .from(courses)
        .where(filters)
        .orderBy(
          asc(courses.isActive),
          asc(courses.order),
          asc(courses.isFeatured),
          asc(courses.title)
        );

      if (buildingId) {
        query.innerJoin(
          buildingCourses,
          eq(buildingCourses.courseId, courses.id)
        );
      }

      const courseResults = await query;

      // Get all courseIds
      const courseIds = courseResults.map((c) => c.id);
      if (courseIds.length === 0) return [];

      const courseBuildings = await db
        .select({
          courseId: buildingCourses.courseId,
          building: buildings,
        })
        .from(buildingCourses)
        .innerJoin(buildings, eq(buildings.id, buildingCourses.buildingId))
        .where(inArray(buildingCourses.courseId, courseIds));

      // Group buildings by courseId
      const buildingsByCourse: Record<
        string,
        (typeof buildings.$inferSelect)[]
      > = {};
      for (const row of courseBuildings) {
        if (!buildingsByCourse[row.courseId]) {
          buildingsByCourse[row.courseId] = [];
        }
        buildingsByCourse[row.courseId].push(row.building);
      }

      // Merge into final result
      return courseResults.map((course) => ({
        ...course,
        buildings: buildingsByCourse[course.id] ?? [],
      }));
    }),
  create: protectedProcedure
    .input(courseCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const [course] = await db
        .insert(courses)
        .values({
          title: input.title,
          slug: input.slug,
          category: input.category,
          level: input.level,
          duration: input.duration,
          totalSessions: input.totalSessions,
          description: input.description,
          learningGoals: input.learningGoals ?? [],
          syllabus: input.syllabus ?? [],
          teachingMethods: input.teachingMethods ?? [],
          resources: input.resources ?? [],
          targetAudience: input.targetAudience ?? [],
          price: input.price,
          isFeatured: input.isFeatured,
          isActive: "false",
        })
        .returning();

      if (input.buildingIds?.length! > 0) {
        await db.insert(buildingCourses).values(
          input.buildingIds!.map((buildingId) => ({
            courseId: course.id,
            buildingId,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
        );
      }

      if (!course) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create course.",
        });
      }

      return course;
    }),
  update: protectedProcedure
    .input(
      updateCourseSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { id, ...rest } = input;

      const [existing] = await db
        .select()
        .from(courses)
        .where(eq(courses.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found",
        });
      }

      const updateData: Partial<typeof courses.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.title !== undefined) {
        if (rest.title !== existing.title) {
          updateData.title = rest.title;
          updateData.slug = await generateUniqueSlug(rest.title, courses);
        }
      }
      if (rest.category !== undefined) {
        updateData.category = rest.category;
      }
      if (rest.level !== undefined) {
        updateData.level = rest.level;
      }
      if (rest.imageUrl !== undefined) {
        updateData.imageUrl =
          typeof rest.imageUrl === "string" && rest.imageUrl.trim() === ""
            ? null
            : rest.imageUrl;
      }
      if (rest.duration !== undefined) {
        updateData.duration = rest.duration;
      }
      if (rest.imageKey !== undefined) {
        updateData.imageKey = rest.imageKey;
      }
      if (rest.totalSessions !== undefined) {
        updateData.totalSessions = rest.totalSessions;
      }
      if (rest.description !== undefined) {
        updateData.description = rest.description;
      }
      if (rest.learningGoals !== undefined) {
        updateData.learningGoals = rest.learningGoals;
      }
      if (rest.syllabus !== undefined) {
        updateData.syllabus = rest.syllabus;
      }
      if (rest.teachingMethods !== undefined) {
        updateData.teachingMethods = rest.teachingMethods;
      }
      if (rest.resources !== undefined) {
        updateData.resources = rest.resources;
      }
      if (rest.targetAudience !== undefined) {
        updateData.targetAudience = rest.targetAudience;
      }
      if (rest.price !== undefined) {
        updateData.price = rest.price;
      }
      if (rest.isActive !== undefined) {
        updateData.isActive = rest.isActive;
      }
      if (rest.isFeatured !== undefined) {
        updateData.isFeatured = rest.isFeatured;
      }

      let orderUpdate: number | undefined = undefined;

      if (rest.isActive === "true" && existing.isActive === "false") {
        const [maxRow] = await db
          .select({ maxOrder: sql<number>`max(${courses.order})` })
          .from(courses)
          .where(eq(courses.isActive, "true"));

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
          .update(courses)
          .set({
            order: sql`${courses.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(gt(courses.order, currentOrder), eq(courses.isActive, "true"))
          );
      }

      const [course] = await db
        .update(courses)
        .set({
          ...updateData,
          order: orderUpdate ?? existing.order,
        })
        .where(eq(courses.id, id))
        .returning();

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found.",
        });
      }

      if (rest.buildingIds !== undefined) {
        await db
          .delete(buildingCourses)
          .where(eq(buildingCourses.courseId, id));

        if (rest.buildingIds.length > 0) {
          await db.insert(buildingCourses).values(
            rest.buildingIds.map((buildingId) => ({
              courseId: id,
              buildingId,
              createdAt: new Date(),
              updatedAt: new Date(),
            }))
          );
        }
      }
      return course;
    }),
  getUniqueSlug: protectedProcedure
    .input(
      z.object({ title: z.string(), excludeId: z.string().uuid().optional() })
    )
    .query(async ({ input }) => {
      return await generateUniqueSlug(input.title, courses, input.excludeId);
    }),
  getMany: baseProcedure.query(async () => {
    return await db.select().from(courses);
  }),
  getOneProtected: protectedProcedure
    .input(z.object({ courseId: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const { courseId } = input;
      const { id: userId } = ctx.user;

      const [course] = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (!course) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await requireRole(userId, ["admin", "super_admin"]);

      const selectedBuildingIds = await db
        .select({ buildingId: buildingCourses.buildingId })
        .from(buildingCourses)
        .where(eq(buildingCourses.courseId, courseId));

      const buildingIds = selectedBuildingIds.map((row) => row.buildingId);

      return {
        ...course,
        buildingIds,
      };
    }),

  remove: protectedProcedure
    .input(
      z.object({
        courseId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { courseId } = input;

      const course = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId))
        .then((res) => res[0]);

      if (!course) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const currentOrder = course.order ?? 0;

      if (course.imageKey) {
        const utapi = new UTApi();
        try {
          await utapi.deleteFiles(course.imageKey);
          console.log(`Deleted logo from UploadThing: ${course.imageKey}`);
        } catch (error) {
          console.error(
            "⚠️ Failed to delete course image from UploadThing:",
            error
          );
        }
      }

      const [deletedCourse] = await db
        .delete(courses)
        .where(eq(courses.id, courseId))
        .returning();

      if (!deletedCourse) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete course.",
        });
      }

      if (course.isActive === "true") {
        await db
          .update(courses)
          .set({
            order: sql`${courses.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(gt(courses.order, currentOrder), eq(courses.isActive, "true"))
          );
      }

      return deletedCourse;
    }),
  updateActiveAndOrder: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        action: z.enum(["toggleActive", "up", "down"]),
        activate: z.boolean().optional(), // only for toggleActive
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { courseId, action, activate } = input;

      const [course] = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found.",
        });
      }

      if (action === "toggleActive") {
        if (activate) {
          // Count active courses
          const activeCount = await db
            .select()
            .from(courses)
            .where(eq(courses.isActive, "true"));

          await db
            .update(courses)
            .set({
              isActive: "true",
              order: activeCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(courses.id, courseId));
        } else {
          // Deactivate: reorder others if needed
          const currentOrder = course.order;
          await db
            .update(courses)
            .set({ isActive: "false", order: 0, updatedAt: new Date() })
            .where(eq(courses.id, courseId));

          // Reorder other active courses
          await db
            .update(courses)
            .set({
              order: sql`${courses.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(courses.order!, currentOrder!),
                eq(courses.isActive!, "true")
              )
            );
        }
      }

      // Up / Down order
      if (action === "up" || action === "down") {
        if (course.isActive !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only active courses can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = course.order! + direction;

        const [targetCourse] = await db
          .select()
          .from(courses)
          .where(
            and(eq(courses.isActive, "true"), eq(courses.order, targetOrder))
          );

        if (!targetCourse) return; // already at boundary

        // Swap orders
        await db
          .update(courses)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(courses.id, course.id));
        await db
          .update(courses)
          .set({ order: course.order })
          .where(eq(courses.id, targetCourse.id));
      }

      return true;
    }),

  getMaxOrder: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    await requireRole(userId, ["super_admin", "admin"]);
    const [result] = await db
      .select({ maxOrder: sql<number>`CAST(MAX(${courses.order}) AS INT)` })
      .from(courses)
      .where(eq(courses.isActive, "true"));

    // result.maxOrder might be null if no active courses
    return result?.maxOrder ?? 0;
  }),
});
