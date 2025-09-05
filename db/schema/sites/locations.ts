import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const locations = pgTable("locations", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(), // e.g. "Main Branch", "Jakarta Office"
  address: text("address").notNull(),
  mapsLink: text("maps_link").notNull(), // embed or gmaps URL
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});