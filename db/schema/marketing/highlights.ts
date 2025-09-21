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

export const highlights = pgTable("highlights", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  subtitle: text("subtitle"),
  iconUrl: text("icon_url"),
  order: integer("order").default(0).notNull(),
  features: jsonb("features").$type<{ text: string; iconUrl?: string }[]>(),
  isActive: booleanTypeEnum("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Highlight = InferSelectModel<typeof highlights>;

export const highlightCreateSchema = z.object({
  title: z.string().min(1, "Highlight title is required"),
  subtitle: z.string().optional(),
  iconUrl: z.string().optional(),
  features: z
    .array(
      z.object({
        text: z.string().min(1, "Feature text is required"),
        iconUrl: z.string().optional(),
      })
    )
    .optional(),
});

export const highlightUpdateSchema = z.object({
  title: z.string().min(1, "Highlight title is required").optional(),
  subtitle: z.string().optional(),
  iconUrl: z.string().optional(),
  features: z
    .array(
      z.object({
        text: z.string().min(1, "Feature text is required"),
        iconUrl: z.string().optional(),
      })
    )
    .optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
  order: z.number().optional(),
});
