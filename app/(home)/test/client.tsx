"use client";
import { trpc } from "@/trpc/client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { AuthButton } from "@/modules/auth/ui/components/UserMenu";

export const PageClient = () => {
  const data = trpc.banners.getMany.useSuspenseQuery({ type: "Home" });
  const [categories] = trpc.posts.getCategories.useSuspenseQuery();
  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">
          Explore Categories
        </h1>

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
      <AuthButton></AuthButton>
    </>
  );
};
