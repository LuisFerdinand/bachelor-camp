"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone } from "lucide-react";

interface Season {
  months: string[];
  status: string;
  color: string;
  description: string;
  icon: string;
}

interface SeasonalCalendarProps {
  seasons: Season[];
  allMonths: string[];
}

export function SeasonalCalendar({
  seasons,
  allMonths,
}: SeasonalCalendarProps) {
  // Function to get season status for a month
  const getSeasonForMonth = (month: string) => {
    for (const season of seasons) {
      if (season.months.includes(month)) {
        return season;
      }
    }
    return null;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-brand-50/50 to-accent-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
            <Calendar className="w-4 h-4 mr-2" />
            Booking Calendar
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900">
            Seasonal Availability
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Plan your stay according to our seasonal calendar. Book early during
            peak seasons for guaranteed availability.
          </p>
        </div>
        {/* Calendar Grid */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-100">
            {/* Calendar Header */}
            <div className="grid grid-cols-12 gap-1 mb-2">
              {allMonths.map((month, index) => (
                <div
                  key={index}
                  className="text-center text-sm font-medium text-neutral-500 p-2"
                >
                  {month.substring(0, 3)}
                </div>
              ))}
            </div>
            {/* Calendar Body */}
            <div className="grid grid-cols-12 gap-1">
              {allMonths.map((month, index) => {
                const season = getSeasonForMonth(month);
                return (
                  <div
                    key={index}
                    className={`min-h-16 rounded-lg flex flex-col items-center justify-center p-2 text-sm font-medium ${
                      season?.status === "Peak Season"
                        ? "bg-red-50 border border-red-200 text-red-800"
                        : season?.status === "Medium Season"
                        ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
                        : "bg-green-50 border border-green-200 text-green-800"
                    }`}
                  >
                    <div className="text-xs opacity-80">
                      {month.substring(0, 3)}
                    </div>
                    <div className="text-xs font-semibold mt-1">
                      {season?.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Season Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {seasons.map((season, index) => (
            <Card
              key={index}
              className="border border-neutral-200 shadow-sm bg-white"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      season.status === "Peak Season"
                        ? "bg-red-500"
                        : season.status === "Medium Season"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <CardTitle className="text-base">{season.status}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-neutral-600 mb-2">
                  <span className="font-medium">Months:</span>{" "}
                  {season.months.join(", ")}
                </div>
                <p className="text-sm text-neutral-600">{season.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-brand-100 to-accent-100 rounded-2xl p-8 max-w-3xl mx-auto border border-brand-200">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="font-bold text-brand-800 mb-3 text-xl">
              Planning Your Stay?
            </h3>
            <p className="text-brand-700 leading-relaxed mb-6">
              Contact us to check real-time availability and get the best rates
              for your preferred dates. Early booking during peak seasons is
              highly recommended.
            </p>
            <Button className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              Check Availability Now
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
