import { SocialMediasView } from "@/modules/dashboard/ui/views/content/socialMedias/SocialMediasView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <SocialMediasView />
    </HydrateClient>
  );
};

export default Page;
