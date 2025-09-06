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
        "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=600&auto=format&fit=crop",
      alt: cmsData?.heroMobileImage?.alt || "BachelorCamp - mobile view",
    },
    desktop: {
      src:
        cmsData?.heroDesktopImage?.url ||
        "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=1170&auto=format&fit=crop",
      alt: cmsData?.heroDesktopImage?.alt || "BachelorCamp - desktop view",
    },
  };

  const BachelorCamp = {
    id: 1,
    name: "BachelorCamp",
    address: "Jl. Veteran No. 15, Kediri City, East Java 64127",
    phone: "+62 354 123456",
    email: "kediri@bachelorcamp.com",
    hours:
      "Monday - Friday: 8:00 AM - 8:00 PM<br>Saturday: 9:00 AM - 5:00 PM<br>Sunday: Closed",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.7853475894884!2d112.01534431533453!3d-7.819599994318812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7857d5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sKediri%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1629789386789!5m2!1sen!2sid",
  };

  const faqs = [
    {
      question: "What programs does BachelorCamp offer?",
      answer:
        "BachelorCamp offers comprehensive English language programs including general English, business English, exam preparation (IELTS, TOEFL), and specialized courses for professionals.",
    },
    {
      question: "How do I enroll at BachelorCamp?",
      answer:
        "You can enroll by filling out our online application form, visiting our campus in Kediri, or contacting our admissions team directly. We'll guide you through the placement test and help you choose the right program.",
    },
    {
      question: "Where is BachelorCamp located?",
      answer:
        "BachelorCamp is located at Jl. Veteran No. 15, Kediri City, East Java 64127. We're easily accessible by public transportation and have parking available for students.",
    },
    {
      question: "What are the operating hours of BachelorCamp?",
      answer:
        "We're open Monday to Friday from 8:00 AM to 8:00 PM, Saturdays from 9:00 AM to 5:00 PM, and closed on Sundays. Our administrative office is available during these hours for inquiries.",
    },
    {
      question: "Does BachelorCamp offer online courses?",
      answer:
        "Yes, we offer both in-person and online courses. Our online programs are delivered through our interactive learning platform, with live sessions with instructors and self-paced study materials.",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
                <Building className="w-4 h-4 mr-2" />
                BachelorCamp Kediri
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white drop-shadow-lg">
                Welcome to BachelorCamp
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                Your premier English learning destination in Kediri. Contact us
                today to start your language journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={scrollToForm}
                  className="bg-brand-500 hover:bg-brand-600 text-white shadow-brand px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
                <Button
                  size="lg"
                  className="bg-accent-500 hover:bg-accent-600 text-white shadow-accent px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
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

        {/* BachelorCamp Information Section */}
        <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
                <Building className="w-4 h-4 mr-2" />
                About BachelorCamp
              </Badge>
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Premier English Learning Center in Kediri
              </h2>
              <p className="text-lg text-neutral-600">
                BachelorCamp is a leading English language institute dedicated
                to providing high-quality education to students in Kediri and
                surrounding areas. Our experienced teachers, modern facilities,
                and comprehensive curriculum ensure you achieve your language
                learning goals.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* BachelorCamp Information */}
                  <div className="p-8 bg-gradient-to-br from-brand-50 to-accent-50">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2 flex items-center">
                        <Building className="h-6 w-6 mr-2 text-brand-500" />
                        {BachelorCamp.name}
                      </h3>
                      <p className="text-neutral-600">
                        Our campus in Kediri offers state-of-the-art facilities
                        and a supportive learning environment.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-brand-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Address</h5>
                          <p className="text-neutral-600">
                            {BachelorCamp.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Phone</h5>
                          <a
                            href={`tel:${BachelorCamp.phone}`}
                            className="text-neutral-600 hover:text-brand-500 transition-colors"
                          >
                            {BachelorCamp.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-brand-500 mr-3 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Email</h5>
                          <a
                            href={`mailto:${BachelorCamp.email}`}
                            className="text-neutral-600 hover:text-brand-500 transition-colors"
                          >
                            {BachelorCamp.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-brand-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Operating Hours</h5>
                          <div
                            className="text-neutral-600"
                            dangerouslySetInnerHTML={{
                              __html: BachelorCamp.hours,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <Button
                        className="flex-1 bg-brand-500 hover:bg-brand-600"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BachelorCamp.address)}`,
                            "_blank"
                          )
                        }
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BachelorCamp.address)}`,
                            "_blank"
                          )
                        }
                      >
                        Navigate to Campus
                      </Button>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="relative h-96 lg:h-auto min-h-[400px]">
                    <iframe
                      title="Map of BachelorCamp Kediri"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      referrerPolicy="no-referrer-when-downgrade"
                      src={BachelorCamp.mapEmbedUrl}
                      allowFullScreen
                      className="absolute inset-0"
                    ></iframe>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          id="contact-form"
          className="py-16 bg-gradient-to-b from-neutral-50 to-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <Badge className="mb-4 bg-accent-100 text-accent-800 border-0">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Us
                </Badge>
                <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                  Get In Touch
                </h2>
                <p className="text-lg text-neutral-600">
                  Have questions about our programs? Fill out the form below and
                  we&apos;ll get back to you as soon as possible.
                </p>
              </div>

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
                        Thank you for contacting BachelorCamp. We&apos;ll get
                        back to you soon.
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
                BachelorCamp FAQs
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
