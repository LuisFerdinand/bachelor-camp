import {
  decimal,
  doublePrecision,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { booleanTypeEnum, testimonialSourceEnum } from "../enums";
import { users } from "../users";
import { InferSelectModel } from "drizzle-orm";
import z from "zod";

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  role: varchar("role", { length: 255 }),
  source: testimonialSourceEnum("source").default("student").notNull(),

  imageUrl: text("image_url"),
  imageKey: text("image_key"),
  content: text("content").notNull(),
  rating: decimal("rating", { scale: 1 }).notNull(),

  score: integer("score"),
  isFeatured: booleanTypeEnum("is_featured").notNull().default("false"),
  isShown: booleanTypeEnum("is_shown").notNull().default("false"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const testimonialCategories = pgTable("testimonial_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonialCategoryRelations = pgTable(
  "testimonial_category_relations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    testimonialId: uuid("testimonial_id")
      .notNull()
      .references(() => testimonials.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => testimonialCategories.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }
);

export type TestimonialBase = InferSelectModel<typeof testimonials>;
export type TestimonialCategory = InferSelectModel<
  typeof testimonialCategories
>;

export type TestimonialWithCategories = TestimonialBase & {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
};

export const testimonialCreateSchema = z.object({
  userId: z.string().uuid().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  source: z.enum(testimonialSourceEnum.enumValues).optional(),

  imageUrl: z.string().optional(),
  imageKey: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  rating: z
    .string()
    .min(1, { message: "Price is required" })
    .regex(/^\d+(\.\d{1})?$/, {
      message: "Price must be a valid number with up to 1 decimal places",
    }),

  categories: z.array(z.string().uuid()).optional(),
});

export const testimonialUpdateSchema = z.object({
  userId: z.string().uuid().optional().nullable(),
  name: z.string().min(1, "Name is required").optional(),
  role: z.string().optional(),
  source: z.enum(testimonialSourceEnum.enumValues).optional(),

  imageUrl: z.string().optional(),
  imageKey: z.string().optional(),

  content: z.string().min(1, "Content is required").optional(),
  rating: z
    .string()
    .min(1, { message: "Price is required" })
    .regex(/^\d+(\.\d{1})?$/, {
      message: "Price must be a valid number with up to 1 decimal places",
    })
    .optional(),

  isFeatured: z.enum(booleanTypeEnum.enumValues).optional(),
  isShown: z.enum(booleanTypeEnum.enumValues).optional(),

  categories: z.array(z.string().uuid()).optional(),
});
