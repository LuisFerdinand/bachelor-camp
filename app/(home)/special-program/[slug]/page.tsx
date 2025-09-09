"use client";
import React from "react";
import { notFound } from "next/navigation";
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
  BookOpen,
  Clock,
  Star,
  CheckCircle,
  TrendingUp,
  Calendar,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Users,
  Award,
  FileText,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCourseBySlug, Course } from "@/app/util/bookingData";

// Helper component to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Course Detail Header Component
const CourseDetailHeader: React.FC<{ course: Course }> = ({ course }) => {
  const isPopular = course.category === "IELTS" || course.level === "ADVANCED";
  return (
    <div className="relative bg-gradient-to-r from-brand-600 to-accent-500 py-16 md:py-24">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/special-program"
            className="inline-flex items-center text-white mb-6 hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Programs
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className="bg-white/20 text-white border border-white/30">
              {course.category}
            </Badge>
            <Badge className="bg-white/20 text-white border border-white/30">
              {course.level}
            </Badge>
            {isPopular && (
              <Badge className="bg-accent-500 text-white">
                <Star className="w-3 h-3 mr-1 fill-current" />
                MOST POPULAR
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {course.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center text-white">
              <Clock className="h-5 w-5 mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center text-white">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{course.totalMeetings} meetings</span>
            </div>
            <div className="flex items-center text-white">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span>{formatCurrency(course.investment)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-600 hover:bg-neutral-100"
            >
              {/* Updated to include course slug */}
              <Link href={`/booking?course=${course.slug}`}>Book Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-600"
            >
              <Link href="/special-program">
                <BookOpen className="w-5 h-5 mr-2" />
                View Other Programs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Course Overview Component
const CourseOverview: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Target className="h-5 w-5 text-brand-500 mr-2" />
            Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {course.goals.map((goal, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{goal}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <FileText className="h-5 w-5 text-brand-500 mr-2" />
            Syllabus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {course.syllabus.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 mt-2 flex-shrink-0"></div>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Award className="h-5 w-5 text-brand-500 mr-2" />
            Facilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {course.facilities.map((facility, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{facility}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Course Details Tabs Component
const CourseDetailsTabs: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Tabs defaultValue="learning-method" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="learning-method">Learning Method</TabsTrigger>
        <TabsTrigger value="target-audience">Target Audience</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
      </TabsList>
      <TabsContent value="learning-method">
        <Card>
          <CardHeader>
            <CardTitle>Learning Method</CardTitle>
            <CardDescription>
              How we deliver our {course.name} program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {course.learningMethod.map((method, index) => (
                <li
                  key={index}
                  className="flex items-start p-4 bg-neutral-50 rounded-lg"
                >
                  <div className="bg-brand-100 p-2 rounded-full mr-4">
                    <BookOpen className="h-5 w-5 text-brand-600" />
                  </div>
                  <span>{method}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="target-audience">
        <Card>
          <CardHeader>
            <CardTitle>Target Audience</CardTitle>
            <CardDescription>Who should take this course</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {course.targetAudience.map((audience, index) => (
                <li
                  key={index}
                  className="flex items-start p-4 bg-neutral-50 rounded-lg"
                >
                  <div className="bg-brand-100 p-2 rounded-full mr-4">
                    <Users className="h-5 w-5 text-brand-600" />
                  </div>
                  <span>{audience}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="pricing">
        <Card>
          <CardHeader>
            <CardTitle>Course Pricing</CardTitle>
            <CardDescription>
              Transparent pricing with no hidden fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-brand-50 to-accent-50 rounded-xl p-8 text-center">
              <div className="text-3xl font-bold text-brand-600 mb-2">
                {formatCurrency(course.investment)}
              </div>
              <p className="text-neutral-600 mb-6">
                One-time payment for the entire {course.duration} program
              </p>
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {course.totalMeetings}
                  </div>
                  <div className="text-sm text-neutral-600">Total Meetings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{course.duration}</div>
                  <div className="text-sm text-neutral-600">Duration</div>
                </div>
              </div>
              {/* Updated to include course slug */}
              <Button
                asChild
                size="lg"
                className="bg-brand-500 hover:bg-brand-600"
              >
                <Link href={`/booking?course=${course.slug}`}>Book Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

// Course CTA Component
const CourseCTA: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 to-accent-900/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Enroll in This Program?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
            Take the next step in your English learning journey. Reserve your
            spot today and start achieving your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Updated to include course slug */}
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-600 hover:bg-neutral-100 shadow-xl font-semibold px-8 py-4 text-base"
            >
              <Link href={`/booking?course=${course.slug}`}>Book Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-semibold px-8 py-4 text-base transition-all"
            >
              <Link href="/special-program">
                <BookOpen className="w-5 h-5 mr-2" />
                View Other Programs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface CourseDetailPageProps {
  params: {
    slug: string;
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = getCourseBySlug(params.slug);
  if (!course) {
    notFound();
  }
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Course Detail Header */}
        <CourseDetailHeader course={course} />
        {/* Course Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Course Overview */}
              <CourseOverview course={course} />
              {/* Course Details Tabs */}
              <CourseDetailsTabs course={course} />
            </div>
          </div>
        </section>
        {/* Course CTA */}
        <CourseCTA course={course} />
      </main>
    </div>
  );
}