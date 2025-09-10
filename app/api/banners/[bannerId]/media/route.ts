import { db } from "@/db";
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { banners } from "@/db/schema";

export async function DELETE(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  const { userId } = await auth();
  const bannerId = await params.bannerId;

  if (!userId || !bannerId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const banner = await db
    .select()
    .from(banners)
    .where(eq(banners.id, bannerId))
    .then((res) => res[0]);

  if (!banner) {
    return new Response(JSON.stringify({ message: "Banner not found" }), {
      status: 404,
    });
  }

  if (!banner.mediaKey) {
    return new Response(JSON.stringify({ message: "No media to delete" }), {
      status: 400,
    });
  }

  const utapi = new UTApi();
  try {
    await utapi.deleteFiles(banner.mediaKey);
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to delete media" }), {
      status: 500,
    });
  }

  await db
    .update(banners)
    .set({ mediaUrl: null, mediaKey: null })
    .where(eq(banners.id, bannerId));

  return new Response(JSON.stringify({ message: "Media deleted" }), {
    status: 200,
  });
}
