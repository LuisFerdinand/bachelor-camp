import { BOOLEAN_TYPES, PAGE_TYPES } from "@/db/schema/enums";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import z from "zod";

export const useTeamMemberFilters = () => {
  return useQueryStates({
    departmentId: parseAsString,
    status: parseAsStringEnum(z.enum(BOOLEAN_TYPES).options),
    searchQuery: parseAsString,
  });
};
