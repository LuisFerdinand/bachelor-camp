// src/lib/mediaConfigs.ts
import {
  banners,
  pillars,
  testimonials,
  highlights,
  accreditations,
  milestones,
} from "@/db/schema";
import { teamMembers } from "@/db/schema/marketing/teamMembers";

export const mediaConfigs = {
  accreditations: {
    table: accreditations,
    keyColumn: "imageKey",
    urlColumn: "imageUrl",
  },
  banners: {
    table: banners,
    keyColumn: "mediaKey",
    urlColumn: "mediaUrl",
  },
  highlights: {
    table: highlights,
    keyColumn: "imageKey",
    urlColumn: "imageUrl",
  },
  milestones: {
    table: milestones,
    keyColumn: "imageKey",
    urlColumn: "imageUrl",
  },
  teamMembers: {
    table: teamMembers,
    keyColumn: "avatarKey",
    urlColumn: "avatarUrl",
  },
  pillars: {
    table: pillars,
    keyColumn: "imageKey",
    urlColumn: "imageUrl",
  },
  testimonials: {
    table: testimonials,
    keyColumn: "imageKey",
    urlColumn: "imageUrl",
  },
} as const;

export type MediaEntity = keyof typeof mediaConfigs;
