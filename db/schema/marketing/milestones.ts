import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const milestones = pgTable("milestones", {
  id: uuid("id").primaryKey(),
  year: integer("year").notNull(), // contoh: 2015, 2018
  title: varchar("title", { length: 200 }).notNull(), // contoh: "Founded"
  description: text("description"), // detail milestone
  imageUrl: varchar("image_url", { length: 300 }), // optional gambar ilustrasi
  order: integer("order").default(0), // urutan tampil di timeline
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});