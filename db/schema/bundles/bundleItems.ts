import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { bundles } from "./bundles";
import { serviceTypeEnum } from "../enums";

export const bundleItems = pgTable("bundle_items", {
  id: uuid("id").primaryKey(),
  bundleId: uuid("bundle_id")
    .references(() => bundles.id, { onDelete: "cascade" })
    .notNull(),
  serviceRefId: uuid("service_ref_id").notNull(), // reference to camp_room_type, course_schedule, or test_schedule
  serviceTypeEnum: serviceTypeEnum("service_type").notNull(), 
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});