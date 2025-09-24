"use client";

import { useQueryState } from "nuqs";
import { trpc } from "@/trpc/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { useState } from "react";
import { useStatisticFilters } from "../../hooks/use-statistic-filters";
import { StatisticFilters } from "./StatisticFilters";
import { StatisticsDataTable } from "./Table/data-table";
import { getStatisticColumns } from "./Table/columns";
import { Statistic } from "@/db/schema";

export const StatisticsViewSwitcher = () => {
  const [view, setView] = useQueryState("view", {
    defaultValue: "table",
  });

  const [filters] = useStatisticFilters();

  const columns = getStatisticColumns();

  const { data: statistics, isLoading } = trpc.statistics.getFiltered.useQuery({
    isActive: filters.status ?? undefined,
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
          <StatisticFilters />
          <>
            <TabsContent value="table">
              {/* {JSON.stringify(statistics)} */}
              <StatisticsDataTable<Statistic, unknown>
                columns={columns}
                data={statistics ?? []}
                isLoading={isLoading}
              ></StatisticsDataTable>
            </TabsContent>
            {/* <TabsContent value="kanban">Kanban</TabsContent>
            <TabsContent value="calendar">Calendar</TabsContent> */}
          </>
        </div>
      </Tabs>
    </>
  );
};
