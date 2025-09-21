"use client";

import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  CreditCardIcon,
  FolderIcon,
  ListCheckIcon,
  StoreIcon,
  ToggleLeftIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useTeamMemberFilters } from "../../hooks/use-team-member-filters";
import { z } from "zod";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { Combobox } from "@/components/ui/combobox";
import { BooleanType } from "@/db/schema/enums";

export const TeamMemberFilters = () => {
  const activeOptions = [
    { label: "Active", value: "true" },
    { label: "Inactive", value: "false" },
  ];

  const {
    data: departmentList = [], // default to empty array
    isLoading: isStoreLoading,
  } = trpc.teamMembers.getManyDepartmentFilters.useQuery();

  const [{ status, departmentId }, setFilters] = useTeamMemberFilters();

  const isActive = (value: string | null | undefined): boolean =>
    typeof value === "string" && value !== "all";

  const triggerClass = (active: boolean) =>
    clsx(
      "w-full lg:w-auto h-8 transition",
      active && "bg-muted text-primary border-primary ring-1 ring-primary/40"
    );

  return (
    <>
      <div className="flex flex-wrap gap-2 w-full">
        <Select
          defaultValue={status ?? "all"}
          onValueChange={(value) =>
            setFilters({
              status: value === "all" ? null : (value as BooleanType),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(status))}>
            <div className="flex items-center pr-2 leading-none">
              <ToggleLeftIcon className="size-4 mr-2" />
              <SelectValue
                className="leading-none"
                placeholder="All Statuses"
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectSeparator />
            {activeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Combobox
          icon={<Building2 className="size-4 mr-2" />}
          value={departmentId ?? "all"}
          onChange={(value) =>
            setFilters({ departmentId: value === "all" ? null : value })
          }
          placeholder="All Departments"
          options={[
            { label: "All Departments", value: "all" },
            ...(departmentList ?? []).map((c) => ({
              label: c.name,
              value: c.id!,
            })),
          ]}
        />
      </div>
    </>
  );
};
