"use client";

import { useQueryState } from "nuqs";
import { trpc } from "@/trpc/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { useState } from "react";

import { FacilityFilters } from "./FacilityFilters";
import { DataTable } from "./Table/data-table";
import { Facility } from "@/db/schema";
import { getFacilityColumns } from "./Table/columns";
import { useFacilityFilters } from "../../hooks/use-facility-filters";

export const FacilitiesViewSwitcher = () => {
  const [view, setView] = useQueryState("view", {
    defaultValue: "table",
  });

  const [filters] = useFacilityFilters();

  const columns = getFacilityColumns();

  const { data: Facilities, isLoading } = trpc.facilities.getFiltered.useQuery({
    category: filters.category ?? undefined,
    status: filters.status ?? undefined,
    featured: filters.featured ?? undefined,
    type: filters.type ?? undefined,
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
          <FacilityFilters />
          <>
            <TabsContent value="table">
              {/* {JSON.stringify(Facilities)} */}
              <DataTable<Facility, unknown>
                columns={columns}
                data={Facilities ?? []}
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
