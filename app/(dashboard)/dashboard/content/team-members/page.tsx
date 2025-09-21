import { TeamMembersView } from "@/modules/dashboard/ui/views/content/team-members/TeamMembersView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <TeamMembersView />
    </HydrateClient>
  );
};

export default Page;
