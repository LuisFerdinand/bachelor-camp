import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const photos = pgTable("photos", {
  id: uuid("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


