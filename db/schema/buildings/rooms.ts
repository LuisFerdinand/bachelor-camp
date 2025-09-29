import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { buildingRoomTypes } from "./buildingRoomTypes";
import { roomStatusEnum } from "../enums";

export const rooms = pgTable(
  "rooms",
  {
    id: uuid("id").primaryKey(),
    buildingRoomTypeId: uuid("building_room_type_id")
      .references(() => buildingRoomTypes.id, { onDelete: "cascade" })
      .notNull(),
    room_number: varchar("room_number", { length: 50 }).notNull(), // e.g., 101, A-12
    status: roomStatusEnum("status").notNull().default("available"),
    notes: text("notes"),
    floor: integer("floor"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    crtIdx: index("rooms_crt_idx").on(t.buildingRoomTypeId),
    // Optional uniqueness within a building_room_type:
    roomCodeUq: uniqueIndex("rooms_crt_roomnumber_uq").on(
      t.buildingRoomTypeId,
      t.room_number
    ),
  })
);
