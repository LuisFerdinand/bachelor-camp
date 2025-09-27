import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Archive,
  FileText,
  Zap,
  Pause,
  Play,
  Settings,
  Shield,
  Star,
  Heart,
  Trash2,
} from "lucide-react";
import { Badge } from "../ui/badge";

// ===========================================
// 1. BOOLEAN STATUS BADGE COMPONENT
// ===========================================

interface BooleanStatusBadgeProps {
  status: string | boolean;
  variant?: "default" | "dot" | "icon" | "minimal" | "outlined";
  size?: "sm" | "md" | "lg";
  type?:
    | "visibility"
    | "active"
    | "published"
    | "featured"
    | "enabled"
    | "verified";
  showIcon?: boolean;
  className?: string;
}

// Boolean status configurations
const booleanConfigs = {
  visibility: {
    labels: { true: "Visible", false: "Hidden" },
    colors: {
      true: "bg-emerald-100 text-emerald-700 border-emerald-200",
      false: "bg-red-100 text-red-700 border-red-200",
    },
    icons: { true: Eye, false: EyeOff },
  },
  active: {
    labels: { true: "Active", false: "Inactive" },
    colors: {
      true: "bg-emerald-100 text-emerald-700 border-emerald-200",
      false: "bg-red-100 text-red-700 border-red-200",
    },
    icons: { true: CheckCircle, false: XCircle },
  },
  published: {
    labels: { true: "Published", false: "Draft" },
    colors: {
      true: "bg-blue-100 text-blue-700 border-blue-200",
      false: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    icons: { true: CheckCircle, false: Clock },
  },
  featured: {
    labels: { true: "Featured", false: "Regular" },
    colors: {
      true: "bg-yellow-100 text-yellow-700 border-yellow-200",
      false: "bg-gray-100 text-gray-600 border-gray-200",
    },
    icons: { true: Star, false: AlertCircle },
  },
  enabled: {
    labels: { true: "Enabled", false: "Disabled" },
    colors: {
      true: "bg-emerald-100 text-emerald-700 border-emerald-200",
      false: "bg-red-100 text-red-700 border-red-200",
    },
    icons: { true: Zap, false: Pause },
  },
  verified: {
    labels: { true: "Verified", false: "Unverified" },
    colors: {
      true: "bg-blue-100 text-blue-700 border-blue-200",
      false: "bg-orange-100 text-orange-700 border-orange-200",
    },
    icons: { true: Shield, false: AlertCircle },
  },
};

const BooleanStatusBadge: React.FC<BooleanStatusBadgeProps> = ({
  status,
  variant = "default",
  size = "md",
  type = "active",
  showIcon = false,
  className,
}) => {
  const isTrue = status === "true" || status === true;
  const config = booleanConfigs[type];
  const currentLabel = isTrue ? config.labels.true : config.labels.false;
  const currentColor = isTrue ? config.colors.true : config.colors.false;
  const IconComponent = isTrue ? config.icons.true : config.icons.false;

  const sizes = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-0.5 text-xs",
    lg: "px-2.5 py-1 text-sm",
  };

  const iconSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
  };

  if (variant === "dot") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-200",
            isTrue ? "bg-emerald-1000" : "bg-red-1000"
          )}
        />
        <span
          className={cn(
            "font-medium",
            size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs"
          )}
        >
          {currentLabel}
        </span>
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <div className={cn("inline-flex items-center gap-1.5", className)}>
        <IconComponent
          className={cn(
            iconSizes[size],
            isTrue ? "text-emerald-600" : "text-red-600"
          )}
        />
        <span
          className={cn(
            "font-medium",
            size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs"
          )}
        >
          {currentLabel}
        </span>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <span
        className={cn(
          "font-medium",
          size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs",
          isTrue ? "text-emerald-600" : "text-red-600",
          className
        )}
      >
        {currentLabel}
      </span>
    );
  }

  return (
    <Badge
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-sm",
        sizes[size],
        currentColor,
        className
      )}
    >
      {showIcon && <IconComponent className={iconSizes[size]} />}

      <p className="leading-none">{currentLabel}</p>
    </Badge>
  );
};

// ===========================================
// 2. MULTI-STATE STATUS BADGE COMPONENT
// ===========================================

interface MultiStateStatusBadgeProps {
  status: string;
  variant?: "default" | "dot" | "icon" | "minimal" | "outlined";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
  customConfig?: StatusConfig;
}

interface StatusConfig {
  [key: string]: {
    label: string;
    color: string;
    icon?: any;
    priority?: number; // For sorting
  };
}

// Multi-state status configurations
const multiStateConfigs: { [key: string]: StatusConfig } = {
  // Content lifecycle
  content: {
    draft: {
      label: "Draft",
      color: "bg-gray-100 text-gray-700 border-gray-200",
      icon: FileText,
      priority: 1,
    },

    review: {
      label: "In Review",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      icon: Clock,
      priority: 2,
    },
    published: {
      label: "Published",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      icon: CheckCircle,
      priority: 3,
    },
    archived: {
      label: "Archived",
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: Archive,
      priority: 4,
    },
  },

  // General status
  general: {
    active: {
      label: "Active",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      icon: CheckCircle,
      priority: 1,
    },
    inactive: {
      label: "Inactive",
      color: "bg-gray-100 text-gray-700 border-gray-200",
      icon: Pause,
      priority: 2,
    },
    pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      icon: Clock,
      priority: 3,
    },
    archived: {
      label: "Archived",
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: Archive,
      priority: 4,
    },
    deleted: {
      label: "Deleted",
      color: "bg-red-100 text-red-700 border-red-200",
      icon: Trash2,
      priority: 5,
    },
  },

  // User status
  user: {
    active: {
      label: "Active",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      icon: CheckCircle,
      priority: 1,
    },
    pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      icon: Clock,
      priority: 2,
    },
    suspended: {
      label: "Suspended",
      color: "bg-orange-100 text-orange-700 border-orange-200",
      icon: AlertCircle,
      priority: 3,
    },
    banned: {
      label: "Banned",
      color: "bg-red-100 text-red-700 border-red-200",
      icon: XCircle,
      priority: 4,
    },
  },

  // Order status
  order: {
    pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      icon: Clock,
      priority: 1,
    },
    processing: {
      label: "Processing",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: Settings,
      priority: 2,
    },
    shipped: {
      label: "Shipped",
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: Zap,
      priority: 3,
    },
    delivered: {
      label: "Delivered",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      icon: CheckCircle,
      priority: 4,
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-700 border-red-200",
      icon: XCircle,
      priority: 5,
    },
  },

  // Priority levels
  priority: {
    low: {
      label: "Low",
      color: "bg-gray-100 text-gray-700 border-gray-200",
      icon: AlertCircle,
      priority: 1,
    },
    medium: {
      label: "Medium",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      icon: AlertCircle,
      priority: 2,
    },
    high: {
      label: "High",
      color: "bg-orange-100 text-orange-700 border-orange-200",
      icon: AlertCircle,
      priority: 3,
    },
    urgent: {
      label: "Urgent",
      color: "bg-red-100 text-red-700 border-red-200",
      icon: AlertCircle,
      priority: 4,
    },
  },
};

// Auto-detect config type based on status value
const detectConfigType = (status: string): StatusConfig => {
  const statusLower = status.toLowerCase();

  // Check each config type
  for (const [configKey, config] of Object.entries(multiStateConfigs)) {
    if (config[statusLower]) {
      return config;
    }
  }

  // Fallback config
  return {
    [statusLower]: {
      label: status.charAt(0).toUpperCase() + status.slice(1),
      color: "bg-gray-100 text-gray-700 border-gray-200",
      icon: AlertCircle,
    },
  };
};

const MultiStateStatusBadge: React.FC<MultiStateStatusBadgeProps> = ({
  status,
  variant = "default",
  size = "md",
  showIcon = false,
  className,
  customConfig,
}) => {
  const statusLower = status.toLowerCase();
  const config = customConfig || detectConfigType(status);
  const statusConfig = config[statusLower];

  if (!statusConfig) {
    return (
      <span className="text-xs text-muted-foreground italic">
        Unknown status
      </span>
    );
  }

  const { label, color, icon: IconComponent } = statusConfig;

  const sizes = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-0.5 text-xs",
    lg: "px-2.5 py-1 text-sm",
  };

  const iconSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
  };

  if (variant === "dot") {
    const dotColor = color.includes("emerald")
      ? "bg-emerald-1000"
      : color.includes("red")
        ? "bg-red-1000"
        : color.includes("yellow")
          ? "bg-yellow-1000"
          : color.includes("blue")
            ? "bg-blue-1000"
            : color.includes("purple")
              ? "bg-purple-1000"
              : color.includes("orange")
                ? "bg-orange-1000"
                : "bg-gray-1000";

    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className={cn("w-2 h-2 rounded-full", dotColor)} />
        <span
          className={cn(
            "font-medium",
            size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs"
          )}
        >
          <p className="leading-none">{label}</p>
        </span>
      </div>
    );
  }

  if (variant === "icon" && IconComponent) {
    return (
      <div className={cn("inline-flex items-center gap-1.5", className)}>
        <IconComponent className={cn(iconSizes[size], "text-current")} />
        <span
          className={cn(
            "font-medium",
            size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs"
          )}
        >
          {label}
        </span>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <span
        className={cn(
          "font-medium",
          size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs",
          color.split(" ").find((c) => c.startsWith("text-")),
          className
        )}
      >
        {label}
      </span>
    );
  }

  if (variant === "outlined") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium border-2 transition-all duration-200 hover:scale-105",
          sizes[size],
          color.replace("bg-", "border-").replace("text-", "text-"),
          "bg-transparent hover:bg-opacity-10",
          className
        )}
      >
        {showIcon && IconComponent && (
          <IconComponent className={iconSizes[size]} />
        )}
        {label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-sm",
        sizes[size],
        color,
        className
      )}
    >
      {showIcon && IconComponent && (
        <IconComponent className={iconSizes[size]} />
      )}
      {label}
    </span>
  );
};

// ===========================================
// 3. CONVENIENCE COMPONENTS
// ===========================================

// Boolean convenience components
const VisibilityBadge = ({
  isShown,
  ...props
}: { isShown: string | boolean } & Omit<
  BooleanStatusBadgeProps,
  "status" | "type"
>) => <BooleanStatusBadge status={isShown} type="visibility" {...props} />;

const ActiveBadge = ({
  isActive,
  ...props
}: { isActive: string | boolean } & Omit<
  BooleanStatusBadgeProps,
  "status" | "type"
>) => <BooleanStatusBadge status={isActive} type="active" {...props} />;

// Multi-state convenience components
const ContentStatusBadge = ({
  status,
  ...props
}: { status: string } & Omit<
  MultiStateStatusBadgeProps,
  "status" | "customConfig"
>) => (
  <MultiStateStatusBadge
    status={status}
    customConfig={multiStateConfigs.content}
    {...props}
  />
);

const UserStatusBadge = ({
  status,
  ...props
}: { status: string } & Omit<
  MultiStateStatusBadgeProps,
  "status" | "customConfig"
>) => (
  <MultiStateStatusBadge
    status={status}
    customConfig={multiStateConfigs.user}
    {...props}
  />
);

const OrderStatusBadge = ({
  status,
  ...props
}: { status: string } & Omit<
  MultiStateStatusBadgeProps,
  "status" | "customConfig"
>) => (
  <MultiStateStatusBadge
    status={status}
    customConfig={multiStateConfigs.order}
    {...props}
  />
);

const PriorityBadge = ({
  status,
  ...props
}: { status: string } & Omit<
  MultiStateStatusBadgeProps,
  "status" | "customConfig"
>) => (
  <MultiStateStatusBadge
    status={status}
    customConfig={multiStateConfigs.priority}
    {...props}
  />
);

// ===========================================
// 4. SHOWCASE COMPONENT
// ===========================================

const StatusBadgeShowcase = () => {
  return (
    <div className="space-y-6 p-4 border rounded-lg max-w-4xl">
      <div className="text-lg font-semibold">Status Badge Components</div>

      {/* Boolean Status Badges */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-muted-foreground">
          Boolean Status Badges:
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-medium">Active/Inactive:</div>
            <div className="flex gap-2">
              <ActiveBadge isActive={true} showIcon />
              <ActiveBadge isActive={false} showIcon />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium">Visibility:</div>
            <div className="flex gap-2">
              <VisibilityBadge isShown={true} variant="dot" />
              <VisibilityBadge isShown={false} variant="dot" />
            </div>
          </div>
        </div>
      </div>

      {/* Multi-State Status Badges */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-muted-foreground">
          Multi-State Status Badges:
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-xs font-medium mb-2">Content Status:</div>
            <div className="flex gap-2 flex-wrap">
              <ContentStatusBadge status="draft" showIcon />
              <ContentStatusBadge status="review" showIcon />
              <ContentStatusBadge status="published" showIcon />
              <ContentStatusBadge status="archived" showIcon />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium mb-2">User Status:</div>
            <div className="flex gap-2 flex-wrap">
              <UserStatusBadge status="active" variant="dot" />
              <UserStatusBadge status="pending" variant="dot" />
              <UserStatusBadge status="suspended" variant="dot" />
              <UserStatusBadge status="banned" variant="dot" />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium mb-2">Priority Levels:</div>
            <div className="flex gap-2 flex-wrap">
              <PriorityBadge status="low" variant="outlined" />
              <PriorityBadge status="medium" variant="outlined" />
              <PriorityBadge status="high" variant="outlined" />
              <PriorityBadge status="urgent" variant="outlined" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {
  BooleanStatusBadge,
  MultiStateStatusBadge,
  VisibilityBadge,
  ActiveBadge,
  ContentStatusBadge,
  UserStatusBadge,
  OrderStatusBadge,
  PriorityBadge,
  StatusBadgeShowcase,
};

export type {
  BooleanStatusBadgeProps,
  MultiStateStatusBadgeProps,
  StatusConfig,
};
