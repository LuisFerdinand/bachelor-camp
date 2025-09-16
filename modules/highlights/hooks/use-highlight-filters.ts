import { BOOLEAN_TYPES, PAGE_TYPES } from "@/db/schema/enums";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import z from "zod";

export const useHighlightFilters = () => {
  return useQueryStates({
    status: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    searchQuery: parseAsString,
  });
};
