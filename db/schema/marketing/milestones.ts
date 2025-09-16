import { InferSelectModel } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import z from "zod";
import { booleanTypeEnum } from "../enums";

export const milestones = pgTable("milestones", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: integer("year").notNull(), // contoh: 2015, 2018
  title: varchar("title", { length: 200 }).notNull(), // contoh: "Founded"
  description: text("description"), // detail milestone

  imageUrl: text("image_url"),
  imageKey: text("image_key"),
  order: integer("order").default(0).notNull(), // urutan tampil di timeline
  isActive: booleanTypeEnum("is_shown").default("false"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Milestone = InferSelectModel<typeof milestones>;

export const milestoneCreateSchema = z.object({
  year: z
    .number()
    .int()
    .min(1900, "Year must be a valid year")
    .max(new Date().getFullYear() + 5, "Year seems too far in the future"),
  title: z.string().min(1, "Milestone title is required"),
  description: z.string().optional(),
});

// --- UPDATE ---
export const milestoneUpdateSchema = z.object({
  year: z
    .number()
    .int()
    .min(1900, "Year must be a valid year")
    .max(new Date().getFullYear() + 5, "Year seems too far in the future")
    .optional(),
  title: z.string().min(1, "Milestone title is required").optional(),
  description: z.string().optional(),
  imageUrl: z.string().url("Image URL must be valid").optional(),
  imageKey: z.string().url("Image URL must be valid").optional(),
  order: z.number().optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
});
