import { FacilitiesView } from "@/modules/dashboard/ui/views/services/facilities/FacilitiesView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <FacilitiesView />
    </HydrateClient>
  );
};

export default Page;
