"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, X } from "lucide-react";
import type { Course } from "@/app/util/bookingData";

interface ProgramStartMonthSelectorProps {
  selectedCourse: Course | null;
  selectedStartMonth: { month: string; year: number } | null;
  onStartMonthSelect: (startMonth: { month: string; year: number }) => void;
}

export function ProgramStartMonthSelector({
  selectedCourse,
  selectedStartMonth,
  onStartMonthSelect,
}: ProgramStartMonthSelectorProps) {
  if (!selectedCourse) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-neutral-900">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Select Start Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">
              Please select a program first to view available start months
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-neutral-900">
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          Select Start Month
        </CardTitle>
        <p className="text-sm text-neutral-600">
          Choose when you want to start the {selectedCourse.name} program
        </p>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-neutral-900 mb-2">
            {selectedCourse.name}
          </h4>
          <p className="text-sm text-neutral-600 mb-2">
            Duration: {selectedCourse.duration}
          </p>
          <p className="text-sm text-neutral-600">
            Investment: Rp {selectedCourse.investment.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {selectedCourse.availableStartMonths.map((monthOption) => {
            const isSelected =
              selectedStartMonth?.month === monthOption.month &&
              selectedStartMonth?.year === monthOption.year;

            return (
              <Card
                key={`${monthOption.month}-${monthOption.year}`}
                className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg ${
                  !monthOption.available
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => {
                  if (monthOption.available) {
                    onStartMonthSelect({
                      month: monthOption.month,
                      year: monthOption.year,
                    });
                  }
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-grow">
                      <h4 className="font-semibold text-neutral-900">
                        {monthOption.month}
                      </h4>
                      <p className="text-sm text-neutral-600">
                        {monthOption.year}
                      </p>
                    </div>
                    {!monthOption.available && (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    {isSelected && monthOption.available && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>

                  <Badge
                    className={
                      monthOption.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {monthOption.available ? "Available" : "Full"}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedStartMonth && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-neutral-900 mb-2">
              Selected Start Date
            </h4>
            <p className="text-neutral-600">
              Your program will start in{" "}
              <strong>
                {selectedStartMonth.month} {selectedStartMonth.year}
              </strong>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
