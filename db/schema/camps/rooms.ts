import { index, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { campRoomTypes } from "./campRoomTypes";
import { roomStatusEnum } from "../enums";

export const rooms = pgTable("rooms", {
  id: uuid("id").primaryKey(),
  campRoomTypeId: uuid("camp_room_type_id")
    .references(() => campRoomTypes.id, { onDelete: "cascade" })
    .notNull(),
  room_number: varchar("room_number", { length: 50 }).notNull(), // e.g., 101, A-12
  status: roomStatusEnum("status").notNull().default("available"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => ({
  crtIdx: index("rooms_crt_idx").on(t.campRoomTypeId),
  // Optional uniqueness within a camp_room_type:
  roomCodeUq: uniqueIndex("rooms_crt_roomnumber_uq").on(t.campRoomTypeId, t.room_number),
}));