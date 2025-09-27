import {
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { roomTypes } from "./roomTypes";
import { booleanTypeEnum } from "../enums";
import { buildings } from "./buildings";

export const buildingRoomTypes = pgTable(
  "building_room_types",
  {
    id: uuid("id").primaryKey(),
    buildingId: uuid("building_id")
      .references(() => buildings.id, { onDelete: "cascade" })
      .notNull(),
    roomTypeId: uuid("room_type_id")
      .references(() => roomTypes.id, { onDelete: "cascade" })
      .notNull(),
    isActive: booleanTypeEnum("is_active").notNull().default("true"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    buildingTypeUq: uniqueIndex("building_room_types_building_roomtype_uq").on(
      t.buildingId,
      t.roomTypeId
    ),
    buildingIdx: index("building_room_types_building_idx").on(t.buildingId),
    typeIdx: index("building_room_types_roomtype_idx").on(t.roomTypeId),
  })
);
