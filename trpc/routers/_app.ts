import { bannersRouter } from "@/modules/banners/server/procedures";
import { createTRPCRouter } from "../init";
import { postsRouter } from "@/modules/posts/server/procedures";
import { pillarsRouter } from "@/modules/pillars/server/procedures";
import { facilitiesRouter } from "@/modules/facilities/server/procedures";
import { testimonialsRouter } from "@/modules/testimonials/server/procedures";
import { highlightsRouter } from "@/modules/highlights/server/procedures";
import { accreditationsRouter } from "@/modules/accreditations/server/procedures";
import { milestonesRouter } from "@/modules/milestones/server/procedures";
import { principlesRouter } from "@/modules/principles/server/procedures";
import { statisticsRouter } from "@/modules/statistics/server/procedures";

export const appRouter = createTRPCRouter({
  accreditations: accreditationsRouter,
  banners: bannersRouter,
  facilities: facilitiesRouter,
  highlights: highlightsRouter,
  milestones: milestonesRouter,
  pillars: pillarsRouter,
  principles: principlesRouter,
  posts: postsRouter,
  statistics: statisticsRouter,
  testimonials: testimonialsRouter,
});

export type AppRouter = typeof appRouter;
