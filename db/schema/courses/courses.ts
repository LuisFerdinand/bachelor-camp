import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { booleanTypeEnum, courseModeEnum } from "../enums";

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(), // ex: "General English", "IELTS Mastery"
  description: text("description"),
  level: varchar("level", { length: 20 }), // e.g. "A2", "B1", "C1"
  mode: courseModeEnum("mode").default("offline"), // "offline" | "online" | "hybrid"
  isActive: booleanTypeEnum("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});