import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { booleanTypeEnum } from "../enums";
import { integer } from "drizzle-orm/pg-core";
import z from "zod";
import { InferSelectModel } from "drizzle-orm";

export const accreditations = pgTable("accreditations", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 150 }).notNull(),
  slug: varchar("slug", { length: 150 }).unique().notNull(),
  description: text("description"),
  isActive: booleanTypeEnum("is_active").default("false"),
  order: integer("order").default(0).notNull(),
  imageUrl: varchar("image_url", { length: 300 }),
  imageKey: varchar("image_key", { length: 300 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Accreditation = InferSelectModel<typeof accreditations>;

export const accreditationCreateSchema = z.object({
  title: z.string().min(1, "Accreditation title is required"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imageKey: z.string().optional(),
  order: z.number().optional(),
});

// --- UPDATE ---
export const accreditationUpdateSchema = z.object({
  title: z.string().min(1, "Accreditation title is required").optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imageKey: z.string().optional(),
  order: z.number().optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
});
