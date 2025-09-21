import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import { z } from "zod";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { accreditations, highlights, milestones, users } from "@/db/schema";

const f = createUploadthing();

function createImageUploader<T extends { id: any }>(options: {
  table: any;
  idField: string;
  keyColumn: string;
  urlColumn: string;
}) {
  return f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  })
    .input(z.object({ [options.idField]: z.string().uuid() }))
    .middleware(async ({ input }) => {
      const { userId: clerkUserId } = await auth();
      if (!clerkUserId) throw new UploadThingError("Unauthorized");

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, clerkUserId));
      if (!user) throw new UploadThingError("Unauthorized");

      const id = (input as any)[options.idField];

      const [record] = await db
        .select({ key: options.table[options.keyColumn] })
        .from(options.table)
        .where(eq(options.table.id, id));

      if (!record) throw new UploadThingError("Record not found");

      if (record.key) {
        const utapi = new UTApi();
        await utapi.deleteFiles(record.key);
        await db
          .update(options.table)
          .set({ [options.keyColumn]: null, [options.urlColumn]: null })
          .where(eq(options.table.id, id));
      }

      return { user, id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db
        .update(options.table)
        .set({
          [options.urlColumn]: file.ufsUrl,
          [options.keyColumn]: file.key,
        })
        .where(eq(options.table.id, metadata.id));

      return { url: file.ufsUrl, key: file.key };
    });
}

// --- use the factory for each uploader ---
import { banners, pillars, testimonials } from "@/db/schema";
import { teamMembers } from "@/db/schema/marketing/teamMembers";

export const ourFileRouter = {
  bannerMediaUploader: createImageUploader({
    table: banners,
    idField: "bannerId",
    keyColumn: "mediaKey",
    urlColumn: "mediaUrl",
  }),

  pillarImageUploader: createImageUploader({
    table: pillars,
    idField: "pillarId",
    keyColumn: "imageKey",
    urlColumn: "imageUrl",
  }),

  testimonialImageUploader: createImageUploader({
    table: testimonials,
    idField: "testimonialId",
    keyColumn: "imageKey",
    urlColumn: "imageUrl",
  }),
  highlightImageUploader: createImageUploader({
    table: highlights,
    idField: "highlightId",
    keyColumn: "imageKey",
    urlColumn: "imageUrl",
  }),
  accreditationImageUploader: createImageUploader({
    table: accreditations,
    idField: "accreditationId",
    keyColumn: "imageKey",
    urlColumn: "imageUrl",
  }),
  milestoneImageUploader: createImageUploader({
    table: milestones,
    idField: "milestoneId",
    keyColumn: "imageKey",
    urlColumn: "imageUrl",
  }),
  teamMemberAvatarUploader: createImageUploader({
    table: teamMembers,
    idField: "teamMemberId",
    keyColumn: "avatarKey",
    urlColumn: "avatarUrl",
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
