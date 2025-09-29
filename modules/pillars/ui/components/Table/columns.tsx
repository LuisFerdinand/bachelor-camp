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
import { OrderBadge } from "@/components/table/OrderBadge";

import { FeatureList } from "@/components/table/FeatureList";
import { CTAList } from "@/components/table/CTAList";
import CreatedAtDisplay from "@/components/table/CreatedAtDisplay";
import LastUpdatedDisplay from "@/components/table/LastUpdatedDisplay";
import { BooleanStatusBadge } from "@/components/table/StatusBadge";

export type Pillar = InferSelectModel<typeof pillars>;

export function getPillarColumns(): ColumnDef<Pillar>[] {
  const router = useRouter();
  const pathname = usePathname();

  const columns: ColumnDef<Pillar>[] = [
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
        <OrderBadge
          order={row.original.order}
          showBadgeStyle={true}
        ></OrderBadge>
      ),
    },
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
          <BooleanStatusBadge
            status={isActive!}
            type="active"
            showIcon
          ></BooleanStatusBadge>
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

        return (
          <FeatureList features={features} variant="compact"></FeatureList>
        );
      },
    },
    {
      accessorKey: "ctaText",
      header: () => <Button variant="ghost">CTA</Button>,
      cell: ({ row }) => {
        const { ctaText, ctaLink } = row.original;

        return (
          <CTAList
            ctas={[{ ctaText, ctaLink: ctaLink || "", isShown: true }]}
          ></CTAList>
        );
      },
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
        return <CreatedAtDisplay value={date}></CreatedAtDisplay>;
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
        return <LastUpdatedDisplay value={date}></LastUpdatedDisplay>;
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
