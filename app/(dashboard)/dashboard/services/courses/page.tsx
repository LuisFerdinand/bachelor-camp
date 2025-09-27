import { CoursesView } from "@/modules/dashboard/ui/views/services/courses/CoursesView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <CoursesView />
    </HydrateClient>
  );
};

export default Page;
