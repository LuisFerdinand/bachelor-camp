"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Calendar,
  TrendingUp,
  Star,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Course } from "@/app/util/bookingData";

interface CourseDetailHeaderProps {
  course: Course;
}

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function CourseDetailHeader({ course }: CourseDetailHeaderProps) {
  const isPopular = course.category === "IELTS" || course.level === "ADVANCED";

  return (
    <div className="relative bg-gradient-to-r from-brand-600 to-accent-500 py-16 md:py-24">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/special-program"
            className="inline-flex items-center text-white mb-6 hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Programs
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className="bg-white/20 text-white border border-white/30">
              {course.category}
            </Badge>
            <Badge className="bg-white/20 text-white border border-white/30">
              {course.level}
            </Badge>
            {isPopular && (
              <Badge className="bg-accent-500 text-white">
                <Star className="w-3 h-3 mr-1 fill-current" />
                MOST POPULAR
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {course.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center text-white">
              <Clock className="h-5 w-5 mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center text-white">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{course.totalMeetings} meetings</span>
            </div>
            <div className="flex items-center text-white">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span>{formatCurrency(course.investment)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="text-white bg-brand-600 hover:bg-brand-500 shadow-xl font-semibold px-8 py-4 text-base border-none"
            >
              <Link href={`/program-booking?course=${course.slug}`}>
                Book Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-accent-500 text-accent-500 bg-white/10 hover:bg-white/10 backdrop-blur-sm hover:text-accent-600 hover:border-accent-600 font-semibold px-8 py-4 text-base transition-all"
            >
              <Link href="/special-program">
                <BookOpen className="w-5 h-5 mr-2" />
                View Other Programs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
