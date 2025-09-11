import { LocationsView } from "@/modules/dashboard/ui/views/content/locations/LocationsView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <LocationsView />
    </HydrateClient>
  );
};

export default Page;
