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

export const faqs = pgTable("faqs", {
  id: uuid("id").defaultRandom().primaryKey(),
  question: varchar("question", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  answer: text("answer").notNull(),
  iconUrl: text("icon_url"),
  isActive: booleanTypeEnum("is_shown").default("false").notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const faqCategories = pgTable("faq_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const faqCategoryRelations = pgTable("faq_category_relations", {
  id: uuid("id").primaryKey().defaultRandom(),
  faqId: uuid("faq_id")
    .notNull()
    .references(() => faqs.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => faqCategories.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type FaqBase = InferSelectModel<typeof faqs>;
export type FaqCategory = InferSelectModel<typeof faqCategories>;

export type FaqWithCategories = FaqBase & {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
};

export const faqCreateSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer title is required"),
  iconUrl: z.string().optional(),
  categories: z
    .array(z.string().uuid())
    .min(1, "At least one category is required"),
});

export const faqUpdateSchema = z.object({
  question: z.string().min(1, "Question is required").optional(),
  answer: z.string().min(1, "Answer title is required").optional(),
  order: z.number().optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
  iconUrl: z.string().optional(),
  categories: z
    .array(z.string().uuid())
    .min(1, "At least one category is required")
    .optional(),
});
