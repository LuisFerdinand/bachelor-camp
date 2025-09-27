import { cn } from "@/lib/utils";
import { Circle, CheckCircle, Star, Zap, Shield, Heart } from "lucide-react";

// Type definitions
interface Feature {
  text?: string;
  iconUrl?: string;
  isActive?: boolean;
  priority?: "high" | "medium" | "low";
}

interface FeatureListProps {
  features: Feature[];
  className?: string;
  variant?: "default" | "compact" | "cards" | "inline";
  showFallbackIcon?: boolean;
  maxItems?: number;
  name?: string;
}

// Fallback icon component
const FallbackIcon = ({
  priority,
  className,
}: {
  priority?: string;
  className?: string;
}) => {
  const iconProps = { className: cn("w-3 h-3", className) };

  switch (priority) {
    case "high":
      return (
        <Star
          {...iconProps}
          className={cn(iconProps.className, "text-yellow-500")}
        />
      );
    case "medium":
      return (
        <Zap
          {...iconProps}
          className={cn(iconProps.className, "text-blue-500")}
        />
      );
    case "low":
      return (
        <Circle
          {...iconProps}
          className={cn(iconProps.className, "text-gray-400")}
        />
      );
    default:
      return (
        <CheckCircle
          {...iconProps}
          className={cn(iconProps.className, "text-green-500")}
        />
      );
  }
};

// Main improved component
const FeatureList: React.FC<FeatureListProps> = ({
  features,
  className,
  variant = "default",
  showFallbackIcon = true,
  maxItems,
  name = "features",
}) => {
  // Filter and limit features
  const validFeatures = features
    .filter((f) => f.text?.trim())
    .slice(0, maxItems);

  if (validFeatures.length === 0) {
    return (
      <div className="text-xs text-muted-foreground italic">
        No features available
      </div>
    );
  }

  // Inline variant (comma-separated)
  if (variant === "inline") {
    return (
      <div className={cn("text-xs", className)}>
        {validFeatures.map((f, i) => (
          <span key={i}>
            {f.text}
            {i < validFeatures.length - 1 && ", "}
          </span>
        ))}
      </div>
    );
  }

  // Cards variant
  if (variant === "cards") {
    return (
      <div className={cn("grid grid-cols-1 gap-2", className)}>
        {validFeatures.map((f, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg border transition-all duration-200",
              "hover:bg-gray-50 hover:border-gray-300",
              f.isActive === false && "opacity-60 bg-gray-50"
            )}
          >
            <div className="shrink-0">
              {f.iconUrl ? (
                <img
                  src={f.iconUrl}
                  alt={`${f.text} icon`}
                  className="w-4 h-4 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : showFallbackIcon ? (
                <FallbackIcon priority={f.priority} className="text-gray-500" />
              ) : null}
            </div>
            <span className="text-xs leading-relaxed flex-1">{f.text}</span>
          </div>
        ))}
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={cn("space-y-1", className)}>
        {validFeatures.map((f, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-2 text-xs transition-opacity duration-200",
              f.isActive === false && "opacity-50"
            )}
          >
            <div className="shrink-0">
              {f.iconUrl ? (
                <img
                  src={f.iconUrl}
                  alt=""
                  className="w-3 h-3 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : showFallbackIcon ? (
                <FallbackIcon priority={f.priority} />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              )}
            </div>
            <span className="leading-tight truncate flex-1" title={f.text}>
              {f.text}
            </span>
          </div>
        ))}
        {maxItems && features.length > maxItems && (
          <div className="text-xs text-muted-foreground italic mt-1">
            +{features.length - maxItems} more {name}
          </div>
        )}
      </div>
    );
  }

  // Default variant (improved original)
  return (
    <div className={cn("space-y-1.5", className)}>
      {validFeatures.map((f, i) => (
        <div
          key={i}
          className={cn(
            "flex items-start gap-2 text-xs group transition-all duration-200",
            "hover:bg-gray-50/50 rounded px-1 py-0.5 -mx-1",
            f.isActive === false && "opacity-60"
          )}
        >
          <div className="shrink-0 mt-0.5">
            {f.iconUrl ? (
              <div className="relative">
                <img
                  src={f.iconUrl}
                  alt={`${f.text} feature icon`}
                  className="w-3 h-3 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    // Hide broken images and show fallback
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling;
                  }}
                />
                <div style={{ display: "none" }}>
                  {showFallbackIcon && <FallbackIcon priority={f.priority} />}
                </div>
              </div>
            ) : showFallbackIcon ? (
              <FallbackIcon priority={f.priority} />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60 mt-1" />
            )}
          </div>

          <span className="leading-relaxed flex-1 break-words">{f.text}</span>

          {f.priority && (
            <span
              className={cn(
                "text-xs px-1 py-0.5 rounded text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                f.priority === "high" && "bg-red-500",
                f.priority === "medium" && "bg-yellow-500",
                f.priority === "low" && "bg-gray-500"
              )}
            >
              {f.priority}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

// Usage in table cell
const FeatureTableCell = ({ row }: { row: any }) => {
  const features = row.original.features || [];

  return (
    <FeatureList
      features={features}
      variant="compact"
      maxItems={5}
      className="max-w-[200px]"
    />
  );
};

export { FeatureList, FeatureTableCell };
export type { Feature, FeatureListProps };
