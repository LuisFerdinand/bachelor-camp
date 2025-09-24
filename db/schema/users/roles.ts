import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { roleEnum } from "../enums";

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey(),
  name: roleEnum("name").notNull().unique(),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
