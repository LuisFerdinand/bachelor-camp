import { db } from "@/db";
import { user as users, roles, userRoles } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { Role } from "@/db/schema/enums";

export async function requireRole(
  userId: string,
  allowedRoles: Role[]
) {
  const rows = await db
    .select({
      userId: users.id,
      roleName: roles.name,
    })
    .from(users)
    .innerJoin(userRoles, eq(userRoles.userId, users.id))
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .where(eq(users.id, userId));

  if (rows.length === 0) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User has no roles or does not exist",
    });
  }

  const assignedRoles = rows.map(r => r.roleName);

  const hasAccess = assignedRoles.some(role =>
    allowedRoles.includes(role)
  );

  if (!hasAccess) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: `Required roles: ${allowedRoles.join(", ")}`,
    });
  }

  return {
    userId,
    roles: assignedRoles,
  };
}
