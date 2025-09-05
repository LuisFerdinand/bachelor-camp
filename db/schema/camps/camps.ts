import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { booleanTypeEnum } from "../enums";

export const camps = pgTable("camps", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(), // ex: Gedung 1, Gedung 2
  description: text("description"),
  address: text("address"),
  isActive: booleanTypeEnum("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});