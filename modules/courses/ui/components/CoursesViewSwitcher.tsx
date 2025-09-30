"use client";

import { useQueryState } from "nuqs";
import { trpc } from "@/trpc/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import { useEffect, useState } from "react";

import { CourseFilters } from "./CourseFilters";
import { DataTable as CourseDataTable } from "./Table/data-table";
import { Course, CourseBatchWithDetails, CourseWithDetails } from "@/db/schema";
import { getCourseColumns } from "./Table/columns";
import { useCourseFilters } from "../../hooks/use-course-filters";
import { CourseBatchFilters } from "@/modules/course-batches/ui/components/CourseBatchFilters";
import { useCourseBatchFilters } from "@/modules/course-batches/hooks/use-course-batch-filters";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable as CourseBatchDataTable } from "@/modules/course-batches/ui/components/Table/data-table";
import { getCourseBatchColumns } from "@/modules/course-batches/ui/components/Table/columns";

export function ResetFiltersOnViewChange() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const view = searchParams.get("view");

  useEffect(() => {
    const allowedParams = new URLSearchParams();
    // Preserve only view if it's switching
    if (view) allowedParams.set("view", view);

    router.replace(`?${allowedParams.toString()}`, { scroll: false });
  }, [view]); // run only when view changes
  return null; // this is a logic-only component
}

export const CoursesViewSwitcher = () => {
  const [view, setView] = useQueryState("view", {
    defaultValue: "course",
  });

  const [courseFilters] = useCourseFilters();
  const [courseBatchFilters] = useCourseBatchFilters();

  const courseColumns = getCourseColumns();
  const courseBatchColumns = getCourseBatchColumns();

  const { data: courses, isLoading: isLoadingCourses } =
    trpc.courses.getFiltered.useQuery(
      {
        category: courseFilters.category ?? undefined,
        isActive: courseFilters.status ?? undefined,
        isFeatured: courseFilters.featured ?? undefined,
        level: courseFilters.level ?? undefined,
        buildingId: courseFilters.buildingId ?? undefined,
        searchQuery: courseFilters.searchQuery ?? undefined,
      },
      {
        enabled: view === "course",
      }
    );

  const { data: courseBatches, isLoading: isLoadingCourseBatches } =
    trpc.courseBatches.getFiltered.useQuery(
      {
        courseId: courseBatchFilters.courseId ?? undefined,
        status: courseBatchFilters.status ?? undefined,
        deliveryMode: courseBatchFilters.deliveryMode ?? undefined,
        category: courseBatchFilters.category ?? undefined,
        level: courseBatchFilters.level ?? undefined,
        startDateFrom: courseBatchFilters.startDateFrom ?? undefined,
        startDateTo: courseBatchFilters.startDateTo ?? undefined,
        isFeatured: courseBatchFilters.isFeatured ?? undefined,
        searchQuery: courseBatchFilters.searchQuery ?? undefined,
      },
      { enabled: view === "batch" }
    );

  return (
    <>
      <Tabs
        defaultValue={view}
        onValueChange={setView}
        className="flex-1 w-full border rounded-lg bg-white"
      >
        <ResetFiltersOnViewChange></ResetFiltersOnViewChange>
        <div className="h-full flex flex-col overflow-auto p-4 overflow-x-hidden scrollbar-custom">
          <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
            <TabsList className="w-full lg:w-auto">
              <TabsTrigger className="h-8 w-full lg:w-auto" value="course">
                Courses
              </TabsTrigger>
              <TabsTrigger className="h-8 w-full lg:w-auto" value="batch">
                Batches
              </TabsTrigger>
              <TabsTrigger className="h-8 w-full lg:w-auto" value="session">
                Sessions
              </TabsTrigger>
            </TabsList>
          </div>
          {/* {JSON.stringify(courses[0])} */}
          <GradientSeparator className="my-2" />
          {view === "course" && <CourseFilters />}
          {view === "batch" && <CourseBatchFilters />}
          <>
            <TabsContent value="course">
              <CourseDataTable<CourseWithDetails, unknown>
                columns={courseColumns}
                data={courses ?? []}
                isLoading={isLoadingCourses}
              ></CourseDataTable>
            </TabsContent>
            <TabsContent value="batch">
              <CourseBatchDataTable<CourseBatchWithDetails, unknown>
                columns={courseBatchColumns}
                data={courseBatches ?? []}
                isLoading={isLoadingCourseBatches}
              ></CourseBatchDataTable>
            </TabsContent>
            <TabsContent value="session">Session</TabsContent>
          </>
        </div>
      </Tabs>
    </>
  );
};
