import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  BOOLEAN_TYPES,
  booleanTypeEnum,
  PAGE_TYPES,
  pageTypeEnum,
} from "../enums";
import z from "zod";

export const banners = pgTable("banners", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: pageTypeEnum("type").notNull(),
  headline: text("headline").notNull(),
  subheadline: text("subheadline"),

  ctas: jsonb("ctas").$type<
    { ctaText: string; ctaLink?: string; isShown: boolean }[]
  >(),
  badgeText: varchar("badge_text", { length: 100 }),

  mediaUrl: varchar("media_url", { length: 255 }),
  mediaKey: varchar("media_key", { length: 255 }),

  isActive: booleanTypeEnum("is_active").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Banner = {
  id: string;
  type: string;
  headline: string;
  subheadline: string | null;
  badgeText: string | null;
  mediaUrl: string | null;
  mediaKey: string | null;
  isActive: "true" | "false";
  createdAt: Date;
  updatedAt: Date;

  ctas:
    | {
        ctaText: string | null;
        ctaLink: string | null;
        isShown: boolean | null;
      }[]
    | null;
};

export const bannerCreateSchema = z.object({
  type: z.enum(pageTypeEnum.enumValues),
  headline: z.string().min(1, "Banner headline is required"),
  subheadline: z.string().optional(),
  badgeText: z.string().optional(),
  mediaUrl: z.string().optional(),
  mediaKey: z.string().optional(),
  ctas: z
    .array(
      z.object({
        ctaText: z.string().min(1, "CTA text is required"),
        ctaLink: z.string().optional(),
        isShown: z.boolean(),
      })
    )
    .max(3)
    .optional(),
});

export const bannerUpdateSchema = z.object({
  type: z.enum(pageTypeEnum.enumValues).optional(),
  headline: z.string().min(1, "Banner headline is required").optional(),
  subheadline: z.string().optional(),
  badgeText: z.string().optional(),
  mediaUrl: z.string().optional(),
  mediaKey: z.string().optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
  ctas: z
    .array(
      z.object({
        ctaText: z.string().min(1, "CTA text is required"),
        ctaLink: z.string().optional(),
        isShown: z.boolean(),
      })
    )
    .max(3)
    .optional(),
});
