'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle
} from 'lucide-react'

export default function ContactUsPage() {
  const contactInfo = [
    {
      id: 1,
      icon: MapPin,
      title: "Visit Our Campus",
      details: [
        "123 Education Street, Jakarta, Indonesia",
        "Open Monday to Saturday: 9AM - 6PM"
      ]
    },
    {
      id: 2,
      icon: Phone,
      title: "Call Us",
      details: [
        "+62 21 1234 5678",
        "+62 812 3456 7890 (WhatsApp)"
      ]
    },
    {
      id: 3,
      icon: Mail,
      title: "Email Us",
      details: [
        "info@educamp.com",
        "admissions@educamp.com"
      ]
    },
    {
      id: 4,
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 4:00 PM",
        "Sunday: Closed"
      ]
    }
  ]

  const socialMedia = [
    { id: 1, name: "Facebook", icon: "fb", url: "#" },
    { id: 2, name: "Instagram", icon: "ig", url: "#" },
    { id: 3, name: "Twitter", icon: "tw", url: "#" },
    { id: 4, name: "YouTube", icon: "yt", url: "#" }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-brand-50 to-accent-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-accent-100 text-accent-800 hover:bg-accent-200">
                Get In Touch
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                Have questions about our programs? Reach out to our team and w&apos;ll be happy to help.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="lg:w-1/2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input id="phone" placeholder="+62 812 3456 7890" />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <Textarea id="message" placeholder="Your message here..." rows={5} />
                  </div>
                  
                  <Button className="w-full bg-brand-500 hover:bg-brand-600">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  
                  <div className="text-center text-sm text-neutral-500 mt-4">
                    We&apos;ll respond within 24 business hours.
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Info & Map */}
            <div className="lg:w-1/2 space-y-8">
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((info) => {
                  const IconComponent = info.icon
                  return (
                    <Card key={info.id} className="border-0 shadow-md">
                      <CardContent className="p-5">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-5 w-5 text-brand-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{info.title}</h3>
                            <div className="space-y-1">
                              {info.details.map((detail, index) => (
                                <p key={index} className="text-sm text-neutral-600">{detail}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              
              {/* WhatsApp Contact */}
              <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-emerald-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg">Chat on WhatsApp</h3>
                      <p className="text-neutral-600">Get instant responses to your questions</p>
                    </div>
                    <Button 
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => window.open('https://wa.me/6281234567890?text=Hello%20I%20am%20interested%20in%20your%20programs', '_blank')}
                    >
                      Chat Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Map */}
              <Card className="border-0 shadow-md overflow-hidden">
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-80 bg-gradient-to-br from-brand-200 to-accent-200 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-brand-600 mx-auto mb-2" />
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm text-neutral-600 mt-1">123 Education Street, Jakarta</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Social Media */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                  <CardDescription>Stay updated with our latest news and offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialMedia.map((social) => (
                      <a 
                        key={social.id} 
                        href={social.url} 
                        className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-brand-100 transition-colors"
                      >
                        <span className="font-medium text-brand-600">{social.icon}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-neutral-600">Find answers to common questions about our programs and services.</p>
              </div>
              
              <div className="space-y-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">What is the duration of your programs?</h3>
                    <p className="text-neutral-600">We offer flexible program durations ranging from 4 weeks to 48 weeks, depending on your learning goals and schedule.</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">Do you provide accommodation for international students?</h3>
                    <p className="text-neutral-600">Yes, we offer comfortable accommodation options on campus with various room types to suit different budgets and preferences.</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">What is the class size?</h3>
                    <p className="text-neutral-600">Our classes are kept small with a maximum of 15 students to ensure personalized attention and effective learning.</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">Do you offer payment plans?</h3>
                    <p className="text-neutral-600">Yes, we offer flexible payment plans to make our programs accessible. Please contact our admissions team for more details.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}