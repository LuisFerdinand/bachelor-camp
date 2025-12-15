import { db } from "@/db";
import { roles, userRoles, users } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";
import z from "zod";

export const usersRouter = createTRPCRouter({
  getUserWithRoles: protectedProcedure
    .input(
      z.object({
        clerkId: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      const { clerkId } = input;

      const result = await db
        .select({
          id: users.id,
          clerkId: users.clerkId,
          firstName: users.firstName,
          lastName: users.lastName,
          avatarUrl: users.avatarUrl,
          email: users.email,
          phone: users.phone,
          lastActiveRole: users.lastActiveRole,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
          roleName: roles.name,
          roleId: roles.id,
        })
        .from(users)
        .leftJoin(userRoles, eq(users.id, userRoles.userId))
        .leftJoin(roles, eq(userRoles.roleId, roles.id))
        .where(eq(users.clerkId, clerkId));

      if (result.length === 0) return null;

      const user = {
        id: result[0].id,
        clerkId: result[0].clerkId,
        firstName: result[0].firstName,
        lastName: result[0].lastName,
        avatarUrl: result[0].avatarUrl,
        email: result[0].email,
        phone: result[0].phone,
        lastActiveRole: result[0].lastActiveRole,
        createdAt: result[0].createdAt,
        updatedAt: result[0].updatedAt,
        roles: result
          .filter((r) => r.roleName !== null)
          .map((r) => ({
            id: r.roleId!,
            name: r.roleName!,
          })),
      };

      return user;
    }),
});
