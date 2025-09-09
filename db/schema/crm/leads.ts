import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { leadStatusEnum } from "../enums";

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }),
  phone: varchar("phone", { length: 20 }),
  message: text("message"),
  status: leadStatusEnum("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});