import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveStatusBadgeProps {
  isActive: string | boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  className?: string;
}

export function ActiveStatusBadge({
  isActive,
  activeLabel = "Active",
  inactiveLabel = "Inactive",
  className,
}: ActiveStatusBadgeProps) {
  const active =
    typeof isActive === "string" ? isActive === "true" : Boolean(isActive);

  return (
    <Badge
      variant={active ? "default" : "secondary"}
      className={cn(
        "text-xs font-medium",
        active
          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
          : "bg-red-100 text-red-700 border-red-200",
        className
      )}
    >
      {active ? (
        <CheckCircle2 className="w-3 h-3 mr-1" />
      ) : (
        <XCircle className="w-3 h-3 mr-1" />
      )}
      <p className="leading-none">{active ? activeLabel : inactiveLabel}</p>
    </Badge>
  );
}
