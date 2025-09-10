// modules/home/ui/components/program-detail/CourseCTA/index.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Course } from "@/app/util/bookingData";

interface CourseCTAProps {
  course: Course;
}

export function CourseCTA({ course }: CourseCTAProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 to-accent-900/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Enroll in This Program?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
            Take the next step in your English learning journey. Reserve your
            spot today and start achieving your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-600 hover:bg-neutral-100 shadow-xl font-semibold px-8 py-4 text-base"
            >
              <Link href={`/booking?course=${course.slug}`}>Book Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-semibold px-8 py-4 text-base transition-all"
            >
              <Link href="/special-program">
                <BookOpen className="w-5 h-5 mr-2" />
                View Other Programs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
