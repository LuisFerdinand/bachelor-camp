import { db } from "@/db";
import {
  accreditationCreateSchema,
  accreditations,
  accreditationUpdateSchema,
} from "@/db/schema";
import { booleanTypeEnum } from "@/db/schema/enums";
import { requireRole } from "@/lib/access";
import { generateUniqueSlug } from "@/server/utils/generateUniqueSlug";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
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
          slug: await generateUniqueSlug(input.title, accreditations),
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
          .orderBy(
            asc(accreditations.isActive), // "true" first
            asc(accreditations.order), // then by lowest order
            asc(accreditations.title)
          );

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

      const [existing] = await db
        .select()
        .from(accreditations)
        .where(eq(accreditations.id, id));
      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Accreditation not found",
        });
      }

      const updateData: Partial<typeof accreditations.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.title !== undefined) {
        if (rest.title !== existing.title) {
          updateData.slug = await generateUniqueSlug(
            rest.title,
            accreditations
          );
          updateData.title = rest.title;
        }
      }
      if (rest.description !== undefined) {
        updateData.description = rest.description;
      }
      if (rest.imageKey !== undefined) {
        updateData.imageKey = rest.imageKey;
      }

      if (rest.imageUrl !== undefined) {
        updateData.imageUrl =
          typeof rest.imageUrl === "string" && rest.imageUrl.trim() === ""
            ? null
            : rest.imageUrl;
      }

      let orderUpdate: number | undefined = undefined;

      // ✅ Handle activation
      if (rest.isActive === "true" && existing.isActive === "false") {
        const [maxRow] = await db
          .select({ maxOrder: sql<number>`max(${accreditations.order})` })
          .from(accreditations)
          .where(eq(accreditations.isActive, "true"));

        const maxOrder = maxRow?.maxOrder ?? 0;
        orderUpdate = maxOrder + 1;
        updateData.isActive = "true";
      }

      // ✅ Handle deactivation
      if (rest.isActive === "false" && existing.isActive === "true") {
        const currentOrder = existing.order ?? 0;
        updateData.isActive = "false";
        orderUpdate = 0;

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

      const [accreditation] = await db
        .update(accreditations)
        .set({
          ...updateData,
          order: orderUpdate ?? existing.order,
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
  getMany: baseProcedure.query(async () => {
    const data = await db
      .select()
      .from(accreditations)
      .where(eq(accreditations.isActive, "true"))
      .orderBy(asc(accreditations.order));
    return data;
  }),
});
