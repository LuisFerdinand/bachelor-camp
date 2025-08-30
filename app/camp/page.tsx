'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { 
  MapPin, 
  Users, 
  Home, 
  Coffee, 
  Shield, 
  BookOpen,
  Star,
  Calendar,
  Bed,
  AirVent,
  Shirt,
  CheckCircle2,
  Phone,
  MessageSquare
} from 'lucide-react'

// Define TypeScript interfaces for the CMS data
interface CMSImage {
  url: string;
  alt: string;
}

interface CampPageCMSData {
  heroMobileImage?: CMSImage;
  heroDesktopImage?: CMSImage;
  campusImage?: CMSImage;
}

interface CampPageProps {
  cmsData?: CampPageCMSData;
}

export default function CampPage({ cmsData }: CampPageProps) {
  // Get hero images with fallbacks to local images
  const heroImages = {
    mobile: {
      src: cmsData?.heroMobileImage?.url || "/HeroBg/Camp/CampBgMobile.png",
      alt: cmsData?.heroMobileImage?.alt || "Student accommodation buildings - mobile view"
    },
    desktop: {
      src: cmsData?.heroDesktopImage?.url || "/HeroBg/Camp/CampBgDesktop.png",
      alt: cmsData?.heroDesktopImage?.alt || "Student accommodation buildings - desktop view"
    }
  }
  
  // Get building image with fallback
  const buildingImage = {
    src: cmsData?.campusImage?.url || "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: cmsData?.campusImage?.alt || "Student accommodation building"
  }

  const buildings = [
    {
      id: 1,
      name: "Building 1",
      description: "Premium accommodation with private facilities",
      rooms: "55 rooms",
      features: ["Air Conditioning", "Private Bathroom (KM dalam)", "Individual Rooms"],
      pricing: [
        { type: "Per Room/Month", price: "Rp 2,500,000", highlight: false },
        { type: "2 Students/Room", price: "Rp 1,300,000/student", highlight: true },
        { type: "3 Students/Room", price: "Rp 1,000,000/student", highlight: true }
      ],
      badge: "Most Popular",
      badgeColor: "bg-accent-500"
    },
    {
      id: 2,
      name: "Building 2",
      description: "Budget-friendly shared accommodation",
      rooms: "8 large rooms, 12 small rooms",
      features: ["Shared Bathroom (KM luar)", "Large Rooms (6-10 students)", "Budget Friendly"],
      pricing: [
        { type: "Per Student/Month", price: "Rp 600,000", highlight: true }
      ],
      badge: "Best Value",
      badgeColor: "bg-success-500"
    },
    {
      id: 3,
      name: "Building 3 Premium",
      description: "Luxury accommodation perfect for course packages",
      rooms: "16 premium rooms",
      features: ["Premium Facilities", "Course Bundle Ready", "Exclusive Access"],
      pricing: [
        { type: "Per Room/Month", price: "Rp 2,800,000 - Rp 3,500,000", highlight: false }
      ],
      badge: "Premium",
      badgeColor: "bg-brand-600"
    }
  ]

  const facilities = [
    { id: 1, name: "Air Conditioning", icon: AirVent, description: "Climate controlled comfort", color: "bg-brand-100 text-brand-700" },
    { id: 2, name: "Laundry Service", icon: Shirt, description: "Professional cleaning", color: "bg-accent-100 text-accent-700" },
    { id: 3, name: "Housekeeping", icon: Home, description: "Weekly room cleaning", color: "bg-success-100 text-success-700" },
    { id: 4, name: "Common Lounge", icon: Coffee, description: "Social gathering space", color: "bg-warning-100 text-warning-700" },
    { id: 5, name: "Study Rooms", icon: BookOpen, description: "Quiet study areas", color: "bg-brand-100 text-brand-700" },
    { id: 6, name: "24/7 Security", icon: Shield, description: "Round-the-clock safety", color: "bg-neutral-100 text-neutral-700" }
  ]

  const seasons = [
    { 
      period: "December, June, July", 
      status: "Peak Season", 
      color: "bg-accent-100 text-accent-800 border-accent-200",
      description: "High demand period - book early for best availability",
      icon: "🔥"
    },
    { 
      period: "January, October", 
      status: "Medium Season", 
      color: "bg-warning-100 text-warning-800 border-warning-200",
      description: "Moderate availability with good rates",
      icon: "📊"
    },
    { 
      period: "Feb-May, August, Sep, November", 
      status: "Low Season", 
      color: "bg-success-100 text-success-800 border-success-200",
      description: "Best availability and special rates",
      icon: "✨"
    }
  ]

  const houseRules = {
    general: [
      "Quiet hours: 10:00 PM - 6:00 AM",
      "No smoking inside buildings",
      "Guest registration required",
      "Keep common areas clean",
      "Respect other residents"
    ],
    services: [
      "Weekly housekeeping included",
      "Laundry service available",
      "24/7 security & access control",
      "Maintenance support",
      "Reception assistance"
    ]
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">      
      <main className="flex-grow">
        {/* Hero Section - Enhanced with gradient overlay and better typography */}
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
                onError={() => {
                  console.error('Failed to load mobile hero image:', heroImages.mobile.src);
                }}
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
                onError={() => {
                  console.error('Failed to load desktop hero image:', heroImages.desktop.src);
                }}
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2">
                <Home className="w-4 h-4 mr-2" />
                Student Accommodation
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white drop-shadow-lg">
                Comfortable Student Living
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                Three modern buildings with complete facilities - AC, laundry, housekeeping, and 24/7 security. 
                Choose from budget-friendly to premium options starting from Rp 600,000/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white shadow-brand px-8 py-3 text-base font-semibold">
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
                </Button>
                <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-white shadow-accent px-8 py-3 text-base font-semibold">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  WhatsApp Inquiry
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3 text-base font-semibold transition-all">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Building Showcase - Enhanced with better spacing and colors */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-brand-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
                Our Buildings
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900">
                Modern Student Accommodation
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Three modern buildings designed specifically for student comfort with complete amenities and flexible pricing options.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="rounded-2xl overflow-hidden shadow-xl relative h-96 group">
                <Image 
                  src={buildingImage.src}
                  alt={buildingImage.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={() => {
                    console.error('Failed to load building image:', buildingImage.src);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent"></div>
              </div>
              <div className="space-y-6">
                <h3 className="text-display-sm font-bold text-neutral-900">Student Living Made Easy</h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Our accommodation buildings feature modern amenities with complete facilities including air conditioning, 
                  professional laundry services, weekly housekeeping, and round-the-clock security for your comfort and peace of mind.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-brand-100">
                    <MapPin className="h-6 w-6 text-brand-500 mr-3 flex-shrink-0" />
                    <span className="font-medium text-neutral-700">Strategic Location</span>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-accent-100">
                    <Users className="h-6 w-6 text-accent-500 mr-3 flex-shrink-0" />
                    <span className="font-medium text-neutral-700">Student Community</span>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-success-100">
                    <Shield className="h-6 w-6 text-success-500 mr-3 flex-shrink-0" />
                    <span className="font-medium text-neutral-700">24/7 Security</span>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-warning-100">
                    <Star className="h-6 w-6 text-warning-500 mr-3 flex-shrink-0" />
                    <span className="font-medium text-neutral-700">Complete Facilities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Building Options - Enhanced cards with better visual hierarchy */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-accent-100 text-accent-800 border-0">
                Choose Your Home
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900">
                Building Options
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Select the accommodation that best fits your needs and budget. From budget-friendly shared spaces to premium private rooms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {buildings.map((building) => (
                <Card key={building.id} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${building.id === 1 ? 'ring-2 ring-accent-200 scale-105' : ''}`}>
                  {building.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className={`${building.badgeColor} text-white border-0 px-4 py-1 shadow-md`}>
                        {building.badge}
                      </Badge>
                    </div>
                  )}
                  <div className={`h-2 ${building.id === 1 ? 'bg-gradient-to-r from-accent-400 to-accent-500' : building.id === 2 ? 'bg-gradient-to-r from-success-400 to-success-500' : 'bg-gradient-to-r from-brand-500 to-brand-600'}`}></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-neutral-900">{building.name}</CardTitle>
                    <CardDescription className="text-base text-neutral-600">{building.description}</CardDescription>
                    <div className="text-sm text-neutral-500 flex items-center mt-2">
                      <Bed className="h-4 w-4 mr-2" />
                      {building.rooms}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 text-neutral-800">Pricing Options:</h4>
                      <div className="space-y-3">
                        {building.pricing.map((price, index) => (
                          <div key={index} className={`p-4 rounded-xl border-2 transition-all ${price.highlight ? 'bg-gradient-to-r from-brand-50 to-accent-50 border-brand-200 shadow-sm' : 'bg-neutral-50 border-neutral-200'}`}>
                            <div className="text-sm text-neutral-600 mb-1">{price.type}</div>
                            <div className={`font-bold ${price.highlight ? 'text-brand-700 text-lg' : 'text-neutral-800'}`}>
                              {price.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4 text-neutral-800">Features:</h4>
                      <ul className="space-y-3">
                        {building.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle2 className="w-4 h-4 text-success-500 mr-3 flex-shrink-0" />
                            <span className="text-neutral-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className={`w-full py-3 font-semibold text-base transition-all ${building.id === 1 ? 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-accent' : building.id === 2 ? 'bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 shadow-sm' : 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-brand'} text-white`}
                    >
                      View Details & Book
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Calendar - Enhanced with better visual design */}
        <section className="py-20 bg-gradient-to-br from-brand-50/50 to-accent-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
                <Calendar className="w-4 h-4 mr-2" />
                Booking Calendar
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900">
                Seasonal Availability
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Plan your stay according to our seasonal calendar. Book early during peak seasons for guaranteed availability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {seasons.map((season, index) => (
                <Card key={index} className={`border-2 ${season.color} shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                  <CardHeader className="text-center relative">
                    <div className="text-4xl mb-2">{season.icon}</div>
                    <Badge className={`mx-auto mb-3 ${season.color} border-0 px-4 py-1`}>
                      {season.status}
                    </Badge>
                    <CardTitle className="text-lg font-bold">{season.period}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {season.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-brand-100 to-accent-100 rounded-2xl p-8 max-w-3xl mx-auto border border-brand-200">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="font-bold text-brand-800 mb-3 text-xl">Planning Your Stay?</h3>
                <p className="text-brand-700 leading-relaxed mb-6">
                  Contact us to check real-time availability and get the best rates for your preferred dates. 
                  Early booking during peak seasons is highly recommended.
                </p>
                <Button className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 font-semibold">
                  <Phone className="w-4 h-4 mr-2" />
                  Check Availability Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities & Rules - Enhanced with better organization */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-success-100 text-success-800 border-0">
                <Star className="w-4 h-4 mr-2" />
                Complete Package
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900">
                Facilities & Services
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Everything you need for comfortable student living, plus clear guidelines for a harmonious community.
              </p>
            </div>
            
            {/* Facilities Grid - Enhanced with colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {facilities.map((facility) => {
                const IconComponent = facility.icon
                return (
                  <div key={facility.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100">
                    <div className="flex items-start">
                      <div className={`w-14 h-14 rounded-xl ${facility.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-neutral-900">{facility.name}</h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">{facility.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* House Rules - Enhanced cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-2 border-brand-200 shadow-lg bg-gradient-to-br from-brand-50 to-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-800">
                    <BookOpen className="h-6 w-6 mr-3 text-brand-600" />
                    Residence Rules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {houseRules.general.map((rule, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <div className="w-2 h-2 rounded-full bg-brand-500 mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-neutral-700 leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-success-200 shadow-lg bg-gradient-to-br from-success-50 to-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-success-800">
                    <Star className="h-6 w-6 mr-3 text-success-600" />
                    Included Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {houseRules.services.map((service, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-neutral-700 leading-relaxed">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced with gradient and better visual hierarchy */}
        <section className="py-20 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 to-accent-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto text-white">
              <div className="text-5xl mb-6">🏠</div>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6">
                Ready to Secure Your Room?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
                Don&apos;t wait - rooms fill up quickly, especially during peak seasons. Contact us today to check availability, 
                get personalized rates, and reserve your preferred accommodation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-white text-brand-600 hover:bg-neutral-100 shadow-xl font-semibold px-8 py-4 text-base">
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
                </Button>
                <Button size="lg" className="bg-accent-600 hover:bg-accent-700 text-white shadow-xl font-semibold px-8 py-4 text-base">
                  <Home className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-semibold px-8 py-4 text-base transition-all">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
              </div>
              
              <div className="pt-8 border-t border-white/20">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                  <div className="text-3xl mb-3">💡</div>
                  <p className="text-white/90 font-medium">
                    <strong className="text-white">Pro tip:</strong> Mention &quot;website inquiry&quot; for special rates and bundling options with our course programs
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