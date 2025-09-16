import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { facilityStatusEnum, facilityTypeEnum } from "../enums";

export const facilities = pgTable("facilities", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }),
  type: facilityTypeEnum("type").notNull(), // "camp" | "roomType"
  status: facilityStatusEnum("status").default("active"), // active | inactive | archived
  description: text("description"),
  iconUrl: text("icon_url"),
  imageUrl: text("image_url"),
  imageKey: text("image_key"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const featuredFacilities = pgTable("featured_facilities", {
  id: uuid("id").primaryKey(),
  facilityId: uuid("facility_id")
    .notNull()
    .references(() => facilities.id, { onDelete: "cascade" }),
  displayOrder: integer("display_order"), // order on homepage
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
