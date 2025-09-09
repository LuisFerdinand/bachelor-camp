"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { Course } from "@/app/util/bookingData";

interface CourseDetailsTabsProps {
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

export function CourseDetailsTabs({ course }: CourseDetailsTabsProps) {
  return (
    <Tabs defaultValue="learning-method" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="learning-method">Learning Method</TabsTrigger>
        <TabsTrigger value="target-audience">Target Audience</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
      </TabsList>
      <TabsContent value="learning-method">
        <Card>
          <CardHeader>
            <CardTitle>Learning Method</CardTitle>
            <CardDescription>
              How we deliver our {course.name} program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {course.learningMethod.map((method, index) => (
                <li
                  key={index}
                  className="flex items-start p-4 bg-neutral-50 rounded-lg"
                >
                  <div className="bg-brand-100 p-2 rounded-full mr-4">
                    <BookOpen className="h-5 w-5 text-brand-600" />
                  </div>
                  <span>{method}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="target-audience">
        <Card>
          <CardHeader>
            <CardTitle>Target Audience</CardTitle>
            <CardDescription>Who should take this course</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {course.targetAudience.map((audience, index) => (
                <li
                  key={index}
                  className="flex items-start p-4 bg-neutral-50 rounded-lg"
                >
                  <div className="bg-brand-100 p-2 rounded-full mr-4">
                    <Users className="h-5 w-5 text-brand-600" />
                  </div>
                  <span>{audience}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="pricing">
        <Card>
          <CardHeader>
            <CardTitle>Course Pricing</CardTitle>
            <CardDescription>
              Transparent pricing with no hidden fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-brand-50 to-accent-50 rounded-xl p-8 text-center">
              <div className="text-3xl font-bold text-brand-600 mb-2">
                {formatCurrency(course.investment)}
              </div>
              <p className="text-neutral-600 mb-6">
                One-time payment for the entire {course.duration} program
              </p>
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {course.totalMeetings}
                  </div>
                  <div className="text-sm text-neutral-600">Total Meetings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{course.duration}</div>
                  <div className="text-sm text-neutral-600">Duration</div>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-brand-500 hover:bg-brand-600"
              >
                <Link href={`/booking?course=${course.slug}`}>Book Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
