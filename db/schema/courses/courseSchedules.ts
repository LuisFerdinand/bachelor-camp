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
import {
  BooleanType,
  booleanTypeEnum,
  CourseBatchStatus,
  courseBatchStatusEnum,
  dayOfWeekEnum,
  DeliveryMode,
  deliveryModeEnum,
  meetStatusEnum,
} from "../enums";

export const courseBatches = pgTable("course_batches", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseId: uuid("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  capacity: integer("capacity"), // max jumlah siswa
  deliveryMode: deliveryModeEnum("delivery_mode").notNull().default("offline"),

  price: integer("price").notNull(), // harga untuk durasi tersebut
  status: courseBatchStatusEnum("status").default("upcoming").notNull(),
  number: integer("number").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Level 2: Jadwal harian
export const batchWeeklySchedule = pgTable("batch_weekly_schedule", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseBatchId: uuid("course_batch_id")
    .references(() => courseBatches.id, { onDelete: "cascade" })
    .notNull(),
  dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isClosed: booleanTypeEnum("is_closed").default("false").notNull(),
  notes: text("notes"), // optional untuk catatan pengajar
  location: text("location"), // optional, e.g., "Room 204, Main Campus"

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const batchSessions = pgTable("batch_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseBatchId: uuid("course_batch_id")
    .references(() => courseBatches.id, { onDelete: "cascade" })
    .notNull(),
  date: date("date").notNull(), // actual meet date
  startDateTime: timestamp("start_datetime", { withTimezone: true }),
  endDateTime: timestamp("end_datetime", { withTimezone: true }),
  deliveryMode: deliveryModeEnum("delivery_mode").default("offline"),

  status: meetStatusEnum("status").default("scheduled").notNull(),
  order: integer("order"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type CourseBatchWithDetails = {
  id: string;
  courseId: string;
  startDate: string;
  endDate: string | null;
  capacity: number | null;
  deliveryMode: DeliveryMode;
  price: number;
  number: number;
  status: CourseBatchStatus;
  createdAt: Date;
  updatedAt: Date;

  // Course details
  course: {
    id: string;
    title: string;
    category: string;
    imageUrl: string | null;
    level: string;
    duration: string;
    description: string | null;
    totalSessions: number;
    isFeatured: BooleanType | null;
    isActive: BooleanType | null;
  };

  enrolledCount: number;
  totalSessions: number;
  completedSessions: number;

  // Schedule summary
  scheduleSummary: Record<string, string>;
  // Example: { monday: "10:00-12:00", wednesday: "14:00-16:00", friday: "09:00-11:00" }
};
