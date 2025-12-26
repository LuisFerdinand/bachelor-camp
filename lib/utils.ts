
import { clsx, type ClassValue } from "clsx";
import { eq } from "drizzle-orm";
import { twMerge } from "tailwind-merge";
import { addDays, addWeeks, addMonths } from "date-fns";
import {
  ArrowUpDown,
  MoreVertical,
  StarIcon,
  FileCheckIcon,
  Clock,
  Users,
  DollarSign,
  Target,
  BookOpen,
  Briefcase,
  MessageCircle,
  Sprout,
  Zap,
  Rocket,
  Trophy,
  FileCheck,
} from "lucide-react";
import { Role, ROLE_CONFIG } from "@/db/schema/enums";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToColor(str: string, dark: boolean = false) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Better hue distribution to avoid muddy colors
  const hue = Math.abs(hash) % 360;

  // Avoid muddy/ugly color ranges
  const adjustedHue = avoidUglyHues(hue);

  if (dark) {
    return {
      background: `hsl(${adjustedHue}, 45%, 15%)`, // Richer dark background
      text: `hsl(${adjustedHue}, 70%, 90%)`, // Brighter, more readable text
      border: `hsl(${adjustedHue}, 40%, 25%)`, // More defined border
    };
  }

  return {
    background: `hsl(${adjustedHue}, 65%, 95%)`, // More vibrant but still light
    text: `hsl(${adjustedHue}, 75%, 35%)`, // Stronger, more readable text
    border: `hsl(${adjustedHue}, 50%, 80%)`, // More defined border
  };
}

// Alternative version with predefined beautiful color palettes
export function stringToColorPalette(str: string, dark: boolean = false) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Curated beautiful color palettes
  const lightPalettes = [
    {
      bg: "hsl(210, 100%, 97%)",
      text: "hsl(210, 100%, 40%)",
      border: "hsl(210, 60%, 85%)",
    }, // Blue
    {
      bg: "hsl(160, 85%, 96%)",
      text: "hsl(160, 85%, 35%)",
      border: "hsl(160, 50%, 80%)",
    }, // Emerald
    {
      bg: "hsl(270, 95%, 97%)",
      text: "hsl(270, 95%, 45%)",
      border: "hsl(270, 60%, 85%)",
    }, // Purple
    {
      bg: "hsl(25, 95%, 96%)",
      text: "hsl(25, 95%, 40%)",
      border: "hsl(25, 60%, 82%)",
    }, // Orange
    {
      bg: "hsl(350, 85%, 97%)",
      text: "hsl(350, 85%, 45%)",
      border: "hsl(350, 50%, 85%)",
    }, // Rose
    {
      bg: "hsl(45, 95%, 95%)",
      text: "hsl(45, 85%, 35%)",
      border: "hsl(45, 60%, 78%)",
    }, // Yellow
    {
      bg: "hsl(190, 80%, 96%)",
      text: "hsl(190, 80%, 40%)",
      border: "hsl(190, 50%, 80%)",
    }, // Cyan
    {
      bg: "hsl(320, 85%, 97%)",
      text: "hsl(320, 85%, 45%)",
      border: "hsl(320, 50%, 85%)",
    }, // Pink
  ];

  const darkPalettes = [
    {
      bg: "hsl(210, 50%, 12%)",
      text: "hsl(210, 100%, 85%)",
      border: "hsl(210, 40%, 22%)",
    }, // Blue
    {
      bg: "hsl(160, 45%, 12%)",
      text: "hsl(160, 85%, 80%)",
      border: "hsl(160, 35%, 22%)",
    }, // Emerald
    {
      bg: "hsl(270, 50%, 12%)",
      text: "hsl(270, 95%, 85%)",
      border: "hsl(270, 40%, 22%)",
    }, // Purple
    {
      bg: "hsl(25, 50%, 12%)",
      text: "hsl(25, 95%, 80%)",
      border: "hsl(25, 40%, 22%)",
    }, // Orange
    {
      bg: "hsl(350, 45%, 12%)",
      text: "hsl(350, 85%, 82%)",
      border: "hsl(350, 35%, 22%)",
    }, // Rose
    {
      bg: "hsl(45, 50%, 12%)",
      text: "hsl(45, 85%, 75%)",
      border: "hsl(45, 40%, 22%)",
    }, // Yellow
    {
      bg: "hsl(190, 45%, 12%)",
      text: "hsl(190, 80%, 82%)",
      border: "hsl(190, 35%, 22%)",
    }, // Cyan
    {
      bg: "hsl(320, 45%, 12%)",
      text: "hsl(320, 85%, 82%)",
      border: "hsl(320, 35%, 22%)",
    }, // Pink
  ];

  const palettes = dark ? darkPalettes : lightPalettes;
  const selectedPalette = palettes[Math.abs(hash) % palettes.length];

  return {
    background: selectedPalette.bg,
    text: selectedPalette.text,
    border: selectedPalette.border,
  };
}

// Helper function to avoid ugly hue ranges
function avoidUglyHues(hue: number): number {
  // Avoid muddy browns (30-60) and dull yellows (40-80)
  if (hue >= 30 && hue <= 80) {
    // Shift to blue-green range
    return hue + 100;
  }

  // Avoid muddy olive greens (60-90)
  if (hue >= 60 && hue <= 90) {
    // Shift to cyan range
    return hue + 120;
  }

  return hue;
}

// Even simpler version with modern, trendy colors
export function stringToModernColor(str: string, dark: boolean = false) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Modern, trendy color combinations
  const modernColors = [
    // Vibrant but professional
    { hue: 210, name: "blue" }, // Blue
    { hue: 160, name: "emerald" }, // Emerald
    { hue: 270, name: "violet" }, // Violet
    { hue: 15, name: "orange" }, // Orange
    { hue: 340, name: "rose" }, // Rose
    { hue: 190, name: "cyan" }, // Cyan
    { hue: 300, name: "fuchsia" }, // Fuchsia
    { hue: 120, name: "green" }, // Green
  ];

  const color = modernColors[Math.abs(hash) % modernColors.length];

  if (dark) {
    return {
      background: `hsl(${color.hue}, 55%, 8%)`, // Very dark, rich background
      text: `hsl(${color.hue}, 85%, 88%)`, // Bright, readable text
      border: `hsl(${color.hue}, 45%, 18%)`, // Subtle but visible border
      accent: `hsl(${color.hue}, 75%, 60%)`, // Optional accent color
      name: color.name,
    };
  }

  return {
    background: `hsl(${color.hue}, 70%, 97%)`, // Clean, bright background
    text: `hsl(${color.hue}, 80%, 25%)`, // Strong, readable text
    border: `hsl(${color.hue}, 60%, 88%)`, // Soft but defined border
    accent: `hsl(${color.hue}, 70%, 50%)`, // Optional accent color
    name: color.name,
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

export const getTestimonialSourceIcon = (source: string) => {
  switch (source) {
    case "student":
      return "🎓";
    case "parent":
      return "👨‍👩‍👧‍👦";
    case "teacher":
      return "👩‍🏫";
    case "partner":
      return "🤝";
    default:
      return "👤";
  }
};
export const getTestimonialSourceBadgeColor = (source: string) => {
  switch (source) {
    case "student":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "parent":
      return "bg-green-100 text-green-800 border-green-300";
    case "teacher":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "partner":
      return "bg-orange-100 text-orange-800 border-orange-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export function calculateEndDate(startDate: Date, duration: string): Date {
  if (!duration) {
    // fallback default: 2 weeks
    return addWeeks(startDate, 2);
  }

  const regex = /^(\d+)\s*(day|days|week|weeks|month|months)$/i;
  const match = duration.match(regex);

  if (!match) {
    return addWeeks(startDate, 2);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "day":
    case "days":
      return addDays(startDate, value);
    case "week":
    case "weeks":
      return addWeeks(startDate, value);
    case "month":
    case "months":
      return addMonths(startDate, value);
    default:
      return addWeeks(startDate, 2); // fallback
  }
}

export const getCourseCategoryConfig = (category: string) => {
  switch (category) {
    case "IELTS":
      return {
        color: "bg-blue-50 text-blue-700 border-blue-200",
        darkColor:
          "dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700",
        icon: Target,
        iconColor: "text-blue-600",
      };
    case "TOEFL":
      return {
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        darkColor:
          "dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700",
        icon: BookOpen,
        iconColor: "text-emerald-600",
      };
    case "TOEIC":
      return {
        color: "bg-violet-50 text-violet-700 border-violet-200",
        darkColor:
          "dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-700",
        icon: Briefcase,
        iconColor: "text-violet-600",
      };
    case "Pronounciation":
      return {
        color: "bg-rose-50 text-rose-700 border-rose-200",
        darkColor:
          "dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-700",
        icon: MessageCircle,
        iconColor: "text-rose-600",
      };
    default:
      return {
        color: "bg-gray-50 text-gray-700 border-gray-200",
        darkColor:
          "dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-700",
        icon: BookOpen,
        iconColor: "text-gray-600",
      };
  }
};

export const getCourseLevelConfig = (level: string) => {
  switch (level.toLowerCase()) {
    case "intro":
      return {
        color: "bg-green-50 text-green-700 border-green-200",
        darkColor:
          "dark:bg-green-900/20 dark:text-green-300 dark:border-green-700",
        icon: Sprout,
        iconColor: "text-green-600",
        priority: 1,
        description: "Beginner friendly",
      };
    case "drill class":
      return {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        darkColor:
          "dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700",
        icon: Zap,
        iconColor: "text-amber-600",
        priority: 2,
        description: "Intensive practice",
      };
    case "next step":
      return {
        color: "bg-orange-50 text-orange-700 border-orange-200",
        darkColor:
          "dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700",
        icon: Rocket,
        iconColor: "text-orange-600",
        priority: 3,
        description: "Level progression",
      };
    case "advanced":
      return {
        color: "bg-red-50 text-red-700 border-red-200",
        darkColor: "dark:bg-red-900/20 dark:text-red-300 dark:border-red-700",
        icon: Trophy,
        iconColor: "text-red-600",
        priority: 4,
        description: "Expert level",
      };
    case "mock test":
      return {
        color: "bg-purple-50 text-purple-700 border-purple-200",
        darkColor:
          "dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700",
        icon: FileCheck,
        iconColor: "text-purple-600",
        priority: 5,
        description: "Test simulation",
      };
    default:
      return {
        color: "bg-gray-50 text-gray-700 border-gray-200",
        darkColor:
          "dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-700",
        icon: BookOpen,
        iconColor: "text-gray-600",
        priority: 0,
        description: "Standard",
      };
  }
};

export const splitName = (name?: string | null) => {
  if (!name) {
    return { firstName: "", lastName: "" };
  }

  const parts = name.trim().split(/\s+/);

  return {
    firstName: parts[0] ?? "",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
};

export function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  return `${name.slice(0, 2)}***@${domain}`;
}

export const formatRoleName = (roleName: string): string => {
  return roleName
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getRoleLabel = (role: Role | null) =>
  role ? (ROLE_CONFIG[role]?.label ?? formatRoleName(role)) : "Personal";

export const getRoleBadgeClass = (role: Role | null) => {
  if (!role) {
    return "bg-muted text-muted-foreground border border-border";
  }

  return ROLE_CONFIG[role]?.color ?? "bg-muted text-muted-foreground";
};

export function handleMutationError(
  error: unknown,
  fallback = "Something went wrong"
) {
  console.error(error);

  if (typeof error === "object" && error !== null) {
    if ("message" in error && typeof error.message === "string") {
      toast.error(error.message);
      return;
    }
  }

  toast.error(fallback);
}

type ToastMutationOptions<T> = {
  action: () => Promise<T>;
  loading: string;
  success: string | ((result: T) => string);
  error?: string;
  onSuccess?: (result: T) => void;
};

export async function toastMutation<T>({
  action,
  loading,
  success,
  error,
  onSuccess,
}: ToastMutationOptions<T>) {
  const toastId = toast.loading(loading);

  try {
    const result = await action();

    toast.success(typeof success === "function" ? success(result) : success, {
      id: toastId,
    });

    onSuccess?.(result);
    return result;
  } catch (err) {
    toast.dismiss(toastId);
    handleMutationError(err, error);
    throw err;
  }
}

export function getActiveRoleFromPathname(pathname: string): Role | "personal" {
  const segments = pathname.split("/").filter(Boolean);

  // /dashboard → personal dashboard
  if (segments.length === 1 && segments[0] === "dashboard2") {
    return "personal";
  }

  // /dashboard/{role}
  if (segments[0] === "dashboard2" && segments[1]) {
    return segments[1] as Role;
  }

  return "personal";
}

export function resolveDashboardHref(
  routeUrl: string,
  activeRole: Role | "personal",
  options?: {
    roleScoped?: boolean; // default false
  }
) {
  const roleScoped = options?.roleScoped ?? false;

  // Global dashboard routes
  if (!roleScoped) {
    return routeUrl;
  }

  // Role-based dashboard routes
  if (activeRole === "personal") {
    return "/dashboard";
  }

  return `/dashboard/${activeRole}`;
}

