import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { booleanTypeEnum } from "../enums";
import { InferSelectModel } from "drizzle-orm";
import z from "zod";

export const principles = pgTable("principles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  subtitle: text("subtitle"),
  iconUrl: text("icon_url"),
  order: integer("order").default(0).notNull(),
  isActive: booleanTypeEnum("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Principle = InferSelectModel<typeof principles>;

export const principleCreateSchema = z.object({
  title: z.string().min(1, "Principle title is required"),
  subtitle: z.string().optional(),
  iconUrl: z.string().optional(),
});

export const principleUpdateSchema = z.object({
  title: z.string().min(1, "Principle title is required").optional(),
  subtitle: z.string().optional(),
  iconUrl: z.string().optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
  order: z.number().optional(),
});
