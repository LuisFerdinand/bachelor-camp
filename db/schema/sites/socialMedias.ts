import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const socialMedias = pgTable("social_medias", {
  id: uuid("id").primaryKey(),
  platform: varchar("platform", { length: 50 }).notNull(), // e.g. "Instagram", "Facebook", "TikTok"
  url: text("url").notNull(),
  iconUrl: varchar("icon_url", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});