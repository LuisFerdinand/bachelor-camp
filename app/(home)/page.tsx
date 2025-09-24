import { HomePage } from "@/modules/home/ui/pages/home";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <HomePage />
    </HydrateClient>
  );
};

export default Page;
