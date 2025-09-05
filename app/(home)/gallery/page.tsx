'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Calendar, 
  Building, 
  Wifi, 
  Camera,
  ChevronLeft,
} from 'lucide-react'

export default function GalleryPage() {
  // Hero section data
  const heroData = {
    backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Student Life Gallery",
    subtitle: "Explore our vibrant campus life through these captured moments of learning, activities, and facilities."
  }

  // Gallery categories
  const galleryCategories = [
    {
      id: 1,
      title: "Study Sessions",
      icon: BookOpen,
      description: "Students engaged in various learning activities and collaborative study sessions.",
      images: [
        { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Study Session 1" },
        { src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Study Session 2" },
        { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Study Session 3" },
        { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Study Session 4" },
        { src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Study Session 5" },
        { src: "https://images.unsplash.com/photo-1523580846011-d3982bc74bee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Study Session 6" }
      ]
    },
    {
      id: 2,
      title: "Campus Events",
      icon: Calendar,
      description: "Cultural celebrations, competitions, and special events throughout the year.",
      images: [
        { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Campus Event 1" },
        { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Campus Event 2" },
        { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Campus Event 3" },
        { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Campus Event 4" },
        { src: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Campus Event 5" },
        { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Campus Event 6" }
      ]
    },
    {
      id: 3,
      title: "Buildings & Classrooms",
      icon: Building,
      description: "Modern facilities and comfortable learning environments designed for success.",
      images: [
        { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Building 1" },
        { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Classroom 1" },
        { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Dormitory 1" },
        { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Building 2" },
        { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Classroom 2" },
        { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Dormitory 2" }
      ]
    },
    {
      id: 4,
      title: "Facilities",
      icon: Wifi,
      description: "State-of-the-art amenities that support both learning and relaxation.",
      images: [
        { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Facility 1" },
        { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Facility 2" },
        { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Facility 3" },
        { src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Facility 4" },
        { src: "https://images.unsplash.com/photo-1523580846011-d3982bc74bee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Facility 5" },
        { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Facility 6" }
      ]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          className="relative py-20 md:py-32 min-h-[60vh] flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroData.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="container mx-auto px-4 w-full">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white">
                {heroData.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                {heroData.subtitle}
              </p>
              <Link href="/">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 shadow-lg"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery Categories */}
        <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge className="bg-brand-100 text-brand-800 mb-4">
                Campus Life
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Explore Our Gallery
              </h2>
              <p className="text-lg text-neutral-600">
                Browse through our collection of photos showcasing different aspects of student life at our campus.
              </p>
            </div>

            <div className="space-y-20">
              {galleryCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <div key={category.id} className="scroll-mt-24" id={`category-${category.id}`}>
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-brand-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900">{category.title}</h3>
                        <p className="text-neutral-600">{category.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.images.map((image, index) => (
                        <Card key={index} className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                          <div className="relative h-64 overflow-hidden">
                            <Image 
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover transition-transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Back to Top Button */}
            <div className="text-center mt-16">
              <Button 
                size="lg" 
                className="bg-brand-500 hover:bg-brand-600 shadow-lg"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}