"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { user as users, Clock, Star, CheckCircle, BookOpen } from "lucide-react";
import type { Course, Building } from "@/app/util/bookingData";

interface ProgramSelectionProps {
  selectedBuilding: Building | null;
  suitableCourses: Course[];
  selectedCourse: Course | null;
  courseSlug: string | null;
  onCourseSelect: (course: Course) => void;
  onResetCourse: () => void;
}

export function ProgramSelection({
  selectedBuilding,
  suitableCourses,
  selectedCourse,
  courseSlug,
  onCourseSelect,
  onResetCourse,
}: ProgramSelectionProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-neutral-900">
          <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
          Select Your Program
        </CardTitle>
      </CardHeader>
      <CardContent>
        <>
          {courseSlug && selectedCourse && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-800">
                  Pre-selected Program
                </h3>
                <p className="text-sm text-blue-700">
                  You&apos;ve selected {selectedCourse.name} from the program
                  page
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={onResetCourse}>
                Change
              </Button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suitableCourses.map((course) => (
              <Card
                key={course.id}
                className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg flex flex-col h-full ${
                  selectedCourse?.id === course.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => onCourseSelect(course)}
              >
                <CardContent className="p-5 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-neutral-900">
                      {course.name}
                    </h4>
                    {selectedCourse?.id === course.id && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">
                    {course.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-neutral-600">
                      <Clock className="h-4 w-4 mr-2 text-neutral-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <Star className="h-4 w-4 mr-2 text-neutral-500" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <Users className="h-4 w-4 mr-2 text-neutral-500" />
                      <span>{course.totalMeetings} meetings</span>
                    </div>
                  </div>
                  <div className="font-bold text-blue-600 mt-auto">
                    Rp {course.investment.toLocaleString("id-ID")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      </CardContent>
    </Card>
  );
}
