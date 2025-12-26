import "server-only";
import { headers } from "next/headers";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";

import { createCallerFactory, createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter, type AppRouter } from "./routers/_app";

export const getQueryClient = cache(makeQueryClient);

const caller = createCallerFactory(appRouter)(async () =>
  createTRPCContext({
    headers: await headers(), // ✅ THIS IS THE FIX
  })
);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);
