import {
  BOOLEAN_TYPES,
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  PAGE_TYPES,
} from "@/db/schema/enums";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import z from "zod";

export const useCourseFilters = () => {
  return useQueryStates({
    category: parseAsStringEnum(z.enum(COURSE_CATEGORIES).options),
    level: parseAsStringEnum(z.enum(COURSE_LEVELS).options),
    featured: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    status: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    buildingId: parseAsString,
    searchQuery: parseAsString,
  });
};
