import {
  BOOLEAN_TYPES,
  FACILITY_CATEGORIES,
  FACILITY_STATUSES,
  FACILITY_TYPES,
  PAGE_TYPES,
  TESTIMONIAL_SOURCES,
} from "@/db/schema/enums";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import z from "zod";

export const useFacilityFilters = () => {
  return useQueryStates({
    featured: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    status: parseAsStringEnum(z.enum(FACILITY_STATUSES).options),
    type: parseAsStringEnum(z.enum(FACILITY_TYPES).options),
    category: parseAsStringEnum(z.enum(FACILITY_CATEGORIES).options),
    searchQuery: parseAsString,
  });
};
