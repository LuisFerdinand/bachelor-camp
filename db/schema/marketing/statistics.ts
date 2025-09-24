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
  value: varchar("value", { length: 50 }).notNull(),
  label: varchar("label", { length: 100 }).notNull(),
  description: text("description"),
  iconUrl: text("icon_url"),
  order: integer("order").default(0).notNull(),
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
