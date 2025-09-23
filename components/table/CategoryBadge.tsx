import { capitalize, cn, stringToColor } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
  size?: "sm" | "md";
  showDot?: boolean;
}

export function CategoryBadge({
  category,
  className,
  size = "sm",
  showDot = true,
}: CategoryBadgeProps) {
  if (!category) {
    return (
      <span className={cn("text-xs text-neutral-400", className)}>
        No category
      </span>
    );
  }

  const colors = stringToColor(category);

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3 py-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium transition-all duration-200 hover:shadow-sm",
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {showDot && (
        <span
          className="w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0"
          style={{ backgroundColor: colors.text }}
        />
      )}
      <span className="truncate leading-none">{capitalize(category)}</span>
    </span>
  );
}
