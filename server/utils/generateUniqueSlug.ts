// server/utils/generateUniqueSlug.ts
import { db } from "@/db";
import { and, eq, ne } from "drizzle-orm";
import { generateSlug } from "@/lib/utils";

// generic helper
export async function generateUniqueSlug<T extends { slug: string }>(
  input: string,
  table: { slug: any }, // table schema from drizzle
  excludeId?: string
): Promise<string> {
  let baseSlug = generateSlug(input);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const conditions = [eq(table.slug, slug)];
    if (excludeId) {
      conditions.push(ne((table as any).id, excludeId));
    }

    const [existing] = await db
      .select()
      .from(table as any)
      .where(and(...conditions))
      .limit(1);

    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
