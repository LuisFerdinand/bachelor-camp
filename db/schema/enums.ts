import { pgEnum } from "drizzle-orm/pg-core";

// Shared
export const booleanTypeEnum = pgEnum("boolean_type", ["true", "false"]);
export type BooleanType = (typeof booleanTypeEnum.enumValues)[number];
export const serviceTypeEnum = pgEnum("service_type", [
  "camp_room",
  "test",
  "course",
]);
export const entityTypeEnum = pgEnum("entity_type", [
  "camp",
  "roomType",
  "course",
  "test",
]);
export const dayOfWeekEnum = pgEnum("day_of_week", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);
export const pageTypeEnum = pgEnum("banner_type", [
  "Home",
  "Camp",
  "Programs",
  "Tests",
  "About",
  "Blog",
  "Contact",
]);
export type PageType = (typeof pageTypeEnum.enumValues)[number];


// Leads
export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "in_progress",
  "closed",
]);

// Rooms
export const roomStatusEnum = pgEnum("room_status", ["available", "occupied", "maintenance"]);

// Cources
export const courseModeEnum = pgEnum("course_mode", ["offline", "online", "hybrid"]);

// Tests
export const testTypeEnum = pgEnum("test_type", ["IELTS", "TOEFL", "OTHER"]);
export const testModeEnum = pgEnum("test_mode", ["offline", "online"]);


export const postStatusEnum = pgEnum("post_status", ["draft", "scheduled", "published", "archived"]);

export const collectionTypeEnum = pgEnum("collection_type", [
  "personal",   // User-created, private
  "curated",    // Editor/Admin-created
  "system"      // Reserved for system features
]);