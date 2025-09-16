import { TestimonialsView } from "@/modules/dashboard/ui/views/content/testimonials/TestimonialsView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.testimonials.getAllCategories.prefetch();
  return (
    <HydrateClient>
      <TestimonialsView />
    </HydrateClient>
  );
};

export default Page;
