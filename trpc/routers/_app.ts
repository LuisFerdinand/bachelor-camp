import { bannersRouter } from "@/modules/banners/server/procedures";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  banners: bannersRouter
});

export type AppRouter = typeof appRouter;