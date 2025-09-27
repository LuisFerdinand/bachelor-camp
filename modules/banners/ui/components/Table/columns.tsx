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
import {
  cn,
  stringToColor,
  stringToColorPalette,
  stringToModernColor,
} from "@/lib/utils";
import { BannerActionProvider } from "../BannerContext";
import BannerActions from "./banner-actions";
import { InferSelectModel } from "drizzle-orm";
import { Banner } from "@/db/schema";
import { CTATableCell } from "@/components/table/CTAList";
import LastUpdatedDisplay from "@/components/table/LastUpdatedDisplay";
import CreatedAtDisplay from "@/components/table/CreatedAtDisplay";
import { BooleanStatusBadge } from "@/components/table/StatusBadge";
import { CategoryBadge } from "@/components/table/CategoryBadge";

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
            <div className="flex items-start gap-4 max-w-full">
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

        return <CategoryBadge category={{ name: type }}></CategoryBadge>;
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
          <BooleanStatusBadge
            status={isActive!}
            type="active"
            showIcon
          ></BooleanStatusBadge>
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

        return (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium truncate"
            style={{
              backgroundColor: stringToColorPalette(type).background,
              color: stringToColorPalette(type).text,
              border: `2px solid ${stringToColorPalette(type).border}`,
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

        return <CTATableCell row={row}></CTATableCell>;
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
        return (
          <CreatedAtDisplay value={row.original.createdAt!}></CreatedAtDisplay>
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
        return (
          <LastUpdatedDisplay
            value={row.original.updatedAt!}
          ></LastUpdatedDisplay>
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
              <BannerActions id={id} type={type} isActive={isActive!}>
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
