"use client";
import React from "react";
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
} from "lucide-react";
import Image from "next/image";

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

  const programs = [
    {
      id: 1,
      name: "General English",
      description: "Comprehensive English course for all levels",
      durationOptions: [
        { weeks: 2, price: "Rp 2,000,000", popular: false },
        { weeks: 4, price: "Rp 3,500,000", popular: true },
        { weeks: 12, price: "Rp 9,500,000", popular: false },
      ],
      levels: "A1-C2 (CEFR)",
      features: [
        "All CEFR Levels",
        "Interactive Classes",
        "Practical Communication",
        "Cultural Activities",
      ],
      popular: true,
    },
    {
      id: 2,
      name: "IELTS Mastery",
      description: "Intensive training for IELTS success (Academic & GT)",
      duration: "10 weeks",
      levels: "B1-C1 (CEFR)",
      price: "Rp 8,000,000/course",
      features: [
        "Exam Strategies",
        "Practice Tests",
        "Personal Feedback",
        "Guaranteed Results",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "TOEFL Preparation",
      description: "Comprehensive TOEFL iBT & ITP preparation",
      duration: "8 weeks",
      levels: "B1-C1 (CEFR)",
      price: "Rp 7,500,000/course",
      features: [
        "iBT & ITP Formats",
        "Test Simulation",
        "Score Improvement",
        "Academic Skills",
      ],
      popular: false,
    },
    {
      id: 4,
      name: "TOEIC Intensive",
      description: "Business English proficiency for the workplace",
      duration: "6 weeks",
      levels: "B1-B2 (CEFR)",
      price: "Rp 6,000,000/course",
      features: [
        "Business Vocabulary",
        "Listening Practice",
        "Reading Strategies",
        "Workplace Scenarios",
      ],
      popular: false,
    },
    {
      id: 5,
      name: "PET Preparation",
      description: "Preliminary English Test preparation",
      duration: "8 weeks",
      levels: "A2-B1 (CEFR)",
      price: "Rp 5,500,000/course",
      features: [
        "Everyday English",
        "Reading & Writing",
        "Listening Skills",
        "Speaking Practice",
      ],
      popular: false,
    },
  ];

  const cefrLevels = [
    {
      level: "A1",
      name: "Beginner",
      description:
        "Can understand and use familiar everyday expressions and very basic phrases.",
      skills: ["Introduction", "Basic Questions", "Simple Directions"],
    },
    {
      level: "A2",
      name: "Elementary",
      description:
        "Can communicate in simple and routine tasks requiring a simple exchange of information.",
      skills: ["Family Info", "Shopping", "Local Geography"],
    },
    {
      level: "B1",
      name: "Intermediate",
      description:
        "Can deal with most situations likely to arise whilst travelling in an area where the language is spoken.",
      skills: ["Work Experiences", "Dreams & Hopes", "Opinions"],
    },
    {
      level: "B2",
      name: "Upper Intermediate",
      description:
        "Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible.",
      skills: [
        "Complex Texts",
        "Technical Discussions",
        "Detailed Explanations",
      ],
    },
    {
      level: "C1",
      name: "Advanced",
      description:
        "Can use language flexibly and effectively for social, academic and professional purposes.",
      skills: ["Academic Articles", "Fluent Spontaneity", "Effective Language"],
    },
    {
      level: "C2",
      name: "Proficiency",
      description:
        "Can understand with ease virtually everything heard or read and summarize information from different sources.",
      skills: ["Everything Heard", "Spontaneous Fluency", "Nuanced Meanings"],
    },
  ];

  const schedules = [
    {
      program: "General English",
      options: [
        {
          type: "Weekday Classes",
          schedule: "Mon-Fri, 9:00-11:00 AM",
          duration: "2/4/12 weeks",
        },
        {
          type: "Evening Classes",
          schedule: "Mon-Fri, 6:00-8:00 PM",
          duration: "2/4/12 weeks",
        },
        {
          type: "Weekend Classes",
          schedule: "Sat-Sun, 9:00 AM-1:00 PM",
          duration: "4/12 weeks",
        },
      ],
    },
    {
      program: "IELTS Mastery",
      options: [
        {
          type: "Intensive Weekday",
          schedule: "Mon-Fri, 2:00-5:00 PM",
          duration: "10 weeks",
        },
        {
          type: "Weekend Intensive",
          schedule: "Sat-Sun, 9:00 AM-4:00 PM",
          duration: "10 weeks",
        },
      ],
    },
    {
      program: "TOEFL Preparation",
      options: [
        {
          type: "Weekday Classes",
          schedule: "Mon-Wed-Fri, 2:00-5:00 PM",
          duration: "8 weeks",
        },
        {
          type: "Weekend Classes",
          schedule: "Sat-Sun, 9:00 AM-1:00 PM",
          duration: "8 weeks",
        },
      ],
    },
    {
      program: "TOEIC Intensive",
      options: [
        {
          type: "Weekday Classes",
          schedule: "Tue-Thu, 6:00-8:00 PM",
          duration: "6 weeks",
        },
        {
          type: "Weekend Classes",
          schedule: "Sat, 9:00 AM-4:00 PM",
          duration: "6 weeks",
        },
      ],
    },
    {
      program: "PET Preparation",
      options: [
        {
          type: "Weekday Classes",
          schedule: "Mon-Wed-Fri, 4:00-6:00 PM",
          duration: "8 weeks",
        },
        {
          type: "Weekend Classes",
          schedule: "Sun, 9:00 AM-4:00 PM",
          duration: "8 weeks",
        },
      ],
    },
  ];

  const requirements = [
    {
      program: "General English",
      items: [
        "Minimum age: 17 years",
        "Basic education background",
        "Placement test required",
      ],
    },
    {
      program: "IELTS Mastery",
      items: [
        "Minimum age: 17 years",
        "Intermediate English level (B1)",
        "Valid ID required",
      ],
    },
    {
      program: "TOEFL Preparation",
      items: [
        "Minimum age: 17 years",
        "Intermediate English level (B1)",
        "Valid ID required",
      ],
    },
    {
      program: "TOEIC Intensive",
      items: [
        "Minimum age: 17 years",
        "Basic business experience recommended",
        "Valid ID required",
      ],
    },
    {
      program: "PET Preparation",
      items: [
        "Minimum age: 16 years",
        "Elementary English level (A2)",
        "Valid ID required",
      ],
    },
  ];

  const outcomes = [
    {
      program: "General English",
      items: [
        "Improved communication skills",
        "Confidence in everyday situations",
        "Cultural understanding",
      ],
    },
    {
      program: "IELTS Mastery",
      items: [
        "Target band score: 6.5-7.5+",
        "Exam strategies mastery",
        "Academic language proficiency",
      ],
    },
    {
      program: "TOEFL Preparation",
      items: [
        "Target score: 80-100+",
        "Academic English skills",
        "Test-taking techniques",
      ],
    },
    {
      program: "TOEIC Intensive",
      items: [
        "Target score: 750-900+",
        "Business communication skills",
        "Workplace vocabulary mastery",
      ],
    },
    {
      program: "PET Preparation",
      items: [
        "Cambridge PET certification",
        "Practical English skills",
        "Confidence in daily communication",
      ],
    },
  ];

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
    >,
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
                Program Kursus
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

        {/* Programs Section */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {programs.map((program) => (
                <Card
                  key={program.id}
                  className={`border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden ${program.popular ? "ring-2 ring-accent-500" : ""}`}
                >
                  {program.popular && (
                    <div className="bg-accent-500 py-1 px-4 text-white text-sm font-medium text-center">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{program.name}</CardTitle>
                      {program.popular && (
                        <Star className="h-5 w-5 text-accent-500 fill-accent-500" />
                      )}
                    </div>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {program.durationOptions ? (
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Duration Options:</h4>
                        <div className="space-y-3">
                          {program.durationOptions.map((option, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border ${option.popular ? "bg-accent-50 border-accent-200" : "bg-neutral-50 border-neutral-200"}`}
                            >
                              <div className="flex justify-between items-center">
                                <span>
                                  {option.weeks}{" "}
                                  {option.weeks === 1 ? "week" : "weeks"}
                                </span>
                                <span className="font-bold">
                                  {option.price}
                                </span>
                              </div>
                              {option.popular && (
                                <Badge className="mt-2 bg-accent-100 text-accent-800 text-xs">
                                  Most Popular
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-brand-500 mr-2" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-5 w-5 text-brand-500 mr-2" />
                          <span>{program.levels}</span>
                        </div>
                      </div>
                    )}

                    {!program.durationOptions && (
                      <div className="mb-6">
                        <span className="text-2xl font-bold text-brand-600">
                          {program.price}
                        </span>
                      </div>
                    )}

                    <ul className="space-y-2 mb-6">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${program.popular ? "bg-accent-500 hover:bg-accent-600" : "bg-brand-500 hover:bg-brand-600"}`}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CEFR Levels Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                CEFR Framework
              </h2>
              <p className="text-lg text-neutral-600">
                Our courses follow the Common European Framework of Reference
                for Languages (CEFR).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cefrLevels.map((level) => (
                <Card
                  key={level.level}
                  className="border-0 shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-brand-100 text-brand-800">
                        {level.level}
                      </Badge>
                      <span className="font-semibold">{level.name}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 mb-4">{level.description}</p>
                    <h4 className="font-medium mb-2">Key Skills:</h4>
                    <ul className="space-y-1">
                      {level.skills.map((skill, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></div>
                          <span className="text-sm">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
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

            <Tabs defaultValue="general" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="general">General English</TabsTrigger>
                <TabsTrigger value="ielts">IELTS</TabsTrigger>
                <TabsTrigger value="toefl">TOEFL</TabsTrigger>
                <TabsTrigger value="toeic">TOEIC</TabsTrigger>
                <TabsTrigger value="pet">PET</TabsTrigger>
              </TabsList>

              {schedules.map((schedule) => (
                <TabsContent
                  key={schedule.program}
                  value={schedule.program.toLowerCase().split(" ")[0]}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {schedule.program} Schedule Options
                      </CardTitle>
                      <CardDescription>
                        Choose the schedule that works best for you
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {schedule.options.map((option, index) => (
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
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <h4 className="font-semibold mb-4">Pricing</h4>
                        <div className="bg-gradient-to-r from-brand-50 to-accent-50 rounded-lg p-6">
                          {programs.find((p) => p.name === schedule.program)
                            ?.durationOptions ? (
                            <div className="space-y-3">
                              {programs
                                .find((p) => p.name === schedule.program)
                                ?.durationOptions?.map((option, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center"
                                  >
                                    <span>
                                      {option.weeks}{" "}
                                      {option.weeks === 1 ? "week" : "weeks"}
                                    </span>
                                    <span className="font-bold text-lg">
                                      {option.price}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <div className="text-center">
                              <span className="text-2xl font-bold text-brand-600">
                                {
                                  programs.find(
                                    (p) => p.name === schedule.program,
                                  )?.price
                                }
                              </span>
                              <p className="text-neutral-600 mt-2">
                                {
                                  programs.find(
                                    (p) => p.name === schedule.program,
                                  )?.duration
                                }
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Requirements & Outcomes Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Requirements & Target Outcomes
              </h2>
              <p className="text-lg text-neutral-600">
                Know what to expect and what you&apos;ll achieve with our
                programs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-brand-500" />
                    Requirements
                  </CardTitle>
                  <CardDescription>
                    What you need to enroll in our programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {requirements.map((req) => (
                      <div key={req.program}>
                        <h4 className="font-semibold mb-2">{req.program}</h4>
                        <ul className="space-y-2">
                          {req.items.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 mt-2"></div>
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                    Target Outcomes
                  </CardTitle>
                  <CardDescription>
                    What you&apos;ll achieve by completing our programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {outcomes.map((outcome) => (
                      <div key={outcome.program}>
                        <h4 className="font-semibold mb-2">
                          {outcome.program}
                        </h4>
                        <ul className="space-y-2">
                          {outcome.items.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Online Placement Test
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll recommend the right
                    program for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formSubmitted ? (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">
                        Success!
                      </AlertTitle>
                      <AlertDescription className="text-green-700">
                        Thank you for taking our placement test! Our team will
                        review your information and send a program
                        recommendation to your email shortly.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {formError && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertTitle className="text-red-800">
                            Error
                          </AlertTitle>
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
                            <option value="intermediate">
                              Intermediate (B1-B2)
                            </option>
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
                          <option value="general-english">
                            General English
                          </option>
                          <option value="ielts">IELTS Mastery</option>
                          <option value="toefl">TOEFL Preparation</option>
                          <option value="toeic">TOEIC Intensive</option>
                          <option value="pet">PET Preparation</option>
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
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 to-accent-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto text-white">
              <div className="text-5xl mb-6">🎓</div>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6">
                Ready to Start Your English Journey?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
                Join thousands of students who have improved their English
                skills with our specialized programs. Contact us today to
                discuss your learning goals and find the perfect program for
                you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-white text-brand-600 hover:bg-neutral-100 shadow-xl font-semibold px-8 py-4 text-base"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Programs
                </Button>
                <Button
                  size="lg"
                  className="bg-accent-600 hover:bg-accent-700 text-white shadow-xl font-semibold px-8 py-4 text-base"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Take Placement Test
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-semibold px-8 py-4 text-base transition-all"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>

              <div className="pt-8 border-t border-white/20">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                  <div className="text-3xl mb-3">💡</div>
                  <p className="text-white/90 font-medium">
                    <strong className="text-white">Pro tip:</strong> Mention
                    &quot;website inquiry&quot; when you contact us for special
                    rates and bundling options with our accommodation packages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
