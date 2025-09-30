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

import { useCourseFilters } from "@/modules/courses/hooks/use-course-filters";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

const columnLabels: Record<string, string> = {
  title: "Course",
  category: "Category & Level",
  duration: "Duration",
  cta: "CTA",
  isFeatured: "Featured",
  learningGoals: "Learning Goals",
  syllabus: "Syllabus",
  teachingMethods: "Teaching Methods",
  resources: "Resources",
  targetAudience: "Targets",
  price: "Price",
  isActive: "Status",
  createdAt: "Created At",
  updatedAt: "Last Updated",
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

  const [{ searchQuery }, setFilters] = useCourseFilters();
  const [tempQuery, setTempQuery] = React.useState(searchQuery ?? "");

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      createdAt: false,
      learningGoals: false,
      syllabus: false,
      teachingMethods: false,
      resources: false,
      targetAudience: false,
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
        learningGoals: false,
        syllabus: false,
        teachingMethods: false,
        resources: false,
        targetAudience: false,
      },
    },
    state: { sorting, columnFilters, columnVisibility },
  });

  return (
    <div className="w-full">
      {/* Search and Columns */}
      <div className="flex items-center gap-2 w-full mb-2">
        <div className="flex items-center gap-2 w-full max-w-md">
          <Input
            type="search"
            placeholder="Search courses..."
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
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {columnLabels[col.id] ?? col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-x-auto">
        {isLoading ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-neutral-200">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
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
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="w-full h-40 flex items-center justify-center text-muted-foreground text-center">
                      <p className="text-sm font-medium">No courses found</p>
                      <p className="text-xs">
                        Try adjusting your filters or keyword.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
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
  );
}
