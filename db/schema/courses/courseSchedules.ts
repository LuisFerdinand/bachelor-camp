import {
  date,
  integer,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { courses } from "./courses";
import { booleanTypeEnum, dayOfWeekEnum, meetStatusEnum } from "../enums";

export const courseBatches = pgTable("course_batches", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseId: uuid("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  capacity: integer("capacity"), // max jumlah siswa
  price: integer("price").notNull(), // harga untuk durasi tersebut
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Level 2: Jadwal harian
export const batchWeeklySchedule = pgTable("batch_weekly_schedule", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseBatchId: uuid("course_schedule_id")
    .references(() => courseBatches.id, { onDelete: "cascade" })
    .notNull(),
  dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isClosed: booleanTypeEnum("is_primary").default("false").notNull(),
  notes: text("notes"), // optional untuk catatan pengajar
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const batchSessions = pgTable("bacth_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseBatchId: uuid("course_schedule_id")
    .references(() => courseBatches.id, { onDelete: "cascade" })
    .notNull(),
  date: date("date").notNull(), // actual meet date
  startDateTime: timestamp("start_datetime", { withTimezone: true }).notNull(),
  endDateTime: timestamp("end_datetime", { withTimezone: true }).notNull(),

  status: meetStatusEnum("status").default("scheduled").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
