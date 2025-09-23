"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Home, BookOpen } from "lucide-react";
import {
  type Building,
  type Course,
  BookingType,
  calculateAccommodationOnlyPrice,
  calculateProgramOnlyPrice,
  calculateProgramWithAccommodationPrice,
} from "@/app/util/bookingData";
import { formatCurrency, getBookingTypeLabel } from "@/app/util/bookingUtils";

interface BookingSummaryProps {
  selectedBuilding: Building | null;
  selectedCourse: Course | null;
  selectedPricing: Building["pricing"][0] | null;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  personCount: number;
  courseSlug: string | null;
  bookingType?: BookingType | null;
  selectedStartMonth?: { month: string; year: number } | null;
}

// Helper function to calculate duration in months from course duration string
function calculateDurationInMonths(duration: string): number {
  if (duration.includes("Bulan")) {
    const months = Number.parseInt(duration.split(" ")[0]);
    return months;
  } else if (duration.includes("Minggu")) {
    const weeks = Number.parseInt(duration.split(" ")[0]);
    return Math.ceil(weeks / 4); // Convert weeks to months (round up)
  }
  return 1; // Default to 1 month minimum
}

export function BookingSummary({
  selectedBuilding,
  selectedCourse,
  selectedPricing,
  personCount,
  courseSlug,
  bookingType,
  selectedStartMonth,
}: BookingSummaryProps) {
  const calculateTotal = (): number => {
    if (!bookingType) return 0;

    switch (bookingType) {
      case BookingType.ACCOMMODATION_ONLY:
        if (selectedBuilding && selectedPricing) {
          return calculateAccommodationOnlyPrice(
            selectedBuilding,
            selectedPricing,
            personCount
          );
        }
        break;

      case BookingType.PROGRAM_ONLY:
        if (selectedCourse) {
          return calculateProgramOnlyPrice(selectedCourse);
        }
        break;

      case BookingType.PROGRAM_WITH_ACCOMMODATION:
        if (selectedBuilding && selectedCourse && selectedPricing) {
          return calculateProgramWithAccommodationPrice(
            selectedBuilding,
            selectedCourse,
            selectedPricing,
            personCount
          );
        }
        break;
    }

    return 0;
  };

  const total = calculateTotal();

  return (
    <Card className="border-0 shadow-lg sticky top-24">
      <CardHeader>
        <CardTitle className="text-neutral-900">Booking Summary</CardTitle>
        {bookingType && (
          <Badge className="w-fit bg-blue-100 text-blue-800">
            {getBookingTypeLabel(bookingType)}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Booking Type Summary */}
        {bookingType && (
          <div>
            <h4 className="font-semibold mb-2 text-neutral-800">
              Booking Type
            </h4>
            <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
              <div className="font-medium text-neutral-900">
                {getBookingTypeLabel(bookingType)}
              </div>
              <div className="text-sm text-neutral-600">
                {bookingType === BookingType.ACCOMMODATION_ONLY &&
                  "Accommodation with flexible room arrangement"}
                {bookingType === BookingType.PROGRAM_ONLY &&
                  "Program only, no accommodation"}
                {bookingType === BookingType.PROGRAM_WITH_ACCOMMODATION &&
                  "Complete package with program and accommodation"}
              </div>
            </div>
          </div>
        )}

        {/* Program Summary */}
        {(selectedCourse ||
          bookingType === BookingType.PROGRAM_ONLY ||
          bookingType === BookingType.PROGRAM_WITH_ACCOMMODATION) && (
          <div>
            <h4 className="font-semibold mb-2 text-neutral-800 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Program
              {courseSlug && selectedCourse && (
                <Badge className="ml-2 bg-blue-100 text-blue-800">
                  Pre-selected
                </Badge>
              )}
            </h4>
            {selectedCourse ? (
              <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                <div className="font-medium text-neutral-900">
                  {selectedCourse.name}
                </div>
                <div className="text-sm text-neutral-600">
                  {selectedCourse.category} - {selectedCourse.level}
                </div>
                <div className="text-sm text-neutral-600 mt-1">
                  Duration: {selectedCourse.duration}
                </div>
                <div className="font-bold text-blue-600 mt-1">
                  {formatCurrency(selectedCourse.investment)}
                </div>
              </div>
            ) : (
              <div className="text-sm text-neutral-500">
                No program selected
              </div>
            )}
          </div>
        )}

        {/* Start Month Summary */}
        {selectedStartMonth &&
          (bookingType === BookingType.PROGRAM_ONLY ||
            bookingType === BookingType.PROGRAM_WITH_ACCOMMODATION) && (
            <div>
              <h4 className="font-semibold mb-2 text-neutral-800 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Start Month
              </h4>
              <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                <div className="font-medium text-neutral-900">
                  {selectedStartMonth.month} {selectedStartMonth.year}
                </div>
                <div className="text-sm text-neutral-600">
                  Program start date
                </div>
              </div>
            </div>
          )}

        {/* Accommodation Summary */}
        {(selectedBuilding ||
          bookingType === BookingType.ACCOMMODATION_ONLY ||
          bookingType === BookingType.PROGRAM_WITH_ACCOMMODATION) && (
          <div>
            <h4 className="font-semibold mb-2 text-neutral-800 flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Accommodation
            </h4>
            {selectedBuilding ? (
              <div className="space-y-3">
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <div className="font-medium text-neutral-900">
                    {selectedBuilding.name}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {selectedBuilding.description}
                  </div>
                </div>

                {selectedPricing && (
                  <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                    <div className="font-medium text-neutral-900">
                      {selectedPricing.type}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {selectedPricing.description}
                    </div>
                    <div className="flex items-center text-sm text-neutral-600 mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{personCount} persons</span>
                    </div>
                    <div className="font-bold text-blue-600 mt-1">
                      {bookingType === BookingType.ACCOMMODATION_ONLY ? (
                        <>
                          {formatCurrency(
                            selectedPricing.numericPrice * personCount
                          )}
                          <span className="text-xs">/month</span>
                        </>
                      ) : (
                        <>
                          {formatCurrency(
                            selectedPricing.numericPrice * personCount
                          )}
                          <span className="text-xs">/month</span>
                          {selectedCourse && (
                            <div className="text-xs text-neutral-500">
                              ×{" "}
                              {calculateDurationInMonths(
                                selectedCourse.duration
                              )}{" "}
                              months
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-neutral-500">
                No accommodation selected
              </div>
            )}
          </div>
        )}

        {/* Total */}
        <div className="pt-4 border-t border-neutral-200">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-neutral-900">Total</span>
            <span className="font-bold text-xl text-blue-600">
              {formatCurrency(total)}
              {bookingType === BookingType.ACCOMMODATION_ONLY && (
                <span className="text-sm font-normal">/month</span>
              )}
            </span>
          </div>
          {bookingType === BookingType.ACCOMMODATION_ONLY && (
            <div className="text-xs text-neutral-500 mt-1">
              Monthly rate - Admin will arrange room assignments
            </div>
          )}
        </div>

        {/* Book Button */}
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3"
          size="lg"
          disabled={!bookingType || total === 0}
        >
          Proceed to Checkout
        </Button>
        <div className="text-xs text-neutral-500 text-center">
          By proceeding, you agree to our Terms of Service and Privacy Policy.
        </div>
      </CardContent>
    </Card>
  );
}
