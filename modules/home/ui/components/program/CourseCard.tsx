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
    <Card className="group relative h-full bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-electric-500 transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Gradient accent line on top */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          course.isPopular
            ? "bg-gradient-to-r from-accent-500 via-electric-500 to-accent-500"
            : "bg-electric-500"
        }`}
      />

      {/* Popular indicator */}
      {course.isPopular && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-accent-500 to-yellow-400 text-brand-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            ⭐ Popular
          </div>
        </div>
      )}

      <CardHeader className="pb-4 pt-6">
        <div className="flex items-start justify-between mb-3">
          <Badge
            variant="secondary"
            className="bg-electric-500/10 text-electric-500 border border-electric-500/20 text-xs font-semibold"
          >
            {course.level}
          </Badge>
        </div>

        <CardTitle className="text-xl font-bold text-brand-600 line-clamp-2 mb-2 group-hover:text-electric-500 transition-colors">
          {course.name}
        </CardTitle>

        <CardDescription className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col h-full pt-0">
        {/* Course meta info */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-electric-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-electric-500" />
            <span>{course.totalMeetings} sessions</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-1">Investment</div>
          <div
            className={`text-2xl font-bold ${
              course.isPopular
                ? "bg-gradient-to-r from-accent-500 to-yellow-500 bg-clip-text text-transparent"
                : "text-brand-600"
            }`}
          >
            {formatCurrency(course.investment)}
          </div>
        </div>

        {/* Key benefits */}
        <div className="mb-6 flex-grow">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            What You'll Get
          </div>
          <ul className="space-y-2">
            {course.goals.slice(0, 3).map((goal, index) => (
              <li key={index} className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 text-electric-500 flex-shrink-0 mt-0.5 mr-2" />
                <span className="text-gray-700 line-clamp-1">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 mt-auto">
          <Button
            asChild
            className={`w-full font-semibold border-none shadow-md hover:shadow-lg transition-all ${
              course.isPopular
                ? "bg-gradient-to-r from-accent-500 to-yellow-400 hover:from-accent-600 hover:to-yellow-500 text-brand-600"
                : "bg-brand-600 hover:bg-electric-500 text-white"
            }`}
          >
            <Link href={`/program-booking?course=${course.slug}`}>
              Enroll Now →
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full text-gray-600 hover:text-electric-500 hover:bg-electric-500/5 border border-transparent hover:border-electric-500/20"
          >
            <Link href={`/special-program/${course.slug}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
