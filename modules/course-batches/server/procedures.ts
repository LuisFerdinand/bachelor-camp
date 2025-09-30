import { db } from "@/db";
import {
  batchSessions,
  batchWeeklySchedule,
  courseBatches,
  CourseBatchWithDetails,
  courses,
} from "@/db/schema";
import {
  booleanTypeEnum,
  courseBatchStatusEnum,
  courseCategoryEnum,
  courseLevelEnum,
  deliveryModeEnum,
} from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { and, desc, eq, gte, ilike, inArray, lte, or, sql } from "drizzle-orm";
import z from "zod";

export const courseBatchesRouter = createTRPCRouter({
  getFiltered: protectedProcedure
    .input(
      z.object({
        courseId: z.string().optional(),
        status: z.enum(courseBatchStatusEnum.enumValues).optional(),
        deliveryMode: z.enum(deliveryModeEnum.enumValues).optional(),
        category: z.enum(courseCategoryEnum.enumValues).optional(),
        level: z.enum(courseLevelEnum.enumValues).optional(),
        isFeatured: z.enum(booleanTypeEnum.enumValues).optional(),
        startDateFrom: z.string().optional(),
        startDateTo: z.string().optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { id: userId } = ctx.user;

        await requireRole(userId, ["super_admin", "admin"]);

        const {
          courseId,
          status,
          deliveryMode,
          category,
          level,
          startDateFrom,
          startDateTo,
          isFeatured,
          searchQuery,
        } = input;

        console.log("Input filters:", input);

        // Base filters for course batches
        const batchFilters = and(
          courseId ? eq(courseBatches.courseId, courseId) : undefined,
          status ? eq(courseBatches.status, status) : undefined,
          deliveryMode
            ? eq(courseBatches.deliveryMode, deliveryMode)
            : undefined,
          startDateFrom
            ? gte(courseBatches.startDate, startDateFrom)
            : undefined,
          startDateTo ? lte(courseBatches.startDate, startDateTo) : undefined
        );

        // Course filters
        const courseFilters = and(
          category ? eq(courses.category, category) : undefined,
          level ? eq(courses.level, level) : undefined,
          isFeatured
            ? eq(courses.isFeatured, isFeatured === "true" ? "true" : "false")
            : undefined,
          searchQuery
            ? or(
                ilike(courses.title, `%${searchQuery}%`),
                ilike(courses.description, `%${searchQuery}%`),
                ilike(courses.category, `%${searchQuery}%`),
                ilike(courses.level, `%${searchQuery}%`)
              )
            : undefined
        );

        const completedSessions = db
          .select({
            courseBatchId: batchSessions.courseBatchId,
            count: sql<number>`count(*)`.as("completed_count"),
          })
          .from(batchSessions)
          .where(eq(batchSessions.status, "completed"))
          .groupBy(batchSessions.courseBatchId)
          .as("completed_sessions");

        console.log("Starting main query...");

        // Main query with joins
        const result = await db
          .select({
            // CourseBatch fields
            id: courseBatches.id,
            courseId: courseBatches.courseId,
            startDate: courseBatches.startDate,
            number: courseBatches.number,
            endDate: courseBatches.endDate,
            capacity: courseBatches.capacity,
            deliveryMode: courseBatches.deliveryMode,
            price: courseBatches.price,
            status: courseBatches.status,
            createdAt: courseBatches.createdAt,
            updatedAt: courseBatches.updatedAt,

            // Course fields
            courseTitle: courses.title,
            courseCategory: courses.category,
            courseImageUrl: courses.imageUrl,
            courseLevel: courses.level,
            courseDescription: courses.description,
            courseIsFeatured: courses.isFeatured,
            courseDuration: courses.duration,
            courseTotalSessions: courses.totalSessions,
            courseIsActive: courses.isActive,

            // Fixed: Use proper reference to subquery column
            enrolledCount: sql<number>`0`,
            completedSessionsCount: sql<number>`COALESCE(${completedSessions.count}, 0)`,
          })
          .from(courseBatches)
          .innerJoin(courses, eq(courseBatches.courseId, courses.id))
          .leftJoin(
            completedSessions,
            eq(completedSessions.courseBatchId, courseBatches.id)
          )
          .where(
            // Fixed: Properly handle undefined filters
            batchFilters || courseFilters
              ? and(batchFilters, courseFilters)
              : undefined
          )
          .orderBy(
            sql`CASE 
            WHEN ${courseBatches.status}::text = 'upcoming' THEN 1
            WHEN ${courseBatches.status}::text = 'ongoing' THEN 2  
            WHEN ${courseBatches.status}::text = 'completed' THEN 3
            WHEN ${courseBatches.status}::text = 'cancelled' THEN 4
            ELSE 5
          END`,
            desc(courseBatches.startDate)
          );

        console.log("Main query completed, result count:", result.length);

        // Get schedule summaries for each batch
        const batchIds = result.map((r) => r.id);
        console.log("Batch IDs:", batchIds);

        const schedules =
          batchIds.length > 0
            ? await db
                .select({
                  courseBatchId: batchWeeklySchedule.courseBatchId,
                  dayOfWeek: batchWeeklySchedule.dayOfWeek,
                  startTime: batchWeeklySchedule.startTime,
                  endTime: batchWeeklySchedule.endTime,
                  isClosed: batchWeeklySchedule.isClosed,
                })
                .from(batchWeeklySchedule)
                .where(
                  and(
                    inArray(batchWeeklySchedule.courseBatchId, batchIds),
                    eq(batchWeeklySchedule.isClosed, "false")
                  )
                )
            : [];

        console.log("Schedules fetched:", schedules.length);

        // Group schedules by batch ID
        const scheduleMap = schedules.reduce(
          (acc, schedule) => {
            if (!acc[schedule.courseBatchId]) {
              acc[schedule.courseBatchId] = [];
            }
            acc[schedule.courseBatchId].push(schedule);
            return acc;
          },
          {} as Record<string, typeof schedules>
        );

        // Transform result to match the expected type
        const transformedResult: CourseBatchWithDetails[] = result.map(
          (row) => {
            const batchSchedules = scheduleMap[row.id] || [];

            const activeDays = batchSchedules.map((s) => s.dayOfWeek);
            const timeRanges = [
              ...new Set(
                batchSchedules.map((s) => `${s.startTime}-${s.endTime}`)
              ),
            ];
            const timeRange = timeRanges.join(", ");

            return {
              id: row.id,
              courseId: row.courseId,
              startDate: row.startDate,
              endDate: row.endDate,
              capacity: row.capacity,
              number: row.number,
              deliveryMode: row.deliveryMode,
              price: row.price,
              status: row.status,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,

              course: {
                id: row.courseId,
                title: row.courseTitle,
                category: row.courseCategory,
                imageUrl: row.courseImageUrl,
                description: row.courseDescription,
                isFeatured: row.courseIsFeatured,
                level: row.courseLevel,
                duration: row.courseDuration,
                totalSessions: row.courseTotalSessions,
                isActive: row.courseIsActive,
              },

              enrolledCount: row.enrolledCount,
              totalSessions: row.courseTotalSessions,
              completedSessions: row.completedSessionsCount,

              scheduleSummary: batchSchedules.reduce(
                (acc, schedule) => {
                  acc[schedule.dayOfWeek] =
                    `${schedule.startTime}-${schedule.endTime}`;
                  return acc;
                },
                {} as Record<string, string>
              ),
            };
          }
        );

        console.log("Transformation completed");

        return transformedResult;
      } catch (error) {
        console.error("Error in getFiltered procedure:", error);
        throw error;
      }
    }),
  getMany: baseProcedure.query(async () => {
    return await db.select().from(courseBatches);
  }),
});
