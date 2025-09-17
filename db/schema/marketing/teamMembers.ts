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

export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  title: varchar("title", { length: 150 }).notNull(), // e.g., "Direktur Program"
  department: varchar("department", { length: 100 }), // e.g., "Leadership", "Academic"
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
  isActive: booleanTypeEnum("is_active").default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type TeamMember = InferSelectModel<typeof teamMembers>;

// ✅ Create Schema
export const teamMemberCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  department: z.string().optional(),
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

// ✅ Update Schema
export const teamMemberUpdateSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  department: z.string().optional(),
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
