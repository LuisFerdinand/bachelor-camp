import { FeaturedFacilitiesView } from "@/modules/dashboard/ui/views/content/featured-facilities/FeaturedFacilitiesView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <FeaturedFacilitiesView />
    </HydrateClient>
  );
};

export default Page;
