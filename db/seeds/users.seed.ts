// db/seeds/pillars.seed.ts
import { db } from "..";
import { roles, userRoles, users } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { BooleanType, PageType, roleEnum } from "../schema/enums";
import { eq } from "drizzle-orm";

export const seedRoles = async () => {
  console.log("🌱 Seeding Roles...");

  // Optional: Clear existing data
  await db.delete(roles);

  const roleData = roleEnum.enumValues.map((name) => ({
    id: uuidv4(),
    name,
    description: `${name} role`,
  }));

  await db.insert(roles).values(roleData);

  console.log("✅ Roles seeded successfully!");
};

export const seedUserRoles = async () => {
  console.log("🌱 Seeding User Roles...");

  // Optional: Clear existing data
  await db.delete(userRoles);

  type UserRoleInsert = typeof userRoles.$inferInsert;

  const emails = [
    "vincent373kon@gmail.com",
    "ferdinandluis88@gmail.com", // 👈 add new user here
  ];

  const roleList = await db.select().from(roles);
  const roleIds = roleList.map((row) => row.id);

  for (const email of emails) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res[0]);

    if (!user) {
      console.warn(`⚠️ User with email ${email} not found, skipping...`);
      continue;
    }

    const data: UserRoleInsert[] = roleIds.map((role) => ({
      userId: user.id,
      roleId: role,
    }));

    await db.insert(userRoles).values(data);
  }

  console.log("✅ User Roles seeded successfully!");
};
