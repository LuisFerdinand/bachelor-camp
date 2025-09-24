"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Star,
  Calendar,
  CheckCircle2,
  Phone,
  Navigation,
  Mail,
  BookOpen,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  getAllCourses,
  getSuitableCourses,
  Course,
} from "@/app/util/bookingData";

interface Building {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  badge?: string;
  badgeColor?: string;
  location: {
    address: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  pricing: Array<{
    id: number;
    type: string;
    price: string;
    description: string;
    highlight?: boolean;
  }>;
  features: string[];
  amenities: string[];
  rules: string[];
  gallery: Array<{
    image: string;
    imageAlt: string;
    title: string;
    description: string;
  }>;
  availability: {
    peakSeason: {
      months: string[];
      description: string;
    };
    mediumSeason: {
      months: string[];
      description: string;
    };
    lowSeason: {
      months: string[];
      description: string;
    };
  };
  slug: string;
}

interface BuildingDetailProps {
  building: Building;
}

// Course Card Component
const CourseCard: React.FC<{ course: Course; buildingSlug: string }> = ({
  course,
  buildingSlug,
}) => {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{course.name}</h3>
          <Badge className="bg-brand-100 text-brand-800">{course.level}</Badge>
        </div>
        <p className="text-sm text-neutral-600 mb-4">{course.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-neutral-600">
            <Calendar className="h-4 w-4 mr-2 text-neutral-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-sm text-neutral-600">
            <Users className="h-4 w-4 mr-2 text-neutral-500" />
            <span>{course.totalMeetings} meetings</span>
          </div>
        </div>
        <div className="font-bold text-blue-600 mb-4">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(course.investment)}
        </div>
        <div className="flex gap-2">
          <Link href={`/special-program/${course.slug}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-brand-500 text-brand-600 hover:bg-brand-50"
            >
              Learn More
            </Button>
          </Link>
          <Link
            href={`/booking?slug=${buildingSlug}&program=${course.slug}`}
            className="flex-1"
          >
            <Button className="w-full bg-brand-500 hover:bg-brand-600">
              Book
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export function BuildingDetail({ building }: BuildingDetailProps) {
  const [courses, setCourses] = React.useState<Course[]>([]);

  React.useEffect(() => {
    // Get courses suitable for this building
    const suitableCourses = getSuitableCourses(building.id);
    setCourses(suitableCourses);
  }, [building.id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">About {building.name}</h3>
              <p className="text-neutral-600 leading-relaxed">
                {building.longDescription}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-brand-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-neutral-800">Address</h4>
                    <p className="text-neutral-600">
                      {building.location.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-neutral-800">Phone</h4>
                    <p className="text-neutral-600">{building.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <Mail className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-neutral-800">Email</h4>
                    <p className="text-neutral-600">{building.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">House Rules</h3>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ul className="space-y-2">
                  {building.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Room Options</h3>
              <div className="space-y-4">
                {building.pricing.map((price) => (
                  <Card
                    key={price.id}
                    className={`border-0 shadow-sm ${
                      price.highlight ? "ring-2 ring-brand-200" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg">{price.type}</h4>
                          <p className="text-sm text-neutral-600">
                            {price.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-brand-600">
                            {price.price}
                          </div>
                          <div className="text-sm text-neutral-500">
                            per month
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/booking?slug=${building.slug}&room=${price.id}`}
                      >
                        <Button
                          className={`w-full mt-4 ${
                            price.highlight
                              ? "bg-brand-500 hover:bg-brand-600"
                              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                          }`}
                        >
                          Book Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ul className="space-y-3">
                  {building.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Available Programs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    buildingSlug={building.slug}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Amenities Tab */}
          <TabsContent value="amenities" className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Building Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {building.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-4 flex items-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Star className="h-5 w-5 text-brand-600" />
                    </div>
                    <span className="font-medium text-neutral-700">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
              {/* GallerySlider component will be used here */}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Pricing Card */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {building.pricing.map((price) => (
                <div
                  key={price.id}
                  className={`p-4 rounded-lg border ${
                    price.highlight
                      ? "border-brand-300 bg-brand-50"
                      : "border-neutral-200"
                  }`}
                >
                  <div className="text-sm text-neutral-600 mb-1">
                    {price.type}
                  </div>
                  <div className="text-xl font-bold text-brand-600">
                    {price.price}
                  </div>
                  <div className="text-xs text-neutral-500">per month</div>
                </div>
              ))}
            </div>
            <Link href={`/booking?slug=${building.slug}`}>
              <Button className="w-full bg-brand-500 hover:bg-brand-600 text-white mt-4">
                Book Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Availability Card */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-neutral-800 mb-2">
                  Peak Season
                </h4>
                <div className="text-sm text-neutral-600 mb-1">
                  {building.availability.peakSeason.months.join(", ")}
                </div>
                <p className="text-xs text-neutral-500">
                  {building.availability.peakSeason.description}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-neutral-800 mb-2">
                  Medium Season
                </h4>
                <div className="text-sm text-neutral-600 mb-1">
                  {building.availability.mediumSeason.months.join(", ")}
                </div>
                <p className="text-xs text-neutral-500">
                  {building.availability.mediumSeason.description}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-neutral-800 mb-2">
                  Low Season
                </h4>
                <div className="text-sm text-neutral-600 mb-1">
                  {building.availability.lowSeason.months.join(", ")}
                </div>
                <p className="text-xs text-neutral-500">
                  {building.availability.lowSeason.description}
                </p>
              </div>
            </div>
            <Link href={`/booking?slug=${building.slug}`}>
              <Button
                variant="outline"
                className="w-full border-brand-500 text-brand-600 hover:bg-brand-50"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Check Availability
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Programs Card */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-brand-500" />
              Available Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="p-3 bg-neutral-50 rounded-lg">
                  <div className="font-medium text-neutral-800">
                    {course.name}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {course.duration}
                  </div>
                  <div className="text-sm font-bold text-brand-600 mt-1">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(course.investment)}
                  </div>
                </div>
              ))}
              {courses.length > 3 && (
                <div className="text-center">
                  <Link href={`/booking?slug=${building.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full border-brand-500 text-brand-600 hover:bg-brand-50"
                    >
                      View All Programs
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
