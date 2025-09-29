import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

// Type definition
interface YearDisplayProps {
  year: number | string | Date;
  variant?: "default" | "badge" | "minimal" | "highlight" | "with-icon";
  className?: string;
  showCurrent?: boolean; // Highlight current year
}

// Helper function to extract year from various formats
const extractYear = (year: number | string | Date): number | null => {
  if (!year) return null;

  if (typeof year === "number") return year;
  if (typeof year === "string") {
    const parsed = parseInt(year, 10);
    return isNaN(parsed) ? null : parsed;
  }
  if (year instanceof Date) return year.getFullYear();

  return null;
};

// Main component
const YearDisplay: React.FC<YearDisplayProps> = ({
  year,
  variant = "default",
  className,
  showCurrent = false,
}) => {
  const yearValue = extractYear(year);
  const currentYear = new Date().getFullYear();
  const isCurrent = showCurrent && yearValue === currentYear;

  if (!yearValue) {
    return (
      <span className={cn("text-xs text-muted-foreground italic", className)}>
        No year
      </span>
    );
  }

  // Badge variant
  if (variant === "badge") {
    return (
      <span
        className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200",
          isCurrent
            ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
          className
        )}
      >
        {yearValue}
      </span>
    );
  }

  // With icon variant
  if (variant === "with-icon") {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <Calendar className="w-3 h-3 text-muted-foreground" />
        <span
          className={cn(
            "font-medium text-sm transition-colors duration-200",
            isCurrent ? "text-blue-600" : "text-foreground"
          )}
        >
          {yearValue}
        </span>
      </div>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <span
        className={cn(
          "text-xs font-mono text-muted-foreground",
          isCurrent && "text-blue-600 font-semibold",
          className
        )}
      >
        '{String(yearValue).slice(-2)}
      </span>
    );
  }

  // Highlight variant
  if (variant === "highlight") {
    return (
      <span
        className={cn(
          "relative font-semibold text-sm transition-all duration-200",
          isCurrent
            ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded-full"
            : "text-foreground hover:text-blue-600",
          className
        )}
      >
        {yearValue}
      </span>
    );
  }

  // Default variant (improved)
  return (
    <span
      className={cn(
        "font-medium text-sm transition-colors duration-200",
        isCurrent
          ? "text-blue-600 font-semibold"
          : "text-foreground hover:text-muted-foreground",
        className
      )}
    >
      {yearValue}
    </span>
  );
};

// Quick table cell component
const YearTableCell = ({
  row,
  variant = "badge",
}: {
  row: any;
  variant?: YearDisplayProps["variant"];
}) => {
  return (
    <YearDisplay
      year={row.original.year}
      variant={"highlight"}
      showCurrent={true}
    />
  );
};

// Multiple year variants for comparison
const YearShowcase = ({ year }: { year: number | string | Date }) => {
  return (
    <div className="space-y-2 p-4 border rounded-lg">
      <div className="text-sm font-medium text-muted-foreground mb-3">
        Year Display Variants:
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-16">Default:</span>
        <YearDisplay year={year} variant="default" showCurrent />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-16">Badge:</span>
        <YearDisplay year={year} variant="badge" showCurrent />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-16">Icon:</span>
        <YearDisplay year={year} variant="with-icon" showCurrent />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-16">Minimal:</span>
        <YearDisplay year={year} variant="minimal" showCurrent />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-16">Highlight:</span>
        <YearDisplay year={year} variant="highlight" showCurrent />
      </div>
    </div>
  );
};

export { YearDisplay, YearTableCell, YearShowcase };
export type { YearDisplayProps };
