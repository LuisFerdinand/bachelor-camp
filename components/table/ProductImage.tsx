import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// ProductImage component (you can replace with your existing one)
interface ProductImageProps {
  imageUrl?: string | null;
  title: string;
  className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imageUrl,
  title,
  className,
}) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200",
      "flex items-center justify-center",
      className
    )}
  >
    {imageUrl ? (
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    ) : (
      <div className="text-gray-400 text-xs font-medium text-center px-1">
        {title
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 3)
          .toUpperCase()}
      </div>
    )}
  </div>
);

// Main ProductCard component
interface ProductCardProps {
  imageUrl?: string | null;
  title: string;
  description?: string | null;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  };
  metadata?: string;
  imageSize?: "sm" | "md" | "lg" | "xl";
  layout?: "horizontal" | "vertical";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  description,
  badge,
  metadata,
  imageSize = "md",
  layout = "horizontal",
  className,
  titleClassName,
  descriptionClassName,
  onClick,
  children,
}) => {
  const imageSizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-24 h-24",
  };

  const containerClasses = cn(
    "group relative",
    layout === "horizontal"
      ? "flex items-start gap-3 max-w-full"
      : "flex flex-col gap-2 max-w-[200px]",
    onClick &&
      "cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-sm",
    className
  );

  const contentClasses = cn(
    "flex flex-col overflow-hidden gap-1",
    layout === "horizontal" ? "flex-1 min-w-0" : "w-full"
  );

  return (
    <div className={containerClasses} onClick={onClick}>
      {/* Image Section */}
      <div
        className={cn(
          "relative shrink-0 transition-transform duration-200",
          onClick && "group-hover:scale-105",
          layout === "horizontal"
            ? imageSizes[imageSize]
            : "w-full aspect-square"
        )}
      >
        <ProductImage
          imageUrl={imageUrl}
          title={title}
          className="w-full h-full"
        />

        {/* Badge overlay on image */}
        {badge && layout === "vertical" && (
          <div className="absolute top-2 left-2">
            <Badge
              variant={badge.variant || "default"}
              className={cn("text-xs", badge.className)}
            >
              {badge.text}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={contentClasses}>
        {/* Header with title and badge (horizontal layout) */}
        <div className="flex items-start justify-between gap-2 min-w-0">
          <h3
            className={cn(
              "font-medium line-clamp-2 transition-colors duration-200",
              layout === "horizontal" ? "text-sm" : "text-base",
              onClick && "group-hover:text-primary",
              titleClassName
            )}
          >
            {title}
          </h3>

          {badge && layout === "horizontal" && (
            <Badge
              variant={badge.variant || "secondary"}
              className={cn("text-xs shrink-0", badge.className)}
            >
              {badge.text}
            </Badge>
          )}
        </div>

        {/* Description */}
        {description && (
          <p
            className={cn(
              "text-muted-foreground line-clamp-2 transition-colors duration-200",
              layout === "horizontal" ? "text-xs" : "text-sm",
              onClick && "group-hover:text-muted-foreground/80",
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}

        {/* Metadata */}
        {metadata && (
          <span className="text-xs text-muted-foreground/70 font-mono">
            {metadata}
          </span>
        )}

        {/* Custom children content */}
        {children && (
          <div className="mt-2 flex flex-wrap gap-1">{children}</div>
        )}
      </div>
    </div>
  );
};

// Variants for common use cases
const CourseCard: React.FC<
  Omit<ProductCardProps, "badge"> & {
    level?: string;
    category?: string;
    isActive?: boolean;
    isFeatured?: boolean;
  }
> = ({ level, category, isActive, isFeatured, ...props }) => (
  <ProductCard
    {...props}
    badge={
      isFeatured
        ? {
            text: "Featured",
            variant: "default",
            className: "bg-yellow-100 text-yellow-700 border-yellow-200",
          }
        : isActive === false
          ? { text: "Inactive", variant: "destructive" }
          : undefined
    }
  >
    {(level || category) && (
      <>
        {category && (
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        )}
        {level && (
          <Badge variant="secondary" className="text-xs">
            {level}
          </Badge>
        )}
      </>
    )}
  </ProductCard>
);

export { ProductCard, CourseCard };
export type { ProductCardProps };
