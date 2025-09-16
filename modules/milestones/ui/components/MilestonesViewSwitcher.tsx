"use client";

import { useQueryState } from "nuqs";
import { trpc } from "@/trpc/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { useState } from "react";
import { useMilestoneFilters } from "../../hooks/use-milestone-filters";
import { MilestoneFilters } from "./MilestoneFilters";
import { MilestoneDataTable } from "./Table/data-table";
import { Milestone } from "@/db/schema";
import { getMilestoneColumns } from "./Table/columns";

export const MilestonesViewSwitcher = () => {
  const [view, setView] = useQueryState("view", {
    defaultValue: "table",
  });

  const [filters] = useMilestoneFilters();

  const columns = getMilestoneColumns();

  const { data: milestones, isLoading } = trpc.milestones.getFiltered.useQuery({
    isActive: filters.status ?? undefined,
    year: filters.year ?? undefined,
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
          <MilestoneFilters />
          <>
            <TabsContent value="table">
              {/* {JSON.stringify(milestones)} */}
              <MilestoneDataTable<Milestone, unknown>
                columns={columns}
                data={milestones ?? []}
                isLoading={isLoading}
              ></MilestoneDataTable>
            </TabsContent>
            {/* <TabsContent value="kanban">Kanban</TabsContent>
            <TabsContent value="calendar">Calendar</TabsContent> */}
          </>
        </div>
      </Tabs>
    </>
  );
};
