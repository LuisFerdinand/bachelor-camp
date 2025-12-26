// db/seeds/pillars.seed.ts
import { db } from "..";
import { roles, userRoles, user as users } from "../schema";
import { roleEnum } from "../schema/enums";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

/* -------------------------------------------------- */
/* Role → User mapping (SAFE & EXPLICIT) */
/* -------------------------------------------------- */

type RoleName = (typeof roleEnum.enumValues)[number];

const USER_ROLE_MAP: Record<string, RoleName[]> = {
  "vincent373kon@gmail.com": ["super_admin", "admin"],
  "ferdinandluis88@gmail.com": ["admin"],
  "konvincent373@gmail.com": ["admin"],
};

/* -------------------------------------------------- */
/* Seed Roles */
/* -------------------------------------------------- */

export const seedRoles = async () => {
  console.log("🌱 Seeding roles...");

  const roleData = roleEnum.enumValues.map((name) => ({
    id: uuidv4(),
    name,
    description: `${name} role`,
  }));

  // Idempotent insert — no deletes, no duplicates
  await db.insert(roles).values(roleData).onConflictDoNothing({
    target: roles.name,
  });

  console.log("✅ Roles seeded (idempotent)");
};

/* -------------------------------------------------- */
/* Seed User Roles */
/* -------------------------------------------------- */

export const seedUserRoles = async () => {
  console.log("🌱 Seeding user roles...");

  if (process.env.NODE_ENV === "production") {
    throw new Error("❌ Seeding user roles is disabled in production");
  }

  const roleList = await db.select().from(roles);

  for (const [email, roleNames] of Object.entries(USER_ROLE_MAP)) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((res) => res[0]);

    if (!user) {
      console.warn(`⚠️ User not found: ${email} — skipping`);
      continue;
    }

    const inserts = roleNames.map((roleName) => {
      const role = roleList.find((r) => r.name === roleName);

      if (!role) {
        throw new Error(`❌ Role "${roleName}" not found in roles table`);
      }

      return {
        userId: user.id,
        roleId: role.id,
      };
    });

    if (!inserts.length) continue;

    // Idempotent insert — no duplicate user-role pairs
    await db
      .insert(userRoles)
      .values(inserts)
      .onConflictDoNothing({
        target: [userRoles.userId, userRoles.roleId],
      });

    console.log(`✅ Assigned roles to ${email}: ${roleNames.join(", ")}`);
  }

  console.log("🎉 User roles seeded successfully");
};
