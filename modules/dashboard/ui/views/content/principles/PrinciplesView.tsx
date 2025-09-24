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
import { PrinciplesSection } from "../../../sections/content/principles/PrinciplesSection";
import { CreatePrincipleModal } from "@/modules/principles/ui/components/CreatePrincipleModal";

export const PrinciplesView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreatePrincipleModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<Quote className="size-4 text-primary" />}
        title="Principles Management"
        description={`View and manage all principles.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "Principles", isCurrent: true },
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
      <PrinciplesSection></PrinciplesSection>
    </div>
  );
};
