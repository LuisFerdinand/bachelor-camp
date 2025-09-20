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
import { InferSelectModel } from "drizzle-orm";
import z from "zod";
import { relations } from "drizzle-orm";

export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(), // e.g., Leadership, Academic
  description: text("description"),
  order: integer("order").default(0).notNull(),
  isActive: booleanTypeEnum("is_active").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Department = InferSelectModel<typeof departments>;

export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  title: varchar("title", { length: 150 }).notNull(), // e.g., "Direktur Program"
  departmentId: uuid("department_id")
    .references(() => departments.id)
    .notNull(),
  avatarUrl: text("avatar_url"),
  avatarKey: text("avatar_key"),
  bio: text("bio"), // optional description if needed
  order: integer("order").default(0).notNull(),
  socialLinks: jsonb("social_links").$type<
    {
      type:
        | "email"
        | "linkedin"
        | "twitter"
        | "website"
        | "whatsapp"
        | "facebook"
        | "instagram";
      url: string;
    }[]
  >(),
  isActive: booleanTypeEnum("is_active").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type TeamMember = InferSelectModel<typeof teamMembers>;

export const departmentCreateSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  description: z.string().optional(),
  order: z.number().optional(),
});

export const departmentUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
});

export const teamMemberCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  departmentId: z.string().uuid("Invalid department id"),
  avatarUrl: z.string().optional(),
  avatarKey: z.string().optional(),
  bio: z.string().optional(),
  order: z.number().optional(),
  socialLinks: z
    .array(
      z.object({
        type: z.enum([
          "email",
          "linkedin",
          "twitter",
          "website",
          "whatsapp",
          "facebook",
          "instagram",
        ]),
        url: z.string().min(1, "URL is required"),
      })
    )
    .optional(),
});

export const teamMemberUpdateSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  departmentId: z.string().uuid("Invalid department id").optional(),
  avatarUrl: z.string().optional(),
  avatarKey: z.string().optional(),
  bio: z.string().optional(),
  order: z.number().optional(),
  socialLinks: z
    .array(
      z.object({
        type: z.enum([
          "email",
          "linkedin",
          "twitter",
          "website",
          "whatsapp",
          "facebook",
          "instagram",
        ]),
        url: z.string().min(1, "URL is required"),
      })
    )
    .optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
});

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  department: one(departments, {
    fields: [teamMembers.departmentId],
    references: [departments.id],
  }),
}));

export const departmentRelations = relations(departments, ({ many }) => ({
  members: many(teamMembers),
}));
