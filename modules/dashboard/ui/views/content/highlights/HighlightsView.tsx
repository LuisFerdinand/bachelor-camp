"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Award,
  Building2,
  ImageIcon,
  PackageIcon,
  PlusIcon,
  Sparkles,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { HighlightsSection } from "../../../sections/content/highlights/HighlightsSection";
import { CreateHighlightModal } from "@/modules/highlights/ui/components/CreateHighlightModal";

export const HighlightsView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreateHighlightModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<Sparkles className="size-4 text-primary" />}
        title="Highlights Management"
        description={`View and manage all highlights.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "Highlights", isCurrent: true },
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
      <HighlightsSection></HighlightsSection>
    </div>
  );
};
