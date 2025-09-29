import { db } from "@/db";
import { buildings } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const buildingsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    return await db.select().from(buildings);
  }),
});
