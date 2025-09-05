"use client";
import { trpc } from "@/trpc/client";
import React from "react";

export const PageClient = () => {
  const data = trpc.banners.getMany.useSuspenseQuery();
  return <div>{JSON.stringify(data)}</div>;
};
