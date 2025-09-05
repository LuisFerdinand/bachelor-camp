import { db } from "@/db";
import { banners } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const bannersRouter = createTRPCRouter({
      getMany: baseProcedure.query(async () => {
        const data = await db.select().from(banners);

    return data;
  }),
})