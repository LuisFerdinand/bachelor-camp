"use client"

import React from "react";
import HeroSection from "./HeroSection";
import InformationSection from "./InformationSection";
import ContactFormSection from "./ContactFormSection";
import FAQSection from "./FAQSection";
import { ContactPageCMSData, BachelorCampInfo, FAQItem, ContactFormData } from "./types";

interface ContactPageProps {
  cmsData?: ContactPageCMSData;
}

export default function ContactPage({ cmsData }: ContactPageProps) {
  // Hero images with fallbacks
  const heroImages = {
    mobile: {
      src: cmsData?.heroMobileImage?.url || "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=600&auto=format&fit=crop",
      alt: cmsData?.heroMobileImage?.alt || "BachelorCamp - mobile view",
    },
    desktop: {
      src: cmsData?.heroDesktopImage?.url || "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=1170&auto=format&fit=crop",
      alt: cmsData?.heroDesktopImage?.alt || "BachelorCamp - desktop view",
    },
  };

  // BachelorCamp information - Updated to match InformationSection expectations
  const bachelorCamp: BachelorCampInfo = {
    name: "BachelorCamp English Learning Center",
    address: "Jl. Veteran No. 15, Kediri City, East Java 64127",
    phone: "+62 354 123456",
    email: "kediri@bachelorcamp.com",
    hours: `
      <strong>Monday - Friday:</strong> 08:00 - 20:00<br>
      <strong>Saturday:</strong> 09:00 - 17:00<br>
      <strong>Sunday:</strong> Closed
    `,
    // Add coordinates for precise mapping (replace with your exact coordinates)
    latitude: -6.164132732158701,  // Your Jakarta coordinates from the component
    longitude: 106.7764701133734,  // Your Jakarta coordinates from the component
    // Remove mapEmbedUrl since we're using the JavaScript API now
  };

  // FAQ items
  const faqs: FAQItem[] = [
    {
      question: "What programs does BachelorCamp offer?",
      answer: "BachelorCamp offers comprehensive English language programs including general English, business English, exam preparation (IELTS, TOEFL), and specialized courses for professionals.",
    },
    {
      question: "How do I enroll at BachelorCamp?",
      answer: "You can enroll by filling out our online application form, visiting our campus in Kediri, or contacting our admissions team directly. We'll guide you through the placement test and help you choose the right program.",
    },
    {
      question: "Where is BachelorCamp located?",
      answer: "BachelorCamp is located at Jl. Veteran No. 15, Kediri City, East Java 64127. We're easily accessible by public transportation and have parking available for students.",
    },
    {
      question: "What are the operating hours of BachelorCamp?",
      answer: "We're open Monday to Friday from 8:00 AM to 8:00 PM, Saturdays from 9:00 AM to 5:00 PM, and closed on Sundays. Our administrative office is available during these hours for inquiries.",
    },
    {
      question: "Does BachelorCamp offer online courses?",
      answer: "Yes, we offer both in-person and online courses. Our online programs are delivered through our interactive learning platform, with live sessions with instructors and self-paced study materials.",
    },
  ];

  // Form state
  const [formData, setFormData] = React.useState<ContactFormData>({
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

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(true);
      return;
    }
    setIsSubmitting(true);
    setFormError(false);
    console.log("Contact form submitted:", formData);
    setTimeout(() => {
      setFormSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1000);
  };

  const resetForm = () => setFormSubmitted(false);

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
        <HeroSection heroImages={heroImages} scrollToForm={scrollToForm} />
        <InformationSection bachelorCamp={bachelorCamp} />
        <ContactFormSection
          formData={formData}
          formSubmitted={formSubmitted}
          formError={formError}
          isSubmitting={isSubmitting}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
        />
        <FAQSection
          faqs={faqs}
          expandedFaq={expandedFaq}
          toggleFaq={toggleFaq}
        />
      </main>
    </div>
  );
}