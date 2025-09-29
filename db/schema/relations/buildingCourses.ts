import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { courses } from "../courses";
import { buildings } from "../buildings";

export const buildingCourses = pgTable("building_courses", {
  id: uuid("id").primaryKey(),
  buildingId: uuid("building_id")
    .references(() => buildings.id, { onDelete: "cascade" })
    .notNull(),
  courseId: uuid("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
