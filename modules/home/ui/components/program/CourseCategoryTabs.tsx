"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface CourseCategoryTabsProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function CourseCategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}: CourseCategoryTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          onClick={() => setActiveCategory(category)}
          className={`px-6 py-2 transition-all duration-200 border-none focus:outline-none ${
            activeCategory === category
              ? "bg-brand-500 hover:bg-brand-600 text-white"
              : "border-brand-500 text-brand-500 hover:bg-brand-50"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
