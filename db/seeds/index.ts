import { clearTables } from "./utils";

import { db } from "..";
import { users } from "../schema/users";
import { seedBanners } from "./banners.seed";
import { seedPostCategories } from "./posts.seed";
import { seedPillars } from "./pillars.seed";
import { seedTestimonials } from "./testimonials.seed";
import { seedRoles, seedUserRoles } from "./users.seed";
import { seedHighlights } from "./highlights.seed";
import { seedAccreditations } from "./accredItations.seed";
import { seedMilestones } from "./milestones.seed";
import { seedPrinciples } from "./principles.seed";
import { seedStatistics } from "./statistics.seed";
import { seedTeamMembers } from "./teamMembers.seed";
import { seedFaqs } from "./faqs.seed";
import { seedSocialMedias } from "./socialMedias.seed";
import { seedLocations } from "./locations.seed";
import { seedFacilities } from "./facilities.seed";

async function main() {
  // 1. Clear tables
  await clearTables([
    "collection_posts",
    "departments",
    "facilities",
    "faqs",
    "faq_categories",
    "highlights",
    "user_collections",
    "pillars",
    "post_tag_relations",
    "post_tags",
    "post_category_relations",
    "post_categories",
    "posts",
    "social_medias",
    "team_members",
    "testimonials",
    "testimonial_categories",
    "user_roles",
  ]);

  // 2. Seed users
  //   await seedUsers(10);
  //   const userIds = (await db.select({ id: users.id }).from(users)).map(u => u.id);

  // 3. Seed posts
  //   await seedPosts(userIds, 30);
  await seedRoles();
  await seedUserRoles();

  await seedTestimonials();

  // Seed Banners
  await seedBanners();

  // Seed Banners
  await seedPillars();

  // Seed Posts
  await seedPostCategories();

  await seedHighlights();

  await seedAccreditations();

  await seedMilestones();

  await seedPrinciples();

  await seedStatistics();

  await seedTeamMembers();

  await seedFaqs();

  await seedSocialMedias();

  await seedLocations();

  await seedFacilities();

  console.log("✅ Seeding complete!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
