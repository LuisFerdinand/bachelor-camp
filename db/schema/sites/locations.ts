import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  numeric,
  boolean,
  jsonb,
  decimal,
} from "drizzle-orm/pg-core";
import { BOOLEAN_TYPES, booleanTypeEnum, DAY_OF_WEEK } from "../enums";
import z from "zod";
import { InferSelectModel } from "drizzle-orm";

export const locations = pgTable("locations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 150 }).notNull(), // e.g. "Main Branch", "Jakarta Office"
  address: text("address").notNull(),
  lat: decimal("lat", { precision: 11, scale: 8 }).notNull(),
  lng: decimal("lng", { precision: 11, scale: 8 }).notNull(),

  mapsLink: text("maps_link").notNull(),

  phone: varchar("phone", { length: 30 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  hours: jsonb("hours")
    .$type<
      {
        day: string;
        open: string;
        close: string;
        isClosed: boolean;
      }[]
    >()
    .notNull(),

  isActive: booleanTypeEnum("is_primary").default("false").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Location = InferSelectModel<typeof locations>;

export const hoursSchema = z
  .array(
    z
      .object({
        day: z.enum(DAY_OF_WEEK),
        open: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format HH:MM"),
        close: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format HH:MM"),
        isClosed: z.boolean(),
      })
      .refine((data) => data.isClosed || data.open < data.close, {
        message: "Closing time must be after opening time",
        path: ["close"],
      })
  )
  .length(7, { message: "Must provide 7 days of operating hours" })
  .refine((hours) => new Set(hours.map((h) => h.day)).size === 7, {
    message: "Operating hours must include all 7 unique days",
  });

export const locationCreateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  lat: z.string().regex(/^-?\d{1,3}\.\d{1,8}$/, {
    message: "Latitude must be a valid number with up to 8 decimal places",
  }),
  lng: z.string().regex(/^-?\d{1,3}\.\d{1,8}$/, {
    message: "Longitude must be a valid number with up to 8 decimal places",
  }),

  mapsLink: z.string().url({ message: "Maps link must be a valid URL" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  hours: hoursSchema,
});

export const locationUpdateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).optional(),
  address: z.string().min(1, { message: "Address is required" }).optional(),
  lat: z
    .string()
    .regex(/^-?\d{1,3}\.\d{1,8}$/, {
      message: "Latitude must be a valid number with up to 8 decimal places",
    })
    .optional(),

  lng: z
    .string()
    .regex(/^-?\d{1,3}\.\d{1,8}$/, {
      message: "Longitude must be a valid number with up to 8 decimal places",
    })
    .optional(),

  mapsLink: z
    .string()
    .url({ message: "Maps link must be a valid URL" })
    .optional(),
  phone: z.string().min(5, { message: "Phone number is required" }).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  hours: hoursSchema.optional(),
  isActive: z.enum(BOOLEAN_TYPES).optional(),
});
