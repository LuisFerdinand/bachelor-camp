"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, Zap, TrendingUp, Sun } from "lucide-react";

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

  const getSeasonStyles = (status: string) => {
    switch (status) {
      case "Peak Season":
        return {
          bg: "bg-gradient-to-br from-accent-50 to-accent-100/80",
          border: "border-accent-300",
          text: "text-accent-700",
          badge: "bg-accent-600 text-white",
          dot: "bg-accent-500",
          icon: "text-accent-600",
          card: "border-accent-200 hover:border-accent-400 hover:shadow-accent-200/50",
          cardBg: "bg-gradient-to-br from-accent-50/50 to-white",
        };
      case "Medium Season":
        return {
          bg: "bg-gradient-to-br from-electric-50 to-electric-100/80",
          border: "border-electric-300",
          text: "text-electric-700",
          badge: "bg-electric-600 text-white",
          dot: "bg-electric-500",
          icon: "text-electric-600",
          card: "border-electric-200 hover:border-electric-400 hover:shadow-electric-200/50",
          cardBg: "bg-gradient-to-br from-electric-50/50 to-white",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-brand-50 to-brand-100/80",
          border: "border-brand-300",
          text: "text-brand-700",
          badge: "bg-brand-600 text-white",
          dot: "bg-brand-500",
          icon: "text-brand-600",
          card: "border-brand-200 hover:border-brand-400 hover:shadow-brand-200/50",
          cardBg: "bg-gradient-to-br from-brand-50/50 to-white",
        };
    }
  };

  const getSeasonIcon = (status: string) => {
    switch (status) {
      case "Peak Season":
        return <TrendingUp className="w-5 h-5" />;
      case "Medium Season":
        return <Zap className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-display-sm lg:text-display-md font-bold mb-4 sm:mb-6 text-neutral-900">
            Seasonal{" "}
            <span className="text-electric-600 relative">
              Availability
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-electric-100 -rotate-1 rounded-full opacity-60"></div>
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed px-2">
            Plan your stay according to our seasonal calendar. Book early during
            peak seasons for guaranteed availability.
          </p>
        </div>

        {/* Calendar Grid - MOBILE FIRST APPROACH */}
        <div className="max-w-5xl mx-auto mb-12 lg:mb-16">
          <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-xl p-4 sm:p-6 lg:p-8 border border-neutral-100">
            {/* Mobile Calendar - Scrollable horizontally */}
            <div className="lg:hidden mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-neutral-800">
                  Monthly Availability
                </h3>
                <div className="text-xs text-neutral-500">
                  ← Swipe to see all months →
                </div>
              </div>
              <div className="overflow-x-auto pb-4 -mx-2 px-2">
                <div className="flex space-x-3 min-w-max">
                  {allMonths.map((month, index) => {
                    const season = getSeasonForMonth(month);
                    const styles = season
                      ? getSeasonStyles(season.status)
                      : getSeasonStyles("");
                    const Icon = getSeasonIcon(season?.status || "");

                    return (
                      <div
                        key={index}
                        className={`
                          w-32 flex-shrink-0 rounded-xl flex flex-col items-center justify-center p-4
                          text-sm font-medium transition-all duration-300 
                          hover:scale-105 hover:shadow-lg cursor-pointer
                          ${styles.bg} ${styles.border} ${styles.text} border-2
                        `}
                      >
                        <div className="text-xs opacity-75 mb-1">
                          {month.substring(0, 3)}
                        </div>
                        <div className="flex items-center justify-center mb-2">
                          <div className={`p-1.5 rounded-full ${styles.badge}`}>
                            <Calendar className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-bold leading-tight">
                            {season?.status}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Calendar - Grid layout */}
            <div className="hidden lg:block">
              {/* Calendar Header */}
              <div className="grid grid-cols-12 gap-2 mb-4">
                {allMonths.map((month, index) => (
                  <div
                    key={index}
                    className="text-center text-sm font-semibold text-neutral-600 p-2 rounded-lg bg-neutral-50"
                  >
                    {month.substring(0, 3)}
                  </div>
                ))}
              </div>

              {/* Calendar Body */}
              <div className="grid grid-cols-12 gap-2">
                {allMonths.map((month, index) => {
                  const season = getSeasonForMonth(month);
                  const styles = season
                    ? getSeasonStyles(season.status)
                    : getSeasonStyles("");

                  return (
                    <div
                      key={index}
                      className={`
                        min-h-24 rounded-xl flex flex-col items-center justify-center p-3 
                        text-sm font-medium transition-all duration-300 
                        hover:scale-105 hover:shadow-lg cursor-pointer
                        ${styles.bg} ${styles.border} ${styles.text} border-2
                      `}
                    >
                      <div className="text-xs opacity-75">
                        {month.substring(0, 3)}
                      </div>
                      <div className="text-center mt-1">
                        <div className="text-xs font-bold leading-tight">
                          {season?.status}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Season Details Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          {seasons.map((season, index) => {
            const styles = getSeasonStyles(season.status);
            const Icon = getSeasonIcon(season.status);

            return (
              <Card
                key={index}
                className={`
                  border-2 shadow-lg hover:shadow-2xl transition-all duration-300 
                  hover:scale-105 ${styles.card} ${styles.cardBg}
                `}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`p-2 sm:p-2.5 rounded-full flex-shrink-0 ${styles.badge}`}
                    >
                      {Icon}
                    </div>
                    <CardTitle
                      className={`text-base sm:text-lg lg:text-xl ${styles.text} line-clamp-1`}
                    >
                      {season.status}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div
                    className={`text-xs sm:text-sm mb-3 sm:mb-4 pb-3 sm:pb-4 border-b-2 ${styles.border}`}
                  >
                    <span className="font-semibold text-neutral-900">
                      Months:{" "}
                    </span>
                    <span className={`${styles.text} font-medium`}>
                      {season.months.join(", ")}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {season.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto px-2">
          <div className="bg-gradient-to-r from-brand-500/10 via-accent-500/10 to-electric-500/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-brand-200 hover:border-brand-300 transition-all duration-300">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-lg">
                  <Calendar className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center">
                <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-neutral-900 mb-2 sm:mb-3">
                  Planning Your Stay?
                </h3>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-4 sm:mb-6">
                  Contact us to check real-time availability and get the best
                  rates for your preferred dates. Early booking during peak
                  seasons is highly recommended.
                </p>
                <Button className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full group text-sm sm:text-base w-full sm:w-auto">
                  <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Check Availability Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
