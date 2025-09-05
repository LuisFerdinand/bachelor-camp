import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { booleanTypeEnum, testModeEnum } from "../enums";

export const tests = pgTable("tests", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(), // ex: "General English", "IELTS Mastery"
  description: text("description"),
  mode: testModeEnum("mode").notNull().default("offline"),
  isActive: booleanTypeEnum("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
