"use client";

import { useQueryState } from "nuqs";
import { trpc } from "@/trpc/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { useState } from "react";

import { FeaturedFacilitiesFilters } from "./FeaturedFacilitiesFilters";
import { DataTable } from "./Table/data-table";
import { FeaturedFacilities } from "@/db/schema";
import { getFeaturedFacilitiesColumns } from "./Table/columns";
import { useFeaturedFacilitiesFilters } from "../../hooks/use-featured-facilities-filters";

export const FeaturedFacilitiesViewSwitcher = () => {
  const [view, setView] = useQueryState("view", {
    defaultValue: "table",
  });

  const [filters] = useFeaturedFacilitiesFilters();

  const columns = getFeaturedFacilitiesColumns();

  const { data: featuredFacilities, isLoading } =
    trpc.facilities.getFiltered.useQuery({
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
          <FeaturedFacilitiesFilters />
          <>
            <TabsContent value="table">
              {/* {JSON.stringify(featuredFacilities)} */}
              <DataTable<FeaturedFacilities, unknown>
                columns={columns}
                data={featuredFacilities ?? []}
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
