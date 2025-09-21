import { BannersView } from "@/modules/dashboard/ui/views/content/banners/BannersView";
import { HomePage } from "@/modules/home/ui/pages/home";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: { companyId: string } }) => {
  return (
    <HydrateClient>
      <HomePage />
    </HydrateClient>
  );
};

export default Page;
