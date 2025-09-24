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
import { teamMembersRouter } from "@/modules/team-members/server/procedures";
import { faqsRouter } from "@/modules/faqs/server/procedures";
import { socialMediasRouter } from "@/modules/social-medias/server/procedures";
import { locationsRouter } from "@/modules/locations/server/procedures";

export const appRouter = createTRPCRouter({
  accreditations: accreditationsRouter,
  banners: bannersRouter,
  facilities: facilitiesRouter,
  faqs: faqsRouter,
  highlights: highlightsRouter,
  locations: locationsRouter,
  milestones: milestonesRouter,
  pillars: pillarsRouter,
  principles: principlesRouter,
  posts: postsRouter,
  socialMedias: socialMediasRouter,
  statistics: statisticsRouter,
  teamMembers: teamMembersRouter,
  testimonials: testimonialsRouter,
});

export type AppRouter = typeof appRouter;
