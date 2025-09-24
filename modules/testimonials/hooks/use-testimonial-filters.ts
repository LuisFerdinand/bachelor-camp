import {
  BOOLEAN_TYPES,
  PAGE_TYPES,
  TESTIMONIAL_SOURCES,
} from "@/db/schema/enums";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import z from "zod";

export const useTestimonialFilters = () => {
  return useQueryStates({
    category: parseAsString,
    source: parseAsStringEnum(z.enum(TESTIMONIAL_SOURCES).options),
    isFeatured: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    isShown: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    searchQuery: parseAsString,
  });
};
