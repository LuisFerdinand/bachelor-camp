"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Building,
  Users,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

// Define TypeScript interfaces for the CMS data
interface CMSImage {
  url: string;
  alt: string;
}

interface ContactPageCMSData {
  heroMobileImage?: CMSImage;
  heroDesktopImage?: CMSImage;
}

interface ContactPageProps {
  cmsData?: ContactPageCMSData;
}

export default function ContactPage({ cmsData }: ContactPageProps) {
  // Get hero images with fallbacks to Unsplash images
  const heroImages = {
    mobile: {
      src:
        cmsData?.heroMobileImage?.url ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: cmsData?.heroMobileImage?.alt || "Contact us - mobile view",
    },
    desktop: {
      src:
        cmsData?.heroDesktopImage?.url ||
        "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: cmsData?.heroDesktopImage?.alt || "Contact us - desktop view",
    },
  };

  const campuses = [
    {
      id: 1,
      name: "Jakarta Campus",
      address: "123 Education Street, Central Jakarta, Indonesia 10110",
      phone: "+62 21 1234 5678",
      email: "jakarta@englishlearning.com",
      hours:
        "Monday - Friday: 8:00 AM - 8:00 PM<br>Saturday: 9:00 AM - 5:00 PM<br>Sunday: Closed",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      imageAlt: "Jakarta campus building",
    },
    {
      id: 2,
      name: "Surabaya Campus",
      address: "456 Learning Avenue, West Surabaya, Indonesia 60291",
      phone: "+62 31 8765 4321",
      email: "surabaya@englishlearning.com",
      hours:
        "Monday - Friday: 8:00 AM - 8:00 PM<br>Saturday: 9:00 AM - 5:00 PM<br>Sunday: Closed",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      imageAlt: "Surabaya campus building",
    },
    {
      id: 3,
      name: "Bali Campus",
      address: "789 Language Road, Denpasar, Bali 80221",
      phone: "+62 361 9876 5432",
      email: "bali@englishlearning.com",
      hours:
        "Monday - Friday: 8:00 AM - 8:00 PM<br>Saturday: 9:00 AM - 5:00 PM<br>Sunday: Closed",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      imageAlt: "Bali campus building",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Academic Director",
      email: "sarah.johnson@englishlearning.com",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      imageAlt: "Sarah Johnson",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Student Services Manager",
      email: "michael.chen@englishlearning.com",
      image:
        "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      imageAlt: "Michael Chen",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      position: "Admissions Officer",
      email: "emma.rodriguez@englishlearning.com",
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      imageAlt: "Emma Rodriguez",
    },
    {
      id: 4,
      name: "David Kim",
      position: "Program Coordinator",
      email: "david.kim@englishlearning.com",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      imageAlt: "David Kim",
    },
  ];

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "You can enroll in a course by filling out our online application form, visiting one of our campuses, or contacting our admissions team directly. We'll guide you through the placement test and help you choose the right program for your needs.",
    },
    {
      question: "What is the placement test like?",
      answer:
        "Our placement test is designed to assess your current English proficiency level. It includes sections on reading, writing, listening, and speaking. The test takes approximately 60-90 minutes, and results are available within 24 hours.",
    },
    {
      question: "Do you offer online courses?",
      answer:
        "Yes, we offer both in-person and online courses. Our online programs are delivered through our interactive learning platform, with live sessions with instructors and self-paced study materials.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including bank transfers, credit/debit cards, and digital payments. We also offer installment plans for longer courses. Contact our finance team for more details.",
    },
    {
      question: "Can I get a certificate after completing a course?",
      answer:
        "Yes, all students who successfully complete our courses receive a certificate of completion. For our exam preparation courses, we also help you register for the official exams.",
    },
  ];

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formError, setFormError] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(true);
      return;
    }

    setIsSubmitting(true);
    setFormError(false);

    // In a real application, this would send the data to a server
    console.log("Contact form submitted:", formData);

    // Simulate sending to admin
    setTimeout(() => {
      setFormSubmitted(true);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2 transition-all duration-300">
                <MessageSquare className="w-4 h-4 mr-2" />
                Get In Touch
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white drop-shadow-lg">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                Have questions about our programs or ready to start your English
                learning journey? Our team is here to help you every step of the
                way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={scrollToForm}
                  className="bg-brand-500 hover:bg-brand-600 text-white shadow-brand px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
                <Button
                  size="lg"
                  className="bg-accent-500 hover:bg-accent-600 text-white shadow-accent px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3 text-base font-semibold transition-all duration-300"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Visit Campus
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Us a Message
                </Badge>
                <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                  Get In Touch
                </h2>
                <p className="text-lg text-neutral-600">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">Send a Message</CardTitle>
                      <CardDescription>
                        We&apos;ll respond to your inquiry within 24 hours
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {formSubmitted ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-green-800 mb-2">
                            Message Sent Successfully!
                          </h3>
                          <p className="text-green-700">
                            Thank you for contacting us. We&apos;ll get back to
                            you soon.
                          </p>
                          <Button
                            onClick={() => setFormSubmitted(false)}
                            className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                          >
                            Send Another Message
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          {formError && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center animate-pulse">
                              <p className="text-red-700">
                                Please fill in all required fields.
                              </p>
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-1"
                              >
                                Full Name *
                              </label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your full name"
                                required
                                className="transition-all duration-200 focus:ring-2 focus:ring-brand-500"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-1"
                              >
                                Email Address *
                              </label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your.email@example.com"
                                required
                                className="transition-all duration-200 focus:ring-2 focus:ring-brand-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium mb-1"
                              >
                                Phone Number
                              </label>
                              <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+62 812 3456 7890"
                                className="transition-all duration-200 focus:ring-2 focus:ring-brand-500"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="subject"
                                className="block text-sm font-medium mb-1"
                              >
                                Subject
                              </label>
                              <Input
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="How can we help you?"
                                className="transition-all duration-200 focus:ring-2 focus:ring-brand-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="message"
                              className="block text-sm font-medium mb-1"
                            >
                              Message *
                            </label>
                            <Textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Tell us more about your inquiry..."
                              rows={5}
                              required
                              className="transition-all duration-200 focus:ring-2 focus:ring-brand-500 resize-none"
                            />
                          </div>

                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-brand-500 hover:bg-brand-600 transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-70"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="h-5 w-5 mr-2 text-brand-500" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start group">
                        <MapPin className="h-5 w-5 text-brand-500 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <div>
                          <h4 className="font-medium">Head Office</h4>
                          <p className="text-neutral-600">
                            123 Education Street, Central Jakarta, Indonesia
                            10110
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center group">
                        <Phone className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <div>
                          <h4 className="font-medium">Phone</h4>
                          <a
                            href="tel:+6221123445678"
                            className="text-neutral-600 hover:text-brand-500 transition-colors"
                          >
                            +62 21 1234 5678
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center group">
                        <Mail className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <div>
                          <h4 className="font-medium">Email</h4>
                          <a
                            href="mailto:info@englishlearning.com"
                            className="text-neutral-600 hover:text-brand-500 transition-colors"
                          >
                            info@englishlearning.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start group">
                        <Clock className="h-5 w-5 text-brand-500 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <div>
                          <h4 className="font-medium">Office Hours</h4>
                          <div className="text-neutral-600 space-y-1">
                            <div>Monday - Friday: 8:00 AM - 8:00 PM</div>
                            <div>Saturday: 9:00 AM - 5:00 PM</div>
                            <div>Sunday: Closed</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-brand-50 to-accent-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-between bg-white hover:bg-brand-50 text-brand-700 border border-brand-200">
                        Schedule a Campus Visit
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button className="w-full justify-between bg-white hover:bg-accent-50 text-accent-700 border border-accent-200">
                        Download Brochure
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge className="mb-4 bg-accent-100 text-accent-800 border-0">
                <MessageSquare className="w-4 h-4 mr-2" />
                Frequently Asked Questions
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                FAQs
              </h2>
              <p className="text-lg text-neutral-600">
                Find answers to common questions about our programs and
                services.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-6 text-left hover:bg-neutral-50 transition-colors duration-200"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-lg pr-4">
                            {faq.question}
                          </h3>
                          {expandedFaq === index ? (
                            <ChevronUp className="h-5 w-5 text-brand-500 flex-shrink-0 transition-transform duration-200" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-brand-500 flex-shrink-0 transition-transform duration-200" />
                          )}
                        </div>
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-neutral-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
