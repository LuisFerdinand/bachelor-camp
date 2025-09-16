"use client";

import { useQueryState } from "nuqs";
import { trpc } from "@/trpc/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { useState } from "react";
import { useTestimonialFilters } from "../../hooks/use-testimonial-filters";
import { TestimonialFilters } from "./TestimonialFilters";
import { DataTable } from "./Table/data-table";
import { TestimonialWithCategories } from "@/db/schema";
import { getTestimonialColumns } from "./Table/columns";

export const TestimonialsViewSwitcher = () => {
  const [view, setView] = useQueryState("view", {
    defaultValue: "table",
  });

  const [filters] = useTestimonialFilters();

  const columns = getTestimonialColumns();

  const { data: testimonials, isLoading } =
    trpc.testimonials.getFiltered.useQuery({
      category: filters.category ?? undefined,
      source: filters.source ?? undefined,
      isFeatured: filters.isFeatured ?? undefined,
      isShown: filters.isShown ?? undefined,
      searchQuery: filters.searchQuery ?? undefined,
    });

  return (
    <>
      <Tabs
        defaultValue={view}
        onValueChange={setView}
        className="flex-1 w-full border rounded-lg bg-white"
      >
        <div className="h-full flex flex-col overflow-auto p-4 overflow-x-hidden scrollbar-custom">
          <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
            <TabsList className="w-full lg:w-auto">
              <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                Table
              </TabsTrigger>
              <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                Kanban
              </TabsTrigger>
              <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                Calendar
              </TabsTrigger>
            </TabsList>
          </div>
          <GradientSeparator className="my-2" />
          <TestimonialFilters />
          <>
            <TabsContent value="table">
              {/* {JSON.stringify(testimonials)} */}
              <DataTable<TestimonialWithCategories, unknown>
                columns={columns}
                data={testimonials ?? []}
                isLoading={isLoading}
              ></DataTable>
            </TabsContent>
            {/* <TabsContent value="kanban">Kanban</TabsContent>
            <TabsContent value="calendar">Calendar</TabsContent> */}
          </>
        </div>
      </Tabs>
    </>
  );
};
