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
  COURSE_BATCH_STATUSES,
  CourseBatchStatus,
  courseBatchStatusEnum,
  DAY_OF_WEEK,
  dayOfWeekEnum,
  DELIVERY_MODES,
  DeliveryMode,
  deliveryModeEnum,
  meetStatusEnum,
} from "../enums";
import z from "zod";

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
  startDateTime: timestamp("start_datetime", { withTimezone: true }),
  endDateTime: timestamp("end_datetime", { withTimezone: true }),
  deliveryMode: deliveryModeEnum("delivery_mode").default("offline"),
  status: meetStatusEnum("status").default("scheduled").notNull(),
  order: integer("order"),
  notes: text("notes"),
  location: text("location"),
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

export type GeneratedSession = {
  order: number;
  date: string; // YYYY-MM-DD
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  notes: string;
};
export const batchWeeklyScheduleSchema = z
  .object({
    dayOfWeek: z.enum(DAY_OF_WEEK),
    startTime: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time (HH:mm)"),
    endTime: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time (HH:mm)"),
    isClosed: z.enum(booleanTypeEnum.enumValues).optional(),
    notes: z.string().optional(),
    location: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isClosed === "false") {
        const [sh, sm] = data.startTime.split(":").map(Number);
        const [eh, em] = data.endTime.split(":").map(Number);
        const startMinutes = sh * 60 + sm;
        const endMinutes = eh * 60 + em;
        return endMinutes > startMinutes;
      }
      return true;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

export const courseBatchCreateSchema = z.object({
  courseId: z.string().uuid("Invalid course ID"),
  startDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Start date must be a valid date"
    ),
  endDate: z
    .string()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "End date must be a valid date"
    )
    .optional(),
  capacity: z
    .number()
    .int()
    .positive("Capacity must be a positive integer")
    .optional(),
  deliveryMode: z.enum(DELIVERY_MODES),
  status: z.enum(COURSE_BATCH_STATUSES),
  price: z.number().min(0, "Price must be 0 or greater"),

  // Nested schedules
  weeklySchedules: z.array(batchWeeklyScheduleSchema).optional(),
});

export const courseBatchUpdateSchema = z.object({
  // Editable fields
  capacity: z
    .number()
    .int()
    .positive("Capacity must be a positive integer")
    .optional(),

  deliveryMode: z.enum(DELIVERY_MODES).optional(),

  status: z.enum(COURSE_BATCH_STATUSES).optional(),

  price: z.number().min(0, "Price must be 0 or greater").optional(),

  // Optional: update weekly schedules
  weeklySchedules: z.array(batchWeeklyScheduleSchema).optional(),

  // For internal recalculation (not user input)
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Start date must be valid")
    .optional(),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "End date must be valid")
    .optional(),
});
