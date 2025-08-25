'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import  { TestimonialSlider }  from '@/components/common/TestimonialSlider'
import { 
  Users, 
  BookOpen, 
  Home, 
  Star, 
  ChevronRight,
  Clock,
  Award,
  CheckCircle
} from 'lucide-react'

export default function HomePage() {
  // Hero section data - easily replaceable with CMS data
  const heroData = {
    backgroundImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    badge: {
      text: "New Programs Available",
      bgColor: "bg-accent-100",
      textColor: "text-accent-800",
      hoverColor: "hover:bg-accent-200"
    },
    title: "Master English with Expert Instructors",
    subtitle: "Premium English learning experience with professional facilities, expert instructors, and proven results.",
    buttons: [
      {
        text: "Explore Programs",
        variant: "primary",
        bgColor: "bg-brand-500",
        hoverColor: "hover:bg-brand-600"
      },
      {
        text: "Book a Consultation",
        variant: "outline",
        borderColor: "border-accent-500",
        textColor: "text-accent-600",
        hoverBg: "hover:bg-accent-500",
        hoverText: "hover:text-white"
      }
    ]
  }

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Professional",
      content: "The IELTS preparation course helped me achieve my target score in just 8 weeks. The instructors are top-notch!",
      rating: 5
    },
    {
      id: 2,
      name: "Ahmad Hassan",
      role: "University Student",
      content: "The camp experience was life-changing. I made friends from around the world while improving my English significantly.",
      rating: 5
    },
    {
      id: 3,
      name: "Mei Lin",
      role: "Travel Enthusiast",
      content: "The General English program gave me the confidence to travel solo. The practical approach really works!",
      rating: 4
    },
    {
      id: 4,
      name: "David Kim",
      role: "Marketing Executive",
      content: "The business English course transformed my professional communication. I'm now more confident in meetings with international clients.",
      rating: 5
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      role: "University Student",
      content: "The personalized attention from instructors made all the difference. My speaking skills improved dramatically in just one month.",
      rating: 5
    },
    {
      id: 6,
      name: "James Wilson",
      role: "IT Professional",
      content: "I needed English for my career advancement. The flexible schedule and practical approach helped me achieve my goals while working full-time.",
      rating: 4
    }
  ]

  const bundles = [
    {
      id: 1,
      title: "Complete English Mastery",
      description: "6-month comprehensive program with all courses",
      price: "Rp 15,000,000",
      discount: "Save 20%",
      features: ["General English", "IELTS Prep", "Conversation Club", "Accommodation"]
    },
    {
      id: 2,
      title: "Intensive Camp Experience",
      description: "4-week immersive camp with accommodation",
      price: "Rp 8,500,000",
      discount: "Save 15%",
      features: ["Daily Classes", "Cultural Activities", "Weekend Excursions", "Full Board"]
    }
  ]
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section with Background Image */}
        <section 
          className="relative py-20 md:py-32 min-h-screen flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroData.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="container mx-auto px-4 w-full">
            <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
              <Badge className={`mb-4 ${heroData.badge.bgColor} ${heroData.badge.textColor} ${heroData.badge.hoverColor}`}>
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
        </section>
        
        {/* Three Pillars Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Our Learning Pillars</h2>
              <p className="text-lg text-neutral-600">
                We focus on three core areas to ensure comprehensive English language mastery.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-brand-600" />
                  </div>
                  <CardTitle className="text-xl">Camp Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    Immersive learning environments with comfortable accommodations and structured daily activities.
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Comfortable Accommodation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Structured Daily Activities</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Cultural Excursions</span>
                    </div>
                  </div>
                  <Link href="/camp">
                    <Button variant="ghost" className="w-full mt-4 text-brand-600 hover:text-brand-800">
                      Learn More <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-accent-600" />
                  </div>
                  <CardTitle className="text-xl">Specialized Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    Targeted programs for specific English needs including IELTS prep and business English.
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
                    <Button variant="ghost" className="w-full mt-4 text-accent-600 hover:text-accent-800">
                      Explore Courses <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Testing & Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    Comprehensive evaluation systems to track progress and certify language proficiency.
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
                  <Button variant="ghost" className="w-full mt-4 text-green-600 hover:text-green-800">
                    View Testing <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Student Success Stories</h2>
              <p className="text-lg text-neutral-600">
                Hear from our students who have transformed their English skills and future opportunities.
              </p>
            </div>
            
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>
        
        {/* Bundles Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Special Bundles</h2>
              <p className="text-lg text-neutral-600">
                Save more with our specially curated program bundles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {bundles.map((bundle) => (
                <Card key={bundle.id} className="border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-6 text-white">
                    <Badge className="bg-white/20 text-white mb-2">{bundle.discount}</Badge>
                    <h3 className="text-2xl font-bold">{bundle.title}</h3>
                    <p className="opacity-90">{bundle.description}</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-neutral-900">{bundle.price}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {bundle.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-brand-500 hover:bg-brand-600">
                      Get This Bundle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}