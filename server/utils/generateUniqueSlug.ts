// server/utils/generateUniqueSlug.ts
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { generateSlug } from "@/lib/utils";

// generic helper
export async function generateUniqueSlug<T extends { slug: string }>(
  input: string,
  table: { slug: any } // table schema from drizzle
): Promise<string> {
  let baseSlug = generateSlug(input);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const [existing] = await db
      .select()
      .from(table as any)
      .where(eq((table as any).slug, slug))
      .limit(1);
    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
