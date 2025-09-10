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

export const pillars = pgTable("pillars", {
  id: uuid("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  subtitle: text("subtitle"),
  iconUrl: varchar("icon_url", { length: 255 }),
  imageUrl: varchar("image_url", { length: 255 }),
  ctaText: varchar("cta_text", { length: 100 }).notNull(),
  ctaLink: varchar("cta_link", { length: 255 }),
  order: integer("order").default(0),
  features: jsonb("features").$type<{ text: string; iconUrl?: string }[]>(),
  badgeText: varchar("badge_text", { length: 100 }),
  isActive: booleanTypeEnum("is_active").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
