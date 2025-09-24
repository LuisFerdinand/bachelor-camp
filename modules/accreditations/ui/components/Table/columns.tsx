"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";

import { ProductImage } from "@/components/ProductImage";
import { cn, formatOrdinal } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { accreditations } from "@/db/schema";
import AccreditationActions from "./accreditation-actions";
import { AccreditationActionProvider } from "../AccreditationContext";

export type Accreditation = InferSelectModel<typeof accreditations>;

export function getAccreditationColumns(): ColumnDef<Accreditation>[] {
  const columns: ColumnDef<Accreditation>[] = [
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
          <div className="flex items-start gap-4 max-w-full">
            <div className="relative w-16 shrink-0">
              <ProductImage imageUrl={imageUrl} title={title} />
            </div>
            <div className="flex flex-col overflow-hidden gap-0.5 max-w-[300px]">
              <span className="text-sm line-clamp-1 font-medium">{title}</span>
              <span className="text-xs text-muted-foreground line-clamp-2">
                {description || "No description"}
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
          Status
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
            {isActive === "true" ? "Active" : "Inactive"}
          </span>
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
        <span className="text-sm text-muted-foreground flex justify-center">
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
