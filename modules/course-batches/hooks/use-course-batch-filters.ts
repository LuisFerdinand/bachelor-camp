import {
  BOOLEAN_TYPES,
  COURSE_BATCH_STATUSES,
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  DELIVERY_MODES,
  PAGE_TYPES,
} from "@/db/schema/enums";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import z from "zod";

export const useCourseBatchFilters = () => {
  return useQueryStates({
    courseId: parseAsString,
    status: parseAsStringEnum(z.enum(COURSE_BATCH_STATUSES).options),
    deliveryMode: parseAsStringEnum(z.enum(DELIVERY_MODES).options),
    category: parseAsStringEnum(z.enum(COURSE_CATEGORIES).options),
    level: parseAsStringEnum(z.enum(COURSE_LEVELS).options),
    isFeatured: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    startDateFrom: parseAsString,
    startDateTo: parseAsString,
    searchQuery: parseAsString,
  });
};
