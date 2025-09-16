import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToColor(str: string, dark: boolean = false) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360; // keep hue in [0, 360)

  // Light vs Dark variant
  if (dark) {
    return `hsl(${hue}, 60%, 35%)`; // darker tone
  } else {
    return `hsl(${hue}, 70%, 75%)`; // bright pastel-like
  }
}

export function formatOrdinal(n: number) {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

// Base slug generator
export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Ensure uniqueness by checking DB
export async function generateUniqueSlug<T extends { slug: string }>(
  input: string,
  table: any
): Promise<string> {
  let baseSlug = generateSlug(input);
  let slug = baseSlug;
  let counter = 1;

  // keep looping until we find a slug not in DB
  while (true) {
    const [existing] = await db
      .select()
      .from(table)
      .where(eq(table.slug, slug))
      .limit(1);

    if (!existing) break;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
