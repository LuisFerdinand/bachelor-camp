import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { booleanTypeEnum, socialPlatformEnum } from "../enums";
import z from "zod";
import { InferSelectModel } from "drizzle-orm";

export const socialMedias = pgTable("social_medias", {
  id: uuid("id").defaultRandom().primaryKey(),
  platform: socialPlatformEnum("platform").notNull(),
  url: text("url"),
  order: integer("order").default(0).notNull(),
  isActive: booleanTypeEnum("is_active").default("false").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SocialMedia = InferSelectModel<typeof socialMedias>;

export const socialMediaCreateSchema = z.object({
  url: z.string().url(),
});

export const socialMediaUpdateSchema = z.object({
  url: z.string().url().optional(),
  isActive: z.enum(booleanTypeEnum.enumValues).optional(),
});
