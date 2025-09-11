"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Award, ImageIcon, PackageIcon, PlusIcon } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { AccreditationsSection } from "../../../sections/content/accreditations/AccreditationsSection";
import { CreateAccreditationModal } from "@/modules/accreditations/ui/components/CreateAccreditationModal";

export const AccreditationsView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreateAccreditationModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<Award className="size-4 text-primary" />}
        title="Accreditations Management"
        description={`View and manage all accreditations.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "Accreditations", isCurrent: true },
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
      <AccreditationsSection></AccreditationsSection>
    </div>
  );
};
