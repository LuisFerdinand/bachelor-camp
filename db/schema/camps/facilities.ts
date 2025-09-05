import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const facilities = pgTable("facilities", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 20 }).notNull(), // "camp" | "roomType"
  description: text("description"),
  iconUrl: varchar("icon_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});