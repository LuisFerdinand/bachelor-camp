"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreVertical,
  Circle,
  Image as ImageIcon,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import { ProductImage } from "@/components/ProductImage";
import { capitalize, cn } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { facilities } from "@/db/schema";
import LastUpdatedDisplay from "@/components/table/LastUpdatedDisplay";
import { FeaturedBadge } from "@/components/table/FeaturedBadge";
import { CategoryBadge } from "@/components/table/CategoryBadge";
import { OrderBadge } from "@/components/table/OrderBadge";
import { FacilityActionProvider } from "../FacilityContext";
import FacilityActions from "./facility-actions";
import { MultiStateStatusBadge } from "@/components/table/StatusBadge";
import CreatedAtDisplay from "@/components/table/CreatedAtDisplay";
// import FacilityActions from "./facility-actions";

export type Facility = InferSelectModel<typeof facilities>;

export function getFacilityColumns(): ColumnDef<Facility>[] {
  const columns: ColumnDef<Facility>[] = [
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
          order={row.original.order || 0}
          showBadgeStyle={true}
        ></OrderBadge>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<Facility, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Facility
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Facility> }) => {
        const { id, name, description, imageUrl, iconUrl, slug } = row.original;

        return (
          <div className="flex items-start gap-4 max-w-full">
            <div className="relative w-14 h-14 shrink-0">
              {imageUrl ? (
                <ProductImage imageUrl={imageUrl} title={name} />
              ) : iconUrl ? (
                <img
                  src={iconUrl}
                  alt={name}
                  className="w-full h-full object-contain rounded"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-100 rounded">
                  <ImageIcon className="w-6 h-6 text-neutral-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col overflow-hidden gap-0.5 max-w-[300px]">
              <span className="text-sm line-clamp-1 font-medium">
                {name} / {slug}
              </span>
              <span className="text-xs text-muted-foreground line-clamp-2">
                {description || "No description"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <CategoryBadge
          category={{ name: capitalize(row.original.type) }}
        ></CategoryBadge>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <MultiStateStatusBadge
            status={row.original.status!}
            showIcon={true}
          ></MultiStateStatusBadge>
        );
      },
    },
    {
      accessorKey: "isFeatured",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Featured
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <FeaturedBadge
            isFeatured={row.original.isFeatured || "false"}
          ></FeaturedBadge>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <Button variant="ghost">Category</Button>,
      cell: ({ row }) => (
        <CategoryBadge
          category={{ name: capitalize(row.original.category!) }}
        ></CategoryBadge>
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
      cell: ({ row }) => <LastUpdatedDisplay value={row.original.updatedAt!} />,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id, isFeatured, order } = row.original;
        return (
          <FacilityActionProvider>
            <FacilityActions
              id={id}
              isFeatured={isFeatured!}
              order={order || 0}
            >
              <Button
                variant="ghost"
                className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
              >
                <MoreVertical className="size-4" />
              </Button>
            </FacilityActions>
          </FacilityActionProvider>
        );
      },
    },
  ];

  return columns;
}
