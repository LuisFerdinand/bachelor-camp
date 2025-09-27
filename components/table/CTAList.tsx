import { cn } from "@/lib/utils";
import { ExternalLink, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Type definitions
interface CTA {
  ctaText?: string;
  ctaLink?: string;
  isShown: boolean;
}

interface CTAListProps {
  ctas: CTA[];
  className?: string;
  variant?: "default" | "compact" | "badges";
  showIcons?: boolean;
}

// Main improved component
const CTAList: React.FC<CTAListProps> = ({
  ctas,
  className,
  variant = "default",
  showIcons = true,
}) => {
  // Filter out empty CTAs
  const validCtas = ctas.filter((cta) => cta.ctaText?.trim());

  if (validCtas.length === 0) {
    return (
      <div className="text-xs text-muted-foreground italic">
        No CTAs available
      </div>
    );
  }

  // Badge variant
  if (variant === "badges") {
    return (
      <div className={cn("flex flex-wrap gap-1", className)}>
        {validCtas.map((cta, i) => (
          <Badge
            key={i}
            variant={cta.isShown ? "default" : "secondary"}
            className={cn(
              "text-xs transition-all duration-200",
              cta.isShown
                ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                : "bg-red-50 text-red-600 border-red-200"
            )}
          >
            {showIcons && (
              <span className="mr-1">
                {cta.isShown ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <EyeOff className="w-3 h-3" />
                )}
              </span>
            )}
            {cta.isShown && cta.ctaLink ? (
              <a
                href={cta.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {cta.ctaText}
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ) : (
              <span className={cn(cta.isShown ? "" : "line-through")}>
                {cta.ctaText}
              </span>
            )}
          </Badge>
        ))}
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={cn("space-y-1", className)}>
        {validCtas.map((cta, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            {showIcons && (
              <div
                className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  cta.isShown ? "bg-green-500" : "bg-red-500"
                )}
              />
            )}

            {cta.isShown && cta.ctaLink ? (
              <a
                href={cta.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-800 hover:text-primary hover:underline transition-colors duration-200 flex items-center gap-1 group"
                onClick={(e) => e.stopPropagation()}
              >
                {cta.ctaText}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            ) : (
              <span
                className={cn(
                  "transition-colors duration-200",
                  cta.isShown
                    ? "text-neutral-800"
                    : "text-neutral-400 line-through"
                )}
              >
                {cta.ctaText}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Default variant (improved version of your original)
  return (
    <div className={cn("flex flex-col", className)}>
      <ul className="space-y-1.5">
        {validCtas.map((cta, i) => (
          <li
            key={i}
            className={cn(
              "flex items-start gap-2 text-xs group",
              "transition-all duration-200 hover:bg-neutral-50/50 rounded px-1 py-0.5 -mx-1"
            )}
          >
            {/* Custom bullet point */}
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-colors duration-200",
                cta.isShown ? "bg-green-500" : "bg-red-500"
              )}
            />

            <div className="flex-1 min-w-0">
              {cta.isShown && cta.ctaLink ? (
                <a
                  href={cta.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 hover:text-primary hover:underline transition-colors duration-200 flex items-center gap-1 group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="break-words">{cta.ctaText}</span>
                  {showIcons && (
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200 shrink-0" />
                  )}
                </a>
              ) : (
                <span
                  className={cn(
                    "break-words transition-colors duration-200",
                    cta.isShown
                      ? "text-neutral-800"
                      : "text-neutral-400 line-through"
                  )}
                >
                  {cta.ctaText}
                </span>
              )}

              {/* Status indicator */}
              {showIcons && (
                <div className="flex items-center gap-1 mt-1 opacity-60">
                  {cta.isShown ? (
                    <Eye className="w-3 h-3 text-green-600" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-red-600" />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {cta.isShown ? "Active" : "Hidden"}
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Usage in your table cell
const CTATableCell = ({ row }: { row: any }) => {
  const ctas = row.original.ctas || [];

  return (
    <CTAList
      ctas={ctas}
      variant="compact" // or "badges" for a more modern look
      className="max-w-[250px]"
    />
  );
};

export { CTAList, CTATableCell };
export type { CTA, CTAListProps };
