"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import type { Building } from "@/app/util/buildingData";
import {
  formatDate,
  isDateAvailable,
  isDateInRange,
  getDaysInMonth,
  getFirstDayOfMonth,
  getSelectedWeeks,
  getSelectedMonths,
  calculateAccommodationDurationPrice,
} from "@/modules/home/ui/utils/booking";

interface DurationSelectionProps {
  selectedBuilding: Building | null;
  selectedPricing: Building["pricing"][0] | null;
  personCount: number;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  currentMonth: Date;
  availabilityData: Record<string, { capacity: number }>;
  onDateClick: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

export function DurationSelection({
  selectedBuilding,
  selectedPricing,
  personCount,
  selectedStartDate,
  selectedEndDate,
  currentMonth,
  availabilityData,
  onDateClick,
  onMonthChange,
}: DurationSelectionProps) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calculateTotalPrice = (): number => {
    if (
      !selectedPricing ||
      !selectedStartDate ||
      !selectedEndDate ||
      !personCount
    ) {
      return 0;
    }
    return calculateAccommodationDurationPrice(
      selectedPricing,
      personCount,
      selectedStartDate,
      selectedEndDate
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const today = new Date();
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const dateStr = formatDate(date);
      const isAvailable = isDateAvailable(date, availabilityData);
      const isSelected = isDateInRange(
        date,
        selectedStartDate,
        selectedEndDate
      );
      const isPast = date < today;
      const capacity = availabilityData[dateStr]?.capacity || 0;

      days.push(
        <div
          key={day}
          onClick={() =>
            !isPast &&
            isAvailable &&
            selectedBuilding &&
            selectedPricing &&
            onDateClick(date)
          }
          className={`
            h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all relative
            ${isPast ? "text-neutral-300 cursor-not-allowed" : ""}
            ${
              !isPast && isAvailable && selectedBuilding && selectedPricing
                ? "hover:bg-blue-100"
                : ""
            }
            ${
              !isPast && !isAvailable
                ? "text-neutral-400 cursor-not-allowed bg-neutral-100"
                : ""
            }
            ${
              !selectedBuilding || !selectedPricing
                ? "cursor-not-allowed text-neutral-400"
                : ""
            }
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${
              selectedStartDate && formatDate(selectedStartDate) === dateStr
                ? "ring-2 ring-blue-600"
                : ""
            }
            ${
              selectedEndDate && formatDate(selectedEndDate) === dateStr
                ? "ring-2 ring-blue-600"
                : ""
            }
          `}
        >
          {day}
          {!isPast && isAvailable && capacity <= 3 && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
          )}
          {!isPast && !isAvailable && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-neutral-900">
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          Select Your Stay Duration
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedBuilding || !selectedPricing ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">
              Select accommodation and room type to view available dates
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-neutral-900">
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </h4>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onMonthChange(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1
                      )
                    )
                  }
                  className="border-neutral-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onMonthChange(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1
                      )
                    )
                  }
                  className="border-neutral-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-lg border border-neutral-200 p-4">
              {/* Week day headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-neutral-600 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                <span>Selected Period</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-neutral-100 rounded mr-2 relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                </div>
                <span>Limited Availability</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-neutral-100 rounded mr-2 relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
                <span>Unavailable</span>
              </div>
            </div>

            {/* Selected dates display */}
            {selectedStartDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">
                  Selected Stay Period
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-neutral-600">
                      Check-in Date
                    </div>
                    <div className="font-medium">
                      {selectedStartDate.toLocaleDateString()}
                    </div>
                  </div>
                  {selectedEndDate ? (
                    <>
                      <div className="text-neutral-400">→</div>
                      <div>
                        <div className="text-sm text-neutral-600">
                          Check-out Date
                        </div>
                        <div className="font-medium">
                          {selectedEndDate.toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-600">Duration</div>
                        <div className="font-medium">
                          {getSelectedWeeks(selectedStartDate, selectedEndDate)}{" "}
                          weeks (
                          {getSelectedMonths(
                            selectedStartDate,
                            selectedEndDate
                          )}{" "}
                          months)
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-neutral-500">
                      Select check-out date
                    </div>
                  )}
                </div>

                {selectedEndDate && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-neutral-600">
                          Total Accommodation Cost
                        </div>
                        <div className="text-xs text-neutral-500">
                          {selectedPricing.type} × {personCount} persons ×{" "}
                          {getSelectedMonths(
                            selectedStartDate,
                            selectedEndDate
                          )}{" "}
                          months
                        </div>
                      </div>
                      <div className="font-bold text-blue-600 text-lg">
                        Rp {calculateTotalPrice().toLocaleString("id-ID")}
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500 mt-2">
                      * Admin will arrange room assignments based on
                      availability
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
