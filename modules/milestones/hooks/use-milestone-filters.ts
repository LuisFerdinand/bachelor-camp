import { BOOLEAN_TYPES, PAGE_TYPES } from "@/db/schema/enums";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import z from "zod";

export const useMilestoneFilters = () => {
  return useQueryStates({
    year: parseAsInteger,
    status: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    searchQuery: parseAsString,
  });
};
