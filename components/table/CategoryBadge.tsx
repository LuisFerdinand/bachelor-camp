import React from "react";
import { cn, stringToColor } from "@/lib/utils";
import {
  Home,
  Tent,
  BookOpen,
  FileText,
  Info,
  Rss,
  Mail,
  Star,
  Heart,
  Settings,
  Shield,
  Zap,
  Globe,
  Camera,
  Music,
  Gamepad2,
  Code,
  Palette,
  ShoppingCart,
  Users,
  Calendar,
  Map,
  Phone,
  Coffee,
  Briefcase,
  GraduationCap,
  Car,
  Plane,
  Building,
  Factory,
  Truck,
  Package,
  Tag,
  LucideIcon,
  Lightbulb,
  Building2,
  BedDouble,
  Monitor,
  Shuffle,
} from "lucide-react";

// Extended icon mapping with more categories
const defaultTypeIcons: Record<string, LucideIcon> = {
  // Navigation & Pages
  Home: Home,
  About: Info,
  Contact: Mail,
  Phone: Phone,
  Leadership: Users,
  Academic: Lightbulb,
  Building: Building2,
  RoomType: BedDouble,

  // Activities & Programs
  Camp: Tent,
  Programs: BookOpen,
  Events: Calendar,
  Activities: Star,

  // Content & Communication
  Blog: Rss,
  News: FileText,
  Tests: FileText,
  Articles: FileText,

  // Business & Commerce
  Business: Briefcase,
  Shopping: ShoppingCart,
  Services: Settings,
  Products: Package,

  // Technology & Creative
  Technology: Code,
  Design: Palette,
  Photography: Camera,
  Music: Music,
  Gaming: Gamepad2,

  // Education & Learning
  Education: GraduationCap,
  Courses: BookOpen,
  Training: Shield,

  // Travel & Location
  Travel: Plane,
  Transport: Car,
  Location: Map,

  // Social & Community
  Community: Users,
  Social: Heart,
  Support: Shield,

  // Industry & Work
  Industry: Factory,
  Office: Building,
  Logistics: Truck,

  // Lifestyle & Personal
  Lifestyle: Coffee,
  Personal: Star,
  Health: Heart,
  Fitness: Zap,

  // General
  General: Tag,
  Other: Info,
  Default: Globe,

  // Delivery Mode
  Online: Monitor,
  Offline: Building2,
  Hybrid: Shuffle,
};

// Color generation function (you can replace with your existing one)

// Category interface
interface Category {
  name: string;
  id?: string | number;
  slug?: string;
  count?: number;
  description?: string;
}

// Component props
interface CategoryBadgeProps {
  category: Category;
  variant?: "default" | "outline" | "soft" | "minimal" | "gradient";
  size?: "xs" | "sm" | "md" | "lg";
  showIcon?: boolean;
  showCount?: boolean;
  customIcons?: Record<string, LucideIcon>;
  colorVariant?: "light" | "dark";
  className?: string;
  onClick?: (category: Category) => void;
  interactive?: boolean;
}

interface CategoryBadgeListProps {
  categories: Category[];
  variant?: CategoryBadgeProps["variant"];
  size?: CategoryBadgeProps["size"];
  showIcon?: boolean;
  showCount?: boolean;
  customIcons?: Record<string, LucideIcon>;
  maxItems?: number;
  layout?: "horizontal" | "vertical" | "grid";
  colorVariant?: "light" | "dark";
  className?: string;
  onCategoryClick?: (category: Category) => void;
  interactive?: boolean;
}

// Single category badge component
const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  variant = "default",
  size = "md",
  showIcon = true,
  showCount = false,
  customIcons,
  colorVariant = "light",
  className,
  onClick,
  interactive = false,
}) => {
  const iconMap = { ...defaultTypeIcons, ...customIcons };
  const Icon = iconMap[category.name] || iconMap.Default || Info;
  const colors = stringToColor(category.name);

  // Size configurations
  const sizeConfigs = {
    xs: {
      container: "px-1.5 py-0.5 text-xs gap-1",
      icon: "w-2.5 h-2.5",
      text: "text-xs",
    },
    sm: {
      container: "px-2 py-0.5 text-xs gap-1",
      icon: "w-3 h-3",
      text: "text-xs",
    },
    md: {
      container: "px-2.5 py-1 text-sm gap-1.5",
      icon: "w-3.5 h-3.5",
      text: "text-sm",
    },
    lg: {
      container: "px-3 py-1.5 text-base gap-2",
      icon: "w-4 h-4",
      text: "text-base",
    },
  };

  const config = sizeConfigs[size];

  // Variant styles
  const getVariantStyles = () => {
    const baseStyles =
      "inline-flex items-center rounded-full font-medium transition-all duration-200";

    switch (variant) {
      case "outline":
        return cn(
          baseStyles,
          "bg-transparent border-2",
          interactive && "hover:scale-105 cursor-pointer hover:shadow-md"
        );

      case "soft":
        return cn(
          baseStyles,
          "border border-opacity-30",
          interactive && "hover:scale-105 cursor-pointer hover:shadow-sm"
        );

      case "minimal":
        return cn(
          baseStyles,
          "bg-transparent border-none",
          interactive && "hover:scale-105 cursor-pointer"
        );

      case "gradient":
        return cn(
          baseStyles,
          "bg-gradient-to-r border border-opacity-50",
          interactive && "hover:scale-105 cursor-pointer hover:shadow-lg"
        );

      default: // 'default'
        return cn(
          baseStyles,
          "border-2",
          interactive && "hover:scale-105 cursor-pointer hover:shadow-md"
        );
    }
  };

  // Style based on variant
  const getInlineStyles = () => {
    const base = {
      backgroundColor: colors.background,
      color: colors.text,
      borderColor: colors.border,
    };

    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          color: colors.background,
          borderColor: colors.background,
        };

      case "soft":
        return {
          backgroundColor: `${colors.background}15`, // 15% opacity
          color: colors.background,
          borderColor: `${colors.background}30`, // 30% opacity
        };

      case "minimal":
        return {
          backgroundColor: "transparent",
          color: colors.background,
          borderColor: "transparent",
        };

      case "gradient":
        return {
          background: `linear-gradient(135deg, ${colors.background}, ${colors.background}CC)`,
          color: colors.text,
          borderColor: colors.border,
        };

      default:
        return base;
    }
  };

  const handleClick = () => {
    if (onClick && interactive) {
      onClick(category);
    }
  };

  return (
    <span
      className={cn(
        getVariantStyles(),
        config.container,
        "truncate max-w-full",
        className
      )}
      style={getInlineStyles()}
      onClick={handleClick}
      title={category.description || category.name}
    >
      {showIcon && <Icon className={cn(config.icon, "shrink-0")} />}

      <p className={cn("leading-none truncate", config.text)}>
        {category.name}
      </p>

      {showCount && category.count !== undefined && (
        <span
          className={cn(
            "ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold",
            "bg-black bg-opacity-20"
          )}
        >
          {category.count}
        </span>
      )}
    </span>
  );
};

// Category badge list component
const CategoryBadgeList: React.FC<CategoryBadgeListProps> = ({
  categories,
  variant = "default",
  size = "md",
  showIcon = true,
  showCount = false,
  customIcons,
  maxItems,
  layout = "horizontal",
  colorVariant = "light",
  className,
  onCategoryClick,
  interactive = false,
}) => {
  const displayCategories = maxItems
    ? categories.slice(0, maxItems)
    : categories;

  const remainingCount =
    maxItems && categories.length > maxItems ? categories.length - maxItems : 0;

  // Layout configurations
  const layoutClasses = {
    horizontal: "flex items-center gap-1.5 flex-wrap",
    vertical: "flex flex-col gap-1.5",
    grid: "grid grid-cols-2 gap-1.5",
  };

  if (categories.length === 0) {
    return (
      <div className="text-xs text-muted-foreground italic">No categories</div>
    );
  }

  return (
    <div className={cn(layoutClasses[layout], className)}>
      {displayCategories.map((category, index) => (
        <CategoryBadge
          key={category.id || category.name || index}
          category={category}
          variant={variant}
          size={size}
          showIcon={showIcon}
          showCount={showCount}
          customIcons={customIcons}
          colorVariant={colorVariant}
          onClick={onCategoryClick}
          interactive={interactive}
        />
      ))}

      {remainingCount > 0 && (
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full",
            "bg-gray-100 text-gray-600 text-xs font-medium",
            size === "xs" && "px-1.5 py-0.5 text-xs",
            size === "lg" && "px-3 py-1 text-sm"
          )}
        >
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};

// Showcase component
const CategoryBadgeShowcase = () => {
  const sampleCategories: Category[] = [
    { name: "Home", count: 5 },
    { name: "Camp", count: 12 },
    { name: "Programs", count: 8 },
    { name: "Blog", count: 23 },
    { name: "Technology", count: 15 },
  ];

  return (
    <div className="space-y-6 p-4 border rounded-lg max-w-4xl">
      <div className="text-lg font-semibold">Category Badge Components</div>

      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium mb-2">Variants:</div>
          <div className="space-y-2">
            <CategoryBadgeList
              categories={sampleCategories}
              variant="default"
            />
            <CategoryBadgeList
              categories={sampleCategories}
              variant="outline"
            />
            <CategoryBadgeList categories={sampleCategories} variant="soft" />
            <CategoryBadgeList
              categories={sampleCategories}
              variant="minimal"
            />
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Sizes:</div>
          <div className="space-y-2">
            <CategoryBadgeList categories={sampleCategories} size="xs" />
            <CategoryBadgeList categories={sampleCategories} size="sm" />
            <CategoryBadgeList categories={sampleCategories} size="md" />
            <CategoryBadgeList categories={sampleCategories} size="lg" />
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">With Count:</div>
          <CategoryBadgeList
            categories={sampleCategories}
            showCount
            variant="soft"
          />
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Layout Options:</div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Horizontal:
              </div>
              <CategoryBadgeList
                categories={sampleCategories}
                layout="horizontal"
              />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Vertical:
              </div>
              <CategoryBadgeList
                categories={sampleCategories}
                layout="vertical"
                className="max-w-xs"
              />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Grid:</div>
              <CategoryBadgeList
                categories={sampleCategories}
                layout="grid"
                className="max-w-xs"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Max Items (3):</div>
          <CategoryBadgeList categories={sampleCategories} maxItems={3} />
        </div>
      </div>
    </div>
  );
};

export {
  CategoryBadge,
  CategoryBadgeList,
  CategoryBadgeShowcase,
  defaultTypeIcons,
};

export type { Category, CategoryBadgeProps, CategoryBadgeListProps };
