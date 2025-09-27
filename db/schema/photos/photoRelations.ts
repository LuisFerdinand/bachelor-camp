import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { photos } from "./photos";
import { booleanTypeEnum, entityTypeEnum } from "../enums";

export const photoRelations = pgTable("photo_relations", {
  id: uuid("id").defaultRandom().primaryKey(),
  photoId: uuid("photo_id")
    .references(() => photos.id, { onDelete: "cascade" })
    .notNull(),

  targetId: uuid("target_id").notNull(),
  entityType: entityTypeEnum("entity_type").notNull(),

  order: integer("order").default(0),
  isFeatured: booleanTypeEnum("is_featured").default("false"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
