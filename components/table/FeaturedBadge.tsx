import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedBadgeProps {
  isFeatured: string | boolean;
  showIcon?: boolean;
  className?: string;
}

export function FeaturedBadge({
  isFeatured,
  showIcon = true,
  className,
}: FeaturedBadgeProps) {
  // Handle both string and boolean values
  const featured =
    typeof isFeatured === "string"
      ? isFeatured === "true"
      : Boolean(isFeatured);

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs px-2 py-1 rounded-full font-medium",
        featured
          ? "bg-amber-100 text-amber-700 border border-amber-200"
          : "bg-neutral-100 text-neutral-600 border border-neutral-200",
        className
      )}
    >
      {featured && showIcon && <Star className="w-3 h-3 mr-1 fill-current" />}
      <p className="leading-none">{featured ? "Featured" : "No"}</p>
    </span>
  );
}
