"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";

import { cn, formatOrdinal } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { accreditations } from "@/db/schema";
import AccreditationActions from "./accreditation-actions";
import { AccreditationActionProvider } from "../AccreditationContext";
import { OrderBadge } from "@/components/table/OrderBadge";

import LastUpdatedDisplay from "@/components/table/LastUpdatedDisplay";
import { ProductCard } from "@/components/table/ProductImage";
import CreatedAtDisplay from "@/components/table/CreatedAtDisplay";
import { BooleanStatusBadge } from "@/components/table/StatusBadge";

export type Accreditation = InferSelectModel<typeof accreditations>;

export function getAccreditationColumns(): ColumnDef<Accreditation>[] {
  const columns: ColumnDef<Accreditation>[] = [
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
      accessorKey: "title",
      header: ({ column }: { column: Column<Accreditation, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Accreditation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Accreditation> }) => {
        const { title, description, imageUrl } = row.original;

        return (
          // <div className="flex items-start gap-4 max-w-full">
          //   <div className="relative w-16 shrink-0">
          //     <ProductImage imageUrl={imageUrl} title={title} />
          //   </div>
          //   <div className="flex flex-col overflow-hidden gap-0.5 max-w-[300px]">
          //     <span className="text-sm line-clamp-1 font-medium">{title}</span>
          //     <span className="text-xs text-muted-foreground line-clamp-2">
          //       {description || "No description"}
          //     </span>
          //   </div>
          // </div>
          <ProductCard
            title={title}
            description={description}
            imageUrl={imageUrl}
          ></ProductCard>
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
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { isActive } = row.original;
        return (
          <>
            <BooleanStatusBadge
              status={isActive!}
              type="active"
              showIcon
            ></BooleanStatusBadge>
          </>
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
          <AccreditationActionProvider>
            <AccreditationActions id={id} isActive={isActive!} order={order}>
              <Button
                variant="ghost"
                className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
              >
                <MoreVertical className="size-4" />
              </Button>
            </AccreditationActions>
          </AccreditationActionProvider>
        );
      },
    },
  ];

  return columns;
}
