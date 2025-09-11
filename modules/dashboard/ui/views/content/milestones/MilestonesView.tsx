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
  Sparkles,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { MilestonesSection } from "../../../sections/content/milestones/MilestonesSection";
import { CreateMilestoneModal } from "@/modules/milestones/ui/components/CreateMilestoneModal";

export const MilestonesView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreateMilestoneModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<Flag className="size-4 text-primary" />}
        title="Milestones Management"
        description={`View and manage all milestones.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "Milestones", isCurrent: true },
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
      <MilestonesSection></MilestonesSection>
    </div>
  );
};
