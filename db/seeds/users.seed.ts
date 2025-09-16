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

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, "vincent373kon@gmail.com"))
    .then((res) => res[0]);

  const roleList = await db.select().from(roles);
  const roleIds = roleList.map((row) => row.id);

  const data: UserRoleInsert[] = roleIds.map((role) => {
    return {
      userId: user.id,
      roleId: role,
    };
  });
  await db.insert(userRoles).values(data);

  console.log("✅ User Roles seeded successfully!");
};
