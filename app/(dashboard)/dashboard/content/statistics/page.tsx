import { StatisticsView } from "@/modules/dashboard/ui/views/content/statistics/StatisticsView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <StatisticsView />
    </HydrateClient>
  );
};

export default Page;
