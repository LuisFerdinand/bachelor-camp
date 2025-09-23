"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Info } from "lucide-react";
import {
  BookingType,
  getAllCourses,
  getCourseBySlug,
} from "@/app/util/bookingData";
import { getAllBuildings } from "@/app/util/buildingData";
import { useBookingFlow } from "@/hooks/useBookingFlow";

// Import components
import { BookingTypeSelector } from "@/components/booking/BookingTypeSelector";
import { ProgramStartMonthSelector } from "@/components/booking/ProgramStartMonthSelector";

// Import existing components that we'll update
import { BuildingSelection } from "@/modules/home/ui/components/booking/BuildingSelection";
import { ProgramSelection } from "@/modules/home/ui/components/booking/ProgramSelection";
import { AccommodationSelection } from "@/modules/home/ui/components/booking/AccommodationSelection";
import { BookingSummary } from "@/modules/home/ui/components/booking/BookingSummary";
import { MobileSummary } from "@/modules/home/ui/components/booking/MobileSummary";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");

  const {
    state,
    setBookingType,
    setSelectedBuilding,
    setSelectedCourse,
    setSelectedPricing,
    setPersonCount,
    setSelectedStartMonth,
    currentBookingItem, // Use the computed booking item directly
    resetBooking,
    isBookingComplete,
    getNextStep,
  } = useBookingFlow();

  const [buildings] = useState(() => getAllBuildings());
  const [courses] = useState(() => getAllCourses());
  const [isLoading, setIsLoading] = useState(true);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("booking-type");

  // Initialize with course from URL if provided
  useEffect(() => {
    if (courseSlug) {
      const course = getCourseBySlug(courseSlug);
      if (course) {
        setBookingType(BookingType.PROGRAM_WITH_ACCOMMODATION);
        setSelectedCourse(course);
        setCurrentStep("accommodation");
      }
    }
    setIsLoading(false);
  }, [courseSlug, setBookingType, setSelectedCourse]);

  // Navigate to appropriate next step
  const handleBookingTypeSelect = (bookingType: BookingType) => {
    setBookingType(bookingType);

    switch (bookingType) {
      case BookingType.ACCOMMODATION_ONLY:
        setCurrentStep("accommodation");
        break;
      case BookingType.PROGRAM_ONLY:
        setCurrentStep("program");
        break;
      case BookingType.PROGRAM_WITH_ACCOMMODATION:
        setCurrentStep("program");
        break;
    }
  };

  const handleBackToBookingType = () => {
    resetBooking();
    setCurrentStep("booking-type");
  };

  const handleContinueToAccommodation = () => {
    if (
      state.bookingType === BookingType.PROGRAM_WITH_ACCOMMODATION &&
      state.selectedCourse
    ) {
      setCurrentStep("accommodation");
    }
  };

  const handleContinueToStartMonth = () => {
    if (
      state.bookingType === BookingType.PROGRAM_ONLY &&
      state.selectedCourse
    ) {
      setCurrentStep("start-month");
    } else if (
      state.bookingType === BookingType.PROGRAM_WITH_ACCOMMODATION &&
      state.selectedBuilding &&
      state.selectedPricing
    ) {
      setCurrentStep("start-month");
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "booking-type":
        return "Choose Your Booking Type";
      case "program":
        return "Select Your Program";
      case "accommodation":
        return state.bookingType === BookingType.ACCOMMODATION_ONLY
          ? "Select Your Accommodation"
          : "Select Your Accommodation";
      case "start-month":
        return "Select Start Month";
      default:
        return "Book Your Experience";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "booking-type":
        return "Choose the option that best fits your learning and accommodation needs";
      case "program":
        return "Select the program that matches your learning goals";
      case "accommodation":
        return state.bookingType === BookingType.ACCOMMODATION_ONLY
          ? "Choose your accommodation and number of people"
          : "Choose accommodation that complements your program";
      case "start-month":
        return "Select when you want to start your program";
      default:
        return "Customize your English learning experience with our flexible booking options";
    }
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
                {state.bookingType
                  ? `${state.bookingType
                      .replace("_", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())} Booking`
                  : "Book Your Experience"}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                {getStepTitle()}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
                {getStepDescription()}
              </p>

              {/* Progress indicator */}
              {state.bookingType && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto border border-white/20">
                  <div className="flex items-center justify-center text-white">
                    <span className="text-sm font-medium">
                      {getNextStep || "Ready to proceed"}
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
              {/* Back button */}
              {currentStep !== "booking-type" && (
                <div className="mb-6">
                  <Button
                    variant="outline"
                    onClick={handleBackToBookingType}
                    className="flex items-center bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Booking Type
                  </Button>
                </div>
              )}

              {/* Step Content */}
              {currentStep === "booking-type" && (
                <BookingTypeSelector
                  selectedBookingType={state.bookingType}
                  onBookingTypeSelect={handleBookingTypeSelect}
                />
              )}

              {currentStep === "program" && (
                <div className="space-y-6">
                  <ProgramSelection
                    selectedBuilding={null} // Not needed for new flow
                    suitableCourses={courses}
                    selectedCourse={state.selectedCourse}
                    courseSlug={courseSlug}
                    onCourseSelect={setSelectedCourse}
                    onResetCourse={() => setSelectedCourse(null)}
                  />

                  {state.selectedCourse && (
                    <div className="text-center">
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-2"
                        onClick={() => {
                          if (state.bookingType === BookingType.PROGRAM_ONLY) {
                            setCurrentStep("start-month");
                          } else {
                            handleContinueToAccommodation();
                          }
                        }}
                      >
                        {state.bookingType === BookingType.PROGRAM_ONLY
                          ? "Continue to Start Month"
                          : "Continue to Accommodation"}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {currentStep === "accommodation" && (
                <div className="space-y-6">
                  {state.bookingType === BookingType.ACCOMMODATION_ONLY && (
                    <BuildingSelection
                      buildings={buildings}
                      selectedBuilding={state.selectedBuilding}
                      onBuildingSelect={setSelectedBuilding}
                    />
                  )}

                  {state.bookingType ===
                    BookingType.PROGRAM_WITH_ACCOMMODATION &&
                    state.selectedCourse && (
                      <BuildingSelection
                        buildings={buildings.filter((building) =>
                          state.selectedCourse?.suitableBuildings.includes(
                            building.id
                          )
                        )}
                        selectedBuilding={state.selectedBuilding}
                        onBuildingSelect={setSelectedBuilding}
                      />
                    )}

                  {state.selectedBuilding && (
                    <AccommodationSelection
                      selectedBuilding={state.selectedBuilding}
                      selectedPricing={state.selectedPricing}
                      personCount={state.personCount}
                      onPricingSelect={setSelectedPricing}
                      onPersonCountChange={setPersonCount}
                    />
                  )}

                  {state.selectedBuilding && state.selectedPricing && (
                    <div className="text-center">
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-2"
                        onClick={() => {
                          if (
                            state.bookingType ===
                            BookingType.PROGRAM_WITH_ACCOMMODATION
                          ) {
                            handleContinueToStartMonth();
                          }
                          // For accommodation-only, booking is complete
                        }}
                      >
                        {state.bookingType ===
                        BookingType.PROGRAM_WITH_ACCOMMODATION
                          ? "Continue to Start Month"
                          : "Complete Booking"}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {currentStep === "start-month" && (
                <div className="space-y-6">
                  <ProgramStartMonthSelector
                    selectedCourse={state.selectedCourse}
                    selectedStartMonth={state.selectedStartMonth}
                    onStartMonthSelect={setSelectedStartMonth}
                  />

                  {state.selectedStartMonth && (
                    <div className="text-center">
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-2"
                        onClick={() => {
                          // Complete booking
                          console.log("Booking complete:", currentBookingItem);
                        }}
                      >
                        Complete Booking
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Booking Summary - Desktop */}
            <div className="hidden lg:block lg:w-1/3">
              <BookingSummary
                selectedBuilding={state.selectedBuilding}
                selectedCourse={state.selectedCourse}
                selectedPricing={state.selectedPricing}
                selectedStartDate={null} // Not used in new flow
                selectedEndDate={null} // Not used in new flow
                personCount={state.personCount}
                courseSlug={courseSlug}
                bookingType={state.bookingType} // Add missing bookingType prop
                selectedStartMonth={state.selectedStartMonth} // Add missing selectedStartMonth prop
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
        selectedBuilding={state.selectedBuilding}
        selectedCourse={state.selectedCourse}
        selectedPricing={state.selectedPricing}
        selectedStartDate={null} // Not used in new flow
        selectedEndDate={null} // Not used in new flow
        personCount={state.personCount}
        courseSlug={courseSlug}
        bookingType={state.bookingType} // Add missing bookingType prop
        selectedStartMonth={state.selectedStartMonth} // Add missing selectedStartMonth prop
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
      />
    </div>
  );
}
