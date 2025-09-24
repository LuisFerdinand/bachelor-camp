import React from "react";
import { cn } from "@/lib/utils";
import {
  LucideIcon,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck,
  FileText,
  Eye,
  Archive,
} from "lucide-react";

// Helper function to capitalize first letter
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Default status configurations with icons
const DEFAULT_STATUS_CONFIG = {
  active: {
    colors: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500",
    icon: CheckCircle2,
  },
  inactive: {
    colors: "bg-red-100 text-red-700 border-red-200",
    dotColor: "bg-red-500",
    icon: XCircle,
  },
  pending: {
    colors: "bg-amber-100 text-amber-700 border-amber-200",
    dotColor: "bg-amber-500",
    icon: Clock,
  },
  completed: {
    colors: "bg-blue-100 text-blue-700 border-blue-200",
    dotColor: "bg-blue-500",
    icon: CheckCircle2,
  },
  draft: {
    colors: "bg-gray-100 text-gray-700 border-gray-200",
    dotColor: "bg-gray-500",
    icon: FileText,
  },
  published: {
    colors: "bg-green-100 text-green-700 border-green-200",
    dotColor: "bg-green-500",
    icon: Eye,
  },
  archived: {
    colors: "bg-slate-100 text-slate-700 border-slate-200",
    dotColor: "bg-slate-500",
    icon: Archive,
  },
} as const;

interface StatusConfig {
  colors: string;
  dotColor: string;
  icon?: LucideIcon;
}

interface StatusBadgeProps {
  status: string;
  statusConfig?: Record<string, StatusConfig>;
  showDot?: boolean;
  showIcon?: boolean;
  overrideIcon?: LucideIcon;
  className?: string;
  size?: "sm" | "md";
  variant?: "default" | "outline";
}

export function StatusBadge({
  status,
  statusConfig = DEFAULT_STATUS_CONFIG,
  showDot = true,
  showIcon = false,
  overrideIcon,
  className,
  size = "sm",
  variant = "default",
}: StatusBadgeProps) {
  if (!status) {
    return (
      <span className={cn("text-xs text-muted-foreground", className)}>
        No status
      </span>
    );
  }

  const normalizedStatus = status.toLowerCase();
  const config = statusConfig[normalizedStatus] || {
    colors: "bg-gray-100 text-gray-700 border-gray-200",
    dotColor: "bg-gray-500",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  const variantClasses = {
    default: config.colors,
    outline: `border-2 ${config.colors.replace("bg-", "border-").replace(/bg-\w+-100/, "bg-transparent")}`,
  };

  const IconComponent = overrideIcon || config.icon;
  const shouldShowIcon = showIcon && IconComponent;
  const shouldShowDot = showDot && !shouldShowIcon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border transition-all duration-200",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {shouldShowDot && (
        <span
          className={cn("w-2 h-2 rounded-full flex-shrink-0", config.dotColor)}
        />
      )}

      {shouldShowIcon && (
        <IconComponent
          className={cn("flex-shrink-0", size === "sm" ? "w-3 h-3" : "w-4 h-4")}
        />
      )}

      <span className="truncate leading-none">{capitalize(status)}</span>
    </span>
  );
}
