import { index, pgTable, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { roomTypes } from "./roomTypes";
import { booleanTypeEnum } from "../enums";
import { camps } from "./camps";

export const campRoomTypes = pgTable("camp_room_types", {
  id: uuid("id").primaryKey(),
  campId: uuid("camp_id").references(() => camps.id, { onDelete: "cascade" }).notNull(),
  roomTypeId: uuid("room_type_id").references(() => roomTypes.id, { onDelete: "cascade" }).notNull(),
  isActive: booleanTypeEnum("is_active").notNull().default("true"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => ({
  campTypeUq: uniqueIndex("camp_room_types_camp_roomtype_uq").on(t.campId, t.roomTypeId),
  campIdx: index("camp_room_types_camp_idx").on(t.campId),
  typeIdx: index("camp_room_types_roomtype_idx").on(t.roomTypeId),
}));