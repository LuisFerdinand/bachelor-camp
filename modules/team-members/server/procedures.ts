import { db } from "@/db";
import { booleanTypeEnum } from "@/db/schema/enums";
import {
  departments,
  teamMemberCreateSchema,
  teamMembers,
  teamMemberUpdateSchema,
} from "@/db/schema/marketing/teamMembers";
import { requireRole } from "@/lib/access";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import z from "zod";

export const teamMembersRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    // Fetch all active departments (ordered)
    const departmentData = await db
      .select({
        id: departments.id,
        name: departments.name,
        description: departments.description,
        order: departments.order,
      })
      .from(departments)
      .where(eq(departments.isActive, "true"))
      .orderBy(asc(departments.order));

    // Fetch all active team members (ordered)
    const teamData = await db
      .select({
        id: teamMembers.id,
        name: teamMembers.name,
        title: teamMembers.title,
        departmentId: teamMembers.departmentId,
        avatarUrl: teamMembers.avatarUrl,
        bio: teamMembers.bio,
        socialLinks: teamMembers.socialLinks,
        order: teamMembers.order,
      })
      .from(teamMembers)
      .where(eq(teamMembers.isActive, "true"))
      .orderBy(asc(teamMembers.order));

    // Group members by department name
    const grouped: Record<string, typeof teamData> = {};

    departmentData.forEach((dept) => {
      grouped[dept.name] = teamData.filter(
        (member) => member.departmentId === dept.id
      );
    });

    return { grouped };
  }),
  getFilteredMembers: protectedProcedure
    .input(
      z.object({
        departmentId: z.string().uuid("Invalid department id").optional(),
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { departmentId, isActive, searchQuery } = input;

      await requireRole(userId, ["super_admin", "admin"]);

      // Build filters dynamically
      const filters = and(
        departmentId ? eq(teamMembers.departmentId, departmentId) : undefined,
        isActive !== undefined
          ? eq(teamMembers.isActive, isActive === "true" ? "true" : "false")
          : undefined,
        searchQuery
          ? or(
              ilike(teamMembers.name, `%${searchQuery}%`),
              ilike(teamMembers.title, `%${searchQuery}%`),
              ilike(teamMembers.bio, `%${searchQuery}%`),
              ilike(departments.name, `%${searchQuery}%`)
            )
          : undefined
      );

      const result = await db
        .select({
          id: teamMembers.id,
          name: teamMembers.name,
          title: teamMembers.title,
          bio: teamMembers.bio,
          avatarUrl: teamMembers.avatarUrl,
          order: teamMembers.order,
          socialLinks: teamMembers.socialLinks,
          isActive: teamMembers.isActive,
          createdAt: teamMembers.createdAt,
          updatedAt: teamMembers.updatedAt,

          // department info
          departmentId: departments.id,
          departmentName: departments.name,
        })
        .from(teamMembers)
        .leftJoin(departments, eq(teamMembers.departmentId, departments.id))
        .where(filters)
        .orderBy(
          asc(departments.name),
          asc(teamMembers.order),
          desc(teamMembers.updatedAt)
        );

      return result;
    }),
  getFilteredDepartments: protectedProcedure
    .input(
      z.object({
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { isActive, searchQuery } = input;

      await requireRole(userId, ["super_admin", "admin"]);

      // Build filters dynamically
      const filters = and(
        isActive !== undefined
          ? eq(departments.isActive, isActive === "true" ? "true" : "false")
          : undefined,
        searchQuery
          ? or(
              ilike(departments.name, `%${searchQuery}%`),
              ilike(departments.description, `%${searchQuery}%`)
            )
          : undefined
      );

      const result = await db
        .select({
          id: departments.id,
          name: departments.name,
          description: departments.description,
          order: departments.order,
          isActive: departments.isActive,
          createdAt: departments.createdAt,
          updatedAt: departments.updatedAt,
          totalMembers: sql<number>`COUNT(${teamMembers.id})`.as(
            "total_members"
          ),
        })
        .from(departments)
        .leftJoin(teamMembers, eq(teamMembers.departmentId, departments.id))
        .where(filters)
        .groupBy(departments.id)
        .orderBy(asc(departments.order), desc(departments.updatedAt));

      return result;
    }),
  getManyDepartmentFilters: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    await requireRole(userId, ["super_admin", "admin"]);

    return await db
      .select({ id: departments.id, name: departments.name })
      .from(departments)
      .orderBy(asc(departments.name));
  }),

  create: protectedProcedure
    .input(teamMemberCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const [member] = await db
        .insert(teamMembers)
        .values({
          name: input.name,
          title: input.title,
          departmentId: input.departmentId,
          avatarUrl: input.avatarUrl,
          avatarKey: input.avatarKey,
          bio: input.bio,
          socialLinks: input.socialLinks ?? [],
          order: 0,
          isActive: "false",
        })
        .returning();

      if (!member) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create team member.",
        });
      }

      return member;
    }),

  // UPDATE
  update: protectedProcedure
    .input(
      teamMemberUpdateSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { id, ...rest } = input;

      const [existing] = await db
        .select()
        .from(teamMembers)
        .where(eq(teamMembers.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team member not found",
        });
      }

      const updateData: Partial<typeof teamMembers.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.name !== undefined) updateData.name = rest.name;
      if (rest.title !== undefined) updateData.title = rest.title;
      if (rest.avatarUrl !== undefined)
        updateData.avatarUrl =
          typeof rest.avatarUrl === "string" && rest.avatarUrl.trim() === ""
            ? null
            : rest.avatarUrl;
      if (rest.avatarKey !== undefined) updateData.avatarKey = rest.avatarKey;
      if (rest.bio !== undefined) updateData.bio = rest.bio;
      if (rest.socialLinks !== undefined)
        updateData.socialLinks = rest.socialLinks;

      let orderUpdate: number | undefined = undefined;

      const departmentChanged =
        rest.departmentId && rest.departmentId !== existing.departmentId;

      // --- CASE 1: Department Changed ---
      if (departmentChanged) {
        updateData.departmentId = rest.departmentId;

        // Active -> Active
        if (existing.isActive === "true" && rest.isActive === "true") {
          // shift down others in old dept
          const currentOrder = existing.order ?? 0;
          await db
            .update(teamMembers)
            .set({
              order: sql`${teamMembers.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(teamMembers.order, currentOrder),
                eq(teamMembers.departmentId, existing.departmentId),
                eq(teamMembers.isActive, "true")
              )
            );

          // place at end of new dept
          const [maxRowNew] = await db
            .select({ maxOrder: sql<number>`max(${teamMembers.order})` })
            .from(teamMembers)
            .where(
              and(
                eq(teamMembers.departmentId, rest.departmentId!),
                eq(teamMembers.isActive, "true")
              )
            );

          const maxOrderNew = maxRowNew?.maxOrder ?? 0;
          orderUpdate = maxOrderNew + 1;
          updateData.isActive = "true";
        }

        // Active -> Inactive
        if (existing.isActive === "true" && rest.isActive === "false") {
          const currentOrder = existing.order ?? 0;
          await db
            .update(teamMembers)
            .set({
              order: sql`${teamMembers.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(teamMembers.order, currentOrder),
                eq(teamMembers.departmentId, existing.departmentId),
                eq(teamMembers.isActive, "true")
              )
            );

          orderUpdate = 0;
          updateData.isActive = "false";
        }

        // Inactive -> Active
        if (existing.isActive === "false" && rest.isActive === "true") {
          const [maxRowNew] = await db
            .select({ maxOrder: sql<number>`max(${teamMembers.order})` })
            .from(teamMembers)
            .where(
              and(
                eq(teamMembers.departmentId, rest.departmentId!),
                eq(teamMembers.isActive, "true")
              )
            );

          const maxOrderNew = maxRowNew?.maxOrder ?? 0;
          orderUpdate = maxOrderNew + 1;
          updateData.isActive = "true";
        }

        // Inactive -> Inactive
        if (existing.isActive === "false" && rest.isActive === "false") {
          orderUpdate = 0;
          updateData.isActive = "false";
        }
      }

      // --- CASE 2: Same Department ---
      if (!departmentChanged) {
        // Activating
        if (rest.isActive === "true" && existing.isActive === "false") {
          const [maxRow] = await db
            .select({ maxOrder: sql<number>`max(${teamMembers.order})` })
            .from(teamMembers)
            .where(
              and(
                eq(teamMembers.departmentId, existing.departmentId),
                eq(teamMembers.isActive, "true")
              )
            );

          const maxOrder = maxRow?.maxOrder ?? 0;
          orderUpdate = maxOrder + 1;
          updateData.isActive = "true";
        }

        // Deactivating
        if (rest.isActive === "false" && existing.isActive === "true") {
          const currentOrder = existing.order ?? 0;
          updateData.isActive = "false";
          orderUpdate = 0;

          // Shift down all above
          await db
            .update(teamMembers)
            .set({
              order: sql`${teamMembers.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(teamMembers.order, currentOrder),
                eq(teamMembers.departmentId, existing.departmentId),
                eq(teamMembers.isActive, "true")
              )
            );
        }
      }

      // --- Final update ---
      const [updated] = await db
        .update(teamMembers)
        .set({
          ...updateData,
          order: orderUpdate ?? existing.order,
        })
        .where(eq(teamMembers.id, id))
        .returning();

      if (!updated) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update team member.",
        });
      }

      return updated;
    }),

  // DELETE
  remove: protectedProcedure
    .input(z.object({ memberId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { memberId } = input;

      const [member] = await db
        .select()
        .from(teamMembers)
        .where(eq(teamMembers.id, memberId));

      if (!member) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const currentOrder = member.order ?? 0;

      // Delete avatar from UploadThing if exists
      if (member.avatarKey) {
        const utapi = new UTApi();
        try {
          await utapi.deleteFiles(member.avatarKey);
          console.log(`Deleted avatar from UploadThing: ${member.avatarKey}`);
        } catch (error) {
          console.error("⚠️ Failed to delete avatar from UploadThing:", error);
        }
      }

      const [deleted] = await db
        .delete(teamMembers)
        .where(eq(teamMembers.id, memberId))
        .returning();

      if (!deleted) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete team member.",
        });
      }

      // Reorder within department if active
      if (member.isActive === "true") {
        await db
          .update(teamMembers)
          .set({
            order: sql`${teamMembers.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(teamMembers.order, currentOrder),
              eq(teamMembers.departmentId, member.departmentId),
              eq(teamMembers.isActive, "true")
            )
          );
      }

      return deleted;
    }),
  updateActiveAndOrder: protectedProcedure
    .input(
      z.object({
        memberId: z.string(),
        action: z.enum(["toggleActive", "up", "down"]),
        activate: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { memberId, action, activate } = input;

      const [member] = await db
        .select()
        .from(teamMembers)
        .where(eq(teamMembers.id, memberId));

      if (!member) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team member not found.",
        });
      }

      if (action === "toggleActive") {
        if (activate) {
          const activeCount = await db
            .select()
            .from(teamMembers)
            .where(
              and(
                eq(teamMembers.departmentId, member.departmentId),
                eq(teamMembers.isActive, "true")
              )
            );

          await db
            .update(teamMembers)
            .set({
              isActive: "true",
              order: activeCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(teamMembers.id, memberId));
        } else {
          const currentOrder = member.order;

          await db
            .update(teamMembers)
            .set({ isActive: "false", order: 0, updatedAt: new Date() })
            .where(eq(teamMembers.id, memberId));

          await db
            .update(teamMembers)
            .set({
              order: sql`${teamMembers.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                eq(teamMembers.departmentId, member.departmentId),
                eq(teamMembers.isActive, "true"),
                gt(teamMembers.order, currentOrder)
              )
            );
        }
      }

      if (action === "up" || action === "down") {
        if (member.isActive !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only active members can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = member.order! + direction;

        const [targetMember] = await db
          .select()
          .from(teamMembers)
          .where(
            and(
              eq(teamMembers.departmentId, member.departmentId),
              eq(teamMembers.isActive, "true"),
              eq(teamMembers.order, targetOrder)
            )
          );

        if (!targetMember) return;

        await db
          .update(teamMembers)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(teamMembers.id, member.id));

        await db
          .update(teamMembers)
          .set({ order: member.order })
          .where(eq(teamMembers.id, targetMember.id));
      }

      return true;
    }),
  getMaxOrder: protectedProcedure
    .input(
      z.object({
        departmentId: z.string().uuid("Invalid department id"),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const [result] = await db
        .select({ maxOrder: sql<number>`MAX(${teamMembers.order}) AS INT` })
        .from(teamMembers)
        .where(
          and(
            eq(teamMembers.isActive, "true"),
            eq(teamMembers.departmentId, input.departmentId)
          )
        );

      return result?.maxOrder ?? 0;
    }),
  getOneProtected: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const member = await db.query.teamMembers.findFirst({
        where: (tm, { eq }) => eq(tm.id, input.id),
        with: {
          department: true, // include department info if needed
        },
      });

      if (!member) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team member not found.",
        });
      }

      return member;
    }),
});
