// db/seeds/highlights.seed.ts
import { db } from "..";
import { v4 as uuidv4 } from "uuid";
import { highlights } from "../schema/marketing/highlights";

export const seedHighlights = async () => {
  console.log("🌱 Seeding highlights...");

  // Optional: Clear existing data
  await db.delete(highlights);

  type HighlightInsert = typeof highlights.$inferInsert;

  const highlightData: HighlightInsert[] = [
    {
      title: "Expert Native Instructors",
      slug: "expert-native-instructors",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXJzLWljb24gbHVjaWRlLXVzZXJzIj48cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIvPjxwYXRoIGQ9Ik0xNiAzLjEyOGE0IDQgMCAwIDEgMCA3Ljc0NCIvPjxwYXRoIGQ9Ik0yMiAyMXYtMmE0IDQgMCAwIDAtMy0zLjg3Ii8+PGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiLz48L3N2Zz4=",

      features: [
        {
          text: "TESOL Certified",
        },
        {
          text: "Native Speakers",
        },
        {
          text: "10+ Year Experience",
        },
        {
          text: "Personalized Approach",
        },
      ],
      isActive: "true",
      subtitle: "Learn from certified teachers with years of experience.",
      order: 1,
    },
    {
      title: "Proven Results",
      slug: "proven-results",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvb2stb3Blbi1pY29uIGx1Y2lkZS1ib29rLW9wZW4iPjxwYXRoIGQ9Ik0xMiA3djE0Ii8+PHBhdGggZD0iTTMgMThhMSAxIDAgMCAxLTEtMVY0YTEgMSAwIDAgMSAxLTFoNWE0IDQgMCAwIDEgNCA0IDQgNCAwIDAgMSA0LTRoNWExIDEgMCAwIDEgMSAxdjEzYTEgMSAwIDAgMS0xIDFoLTZhMyAzIDAgMCAwLTMgMyAzIDMgMCAwIDAtMy0zeiIvPjwvc3ZnPg==",

      features: [
        {
          text: "95% Success Rate",
        },
        {
          text: "Fast Progress",
        },
        {
          text: "Career Advancement",
        },
        {
          text: "University Admission",
        },
      ],
      isActive: "true",
      subtitle:
        "95% of our IELTS students achieve their target scores within 8 weeks of intensive preparation.",
      order: 2,
    },
    {
      title: "Immersive Environment",
      slug: "immersive-environment",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdsb2JlLWljb24gbHVjaWRlLWdsb2JlIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMiAyYTE0LjUgMTQuNSAwIDAgMCAwIDIwIDE0LjUgMTQuNSAwIDAgMCAwLTIwIi8+PHBhdGggZD0iTTIgMTJoMjAiLz48L3N2Zz4=",

      features: [
        {
          text: "15+ Countries",
        },
        {
          text: "English Only",
        },
      ],
      isActive: "true",
      subtitle:
        "English-only campus environment with international students from 15+ countries.",
      order: 3,
    },
    {
      title: "Personal Attention",
      slug: "personal-attention",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhlYXJ0LWljb24gbHVjaWRlLWhlYXJ0Ij48cGF0aCBkPSJNMiA5LjVhNS41IDUuNSAwIDAgMSA5LjU5MS0zLjY3Ni41Ni41NiAwIDAgMCAuODE4IDBBNS40OSA1LjQ5IDAgMCAxIDIyIDkuNWMwIDIuMjktMS41IDQtMyA1LjVsLTUuNDkyIDUuMzEzYTIgMiAwIDAgMS0zIC4wMTlMNSAxNWMtMS41LTEuNS0zLTMuMi0zLTUuNSIvPjwvc3ZnPg==",

      features: [
        {
          text: "Max 12 Students",
        },
        {
          text: "1:1 Support",
        },
      ],
      isActive: "true",
      subtitle:
        "Maximum 12 students per class ensures personalized feedback and rapid improvement.",
      order: 4,
    },
    {
      title: "Flexible Options",
      slug: "flexible-options",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhdmVzLWljb24gbHVjaWRlLXdhdmVzIj48cGF0aCBkPSJNMiA2Yy42LjUgMS4yIDEgMi41IDFDNyA3IDcgNSA5LjUgNWMyLjYgMCAyLjQgMiA1IDIgMi41IDAgMi41LTIgNS0yIDEuMyAwIDEuOS41IDIuNSAxIi8+PHBhdGggZD0iTTIgMTJjLjYuNSAxLjIgMSAyLjUgMSAyLjUgMCAyLjUtMiA1LTIgMi42IDAgMi40IDIgNSAyIDIuNSAwIDIuNS0yIDUtMiAxLjMgMCAxLjkuNSAyLjUgMSIvPjxwYXRoIGQ9Ik0yIDE4Yy42LjUgMS4yIDEgMi41IDEgMi41IDAgMi41LTIgNS0yIDIuNiAwIDIuNCAyIDUgMiAyLjUgMCAyLjUtMiA1LTIgMS4zIDAgMS45LjUgMi41IDEiLz48L3N2Zz4=",

      features: [
        {
          text: "Multiple Formats",
        },
        {
          text: "Your Schedule",
        },
      ],
      isActive: "false",
      subtitle:
        "Choose from intensive camps, part-time courses, or online programs to fit your schedule.",
      order: 0,
    },
    {
      title: "Official Certification",
      slug: "official-certification",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1jaGVjay1iaWctaWNvbiBsdWNpZGUtY2lyY2xlLWNoZWNrLWJpZyI+PHBhdGggZD0iTTIxLjgwMSAxMEExMCAxMCAwIDEgMSAxNyAzLjMzNSIvPjxwYXRoIGQ9Im05IDExIDMgM0wyMiA0Ii8+PC9zdmc+",

      features: [
        {
          text: "CEFR Certified",
        },
        {
          text: "Career Support",
        },
      ],
      isActive: "false",
      subtitle:
        "Internationally recognized certificates and lifetime career support for our graduates.",
      order: 0,
    },
    {
      title: "Modern Facilities",
      slug: "modern-facilities",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhc3RsZS1pY29uIGx1Y2lkZS1jYXN0bGUiPjxwYXRoIGQ9Ik0xMCA1VjMiLz48cGF0aCBkPSJNMTQgNVYzIi8+PHBhdGggZD0iTTE1IDIxdi0zYTMgMyAwIDAgMC02IDB2MyIvPjxwYXRoIGQ9Ik0xOCAzdjgiLz48cGF0aCBkPSJNMTggNUg2Ii8+PHBhdGggZD0iTTIyIDExSDIiLz48cGF0aCBkPSJNMjIgOXYxMGEyIDIgMCAwIDEtMiAySDRhMiAyIDAgMCAxLTItMlY5Ii8+PHBhdGggZD0iTTYgM3Y4Ii8+PC9zdmc+",
      features: [{ text: "Smart Classrooms" }, { text: "Digital Labs" }],
      isActive: "false",
      subtitle:
        "State-of-the-art campus equipped with the latest technology for interactive learning.",
      order: 0,
    },
    {
      title: "Global Community",
      slug: "global-community",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhhbmRzaGFrZS1pY29uIGx1Y2lkZS1oYW5kc2hha2UiPjxwYXRoIGQ9Im0xMSAxNyAyIDJhMSAxIDAgMSAwIDMtMyIvPjxwYXRoIGQ9Im0xNCAxNCAyLjUgMi41YTEgMSAwIDEgMCAzLTNsLTMuODgtMy44OGEzIDMgMCAwIDAtNC4yNCAwbC0uODguODhhMSAxIDAgMSAxLTMtM2wyLjgxLTIuODFhNS43OSA1Ljc5IDAgMCAxIDcuMDYtLjg3bC40Ny4yOGEyIDIgMCAwIDAgMS40Mi4yNUwyMSA0Ii8+PHBhdGggZD0ibTIxIDMgMSAxMWgtMiIvPjxwYXRoIGQ9Ik0zIDMgMiAxNGw2LjUgNi41YTEgMSAwIDEgMCAzLTMiLz48cGF0aCBkPSJNMyA0aDgiLz48L3N2Zz4=",
      features: [{ text: "30+ Nationalities" }, { text: "Cultural Exchange" }],
      isActive: "false",
      subtitle:
        "Join a global network of learners, making friends and connections worldwide.",
      order: 0,
    },
    {
      title: "Career Focused",
      slug: "career-focused",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyaWVmY2FzZS1idXNpbmVzcy1pY29uIGx1Y2lkZS1icmllZmNhc2UtYnVzaW5lc3MiPjxwYXRoIGQ9Ik0xMiAxMmguMDEiLz48cGF0aCBkPSJNMTYgNlY0YTIgMiAwIDAgMC0yLTJoLTRhMiAyIDAgMCAwLTIgMnYyIi8+PHBhdGggZD0iTTIyIDEzYTE4LjE1IDE4LjE1IDAgMCAxLTIwIDAiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjYiIHJ4PSIyIi8+PC9zdmc+",
      features: [{ text: "Job Placement" }, { text: "Internship Programs" }],
      isActive: "false",
      subtitle:
        "Dedicated career services to help you apply your language skills in real-world settings.",
      order: 0,
    },
    {
      title: "Affordable Pricing",
      slug: "affordable-pricing",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhbGxldC1pY29uIGx1Y2lkZS13YWxsZXQiPjxwYXRoIGQ9Ik0xOSA3VjRhMSAxIDAgMCAwLTEtMUg1YTIgMiAwIDAgMCAwIDRoMTVhMSAxIDAgMCAxIDEgMXY0aC0zYTIgMiAwIDAgMCAwIDRoM2ExIDEgMCAwIDAgMS0xdi0yYTEgMSAwIDAgMC0xLTEiLz48cGF0aCBkPSJNMyA1djE0YTIgMiAwIDAgMCAyIDJoMTVhMSAxIDAgMCAwIDEtMXYtNCIvPjwvc3ZnPg==",
      features: [{ text: "Scholarships" }, { text: "Flexible Payments" }],
      isActive: "false",
      subtitle:
        "High-quality education at accessible prices with various scholarship opportunities.",
      order: 0,
    },
    {
      title: "Interactive Learning",
      slug: "interactive-learning",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdhbWVwYWQyLWljb24gbHVjaWRlLWdhbWVwYWQtMiI+PGxpbmUgeDE9IjYiIHgyPSIxMCIgeTE9IjExIiB5Mj0iMTEiLz48bGluZSB4MT0iOCIgeDI9IjgiIHkxPSI5IiB5Mj0iMTMiLz48bGluZSB4MT0iMTUiIHgyPSIxNS4wMSIgeTE9IjEyIiB5Mj0iMTIiLz48bGluZSB4MT0iMTgiIHgyPSIxOC4wMSIgeTE9IjEwIiB5Mj0iMTAiLz48cGF0aCBkPSJNMTcuMzIgNUg2LjY4YTQgNCAwIDAgMC0zLjk3OCAzLjU5Yy0uMDA2LjA1Mi0uMDEuMTAxLS4wMTcuMTUyQzIuNjA0IDkuNDE2IDIgMTQuNDU2IDIgMTZhMyAzIDAgMCAwIDMgM2MxIDAgMS41LS41IDItMWwxLjQxNC0xLjQxNEEyIDIgMCAwIDEgOS44MjggMTZoNC4zNDRhMiAyIDAgMCAxIDEuNDE0LjU4NkwxNyAxOGMuNS41IDEgMSAyIDFhMyAzIDAgMCAwIDMtM2MwLTEuNTQ1LS42MDQtNi41ODQtLjY4NS03LjI1OC0uMDA3LS4wNS0uMDExLS4xLS4wMTctLjE1MUE0IDQgMCAwIDAgMTcuMzIgNXoiLz48L3N2Zz4=",
      features: [{ text: "Gamified Lessons" }, { text: "Engaging Activities" }],
      isActive: "false",
      subtitle:
        "Learning made fun with interactive activities, simulations, and role plays.",
      order: 0,
    },
    {
      title: "24/7 Support",
      slug: "24-7-support",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhlYWRzZXQtaWNvbiBsdWNpZGUtaGVhZHNldCI+PHBhdGggZD0iTTMgMTFoM2EyIDIgMCAwIDEgMiAydjNhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ2LTVabTAgMGE5IDkgMCAxIDEgMTggMG0wIDB2NWEyIDIgMCAwIDEtMiAyaC0xYTIgMiAwIDAgMS0yLTJ2LTNhMiAyIDAgMCAxIDItMmgzWiIvPjxwYXRoIGQ9Ik0yMSAxNnYyYTQgNCAwIDAgMS00IDRoLTUiLz48L3N2Zz4=",
      features: [
        { text: "Round-the-clock Help" },
        { text: "Dedicated Mentors" },
      ],
      isActive: "false",
      subtitle:
        "Get assistance anytime, from academic questions to personal guidance.",
      order: 0,
    },
    {
      title: "Technology Integrated",
      slug: "technology-integrated",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNwdS1pY29uIGx1Y2lkZS1jcHUiPjxwYXRoIGQ9Ik0xMiAyMHYyIi8+PHBhdGggZD0iTTEyIDJ2MiIvPjxwYXRoIGQ9Ik0xNyAyMHYyIi8+PHBhdGggZD0iTTE3IDJ2MiIvPjxwYXRoIGQ9Ik0yIDEyaDIiLz48cGF0aCBkPSJNMiAxN2gyIi8+PHBhdGggZD0iTTIgN2gyIi8+PHBhdGggZD0iTTIwIDEyaDIiLz48cGF0aCBkPSJNMjAgMTdoMiIvPjxwYXRoIGQ9Ik0yMCA3aDIiLz48cGF0aCBkPSJNNyAyMHYyIi8+PHBhdGggZD0iTTcgMnYyIi8+PHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIvPjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHJ4PSIxIi8+PC9zdmc+",
      features: [{ text: "AI Tutors" }, { text: "Mobile Learning" }],
      isActive: "false",
      subtitle:
        "Cutting-edge tech with AI-powered practice and mobile apps for continuous learning.",
      order: 0,
    },
    {
      title: "Cultural Immersion",
      slug: "cultural-immersion",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBhbGV0dGUtaWNvbiBsdWNpZGUtcGFsZXR0ZSI+PHBhdGggZD0iTTEyIDIyYTEgMSAwIDAgMSAwLTIwIDEwIDkgMCAwIDEgMTAgOSA1IDUgMCAwIDEtNSA1aC0yLjI1YTEuNzUgMS43NSAwIDAgMC0xLjQgMi44bC4zLjRhMS43NSAxLjc1IDAgMCAxLTEuNCAyLjh6Ii8+PGNpcmNsZSBjeD0iMTMuNSIgY3k9IjYuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxjaXJjbGUgY3g9IjE3LjUiIGN5PSIxMC41IiByPSIuNSIgZmlsbD0iY3VycmVudENvbG9yIi8+PGNpcmNsZSBjeD0iNi41IiBjeT0iMTIuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjcuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==",
      features: [{ text: "Local Trips" }, { text: "Cultural Workshops" }],
      isActive: "false",
      subtitle:
        "Beyond classrooms: cultural activities, local tours, and events to deepen learning.",
      order: 0,
    },
    {
      title: "Fast-Track Courses",
      slug: "fast-track-courses",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXphcC1pY29uIGx1Y2lkZS16YXAiPjxwYXRoIGQ9Ik00IDE0YTEgMSAwIDAgMS0uNzgtMS42M2w5LjktMTAuMmEuNS41IDAgMCAxIC44Ni40NmwtMS45MiA2LjAyQTEgMSAwIDAgMCAxMyAxMGg3YTEgMSAwIDAgMSAuNzggMS42M2wtOS45IDEwLjJhLjUuNSAwIDAgMS0uODYtLjQ2bDEuOTItNi4wMkExIDEgMCAwIDAgMTEgMTR6Ii8+PC9zdmc+",
      features: [
        { text: "Accelerated Learning" },
        { text: "Intensive Tracks" },
      ],
      isActive: "false",
      subtitle:
        "Special intensive courses for learners who need to achieve fluency quickly.",
      order: 0,
    },
    {
      title: "Trusted Worldwide",
      slug: "trusted-worldwide",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWF3YXJkLWljb24gbHVjaWRlLWF3YXJkIj48cGF0aCBkPSJtMTUuNDc3IDEyLjg5IDEuNTE1IDguNTI2YS41LjUgMCAwIDEtLjgxLjQ3bC0zLjU4LTIuNjg3YTEgMSAwIDAgMC0xLjE5NyAwbC0zLjU4NiAyLjY4NmEuNS41IDAgMCAxLS44MS0uNDY5bDEuNTE0LTguNTI2Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI2Ii8+PC9zdmc+",
      features: [{ text: "10,000+ Alumni" }, { text: "Global Recognition" }],
      isActive: "false",
      subtitle:
        "Recognized by universities and employers worldwide for language excellence.",
      order: 0,
    },
  ];

  const [inserted] = await db
    .insert(highlights)
    .values(highlightData)
    .returning();
};
