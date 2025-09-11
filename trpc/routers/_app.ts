import { bannersRouter } from "@/modules/banners/server/procedures";
import { createTRPCRouter } from "../init";
import { postsRouter } from "@/modules/posts/server/procedures";
import { pillarsRouter } from "@/modules/pillars/server/procedures";

export const appRouter = createTRPCRouter({
  banners: bannersRouter,
  pillars: pillarsRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
