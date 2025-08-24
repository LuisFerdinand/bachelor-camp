'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { 
  MapPin, 
  Users, 
  Home, 
  Wifi, 
  Coffee, 
  Dumbbell, 
  BookOpen,
  Star,
  Calendar,
  Clock
} from 'lucide-react'

export default function CampPage() {
  const roomTypes = [
    {
      id: 1,
      name: "Standard Room",
      description: "Comfortable room with shared bathroom",
      price: "Rp 1,500,000/week",
      features: ["Single Bed", "Shared Bathroom", "Study Desk", "Wardrobe"]
    },
    {
      id: 2,
      name: "Deluxe Room",
      description: "Spacious room with private bathroom",
      price: "Rp 2,500,000/week",
      features: ["Queen Bed", "Private Bathroom", "Study Area", "Mini Fridge"]
    },
    {
      id: 3,
      name: "Suite",
      description: "Luxury suite with living area",
      price: "Rp 4,000,000/week",
      features: ["King Bed", "Private Bathroom", "Living Area", "Kitchenette"]
    }
  ]

  const classTypes = [
    {
      id: 1,
      name: "Intensive English",
      description: "20 hours/week of focused instruction",
      duration: "4-12 weeks",
      level: "All Levels"
    },
    {
      id: 2,
      name: "Business English",
      description: "Professional communication skills",
      duration: "8 weeks",
      level: "Intermediate+"
    },
    {
      id: 3,
      name: "IELTS Prep",
      description: "Comprehensive test preparation",
      duration: "10 weeks",
      level: "Intermediate+"
    }
  ]

  const facilities = [
    { id: 1, name: "Modern Classrooms", icon: BookOpen },
    { id: 2, name: "High-Speed WiFi", icon: Wifi },
    { id: 3, name: "Fitness Center", icon: Dumbbell },
    { id: 4, name: "Cafeteria", icon: Coffee },
    { id: 5, name: "Library", icon: BookOpen },
    { id: 6, name: "Recreation Areas", icon: Users }
  ]

  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-brand-50 to-accent-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-accent-100 text-accent-800 hover:bg-accent-200">
                Premium Learning Experience
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                English Immersion Camp
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                Live and learn English in our comfortable campus environment with expert instructors and comprehensive facilities.
              </p>
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600">
                Book Your Stay
              </Button>
            </div>
          </div>
        </section>

        {/* Campus Showcase */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Our Campus</h2>
              <p className="text-lg text-neutral-600">
                Modern facilities designed for optimal learning and comfortable living.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="h-80 bg-gradient-to-r from-brand-400 to-accent-400 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">Campus Main Building</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Premium Learning Environment</h3>
                <p className="text-neutral-600 mb-6">
                  Our campus features modern architecture with dedicated learning spaces, comfortable accommodations, 
                  and recreational areas to create the perfect environment for English immersion.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-brand-500 mr-2" />
                    <span>Prime Location</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-brand-500 mr-2" />
                    <span>International Community</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="h-5 w-5 text-brand-500 mr-2" />
                    <span>Comfortable Housing</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-brand-500 mr-2" />
                    <span>5-Star Facilities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Room Types */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Accommodation Options</h2>
              <p className="text-lg text-neutral-600">
                Choose from our range of comfortable room options to suit your preferences and budget.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {roomTypes.map((room) => (
                <Card key={room.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{room.name}</CardTitle>
                    <CardDescription>{room.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <span className="text-2xl font-bold text-brand-600">{room.price}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {room.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white">
                      Select Room
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Class Types */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Program Options</h2>
              <p className="text-lg text-neutral-600">
                Select the program that best matches your learning goals and schedule.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {classTypes.map((classType) => (
                <Card key={classType.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{classType.name}</CardTitle>
                    <CardDescription>{classType.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-accent-500 mr-2" />
                        <span>Duration: {classType.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-accent-500 mr-2" />
                        <span>Level: {classType.level}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-accent-500 hover:bg-accent-600">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Campus Facilities</h2>
              <p className="text-lg text-neutral-600">
                Everything you need for a comfortable and productive learning experience.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {facilities.map((facility) => {
                const IconComponent = facility.icon
                return (
                  <div key={facility.id} className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="h-6 w-6 text-brand-600" />
                    </div>
                    <h3 className="font-medium">{facility.name}</h3>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}