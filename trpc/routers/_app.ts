import { bannersRouter } from "@/modules/banners/server/procedures";
import { createTRPCRouter } from "../init";
import { postsRouter } from "@/modules/posts/server/procedures";

export const appRouter = createTRPCRouter({
  banners: bannersRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
