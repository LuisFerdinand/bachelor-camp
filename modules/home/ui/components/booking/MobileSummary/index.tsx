"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Users } from "lucide-react";
import {
  formatCurrency,
  calculateTotal,
  getSelectedWeeks,
} from "@/modules/home/ui/utils/booking";
import { Building, Course } from "@/app/util/bookingData";

interface MobileSummaryProps {
  selectedBuilding: Building | null;
  selectedCourse: Course | null;
  selectedPricing: Building["pricing"][0] | null;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  personCount: number;
  courseSlug: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSummary({
  selectedBuilding,
  selectedCourse,
  selectedPricing,
  selectedStartDate,
  selectedEndDate,
  personCount,
  courseSlug,
  isOpen,
  onClose,
}: MobileSummaryProps) {
  const total = calculateTotal(
    selectedCourse,
    selectedPricing,
    personCount,
    () => getSelectedWeeks(selectedStartDate, selectedEndDate)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Summary Content */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-neutral-900">
              Booking Summary
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1 h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Summary Content */}
          <div className="space-y-6">
            {/* Building Summary */}
            <div>
              <h4 className="font-semibold mb-2 text-neutral-800">Building</h4>
              {selectedBuilding ? (
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <div className="font-medium text-neutral-900">
                    {selectedBuilding.name}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {selectedBuilding.description}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-neutral-500">
                  No building selected
                </div>
              )}
            </div>

            {/* Program Summary */}
            <div>
              <h4 className="font-semibold mb-2 text-neutral-800">
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
                  <div className="font-bold text-blue-600 mt-1">
                    Rp {selectedCourse.investment.toLocaleString("id-ID")}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-neutral-500">
                  No program selected
                </div>
              )}
            </div>

            {/* Duration Summary */}
            <div>
              <h4 className="font-semibold mb-2 text-neutral-800">
                Study Period
              </h4>
              {selectedStartDate && selectedEndDate ? (
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <div className="font-medium text-neutral-900">
                    {selectedStartDate.toLocaleDateString()} -{" "}
                    {selectedEndDate.toLocaleDateString()}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {getSelectedWeeks(selectedStartDate, selectedEndDate)} weeks
                    duration
                  </div>
                </div>
              ) : selectedStartDate ? (
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <div className="font-medium text-neutral-900">
                    Start: {selectedStartDate.toLocaleDateString()}
                  </div>
                  <div className="text-sm text-neutral-600">
                    Select end date
                  </div>
                </div>
              ) : (
                <div className="text-sm text-neutral-500">
                  No dates selected
                </div>
              )}
            </div>

            {/* Accommodation Summary */}
            <div>
              <h4 className="font-semibold mb-2 text-neutral-800">
                Accommodation
              </h4>
              {selectedPricing ? (
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
                    Rp{" "}
                    {(
                      selectedPricing.numericPrice * personCount
                    ).toLocaleString("id-ID")}
                    /month
                  </div>
                </div>
              ) : (
                <div className="text-sm text-neutral-500">
                  No accommodation selected
                </div>
              )}
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-neutral-200">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-neutral-900">
                  Total
                </span>
                <span className="font-bold text-xl text-blue-600">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Book Button */}
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3"
              size="lg"
              disabled={
                !selectedBuilding ||
                !selectedCourse ||
                !selectedPricing ||
                !selectedStartDate ||
                !selectedEndDate
              }
            >
              Proceed to Checkout
            </Button>
            <div className="text-xs text-neutral-500 text-center">
              By proceeding, you agree to our Terms of Service and Privacy
              Policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
