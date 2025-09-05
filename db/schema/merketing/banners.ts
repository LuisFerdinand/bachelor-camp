import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { booleanTypeEnum, pageTypeEnum } from "../enums";



export const banners = pgTable("banners", {
  id: uuid("id").primaryKey(),
  type: pageTypeEnum("type").notNull(),
  headline: text("headline").notNull(),
  subheadline: text("subheadline"),

  ctaText1: varchar("cta_text_1", { length: 100 }),
  ctaLink1: varchar("cta_link_1", { length: 255 }),
  ctaColor1: varchar("cta_color_1", { length: 50 }), // hex or tailwind class
  isShown1: booleanTypeEnum("is_shown_1").default("false"),

  // Button 2
  ctaText2: varchar("cta_text_2", { length: 100 }),
  ctaLink2: varchar("cta_link_2", { length: 255 }),
  ctaColor2: varchar("cta_color_2", { length: 50 }),
  isShown2: booleanTypeEnum("is_shown_2").default("false"),

  // Button 3
  ctaText3: varchar("cta_text_3", { length: 100 }),
  ctaLink3: varchar("cta_link_3", { length: 255 }),
  ctaColor3: varchar("cta_color_3", { length: 50 }),
  isShown3: booleanTypeEnum("is_shown_3").default("false"),


  mediaUrl: varchar("media_url", { length: 255 }),
  isActive: booleanTypeEnum("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});