import { db } from "@/db";
import {
  batchSessions,
  batchWeeklySchedule,
  batchWeeklyScheduleSchema,
  courseBatchCreateSchema,
  courseBatches,
  courseBatchUpdateSchema,
  CourseBatchWithDetails,
  courses,
} from "@/db/schema";
import {
  booleanTypeEnum,
  courseBatchStatusEnum,
  courseCategoryEnum,
  courseLevelEnum,
  DAY_OF_WEEK,
  deliveryModeEnum,
} from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
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

        // console.log("Input filters:", input);

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

        // console.log("Starting main query...");

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

        // console.log("Main query completed, result count:", result.length);

        // Get schedule summaries for each batch
        const batchIds = result.map((r) => r.id);
        // console.log("Batch IDs:", batchIds);

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

        // console.log("Schedules fetched:", schedules.length);

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

        // console.log("Transformation completed");

        return transformedResult;
      } catch (error) {
        // console.error("Error in getFiltered procedure:", error);
        throw error;
      }
    }),
  getMany: baseProcedure.query(async () => {
    return await db.select().from(courseBatches);
  }),
  create: protectedProcedure
    .input(courseBatchCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const selectedCourse = await db
        .select()
        .from(courses)
        .where(eq(courses.id, input.courseId))
        .then((res) => res[0]);

      if (!selectedCourse) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [lastBatch] = await db
        .select({ number: courseBatches.number })
        .from(courseBatches)
        .where(eq(courseBatches.courseId, input.courseId))
        .orderBy(desc(courseBatches.number))
        .limit(1);

      const nextNumber = lastBatch ? lastBatch.number + 1 : 1;

      const [courseBatch] = await db
        .insert(courseBatches)
        .values({
          courseId: input.courseId,
          number: nextNumber,
          price: input.price,
          startDate: input.startDate,
          capacity: input.capacity,
          deliveryMode: input.deliveryMode,
          endDate: input.endDate,
          status: "upcoming",
        })
        .returning();

      if (!courseBatch) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create course batch.",
        });
      }

      // 4️⃣ Create weekly schedule records
      if (input.weeklySchedules && input.weeklySchedules.length > 0) {
        await db.insert(batchWeeklySchedule).values(
          input.weeklySchedules.map((schedule) => ({
            courseBatchId: courseBatch.id,
            dayOfWeek: schedule.dayOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            isClosed: schedule.isClosed,
            notes: schedule.notes || null,
            location: schedule.location || null,
          }))
        );
      }
      // 5️⃣ Generate sessions based on course totalSessions & weekly schedules
      const sessionsToInsert: (typeof batchSessions.$inferInsert)[] = [];

      if (input.startDate && selectedCourse.totalSessions > 0) {
        const start = new Date(input.startDate);
        let currentDate = new Date(start);
        let order = 1;

        const activeSchedules = input.weeklySchedules!.filter(
          (s) => s.isClosed === "false"
        );

        if (!activeSchedules.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "No active schedules available to generate sessions.",
          });
        }

        while (order <= selectedCourse.totalSessions) {
          // convert Sunday=0 to sunday, Monday=1 to monday, etc.
          const dayIndex =
            currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;
          const dayName = DAY_OF_WEEK[
            dayIndex
          ] as (typeof activeSchedules)[number]["dayOfWeek"];

          const daySchedules = activeSchedules.filter(
            (s) => s.dayOfWeek === dayName
          );
          for (const sched of daySchedules) {
            if (order > selectedCourse.totalSessions) break;

            const [startHour, startMinute] = sched.startTime
              .split(":")
              .map(Number);
            const [endHour, endMinute] = sched.endTime.split(":").map(Number);

            const startDateTime = new Date(currentDate);
            startDateTime.setHours(startHour, startMinute, 0, 0);

            const endDateTime = new Date(currentDate);
            endDateTime.setHours(endHour, endMinute, 0, 0);

            sessionsToInsert.push({
              courseBatchId: courseBatch.id,
              startDateTime,
              endDateTime,
              deliveryMode: input.deliveryMode,
              status: "scheduled",
              order,
              notes: sched.notes ?? null,
            });

            order++;
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }

        if (sessionsToInsert.length > 0) {
          await db.insert(batchSessions).values(sessionsToInsert);

          const lastSession = sessionsToInsert[sessionsToInsert.length - 1];
          const lastSessionDate = lastSession.endDateTime;

          // ✅ Convert to string format compatible with your DB schema
          await db
            .update(courseBatches)
            .set({
              endDate: lastSessionDate!.toISOString(), // or .toISOString().split("T")[0] if it's DATE type
            })
            .where(eq(courseBatches.id, courseBatch.id));
        }
      }

      // 6️⃣ Return
      return {
        ...courseBatch,
        totalWeeklySchedules: input.weeklySchedules?.length || 0,
        totalSessions: sessionsToInsert.length,
      };
    }),

  update: protectedProcedure
    .input(
      courseBatchUpdateSchema.extend({
        id: z.string().uuid("Invalid course batch ID"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const {
        id: courseBatchId,
        capacity,
        deliveryMode,
        price,
        status,
        weeklySchedules,
        startDate,
      } = input;

      // 1️⃣ Get current batch and course info
      const [courseBatch] = await db
        .select({
          id: courseBatches.id,
          courseId: courseBatches.courseId,
          startDate: courseBatches.startDate,
          endDate: courseBatches.endDate,
          deliveryMode: courseBatches.deliveryMode,
        })
        .from(courseBatches)
        .where(eq(courseBatches.id, courseBatchId));

      if (!courseBatch) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course batch not found.",
        });
      }

      const [course] = await db
        .select({
          totalSessions: courses.totalSessions,
        })
        .from(courses)
        .where(eq(courses.id, courseBatch.courseId));

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Related course not found.",
        });
      }

      // 2️⃣ Update basic editable fields
      await db
        .update(courseBatches)
        .set({
          capacity,
          deliveryMode,
          price,
          status,
          updatedAt: new Date(),
        })
        .where(eq(courseBatches.id, courseBatchId));

      // 3️⃣ If weeklySchedules provided, replace them
      if (weeklySchedules && weeklySchedules.length > 0) {
        await db
          .delete(batchWeeklySchedule)
          .where(eq(batchWeeklySchedule.courseBatchId, courseBatchId));

        await db.insert(batchWeeklySchedule).values(
          weeklySchedules.map((schedule) => ({
            courseBatchId,
            dayOfWeek: schedule.dayOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            isClosed: schedule.isClosed ?? "false",
            notes: schedule.notes ?? null,
            location: schedule.location ?? null,
          }))
        );
      }

      // 4️⃣ If startDate or weeklySchedules changed → regenerate sessions
      if (startDate && weeklySchedules && weeklySchedules.length > 0) {
        // Delete old sessions
        await db
          .delete(batchSessions)
          .where(eq(batchSessions.courseBatchId, courseBatchId));

        const sessionsToInsert: (typeof batchSessions.$inferInsert)[] = [];

        const start = new Date(startDate);
        let currentDate = new Date(start);
        let order = 1;

        const activeSchedules = weeklySchedules.filter(
          (s) => s.isClosed === "false"
        );

        if (!activeSchedules.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "No active schedules available to generate sessions.",
          });
        }

        while (order <= course.totalSessions) {
          const dayIndex =
            currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;
          const dayName = DAY_OF_WEEK[
            dayIndex
          ] as (typeof activeSchedules)[number]["dayOfWeek"];

          const daySchedules = activeSchedules.filter(
            (s) => s.dayOfWeek === dayName
          );

          for (const sched of daySchedules) {
            if (order > course.totalSessions) break;

            const [startHour, startMinute] = sched.startTime
              .split(":")
              .map(Number);
            const [endHour, endMinute] = sched.endTime.split(":").map(Number);

            const startDateTime = new Date(currentDate);
            startDateTime.setHours(startHour, startMinute, 0, 0);

            const endDateTime = new Date(currentDate);
            endDateTime.setHours(endHour, endMinute, 0, 0);

            sessionsToInsert.push({
              courseBatchId,
              startDateTime,
              endDateTime,
              deliveryMode: deliveryMode ?? courseBatch.deliveryMode,
              status: "scheduled",
              order,
              notes: sched.notes ?? null,
            });

            order++;
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }

        if (sessionsToInsert.length > 0) {
          await db.insert(batchSessions).values(sessionsToInsert);

          const lastSession = sessionsToInsert[sessionsToInsert.length - 1];
          const lastSessionDate = lastSession.endDateTime;

          // Update courseBatch endDate
          await db
            .update(courseBatches)
            .set({
              endDate: lastSessionDate?.toISOString().split("T")[0],
              updatedAt: new Date(),
            })
            .where(eq(courseBatches.id, courseBatchId));
        }
      }

      // 5️⃣ Return summary
      return {
        courseBatchId,
        updatedFields: {
          capacity,
          deliveryMode,
          price,
          status,
        },
        totalWeeklySchedules: weeklySchedules?.length ?? null,
        regeneratedSessions:
          startDate && weeklySchedules && weeklySchedules.length > 0,
      };
    }),

  remove: protectedProcedure
    .input(
      z.object({
        courseBatchId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { courseBatchId } = input;

      const courseBatch = await db
        .select()
        .from(courseBatches)
        .where(eq(courseBatches.id, courseBatchId))
        .then((res) => res[0]);

      if (!courseBatch) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [deletedCourseBatch] = await db
        .delete(courses)
        .where(eq(courses.id, courseBatchId))
        .returning();

      if (!deletedCourseBatch) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete course batch.",
        });
      }

      return deletedCourseBatch;
    }),
  getOneProtected: protectedProcedure
    .input(z.object({ courseBatchId: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const { courseBatchId } = input;
      const { id: userId } = ctx.user;

      // Ensure authorized user
      await requireRole(userId, ["admin", "super_admin"]);

      // Get the course batch and its associated course
      const [courseBatch] = await db
        .select({
          id: courseBatches.id,
          courseId: courseBatches.courseId,
          deliveryMode: courseBatches.deliveryMode,
          capacity: courseBatches.capacity,
          status: courseBatches.status,
          price: courseBatches.price,
          startDate: courseBatches.startDate,
          endDate: courseBatches.endDate,
          createdAt: courseBatches.createdAt,
          updatedAt: courseBatches.updatedAt,
          courseTitle: courses.title,
          courseLevel: courses.level,
          courseDuration: courses.duration,
          totalSessions: courses.totalSessions,
          coursePrice: courses.price,
          courseMinPrice: courses.minPrice,
          courseMaxPrice: courses.maxPrice,
        })
        .from(courseBatches)
        .leftJoin(courses, eq(courseBatches.courseId, courses.id))
        .where(eq(courseBatches.id, courseBatchId));

      if (!courseBatch) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course batch not found",
        });
      }

      // Get all weekly schedules for this batch
      const weeklySchedules = await db
        .select()
        .from(batchWeeklySchedule)
        .where(
          and(
            eq(batchWeeklySchedule.courseBatchId, courseBatchId),
            eq(batchWeeklySchedule.isClosed, "false")
          )
        );

      // Get all sessions for this batch
      const sessions = await db
        .select()
        .from(batchSessions)
        .where(eq(batchSessions.courseBatchId, courseBatchId))
        .orderBy(batchSessions.order);

      // After fetching sessions:
      const formattedSessions = sessions.map((s) => {
        const start = s.startDateTime ? new Date(s.startDateTime) : null;
        const end = s.endDateTime ? new Date(s.endDateTime) : null;

        return {
          id: s.id,
          order: s.order,
          // e.g. Monday, Tuesday, etc.
          day: start
            ? start.toLocaleDateString("en-US", { weekday: "long" })
            : "-",
          // e.g. Oct 20, 2025
          date: start
            ? start.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "-",
          startTime: start
            ? start.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-",
          endTime: end
            ? end.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-",
          location: s.location ?? null,
          notes: s.notes ?? null,
        };
      });

      // Optional: validate if sessions match totalSessions count
      const expectedSessions = courseBatch.totalSessions ?? 0;
      const totalSessions = sessions.length;
      const hasCompleteSessions = totalSessions === expectedSessions;

      return {
        courseBatch,
        weeklySchedules,
        sessions: formattedSessions,
        meta: {
          expectedSessions,
          totalSessions,
          hasCompleteSessions,
        },
      };
    }),
});
