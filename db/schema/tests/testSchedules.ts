import { date, integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { tests } from "./tests";

export const testSchedules = pgTable("test_schedules", {
  id: uuid("id").primaryKey(),
  testId: uuid("test_id")
    .references(() => tests.id, { onDelete: "cascade" })
    .notNull(),
    startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"), 
  
  capacity: integer("capacity"), // max jumlah siswa
  price: integer("price").notNull(), // harga untuk durasi tersebut
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});