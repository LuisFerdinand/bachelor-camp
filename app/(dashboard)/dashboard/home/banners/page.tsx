import { BannersView } from "@/modules/dashboard/ui/views/home/BannersView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: { companyId: string } }) => {
  const { companyId } = await params;

  return (
    <HydrateClient>
      <BannersView />
    </HydrateClient>
  );
};

export default Page;
