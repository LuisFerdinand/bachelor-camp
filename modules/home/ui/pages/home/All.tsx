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

export const HomePage = () => {
  // Hero section data - easily replaceable with CMS data
  const heroData = {
    backgroundImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    badge: {
      text: "New Programs Available",
      bgColor: "bg-accent-100",
      textColor: "text-accent-800",
      hoverColor: "hover:bg-accent-200",
    },
    title: "Master English with Expert Instructors",
    subtitle:
      "Premium English learning experience with professional facilities, expert instructors, and proven results.",
    buttons: [
      {
        text: "Explore Programs",
        variant: "primary",
        bgColor: "bg-brand-500",
        hoverColor: "hover:bg-brand-600",
      },
      {
        text: "Book a Consultation",
        variant: "outline",
        borderColor: "border-accent-500",
        textColor: "text-accent-600",
        hoverBg: "hover:bg-accent-500",
        hoverText: "hover:text-white",
      },
    ],
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

  const { data: banner, isLoading } = trpc.banners.getOne.useQuery({
    type: "Home",
  });

  const show1 = !!banner?.ctas?.[0]?.isShown;
  const show2 = !!banner?.ctas?.[1]?.isShown;
  const show3 = !!banner?.ctas?.[2]?.isShown;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section with Background Image */}
        <section
          className="relative py-20 md:py-32 min-h-screen flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${banner?.mediaUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-4 w-full">
            <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
              <Badge
                className={`mb-4 ${heroData.badge.bgColor} ${heroData.badge.textColor} ${heroData.badge.hoverColor}`}
              >
                <TagIcon className="size-3 mr-1"></TagIcon>
                {banner?.badgeText}
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white">
                {banner?.headline}
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl">
                {banner?.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                {show1 === true && (
                  <Button
                    size="lg"
                    className={`${heroData.buttons[0].bgColor} ${heroData.buttons[0].hoverColor} text-white shadow-lg`}
                  >
                    {banner.ctas![0].ctaText}
                  </Button>
                )}
                {show2 === true && (
                  <Button
                    size="lg"
                    variant="outline"
                    className={`${heroData.buttons[1].borderColor} ${heroData.buttons[1].textColor} ${heroData.buttons[1].hoverBg} ${heroData.buttons[1].hoverText} bg-white/10 backdrop-blur-sm border-2 shadow-lg`}
                  >
                    {banner.ctas![1].ctaText}
                  </Button>
                )}
                {show3 && (
                  <Button
                    size="lg"
                    className="relative overflow-hidden rounded-2xl border-2 border-indigo-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
             px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl"
                  >
                    <span className="relative z-10">
                      {banner.ctas![2].ctaText}
                    </span>
                    <span className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Floating Hero Images */}
          <div className="absolute bottom-8 right-8 hidden lg:block">
            <div className="flex space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80"
                  alt="Student studying"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/30 shadow-lg mt-4">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80"
                  alt="Group discussion"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="order-2 lg:order-1">
                <div className="max-w-xl">
                  <h2 className="text-display-sm lg:text-display-md font-bold text-neutral-900 mb-6">
                    Your Success Is Our <span className="text-brand-600">Priority</span>
                  </h2>
                  
                  <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                    We combine proven teaching methods with world-class facilities
                    to deliver exceptional English learning experiences that transform your future.
                  </p>
                  
                  {/* Key Features List */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-neutral-900 mb-1">Expert Native Instructors</h5>
                        <p className="text-neutral-600 text-sm">TESOL certified teachers with 10+ years experience</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-neutral-900 mb-1">95% Success Rate</h5>
                        <p className="text-neutral-600 text-sm">Students achieve IELTS target scores within 8 weeks</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-neutral-900 mb-1">Small Class Sizes</h5>
                        <p className="text-neutral-600 text-sm">Maximum 12 students per class for personalized attention</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-neutral-900 mb-1">International Environment</h5>
                        <p className="text-neutral-600 text-sm">English-only campus with students from 15+ countries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Image with Conversation Bubble */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative max-w-md mx-auto lg:max-w-none">
                  {/* Main Image */}
                  <Image
                    src="/home/whyUs-sec.svg" 
                    alt="Happy student giving thumbs up" 
                    className="w-full h-auto max-w-sm mx-auto lg:max-w-md"
                    width={100}
                    height={100}
                  />
                  
                  {/* Conversation Bubble */}
                  <div className="absolute -bottom-4 lg:-top-4 right-4 lg:-left-12 max-w-xs">
                    <div className="bg-white rounded-2xl px-6 py-4 shadow-xl border border-neutral-100 relative">
                      {/* Speech bubble tail */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full lg:hidden">
                        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white"></div>
                      </div>
                      <div className="absolute bottom-0 right-8 transform translate-y-full hidden lg:block">
                        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white"></div>
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">BC</span>
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 text-sm">Bachelor Camp</p>
                          <p className="text-neutral-500 text-xs">English Expert</p>
                        </div>
                      </div>
                      
                      <p className="text-neutral-700 text-sm leading-relaxed">
                        &quot;Ready to achieve your English goals? Join thousands of successful students! 🚀&quot;
                      </p>
                      
                      {/* Typing indicator */}
                      <div className="flex items-center space-x-1 mt-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-neutral-500 ml-2">Bachelor Camp is typing...</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-8 right-4 lg:right-8">
                    <div className="bg-accent-500 text-neutral-900 px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                      ⭐ 4.9/5 Rating
                    </div>
                  </div>
                  
                  <div className="absolute bottom-64 lg:bottom-4 left-0 lg:-left-8">
                    <div className="bg-brand-600 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                      ✅ 1000+ Graduates
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Three Pillars Section with Background Images */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Our Learning Pillars
              </h2>
              <p className="text-lg text-neutral-600">
                We focus on three core areas to ensure comprehensive English
                language mastery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1756547275349-7c7d668f3ce3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Camp Programs"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center m-4">
                      <Home className="h-8 w-8 text-brand-600" />
                    </div>
                  </div>
                </div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">Camp Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    Immersive learning environments with comfortable
                    accommodations and structured daily activities.
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Comfortable Accommodation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">
                        Structured Daily Activities
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Cultural Excursions</span>
                    </div>
                  </div>
                  <Link href="/camp">
                    <Button
                      variant="ghost"
                      className="w-full mt-4 text-brand-600 hover:text-brand-800"
                    >
                      Learn More <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Specialized Courses"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center m-4">
                      <BookOpen className="h-8 w-8 text-accent-600" />
                    </div>
                  </div>
                </div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">Specialized Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    Targeted programs for specific English needs including IELTS
                    prep and business English.
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">IELTS Preparation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Business English</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">CEFR Level Certification</span>
                    </div>
                  </div>
                  <Link href="/special-program">
                    <Button
                      variant="ghost"
                      className="w-full mt-4 text-accent-600 hover:text-accent-800"
                    >
                      Explore Courses <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Testing and Assessment"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="w-16 h-16 rounded-full bg-electric-100 flex items-center justify-center m-4">
                      <Users className="h-8 w-8 text-electric-600" />
                    </div>
                  </div>
                </div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">
                    Testing & Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    Comprehensive evaluation systems to track progress and
                    certify language proficiency.
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Free Testing Form</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Official Certification</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Personalized Feedback</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-4 text-electric-600 hover:text-electric-800"
                  >
                    View Testing <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Student Life at Kediri
              </h2>
              <p className="text-lg text-neutral-600">
                Experience the vibrant community and rich activities that make
                learning English enjoyable and memorable.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {[
                {
                  src: "https://images.unsplash.com/photo-1659287590518-81891c997956?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Group Activities",
                },
                {
                  src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                  alt: "Study Groups",
                },
                {
                  src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                  alt: "Technology Lab",
                },
                {
                  src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                  alt: "Outdoor Learning",
                },
                {
                  src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                  alt: "Individual Study",
                },
                {
                  src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                  alt: "Presentations",
                },
              ].map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-32">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
            {/* Call to Action */}
            <div className="text-center">
              <Link href="/gallery">
                <Button
                  size="lg"
                  className="bg-brand-500 hover:bg-brand-600 shadow-lg"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  View Full Gallery
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
