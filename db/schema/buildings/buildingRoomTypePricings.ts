import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { buildingRoomTypes } from "./buildingRoomTypes";

export const buildingRoomTypePricings = pgTable("building_room_type_pricings", {
  id: uuid("id").primaryKey(),
  buildingRoomTypeId: uuid("building_room_type_id")
    .references(() => buildingRoomTypes.id, { onDelete: "cascade" })
    .notNull(),
  occupancy: integer("occupancy").notNull(), // 1 orang, 2 orang, dst
  pricePerPerson: integer("price_per_person").notNull(), // harga per orang per bulan
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
