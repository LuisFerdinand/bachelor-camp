'use client'
import React, { useState, useEffect } from 'react'
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
  Minus,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react'

export default function BookingPage() {
  // Mock building data - in real app this would come from props or API
  const selectedBuilding = {
    name: "Jakarta Campus",
    slug: "jakarta-campus"
  }
  
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [guests, setGuests] = useState(1)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availabilityData, setAvailabilityData] = useState<{[key: string]: {available: boolean, capacity: number}}>({})
  
  // Mock availability data - in real app this would come from API
  useEffect(() => {
    const generateAvailabilityData = () => {
      const data: {[key: string]: {available: boolean, capacity: number}} = {}
      const today = new Date()
      
      // Generate 6 months of availability data
      for (let i = 0; i < 180; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        const dateStr = date.toISOString().split('T')[0]
        
        // Mock logic: weekends have lower availability, some random unavailable days
        const isWeekend = date.getDay() === 0 || date.getDay() === 6
        const randomUnavailable = Math.random() < 0.1 // 10% chance of being unavailable
        
        data[dateStr] = {
          available: !randomUnavailable,
          capacity: isWeekend ? 5 : 10
        }
      }
      
      setAvailabilityData(data)
    }
    
    generateAvailabilityData()
  }, [])
  
  const programs = [
    {
      id: "general-english",
      name: "General English",
      description: "Comprehensive English course for all levels",
      price: 3500000,
      minWeeks: 4,
      maxWeeks: 24,
      level: "All Levels"
    },
    {
      id: "ielts-prep",
      name: "IELTS Preparation",
      description: "Intensive training for IELTS success",
      price: 8000000,
      minWeeks: 8,
      maxWeeks: 12,
      level: "Intermediate+"
    },
    {
      id: "business-english",
      name: "Business English",
      description: "Professional communication skills",
      price: 6500000,
      minWeeks: 6,
      maxWeeks: 16,
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
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }
  
  const isDateAvailable = (date: Date) => {
    const dateStr = formatDate(date)
    return availabilityData[dateStr]?.available ?? false
  }
  
  const isDateSelected = (date: Date) => {
    if (!selectedStartDate || !selectedEndDate) return false
    return date >= selectedStartDate && date <= selectedEndDate
  }
  
  const isDateInRange = (date: Date) => {
    if (!selectedStartDate) return false
    if (!selectedEndDate) return date.getTime() === selectedStartDate.getTime()
    return date >= selectedStartDate && date <= selectedEndDate
  }
  
  const handleDateClick = (date: Date) => {
    if (!isDateAvailable(date)) return
    
    const selectedProgData = programs.find(p => p.id === selectedProgram)
    if (!selectedProgData) return
    
    if (!selectedStartDate) {
      // First click - set start date
      setSelectedStartDate(date)
      setSelectedEndDate(null)
    } else if (!selectedEndDate) {
      // Second click - set end date
      if (date < selectedStartDate) {
        // If clicked date is before start date, swap them
        setSelectedEndDate(selectedStartDate)
        setSelectedStartDate(date)
      } else {
        // Calculate weeks between dates
        const diffTime = Math.abs(date.getTime() - selectedStartDate.getTime())
        const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
        
        // Check if duration is within program limits
        if (diffWeeks >= selectedProgData.minWeeks && diffWeeks <= selectedProgData.maxWeeks) {
          setSelectedEndDate(date)
        } else {
          // Reset if duration is invalid
          setSelectedStartDate(date)
          setSelectedEndDate(null)
        }
      }
    } else {
      // Third click - reset and start over
      setSelectedStartDate(date)
      setSelectedEndDate(null)
    }
  }
  
  const getSelectedWeeks = () => {
    if (!selectedStartDate || !selectedEndDate) return 0
    const diffTime = Math.abs(selectedEndDate.getTime() - selectedStartDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
  }
  
  const calculateTotal = () => {
    let total = 0
    const weeks = getSelectedWeeks()
    
    // Program cost
    const program = programs.find(p => p.id === selectedProgram)
    if (program && weeks > 0) {
      total += (program.price / 4) * weeks // Assuming price is per 4 weeks
    }
    
    // Room cost
    const room = rooms.find(r => r.id === selectedRoom)
    if (room && weeks > 0) {
      total += room.price * weeks
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
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const today = new Date()
    const days = []
    const selectedProgData = programs.find(p => p.id === selectedProgram)
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const dateStr = formatDate(date)
      const isAvailable = isDateAvailable(date)
      const isSelected = isDateInRange(date)
      const isPast = date < today
      const capacity = availabilityData[dateStr]?.capacity || 0
      
      days.push(
        <div
          key={day}
          onClick={() => !isPast && isAvailable && selectedProgData && handleDateClick(date)}
          className={`
            h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all relative
            ${isPast ? 'text-neutral-300 cursor-not-allowed' : ''}
            ${!isPast && isAvailable && selectedProgData ? 'hover:bg-blue-100' : ''}
            ${!isPast && !isAvailable ? 'text-neutral-400 cursor-not-allowed bg-neutral-100' : ''}
            ${!selectedProgData ? 'cursor-not-allowed text-neutral-400' : ''}
            ${isSelected ? 'bg-blue-500 text-white' : ''}
            ${selectedStartDate && formatDate(selectedStartDate) === dateStr ? 'ring-2 ring-blue-600' : ''}
            ${selectedEndDate && formatDate(selectedEndDate) === dateStr ? 'ring-2 ring-blue-600' : ''}
          `}
        >
          {day}
          {!isPast && isAvailable && capacity <= 3 && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
          )}
          {!isPast && !isAvailable && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
          )}
        </div>
      )
    }
    
    return days
  }
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  return (
    <div className="min-h-screen flex flex-col bg-white">      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"></div>
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2">
                Book Your Experience
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                Reserve Your Spot
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
                Customize your English learning experience with our flexible booking options.
              </p>
              
              {selectedBuilding && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto border border-white/20">
                  <div className="flex items-center justify-center">
                    <Home className="h-5 w-5 text-white mr-2" />
                    <span className="text-white font-medium">
                      Booking for: {selectedBuilding.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Booking Form */}
            <div className="lg:w-2/3">
              <Tabs defaultValue="program" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8 bg-neutral-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="program" 
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                  >
                    Program
                  </TabsTrigger>
                  <TabsTrigger 
                    value="duration" 
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                  >
                    Duration & Dates
                  </TabsTrigger>
                  <TabsTrigger 
                    value="accommodation" 
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                  >
                    Accommodation
                  </TabsTrigger>
                  <TabsTrigger 
                    value="addons" 
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                  >
                    Add-ons
                  </TabsTrigger>
                </TabsList>
                
                {/* Program Selection */}
                <TabsContent value="program" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-neutral-900">
                        <Users className="h-5 w-5 mr-2 text-blue-500" />
                        Select Your Program
                      </CardTitle>
                      <CardDescription className="text-neutral-600">
                        Choose the English program that best matches your learning goals.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {programs.map((program) => (
                          <Card 
                            key={program.id} 
                            className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg flex flex-col h-full ${selectedProgram === program.id ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={() => {
                              setSelectedProgram(program.id)
                              // Reset dates when program changes
                              setSelectedStartDate(null)
                              setSelectedEndDate(null)
                            }}
                          >
                            <CardContent className="p-5 flex-grow">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-neutral-900">{program.name}</h3>
                                {selectedProgram === program.id && (
                                  <CheckCircle className="h-5 w-5 text-blue-500" />
                                )}
                              </div>
                              <p className="text-sm text-neutral-600 mb-4">{program.description}</p>
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-neutral-600">
                                  <Clock className="h-4 w-4 mr-2 text-neutral-500" />
                                  <span>{program.minWeeks}-{program.maxWeeks} weeks</span>
                                </div>
                                <div className="flex items-center text-sm text-neutral-600">
                                  <Star className="h-4 w-4 mr-2 text-neutral-500" />
                                  <span>{program.level}</span>
                                </div>
                              </div>
                              <div className="font-bold text-blue-600 mt-auto">
                                Rp {program.price.toLocaleString('id-ID')} / 4 weeks
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Duration & Date Selection */}
                <TabsContent value="duration" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-neutral-900">
                        <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                        Select Your Study Period
                      </CardTitle>
                      <CardDescription className="text-neutral-600">
                        {selectedProgram ? 
                          `Choose your start and end dates. ${programs.find(p => p.id === selectedProgram)?.name} requires ${programs.find(p => p.id === selectedProgram)?.minWeeks}-${programs.find(p => p.id === selectedProgram)?.maxWeeks} weeks.` :
                          'Please select a program first to see available dates.'
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!selectedProgram ? (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                          <p className="text-neutral-500">Select a program to view available dates</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {/* Calendar Header */}
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-neutral-900">
                              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </h3>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="border-neutral-300"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="border-neutral-300"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Calendar Grid */}
                          <div className="bg-white rounded-lg border border-neutral-200 p-4">
                            {/* Week day headers */}
                            <div className="grid grid-cols-7 gap-2 mb-4">
                              {weekDays.map(day => (
                                <div key={day} className="text-center text-sm font-medium text-neutral-600 py-2">
                                  {day}
                                </div>
                              ))}
                            </div>
                            
                            {/* Calendar days */}
                            <div className="grid grid-cols-7 gap-2">
                              {renderCalendar()}
                            </div>
                          </div>
                          
                          {/* Legend */}
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                              <span>Selected Period</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-neutral-100 rounded mr-2 relative">
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                              </div>
                              <span>Limited Availability</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-neutral-100 rounded mr-2 relative">
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></div>
                              </div>
                              <span>Unavailable</span>
                            </div>
                          </div>
                          
                          {/* Selected dates display */}
                          {selectedStartDate && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-semibold text-neutral-900 mb-2">Selected Period</h4>
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm text-neutral-600">Start Date</div>
                                  <div className="font-medium">{selectedStartDate.toLocaleDateString()}</div>
                                </div>
                                {selectedEndDate ? (
                                  <>
                                    <div className="text-neutral-400">→</div>
                                    <div>
                                      <div className="text-sm text-neutral-600">End Date</div>
                                      <div className="font-medium">{selectedEndDate.toLocaleDateString()}</div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-neutral-600">Duration</div>
                                      <div className="font-medium">{getSelectedWeeks()} weeks</div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-sm text-neutral-500">Select end date</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Accommodation Selection */}
                <TabsContent value="accommodation" className="space-y-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-neutral-900">
                        <Home className="h-5 w-5 mr-2 text-blue-500" />
                        Select Your Accommodation
                      </CardTitle>
                      <CardDescription className="text-neutral-600">
                        Choose from our range of comfortable room options.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {rooms.map((room) => (
                          <Card 
                            key={room.id} 
                            className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg flex flex-col h-full ${selectedRoom === room.id ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={() => setSelectedRoom(room.id)}
                          >
                            <CardContent className="p-5 flex-grow">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-neutral-900">{room.name}</h3>
                                {selectedRoom === room.id && (
                                  <CheckCircle className="h-5 w-5 text-blue-500" />
                                )}
                              </div>
                              <p className="text-sm text-neutral-600 mb-4">{room.description}</p>
                              <ul className="space-y-1 mb-4">
                                {room.features.map((feature, index) => (
                                  <li key={index} className="flex items-center text-sm text-neutral-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="font-bold text-blue-600 mt-auto">
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
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-neutral-900">
                        <Info className="h-5 w-5 mr-2 text-blue-500" />
                        Select Add-ons
                      </CardTitle>
                      <CardDescription className="text-neutral-600">
                        Enhance your experience with our additional services.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {addons.map((addon) => (
                          <Card 
                            key={addon.id} 
                            className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg ${selectedAddons.includes(addon.id) ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={() => toggleAddon(addon.id)}
                          >
                            <CardContent className="p-5">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold text-neutral-900">{addon.name}</h3>
                                  <p className="text-sm text-neutral-600 mb-2">{addon.description}</p>
                                  <div className="font-bold text-blue-600">
                                    Rp {addon.price.toLocaleString('id-ID')}
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  {selectedAddons.includes(addon.id) ? (
                                    <CheckCircle className="h-5 w-5 text-blue-500" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-neutral-300"></div>
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
                  <CardTitle className="text-neutral-900">Booking Summary</CardTitle>
                  <CardDescription className="text-neutral-600">Review your selections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Program Summary */}
                  <div>
                    <h3 className="font-semibold mb-2 text-neutral-800">Program</h3>
                    {selectedProgram ? (
                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                        <div className="font-medium text-neutral-900">{programs.find(p => p.id === selectedProgram)?.name}</div>
                        {selectedStartDate && selectedEndDate && (
                          <div className="text-sm text-neutral-600">
                            {getSelectedWeeks()} weeks
                          </div>
                        )}
                        <div className="font-bold text-blue-600 mt-1">
                          {selectedStartDate && selectedEndDate ? 
                            `Rp ${(((programs.find(p => p.id === selectedProgram)?.price || 0) / 4) * getSelectedWeeks()).toLocaleString('id-ID')}` :
                            'Select dates to see price'
                          }
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-500">No program selected</div>
                    )}
                  </div>
                  
                  {/* Duration Summary */}
                  <div>
                    <h3 className="font-semibold mb-2 text-neutral-800">Study Period</h3>
                    {selectedStartDate && selectedEndDate ? (
                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                        <div className="font-medium text-neutral-900">
                          {selectedStartDate.toLocaleDateString()} - {selectedEndDate.toLocaleDateString()}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {getSelectedWeeks()} weeks duration
                        </div>
                      </div>
                    ) : selectedStartDate ? (
                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                        <div className="font-medium text-neutral-900">
                          Start: {selectedStartDate.toLocaleDateString()}
                        </div>
                        <div className="text-sm text-neutral-600">
                          Select end date
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-500">No dates selected</div>
                    )}
                  </div>
                  
                  {/* Accommodation Summary */}
                  <div>
                    <h3 className="font-semibold mb-2 text-neutral-800">Accommodation</h3>
                    {selectedRoom ? (
                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                        <div className="font-medium text-neutral-900">{rooms.find(r => r.id === selectedRoom)?.name}</div>
                        {selectedStartDate && selectedEndDate && (
                          <div className="text-sm text-neutral-600">
                            {getSelectedWeeks()} weeks
                          </div>
                        )}
                        <div className="font-bold text-blue-600 mt-1">
                          {selectedStartDate && selectedEndDate ? 
                            `Rp ${((rooms.find(r => r.id === selectedRoom)?.price || 0) * getSelectedWeeks()).toLocaleString('id-ID')}` :
                            'Select dates to see price'
                          }
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-500">No accommodation selected</div>
                    )}
                  </div>
                  
                  {/* Add-ons Summary */}
                  {selectedAddons.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-neutral-800">Add-ons</h3>
                      <div className="space-y-2">
                        {selectedAddons.map(addonId => {
                          const addon = addons.find(a => a.id === addonId)
                          return addon ? (
                            <div key={addon.id} className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 flex justify-between">
                              <div>
                                <div className="font-medium text-neutral-900">{addon.name}</div>
                                <div className="text-sm text-neutral-600">{addon.description}</div>
                              </div>
                              <div className="font-bold text-blue-600">
                                Rp {addon.price.toLocaleString('id-ID')}
                              </div>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Total */}
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-neutral-900">Total</span>
                      <span className="font-bold text-xl text-blue-600">
                        Rp {calculateTotal().toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Book Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3" 
                    size="lg"
                    disabled={!selectedProgram || !selectedStartDate || !selectedEndDate}
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