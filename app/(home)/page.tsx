"use client";
import React from "react";
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
} from "lucide-react";
export default function HomePage() {
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

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section with Background Image */}
        <section
          className="relative py-20 md:py-32 min-h-screen flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroData.backgroundImage})`,
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
                {heroData.badge.text}
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white">
                {heroData.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl">
                {heroData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Button
                  size="lg"
                  className={`${heroData.buttons[0].bgColor} ${heroData.buttons[0].hoverColor} text-white shadow-lg`}
                >
                  {heroData.buttons[0].text}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`${heroData.buttons[1].borderColor} ${heroData.buttons[1].textColor} ${heroData.buttons[1].hoverBg} ${heroData.buttons[1].hoverText} bg-white/10 backdrop-blur-sm border-2 shadow-lg`}
                >
                  {heroData.buttons[1].text}
                </Button>
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
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center m-4">
                      <Users className="h-8 w-8 text-green-600" />
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
                      <span className="text-sm">Progress Tracking</span>
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
                    className="w-full mt-4 text-green-600 hover:text-green-800"
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
        <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Student Life at Bachelor Camp
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
}
