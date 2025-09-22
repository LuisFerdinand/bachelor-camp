import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  booleanTypeEnum,
  facilityCategoryEnum,
  facilityStatusEnum,
  facilityTypeEnum,
} from "../enums";

export const facilities = pgTable("facilities", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }),
  type: facilityTypeEnum("type").notNull(), // "camp" | "roomType"
  status: facilityStatusEnum("status").default("active"), // active | inactive
  isFeatured: booleanTypeEnum("is_featured").default("false"),
  description: text("description"),
  iconUrl: text("icon_url"),
  imageUrl: text("image_url"),
  imageKey: text("image_key"),
  order: integer("order").default(0),
  category: facilityCategoryEnum("category").default("general"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
