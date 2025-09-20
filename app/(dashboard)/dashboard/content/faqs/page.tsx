import { FAQsView } from "@/modules/dashboard/ui/views/content/faqs/FAQsView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <FAQsView />
    </HydrateClient>
  );
};

export default Page;
