"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Eraser, Loader, Search } from "lucide-react";

import { CourseBatchWithDetails } from "@/db/schema";
import { useCourseBatchFilters } from "@/modules/course-batches/hooks/use-course-batch-filters";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

const columnLabels: Record<string, string> = {
  id: "Batch ID",
  "course.title": "Course",
  status: "Status",
  startDate: "Duration",
  deliveryMode: "Schedule",
  enrolledCount: "Enrollment",
  completedSessions: "Progress",
  price: "Price",
  updatedAt: "Last Updated",
  createdAt: "Created At",
};

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [{ searchQuery }, setFilters] = useCourseBatchFilters();
  const [tempQuery, setTempQuery] = React.useState(searchQuery ?? "");

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      createdAt: false,
    });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      columnVisibility: {
        createdAt: false,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-2 w-full mb-2">
          <div className="flex items-center gap-2 w-full max-w-md">
            <Input
              type="search"
              placeholder="Search courseBatchs..."
              className="h-8 flex-1 text-sm"
              value={tempQuery}
              onChange={(e) => setTempQuery(e.target.value)}
            />

            <Button
              variant="secondary"
              size="sm"
              className="size-8 px-2 hover:text-black hover:border-black"
              onClick={() => setFilters({ searchQuery: tempQuery })}
              disabled={!tempQuery.trim()}
            >
              <Search className="h-4 w-4" />
            </Button>

            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-white hover:text-red-600 bg-red-600 hover:bg-red-100"
                onClick={() => {
                  setTempQuery("");
                  setFilters({ searchQuery: "" });
                }}
              >
                <Eraser className="w-4 h-4" />
              </Button>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto h-8">
                Columns <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              key={JSON.stringify(table.getState().columnVisibility)}
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnLabels[column.id] ?? column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-lg border overflow-x-auto">
          {isLoading ? (
            <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
              <Loader className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="bg-neutral-200 hover:bg-neutral-200 rounded-3xl"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-primary whitespace-nowrap px-4 py-1.5 text-sm font-semibold hover:bg-neutral-100 transition"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => {
                    const courseBatch = row.original as CourseBatchWithDetails;
                    return (
                      <TableRow
                        className="hover:bg-neutral-100 cursor-pointer transition "
                        key={row.id}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="px-4 py-3 text-sm border-b"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <div className="w-full h-40 flex items-center justify-center">
                        <div className="text-muted-foreground text-center">
                          <p className="text-sm font-medium">
                            No courseBatchs found
                          </p>
                          <p className="text-xs">
                            Try adjusting your filters or keyword.
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
