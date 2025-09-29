// db/seeds/pillars.seed.ts
import { db } from "..";
import { pillars } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { BooleanType, PageType } from "../schema/enums";

export const seedPillars = async () => {
  console.log("🌱 Seeding pillars...");

  // Optional: Clear existing data
  await db.delete(pillars);

  type PillarInsert = typeof pillars.$inferInsert;

  const data: PillarInsert[] = [
    // HOME pillars
    {
      id: uuidv4(),
      title: "Camp Programs",
      slug: "camp-programs",
      subtitle:
        "Immersive learning environments with comfortable accommodations and structured daily activities.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdXNlLWljb24gbHVjaWRlLWhvdXNlIj48cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiLz48cGF0aCBkPSJNMyAxMGEyIDIgMCAwIDEgLjcwOS0xLjUyOGw3LTZhMiAyIDAgMCAxIDIuNTgyIDBsNyA2QTIgMiAwIDAgMSAyMSAxMHY5YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yeiIvPjwvc3ZnPg==",
      imageUrl:
        "https://images.unsplash.com/photo-1756547275349-7c7d668f3ce3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ctaText: "Learn More",
      ctaLink: "/camps",
      order: 1,
      features: [
        {
          text: "Comfortable Accommodation",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJlZC1kb3VibGUtaWNvbiBsdWNpZGUtYmVkLWRvdWJsZSI+PHBhdGggZD0iTTIgMjB2LThhMiAyIDAgMCAxIDItMmgxNmEyIDIgMCAwIDEgMiAydjgiLz48cGF0aCBkPSJNNCAxMFY2YTIgMiAwIDAgMSAyLTJoMTJhMiAyIDAgMCAxIDIgMnY0Ii8+PHBhdGggZD0iTTEyIDR2NiIvPjxwYXRoIGQ9Ik0yIDE4aDIwIi8+PC9zdmc+",
        },
        {
          text: "Structured Daily Activities",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWNoZWNrMi1pY29uIGx1Y2lkZS1jYWxlbmRhci1jaGVjay0yIj48cGF0aCBkPSJNOCAydjQiLz48cGF0aCBkPSJNMTYgMnY0Ii8+PHBhdGggZD0iTTIxIDE0VjZhMiAyIDAgMCAwLTItMkg1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmg4Ii8+PHBhdGggZD0iTTMgMTBoMTgiLz48cGF0aCBkPSJtMTYgMjAgMiAyIDQtNCIvPjwvc3ZnPg==",
        },
        {
          text: "Cultural Excursions",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWVhcnRoLWljb24gbHVjaWRlLWVhcnRoIj48cGF0aCBkPSJNMjEuNTQgMTVIMTdhMiAyIDAgMCAwLTIgMnY0LjU0Ii8+PHBhdGggZD0iTTcgMy4zNFY1YTMgMyAwIDAgMCAzIDNhMiAyIDAgMCAxIDIgMmMwIDEuMS45IDIgMiAyYTIgMiAwIDAgMCAyLTJjMC0xLjEuOS0yIDItMmgzLjE3Ii8+PHBhdGggZD0iTTExIDIxLjk1VjE4YTIgMiAwIDAgMC0yLTJhMiAyIDAgMCAxLTItMnYtMWEyIDIgMCAwIDAtMi0ySDIuMDUiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjwvc3ZnPg==",
        },
      ],
      badgeText: "",
      isActive: "true",
    },
    {
      id: uuidv4(),
      title: "Specialized Courses",
      slug: "specialized-courses",
      subtitle:
        "Targeted programs for specific English needs including IELTS prep and business English.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvb2stb3Blbi10ZXh0LWljb24gbHVjaWRlLWJvb2stb3Blbi10ZXh0Ij48cGF0aCBkPSJNMTIgN3YxNCIvPjxwYXRoIGQ9Ik0xNiAxMmgyIi8+PHBhdGggZD0iTTE2IDhoMiIvPjxwYXRoIGQ9Ik0zIDE4YTEgMSAwIDAgMS0xLTFWNGExIDEgMCAwIDEgMS0xaDVhNCA0IDAgMCAxIDQgNCA0IDQgMCAwIDEgNC00aDVhMSAxIDAgMCAxIDEgMXYxM2ExIDEgMCAwIDEtMSAxaC02YTMgMyAwIDAgMC0zIDMgMyAzIDAgMCAwLTMtM3oiLz48cGF0aCBkPSJNNiAxMmgyIi8+PHBhdGggZD0iTTYgOGgyIi8+PC9zdmc+",
      imageUrl:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ctaText: "Explore Courses",
      ctaLink: "/special-programs",
      order: 2,
      features: [
        {
          text: "IELTS Preparation",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBlbi10b29sLWljb24gbHVjaWRlLXBlbi10b29sIj48cGF0aCBkPSJNMTUuNzA3IDIxLjI5M2ExIDEgMCAwIDEtMS40MTQgMGwtMS41ODYtMS41ODZhMSAxIDAgMCAxIDAtMS40MTRsNS41ODYtNS41ODZhMSAxIDAgMCAxIDEuNDE0IDBsMS41ODYgMS41ODZhMSAxIDAgMCAxIDAgMS40MTR6Ii8+PHBhdGggZD0ibTE4IDEzLTEuMzc1LTYuODc0YTEgMSAwIDAgMC0uNzQ2LS43NzZMMy4yMzUgMi4wMjhhMSAxIDAgMCAwLTEuMjA3IDEuMjA3TDUuMzUgMTUuODc5YTEgMSAwIDAgMCAuNzc2Ljc0NkwxMyAxOCIvPjxwYXRoIGQ9Im0yLjMgMi4zIDcuMjg2IDcuMjg2Ii8+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMiIvPjwvc3ZnPg==",
        },
        {
          text: "Business English",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyaWVmY2FzZS1idXNpbmVzcy1pY29uIGx1Y2lkZS1icmllZmNhc2UtYnVzaW5lc3MiPjxwYXRoIGQ9Ik0xMiAxMmguMDEiLz48cGF0aCBkPSJNMTYgNlY0YTIgMiAwIDAgMC0yLTJoLTRhMiAyIDAgMCAwLTIgMnYyIi8+PHBhdGggZD0iTTIyIDEzYTE4LjE1IDE4LjE1IDAgMCAxLTIwIDAiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjYiIHJ4PSIyIi8+PC9zdmc+",
        },
        {
          text: "CEFR Level Certification",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNoaWVsZC1jaGVjay1pY29uIGx1Y2lkZS1zaGllbGQtY2hlY2siPjxwYXRoIGQ9Ik0yMCAxM2MwIDUtMy41IDcuNS03LjY2IDguOTVhMSAxIDAgMCAxLS42Ny0uMDFDNy41IDIwLjUgNCAxOCA0IDEzVjZhMSAxIDAgMCAxIDEtMWMyIDAgNC41LTEuMiA2LjI0LTIuNzJhMS4xNyAxLjE3IDAgMCAxIDEuNTIgMEMxNC41MSAzLjgxIDE3IDUgMTkgNWExIDEgMCAwIDEgMSAxeiIvPjxwYXRoIGQ9Im05IDEyIDIgMiA0LTQiLz48L3N2Zz4=",
        },
      ],
      badgeText: "",
      isActive: "true",
    },
    {
      id: uuidv4(),
      title: "Testing & Assessment",
      slug: "testing-assessment",
      subtitle:
        "Comprehensive evaluation systems to track progress and certify language proficiency.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtY2hlY2syLWljb24gbHVjaWRlLWZpbGUtY2hlY2stMiI+PHBhdGggZD0iTTQgMjJoMTRhMiAyIDAgMCAwIDItMlY3bC01LTVINmEyIDIgMCAwIDAtMiAydjQiLz48cGF0aCBkPSJNMTQgMnY0YTIgMiAwIDAgMCAyIDJoNCIvPjxwYXRoIGQ9Im0zIDE1IDIgMiA0LTQiLz48L3N2Zz4=",
      imageUrl:
        "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ctaText: "View Testing",
      ctaLink: "/tests",
      order: 3,
      features: [
        {
          text: "Progress Tracking",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoYXJ0LW5vLWF4ZXMtY29tYmluZWQtaWNvbiBsdWNpZGUtY2hhcnQtbm8tYXhlcy1jb21iaW5lZCI+PHBhdGggZD0iTTEyIDE2djUiLz48cGF0aCBkPSJNMTYgMTR2NyIvPjxwYXRoIGQ9Ik0yMCAxMHYxMSIvPjxwYXRoIGQ9Im0yMiAzLTguNjQ2IDguNjQ2YS41LjUgMCAwIDEtLjcwOCAwTDkuMzU0IDguMzU0YS41LjUgMCAwIDAtLjcwNyAwTDIgMTUiLz48cGF0aCBkPSJNNCAxOHYzIi8+PHBhdGggZD0iTTggMTR2NyIvPjwvc3ZnPg==",
        },
        {
          text: "Official Certification",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWF3YXJkLWljb24gbHVjaWRlLWF3YXJkIj48cGF0aCBkPSJtMTUuNDc3IDEyLjg5IDEuNTE1IDguNTI2YS41LjUgMCAwIDEtLjgxLjQ3bC0zLjU4LTIuNjg3YTEgMSAwIDAgMC0xLjE5NyAwbC0zLjU4NiAyLjY4NmEuNS41IDAgMCAxLS44MS0uNDY5bDEuNTE0LTguNTI2Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI2Ii8+PC9zdmc+",
        },
        {
          text: "Personalized Feedback",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvdC1tZXNzYWdlLXNxdWFyZS1pY29uIGx1Y2lkZS1ib3QtbWVzc2FnZS1zcXVhcmUiPjxwYXRoIGQ9Ik0xMiA2VjJIOCIvPjxwYXRoIGQ9Ik0xNSAxMXYyIi8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Ik0yMCAxMmgyIi8+PHBhdGggZD0iTTIwIDE2YTIgMiAwIDAgMS0yIDJIOC44MjhhMiAyIDAgMCAwLTEuNDE0LjU4NmwtMi4yMDIgMi4yMDJBLjcxLjcxIDAgMCAxIDQgMjAuMjg2VjhhMiAyIDAgMCAxIDItMmgxMmEyIDIgMCAwIDEgMiAyeiIvPjxwYXRoIGQ9Ik05IDExdjIiLz48L3N2Zz4=",
        },
      ],
      badgeText: "",
      isActive: "true",
    },
    {
      id: uuidv4(),
      title: "Online Learning",
      slug: "online-learning",
      subtitle:
        "Flexible digital resources and live virtual classes for remote learners worldwide.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxhcHRvcC1pY29uIGx1Y2lkZS1sYXB0b3AiPjxwYXRoIGQ9Ik0xOCA1YTIgMiAwIDAgMSAyIDJ2OC41MjZhMiAyIDAgMCAwIC4yMTIuODk3bDEuMDY4IDIuMTI3YTEgMSAwIDAgMS0uOSAxLjQ1SDMuNjJhMSAxIDAgMCAxLS45LTEuNDVsMS4wNjgtMi4xMjdBMiAyIDAgMCAwIDQgMTUuNTI2VjdhMiAyIDAgMCAxIDItMnoiLz48cGF0aCBkPSJNMjAuMDU0IDE1Ljk4N0gzLjk0NiIvPjwvc3ZnPg==",
      imageUrl:
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Start Online",
      ctaLink: "/online",
      order: 0,
      features: [
        {
          text: "Live Virtual Classes",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXZpZGVvLWljb24gbHVjaWRlLXZpZGVvIj48cGF0aCBkPSJtMTYgMTMgNS4yMjMgMy40ODJhLjUuNSAwIDAgMCAuNzc3LS40MTZWNy44N2EuNS41IDAgMCAwLS43NTItLjQzMkwxNiAxMC41Ii8+PHJlY3QgeD0iMiIgeT0iNiIgd2lkdGg9IjE0IiBoZWlnaHQ9IjEyIiByeD0iMiIvPjwvc3ZnPg==",
        },
        {
          text: "24/7 Learning Resources",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvb2stbWFya2VkLWljb24gbHVjaWRlLWJvb2stbWFya2VkIj48cGF0aCBkPSJNMTAgMnY4bDMtMyAzIDNWMiIvPjxwYXRoIGQ9Ik00IDE5LjV2LTE1QTIuNSAyLjUgMCAwIDEgNi41IDJIMTlhMSAxIDAgMCAxIDEgMXYxOGExIDEgMCAwIDEtMSAxSDYuNWExIDEgMCAwIDEgMC01SDIwIi8+PC9zdmc+",
        },
        {
          text: "Interactive Quizzes",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1lc3NhZ2UtY2lyY2xlLXF1ZXN0aW9uLW1hcmstaWNvbiBsdWNpZGUtbWVzc2FnZS1jaXJjbGUtcXVlc3Rpb24tbWFyayI+PHBhdGggZD0iTTIuOTkyIDE2LjM0MmEyIDIgMCAwIDEgLjA5NCAxLjE2N2wtMS4wNjUgMy4yOWExIDEgMCAwIDAgMS4yMzYgMS4xNjhsMy40MTMtLjk5OGEyIDIgMCAwIDEgMS4wOTkuMDkyIDEwIDEwIDAgMSAwLTQuNzc3LTQuNzE5Ii8+PHBhdGggZD0iTTkuMDkgOWEzIDMgMCAwIDEgNS44MyAxYzAgMi0zIDMtMyAzIi8+PHBhdGggZD0iTTEyIDE3aC4wMSIvPjwvc3ZnPg==",
        },
      ],
      badgeText: "",
      isActive: "false",
    },
    {
      id: uuidv4(),
      title: "Cultural Exchange",
      slug: "cultural-exchange",
      subtitle:
        "Opportunities to engage with local communities and practice English in real-life contexts.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWVhcnRoLWljb24gbHVjaWRlLWVhcnRoIj48cGF0aCBkPSJNMjEuNTQgMTVIMTdhMiAyIDAgMCAwLTIgMnY0LjU0Ii8+PHBhdGggZD0iTTcgMy4zNFY1YTMgMyAwIDAgMCAzIDNhMiAyIDAgMCAxIDIgMmMwIDEuMS45IDIgMiAyYTIgMiAwIDAgMCAyLTJjMC0xLjEuOS0yIDItMmgzLjE3Ii8+PHBhdGggZD0iTTExIDIxLjk1VjE4YTIgMiAwIDAgMC0yLTJhMiAyIDAgMCAxLTItMnYtMWEyIDIgMCAwIDAtMi0ySDIuMDUiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjwvc3ZnPg==",
      imageUrl:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Join Exchange",
      ctaLink: "/exchange",
      order: 0,
      features: [
        {
          text: "Community Engagement",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhlYXJ0LWhhbmRzaGFrZS1pY29uIGx1Y2lkZS1oZWFydC1oYW5kc2hha2UiPjxwYXRoIGQ9Ik0xOS40MTQgMTQuNDE0QzIxIDEyLjgyOCAyMiAxMS41IDIyIDkuNWE1LjUgNS41IDAgMCAwLTkuNTkxLTMuNjc2LjYuNiAwIDAgMS0uODE4LjAwMUE1LjUgNS41IDAgMCAwIDIgOS41YzAgMi4zIDEuNSA0IDMgNS41bDUuNTM1IDUuMzYyYTIgMiAwIDAgMCAyLjg3OS4wNTIgMi4xMiAyLjEyIDAgMCAwLS4wMDQtMyAyLjEyNCAyLjEyNCAwIDEgMCAzLTMgMi4xMjQgMi4xMjQgMCAwIDAgMy4wMDQgMCAyIDIgMCAwIDAgMC0yLjgyOGwtMS44ODEtMS44ODJhMi40MSAyLjQxIDAgMCAwLTMuNDA5IDBsLTEuNzEgMS43MWEyIDIgMCAwIDEtMi44MjggMCAyIDIgMCAwIDEgMC0yLjgyOGwyLjgyMy0yLjc2MiIvPjwvc3ZnPg==",
        },
        {
          text: "Cultural Workshops",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWRyYW1hLWljb24gbHVjaWRlLWRyYW1hIj48cGF0aCBkPSJNMTAgMTFoLjAxIi8+PHBhdGggZD0iTTE0IDZoLjAxIi8+PHBhdGggZD0iTTE4IDZoLjAxIi8+PHBhdGggZD0iTTYuNSAxMy4xaC4wMSIvPjxwYXRoIGQ9Ik0yMiA1YzAgOS00IDEyLTYgMTJzLTYtMy02LTEyYzAtMiAyLTMgNi0zczYgMSA2IDMiLz48cGF0aCBkPSJNMTcuNCA5LjljLS44LjgtMiAuOC0yLjggMCIvPjxwYXRoIGQ9Ik0xMC4xIDcuMUM5IDcuMiA3LjcgNy43IDYgOC42Yy0zLjUgMi00LjcgMy45LTMuNyA1LjYgNC41IDcuOCA5LjUgOC40IDExLjIgNy40LjktLjUgMS45LTIuMSAxLjktNC43Ii8+PHBhdGggZD0iTTkuMSAxNi41Yy4zLTEuMSAxLjQtMS43IDIuNC0xLjQiLz48L3N2Zz4=",
        },
        {
          text: "Language Partner Programs",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXJzLXJvdW5kLWljb24gbHVjaWRlLXVzZXJzLXJvdW5kIj48cGF0aCBkPSJNMTggMjFhOCA4IDAgMCAwLTE2IDAiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjgiIHI9IjUiLz48cGF0aCBkPSJNMjIgMjBjMC0zLjM3LTItNi41LTQtOGE1IDUgMCAwIDAtLjQ1LTguMyIvPjwvc3ZnPg==",
        },
      ],
      badgeText: "",
      isActive: "false",
    },
    {
      id: uuidv4(),
      title: "Teacher Development",
      slug: "teacher-development",
      subtitle:
        "Professional training and workshops for English educators to enhance teaching skills.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNjaG9vbC1pY29uIGx1Y2lkZS1zY2hvb2wiPjxwYXRoIGQ9Ik0xNCAyMXYtM2EyIDIgMCAwIDAtNCAwdjMiLz48cGF0aCBkPSJNMTggNXYxNiIvPjxwYXRoIGQ9Im00IDYgNy4xMDYtMy43OWEyIDIgMCAwIDEgMS43ODggMEwyMCA2Ii8+PHBhdGggZD0ibTYgMTEtMy41MiAyLjE0N2ExIDEgMCAwIDAtLjQ4Ljg1NFYxOWEyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJ2LTVhMSAxIDAgMCAwLS40OC0uODUzTDE4IDExIi8+PHBhdGggZD0iTTYgNXYxNiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iOSIgcj0iMiIvPjwvc3ZnPg==",
      imageUrl:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Train Teachers",
      ctaLink: "/teacher-training",
      order: 0,
      features: [
        {
          text: "Modern Teaching Methods",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvb2stb3Blbi10ZXh0LWljb24gbHVjaWRlLWJvb2stb3Blbi10ZXh0Ij48cGF0aCBkPSJNMTIgN3YxNCIvPjxwYXRoIGQ9Ik0xNiAxMmgyIi8+PHBhdGggZD0iTTE2IDhoMiIvPjxwYXRoIGQ9Ik0zIDE4YTEgMSAwIDAgMS0xLTFWNGExIDEgMCAwIDEgMS0xaDVhNCA0IDAgMCAxIDQgNCA0IDQgMCAwIDEgNC00aDVhMSAxIDAgMCAxIDEgMXYxM2ExIDEgMCAwIDEtMSAxaC02YTMgMyAwIDAgMC0zIDMgMyAzIDAgMCAwLTMtM3oiLz48cGF0aCBkPSJNNiAxMmgyIi8+PHBhdGggZD0iTTYgOGgyIi8+PC9zdmc+",
        },
        {
          text: "Peer Learning",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdyYWR1YXRpb24tY2FwLWljb24gbHVjaWRlLWdyYWR1YXRpb24tY2FwIj48cGF0aCBkPSJNMjEuNDIgMTAuOTIyYTEgMSAwIDAgMC0uMDE5LTEuODM4TDEyLjgzIDUuMThhMiAyIDAgMCAwLTEuNjYgMEwyLjYgOS4wOGExIDEgMCAwIDAgMCAxLjgzMmw4LjU3IDMuOTA4YTIgMiAwIDAgMCAxLjY2IDB6Ii8+PHBhdGggZD0iTTIyIDEwdjYiLz48cGF0aCBkPSJNNiAxMi41VjE2YTYgMyAwIDAgMCAxMiAwdi0zLjUiLz48L3N2Zz4=",
        },
        {
          text: "Certification Programs",
          iconUrl:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1lZGFsLWljb24gbHVjaWRlLW1lZGFsIj48cGF0aCBkPSJNNy4yMSAxNSAyLjY2IDcuMTRhMiAyIDAgMCAxIC4xMy0yLjJMNC40IDIuOEEyIDIgMCAwIDEgNiAyaDEyYTIgMiAwIDAgMSAxLjYuOGwxLjYgMi4xNGEyIDIgMCAwIDEgLjE0IDIuMkwxNi43OSAxNSIvPjxwYXRoIGQ9Ik0xMSAxMiA1LjEyIDIuMiIvPjxwYXRoIGQ9Im0xMyAxMiA1Ljg4LTkuOCIvPjxwYXRoIGQ9Ik04IDdoOCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTciIHI9IjUiLz48cGF0aCBkPSJNMTIgMTh2LTJoLS41Ii8+PC9zdmc+",
        },
      ],
      badgeText: "",
      isActive: "false",
    },
  ];
  // Insert sample pillars
  await db.insert(pillars).values(data);

  console.log("✅ Pillars seeded successfully!");
};
