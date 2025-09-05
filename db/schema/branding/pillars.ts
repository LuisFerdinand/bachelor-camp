import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const pillars = pgTable("pillars", {
  id: uuid("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  subtitle: text("subtitle"),
  iconUrl: varchar("icon_url", { length: 255 }),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});