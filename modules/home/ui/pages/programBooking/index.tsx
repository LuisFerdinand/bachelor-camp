"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  getAllCourses,
  type Course,
} from "@/modules/home/ui/utils/booking/bookingData";
import {
  formatCurrency,
  getBookingTypeLabel,
} from "@/modules/home/ui/utils/booking/bookingUtils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Search,
  Grid,
  List,
  ArrowRight,
  Target,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { CourseCategoryTabs } from "@/modules/home/ui/components/program/CourseCategoryTabs";

const getCrowdLevel = (
  month: string,
  year: number,
  isPopularCourse: boolean
) => {
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  if (monthIndex >= 5 && monthIndex <= 7) {
    return isPopularCourse ? "very-high" : "high";
  }
  if (monthIndex === 0 || monthIndex === 11) {
    return isPopularCourse ? "high" : "medium";
  }
  return isPopularCourse ? "medium" : "low";
};

const getCrowdLevelInfo = (level: string) => {
  switch (level) {
    case "very-high":
      return {
        label: "Very High Demand",
        color: "bg-red-500",
        textColor: "text-red-700",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: <AlertCircle className="h-3 w-3" />,
      };
    case "high":
      return {
        label: "High Demand",
        color: "bg-orange-500",
        textColor: "text-orange-700",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        icon: <Users className="h-3 w-3" />,
      };
    case "medium":
      return {
        label: "Moderate Demand",
        color: "bg-yellow-500",
        textColor: "text-yellow-700",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: <Users className="h-3 w-3" />,
      };
    case "low":
    default:
      return {
        label: "Low Demand",
        color: "bg-green-500",
        textColor: "text-green-700",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: <CheckCircle className="h-3 w-3" />,
      };
  }
};

export default function ProgramBooking() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<{
    month: string;
    year: number;
  } | null>(null);
  const [bookingStep, setBookingStep] = useState<"select" | "summary">(
    "select"
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const courses = useMemo(() => getAllCourses(), []);

  useEffect(() => {
    if (courseSlug && courses.length > 0) {
      const course = courses.find((c) => c.slug === courseSlug);
      if (course) {
        setSelectedCourse(course);
      }
    }
  }, [courseSlug, courses]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(courses.map((course) => course.category))
    );
    return ["All", ...uniqueCategories];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    let result = courses;

    if (activeCategory !== "All") {
      result = result.filter((course) => course.category === activeCategory);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query) ||
          course.level.toLowerCase().includes(query)
      );
    }

    return result;
  }, [courses, activeCategory, searchQuery]);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedMonth(null);
  };

  const handleSelectMonth = (month: string, year: number) => {
    setSelectedMonth({ month, year });
  };

  const handleProceedToSummary = () => {
    if (selectedCourse) {
      setBookingStep("summary");
    }
  };

  const handleBackToSelection = () => {
    setBookingStep("select");
  };

  const handleConfirmBooking = () => {
    if (selectedCourse && selectedMonth) {
      alert(
        `Booking confirmed for ${selectedCourse.name} starting in ${selectedMonth.month} ${selectedMonth.year}`
      );
      setSelectedCourse(null);
      setSelectedMonth(null);
      setBookingStep("select");
    }
  };

  const availableMonths = selectedCourse
    ? selectedCourse.availableStartMonths.filter((m) => m.available)
    : [];

  if (bookingStep === "summary") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-accent-50">
        {/* Full-width header */}
        <div className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-electric-600 text-white p-12 overflow-hidden shadow-2xl pt-40">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Final Step</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Review Your Booking</h1>
            <p className="text-brand-100 text-lg">
              Confirm your program details before finalizing
            </p>
          </div>
        </div>

        <div className="container mx-auto py-8 px-4 max-w-5xl">
          {/* Summary Cards */}
          <div className="grid gap-6 mb-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-brand-50 to-electric-50 border-b border-brand-100">
                <CardTitle className="text-2xl text-brand-800 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-brand-600" />
                  Program Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">
                        Program Name
                      </p>
                      <p className="text-lg font-semibold text-brand-900">
                        {selectedCourse?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Category</p>
                      <Badge className="bg-accent-500 hover:bg-accent-600 text-white border-0 px-3 py-1">
                        {selectedCourse?.category}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Level</p>
                      <Badge className="bg-brand-600 hover:bg-brand-700 text-white border-0 px-3 py-1">
                        {selectedCourse?.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Duration</p>
                      <div className="flex items-center gap-2 text-brand-900">
                        <Clock className="h-4 w-4 text-brand-600" />
                        <p className="font-semibold">
                          {selectedCourse?.duration}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">
                        Total Meetings
                      </p>
                      <p className="text-lg font-semibold text-brand-900">
                        {selectedCourse?.totalMeetings} sessions
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">
                        Start Date
                      </p>
                      <div className="flex items-center gap-2 text-brand-900">
                        <Calendar className="h-4 w-4 text-brand-600" />
                        <p className="font-semibold">
                          {selectedMonth?.month} {selectedMonth?.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="bg-gradient-to-br from-brand-50 to-electric-50 rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">
                        Total Investment
                      </p>
                      <p className="text-3xl font-bold text-brand-700">
                        {formatCurrency(selectedCourse?.investment || 0)}
                      </p>
                    </div>
                    <div className="h-16 w-16 bg-gradient-to-br from-brand-600 to-electric-600 rounded-full flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-neutral-50 to-brand-50 border-t border-brand-100 p-6">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button
                    variant="outline"
                    onClick={handleBackToSelection}
                    className="flex-1 border-brand-300 hover:bg-brand-50"
                  >
                    Back to Selection
                  </Button>
                  <Button
                    onClick={handleConfirmBooking}
                    className="flex-1 bg-gradient-to-r from-brand-600 to-electric-600 hover:from-brand-700 hover:to-electric-700 text-white shadow-lg"
                  >
                    Confirm Booking
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-accent-50 to-brand-50 border-b border-accent-100">
                <CardTitle className="text-xl text-brand-800 flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent-600" />
                  Program Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose prose-brand max-w-none">
                  <p className="text-neutral-700 leading-relaxed mb-6">
                    {selectedCourse?.description}
                  </p>

                  <h3 className="text-lg font-semibold text-brand-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success-600" />
                    Learning Objectives
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {selectedCourse?.goals.map((goal, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-neutral-700"
                      >
                        <span className="text-accent-500 mt-1">●</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-brand-800 mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-electric-600" />
                    Course Content
                  </h3>
                  <ul className="space-y-2">
                    {selectedCourse?.syllabus.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-neutral-700"
                      >
                        <span className="text-electric-500 mt-1">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-accent-50">
      {/* Full-width hero header */}
      <div className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-electric-600 text-white p-16 overflow-hidden shadow-2xl pt-40">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">
              Transform Your English Skills
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-100">
            Choose Your Program
          </h1>
          <p className="text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
            Select from our comprehensive range of language programs designed to
            elevate your English proficiency
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Search and View Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 pt-8">
          <div className="relative w-full lg:w-2/3">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <Input
              placeholder="Search programs by name, category, or level..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 border-neutral-200 focus:border-brand-400 focus:ring-brand-400 bg-white/80 backdrop-blur-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid"
                  ? "bg-gradient-to-r from-brand-600 to-electric-600 hover:from-brand-700 hover:to-electric-700 text-white shadow-md"
                  : "border-neutral-300 hover:bg-brand-50"
              }
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list"
                  ? "bg-gradient-to-r from-brand-600 to-electric-600 hover:from-brand-700 hover:to-electric-700 text-white shadow-md"
                  : "border-neutral-300 hover:bg-brand-50"
              }
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-10">
          <CourseCategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          {/* Course List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-brand-800 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-brand-600" />
                Available Programs
              </h2>
              <Badge className="bg-gradient-to-r from-brand-100 to-electric-100 text-brand-700 border-0 px-4 py-1.5">
                {filteredCourses.length}{" "}
                {filteredCourses.length !== 1 ? "programs" : "program"}
              </Badge>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className={`cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-2xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm ${
                      selectedCourse?.id === course.id
                        ? "ring-2 ring-brand-500 shadow-brand"
                        : ""
                    }`}
                    onClick={() => handleSelectCourse(course)}
                  >
                    <CardHeader className="pb-3 bg-gradient-to-br from-brand-50 to-electric-50 rounded-t-lg">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-brand-800 flex items-center gap-2 mb-2">
                            {selectedCourse?.id === course.id && (
                              <CheckCircle className="h-5 w-5 text-brand-600 flex-shrink-0" />
                            )}
                            <span className="line-clamp-2">{course.name}</span>
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-accent-500 hover:bg-accent-600 text-white border-0">
                              {course.category}
                            </Badge>
                            <Badge className="bg-brand-600 hover:bg-brand-700 text-white border-0">
                              {course.level}
                            </Badge>
                          </div>
                        </div>
                        {course.isPopular && (
                          <Badge className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white border-0 flex-shrink-0">
                            <Star className="h-3 w-3 mr-1" /> Popular
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4 pb-4">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-neutral-600">
                          <Clock className="h-4 w-4 mr-2 text-electric-600" />
                          <span className="font-medium">
                            {course.duration} • {course.totalMeetings} meetings
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-3 flex justify-between items-center bg-gradient-to-r from-neutral-50 to-brand-50 rounded-b-lg p-4">
                      <p className="text-xl font-bold text-brand-700">
                        {formatCurrency(course.investment)}
                      </p>
                      <Button
                        variant={
                          selectedCourse?.id === course.id
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className={
                          selectedCourse?.id === course.id
                            ? "bg-gradient-to-r from-brand-600 to-electric-600 hover:from-brand-700 hover:to-electric-700 text-white"
                            : "border-brand-300 hover:bg-brand-50"
                        }
                      >
                        {selectedCourse?.id === course.id
                          ? "Selected"
                          : "Select"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className={`cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-2xl bg-white/80 backdrop-blur-sm ${
                      selectedCourse?.id === course.id
                        ? "ring-2 ring-brand-500 shadow-brand"
                        : ""
                    }`}
                    onClick={() => handleSelectCourse(course)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            {selectedCourse?.id === course.id && (
                              <CheckCircle className="h-6 w-6 text-brand-600 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-brand-800 mb-2">
                                {course.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge className="bg-accent-500 hover:bg-accent-600 text-white border-0">
                                  {course.category}
                                </Badge>
                                <Badge className="bg-brand-600 hover:bg-brand-700 text-white border-0">
                                  {course.level}
                                </Badge>
                                {course.isPopular && (
                                  <Badge className="bg-gradient-to-r from-accent-500 to-accent-600 text-white border-0">
                                    <Star className="h-3 w-3 mr-1" /> Popular
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-neutral-600 line-clamp-2 mb-3 leading-relaxed">
                            {course.description}
                          </p>
                          <div className="flex items-center text-sm text-neutral-600">
                            <Clock className="h-4 w-4 mr-2 text-electric-600" />
                            <span className="font-medium">
                              {course.duration} • {course.totalMeetings}{" "}
                              meetings
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 md:min-w-[160px]">
                          <p className="text-2xl font-bold text-brand-700">
                            {formatCurrency(course.investment)}
                          </p>
                          <Button
                            variant={
                              selectedCourse?.id === course.id
                                ? "default"
                                : "outline"
                            }
                            className={
                              selectedCourse?.id === course.id
                                ? "bg-gradient-to-r from-brand-600 to-electric-600 hover:from-brand-700 hover:to-electric-700 text-white w-full"
                                : "border-brand-300 hover:bg-brand-50 w-full"
                            }
                          >
                            {selectedCourse?.id === course.id
                              ? "Selected"
                              : "Select Program"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-br from-brand-50 to-electric-50 rounded-t-lg border-b border-brand-100">
                  <CardTitle className="text-xl text-brand-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-brand-600" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 py-6">
                  {selectedCourse ? (
                    <>
                      <div className="bg-gradient-to-br from-brand-50 to-electric-50 rounded-xl p-4">
                        <h3 className="font-semibold text-lg text-brand-800 mb-1">
                          {selectedCourse.name}
                        </h3>
                        <div className="flex items-center text-sm text-neutral-600 mt-2">
                          <Clock className="h-4 w-4 mr-1.5 text-electric-600" />
                          <span>{selectedCourse.duration}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-brand-800">
                          Select Start Month
                        </h4>
                        <div className="space-y-2">
                          {availableMonths.length > 0 ? (
                            availableMonths.map((month) => {
                              const crowdLevel = getCrowdLevel(
                                month.month,
                                month.year,
                                selectedCourse.isPopular
                              );
                              const crowdInfo = getCrowdLevelInfo(crowdLevel);

                              return (
                                <div
                                  key={`${month.month}-${month.year}`}
                                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                                    selectedMonth?.month === month.month &&
                                    selectedMonth?.year === month.year
                                      ? "border-brand-500 bg-gradient-to-br from-brand-50 to-electric-50 shadow-md"
                                      : "border-neutral-200 hover:border-brand-300 hover:bg-brand-50/50"
                                  }`}
                                  onClick={() =>
                                    handleSelectMonth(month.month, month.year)
                                  }
                                >
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                      <div className="font-semibold text-brand-800">
                                        {month.month} {month.year}
                                      </div>
                                      <div className="text-xs text-success-600 mt-1 font-medium">
                                        ✓ Available
                                      </div>
                                    </div>
                                    <Badge
                                      className={`${crowdInfo.bgColor} ${crowdInfo.textColor} ${crowdInfo.borderColor} border flex items-center gap-1.5 px-2.5 py-1`}
                                    >
                                      {crowdInfo.icon}
                                      <span className="text-xs font-medium">
                                        {crowdInfo.label}
                                      </span>
                                    </Badge>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center py-8 text-neutral-500">
                              No available months
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex justify-between text-neutral-700">
                          <span>Program Price</span>
                          <span className="font-semibold">
                            {formatCurrency(selectedCourse.investment)}
                          </span>
                        </div>

                        <Separator />

                        <div className="bg-gradient-to-br from-brand-50 to-electric-50 rounded-xl p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-700 font-medium">
                              Total
                            </span>
                            <span className="text-2xl font-bold text-brand-700">
                              {formatCurrency(selectedCourse.investment)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-100 to-electric-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-8 w-8 text-brand-600" />
                      </div>
                      <p className="text-neutral-500">
                        Select a program to see booking details
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-gradient-to-r from-neutral-50 to-brand-50 rounded-b-lg p-6 border-t border-brand-100">
                  <Button
                    onClick={handleProceedToSummary}
                    disabled={!selectedCourse || !selectedMonth}
                    className="w-full bg-gradient-to-r from-brand-600 to-electric-600 hover:from-brand-700 hover:to-electric-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed h-12 text-base font-semibold"
                  >
                    {!selectedCourse || !selectedMonth ? (
                      "Select Program & Date"
                    ) : (
                      <>
                        Proceed to Summary
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {selectedCourse && (
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-br from-accent-50 to-brand-50 rounded-t-lg border-b border-accent-100">
                    <CardTitle className="text-lg text-brand-800 flex items-center gap-2">
                      <Target className="h-5 w-5 text-accent-600" />
                      Program Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-6">
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                      {selectedCourse.description}
                    </p>
                    <div className="bg-gradient-to-br from-brand-50 to-electric-50 rounded-xl p-4">
                      <h4 className="font-semibold mb-3 text-brand-800 flex items-center gap-2">
                        <Users className="h-4 w-4 text-brand-600" />
                        Target Audience
                      </h4>
                      <ul className="space-y-2">
                        {selectedCourse.targetAudience
                          .slice(0, 3)
                          .map((audience, index) => (
                            <li
                              key={index}
                              className="flex items-start text-sm"
                            >
                              <span className="text-accent-500 mr-2 mt-0.5">
                                ●
                              </span>
                              <span className="text-neutral-700">
                                {audience}
                              </span>
                            </li>
                          ))}
                        {selectedCourse.targetAudience.length > 3 && (
                          <li className="text-sm text-brand-600 font-medium pl-4">
                            +{selectedCourse.targetAudience.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
