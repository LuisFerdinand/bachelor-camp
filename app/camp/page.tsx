// app/camp/page.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  MapPin,
  Users,
  Home,
  Wifi,
  Coffee,
  Shield,
  BookOpen,
  Star,
  Calendar,
  Clock,
  Bed,
  Bath,
  AirVent,
  Shirt,
  CheckCircle2,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { getAllBuildings } from "@/app/util/buildingData";

// Define TypeScript interfaces for the CMS data
interface CMSImage {
  url: string;
  alt: string;
}
interface CampPageCMSData {
  heroMobileImage?: CMSImage;
  heroDesktopImage?: CMSImage;
  campusImage?: CMSImage;
}
interface CampPageProps {
  cmsData?: CampPageCMSData;
}

export default function CampPage({ cmsData }: CampPageProps) {
  // Get hero images with fallbacks to local images
  const heroImages = {
    mobile: {
      src: cmsData?.heroMobileImage?.url || "/HeroBg/Camp/CampBgMobile.png",
      alt:
        cmsData?.heroMobileImage?.alt ||
        "Student accommodation buildings - mobile view",
    },
    desktop: {
      src: cmsData?.heroDesktopImage?.url || "/HeroBg/Camp/CampBgDesktop.png",
      alt:
        cmsData?.heroDesktopImage?.alt ||
        "Student accommodation buildings - desktop view",
    },
  };

  // Get building image with fallback
  const buildingImage = {
    src:
      cmsData?.campusImage?.url ||
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: cmsData?.campusImage?.alt || "Student accommodation building",
  };

  // Building images slider data with facility titles
  const buildingSliderImages = [
    {
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Air Conditioning",
      description: "Climate controlled comfort in all rooms",
    },
    {
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Laundry Service",
      description: "Professional cleaning for all residents",
    },
    {
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Housekeeping",
      description: "Weekly room cleaning service",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Common Lounge",
      description: "Social gathering space for students",
    },
    {
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Study Rooms",
      description: "Quiet study areas for focused learning",
    },
    {
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "24/7 Security",
      description: "Round-the-clock safety and surveillance",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Get buildings from data
  const buildings = getAllBuildings();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % buildingSliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + buildingSliderImages.length) % buildingSliderImages.length,
    );
  };

  const seasons = [
    {
      months: ["December", "June", "July"],
      status: "Peak Season",
      color: "bg-red-100 text-red-800 border-red-200",
      description: "High demand period - book early for best availability",
      icon: "🔥",
    },
    {
      months: ["January", "October"],
      status: "Medium Season",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      description: "Moderate availability with good rates",
      icon: "📊",
    },
    {
      months: [
        "February",
        "March",
        "April",
        "May",
        "August",
        "September",
        "November",
      ],
      status: "Low Season",
      color: "bg-green-100 text-green-800 border-green-200",
      description: "Best availability and special rates",
      icon: "✨",
    },
  ];

  // All months in order for the calendar
  const allMonths = [
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

  const houseRules = {
    general: [
      "Quiet hours: 10:00 PM - 6:00 AM",
      "No smoking inside buildings",
      "Guest registration required",
      "Keep common areas clean",
      "Respect other residents",
    ],
    services: [
      "Weekly housekeeping included",
      "Laundry service available",
      "24/7 security & access control",
      "Maintenance support",
      "Reception assistance",
    ],
  };

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
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero Section - Enhanced with gradient overlay and better typography */}
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
                onError={(e) => {
                  console.error(
                    "Failed to load mobile hero image:",
                    heroImages.mobile.src,
                  );
                }}
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
                onError={(e) => {
                  console.error(
                    "Failed to load desktop hero image:",
                    heroImages.desktop.src,
                  );
                }}
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          </div>
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2">
                <Home className="w-4 h-4 mr-2" />
                Student Accommodation
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white drop-shadow-lg">
                Comfortable Student Living
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                Three modern buildings with complete facilities - AC, laundry,
                housekeeping, and 24/7 security. Choose from budget-friendly to
                premium options starting from Rp 600,000/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-brand-500 hover:bg-brand-600 text-white shadow-brand px-8 py-3 text-base font-semibold"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
                </Button>
                <Button
                  size="lg"
                  className="bg-accent-500 hover:bg-accent-600 text-white shadow-accent px-8 py-3 text-base font-semibold"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  WhatsApp Inquiry
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3 text-base font-semibold transition-all"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Building Showcase - Enhanced with image slider */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-brand-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
                Our Buildings
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900">
                Modern Student Accommodation
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Three modern buildings designed specifically for student comfort
                with complete amenities and flexible pricing options.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Image Slider */}
              <div className="rounded-2xl overflow-hidden shadow-xl relative h-96">
                <div className="relative h-full">
                  <Image
                    src={buildingSliderImages[currentSlide].image}
                    alt={buildingSliderImages[currentSlide].title}
                    fill
                    className="object-cover transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      console.error(
                        "Failed to load building image:",
                        buildingSliderImages[currentSlide].image,
                      );
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  {/* Facility Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">
                      {buildingSliderImages[currentSlide].title}
                    </h3>
                    <p className="text-sm text-white/80">
                      {buildingSliderImages[currentSlide].description}
                    </p>
                  </div>
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {buildingSliderImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-6" : "bg-white/50"}`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-display-sm font-bold text-neutral-900">
                  Student Living Made Easy
                </h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Our accommodation buildings feature modern amenities with
                  complete facilities including air conditioning, professional
                  laundry services, weekly housekeeping, and round-the-clock
                  security for your comfort and peace of mind.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-brand-100">
                    <MapPin className="h-6 w-6 text-brand-500 mr-3 flex-shrink-0" />
                    <span className="font-medium text-neutral-700">
                      Strategic Location
                    </span>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-accent-100">
                    <Users className="h-6 w-6 text-accent-500 mr-3 flex-shrink-0" />
                    <span className="font-medium text-neutral-700">
                      Student Community
                    </span>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-success-100">
                    <Shield className="h-6 w-6 text-success-500 mr-3 flex-shrink-0" />
                    <span className="font-medium text-neutral-700">
                      24/7 Security
                    </span>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-warning-100">
                    <Star className="h-6 w-6 text-warning-500 mr-3 flex-shrink-0" />
                    <span className="font-medium text-neutral-700">
                      Complete Facilities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Building Options - Enhanced cards with better visual hierarchy */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-accent-100 text-accent-800 border-0">
                Choose Your Home
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900">
                Building Options
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Select the accommodation that best fits your needs and budget.
                From budget-friendly shared spaces to premium private rooms.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {buildings.map((building) => (
                <Card
                  key={building.id}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${building.id === 1 ? "ring-2 ring-accent-200 scale-105" : ""}`}
                >
                  {/* Building Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={building.image}
                      alt={building.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {building.badge && (
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`${building.badgeColor} text-white border-0 px-3 py-1 shadow-md`}
                        >
                          {building.badge}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div
                    className={`h-2 ${building.id === 1 ? "bg-gradient-to-r from-accent-400 to-accent-500" : building.id === 2 ? "bg-gradient-to-r from-success-400 to-success-500" : "bg-gradient-to-r from-brand-500 to-brand-600"}`}
                  ></div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-neutral-900">
                      {building.name}
                    </CardTitle>
                    <CardDescription className="text-base text-neutral-600">
                      {building.description}
                    </CardDescription>
                    <div className="text-sm text-neutral-500 flex items-center mt-2">
                      <Bed className="h-4 w-4 mr-2" />
                      {building.rooms}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 text-neutral-800">
                        Pricing Options:
                      </h4>
                      <div className="space-y-3">
                        {building.pricing.map((price) => (
                          <div
                            key={price.id}
                            className={`p-4 rounded-xl border-2 transition-all ${price.highlight ? "bg-gradient-to-r from-brand-50 to-accent-50 border-brand-200 shadow-sm" : "bg-neutral-50 border-neutral-200"}`}
                          >
                            <div className="text-sm text-neutral-600 mb-1">
                              {price.type}
                            </div>
                            <div
                              className={`font-bold ${price.highlight ? "text-brand-700 text-lg" : "text-neutral-800"}`}
                            >
                              {price.price}
                            </div>
                            <div className="text-xs text-neutral-500 mt-1">
                              {price.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 text-neutral-800">
                        Features:
                      </h4>
                      <ul className="space-y-3">
                        {building.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle2 className="w-4 h-4 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-neutral-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/camp/${building.slug}`} className="flex-1">
                        <Button
                          className={`w-full py-3 font-semibold text-base transition-all ${building.id === 1 ? "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-accent" : building.id === 2 ? "bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 shadow-sm" : "bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-brand"} text-white`}
                        >
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="border-brand-500 text-brand-600 hover:bg-brand-50"
                      >
                        Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Calendar - Enhanced with calendar display and fewer colors */}
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
                Plan your stay according to our seasonal calendar. Book early
                during peak seasons for guaranteed availability.
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
                      <CardTitle className="text-base">
                        {season.status}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm text-neutral-600 mb-2">
                      <span className="font-medium">Months:</span>{" "}
                      {season.months.join(", ")}
                    </div>
                    <p className="text-sm text-neutral-600">
                      {season.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-brand-100 to-accent-100 rounded-2xl p-8 max-w-3xl mx-auto border border-brand-200">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="font-bold text-brand-800 mb-3 text-xl">
                  Planning Your Stay?
                </h3>
                <p className="text-brand-700 leading-relaxed mb-6">
                  Contact us to check real-time availability and get the best
                  rates for your preferred dates. Early booking during peak
                  seasons is highly recommended.
                </p>
                <Button className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 font-semibold">
                  <Phone className="w-4 h-4 mr-2" />
                  Check Availability Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
