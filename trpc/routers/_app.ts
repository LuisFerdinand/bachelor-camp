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
import { coursesRouter } from "@/modules/courses/server/procedures";
import { buildingsRouter } from "@/modules/buildings/server/procedures";
import { courseBatchesRouter } from "@/modules/course-batches/server/procedures";
import {  usersRouter } from "@/modules/users/server/procedures";

export const appRouter = createTRPCRouter({
  accreditations: accreditationsRouter,
  banners: bannersRouter,
  buildings: buildingsRouter,
  courses: coursesRouter,
  courseBatches: courseBatchesRouter,
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
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
