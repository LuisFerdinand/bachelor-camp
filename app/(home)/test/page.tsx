export const dynamic = "force-dynamic";
import React, { Suspense } from "react";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { PageClient } from "./client";

const Test = () => {
  void trpc.banners.getOne.prefetch({ type: "Home" });
  void trpc.posts.getCategories.prefetch();
  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error loading banners</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};

export default Test;
