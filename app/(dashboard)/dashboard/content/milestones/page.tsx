import { MilestonesView } from "@/modules/dashboard/ui/views/content/milestones/MilestonesView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <MilestonesView />
    </HydrateClient>
  );
};

export default Page;
