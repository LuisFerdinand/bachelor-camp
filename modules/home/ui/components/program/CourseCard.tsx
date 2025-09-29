"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Course {
  id: number;
  name: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  totalMeetings: number;
  investment: number;
  goals: string[];
  slug: string;
  isPopular: boolean;
}

interface CourseCardProps {
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

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="group relative h-full bg-white border border-neutral-100 shadow-sm hover:shadow-lg hover:border-neutral-200 transition-all duration-300 overflow-hidden">
      {/* Popular indicator */}
      {course.isPopular && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-accent-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            Popular
          </div>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <Badge
            variant="secondary"
            className="bg-neutral-100 text-neutral-700 border-0 text-xs font-medium"
          >
            {course.level}
          </Badge>
        </div>

        <CardTitle className="text-lg font-bold text-neutral-900 line-clamp-2 mb-2">
          {course.name}
        </CardTitle>

        <CardDescription className="text-neutral-600 text-sm line-clamp-2 leading-relaxed">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col h-full pt-0">
        {/* Course meta info */}
        <div className="flex items-center gap-4 mb-6 text-sm text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{course.totalMeetings} sessions</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div
            className={`text-2xl font-bold ${
              course.isPopular ? "text-accent-600" : "text-brand-600"
            }`}
          >
            {formatCurrency(course.investment)}
          </div>
        </div>

        {/* Key benefits - simplified */}
        <div className="mb-6 flex-grow">
          <ul className="space-y-2">
            {course.goals.slice(0, 3).map((goal, index) => (
              <li key={index} className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-success-500 flex-shrink-0 mt-0.5 mr-2" />
                <span className="text-neutral-600 line-clamp-1">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 mt-auto">
          <Button
            asChild
            className={`w-full font-medium border-none focuse-none ${
              course.isPopular
                ? "bg-accent-600 hover:bg-accent-700"
                : "bg-brand-600 hover:bg-brand-700"
            } text-white shadow-sm`}
          >
            <Link href={`/booking?course=${course.slug}`}>Enroll Now</Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
          >
            <Link href={`/special-program/${course.slug}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
