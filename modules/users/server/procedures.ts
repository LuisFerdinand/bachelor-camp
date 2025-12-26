import { db } from "@/db";
import { user as users, roles, userRoles } from "@/db/schema";
import { ROLES } from "@/db/schema/enums";
import { splitName } from "@/lib/utils";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import z from "zod";


export const usersRouter = createTRPCRouter({
  getUserWithRoles: protectedProcedure.query(async ({ ctx }) => {
    const authUserId = ctx.session?.user.id!;

    const result = await db
      .select({
        id: users.id,
        name: users.name,
        image: users.image,
        email: users.email,
        lastActiveRole: users.lastActiveRole,
        phone: users.phone,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        roleName: roles.name,
        roleId: roles.id,
      })
      .from(users)
      .leftJoin(userRoles, eq(users.id, userRoles.userId))
      .leftJoin(roles, eq(userRoles.roleId, roles.id))
      .where(eq(users.id, authUserId));

    if (result.length === 0) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

     const { firstName, lastName } = splitName(result[0].name);

    return {
      id: result[0].id,
      firstName,
      lastName,
      image: result[0].image,
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
  }),
    setActiveRole: protectedProcedure
    .input(
      z.object({
        role: z.enum(ROLES).nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db
        .update(users)
        .set({ lastActiveRole: input.role })
        .where(eq(users.id, ctx.session?.user.id!));
    }),
});
