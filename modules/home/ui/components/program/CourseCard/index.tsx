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
import { Clock, TrendingUp, CheckCircle, Star } from "lucide-react";
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
  const isPopular = course.category === "IELTS" || course.level === "ADVANCED";

  return (
    <Card
      className={`border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col ${
        isPopular ? "ring-2 ring-accent-500" : ""
      }`}
    >
      {isPopular && (
        <div className="bg-accent-500 py-1 px-4 text-white text-sm font-medium text-center">
          MOST POPULAR
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{course.name}</CardTitle>
          {isPopular && (
            <Star className="h-5 w-5 text-accent-500 fill-accent-500" />
          )}
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-brand-500 mr-2" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-brand-500 mr-2" />
            <span>{course.totalMeetings} meetings</span>
          </div>
        </div>
        <div className="mb-6">
          <span className="text-2xl font-bold text-brand-600">
            {formatCurrency(course.investment)}
          </span>
        </div>
        <ul className="space-y-2 mb-6 flex-grow">
          {course.goals.slice(0, 4).map((goal, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">{goal}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 mt-auto">
          <Button
            asChild
            variant="outline"
            className={`${
              isPopular
                ? "border-accent-500 text-accent-500 hover:bg-accent-50"
                : "border-brand-500 text-brand-500 hover:bg-brand-50"
            }`}
          >
            <Link href={`/special-program/${course.slug}`}>Learn More</Link>
          </Button>
          <Button
            asChild
            className={`${
              isPopular
                ? "bg-accent-500 hover:bg-accent-600"
                : "bg-brand-500 hover:bg-brand-600"
            }`}
          >
            <Link href={`/booking?course=${course.slug}`}>Book Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
