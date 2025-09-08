import { pgEnum } from "drizzle-orm/pg-core";

// Shared

export const BOOLEAN_TYPES = ["true", "false"] as const;
export type BooleanType = (typeof BOOLEAN_TYPES)[number];
export const booleanTypeEnum = pgEnum("boolean_type", BOOLEAN_TYPES);

export const SERVICE_TYPES = ["camp_room", "test", "course"] as const;
export type ServiceType = (typeof SERVICE_TYPES)[number];
export const serviceTypeEnum = pgEnum("service_type", SERVICE_TYPES);

export const ENTITY_TYPES = ["camp", "roomType", "course", "test"] as const;
export type EntityType = (typeof ENTITY_TYPES)[number];
export const entityTypeEnum = pgEnum("entity_type", ENTITY_TYPES);

export const DAY_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;
export type DayOfWeek = (typeof DAY_OF_WEEK)[number];
export const dayOfWeekEnum = pgEnum("day_of_week", DAY_OF_WEEK);

export const PAGE_TYPES = [
  "Home",
  "Camp",
  "Programs",
  "Tests",
  "About",
  "Blog",
  "Contact",
] as const;
export type PageType = (typeof PAGE_TYPES)[number];
export const pageTypeEnum = pgEnum("banner_type", PAGE_TYPES);

// Leads
export const LEAD_STATUSES = ["new", "in_progress", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export const leadStatusEnum = pgEnum("lead_status", LEAD_STATUSES);

// Rooms
export const ROOM_STATUSES = ["available", "occupied", "maintenance"] as const;
export type RoomStatus = (typeof ROOM_STATUSES)[number];
export const roomStatusEnum = pgEnum("room_status", ROOM_STATUSES);

// Courses
export const COURSE_MODES = ["offline", "online", "hybrid"] as const;
export type CourseMode = (typeof COURSE_MODES)[number];
export const courseModeEnum = pgEnum("course_mode", COURSE_MODES);

// Tests
export const TEST_TYPES = ["IELTS", "TOEFL", "OTHER"] as const;
export type TestType = (typeof TEST_TYPES)[number];
export const testTypeEnum = pgEnum("test_type", TEST_TYPES);

export const TEST_MODES = ["offline", "online"] as const;
export type TestMode = (typeof TEST_MODES)[number];
export const testModeEnum = pgEnum("test_mode", TEST_MODES);

// Posts
export const POST_STATUSES = [
  "draft",
  "scheduled",
  "published",
  "archived",
] as const;
export type PostStatus = (typeof POST_STATUSES)[number];
export const postStatusEnum = pgEnum("post_status", POST_STATUSES);

// Collections
export const COLLECTION_TYPES = ["personal", "curated", "system"] as const;
export type CollectionType = (typeof COLLECTION_TYPES)[number];
export const collectionTypeEnum = pgEnum("collection_type", COLLECTION_TYPES);
