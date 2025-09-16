import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ExternalLink,
  MoreVertical,
  TagIcon,
  Image as ImageIcon,
  List,
  Circle,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { ProductImage } from "@/components/ProductImage";
import { cn, formatOrdinal } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { pillars } from "@/db/schema";
import { PillarActionProvider } from "../PillarContext";
import PillarActions from "./pillar-actions";
// import PillarActions from "./pillar-actions";

export type Pillar = InferSelectModel<typeof pillars>;

export function getPillarColumns(): ColumnDef<Pillar>[] {
  const router = useRouter();
  const pathname = usePathname();

  const columns: ColumnDef<Pillar>[] = [
    {
      accessorKey: "title",
      header: ({ column }: { column: Column<Pillar, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pillar
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Pillar> }) => {
        const { id, title, subtitle, imageUrl } = row.original;

        return (
          <div className="flex items-start gap-4 max-w-full">
            <div className="relative w-20 shrink-0">
              <ProductImage imageUrl={imageUrl} title={title} />
            </div>
            <div className="flex flex-col overflow-hidden gap-0.5 max-w-[300px]">
              <span className="text-sm line-clamp-1 font-medium">{title}</span>
              <span className="text-xs text-muted-foreground line-clamp-2">
                {subtitle || "No description"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { isActive } = row.original;
        return (
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
            <p className="leading-none">
              {isActive === "true" ? "Active" : "Inactive"}
            </p>
          </span>
        );
      },
    },
    // {
    //   accessorKey: "badgeText",
    //   header: () => <Button variant="ghost">Badge</Button>,
    //   cell: ({ row }) => {
    //     const { badgeText } = row.original;
    //     if (!badgeText) return null;

    //     return (
    //       <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium truncate bg-neutral-200">
    //         <TagIcon className="w-3 h-3" />
    //         {badgeText}
    //       </span>
    //     );
    //   },
    // },
    {
      accessorKey: "features",
      header: () => <Button variant="ghost">Features</Button>,
      cell: ({ row }) => {
        const features = row.original.features || [];

        if (features.length === 0) {
          return (
            <span className="flex justify-center text-xs text-muted-foreground italic text-center">
              No features
            </span>
          );
        }

        return (
          <ul className="space-y-1 list-disc pl-4 text-xs">
            {features.map((f, i) => (
              <li key={i} className="truncate flex items-center gap-1">
                {f.iconUrl ? (
                  <img
                    src={f.iconUrl}
                    alt=""
                    className="w-3 h-3 object-contain"
                  />
                ) : (
                  <Circle className="w-3 h-3 text-muted-foreground" />
                )}
                <span className="leading-none">
                  {f.text || "Untitled feature"}
                </span>
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      accessorKey: "ctaText",
      header: () => <Button variant="ghost">CTA</Button>,
      cell: ({ row }) => {
        const { ctaText, ctaLink } = row.original;
        if (!ctaText) return null;
        return (
          <div className="flex flex-row">
            <ul className="space-y-1 list-disc">
              <li className="list-item text-xs">
                <div className="flex items-center gap-1">
                  <a
                    href={ctaLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-800 hover:underline flex items-center gap-1"
                  >
                    {ctaText}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        );
      },
    },
    {
      accessorKey: "order",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground items-center flex justify-center">
          {row.original.order > 0 ? formatOrdinal(row.original.order) : "-"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt!);
        return (
          <div className="text-xs text-muted-foreground">
            {date.toLocaleString()}
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt!);
        return (
          <div className="text-xs text-muted-foreground">
            {date.toLocaleString()}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id, isActive, order } = row.original;
        return (
          <>
            <PillarActionProvider>
              <PillarActions id={id} isActive={isActive!} order={order}>
                <Button
                  variant="ghost"
                  className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </PillarActions>
            </PillarActionProvider>
          </>
        );
      },
    },
  ];

  return columns;
}
