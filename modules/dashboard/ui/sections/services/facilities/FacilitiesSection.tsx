"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEFAULT_LIMIT } from "@/constants";
import { FacilitiesViewSwitcher } from "@/modules/facilities/ui/components/FacilitiesViewSwitcher";

import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const FacilitiesSection = () => {
  return (
    <Suspense
      fallback={<FacilitiesSectionSkeleton></FacilitiesSectionSkeleton>}
    >
      <ErrorBoundary fallback={<p>Error</p>}>
        <FacilitiesSectionSuspense></FacilitiesSectionSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const FacilitiesSectionSkeleton = () => {
  return (
    <>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Product</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: DEFAULT_LIMIT }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-36" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-3 w-[180px]" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="text-xs truncate">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export const FacilitiesSectionSuspense = () => {
  return (
    <div className="flex flex-col gap-4 mx-4">
      <div className="flex flex-wrap justify-between items-center">
        <FacilitiesViewSwitcher />
      </div>
    </div>
  );
};
