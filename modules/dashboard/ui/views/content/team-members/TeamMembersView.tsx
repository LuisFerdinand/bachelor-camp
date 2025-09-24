"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Landmark, PlusIcon, Users } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { TeamMembersSection } from "../../../sections/content/team-members/TeamMembersSection";
import { CreateTeamMemberModal } from "@/modules/team-members/ui/components/CreateTeamMemberModal";

export const TeamMembersView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreateTeamMemberModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<Users className="size-4 text-primary" />}
        title="Team Members Management"
        description={`View and manage all teamMembers.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "Team Members", isCurrent: true },
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
      <TeamMembersSection></TeamMembersSection>
    </div>
  );
};
