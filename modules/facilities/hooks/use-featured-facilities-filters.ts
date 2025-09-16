import {
  BOOLEAN_TYPES,
  PAGE_TYPES,
  TESTIMONIAL_SOURCES,
} from "@/db/schema/enums";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import z from "zod";

export const useFeaturedFacilitiesFilters = () => {
  return useQueryStates({});
};
