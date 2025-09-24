import { cn, formatOrdinal } from "@/lib/utils";

interface OrderBadgeProps {
  order: number;
  className?: string;
  size?: "sm" | "md";
  showBadgeStyle?: boolean;
}

export function OrderBadge({
  order,
  className,
  size = "sm",
  showBadgeStyle = false,
}: OrderBadgeProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
  };
  if (!order || order <= 0) {
    return (
      <span
        className={cn(
          "text-muted-foreground  font-medium flex items-center justify-center",
          sizeClasses[size],
          className
        )}
      >
        —
      </span>
    );
  }

  if (showBadgeStyle) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-mono font-medium min-w-[2.5rem] h-6",
          sizeClasses[size],
          className
        )}
      >
        {formatOrdinal(order)}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "text-muted-foreground  font-medium flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      {formatOrdinal(order)}
    </span>
  );
}
