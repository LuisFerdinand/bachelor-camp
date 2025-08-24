'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  Users, 
  Globe, 
  BookOpen, 
  CheckCircle,
  Star,
  TrendingUp,
  Calendar
} from 'lucide-react'

export default function AboutUsPage() {
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

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-brand-50 to-accent-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-accent-100 text-accent-800 hover:bg-accent-200">
                About Our Institution
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                Excellence in English Education
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                For over a decade, we&apos;ve been providing world-class English education with a focus on practical skills and cultural immersion.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-brand-500 hover:bg-brand-600">
                  Our Mission
                </Button>
                <Button size="lg" variant="outline" className="border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white">
                  Meet Our Team
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <div className="text-4xl font-bold text-brand-600 mb-2">{stat.value}</div>
                  <div className="text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accreditations Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Accreditations & Partnerships</h2>
              <p className="text-lg text-neutral-600">
                We&apos;re proud to be recognized by leading international organizations for our quality standards.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accreditations.map((accreditation) => (
                <Card key={accreditation.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
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
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-sm italic mb-2">&quot;The instructors are incredibly knowledgeable and supportive.&quot;</p>
                  <p className="text-sm font-medium">- Michael T.</p>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-sm italic mb-2">&quot;I improved my IELTS score by 1.5 bands in just 8 weeks!&quot;</p>
                  <p className="text-sm font-medium">- Priya K.</p>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-sm italic mb-2">&quot;The camp experience was life-changing. I made friends from around the world.&quot;</p>
                  <p className="text-sm font-medium">- Juan P.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Our Journey</h2>
              <p className="text-lg text-neutral-600">
                Key milestones in our mission to provide exceptional English education.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-brand-200"></div>
                
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`relative mb-12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-brand-500 border-4 border-white z-10`}></div>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                      <Card className="border-0 shadow-md">
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">Our Values</h2>
              <p className="text-lg text-neutral-600">
                The principles that guide everything we do at our institution.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Excellence</h3>
                <p className="text-neutral-600">We strive for the highest standards in teaching and learning.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Community</h3>
                <p className="text-neutral-600">We foster a supportive and inclusive learning environment.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Innovation</h3>
                <p className="text-neutral-600">We embrace new teaching methods and technologies.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Integrity</h3>
                <p className="text-neutral-600">We operate with honesty and transparency in all we do.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  )
}