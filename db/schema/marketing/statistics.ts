import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { booleanTypeEnum } from "../enums";
import { InferSelectModel } from "drizzle-orm";
import z from "zod";

export const statistics = pgTable("statistics", {
  id: uuid("id").defaultRandom().primaryKey(),
  // Number/Value
  value: varchar("value", { length: 50 }).notNull(), // e.g. "15,000+", "98%", "50+"
  // Label
  label: varchar("label", { length: 100 }).notNull(), // e.g. "Students", "Satisfaction Rate"
  // Optional short description if needed
  description: text("description"),
  // Optional icon (for flexibility if design changes)
  iconUrl: text("icon_url"),
  // Order for display
  order: integer("order").default(0).notNull(),
  // Active toggle
  isActive: booleanTypeEnum("is_active").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Statistic = InferSelectModel<typeof statistics>;

export const statisticCreateSchema = z.object({
  label: z.string().min(1, "Statistic label is required"),
  value: z.string().min(1, "Statistic value is required"),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
});

export const statisticUpdateSchema = z.object({
  label: z.string().min(1, "Statistic label is required").optional(),
  value: z.string().min(1, "Statistic value is required").optional(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
  order: z.number().optional(),
});
