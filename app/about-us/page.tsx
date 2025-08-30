'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { 
  Award, 
  Users, 
  Globe, 
  BookOpen, 
  Star,
  MessageSquare,
  History
} from 'lucide-react'

// Define TypeScript interfaces for the CMS data
interface CMSImage {
  url: string;
  alt: string;
}

interface AboutPageCMSData {
  heroMobileImage?: CMSImage;
  heroDesktopImage?: CMSImage;
}

interface AboutPageProps {
  cmsData?: AboutPageCMSData;
}

export default function AboutUsPage({ cmsData }: AboutPageProps) {
  // Get hero images with fallbacks to Unsplash images
  const heroImages = {
    mobile: {
      src: cmsData?.heroMobileImage?.url || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: cmsData?.heroMobileImage?.alt || "Students learning in classroom - mobile view"
    },
    desktop: {
      src: cmsData?.heroDesktopImage?.url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      alt: cmsData?.heroDesktopImage?.alt || "Students collaborating in modern campus - desktop view"
    }
  }

  const accreditations = [
    {
      id: 1,
      name: "British Council",
      description: "Authorized IELTS test center",
      logo: "BC"
    },
    {
      id: 2,
      name: "Cambridge English",
      description: "Official preparation center",
      logo: "CE"
    },
    {
      id: 3,
      name: "EAQUALS",
      description: "Excellence in language education",
      logo: "EQ"
    },
    {
      id: 4,
      name: "Quality English",
      description: "High-quality language schools",
      logo: "QE"
    }
  ]

  const milestones = [
    {
      year: "2010",
      title: "Founded",
      description: "Established with a vision to provide quality English education"
    },
    {
      year: "2015",
      title: "First Campus",
      description: "Opened our first dedicated campus in Jakarta"
    },
    {
      year: "2018",
      title: "International Expansion",
      description: "Started welcoming students from across Asia"
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched online learning platforms"
    },
    {
      year: "2023",
      title: "New Facilities",
      description: "Opened state-of-the-art campus expansion"
    }
  ]

  const stats = [
    { id: 1, value: "15,000+", label: "Students" },
    { id: 2, value: "98%", label: "Satisfaction Rate" },
    { id: 3, value: "50+", label: "Expert Instructors" },
    { id: 4, value: "30+", label: "Nationalities" }
  ]

  const values = [
    {
      icon: BookOpen,
      title: "Excellence",
      description: "We strive for the highest standards in teaching and learning.",
      color: "bg-brand-100 text-brand-700"
    },
    {
      icon: Users,
      title: "Community",
      description: "We foster a supportive and inclusive learning environment.",
      color: "bg-accent-100 text-accent-700"
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "We embrace new teaching methods and technologies.",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: Award,
      title: "Integrity",
      description: "We operate with honesty and transparency in all we do.",
      color: "bg-purple-100 text-purple-700"
    }
  ]

  const testimonials = [
    {
      name: "Michael T.",
      text: "The instructors are incredibly knowledgeable and supportive.",
      rating: 5
    },
    {
      name: "Priya K.",
      text: "I improved my IELTS score by 1.5 bands in just 8 weeks!",
      rating: 5
    },
    {
      name: "Juan P.",
      text: "The camp experience was life-changing. I made friends from around the world.",
      rating: 5
    }
  ]

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
                <Award className="w-4 h-4 mr-2" />
                About Our Institution
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white drop-shadow-lg">
                Excellence in English Education
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                For over a decade, we&apos;ve been providing world-class English education with a focus on practical skills and cultural immersion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white shadow-brand px-8 py-3 text-base font-semibold">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Our Mission
                </Button>
                <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-white shadow-accent px-8 py-3 text-base font-semibold">
                  <Users className="w-5 h-5 mr-2" />
                  Meet Our Team
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3 text-base font-semibold transition-all">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-brand-50 to-accent-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center p-6 bg-white rounded-xl shadow-sm border border-brand-100">
                  <div className="text-4xl font-bold text-brand-600 mb-2">{stat.value}</div>
                  <div className="text-neutral-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accreditations Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
                <Award className="w-4 h-4 mr-2" />
                Accreditations & Partnerships
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Recognized Excellence</h2>
              <p className="text-lg text-neutral-600">
                We&apos;re proud to be recognized by leading international organizations for our quality standards.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accreditations.map((accreditation) => (
                <Card key={accreditation.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-brand-600">{accreditation.logo}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{accreditation.name}</h3>
                    <p className="text-neutral-600 text-sm">{accreditation.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Video Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge className="mb-4 bg-accent-100 text-accent-800 border-0">
                <Star className="w-4 h-4 mr-2" />
                Student Success Stories
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Hear From Our Students</h2>
              <p className="text-lg text-neutral-600">
                Watch testimonials from students who have transformed their English skills with us.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-r from-brand-400 to-accent-400 rounded-xl shadow-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
                  </div>
                  <p className="text-lg font-medium">Student Testimonials</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-neutral-100">
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'} mr-1`} />
                      ))}
                    </div>
                    <p className="text-sm italic mb-2">&quot;{testimonial.text}&quot;</p>
                    <p className="text-sm font-medium">- {testimonial.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge className="mb-4 bg-success-100 text-success-800 border-0">
                <History className="w-4 h-4 mr-2" />
                Our Journey
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Key Milestones</h2>
              <p className="text-lg text-neutral-600">
                Important moments in our mission to provide exceptional English education.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-brand-200 to-accent-200"></div>
                
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`relative mb-12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 border-4 border-white z-10`}></div>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                      <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <Badge className="mb-2 bg-brand-100 text-brand-800">{milestone.year}</Badge>
                          <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                          <p className="text-neutral-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gradient-to-br from-neutral-50 to-brand-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
                <BookOpen className="w-4 h-4 mr-2" />
                Our Core Values
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Guiding Principles</h2>
              <p className="text-lg text-neutral-600">
                The values that guide everything we do at our institution.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full ${value.color} flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                      <p className="text-neutral-600">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
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
                Join Our Learning Community
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
                Become part of our global community of learners and transform your English skills with our world-class programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-white text-brand-600 hover:bg-neutral-100 shadow-xl font-semibold px-8 py-4 text-base">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Programs
                </Button>
                <Button size="lg" className="bg-accent-600 hover:bg-accent-700 text-white shadow-xl font-semibold px-8 py-4 text-base">
                  <Users className="w-5 h-5 mr-2" />
                  Meet Our Team
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-semibold px-8 py-4 text-base transition-all">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>
              
              <div className="pt-8 border-t border-white/20">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                  <div className="text-3xl mb-3">💡</div>
                  <p className="text-white/90 font-medium">
                    <strong className="text-white">Pro tip:</strong> Schedule a campus tour to experience our facilities and meet our instructors in person
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}