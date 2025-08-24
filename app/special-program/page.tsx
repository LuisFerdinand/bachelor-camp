'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Award,
  CheckCircle,
  TrendingUp
} from 'lucide-react'

export default function SpecialProgramPage() {
  const programs = [
    {
      id: 1,
      name: "General English",
      description: "Comprehensive English course for all levels",
      duration: "4-48 weeks",
      levels: "A1-C2 (CEFR)",
      price: "Rp 3,500,000/4 weeks",
      features: [
        "All CEFR Levels",
        "Interactive Classes",
        "Practical Communication",
        "Cultural Activities"
      ],
      popular: true
    },
    {
      id: 2,
      name: "IELTS Preparation",
      description: "Intensive training for IELTS success",
      duration: "10 weeks",
      levels: "B1-C1 (CEFR)",
      price: "Rp 8,000,000/course",
      features: [
        "Exam Strategies",
        "Practice Tests",
        "Personal Feedback",
        "Guaranteed Results"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Business English",
      description: "Professional communication skills",
      duration: "8 weeks",
      levels: "B2-C1 (CEFR)",
      price: "Rp 6,500,000/course",
      features: [
        "Business Vocabulary",
        "Presentation Skills",
        "Email Writing",
        "Negotiation Practice"
      ],
      popular: false
    },
    {
      id: 4,
      name: "Academic English",
      description: "Preparation for university studies",
      duration: "12 weeks",
      levels: "B1-C2 (CEFR)",
      price: "Rp 9,000,000/course",
      features: [
        "Academic Writing",
        "Research Skills",
        "Note-taking",
        "Critical Thinking"
      ],
      popular: false
    }
  ]

  const cefrLevels = [
    {
      level: "A1",
      name: "Beginner",
      description: "Can understand and use familiar everyday expressions and very basic phrases.",
      skills: ["Introduction", "Basic Questions", "Simple Directions"]
    },
    {
      level: "A2",
      name: "Elementary",
      description: "Can communicate in simple and routine tasks requiring a simple exchange of information.",
      skills: ["Family Info", "Shopping", "Local Geography"]
    },
    {
      level: "B1",
      name: "Intermediate",
      description: "Can deal with most situations likely to arise whilst travelling in an area where the language is spoken.",
      skills: ["Work Experiences", "Dreams & Hopes", "Opinions"]
    },
    {
      level: "B2",
      name: "Upper Intermediate",
      description: "Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible.",
      skills: ["Complex Texts", "Technical Discussions", "Detailed Explanations"]
    },
    {
      level: "C1",
      name: "Advanced",
      description: "Can use language flexibly and effectively for social, academic and professional purposes.",
      skills: ["Academic Articles", "Fluent Spontaneity", "Effective Language"]
    },
    {
      level: "C2",
      name: "Proficiency",
      description: "Can understand with ease virtually everything heard or read and summarize information from different sources.",
      skills: ["Everything Heard", "Spontaneous Fluency", "Nuanced Meanings"]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-brand-50 to-accent-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-accent-100 text-accent-800 hover:bg-accent-200">
                Specialized Programs
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                English Programs for Every Goal
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                Specialized courses designed to meet specific learning objectives with expert instruction and proven methodologies.
              </p>
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600">
                Find Your Program
              </Button>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Our Special Programs</h2>
              <p className="text-lg text-neutral-600">
                Choose from our specialized courses designed for specific learning objectives.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {programs.map((program) => (
                <Card key={program.id} className={`border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden ${program.popular ? 'ring-2 ring-accent-500' : ''}`}>
                  {program.popular && (
                    <div className="bg-accent-500 py-1 px-4 text-white text-sm font-medium text-center">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{program.name}</CardTitle>
                      {program.popular && <Star className="h-5 w-5 text-accent-500 fill-accent-500" />}
                    </div>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
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
                    
                    <div className="mb-6">
                      <span className="text-2xl font-bold text-brand-600">{program.price}</span>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className={`w-full ${program.popular ? 'bg-accent-500 hover:bg-accent-600' : 'bg-brand-500 hover:bg-brand-600'}`}>
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
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">CEFR Framework</h2>
              <p className="text-lg text-neutral-600">
                Our courses follow the Common European Framework of Reference for Languages (CEFR).
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cefrLevels.map((level) => (
                <Card key={level.level} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-brand-100 text-brand-800">{level.level}</Badge>
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

        {/* Pricing Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Program Pricing</h2>
              <p className="text-lg text-neutral-600">
                Transparent pricing with no hidden fees. Flexible payment options available.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-50 to-accent-50 rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-4">General English</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-brand-600">Rp 3.5M</span>
                    <span className="text-neutral-600">/4 weeks</span>
                  </div>
                  <p className="text-neutral-600 mb-4">All levels from A1 to C2</p>
                  <Button variant="outline" className="w-full border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white">
                    Enroll Now
                  </Button>
                </div>
                
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-4">IELTS Prep</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-accent-600">Rp 8M</span>
                    <span className="text-neutral-600">/course</span>
                  </div>
                  <p className="text-neutral-600 mb-4">10-week intensive program</p>
                  <Button className="w-full bg-accent-500 hover:bg-accent-600">
                    Enroll Now
                  </Button>
                </div>
                
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-4">Business English</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-brand-600">Rp 6.5M</span>
                    <span className="text-neutral-600">/course</span>
                  </div>
                  <p className="text-neutral-600 mb-4">8-week professional program</p>
                  <Button variant="outline" className="w-full border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white">
                    Enroll Now
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-neutral-600">Need a custom package? <a href="#" className="text-brand-600 hover:underline">Contact us</a> for special pricing.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  )
}