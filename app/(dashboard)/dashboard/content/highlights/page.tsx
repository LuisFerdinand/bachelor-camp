import { HighlightsView } from "@/modules/dashboard/ui/views/content/highlights/HighlightsView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <HighlightsView />
    </HydrateClient>
  );
};

export default Page;
