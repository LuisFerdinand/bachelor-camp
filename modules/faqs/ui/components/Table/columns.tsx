"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { ArrowUpDown, ImageIcon, MoreVertical, Tag } from "lucide-react";
import { cn, formatOrdinal, stringToColor } from "@/lib/utils";
import { FaqWithCategories } from "@/db/schema";
import { ReactSVG } from "react-svg";
import { FAQActionProvider } from "../FAQContext";
import FAQActions from "./faq-actions";

export function getFaqColumns(): ColumnDef<FaqWithCategories>[] {
  const columns: ColumnDef<FaqWithCategories>[] = [
    {
      accessorKey: "question",
      header: ({ column }: { column: Column<FaqWithCategories, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Question
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<FaqWithCategories> }) => {
        const { question, answer, iconUrl } = row.original;
        return (
          <div className="flex items-start gap-3 max-w-full">
            {iconUrl ? (
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                style={{ backgroundColor: stringToColor(question, true) }}
              >
                <ReactSVG
                  src={iconUrl}
                  wrapper="span"
                  className="w-6 h-6 text-white"
                  beforeInjection={(svg) => {
                    svg.setAttribute("stroke", "currentColor");
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 shrink-0">
                <ImageIcon className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div className="flex flex-col overflow-hidden gap-0.5 max-w-[280px]">
              <span className="text-sm font-medium line-clamp-1">
                {question}
              </span>
              <span className="text-xs text-muted-foreground line-clamp-2">
                {answer}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "categories",
      header: ({ column }) => (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      ),
      cell: ({ row }) => {
        const categories = row.original.categories || [];
        return categories.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {categories.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 line-clamp-1 truncate"
              >
                <Tag className="w-3 h-3" />
                {c.name}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-xs text-muted-foreground italic">
            Uncategorized
          </span>
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
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt!);
        return (
          <span className="text-xs text-muted-foreground">
            {date.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id, isActive, order } = row.original;
        return (
          <>
            <FAQActionProvider>
              <FAQActions id={id} isActive={isActive!} order={order}>
                <Button
                  variant="ghost"
                  className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </FAQActions>
            </FAQActionProvider>
          </>
        );
      },
    },
  ];

  return columns;
}
