// db/seeds/social-medias.seed.ts
import { db } from "..";
import { v4 as uuidv4 } from "uuid";
import { SOCIAL_PLATFORMS } from "../schema/enums";
import { socialMedias } from "../schema";

export const seedSocialMedias = async () => {
  console.log("🌱 Seeding social medias...");

  // Optional: Clear existing data
  await db.delete(socialMedias);

  type SocialMediaInsert = typeof socialMedias.$inferInsert;

  const data: SocialMediaInsert[] = SOCIAL_PLATFORMS.map((platform) => ({
    id: uuidv4(),
    platform,
    url: "",
    order: 0,
    isActive: "false",
  }));

  await db.insert(socialMedias).values(data);

  console.log("✅ Social medias seeded successfully!");
};
