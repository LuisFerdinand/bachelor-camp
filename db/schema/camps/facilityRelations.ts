import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { facilities } from "./facilities";
import { entityTypeEnum } from "../enums";

export const facilityRelations = pgTable("facility_relations", {
  id: uuid("id").primaryKey(),
  facilityId: uuid("facility_id")
    .references(() => facilities.id, { onDelete: "cascade" })
    .notNull(),
  targetId: uuid("target_id").notNull(), // ID of the entity
  entityType: entityTypeEnum("entity_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
