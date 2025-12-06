"use client";
import { trpc } from "@/trpc/client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { UserMenu } from "@/modules/auth/ui/components/UserMenu";
import { ReactSVG } from "react-svg";

export const PageClient = () => {
  const data = trpc.banners.getOne.useSuspenseQuery({ type: "Home" });
  const [categories] = trpc.posts.getCategories.useSuspenseQuery();
  const pillar = [
    {
      id: "123",
      title: "Global Learning",
      subtitle: "Immersive educational experiences worldwide.",
      iconUrl: "https://cdn.jsdelivr.net/npm/lucide-static/icons/globe.svg",
      order: 1,
      isActive: true,
    },
    {
      id: "124",
      title: "Global Learning",
      subtitle: "Immersive educational experiences worldwide.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFsYXJtLWNsb2NrLW9mZi1pY29uIGx1Y2lkZS1hbGFybS1jbG9jay1vZmYiPjxwYXRoIGQ9Ik02Ljg3IDYuODdhOCA4IDAgMSAwIDExLjI2IDExLjI2Ii8+PHBhdGggZD0iTTE5LjkgMTQuMjVhOCA4IDAgMCAwLTkuMTUtOS4xNSIvPjxwYXRoIGQ9Im0yMiA2LTMtMyIvPjxwYXRoIGQ9Ik02LjI2IDE4LjY3IDQgMjEiLz48cGF0aCBkPSJtMiAyIDIwIDIwIi8+PHBhdGggZD0iTTQgNCAyIDYiLz48L3N2Zz4=",
      order: 1,
      isActive: true,
    },
  ];
  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">
          Explore Categories
        </h1>
        {pillar.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <ReactSVG src={p.iconUrl} className="w-6 h-6 text-white" />
          </div>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
                <CardHeader className="flex flex-col items-center text-center">
                  {cat.iconUrl && (
                    <div className="w-14 h-14 mb-3 relative">
                      <Image
                        src={cat.iconUrl}
                        alt={cat.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <CardTitle className="text-lg font-semibold">
                    {cat.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground text-center">
                  {cat.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
