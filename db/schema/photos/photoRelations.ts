import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { photos } from "./photos";
import { entityTypeEnum } from "../enums";

export const photoRelations = pgTable("photo_relations", {
  id: uuid("id").primaryKey(),
  photoId: uuid("photo_id")
    .references(() => photos.id, { onDelete: "cascade" })
    .notNull(),

  targetId: uuid("target_id").notNull(), // ID of camp, roomType, etc.
  entityType: entityTypeEnum("entity_type").notNull(), // e.g., "camp", "roomType"

  createdAt: timestamp("created_at").defaultNow(),
});