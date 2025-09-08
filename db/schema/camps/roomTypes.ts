import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const roomTypes = pgTable("room_types", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // e.g. "Standard 2-Bed"
  description: text("description"),
  capacity: integer("capacity").notNull(), // max persons
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});