import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { camps } from "../camps";
import { courses } from "../courses";

export const campCourses = pgTable("camp_courses", {
  id: uuid("id").primaryKey(),
  campId: uuid("camp_id")
    .references(() => camps.id, { onDelete: "cascade" })
    .notNull(),
  courseId: uuid("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
