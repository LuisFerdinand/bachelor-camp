import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { booleanTypeEnum } from "../enums";

export const faqs = pgTable("faqs", {
  id: uuid("id").primaryKey(),
  question: varchar("question", { length: 255 }).notNull(),
  answer: text("answer").notNull(),
  iconUrl: varchar("icon_url", { length: 100 }),
  isPublished: booleanTypeEnum("is_published").default("true").notNull(), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
