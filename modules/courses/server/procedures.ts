import { db } from "@/db";
import { buildingCourses, courseCreateSchema, courses } from "@/db/schema";
import {
  booleanTypeEnum,
  courseCategoryEnum,
  courseLevelEnum,
} from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import { generateUniqueSlug } from "@/server/utils/generateUniqueSlug";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, eq, ilike, or } from "drizzle-orm";
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

      // Build the query
      let query = db.select().from(courses);

      // Join buildingCourses if buildingId is provided
      if (buildingId) {
        query.innerJoin(
          buildingCourses,
          eq(buildingCourses.courseId, courses.id)
        );
      }

      query.where(filters);

      // Order by featured first, then last updated
      const result = await query.orderBy(
        asc(courses.isActive),
        asc(courses.order)
      );

      return result;
    }),
  create: protectedProcedure
    .input(courseCreateSchema.extend({ slug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const [course] = await db
        .insert(courses)
        .values({
          title: input.title,
          slug: await generateUniqueSlug(input.title, courses),
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

      if (!course) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create course.",
        });
      }

      return course;
    }),
  getUniqueSlug: protectedProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      return await generateUniqueSlug(input.title, courses);
    }),
});
