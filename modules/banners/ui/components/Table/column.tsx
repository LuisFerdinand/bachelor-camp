import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  ArrowUpDown,
  BookOpen,
  CoinsIcon,
  ExternalLink,
  FileText,
  Home,
  Info,
  LinkIcon,
  Mail,
  MoreVertical,
  Package2Icon,
  Rss,
  StoreIcon,
  TagIcon,
  Tent,
  VideoOff,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { ProductImage } from "@/components/ProductImage";
import { cn, stringToColor } from "@/lib/utils";
import { BannerActionProvider } from "../BannerContext";
import BannerActions from "./banner-actions";
import { InferSelectModel } from "drizzle-orm";
import { banners } from "@/db/schema";

const typeIcons: Record<string, React.ElementType> = {
  Home: Home,
  Camp: Tent,
  Programs: BookOpen,
  Tests: FileText,
  About: Info,
  Blog: Rss,
  Contact: Mail,
};

type Banner = InferSelectModel<typeof banners>;

export function getBannerColumns(): ColumnDef<Banner>[] {
  const router = useRouter();
  const pathname = usePathname();
  const columns: ColumnDef<Banner>[] = [
    {
      accessorKey: "headline",
      header: ({ column }: { column: Column<Banner, unknown> }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Banner
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }: { row: Row<Banner> }) => {
        const { id, headline, subheadline, mediaUrl } = row.original;

        return (
          <>
            <div
              className="flex items-start gap-4 max-w-full"
              //   onClick={(e) => {
              //     e.stopPropagation();
              //     router.push(`${pathname}/${id}`);
              //   }}
            >
              <div className="relative w-20 shrink-0">
                <ProductImage imageUrl={mediaUrl} title={headline} />
              </div>
              <div className="flex flex-col overflow-hidden gap-0.5 max-w-[300px]">
                <span className="text-sm line-clamp-1 font-medium">
                  {headline}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-2">
                  {subheadline || "No description"}
                </span>
              </div>
            </div>
          </>
        );
      },
    },
    {
      accessorKey: "type",
      header: ({ column }: { column: Column<Banner, unknown> }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Page
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }: { row: Row<Banner> }) => {
        const { type } = row.original;
        const Icon = typeIcons[type] || Info;

        return (
          <div className="flex items-center gap-1">
            <span
              className="text-xs px-2 py-0.5 rounded-full text-white inline-flex items-center gap-1 line-clamp-1 truncate"
              style={{
                backgroundColor: stringToColor(type),
                color: "black",
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {type}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: ({ column }: { column: Column<Banner, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Banner> }) => {
        const { isActive } = row.original;

        return (
          <div className="flex items-center justify-center">
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                isActive === "true"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  isActive === "true" ? "bg-green-500" : "bg-red-500"
                )}
              />
              {isActive === "true" ? "Active" : "Inactive"}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "badgeText",
      header: ({ column }: { column: Column<Banner, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Badge
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Banner> }) => {
        const { badgeText, type } = row.original;

        if (!badgeText) return null;

        const Icon = typeIcons[type] || Info;

        return (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium truncate"
            style={{
              backgroundColor: stringToColor(type),
              color: "black",
            }}
          >
            <TagIcon className="w-3 h-3" />
            {badgeText}
          </span>
        );
      },
    },
    {
      accessorKey: "ctas",
      header: ({ column }) => <Button variant="ghost">CTA</Button>,
      cell: ({ row }) => {
        const ctas = row.original.ctas || [];

        return (
          <div className="flex flex-row">
            <ul className={cn(`space-y-1 list-disc`)}>
              {ctas.map((cta, i) =>
                cta.ctaText ? (
                  <li
                    key={i}
                    className={cn(
                      `list-item text-xs`,
                      cta.isShown
                        ? "marker:text-green-500"
                        : "marker:text-red-500"
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {cta.isShown ? (
                        <a
                          href={cta.ctaLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-800 hover:underline flex items-center gap-1"
                        >
                          {cta.ctaText}
                        </a>
                      ) : (
                        <span className="text-neutral-400 line-through">
                          {cta.ctaText}
                        </span>
                      )}
                    </div>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: ({ column }: { column: Column<Banner, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Banner> }) => {
        const { createdAt, id } = row.original;
        const date = new Date(createdAt!);
        const formatted = date.toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        return (
          <div
            className="text-sm text-muted-foreground text-center"
            // onClick={(e) => {
            //   e.stopPropagation(); // prevent modal/dropdown bugs
            //   router.push(`${pathname}/${id}`);
            // }}
          >
            {formatted}
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }: { column: Column<Banner, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Banner> }) => {
        const { updatedAt, id } = row.original;
        const date = new Date(row.original.updatedAt!);
        const formatted = date.toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        return (
          <div
            className="text-sm text-muted-foreground text-center truncate"
            onClick={(e) => {
              e.stopPropagation(); // prevent modal/dropdown bugs
              router.push(`${pathname}/${id}`);
            }}
          >
            {formatted}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: { row: { original: Banner } }) => {
        const { id, type, isActive } = row.original;

        return (
          <>
            <BannerActionProvider>
              <BannerActions id={id} type={type} isActive={isActive}>
                <Button
                  variant={"ghost"}
                  className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
                >
                  <MoreVertical className="size-4"></MoreVertical>
                </Button>
              </BannerActions>
            </BannerActionProvider>
          </>
        );
      },
    },
  ];

  return columns;
}
