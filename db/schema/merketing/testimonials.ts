import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { booleanTypeEnum } from "../enums";
import { users } from "../users";

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  role: varchar("role", { length: 255 }),
  imageUrl: varchar("image_url", { length: 255 }),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5), // 1–5
  score: integer("score"),
  isShown: booleanTypeEnum("is_shown").notNull().default("false"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


