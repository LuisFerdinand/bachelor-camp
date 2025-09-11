import { PillarsView } from "@/modules/dashboard/ui/views/content/pillars/PillarsView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <PillarsView />
    </HydrateClient>
  );
};

export default Page;
