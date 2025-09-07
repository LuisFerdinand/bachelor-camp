import { BOOLEAN_TYPES, PAGE_TYPES } from "@/db/schema/enums";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import z from "zod";

export const useBannerFilters = () => {
  return useQueryStates({
    type: parseAsStringEnum(z.enum(PAGE_TYPES).options),
    status: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    searchQuery: parseAsString,
  });
};
