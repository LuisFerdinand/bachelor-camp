"use client";

import React from "react";
import emailjs from "@emailjs/browser";
import HeroSection from "./HeroSection";
import InformationSection from "./InformationSection";
import ContactFormSection from "./ContactFormSection";
import FAQSection from "./FAQSection";
import {
  ContactPageCMSData,
  BachelorCampInfo,
  FAQItem,
  ContactFormData,
} from "./types";
import { CONTACT_BANNER_FALLBACK } from "@/constants";
import { ContactHeroSection } from "../../sections/contact/ContactHeroSection";

interface ContactPageProps {
  cmsData?: ContactPageCMSData;
}

export default function ContactPage({ cmsData }: ContactPageProps) {
  // BachelorCamp information - Updated to match InformationSection expectations
  const bachelorCamp: BachelorCampInfo = {
    name: "BachelorCamp English Learning Center",
    address: "Jl. Veteran No. 15, Kediri City, East Java 64127",
    phone: "+62 354 123456",
    email: "ferdinandluis@gmail.com",
    hours: `
      <strong>Monday - Friday:</strong> 08:00 - 20:00<br>
      <strong>Saturday:</strong> 09:00 - 17:00<br>
      <strong>Sunday:</strong> Closed
    `,
    latitude: -6.164132732158701,
    longitude: 106.7764701133734,
  };

  // FAQ items
  const faqs: FAQItem[] = [
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
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(true);
      return;
    }

    setIsSubmitting(true);
    setFormError(false);

    try {
      // Get EmailJS credentials from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Debug logging
      console.log("EmailJS Configuration Check:");
      console.log("Service ID exists:", !!serviceId);
      console.log("Template ID exists:", !!templateId);
      console.log("Public Key exists:", !!publicKey);

      // Check if credentials are configured
      if (!serviceId || !templateId || !publicKey) {
        console.error("Missing EmailJS credentials:");
        console.error("Service ID:", serviceId ? "Set" : "MISSING");
        console.error("Template ID:", templateId ? "Set" : "MISSING");
        console.error("Public Key:", publicKey ? "Set" : "MISSING");
        throw new Error(
          "Email service not configured. Please check your .env.local file."
        );
      }

      // Initialize EmailJS with public key
      emailjs.init(publicKey);

      // Get current timestamp
      const now = new Date();
      const formattedTime = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || "Not provided",
        subject: formData.subject || "General Inquiry",
        message: formData.message,
        to_name: "BachelorCamp Team",
        time: formattedTime,
      };

      console.log("Sending email with parameters:", {
        ...templateParams,
        message: templateParams.message.substring(0, 50) + "...",
      });

      // Send email via EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log("Email sent successfully:", response.status, response.text);

      setFormSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("EmailJS Error Details:");
      console.error("Error:", error);
      console.error("Error message:", error?.message);
      console.error("Error text:", error?.text);
      console.error("Error status:", error?.status);

      setFormError(true);

      // More specific error messages
      let errorMessage = "Failed to send message. ";

      if (error?.status === 400) {
        errorMessage +=
          "Invalid configuration. Please check your EmailJS settings.";
      } else if (error?.status === 401 || error?.status === 403) {
        errorMessage +=
          "Authentication failed. Please verify your EmailJS Public Key.";
      } else if (error?.status === 404) {
        errorMessage += "Service or Template not found. Please check your IDs.";
      } else if (!navigator.onLine) {
        errorMessage += "No internet connection.";
      } else if (error?.message?.includes("not configured")) {
        errorMessage += error.message;
      } else {
        errorMessage +=
          "Please try again or contact us directly at kediri@bachelorcamp.com";
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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
        <ContactHeroSection scrollToForm={scrollToForm} />
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
