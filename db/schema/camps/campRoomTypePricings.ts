import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { campRoomTypes } from "./campRoomTypes";

export const campRoomTypePricings = pgTable("camp_room_type_pricings", {
  id: uuid("id").primaryKey(),
  campRoomTypeId: uuid("camp_room_type_id")
    .references(() => campRoomTypes.id, { onDelete: "cascade" })
    .notNull(),
  occupancy: integer("occupancy").notNull(), // 1 orang, 2 orang, dst
  pricePerPerson: integer("price_per_person").notNull(), // harga per orang per bulan
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});