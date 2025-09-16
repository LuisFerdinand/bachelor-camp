"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Award,
  Building2,
  Flag,
  ImageIcon,
  MapPin,
  PackageIcon,
  PlusIcon,
  Quote,
  Sparkles,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { StatisticsSection } from "../../../sections/content/statistics/StatisticsSection";
import { CreateStatisticModal } from "@/modules/statistics/ui/components/CreateStatisticModal";

export const StatisticsView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreateStatisticModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<Quote className="size-4 text-primary" />}
        title="Statistics Management"
        description={`View and manage all statistics.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "Statistics", isCurrent: true },
        ]}
        action={
          <Button
            variant="default"
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Create</span>
          </Button>
        }
      />
      <StatisticsSection></StatisticsSection>
    </div>
  );
};
