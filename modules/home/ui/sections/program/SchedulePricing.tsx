"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { getCoursesByCategory } from "@/app/util/bookingData";
import { CourseCategoryTabs } from "@/modules/home/ui/components/program/CourseCategoryTabs";

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

interface SchedulePricingProps {
  categories: string[];
  scheduleMapping: Record<
    string,
    Array<{
      type: string;
      schedule: string;
      duration: string;
    }>
  >;
}

export function SchedulePricing({
  categories,
  scheduleMapping,
}: SchedulePricingProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Category Navigation - same style as CoursesByCategory */}
      <CourseCategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Schedule and Pricing Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {activeCategory} Schedule Options
          </CardTitle>
          <CardDescription>
            Choose the schedule that works best for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduleMapping[activeCategory].map((option, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{option.type}</h4>
                  <Badge className="bg-brand-100 text-brand-800">
                    {option.duration}
                  </Badge>
                </div>
                <div className="flex items-center text-neutral-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{option.schedule}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t">
            <h4 className="font-semibold mb-4">Pricing</h4>
            <div className="bg-gradient-to-r from-brand-50 to-accent-50 rounded-lg p-6">
              <div className="space-y-3">
                {getCoursesByCategory(activeCategory as any).map((course) => (
                  <div
                    key={course.id}
                    className="flex justify-between items-center"
                  >
                    <span>{course.name}</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(course.investment)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
