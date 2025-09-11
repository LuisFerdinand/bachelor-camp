import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { booleanTypeEnum } from "../enums";

export const highlights = pgTable("highlights", {
  id: uuid("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  subtitle: text("subtitle"),
  iconUrl: varchar("icon_url", { length: 255 }),
  order: integer("order").default(0),
  features: jsonb("features").$type<{ text: string }[]>(),
  isActive: booleanTypeEnum("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
