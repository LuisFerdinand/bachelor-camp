// File: pages/Contact/types.ts

// Image type for CMS data
export interface ImageData {
  url: string;
  alt: string;
}

// CMS data structure for contact page
export interface ContactPageCMSData {
  heroMobileImage?: ImageData;
  heroDesktopImage?: ImageData;
}

// BachelorCamp information interface
export interface BachelorCampInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string; // HTML string for formatted hours
  latitude: number;  // Required for precise mapping
  longitude: number; // Required for precise mapping
}

// FAQ item interface
export interface FAQItem {
  question: string;
  answer: string;
}

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Example data structure for reference
export const exampleBachelorCampData: BachelorCampInfo = {
  name: "BachelorCamp English Learning Center",
  address: "Jl. Veteran No. 15, Kediri City, East Java 64127", // Replace with real address
  phone: "+62 354 123456", // Replace with real phone
  email: "kediri@bachelorcamp.com", // Replace with real email
  hours: `
    <strong>Monday - Friday:</strong> 08:00 - 20:00<br>
    <strong>Saturday:</strong> 09:00 - 17:00<br>
    <strong>Sunday:</strong> Closed
  `,
  latitude: -6.164132732158701,  // Replace with your exact latitude
  longitude: 106.7764701133734, // Replace with your exact longitude
};