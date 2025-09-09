import { date, integer, pgTable, text, time, timestamp, uuid } from "drizzle-orm/pg-core";
import { courses } from "./courses";
import { dayOfWeekEnum } from "../enums";

export const courseSchedules = pgTable("course_schedules", {
  id: uuid("id").primaryKey(),
  courseId: uuid("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  capacity: integer("capacity"), // max jumlah siswa
  price: integer("price").notNull(), // harga untuk durasi tersebut
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



// Level 2: Jadwal harian
export const courseDailySchedules = pgTable("course_daily_schedules", {
  id: uuid("id").primaryKey(),
  courseScheduleId: uuid("course_schedule_id")
    .references(() => courseSchedules.id, { onDelete: "cascade" })
    .notNull(),
  dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  notes: text("notes"), // optional untuk catatan pengajar
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});