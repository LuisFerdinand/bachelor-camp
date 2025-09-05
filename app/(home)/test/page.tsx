import React, { Suspense } from "react";
import { HydrateClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { PageClient } from "./client";

const Test = () => {
  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading</p>}></Suspense>
      <ErrorBoundary fallback={<p>Error</p>}>
        <PageClient></PageClient>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Test;
