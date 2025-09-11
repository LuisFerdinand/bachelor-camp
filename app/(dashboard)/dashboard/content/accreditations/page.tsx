import { AccreditationsView } from "@/modules/dashboard/ui/views/content/accreditations/AccreditationsView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <AccreditationsView />
    </HydrateClient>
  );
};

export default Page;
