"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Info } from "lucide-react";
import {
  Building,
  buildings,
  getBuildingBySlug,
} from "@/app/util/buildingData";
import { Course, courses, getCourseBySlug } from "@/app/util/bookingData";
import { BuildingSelection } from "@/modules/home/ui/components/booking/BuildingSelection";
import { ProgramSelection } from "@/modules/home/ui/components/booking/ProgramSelection";
import { DurationSelection } from "@/modules/home/ui/components/booking/DurationSelection";
import { AccommodationSelection } from "@/modules/home/ui/components/booking/AccommodationSelection";
import { BookingSummary } from "@/modules/home/ui/components/booking/BookingSummary";
import { MobileSummary } from "@/modules/home/ui/components/booking/MobileSummary";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");

  // State variables
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<
    Building["pricing"][0] | null
  >(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availabilityData, setAvailabilityData] = useState<{
    [key: string]: { available: boolean; capacity: number };
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [personCount, setPersonCount] = useState<number>(1);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Initialize with first building if none selected
  useEffect(() => {
    if (!selectedBuilding && buildings.length > 0) {
      setSelectedBuilding(buildings[0]);
    }
    setIsLoading(false);
  }, [selectedBuilding]);

  // Check for course in URL parameters
  useEffect(() => {
    if (courseSlug && selectedBuilding) {
      const course = getCourseBySlug(courseSlug);
      if (course && course.suitableBuildings.includes(selectedBuilding.id)) {
        setSelectedCourse(course);
      }
    }
  }, [courseSlug, selectedBuilding]);

  // Mock availability data - in real app this would come from API
  useEffect(() => {
    const generateAvailabilityData = () => {
      const data: { [key: string]: { available: boolean; capacity: number } } =
        {};
      const today = new Date();

      // Generate 6 months of availability data
      for (let i = 0; i < 180; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];

        // Mock logic: weekends have lower availability, some random unavailable days
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const randomUnavailable = Math.random() < 0.1; // 10% chance of being unavailable

        data[dateStr] = {
          available: !randomUnavailable,
          capacity: isWeekend ? 5 : 10,
        };
      }

      setAvailabilityData(data);
    };

    generateAvailabilityData();
  }, []);

  // Filter courses suitable for the selected building
  const suitableCourses = selectedBuilding
    ? courses.filter((course) =>
        course.suitableBuildings.includes(selectedBuilding.id)
      )
    : [];

  // Event handlers
  const handleBuildingSelect = (building: Building) => {
    setSelectedBuilding(building);
    setSelectedCourse(null);
    setSelectedPricing(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedPricing(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleResetCourse = () => {
    setSelectedCourse(null);
    setSelectedPricing(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handlePricingSelect = (pricing: Building["pricing"][0]) => {
    setSelectedPricing(pricing);
    // Set person count to the minimum capacity of the selected pricing
    setPersonCount(pricing.capacity);
  };

  const handlePersonCountChange = (count: number) => {
    if (
      selectedPricing &&
      count >= selectedPricing.capacity &&
      count <= selectedPricing.maxCapacity
    ) {
      setPersonCount(count);
    }
  };

  const handleDateClick = (date: Date) => {
    if (!selectedCourse) return;

    if (!selectedStartDate) {
      // First click - set start date
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (!selectedEndDate) {
      // Second click - set end date
      if (date < selectedStartDate) {
        // If clicked date is before start date, swap them
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
    } else {
      // Third click - reset and start over
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading booking information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"></div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2">
                Book Your Experience
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                Reserve Your Spot
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
                Customize your English learning experience with our flexible
                booking options.
              </p>
              {selectedBuilding && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto border border-white/20">
                  <div className="flex items-center justify-center">
                    <Home className="h-5 w-5 text-white mr-2" />
                    <span className="text-white font-medium">
                      Booking for: {selectedBuilding.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Booking Form */}
            <div className="lg:w-2/3">
              <Tabs defaultValue="building" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8 bg-neutral-100 p-1 rounded-lg">
                  <TabsTrigger
                    value="building"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                  >
                    <span className="hidden sm:inline">Building</span>
                    <span className="sm:hidden">Building</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="program"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                  >
                    <span className="hidden sm:inline">Program</span>
                    <span className="sm:hidden">Program</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="duration"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                  >
                    <span className="hidden sm:inline">Duration & Dates</span>
                    <span className="sm:hidden">Duration</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="accommodation"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                  >
                    <span className="hidden sm:inline">Accommodation</span>
                    <span className="sm:hidden">Room</span>
                  </TabsTrigger>
                </TabsList>

                {/* Building Selection */}
                <TabsContent value="building" className="space-y-6">
                  <BuildingSelection
                    buildings={buildings}
                    selectedBuilding={selectedBuilding}
                    onBuildingSelect={handleBuildingSelect}
                  />
                </TabsContent>

                {/* Program Selection */}
                <TabsContent value="program" className="space-y-6">
                  <ProgramSelection
                    selectedBuilding={selectedBuilding}
                    suitableCourses={suitableCourses}
                    selectedCourse={selectedCourse}
                    courseSlug={courseSlug}
                    onCourseSelect={handleCourseSelect}
                    onResetCourse={handleResetCourse}
                  />
                </TabsContent>

                {/* Duration & Date Selection */}
                <TabsContent value="duration" className="space-y-6">
                  <DurationSelection
                    selectedCourse={selectedCourse}
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    currentMonth={currentMonth}
                    availabilityData={availabilityData}
                    onDateClick={handleDateClick}
                    onMonthChange={handleMonthChange}
                  />
                </TabsContent>

                {/* Accommodation Selection */}
                <TabsContent value="accommodation" className="space-y-6">
                  <AccommodationSelection
                    selectedBuilding={selectedBuilding}
                    selectedPricing={selectedPricing}
                    personCount={personCount}
                    onPricingSelect={handlePricingSelect}
                    onPersonCountChange={handlePersonCountChange}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Summary - Desktop */}
            <div className="hidden lg:block lg:w-1/3">
              <BookingSummary
                selectedBuilding={selectedBuilding}
                selectedCourse={selectedCourse}
                selectedPricing={selectedPricing}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                personCount={personCount}
                courseSlug={courseSlug}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Summary Button */}
      <Button
        className="fixed bottom-24 right-6 z-40 lg:hidden rounded-full w-14 h-14 p-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center"
        onClick={() => setIsSummaryOpen(true)}
      >
        <Info className="h-6 w-6" />
      </Button>

      {/* Mobile Summary Overlay */}
      <MobileSummary
        selectedBuilding={selectedBuilding}
        selectedCourse={selectedCourse}
        selectedPricing={selectedPricing}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        personCount={personCount}
        courseSlug={courseSlug}
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
      />
    </div>
  );
}
