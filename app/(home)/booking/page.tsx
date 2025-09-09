"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Home,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
} from "lucide-react";
import {
  Building,
  buildings,
  getBuildingBySlug,
} from "@/app/util/buildingData";
import {
  Course,
  courses,
  getCourseBySlug,
  calculateBookingPrice,
  createBookingItem,
} from "@/app/util/bookingData";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  
  // Mock building data - in real app this would come from props or API
  const selectedBuildingSlug = "building-1-premium"; // Change this to test different buildings
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
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
  
  // Initialize selected building
  useEffect(() => {
    const building = getBuildingBySlug(selectedBuildingSlug);
    if (building) {
      setSelectedBuilding(building);
    }
  }, [selectedBuildingSlug]);
  
  // Check for course in URL parameters
  useEffect(() => {
    if (courseSlug && selectedBuilding) {
      const course = getCourseBySlug(courseSlug);
      if (course && course.suitableBuildings.includes(selectedBuilding.id)) {
        setSelectedCourse(course);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
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
    
  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
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
    if (selectedPricing && count >= selectedPricing.capacity && count <= selectedPricing.maxCapacity) {
      setPersonCount(count);
    }
  };
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };
  
  const isDateAvailable = (date: Date) => {
    const dateStr = formatDate(date);
    return availabilityData[dateStr]?.available ?? false;
  };
  
  const isDateSelected = (date: Date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };
  
  const isDateInRange = (date: Date) => {
    if (!selectedStartDate) return false;
    if (!selectedEndDate) return date.getTime() === selectedStartDate.getTime();
    return date >= selectedStartDate && date <= selectedEndDate;
  };
  
  const handleDateClick = (date: Date) => {
    if (!isDateAvailable(date) || !selectedCourse) return;
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
  
  const getSelectedWeeks = () => {
    if (!selectedStartDate || !selectedEndDate) return 0;
    const diffTime = Math.abs(
      selectedEndDate.getTime() - selectedStartDate.getTime()
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  };
  
  const calculateTotal = () => {
    if (!selectedBuilding || !selectedCourse || !selectedPricing) return 0;
    
    // Calculate accommodation cost based on person count
    const accommodationCostPerMonth = selectedPricing.numericPrice * personCount;
    
    // Calculate duration in months (approximate)
    const durationInMonths = getSelectedWeeks() / 4;
    
    // Calculate total cost
    const totalCost = selectedCourse.investment + (accommodationCostPerMonth * durationInMonths);
    
    return totalCost;
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
      const isAvailable = isDateAvailable(date);
      const isSelected = isDateInRange(date);
      const isPast = date < today;
      const capacity = availabilityData[dateStr]?.capacity || 0;
      
      days.push(
        <div
          key={day}
          onClick={() =>
            !isPast && isAvailable && selectedCourse && handleDateClick(date)
          }
          className={`
            h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all relative
            ${isPast ? "text-neutral-300 cursor-not-allowed" : ""}
            ${
              !isPast && isAvailable && selectedCourse
                ? "hover:bg-blue-100"
                : ""
            }
            ${
              !isPast && !isAvailable
                ? "text-neutral-400 cursor-not-allowed bg-neutral-100"
                : ""
            }
            ${!selectedCourse ? "cursor-not-allowed text-neutral-400" : ""}
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
              <Tabs defaultValue="program" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-neutral-100 p-1 rounded-lg">
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
                
                
                {/* Program Selection */}
                <TabsContent value="program" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-neutral-900">
                        <Users className="h-5 w-5 mr-2 text-blue-500" />
                        Select Your Program
                      </CardTitle>
                      <CardDescription className="text-neutral-600">
                        Choose the English program that best matches your
                        learning goals.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {courseSlug && selectedCourse && (
                        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-blue-800">Pre-selected Program</h3>
                            <p className="text-sm text-blue-700">
                              You&apos;ve selected {selectedCourse.name} from the program page
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedCourse(null);
                              setSelectedPricing(null);
                              setSelectedStartDate(null);
                              setSelectedEndDate(null);
                            }}
                          >
                            Change
                          </Button>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {suitableCourses.map((course) => (
                          <Card
                            key={course.id}
                            className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg flex flex-col h-full ${
                              selectedCourse?.id === course.id
                                ? "ring-2 ring-blue-500"
                                : ""
                            }`}
                            onClick={() => handleCourseSelect(course)}
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
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Duration & Date Selection */}
                <TabsContent value="duration" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-neutral-900">
                        <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                        Select Your Study Period
                      </CardTitle>
                      <CardDescription className="text-neutral-600">
                        {selectedCourse
                          ? `Choose your start and end dates. ${selectedCourse.name} has a duration of ${selectedCourse.duration}.`
                          : "Please select a program first to see available dates."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!selectedCourse ? (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                          <p className="text-neutral-500">
                            Select a program to view available dates
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
                                  setCurrentMonth(
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
                                  setCurrentMonth(
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
                            <div className="grid grid-cols-7 gap-2">
                              {renderCalendar()}
                            </div>
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
                                Selected Period
                              </h4>
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm text-neutral-600">
                                    Start Date
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
                                        End Date
                                      </div>
                                      <div className="font-medium">
                                        {selectedEndDate.toLocaleDateString()}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-neutral-600">
                                        Duration
                                      </div>
                                      <div className="font-medium">
                                        {getSelectedWeeks()} weeks
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-sm text-neutral-500">
                                    Select end date
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Accommodation Selection */}
                <TabsContent value="accommodation" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-neutral-900">
                        <Home className="h-5 w-5 mr-2 text-blue-500" />
                        Select Your Accommodation
                      </CardTitle>
                      <CardDescription className="text-neutral-600">
                        Choose from our range of comfortable room options and specify the number of occupants.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!selectedBuilding ? (
                        <div className="text-center py-8">
                          <Home className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                          <p className="text-neutral-500">
                            Building information not available
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-neutral-900 mb-2">
                              {selectedBuilding.name}
                            </h4>
                            <p className="text-sm text-neutral-600">
                              {selectedBuilding.description}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {selectedBuilding.pricing.map((pricing) => (
                              <Card
                                key={pricing.id}
                                className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg flex flex-col h-full ${
                                  selectedPricing?.id === pricing.id
                                    ? "ring-2 ring-blue-500"
                                    : ""
                                }`}
                                onClick={() => handlePricingSelect(pricing)}
                              >
                                <CardContent className="p-5 flex-grow">
                                  <div className="flex justify-between items-start mb-3">
                                    <h5 className="font-bold text-neutral-900">
                                      {pricing.type}
                                    </h5>
                                    {selectedPricing?.id === pricing.id && (
                                      <CheckCircle className="h-5 w-5 text-blue-500" />
                                    )}
                                  </div>
                                  <p className="text-sm text-neutral-600 mb-4">
                                    {pricing.description}
                                  </p>
                                  <div className="flex items-center text-sm text-neutral-600 mb-2">
                                    <Users className="h-4 w-4 mr-2 text-neutral-500" />
                                    <span>Capacity: {pricing.capacity} - {pricing.maxCapacity} persons</span>
                                  </div>
                                  <div className="font-bold text-blue-600 mt-auto">
                                    {pricing.price}
                                  </div>
                                  {pricing.highlight && (
                                    <Badge className="mt-2 bg-blue-100 text-blue-800">
                                      Recommended
                                    </Badge>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          
                          {/* Person Selection */}
                          {selectedPricing && (
                            <Card className="border-0 shadow-md">
                              <CardHeader>
                                <CardTitle className="flex items-center text-neutral-900">
                                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                                  Select Number of Persons
                                </CardTitle>
                                <CardDescription className="text-neutral-600">
                                  Choose how many people will stay in the {selectedPricing.type.toLowerCase()}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center space-x-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePersonCountChange(personCount - 1)}
                                    disabled={personCount <= selectedPricing.capacity}
                                  >
                                    -
                                  </Button>
                                  <div className="text-lg font-semibold min-w-[40px] text-center">
                                    {personCount}
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePersonCountChange(personCount + 1)}
                                    disabled={personCount >= selectedPricing.maxCapacity}
                                  >
                                    +
                                  </Button>
                                  <span className="text-sm text-neutral-600 ml-2">
                                    persons (max: {selectedPricing.maxCapacity})
                                  </span>
                                </div>
                                <div className="mt-4 text-sm text-neutral-600">
                                  Total accommodation cost: Rp {(selectedPricing.numericPrice * personCount).toLocaleString("id-ID")}/month
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Summary - Desktop */}
            <div className="hidden lg:block lg:w-1/3">
              <Card className="border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="text-neutral-900">
                    Booking Summary
                  </CardTitle>
                  <CardDescription className="text-neutral-600">
                    Review your selections
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Building Summary */}
                  <div>
                    <h4 className="font-semibold mb-2 text-neutral-800">
                      Building
                    </h4>
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
                          {getSelectedWeeks()} weeks duration
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
                          Rp {(selectedPricing.numericPrice * personCount).toLocaleString("id-ID")}/month
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
                        Rp {calculateTotal().toLocaleString("id-ID")}
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
                </CardContent>
              </Card>
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
      {isSummaryOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setIsSummaryOpen(false)}
          ></div>
          
          {/* Summary Content */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-neutral-900">Booking Summary</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsSummaryOpen(false)}
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
                        {getSelectedWeeks()} weeks duration
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
                        Rp {(selectedPricing.numericPrice * personCount).toLocaleString("id-ID")}/month
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
                      Rp {calculateTotal().toLocaleString("id-ID")}
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
      )}
    </div>
  );
}