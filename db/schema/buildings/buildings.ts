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
import { locations } from "../sites";

export const buildings = pgTable("buildings", {
  id: uuid("id").defaultRandom().primaryKey(),
  locationId: uuid("location_id")
    .references(() => locations.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 150 }).notNull(),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  description: text("description"),
  longDescription: text("long_description"),

  imageUrl: text("image_url"),
  imageKey: text("image_key"),
  imageAlt: varchar("image_alt", { length: 255 }),

  badge: varchar("badge", { length: 100 }),
  badgeColor: varchar("badge_color", { length: 20 }),

  rules: jsonb("rules").$type<{ text: string; iconUrl?: string }[]>(),

  // Availability: nested structure for seasons
  availability: jsonb("availability").$type<{
    peakSeason: { months: string[]; description: string };
    mediumSeason: { months: string[]; description: string };
    lowSeason: { months: string[]; description: string };
  }>(),
  order: integer("order"),

  isActive: booleanTypeEnum("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const buildingGallery = pgTable("building_gallery", {
  id: uuid("id").defaultRandom().primaryKey(),
  buildingId: uuid("building_id")
    .references(() => buildings.id, { onDelete: "cascade" })
    .notNull(),
  imageUrl: text("image_url").notNull(),
  imageKey: text("image_key").notNull(),
  imageAlt: varchar("image_alt", { length: 255 }),
  title: varchar("title", { length: 200 }),
  description: text("description"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
