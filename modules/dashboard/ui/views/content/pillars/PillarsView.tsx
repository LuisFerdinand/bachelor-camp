"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Landmark, PlusIcon } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { PillarsSection } from "../../../sections/content/pillars/PillarsSection";
import { CreatePillarModal } from "@/modules/pillars/ui/components/CreatePillarModal";

export const PillarsView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreatePillarModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<Landmark className="size-4 text-primary" />}
        title="Pillars Management"
        description={`View and manage all pillars.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "Pillars", isCurrent: true },
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
      <PillarsSection></PillarsSection>
    </div>
  );
};
