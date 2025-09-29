"use client";

import { useQueryState } from "nuqs";
import { trpc } from "@/trpc/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { useState } from "react";

import { CourseFilters } from "./CourseFilters";
import { DataTable } from "./Table/data-table";
import { Course } from "@/db/schema";
import { getCourseColumns } from "./Table/columns";
import { useCourseFilters } from "../../hooks/use-course-filters";

export const CoursesViewSwitcher = () => {
  const [view, setView] = useQueryState("view", {
    defaultValue: "course",
  });

  const [filters] = useCourseFilters();

  const columns = getCourseColumns();

  const { data: courses, isLoading } = trpc.courses.getFiltered.useQuery({
    category: filters.category ?? undefined,
    isActive: filters.status ?? undefined,
    isFeatured: filters.featured ?? undefined,
    level: filters.level ?? undefined,
    buildingId: filters.buildingId ?? undefined,
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
              <TabsTrigger className="h-8 w-full lg:w-auto" value="course">
                Course
              </TabsTrigger>
              <TabsTrigger className="h-8 w-full lg:w-auto" value="batch">
                Batch
              </TabsTrigger>
              <TabsTrigger className="h-8 w-full lg:w-auto" value="schedule">
                Schedule
              </TabsTrigger>
            </TabsList>
          </div>
          <GradientSeparator className="my-2" />
          {view === "course" && <CourseFilters />}
          <>
            <TabsContent value="course">
              <DataTable<Course, unknown>
                columns={columns}
                data={courses ?? []}
                isLoading={isLoading}
              ></DataTable>
            </TabsContent>
            <TabsContent value="batch">Batch</TabsContent>
            <TabsContent value="schedule">Schedule</TabsContent>
          </>
        </div>
      </Tabs>
    </>
  );
};
