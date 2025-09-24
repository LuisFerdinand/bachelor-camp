import { db } from "@/db";
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { pillars } from "@/db/schema";

export async function DELETE(
  req: Request,
  { params }: { params: { pillarId: string } }
) {
  const { userId } = await auth();
  const pillarId = await params.pillarId;

  if (!userId || !pillarId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const pillar = await db
    .select()
    .from(pillars)
    .where(eq(pillars.id, pillarId))
    .then((res) => res[0]);

  if (!pillar) {
    return new Response(JSON.stringify({ message: "Pillar not found" }), {
      status: 404,
    });
  }

  if (!pillar.imageKey) {
    return new Response(JSON.stringify({ message: "No image to delete" }), {
      status: 400,
    });
  }

  const utapi = new UTApi();
  try {
    await utapi.deleteFiles(pillar.imageKey);
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to delete image" }), {
      status: 500,
    });
  }

  await db
    .update(pillars)
    .set({ imageUrl: null, imageKey: null })
    .where(eq(pillars.id, pillarId));

  return new Response(JSON.stringify({ message: "Image deleted" }), {
    status: 200,
  });
}
