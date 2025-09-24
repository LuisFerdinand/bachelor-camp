import { PrinciplesView } from "@/modules/dashboard/ui/views/content/principles/PrinciplesView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <PrinciplesView />
    </HydrateClient>
  );
};

export default Page;
