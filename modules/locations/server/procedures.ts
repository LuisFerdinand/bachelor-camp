import { db } from "@/db";
import {
  locations,
  locationCreateSchema,
  locationUpdateSchema,
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
import { and, asc, eq, ilike, or, sql } from "drizzle-orm";
import z from "zod";

export const locationsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db
      .select()
      .from(locations)
      .where(eq(locations.isActive, "true"));
    return data;
  }),

  getFiltered: protectedProcedure
    .input(
      z.object({
        isActive: z.enum(booleanTypeEnum.enumValues).optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const { isActive, searchQuery } = input;

      const filters = and(
        isActive ? eq(locations.isActive, isActive) : undefined,
        searchQuery
          ? or(
              ilike(locations.name, `%${searchQuery}%`),
              ilike(locations.address, `%${searchQuery}%`),
              ilike(locations.phone, `%${searchQuery}%`),
              ilike(locations.email, `%${searchQuery}%`)
            )
          : undefined
      );

      return db
        .select()
        .from(locations)
        .where(filters)
        .orderBy(
          asc(locations.isActive),
          asc(locations.updatedAt),
          asc(locations.name)
        );
    }),

  getOneProtected: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const location = await db.query.locations.findFirst({
        where: (l, { eq }) => eq(l.id, input.id),
      });

      if (!location) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Location not found",
        });
      }

      return location;
    }),

  create: protectedProcedure
    .input(locationCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const [location] = await db
        .insert(locations)
        .values({
          name: input.name,
          slug: await generateUniqueSlug(input.name, locations),
          address: input.address,
          email: input.email,
          lat: input.lat,
          lng: input.lng,
          mapsLink: input.mapsLink,
          phone: input.phone,
          hours: input.hours ?? [],
          isActive: "false",
        })
        .returning();

      if (!location) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create location",
        });
      }

      return location;
    }),

  // Update location
  update: protectedProcedure
    .input(locationUpdateSchema.extend({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);
      const { id, ...rest } = input;

      const [existing] = await db
        .select()
        .from(locations)
        .where(eq(locations.id, id));

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Location not found",
        });
      }

      const updateData: Partial<typeof locations.$inferInsert> = {
        updatedAt: new Date(),
      };

      if (rest.name !== undefined) {
        if (rest.name !== existing.name) {
          updateData.name = rest.name;
          updateData.slug = await generateUniqueSlug(rest.name, locations);
        }
      }
      if (rest.address !== undefined) {
        updateData.address = rest.address;
      }
      if (rest.email !== undefined) {
        updateData.email = rest.email;
      }
      if (rest.hours !== undefined) {
        updateData.hours = rest.hours;
      }
      if (rest.isActive !== undefined) {
        updateData.isActive = rest.isActive;
      }
      if (rest.lat !== undefined) {
        updateData.lat = rest.lat;
      }
      if (rest.lng !== undefined) {
        updateData.lng = rest.lng;
      }
      if (rest.mapsLink !== undefined) {
        updateData.mapsLink = rest.mapsLink;
      }
      if (rest.phone !== undefined) {
        updateData.phone = rest.phone;
      }

      const [location] = await db
        .update(locations)
        .set({ ...updateData })
        .where(eq(locations.id, id))
        .returning();

      if (!location) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Location not found.",
        });
      }
      return location;
    }),

  // Delete location
  remove: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);

      const [deleted] = await db
        .delete(locations)
        .where(eq(locations.id, input.id))
        .returning();

      if (!deleted) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Location not found",
        });
      }

      return deleted;
    }),

  activate: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      await requireRole(userId, ["super_admin", "admin"]);
      const { id } = input;

      const [location] = await db
        .select()
        .from(locations)
        .where(eq(locations.id, id));

      if (!location) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Location not found",
        });
      }

      await db
        .update(locations)
        .set({ isActive: "false" })
        .where(eq(locations.isActive, "true"));

      const [updated] = await db
        .update(locations)
        .set({
          isActive: "true",
          updatedAt: new Date(),
        })
        .where(eq(locations.id, id))
        .returning();

      return updated;
    }),
});
