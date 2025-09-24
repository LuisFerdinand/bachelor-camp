import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { booleanTypeEnum } from "../enums";

export const bundles = pgTable("bundles", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 255 }),
  link: varchar("link", { length: 255 }), // ex: ke detail program
  order: integer("order").default(0),
  isActive: booleanTypeEnum("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});