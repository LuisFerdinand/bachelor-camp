"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { HelpCircle, ImageIcon, PackageIcon, PlusIcon } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { FAQsSection } from "../../../sections/content/faqs/FAQsSection";
// import { CreateFAQModal } from "@/modules/FAQs/ui/components/CreateFAQModal";

export const FAQsView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      {/* <CreateFAQModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      /> */}
      <PageHeader
        icon={<HelpCircle className="size-4 text-primary" />}
        title="FAQs Management"
        description={`View and manage all FAQs.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "FAQs", isCurrent: true },
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
      <FAQsSection></FAQsSection>
    </div>
  );
};
