"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, FileText, Award } from "lucide-react";
import { Course } from "@/app/util/bookingData";

interface CourseOverviewProps {
  course: Course;
}

export function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Target className="h-5 w-5 text-brand-500 mr-2" />
            Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {course.goals.map((goal, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{goal}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <FileText className="h-5 w-5 text-brand-500 mr-2" />
            Syllabus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {course.syllabus.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 mt-2 flex-shrink-0"></div>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Award className="h-5 w-5 text-brand-500 mr-2" />
            Facilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {course.facilities.map((facility, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{facility}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
