import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const accreditations = pgTable("accreditations", {
  id: uuid("id").primaryKey(),
  title: varchar("title", { length: 150 }).notNull(), // ex: "British Council Accredited"
  description: text("description"), // optional, untuk penjelasan singkat
  imageUrl: varchar("image_url", { length: 300 }), // logo/sertifikat
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});