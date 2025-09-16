import { testimonialCategories } from "@/db/schema";
import { booleanTypeEnum, testimonialSourceEnum } from "@/db/schema/enums";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, eq } from "drizzle-orm";
import z from "zod";

export const facilitiesRouter = createTRPCRouter({});
