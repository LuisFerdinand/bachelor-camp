"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
}

export function HeroSection({
  backgroundImage,
  title,
  subtitle,
}: HeroSectionProps) {
  return (
    <section
      className="relative py-20 md:py-32 min-h-[60vh] flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 shadow-lg"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
