// import { db } from "@/db";
import { clsx, type ClassValue } from "clsx";
import { eq } from "drizzle-orm";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToColor(str: string, dark: boolean = false) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;

  if (dark) {
    return {
      background: `hsl(${hue}, 30%, 20%)`, // Dark, muted background
      text: `hsl(${hue}, 60%, 85%)`, // Light, readable text
      border: `hsl(${hue}, 25%, 35%)`, // Subtle dark border
    };
  }

  return {
    background: `hsl(${hue}, 45%, 96%)`, // Very light, subtle background
    text: `hsl(${hue}, 60%, 45%)`, // Medium saturation text
    border: `hsl(${hue}, 35%, 85%)`, // Soft border
  };
}

export function formatOrdinal(n: number) {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}ᵗʰ`;
  switch (n % 10) {
    case 1:
      return `${n}ˢᵗ`;
    case 2:
      return `${n}ⁿᵈ`;
    case 3:
      return `${n}ʳᵈ`;
    default:
      return `${n}ᵗʰ`;
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

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getAbbr = (day: string) =>
  day.charAt(0).toUpperCase() + day.slice(1, 3);
