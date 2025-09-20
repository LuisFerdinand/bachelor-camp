"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestimonialSlider } from "@/components/common/TestimonialSlider";
import {
  Users,
  BookOpen,
  Home,
  ChevronRight,
  CheckCircle,
  Camera,
  Wifi,
  Coffee,
  Utensils,
  Dumbbell,
  Globe,
  Heart,
  TagIcon,
} from "lucide-react";
import { trpc } from "@/trpc/client";
import HomePillarsSection from "../../sections/home/HomePillarsSection";
import HomeHeroSection from "../../sections/home/HomeHeroSection";
import { StudentLifeGallery } from "../../components/home/StudentLifeGallery";

export const HomePage = () => {
  const generatePillarStyles = (
    color: "brand" | "accent" | "green" | "blue" | "purple" | "orange"
  ) => {
    const baseColors: Record<string, { bg: string; text: string }> = {
      brand: { bg: "bg-brand-100", text: "text-brand-600" },
      accent: { bg: "bg-accent-100", text: "text-accent-600" },
      green: { bg: "bg-green-100", text: "text-green-600" },
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600" },
    };

    return {
      iconWrapper: `${baseColors[color].bg} flex items-center justify-center w-16 h-16 rounded-full m-4`,
      iconColor: `${baseColors[color].text}`,
      button: `w-full mt-4 ${baseColors[color].text} hover:${baseColors[
        color
      ].text.replace("600", "800")}`,
    };
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Professional",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "The IELTS preparation course helped me achieve my target score in just 8 weeks. The instructors are top-notch!",
      rating: 5,
    },
    {
      id: 2,
      name: "Ahmad Hassan",
      role: "University Student",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "The camp experience was life-changing. I made friends from around the world while improving my English significantly.",
      rating: 5,
    },
    {
      id: 3,
      name: "Mei Lin",
      role: "Travel Enthusiast",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "The General English program gave me the confidence to travel solo. The practical approach really works!",
      rating: 4,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Marketing Executive",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "The business English course transformed my professional communication. I'm now more confident in meetings with international clients.",
      rating: 5,
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      role: "University Student",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "The personalized attention from instructors made all the difference. My speaking skills improved dramatically in just one month.",
      rating: 5,
    },
    {
      id: 6,
      name: "James Wilson",
      role: "IT Professional",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "I needed English for my career advancement. The flexible schedule and practical approach helped me achieve my goals while working full-time.",
      rating: 4,
    },
  ];
  const bundles = [
    {
      id: 1,
      title: "Complete English Mastery",
      description: "6-month comprehensive program with all courses",
      price: "Rp 15,000,000",
      discount: "Save 20%",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "General English",
        "IELTS Prep",
        "Conversation Club",
        "Accommodation",
      ],
    },
    {
      id: 2,
      title: "Intensive Camp Experience",
      description: "4-week immersive camp with accommodation",
      price: "Rp 8,500,000",
      discount: "Save 15%",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Daily Classes",
        "Cultural Activities",
        "Weekend Excursions",
        "Full Board",
      ],
    },
  ];
  const campFacilities = [
    {
      icon: Home,
      title: "Luxury Dormitories",
      description: "Air-conditioned rooms with modern amenities",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      description: "24/7 WiFi access throughout campus",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: Utensils,
      title: "International Cuisine",
      description: "Diverse dining options and healthy meals",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "Modern gym and sports facilities",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: Coffee,
      title: "Study Lounges",
      description: "Comfortable spaces for group study",
      image:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: Globe,
      title: "Cultural Center",
      description: "International community activities",
      image:
        "https://images.unsplash.com/photo-1659287590518-81891c997956?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const { data: pillars, isLoading: isLoadingPillars } =
    trpc.pillars.getMany.useQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HomeHeroSection></HomeHeroSection>
        {/* Three Pillars Section with Background Images */}
        <HomePillarsSection
          pillars={pillars}
          isLoading={isLoadingPillars}
        ></HomePillarsSection>
        {/* Campus Facilities Section */}
        <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge className="bg-brand-100 text-brand-800 mb-4">
                World-Class Facilities
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Everything You Need for Success
              </h2>
              <p className="text-lg text-neutral-600">
                Our comprehensive facilities ensure you have everything needed
                for an optimal learning experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campFacilities.map((facility, index) => {
                const IconComponent = facility.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                        <div className="flex items-center space-x-3 p-4">
                          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">
                              {facility.title}
                            </h3>
                            <p className="text-white/80 text-sm">
                              {facility.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section with Background */}
        <section
          className="py-16 relative"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4 text-white">
                Student Success Stories
              </h2>
              <p className="text-lg text-gray-200">
                Hear from our students who have transformed their English skills
                and future opportunities.
              </p>
            </div>

            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>

        {/* Enhanced Bundles Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Special Bundles
              </h2>
              <p className="text-lg text-neutral-600">
                Save more with our specially curated program bundles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {bundles.map((bundle) => (
                <Card
                  key={bundle.id}
                  className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={bundle.image}
                      alt={bundle.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-6 text-white w-full">
                        <Badge className="bg-white/20 text-white mb-2">
                          {bundle.discount}
                        </Badge>
                        <h3 className="text-2xl font-bold">{bundle.title}</h3>
                        <p className="opacity-90">{bundle.description}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-neutral-900">
                        {bundle.price}
                      </span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {bundle.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-brand-500 hover:bg-brand-600 shadow-lg">
                      <Heart className="h-4 w-4 mr-2" />
                      Get This Bundle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Student Life Gallery Section */}
        <StudentLifeGallery />
      </main>
    </div>
  );
};
