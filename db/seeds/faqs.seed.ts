// db/seeds/faqs.seed.ts
import { db } from "..";
import { faqCategories, faqCategoryRelations, faqs } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { BooleanType, PageType } from "../schema/enums";

export const seedFaqs = async () => {
  console.log("🌱 Seeding faqs...");

  // Optional: Clear existing data
  await db.delete(faqs);
  await db.delete(faqCategories);

  type FaqCategoryInsert = typeof faqCategories.$inferInsert;
  type FaqInsert = typeof faqs.$inferInsert;

  const categories: FaqCategoryInsert[] = [
    { name: "Courses", slug: "courses" },
    { name: "Accommodation", slug: "accommodation" },
    { name: "Bundles", slug: "bundles" },
    { name: "Enrollment & Admission", slug: "enrollment" },
    { name: "Payments & Pricing", slug: "payments" },
    { name: "General", slug: "general" },
  ];

  const insertedCategories = await db
    .insert(faqCategories)
    .values(categories.map((c) => ({ id: uuidv4(), ...c })))
    .returning();

  const catMap = Object.fromEntries(
    insertedCategories.map((c) => [c.name, c.id])
  );

  const faqData = [
    // GENERAL
    {
      question: "What programs does BachelorCamp offer?",
      slug: "what-programs-does-bachelorcamp-offer",
      answer:
        "BachelorCamp offers comprehensive English language programs including General English, Business English, exam preparation (IELTS, TOEFL), and specialized courses for professionals.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvb2stb3Blbi1pY29uIGx1Y2lkZS1ib29rLW9wZW4iPjxwYXRoIGQ9Ik0xMiA3djE0Ii8+PHBhdGggZD0iTTMgMThhMSAxIDAgMCAxLTEtMVY0YTEgMSAwIDAgMSAxLTFoNWE0IDQgMCAwIDEgNCA0IDQgNCAwIDAgMSA0LTRoNWExIDEgMCAwIDEgMSAxdjEzYTEgMSAwIDAgMS0xIDFoLTZhMyAzIDAgMCAwLTMgMyAzIDMgMCAwIDAtMy0zeiIvPjwvc3ZnPg==", // lucide-react
      isActive: "true",
      order: 1,
      categories: ["General", "Courses"],
    },
    {
      question: "Where is BachelorCamp located?",
      slug: "where-is-bachelorcamp-located",
      answer:
        "BachelorCamp is located at Jl. Veteran No. 15, Kediri City, East Java 64127. We're easily accessible by public transportation and have parking available for students.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hcC1waW5uZWQtaWNvbiBsdWNpZGUtbWFwLXBpbm5lZCI+PHBhdGggZD0iTTE4IDhjMCAzLjYxMy0zLjg2OSA3LjQyOS01LjM5MyA4Ljc5NWExIDEgMCAwIDEtMS4yMTQgMEM5Ljg3IDE1LjQyOSA2IDExLjYxMyA2IDhhNiA2IDAgMCAxIDEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjIiLz48cGF0aCBkPSJNOC43MTQgMTRoLTMuNzFhMSAxIDAgMCAwLS45NDguNjgzbC0yLjAwNCA2QTEgMSAwIDAgMCAzIDIyaDE4YTEgMSAwIDAgMCAuOTQ4LTEuMzE2bC0yLTZhMSAxIDAgMCAwLS45NDktLjY4NGgtMy43MTIiLz48L3N2Zz4=",
      isActive: "true",
      order: 2,
      categories: ["General"],
    },
    {
      question: "What are the operating hours of BachelorCamp?",
      slug: "what-are-the-operating-hours-of-bachelorcamp",
      answer:
        "We're open Monday to Friday from 8:00 AM to 8:00 PM, Saturdays from 9:00 AM to 5:00 PM, and closed on Sundays. Our administrative office is available during these hours for inquiries.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWNsb2NrLWljb24gbHVjaWRlLWNhbGVuZGFyLWNsb2NrIj48cGF0aCBkPSJNMTYgMTR2Mi4ybDEuNiAxIi8+PHBhdGggZD0iTTE2IDJ2NCIvPjxwYXRoIGQ9Ik0yMSA3LjVWNmEyIDIgMCAwIDAtMi0ySDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDMuNSIvPjxwYXRoIGQ9Ik0zIDEwaDUiLz48cGF0aCBkPSJNOCAydjQiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI2Ii8+PC9zdmc+",
      isActive: "true",
      order: 3,
      categories: ["General"],
    },

    // ENROLLMENT
    {
      question: "How do I enroll at BachelorCamp?",
      slug: "how-do-i-enroll-at-bachelorcamp",
      answer:
        "You can enroll by filling out our online application form, visiting our campus in Kediri, or contacting our admissions team directly. We'll guide you through the placement test and help you choose the right program.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtdGV4dC1pY29uIGx1Y2lkZS1maWxlLXRleHQiPjxwYXRoIGQ9Ik0xNSAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWN1oiLz48cGF0aCBkPSJNMTQgMnY0YTIgMiAwIDAgMCAyIDJoNCIvPjxwYXRoIGQ9Ik0xMCA5SDgiLz48cGF0aCBkPSJNMTYgMTNIOCIvPjxwYXRoIGQ9Ik0xNiAxN0g4Ii8+PC9zdmc+",
      isActive: "true",
      order: 4,
      categories: ["Enrollment & Admission", "General"],
    },
    {
      question: "Do I need to take a placement test?",
      slug: "do-i-need-to-take-a-placement-test",
      answer:
        "Yes, new students are usually required to take a placement test so we can match you with the course that best suits your current level.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsaXBib2FyZC1jaGVjay1pY29uIGx1Y2lkZS1jbGlwYm9hcmQtY2hlY2siPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjQiIHg9IjgiIHk9IjIiIHJ4PSIxIiByeT0iMSIvPjxwYXRoIGQ9Ik0xNiA0aDJhMiAyIDAgMCAxIDIgMnYxNGEyIDIgMCAwIDEtMiAySDZhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTJoMiIvPjxwYXRoIGQ9Im05IDE0IDIgMiA0LTQiLz48L3N2Zz4=",
      isActive: "true",
      order: 5,
      categories: ["Enrollment & Admission", "Courses"],
    },

    // COURSES
    {
      question: "Does BachelorCamp offer online courses?",
      slug: "does-bachelorcamp-offer-online-courses",
      answer:
        "Yes, we offer both in-person and online courses. Our online programs are delivered through our interactive learning platform, with live sessions and self-paced study materials.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxhcHRvcC1taW5pbWFsLWNoZWNrLWljb24gbHVjaWRlLWxhcHRvcC1taW5pbWFsLWNoZWNrIj48cGF0aCBkPSJNMiAyMGgyMCIvPjxwYXRoIGQ9Im05IDEwIDIgMiA0LTQiLz48cmVjdCB4PSIzIiB5PSI0IiB3aWR0aD0iMTgiIGhlaWdodD0iMTIiIHJ4PSIyIi8+PC9zdmc+",
      isActive: "true",
      order: 6,
      categories: ["Courses"],
    },
    {
      question: "What if my course requires accommodation?",
      slug: "what-if-my-course-requires-accommodation",
      answer:
        "If your selected course requires in-person attendance, the system will automatically check if you already have valid accommodation for the course dates. If not, you will need to reserve accommodation before completing enrollment.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdXNlLXBsdXMtaWNvbiBsdWNpZGUtaG91c2UtcGx1cyI+PHBhdGggZD0iTTEyLjM1IDIxSDVhMiAyIDAgMCAxLTItMnYtOWEyIDIgMCAwIDEgLjcxLTEuNTNsNy02YTIgMiAwIDAgMSAyLjU4IDBsNyA2QTIgMiAwIDAgMSAyMSAxMHYyLjM1Ii8+PHBhdGggZD0iTTE0LjggMTIuNEExIDEgMCAwIDAgMTQgMTJoLTRhMSAxIDAgMCAwLTEgMXY4Ii8+PHBhdGggZD0iTTE1IDE4aDYiLz48cGF0aCBkPSJNMTggMTV2NiIvPjwvc3ZnPg==",
      isActive: "true",
      order: 7,
      categories: ["Courses", "Accommodation"],
    },

    // ACCOMMODATION
    {
      question: "What types of accommodation are available?",
      slug: "what-types-of-accommodation-are-available",
      answer:
        "We provide several room types, including single rooms, shared rooms, and premium options. Each room includes basic amenities such as Wi-Fi, study desk, and housekeeping.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJlZC1kb3VibGUtaWNvbiBsdWNpZGUtYmVkLWRvdWJsZSI+PHBhdGggZD0iTTIgMjB2LThhMiAyIDAgMCAxIDItMmgxNmEyIDIgMCAwIDEgMiAydjgiLz48cGF0aCBkPSJNNCAxMFY2YTIgMiAwIDAgMSAyLTJoMTJhMiAyIDAgMCAxIDIgMnY0Ii8+PHBhdGggZD0iTTEyIDR2NiIvPjxwYXRoIGQ9Ik0yIDE4aDIwIi8+PC9zdmc+",
      isActive: "true",
      order: 8,
      categories: ["Accommodation"],
    },
    {
      question: "How do I reserve accommodation?",
      slug: "how-do-i-reserve-accommodation",
      answer:
        "You can browse available rooms, select your preferred type, and submit a reservation request with your intended dates. An admin will review and confirm your reservation before payment.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLXNlYXJjaC1pY29uIGx1Y2lkZS1jYWxlbmRhci1zZWFyY2giPjxwYXRoIGQ9Ik0xNiAydjQiLz48cGF0aCBkPSJNMjEgMTEuNzVWNmEyIDIgMCAwIDAtMi0ySDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDcuMjUiLz48cGF0aCBkPSJtMjIgMjItMS44NzUtMS44NzUiLz48cGF0aCBkPSJNMyAxMGgxOCIvPjxwYXRoIGQ9Ik04IDJ2NCIvPjxjaXJjbGUgY3g9IjE4IiBjeT0iMTgiIHI9IjMiLz48L3N2Zz4=",
      isActive: "true",
      order: 9,
      categories: ["Accommodation"],
    },
    {
      question: "Can I stay without joining a course?",
      slug: "can-i-stay-without-joining-a-course",
      answer:
        "Yes, you can rent a room even if you are not enrolled in a course. Accommodation is open to both students and non-students, subject to availability.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItaWNvbiBsdWNpZGUtdXNlciI+PHBhdGggZD0iTTE5IDIxdi0yYTQgNCAwIDAgMC00LTRIOWE0IDQgMCAwIDAtNCA0djIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48L3N2Zz4=",
      isActive: "true",
      order: 10,
      categories: ["Accommodation", "General"],
    },

    // BUNDLES
    {
      question: "What are bundles at BachelorCamp?",
      slug: "what-are-bundles-at-bachelorcamp",
      answer:
        "Bundles combine course registration and accommodation rental into one package at a discounted rate. They provide convenience and savings for students who plan to study and stay with us.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBhY2thZ2UtaWNvbiBsdWNpZGUtcGFja2FnZSI+PHBhdGggZD0iTTExIDIxLjczYTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzN6Ii8+PHBhdGggZD0iTTEyIDIyVjEyIi8+PHBvbHlsaW5lIHBvaW50cz0iMy4yOSA3IDEyIDEyIDIwLjcxIDciLz48cGF0aCBkPSJtNy41IDQuMjcgOSA1LjE1Ii8+PC9zdmc+",
      isActive: "true",
      order: 11,
      categories: ["Bundles", "Courses", "Accommodation"],
    },
    {
      question: "What if my bundle choice is unavailable?",
      slug: "what-if-my-bundle-choice-is-unavailable",
      answer:
        "If your selected bundle is unavailable (e.g., room fully booked), the system will suggest alternatives such as a different room, course date, or converting the bundle into separate course + accommodation items while retaining eligible discounts.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRyaWFuZ2xlLWFsZXJ0LWljb24gbHVjaWRlLXRyaWFuZ2xlLWFsZXJ0Ij48cGF0aCBkPSJtMjEuNzMgMTgtOC0xNGEyIDIgMCAwIDAtMy40OCAwbC04IDE0QTIgMiAwIDAgMCA0IDIxaDE2YTIgMiAwIDAgMCAxLjczLTMiLz48cGF0aCBkPSJNMTIgOXY0Ii8+PHBhdGggZD0iTTEyIDE3aC4wMSIvPjwvc3ZnPg==",
      isActive: "true",
      order: 12,
      categories: ["Bundles"],
    },

    // PAYMENTS
    {
      question: "How can I pay for my course or accommodation?",
      slug: "how-can-i-pay-for-my-course-or-accommodation",
      answer:
        "We accept various payment methods, including bank transfer, credit/debit card, and online payment gateways. Payment details will be provided once your reservation or registration is confirmed.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNyZWRpdC1jYXJkLWljb24gbHVjaWRlLWNyZWRpdC1jYXJkIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjUiIHJ4PSIyIi8+PGxpbmUgeDE9IjIiIHgyPSIyMiIgeTE9IjEwIiB5Mj0iMTAiLz48L3N2Zz4=",
      isActive: "true",
      order: 13,
      categories: ["Payments & Pricing"],
    },
    {
      question: "Are there discounts for long-term stays?",
      slug: "are-there-discounts-for-long-term-stays",
      answer:
        "Yes, we offer special rates for monthly or long-term rentals. Shorter stays are calculated on a daily rate, but admin may approve custom discounts for mid-range durations (e.g., 20 days).",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJhZGdlLXBlcmNlbnQtaWNvbiBsdWNpZGUtYmFkZ2UtcGVyY2VudCI+PHBhdGggZD0iTTMuODUgOC42MmE0IDQgMCAwIDEgNC43OC00Ljc3IDQgNCAwIDAgMSA2Ljc0IDAgNCA0IDAgMCAxIDQuNzggNC43OCA0IDQgMCAwIDEgMCA2Ljc0IDQgNCAwIDAgMS00Ljc3IDQuNzggNCA0IDAgMCAxLTYuNzUgMCA0IDQgMCAwIDEtNC43OC00Ljc3IDQgNCAwIDAgMSAwLTYuNzZaIi8+PHBhdGggZD0ibTE1IDktNiA2Ii8+PHBhdGggZD0iTTkgOWguMDEiLz48cGF0aCBkPSJNMTUgMTVoLjAxIi8+PC9zdmc+",
      isActive: "true",
      order: 14,
      categories: ["Payments & Pricing", "Accommodation"],
    },
  ];

  // --- 3. Insert Faqs + Relations ---
  for (const t of faqData) {
    const [inserted] = await db
      .insert(faqs)
      .values({
        id: uuidv4(),
        question: t.question,
        slug: t.slug,
        answer: t.answer,
        iconUrl: t.iconUrl,
        isActive: t.isActive as BooleanType,
        order: t.order,
      })
      .returning();

    const relations = t.categories.map((cat) => {
      const categoryId = catMap[cat];
      if (!categoryId) {
        throw new Error(
          `❌ Category "${cat}" not found in faqCategories. Please check your faqData.`
        );
      }
      return {
        id: uuidv4(),
        faqId: inserted.id,
        categoryId: categoryId,
      };
    });

    await db.insert(faqCategoryRelations).values(relations);
  }
  console.log("✅ FAQ seeding completed successfully");
};
