// app/camp/[slug]/page.tsx
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ArrowLeft,
  Navigation,
  Mail,
  Camera,
  Grid,
  Info,
} from "lucide-react";
import Link from "next/link";
import {
  getBuildingBySlug,
  getRelatedBuildings,
} from "@/app/util/buildingData";

interface BuildingDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BuildingDetailPage({
  params,
}: BuildingDetailPageProps) {
  // Find the building based on the slug
  const building = getBuildingBySlug(params.slug);

  if (!building) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Building Not Found</h1>
          <p className="mb-6">The building you're looking for doesn't exist.</p>
          <Link href="/camp">
            <Button>Back to Camp</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related buildings
  const relatedBuildings = getRelatedBuildings(building.id, 2);

  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State for active tab
  const [activeTab, setActiveTab] = useState("overview");

  // Functions for gallery navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % building.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + building.gallery.length) % building.gallery.length,
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero Section with Building Image */}
        <section className="relative h-96">
          <Image
            src={building.image}
            alt={building.imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="max-w-3xl">
                <div className="flex items-center mb-4">
                  <Link
                    href="/camp"
                    className="inline-flex items-center text-white hover:text-gray-200"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Camp
                  </Link>
                </div>
                <Badge
                  className={`${building.badgeColor} text-white border-0 mb-4 inline-block`}
                >
                  {building.badge}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {building.name}
                </h1>
                <p className="text-lg text-white/90 max-w-2xl">
                  {building.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Building Details */}
        <section className="py-16 bg-gradient-to-br from-neutral-50 to-brand-50/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="rooms">Rooms</TabsTrigger>
                      <TabsTrigger value="amenities">Amenities</TabsTrigger>
                      <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4">
                          About {building.name}
                        </h3>
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
                              <h4 className="font-medium text-neutral-800">
                                Address
                              </h4>
                              <p className="text-neutral-600">
                                {building.location.address}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-neutral-800">
                                Phone
                              </h4>
                              <p className="text-neutral-600">
                                {building.contact.phone}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center mt-4">
                            <Mail className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-neutral-800">
                                Email
                              </h4>
                              <p className="text-neutral-600">
                                {building.contact.email}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="mt-4 border-brand-500 text-brand-600 hover:bg-brand-50"
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
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
                              className={`border-0 shadow-sm ${price.highlight ? "ring-2 ring-brand-200" : ""}`}
                            >
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-bold text-lg">
                                      {price.type}
                                    </h4>
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
                                <Button
                                  className={`w-full mt-4 ${price.highlight ? "bg-brand-500 hover:bg-brand-600" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"}`}
                                >
                                  Book Now
                                </Button>
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
                                <span className="text-neutral-700">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Amenities Tab */}
                    <TabsContent value="amenities" className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4">
                          Building Amenities
                        </h3>
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
                        <h3 className="text-xl font-bold mb-4">
                          Photo Gallery
                        </h3>
                        <div className="relative rounded-2xl overflow-hidden shadow-xl h-96">
                          <Image
                            src={building.gallery[currentImageIndex].image}
                            alt={building.gallery[currentImageIndex].imageAlt}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-xl font-bold mb-1">
                              {building.gallery[currentImageIndex].title}
                            </h3>
                            <p className="text-sm text-white/80">
                              {building.gallery[currentImageIndex].description}
                            </p>
                          </div>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-6 w-6 text-white" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-6 w-6 text-white" />
                          </button>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {building.gallery.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white w-6" : "bg-white/50"}`}
                                aria-label={`Go to image ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                        {building.gallery.map((image, index) => (
                          <div
                            key={index}
                            className="relative rounded-lg overflow-hidden shadow-md h-24 cursor-pointer"
                            onClick={() => setCurrentImageIndex(index)}
                          >
                            <Image
                              src={image.image}
                              alt={image.imageAlt}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Camera className="h-6 w-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        ))}
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
                            className={`p-4 rounded-lg border ${price.highlight ? "border-brand-300 bg-brand-50" : "border-neutral-200"}`}
                          >
                            <div className="text-sm text-neutral-600 mb-1">
                              {price.type}
                            </div>
                            <div className="text-xl font-bold text-brand-600">
                              {price.price}
                            </div>
                            <div className="text-xs text-neutral-500">
                              per month
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full bg-brand-500 hover:bg-brand-600 text-white mt-4">
                        Book Now
                      </Button>
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
                            {building.availability.mediumSeason.months.join(
                              ", ",
                            )}
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
                      <Button
                        variant="outline"
                        className="w-full border-brand-500 text-brand-600 hover:bg-brand-50"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Check Availability
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Contact Card */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-neutral-800">
                              Phone
                            </h4>
                            <p className="text-neutral-600">
                              {building.contact.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-neutral-800">
                              Email
                            </h4>
                            <p className="text-neutral-600">
                              {building.contact.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1 bg-brand-500 hover:bg-brand-600 text-white">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-accent-500 text-accent-600 hover:bg-accent-50"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Buildings Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-display-sm font-bold mb-8">
                Related Buildings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedBuildings.map((relatedBuilding) => (
                  <Card
                    key={relatedBuilding.id}
                    className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedBuilding.image}
                        alt={relatedBuilding.imageAlt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">
                        {relatedBuilding.name}
                      </h3>
                      {/* <p className="text-neutral-600 mb-4">
                        {relatedBuilding.shortDescription}
                      </p> */}
                      <Link href={`/camp/${relatedBuilding.slug}`}>
                        <Button
                          variant="outline"
                          className="w-full border-brand-500 text-brand-600 hover:bg-brand-50"
                        >
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
