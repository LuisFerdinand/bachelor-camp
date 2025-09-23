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
import { InferSelectModel } from "drizzle-orm";
import z from "zod";

export const facilities = pgTable("facilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }),
  type: facilityTypeEnum("type").default("camp").notNull(), // "camp" | "roomType"
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

export type Facility = InferSelectModel<typeof facilities>;

export const facilityCreateSchema = z.object({
  name: z.string().min(1, "Facility name is required"),
  type: z.enum(facilityTypeEnum.enumValues),
  status: z.enum(facilityStatusEnum.enumValues).optional(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  category: z.enum(facilityCategoryEnum.enumValues).optional(),
});

// UPDATE
export const facilityUpdateSchema = z.object({
  name: z.string().min(1, "Facility name is required").optional(),
  type: z.enum(facilityTypeEnum.enumValues).optional(),
  status: z.enum(facilityStatusEnum.enumValues).optional(),
  isFeatured: z.enum(booleanTypeEnum.enumValues).optional(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  imageKey: z.string().optional(),
  category: z.enum(facilityCategoryEnum.enumValues).optional(),
});
