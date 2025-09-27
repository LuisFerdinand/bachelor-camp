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
        -
      </span>
    );
  }

  if (showBadgeStyle) {
    return (
      <div className="flex justify-center">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-700 border border-slate-300  font-medium px-2 h-6",
            sizeClasses[size],
            className
          )}
        >
          {formatOrdinal(order)}
        </span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        "text-muted-foreground font-medium flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      {formatOrdinal(order)}
    </span>
  );
}
