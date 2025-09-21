import { BOOLEAN_TYPES } from "@/db/schema/enums";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import z from "zod";

export const useFAQFilters = () => {
  return useQueryStates({
    category: parseAsString,
    status: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    searchQuery: parseAsString,
  });
};
