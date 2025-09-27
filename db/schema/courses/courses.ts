import {
  integer,
  interval,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  booleanTypeEnum,
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  courseCategoryEnum,
  courseLevelEnum,
  courseModeEnum,
} from "../enums";
import { InferSelectModel } from "drizzle-orm";
import { unique } from "drizzle-orm/gel-core";
import z from "zod";

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  title: varchar("title", { length: 150 }).notNull(),
  category: courseCategoryEnum("category").notNull(),
  imageUrl: text("imageUrl"),
  imageKey: text("imageKey"),
  level: courseLevelEnum("level").notNull(),
  duration: varchar("duration", { length: 50 }).notNull(),
  totalSessions: integer("total_sessions").notNull(),
  description: text("description"),
  learningGoals:
    jsonb("learning_goals").$type<{ text: string; iconUrl?: string }[]>(),
  syllabus: jsonb("syllabus").$type<{ text: string; iconUrl?: string }[]>(),
  teachingMethods:
    jsonb("teaching_method").$type<{ text: string; iconUrl?: string }[]>(),
  resources: jsonb("resources").$type<{ text: string; iconUrl?: string }[]>(),
  targetAudience:
    jsonb("target_audience").$type<{ text: string; iconUrl?: string }[]>(),

  price: integer("price").notNull(), // in Rupiah
  isActive: booleanTypeEnum("is_active").default("false"),
  isFeatured: booleanTypeEnum("is_featured").default("false"),
  order: integer("order").default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Course = InferSelectModel<typeof courses>;

export const courseCreateSchema = z.object({
  slug: z.string().min(1, "Course slug is required"),
  title: z.string().min(1, "Course title is required"),
  category: z.enum(COURSE_CATEGORIES),
  level: z.enum(COURSE_LEVELS),
  duration: z.string().min(1, "Course duration is required"),
  totalSessions: z.number().min(1, "Total sessions is required"),
  description: z.string().optional(),

  learningGoals: z
    .array(
      z.object({
        text: z
          .string()
          .min(1, "Learning goal text is required")
          .refine(
            (text) => text.trim().length > 0,
            "Learning goal cannot be just whitespace"
          ),
        iconUrl: z.string().optional(),
      })
    )
    .min(1, "At least one learning goal is required"),

  syllabus: z
    .array(
      z.object({
        text: z
          .string()
          .min(1, "Syllabus text is required")
          .refine(
            (text) => text.trim().length > 0,
            "Syllabus item cannot be just whitespace"
          ),
        iconUrl: z.string().optional(),
      })
    )
    .min(1, "At least one syllabus item is required"),

  teachingMethods: z
    .array(
      z.object({
        text: z
          .string()
          .min(1, "Teaching method text is required")
          .refine(
            (text) => text.trim().length > 0,
            "Teaching method cannot be just whitespace"
          ),
        iconUrl: z.string().optional(),
      })
    )
    .min(1, "At least one teaching method is required"),

  resources: z
    .array(
      z.object({
        text: z
          .string()
          .min(1, "Resource text is required")
          .refine(
            (text) => text.trim().length > 0,
            "Resource cannot be just whitespace"
          ),
        iconUrl: z.string().optional(),
      })
    )
    .min(1, "At least one resource is required"),

  targetAudience: z
    .array(
      z.object({
        text: z
          .string()
          .min(1, "Target audience text is required")
          .refine(
            (text) => text.trim().length > 0,
            "Target audience cannot be just whitespace"
          ),
        iconUrl: z.string().optional(),
      })
    )
    .min(1, "At least one target audience is required"),

  price: z.number().min(0, "Course price must be 0 or greater"),
  buildingIds: z.array(z.string().uuid()).optional(),
  isFeatured: z.enum(booleanTypeEnum.enumValues).optional(),
});
// ---------- Update Schema ----------
export const courseUpdateSchema = z.object({
  slug: z.string().min(1, "Course slug cannot be empty").optional(),
  title: z.string().min(1, "Course title cannot be empty").optional(),
  category: z.enum(COURSE_CATEGORIES).optional(),
  level: z.enum(COURSE_LEVELS).optional(),
  duration: z.string().min(1, "Course duration cannot be empty").optional(),
  totalSessions: z
    .number()
    .min(1, "Total sessions must be at least 1")
    .optional(),
  description: z.string().optional(),

  // For updates, allow empty arrays but validate non-empty items
  learningGoals: z
    .array(
      z.object({
        text: z.string().min(1, "Learning goal text is required"),
        iconUrl: z.string().optional(),
      })
    )
    .optional()
    .refine(
      (goals) => !goals || goals.every((goal) => goal.text.trim().length > 0),
      "All learning goals must have text"
    ),

  syllabus: z
    .array(
      z.object({
        text: z.string().min(1, "Syllabus text is required"),
        iconUrl: z.string().optional(),
      })
    )
    .optional()
    .refine(
      (items) => !items || items.every((item) => item.text.trim().length > 0),
      "All syllabus items must have text"
    ),

  teachingMethods: z
    .array(
      z.object({
        text: z.string().min(1, "Teaching method text is required"),
        iconUrl: z.string().optional(),
      })
    )
    .optional()
    .refine(
      (methods) =>
        !methods || methods.every((method) => method.text.trim().length > 0),
      "All teaching methods must have text"
    ),

  resources: z
    .array(
      z.object({
        text: z.string().min(1, "Resource text is required"),
        iconUrl: z.string().optional(),
      })
    )
    .optional()
    .refine(
      (resources) =>
        !resources ||
        resources.every((resource) => resource.text.trim().length > 0),
      "All resources must have text"
    ),

  targetAudience: z
    .array(
      z.object({
        text: z.string().min(1, "Target audience text is required"),
        iconUrl: z.string().optional(),
      })
    )
    .optional()
    .refine(
      (audiences) =>
        !audiences ||
        audiences.every((audience) => audience.text.trim().length > 0),
      "All target audience items must have text"
    ),

  price: z.number().min(0, "Course price must be 0 or greater").optional(),
  buildingIds: z.array(z.string().uuid()).optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
  isFeatured: z.enum(booleanTypeEnum.enumValues).optional(),
  order: z.number().optional(),
});
