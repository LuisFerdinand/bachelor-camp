import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { mediaConfigs, MediaEntity } from "@/lib/fileConfigs";
import { db } from "@/db";

function getKey<
  T extends {
    mediaKey?: string | null;
    imageKey?: string | null;
    avatarKey?: string | null;
  },
>(record: T, keyColumn: keyof T) {
  const value = record[keyColumn];
  return value ?? undefined; // converts null → undefined
}

export async function DELETE(
  req: Request,
  { params }: { params: { entity: string; id: string } }
) {
  const { userId } = await auth();
  const { entity, id } = await params;

  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const config = mediaConfigs[entity as MediaEntity];
  if (!config) {
    return Response.json({ message: "Invalid entity" }, { status: 400 });
  }

  const [record] = await db
    .select()
    .from(config.table)
    .where(eq(config.table.id, id));

  if (!record) {
    return Response.json({ message: `${entity} not found` }, { status: 404 });
  }

  const key = getKey(record as any, config.keyColumn);

  if (!key) {
    return Response.json({ message: "No media to delete" }, { status: 400 });
  }

  const utapi = new UTApi();
  try {
    await utapi.deleteFiles(key);
  } catch (err) {
    return Response.json(
      { message: "Failed to delete media" },
      { status: 500 }
    );
  }

  await db
    .update(config.table)
    .set({ [config.urlColumn]: null, [config.keyColumn]: null })
    .where(eq(config.table.id, id));

  return Response.json({ message: "Media deleted" }, { status: 200 });
}
