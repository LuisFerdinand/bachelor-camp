import { db } from "@/db";
import {
  accreditationCreateSchema,
  accreditations,
  accreditationUpdateSchema,
} from "@/db/schema";
import { booleanTypeEnum } from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
import { abort } from "process";
import { UTApi } from "uploadthing/server";
import z from "zod";

export const accreditationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(accreditationCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const [accreditation] = await db
        .insert(accreditations)
        .values({
          title: input.title,
          description: input.description,
          isActive: "false",
        })
        .returning();

      if (!accreditation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create accreditation.",
        });
      }
      return accreditation;
    }),
  getFiltered: protectedProcedure
    .input(
      z.object({
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { id: userId } = ctx.user;

        await requireRole(userId, ["super_admin", "admin"]);

        const { isActive, searchQuery } = input;

        const filters = and(
          isActive
            ? eq(
                accreditations.isActive,
                isActive === "true" ? "true" : "false"
              )
            : undefined,
          searchQuery
            ? or(
                ilike(accreditations.title, `%${searchQuery}%`),
                ilike(accreditations.description, `%${searchQuery}%`)
              )
            : undefined
        );

        const result = await db
          .select()
          .from(accreditations)
          .where(filters)
          .orderBy(desc(accreditations.updatedAt));

        return result;
      } catch (error) {
        console.error("getMaxOrder error:", error); // <- log full error
        throw new Error("Failed to fetch max order");
      }
    }),
  remove: protectedProcedure
    .input(
      z.object({
        accreditationId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { accreditationId } = input;

      const accreditation = await db
        .select()
        .from(accreditations)
        .where(eq(accreditations.id, accreditationId))
        .then((res) => res[0]);

      if (!accreditation) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const currentOrder = accreditation.order ?? 0;

      if (accreditation.imageKey) {
        const utapi = new UTApi();
        try {
          await utapi.deleteFiles(accreditation.imageKey);
          console.log(
            `Deleted logo from UploadThing: ${accreditation.imageKey}`
          );
        } catch (error) {
          console.error(
            "⚠️ Failed to delete accreditation image from UploadThing:",
            error
          );
          // Not critical enough to stop accreditation deletion
        }
      }

      const [deletedAccreditation] = await db
        .delete(accreditations)
        .where(eq(accreditations.id, accreditationId))
        .returning();

      if (!deletedAccreditation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete accreditation.",
        });
      }

      if (accreditation.isActive === "true") {
        await db
          .update(accreditations)
          .set({
            order: sql`${accreditations.order} - 1`,
            updatedAt: new Date(),
          })
          .where(
            and(
              gt(accreditations.order, currentOrder),
              eq(accreditations.isActive, "true")
            )
          );
      }
      return deletedAccreditation;
    }),
  updateActiveAndOrder: protectedProcedure
    .input(
      z.object({
        accreditationId: z.string(),
        action: z.enum(["toggleActive", "up", "down"]),
        activate: z.boolean().optional(), // only for toggleActive
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);
      const { accreditationId, action, activate } = input;

      const [accreditation] = await db
        .select()
        .from(accreditations)
        .where(eq(accreditations.id, accreditationId));

      if (!accreditation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Accreditation not found.",
        });
      }

      if (action === "toggleActive") {
        if (activate) {
          // Count active accreditations
          const activeCount = await db
            .select()
            .from(accreditations)
            .where(eq(accreditations.isActive, "true"));

          await db
            .update(accreditations)
            .set({
              isActive: "true",
              order: activeCount.length + 1,
              updatedAt: new Date(),
            })
            .where(eq(accreditations.id, accreditationId));
        } else {
          // Deactivate: reorder others if needed
          const currentOrder = accreditation.order;
          await db
            .update(accreditations)
            .set({ isActive: "false", order: 0, updatedAt: new Date() })
            .where(eq(accreditations.id, accreditationId));

          // Reorder other active accreditations
          await db
            .update(accreditations)
            .set({
              order: sql`${accreditations.order} - 1`,
              updatedAt: new Date(),
            })
            .where(
              and(
                gt(accreditations.order, currentOrder),
                eq(accreditations.isActive, "true")
              )
            );
        }
      }

      // Up / Down order
      if (action === "up" || action === "down") {
        if (accreditation.isActive !== "true") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only active accreditations can be reordered",
          });
        }

        const direction = action === "up" ? -1 : 1;
        const targetOrder = accreditation.order! + direction;

        const [targetAccreditation] = await db
          .select()
          .from(accreditations)
          .where(
            and(
              eq(accreditations.isActive, "true"),
              eq(accreditations.order, targetOrder)
            )
          );

        if (!targetAccreditation) return; // already at boundary

        // Swap orders
        await db
          .update(accreditations)
          .set({ order: targetOrder, updatedAt: new Date() })
          .where(eq(accreditations.id, accreditation.id));
        await db
          .update(accreditations)
          .set({ order: accreditation.order })
          .where(eq(accreditations.id, targetAccreditation.id));
      }

      return true;
    }),

  getMaxOrder: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    await requireRole(userId, ["super_admin", "admin"]);
    const [result] = await db
      .select({
        maxOrder: sql<number>`CAST(MAX(${accreditations.order}) AS INT)`,
      })
      .from(accreditations)
      .where(eq(accreditations.isActive, "true"));

    return result?.maxOrder ?? 0;
  }),
  getOneProtected: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      await requireRole(userId, ["super_admin", "admin"]);

      const accreditation = await db.query.accreditations.findFirst({
        where: (b, { eq }) => eq(b.id, input.id),
      });

      if (!accreditation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Accreditation not found.",
        });
      }

      return accreditation;
    }),
  update: protectedProcedure
    .input(
      accreditationUpdateSchema.extend({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const { id, ...rest } = input;
      await requireRole(userId, ["super_admin", "admin"]);

      const updateData: Partial<typeof accreditations.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.title) {
        updateData.title = rest.title;
      }
      if (rest.description) {
        updateData.description = rest.description;
      }
      if (rest.imageKey) {
        updateData.imageKey = rest.imageKey;
      }
      if (rest.isActive) {
        updateData.isActive = rest.isActive;
      }
      if (rest.imageUrl) {
        updateData.imageUrl = rest.imageUrl;
      }

      const [accreditation] = await db
        .update(accreditations)
        .set({
          ...updateData,
        })
        .where(eq(accreditations.id, id))
        .returning();

      if (!accreditation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Accreditation not found.",
        });
      }

      return accreditation;
    }),
});
