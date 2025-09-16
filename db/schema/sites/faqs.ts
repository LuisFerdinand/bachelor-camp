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
  id: uuid("id").primaryKey(),
  question: varchar("question", { length: 255 }).notNull(),
  answer: text("answer").notNull(),
  iconUrl: text("icon_url"),
  isShown: booleanTypeEnum("is_shown").default("true").notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Faq = InferSelectModel<typeof faqs>;

export const faqsCreateSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer title is required"),
  iconUrl: z.string().optional(),
});

export const faqsUpdateSchema = z.object({
  question: z.string().min(1, "Question is required").optional(),
  answer: z.string().min(1, "Answer title is required").optional(),
  order: z.number().optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
  iconUrl: z.string().optional(),
});
