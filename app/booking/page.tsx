'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Home, 
  Calendar, 
  Clock, 
  Star,
  CheckCircle,
  Info,
  Plus,
  Minus
} from 'lucide-react'

export default function BookingPage() {
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [guests, setGuests] = useState(1)
  
  const programs = [
    {
      id: "general-english",
      name: "General English",
      description: "Comprehensive English course for all levels",
      price: 3500000,
      duration: "4 weeks",
      level: "All Levels"
    },
    {
      id: "ielts-prep",
      name: "IELTS Preparation",
      description: "Intensive training for IELTS success",
      price: 8000000,
      duration: "10 weeks",
      level: "Intermediate+"
    },
    {
      id: "business-english",
      name: "Business English",
      description: "Professional communication skills",
      price: 6500000,
      duration: "8 weeks",
      level: "Intermediate+"
    }
  ]
  
  const rooms = [
    {
      id: "standard",
      name: "Standard Room",
      description: "Comfortable room with shared bathroom",
      price: 1500000,
      duration: "per week",
      features: ["Single Bed", "Shared Bathroom", "Study Desk"]
    },
    {
      id: "deluxe",
      name: "Deluxe Room",
      description: "Spacious room with private bathroom",
      price: 2500000,
      duration: "per week",
      features: ["Queen Bed", "Private Bathroom", "Study Area"]
    },
    {
      id: "suite",
      name: "Suite",
      description: "Luxury suite with living area",
      price: 4000000,
      duration: "per week",
      features: ["King Bed", "Private Bathroom", "Living Area"]
    }
  ]
  
  const durations = [
    { id: "4-weeks", name: "4 Weeks", multiplier: 1 },
    { id: "8-weeks", name: "8 Weeks", multiplier: 2 },
    { id: "12-weeks", name: "12 Weeks", multiplier: 3 },
    { id: "24-weeks", name: "24 Weeks", multiplier: 6 }
  ]
  
  const addons = [
    {
      id: "airport-transfer",
      name: "Airport Transfer",
      description: "Round-trip airport transfer service",
      price: 500000
    },
    {
      id: "meal-plan",
      name: "Full Meal Plan",
      description: "3 meals per day for the duration of your stay",
      price: 1500000
    },
    {
      id: "insurance",
      name: "Health Insurance",
      description: "Comprehensive health insurance coverage",
      price: 1200000
    },
    {
      id: "activities",
      name: "Weekend Activities",
      description: "Organized cultural and recreational activities",
      price: 800000
    }
  ]
  
  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId))
    } else {
      setSelectedAddons([...selectedAddons, addonId])
    }
  }
  
  const calculateTotal = () => {
    let total = 0
    
    // Program cost
    const program = programs.find(p => p.id === selectedProgram)
    if (program) {
      const durationMultiplier = durations.find(d => d.id === selectedDuration)?.multiplier || 1
      total += program.price * durationMultiplier
    }
    
    // Room cost
    const room = rooms.find(r => r.id === selectedRoom)
    if (room) {
      const durationMultiplier = durations.find(d => d.id === selectedDuration)?.multiplier || 1
      total += room.price * durationMultiplier
    }
    
    // Addons cost
    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId)
      if (addon) {
        total += addon.price
      }
    })
    
    return total
  }
  
  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-brand-50 to-accent-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-accent-100 text-accent-800 hover:bg-accent-200">
                Book Your Experience
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                Reserve Your Spot
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                Customize your English learning experience with our flexible booking options.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Booking Form */}
            <div className="lg:w-2/3">
              <Tabs defaultValue="program" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="program">Program</TabsTrigger>
                  <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
                  <TabsTrigger value="addons">Add-ons</TabsTrigger>
                </TabsList>
                
                {/* Program Selection */}
                <TabsContent value="program" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-brand-500" />
                        Select Your Program
                      </CardTitle>
                      <CardDescription>
                        Choose the English program that best matches your learning goals.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {programs.map((program) => (
                          <Card 
                            key={program.id} 
                            className={`border-2 cursor-pointer transition-all ${selectedProgram === program.id ? 'border-brand-500 shadow-md' : 'border-border hover:border-brand-300'}`}
                            onClick={() => setSelectedProgram(program.id)}
                          >
                            <CardContent className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold">{program.name}</h3>
                                {selectedProgram === program.id && (
                                  <CheckCircle className="h-5 w-5 text-brand-500" />
                                )}
                              </div>
                              <p className="text-sm text-neutral-600 mb-4">{program.description}</p>
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-neutral-500" />
                                  <span>{program.duration}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Star className="h-4 w-4 mr-2 text-neutral-500" />
                                  <span>{program.level}</span>
                                </div>
                              </div>
                              <div className="font-bold text-brand-600">
                                Rp {program.price.toLocaleString('id-ID')}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-brand-500" />
                        Select Duration
                      </CardTitle>
                      <CardDescription>
                        Choose how long you&apos;d like to study with us.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {durations.map((duration) => (
                          <Card 
                            key={duration.id} 
                            className={`border-2 cursor-pointer transition-all ${selectedDuration === duration.id ? 'border-brand-500 shadow-md' : 'border-border hover:border-brand-300'}`}
                            onClick={() => setSelectedDuration(duration.id)}
                          >
                            <CardContent className="p-4 text-center">
                              <div className="font-bold mb-1">{duration.name}</div>
                              {selectedDuration === duration.id && (
                                <CheckCircle className="h-5 w-5 text-brand-500 mx-auto" />
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Accommodation Selection */}
                <TabsContent value="accommodation" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Home className="h-5 w-5 mr-2 text-brand-500" />
                        Select Your Accommodation
                      </CardTitle>
                      <CardDescription>
                        Choose from our range of comfortable room options.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {rooms.map((room) => (
                          <Card 
                            key={room.id} 
                            className={`border-2 cursor-pointer transition-all ${selectedRoom === room.id ? 'border-brand-500 shadow-md' : 'border-border hover:border-brand-300'}`}
                            onClick={() => setSelectedRoom(room.id)}
                          >
                            <CardContent className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold">{room.name}</h3>
                                {selectedRoom === room.id && (
                                  <CheckCircle className="h-5 w-5 text-brand-500" />
                                )}
                              </div>
                              <p className="text-sm text-neutral-600 mb-4">{room.description}</p>
                              <ul className="space-y-1 mb-4">
                                {room.features.map((feature, index) => (
                                  <li key={index} className="flex items-center text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></div>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="font-bold text-brand-600">
                                Rp {room.price.toLocaleString('id-ID')} {room.duration}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Add-ons Selection */}
                <TabsContent value="addons" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Info className="h-5 w-5 mr-2 text-brand-500" />
                        Select Add-ons
                      </CardTitle>
                      <CardDescription>
                        Enhance your experience with our additional services.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {addons.map((addon) => (
                          <Card 
                            key={addon.id} 
                            className={`border-2 cursor-pointer transition-all ${selectedAddons.includes(addon.id) ? 'border-brand-500 shadow-md' : 'border-border hover:border-brand-300'}`}
                            onClick={() => toggleAddon(addon.id)}
                          >
                            <CardContent className="p-5">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold">{addon.name}</h3>
                                  <p className="text-sm text-neutral-600 mb-2">{addon.description}</p>
                                  <div className="font-bold text-brand-600">
                                    Rp {addon.price.toLocaleString('id-ID')}
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  {selectedAddons.includes(addon.id) ? (
                                    <CheckCircle className="h-5 w-5 text-brand-500" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-border"></div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Summary */}
            <div className="lg:w-1/3">
              <Card className="border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                  <CardDescription>Review your selections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Program Summary */}
                  <div>
                    <h3 className="font-semibold mb-2">Program</h3>
                    {selectedProgram ? (
                      <div className="bg-neutral-50 p-3 rounded-lg">
                        <div className="font-medium">{programs.find(p => p.id === selectedProgram)?.name}</div>
                        <div className="text-sm text-neutral-600">
                          {durations.find(d => d.id === selectedDuration)?.name}
                        </div>
                        <div className="font-bold text-brand-600 mt-1">
                          Rp {((programs.find(p => p.id === selectedProgram)?.price || 0) * (durations.find(d => d.id === selectedDuration)?.multiplier || 1)).toLocaleString('id-ID')}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-500">No program selected</div>
                    )}
                  </div>
                  
                  {/* Accommodation Summary */}
                  <div>
                    <h3 className="font-semibold mb-2">Accommodation</h3>
                    {selectedRoom ? (
                      <div className="bg-neutral-50 p-3 rounded-lg">
                        <div className="font-medium">{rooms.find(r => r.id === selectedRoom)?.name}</div>
                        <div className="text-sm text-neutral-600">
                          {durations.find(d => d.id === selectedDuration)?.name}
                        </div>
                        <div className="font-bold text-brand-600 mt-1">
                          Rp {((rooms.find(r => r.id === selectedRoom)?.price || 0) * (durations.find(d => d.id === selectedDuration)?.multiplier || 1)).toLocaleString('id-ID')}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-500">No accommodation selected</div>
                    )}
                  </div>
                  
                  {/* Add-ons Summary */}
                  {selectedAddons.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Add-ons</h3>
                      <div className="space-y-2">
                        {selectedAddons.map(addonId => {
                          const addon = addons.find(a => a.id === addonId)
                          return addon ? (
                            <div key={addon.id} className="bg-neutral-50 p-3 rounded-lg flex justify-between">
                              <div>
                                <div className="font-medium">{addon.name}</div>
                                <div className="text-sm text-neutral-600">{addon.description}</div>
                              </div>
                              <div className="font-bold text-brand-600">
                                Rp {addon.price.toLocaleString('id-ID')}
                              </div>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Total */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-xl text-brand-600">
                        Rp {calculateTotal().toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Book Button */}
                  <Button 
                    className="w-full bg-brand-500 hover:bg-brand-600" 
                    size="lg"
                    disabled={!selectedProgram || !selectedDuration}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="text-xs text-neutral-500 text-center">
                    By proceeding, you agree to our Terms of Service and Privacy Policy.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}