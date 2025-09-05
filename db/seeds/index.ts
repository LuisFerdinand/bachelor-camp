import { clearTables } from "./utils";

import { db } from "..";
import { users } from "../schema/users";
import { seedBanners } from "./banners.seed";

async function main() {
  // 1. Clear tables
  await clearTables([
    "collection_posts",
    "user_collections",
    "post_tag_relations",
    "post_tags",
    "post_category_relations",
    "post_categories",
    "posts",
    "users",
  ]);

  // 2. Seed users
//   await seedUsers(10);
//   const userIds = (await db.select({ id: users.id }).from(users)).map(u => u.id);

  // 3. Seed posts
//   await seedPosts(userIds, 30);

// Seed Banners
await seedBanners()

  console.log("✅ Seeding complete!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
