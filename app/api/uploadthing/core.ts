import { and, eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { UploadThingError, UTApi } from "uploadthing/server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { banners, users } from "@/db/schema";

const f = createUploadthing();

export const ourFileRouter = {
  bannerMediaUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ bannerId: z.string().uuid() }))
    .middleware(async ({ input }) => {
      const { userId: clerkUserId } = await auth();
      if (!clerkUserId) throw new UploadThingError("Unauthorized");

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, clerkUserId));
      if (!user) throw new UploadThingError("Unauthorized");

      const [banner] = await db
        .select({ mediaKey: banners.mediaKey })
        .from(banners)
        .where(eq(banners.id, input.bannerId));

      if (!banner) throw new UploadThingError("Banner not found");

      if (banner.mediaKey) {
        const utapi = new UTApi();
        await utapi.deleteFiles(banner.mediaKey);
        await db
          .update(banners)
          .set({ mediaKey: null, mediaUrl: null })
          .where(eq(banners.id, input.bannerId));
      }

      return { user, ...input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db
        .update(banners)
        .set({ mediaUrl: file.ufsUrl, mediaKey: file.key })
        .where(eq(banners.id, metadata.bannerId));

      console.log("UploadThing metadata:", metadata);
      console.log("UploadThing file:", file);
      return { url: file.ufsUrl, key: file.key }; // ✅ JSON-safe
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
