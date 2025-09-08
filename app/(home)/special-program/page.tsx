"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  TrendingUp,
  Calendar,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import {
  getAllCourses,
  getCoursesByCategory,
  Course,
} from "@/app/util/bookingData";
import Link from "next/link";

// Define TypeScript interfaces for the CMS data
interface CMSImage {
  url: string;
  alt: string;
}
interface ProgramPageCMSData {
  heroMobileImage?: CMSImage;
  heroDesktopImage?: CMSImage;
}
interface ProgramPageProps {
  cmsData?: ProgramPageCMSData;
}

// Helper component to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Course Card Component
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const isPopular = course.category === "IELTS" || course.level === "ADVANCED";
  return (
    <Card
      className={`border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col ${
        isPopular ? "ring-2 ring-accent-500" : ""
      }`}
    >
      {isPopular && (
        <div className="bg-accent-500 py-1 px-4 text-white text-sm font-medium text-center">
          MOST POPULAR
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{course.name}</CardTitle>
          {isPopular && (
            <Star className="h-5 w-5 text-accent-500 fill-accent-500" />
          )}
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-brand-500 mr-2" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-brand-500 mr-2" />
            <span>{course.totalMeetings} meetings</span>
          </div>
        </div>
        <div className="mb-6">
          <span className="text-2xl font-bold text-brand-600">
            {formatCurrency(course.investment)}
          </span>
        </div>
        <ul className="space-y-2 mb-6 flex-grow">
          {course.goals.slice(0, 4).map((goal, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">{goal}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 mt-auto">
          <Button
            asChild
            variant="outline"
            className={`${
              isPopular
                ? "border-accent-500 text-accent-500 hover:bg-accent-50"
                : "border-brand-500 text-brand-500 hover:bg-brand-50"
            }`}
          >
            <Link href={`/special-program/${course.slug}`}>Learn More</Link>
          </Button>
          <Button
            asChild
            className={`${
              isPopular
                ? "bg-accent-500 hover:bg-accent-600"
                : "bg-brand-500 hover:bg-brand-600"
            }`}
          >
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Course Slider Component
const CourseSlider: React.FC<{ courses: Course[] }> = ({ courses }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-x-hidden" ref={emblaRef}>
        <div className="flex">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3 py-4"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rounded-full bg-white/80 backdrop-blur-sm border border-white shadow-md hover:bg-white"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 rounded-full bg-white/80 backdrop-blur-sm border border-white shadow-md hover:bg-white"
        onClick={scrollNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

// Schedule & Pricing Component
const SchedulePricing: React.FC = () => {
  const categories = ["IELTS", "TOEFL", "TOEIC", "PRONUNCIATION"];
  const scheduleMapping = {
    IELTS: [
      {
        type: "Intensive Weekday",
        schedule: "Mon-Fri, 2:00-5:00 PM",
        duration: "3 months",
      },
      {
        type: "Weekend Intensive",
        schedule: "Sat-Sun, 9:00 AM-4:00 PM",
        duration: "3 months",
      },
    ],
    TOEFL: [
      {
        type: "Weekday Classes",
        schedule: "Mon-Wed-Fri, 2:00-5:00 PM",
        duration: "1 month",
      },
      {
        type: "Weekend Classes",
        schedule: "Sat-Sun, 9:00 AM-1:00 PM",
        duration: "1 month",
      },
    ],
    TOEIC: [
      {
        type: "Weekday Classes",
        schedule: "Tue-Thu, 6:00-8:00 PM",
        duration: "1 month",
      },
      {
        type: "Weekend Classes",
        schedule: "Sat, 9:00 AM-4:00 PM",
        duration: "1 month",
      },
    ],
    PRONUNCIATION: [
      {
        type: "Weekday Classes",
        schedule: "Mon-Fri, 4:00-6:00 PM",
        duration: "1 month",
      },
      {
        type: "Weekend Classes",
        schedule: "Sat, 10:00 AM-2:00 PM",
        duration: "1 month",
      },
    ],
  };

  return (
    <Tabs defaultValue="ielts" className="w-full max-w-5xl mx-auto">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category.toLowerCase()}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent key={category} value={category.toLowerCase()}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {category} Schedule Options
              </CardTitle>
              <CardDescription>
                Choose the schedule that works best for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduleMapping[category as keyof typeof scheduleMapping].map(
                  (option, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{option.type}</h4>
                        <Badge className="bg-brand-100 text-brand-800">
                          {option.duration}
                        </Badge>
                      </div>
                      <div className="flex items-center text-neutral-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{option.schedule}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold mb-4">Pricing</h4>
                <div className="bg-gradient-to-r from-brand-50 to-accent-50 rounded-lg p-6">
                  <div className="space-y-3">
                    {getCoursesByCategory(category as Course["category"]).map(
                      (course) => (
                        <div
                          key={course.id}
                          className="flex justify-between items-center"
                        >
                          <span>{course.name}</span>
                          <span className="font-bold text-lg">
                            {formatCurrency(course.investment)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

// Placement Test Form Component
const PlacementTestForm: React.FC = () => {
  const categories = ["IELTS", "TOEFL", "TOEIC", "PRONUNCIATION"];
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    currentLevel: "",
    programInterest: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formError, setFormError] = React.useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.currentLevel ||
      !formData.programInterest
    ) {
      setFormError(true);
      return;
    }
    // In a real application, this would send the data to a server
    console.log("Placement test form submitted:", formData);
    // Simulate sending to admin
    setTimeout(() => {
      setFormSubmitted(true);
      setFormError(false);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        currentLevel: "",
        programInterest: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Online Placement Test</CardTitle>
        <CardDescription>
          Fill out the form below and we&apos;ll recommend the right program for
          you
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formSubmitted ? (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              Thank you for taking our placement test! Our team will review your
              information and send a program recommendation to your email
              shortly.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  Please fill in all required fields.
                </AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+62 812 3456 7890"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="currentLevel"
                  className="block text-sm font-medium mb-1"
                >
                  Current English Level *
                </label>
                <select
                  id="currentLevel"
                  name="currentLevel"
                  value={formData.currentLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  required
                >
                  <option value="">Select your level</option>
                  <option value="beginner">Beginner (A1-A2)</option>
                  <option value="intermediate">Intermediate (B1-B2)</option>
                  <option value="advanced">Advanced (C1-C2)</option>
                  <option value="not-sure">Not sure</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="programInterest"
                className="block text-sm font-medium mb-1"
              >
                Program of Interest *
              </label>
              <select
                id="programInterest"
                name="programInterest"
                value={formData.programInterest}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                required
              >
                <option value="">Select a program</option>
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
                <option value="not-sure">Not sure yet</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Additional Information (Optional)
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your learning goals or any questions you have..."
                rows={4}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-brand-500 hover:bg-brand-600"
            >
              Submit Placement Test
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default function ProgramPage({ cmsData }: ProgramPageProps) {
  // Get hero images with fallbacks to local images
  const heroImages = {
    mobile: {
      src:
        cmsData?.heroMobileImage?.url ||
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt:
        cmsData?.heroMobileImage?.alt ||
        "English language classroom - mobile view",
    },
    desktop: {
      src:
        cmsData?.heroDesktopImage?.url ||
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      alt:
        cmsData?.heroDesktopImage?.alt ||
        "English language classroom - desktop view",
    },
  };

  // Get all courses
  const courses = getAllCourses();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Images */}
          <div className="absolute inset-0">
            {/* Mobile Background */}
            <div className="block md:hidden absolute inset-0">
              <Image
                src={heroImages.mobile.src}
                alt={heroImages.mobile.alt}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            {/* Desktop Background */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src={heroImages.desktop.src}
                alt={heroImages.desktop.alt}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          </div>
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                Special Program
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white drop-shadow-lg">
                English Programs for Every Goal
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                Specialized courses designed to meet specific learning
                objectives with expert instruction and proven methodologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-brand-500 hover:bg-brand-600 text-white shadow-brand px-8 py-3 text-base font-semibold"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Programs
                </Button>
                <Button
                  size="lg"
                  className="bg-accent-500 hover:bg-accent-600 text-white shadow-accent px-8 py-3 text-base font-semibold"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Take Placement Test
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3 text-base font-semibold transition-all"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section with Slider */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Our Special Programs
              </h2>
              <p className="text-lg text-neutral-600">
                Choose from our specialized courses designed for specific
                learning objectives.
              </p>
            </div>

            {/* Course Slider */}
            <div className="max-w-6xl mx-auto">
              <CourseSlider courses={courses} />
            </div>
          </div>
        </section>

        {/* Schedule & Pricing Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Schedule & Pricing
              </h2>
              <p className="text-lg text-neutral-600">
                Flexible schedules and transparent pricing for all our programs.
              </p>
            </div>
            <SchedulePricing />
          </div>
        </section>

        {/* Placement Test Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Placement Test
              </h2>
              <p className="text-lg text-neutral-600">
                Take our short placement test to determine your current English
                level and get a program recommendation.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <PlacementTestForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
