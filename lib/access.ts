import { db } from "@/db";
import { users, roles, userRoles } from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

/**
 * Require a user to have one of the allowed roles.
 */
export async function requireRole(userId: string, allowedRoles: string[]) {
  // Get all roles assigned to the user
  const userRolesQuery = await db
    .select({
      roleName: roles.name,
    })
    .from(userRoles)
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .where(eq(userRoles.userId, userId));

  if (userRolesQuery.length === 0) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User has no roles or does not exist.",
    });
  }

  // Extract role names
  const assignedRoles = userRolesQuery.map((r) => r.roleName);

  // Check if any of the assigned roles match allowedRoles
  const hasAccess = assignedRoles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `You do not have permission. Required roles: ${allowedRoles.join(
        ", "
      )}`,
    });
  }

  // Return user info and roles
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return { ...user, roles: assignedRoles };
}
