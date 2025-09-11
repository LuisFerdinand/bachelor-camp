import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const facilities = pgTable("facilities", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }),
  type: varchar("type", { length: 20 }).notNull(), // "camp" | "roomType"
  status: varchar("status", { length: 20 }).default("active"), // active | inactive | archived
  description: text("description"),
  iconUrl: varchar("icon_url", { length: 255 }),
  imageUrl: varchar("image_url", { length: 255 }),
  imageKey: varchar("image_key", { length: 255 }),
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
