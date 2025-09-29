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

export const pillars = pgTable("pillars", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  subtitle: text("subtitle"),
  iconUrl: text("icon_url"),
  imageUrl: text("image_url"),
  imageKey: text("image_key"),
  ctaText: varchar("cta_text", { length: 100 }).notNull(),
  ctaLink: varchar("cta_link", { length: 255 }),
  order: integer("order").default(0).notNull(),
  features: jsonb("features").$type<{ text: string; iconUrl?: string }[]>(),
  badgeText: varchar("badge_text", { length: 100 }),
  isActive: booleanTypeEnum("is_active").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Pillar = InferSelectModel<typeof pillars>;

export const pillarCreateSchema = z.object({
  title: z.string().min(1, "Pillar title is required"),
  subtitle: z.string().optional(),
  iconUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  imageKey: z.string().optional(),
  ctaText: z.string().min(1, "CTA text is required"),
  ctaLink: z.string().optional(),
  features: z
    .array(
      z.object({
        text: z.string().min(1, "Feature text is required"),
        iconUrl: z.string().optional(),
      })
    )
    .optional(),
});

export const pillarUpdateSchema = z.object({
  title: z.string().min(1, "Pillar title is required").optional(),
  subtitle: z.string().optional(),
  iconUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  imageKey: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
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
