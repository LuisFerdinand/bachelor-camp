import { cn } from "@/lib/utils";
import { ExternalLink, Copy, Globe, Link, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

// Helper function to format URL for display
const formatUrlForDisplay = (url: string, maxLength: number = 30): string => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace("www.", "");
    const path = urlObj.pathname + urlObj.search;

    if (path === "/") {
      return domain;
    }

    const fullDisplay = `${domain}${path}`;
    if (fullDisplay.length <= maxLength) {
      return fullDisplay;
    }

    // Truncate path but keep domain visible
    const availableLength = maxLength - domain.length - 3; // 3 for "..."
    if (availableLength > 5) {
      return `${domain}${path.slice(0, availableLength)}...`;
    }

    return `${domain}...`;
  } catch {
    // Fallback for invalid URLs
    return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
  }
};

// Copy to clipboard hook
const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return { copied, copy };
};

// URL display component variants
interface URLDisplayProps {
  url?: string | null;
  variant?: "default" | "compact" | "badge" | "icon-only";
  showCopy?: boolean;
  maxWidth?: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const URLDisplay: React.FC<URLDisplayProps> = ({
  url,
  variant = "default",
  showCopy = false,
  maxWidth = 220,
  className,
  onClick,
}) => {
  const { copied, copy } = useCopyToClipboard();

  if (!url) {
    return (
      <div className="flex items-center gap-1.5">
        <Globe className="w-3 h-3 text-muted-foreground/50" />
        <span className="text-xs text-muted-foreground italic">No URL</span>
      </div>
    );
  }

  // Validate URL
  const isValidUrl = (() => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  })();

  // Icon only variant
  if (variant === "icon-only") {
    return (
      <div className="flex items-center gap-1">
        {isValidUrl ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center p-1 rounded hover:bg-gray-100 transition-colors duration-200 group"
            onClick={onClick}
            title={url}
          >
            <ExternalLink className="w-3 h-3 text-blue-600 group-hover:text-blue-700" />
          </a>
        ) : (
          <Link className="w-3 h-3 text-muted-foreground" />
        )}
        {showCopy && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              copy(url);
            }}
            title="Copy URL"
          >
            {copied ? (
              <CheckIcon className="w-3 h-3 text-green-600" />
            ) : (
              <Copy className="w-3 h-3 text-muted-foreground" />
            )}
          </Button>
        )}
      </div>
    );
  }

  // Badge variant
  if (variant === "badge") {
    return (
      <div className="flex items-center gap-1.5 max-w-fit">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200",
            isValidUrl
              ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
              : "bg-gray-50 text-gray-600 border border-gray-200",
            className
          )}
        >
          <Globe className="w-3 h-3" />
          {isValidUrl ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline truncate"
              style={{ maxWidth: `${maxWidth}px` }}
              onClick={onClick}
              title={url}
            >
              {formatUrlForDisplay(url)}
            </a>
          ) : (
            <span
              className="truncate"
              style={{ maxWidth: `${maxWidth}px` }}
              title={url}
            >
              {formatUrlForDisplay(url)}
            </span>
          )}
        </span>
        {showCopy && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              copy(url);
            }}
          >
            {copied ? (
              <CheckIcon className="w-3 h-3 text-green-600" />
            ) : (
              <Copy className="w-3 h-3 text-muted-foreground" />
            )}
          </Button>
        )}
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-1.5 min-w-0">
        <Globe className="w-3 h-3 text-muted-foreground shrink-0" />
        {isValidUrl ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-700 hover:underline truncate transition-colors duration-200 group flex items-center gap-1"
            style={{ maxWidth: `${maxWidth}px` }}
            onClick={onClick}
            title={url}
          >
            <span className="truncate">{formatUrlForDisplay(url)}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
          </a>
        ) : (
          <span
            className="text-xs text-muted-foreground truncate"
            style={{ maxWidth: `${maxWidth}px` }}
            title={url}
          >
            {formatUrlForDisplay(url)}
          </span>
        )}
      </div>
    );
  }

  // Default variant (enhanced)
  return (
    <div className={cn("flex items-center gap-2 min-w-0", className)}>
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <Globe className="w-3 h-3 text-muted-foreground shrink-0" />
        {isValidUrl ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-700 hover:underline truncate transition-all duration-200 group flex items-center gap-1"
            style={{ maxWidth: `${maxWidth}px` }}
            onClick={onClick}
            title={url}
          >
            <span className="truncate">{formatUrlForDisplay(url)}</span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
          </a>
        ) : (
          <span
            className="text-xs text-muted-foreground truncate"
            style={{ maxWidth: `${maxWidth}px` }}
            title={url}
          >
            {formatUrlForDisplay(url)}
          </span>
        )}
      </div>

      {showCopy && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all duration-200 shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            copy(url);
          }}
          title="Copy URL"
        >
          {copied ? (
            <CheckIcon className="w-3 h-3 text-green-600" />
          ) : (
            <Copy className="w-3 h-3 text-muted-foreground" />
          )}
        </Button>
      )}
    </div>
  );
};

// Table column definition (improved)
const URLTableColumn = {
  accessorKey: "url",
  header: ({ column }: any) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="h-8"
    >
      URL
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }: any) => (
    <URLDisplay
      url={row.original.url}
      variant="compact"
      maxWidth={200}
      onClick={(e) => e.stopPropagation()} // Prevent row selection
    />
  ),
  size: 250,
};

// Usage examples component
const URLShowcase = ({ url }: { url: string }) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="text-sm font-medium text-muted-foreground mb-3">
        URL Display Variants:
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Default:</div>
          <URLDisplay url={url} variant="default" showCopy />
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-1">Compact:</div>
          <URLDisplay url={url} variant="compact" />
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-1">Badge:</div>
          <URLDisplay url={url} variant="badge" showCopy />
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-1">Icon Only:</div>
          <URLDisplay url={url} variant="icon-only" showCopy />
        </div>
      </div>
    </div>
  );
};

export { URLDisplay, URLTableColumn, URLShowcase };
export type { URLDisplayProps };
