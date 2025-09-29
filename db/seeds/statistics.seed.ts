// db/seeds/statistics.seed.ts
import { db } from "..";
import { v4 as uuidv4 } from "uuid";
import { statistics } from "../schema/marketing/statistics";

export const seedStatistics = async () => {
  console.log("🌱 Seeding statistics...");

  // Optional: Clear existing data
  await db.delete(statistics);

  type StatisticInsert = typeof statistics.$inferInsert;

  const statisticData: StatisticInsert[] = [
    {
      value: "15,000+",
      label: "Students",
      slug: "students",
      description: null,
      isActive: "true",
      order: 1,
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXJzLWljb24gbHVjaWRlLXVzZXJzIj48cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIvPjxwYXRoIGQ9Ik0xNiAzLjEyOGE0IDQgMCAwIDEgMCA3Ljc0NCIvPjxwYXRoIGQ9Ik0yMiAyMXYtMmE0IDQgMCAwIDAtMy0zLjg3Ii8+PGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiLz48L3N2Zz4=",
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
      slug: "satisfaction-rate",
      description: null,
      isActive: "true",
      order: 2,
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNtaWxlLWljb24gbHVjaWRlLXNtaWxlIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik04IDE0czEuNSAyIDQgMiA0LTIgNC0yIi8+PGxpbmUgeDE9IjkiIHgyPSI5LjAxIiB5MT0iOSIgeTI9IjkiLz48bGluZSB4MT0iMTUiIHgyPSIxNS4wMSIgeTE9IjkiIHkyPSI5Ii8+PC9zdmc+", // 😀 satisfaction
    },
    {
      value: "50+",
      label: "Expert Instructors",
      slug: "expert-instructors",
      description: null,
      isActive: "true",
      order: 3,
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdyYWR1YXRpb24tY2FwLWljb24gbHVjaWRlLWdyYWR1YXRpb24tY2FwIj48cGF0aCBkPSJNMjEuNDIgMTAuOTIyYTEgMSAwIDAgMC0uMDE5LTEuODM4TDEyLjgzIDUuMThhMiAyIDAgMCAwLTEuNjYgMEwyLjYgOS4wOGExIDEgMCAwIDAgMCAxLjgzMmw4LjU3IDMuOTA4YTIgMiAwIDAgMCAxLjY2IDB6Ii8+PHBhdGggZD0iTTIyIDEwdjYiLz48cGF0aCBkPSJNNiAxMi41VjE2YTYgMyAwIDAgMCAxMiAwdi0zLjUiLz48L3N2Zz4=", // 🎓 teaching staff
    },
    {
      value: "30+",
      label: "Nationalities",
      slug: "nationalities",
      description: null,
      isActive: "true",
      order: 4,
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdsb2JlLWljb24gbHVjaWRlLWdsb2JlIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMiAyYTE0LjUgMTQuNSAwIDAgMCAwIDIwIDE0LjUgMTQuNSAwIDAgMCAwLTIwIi8+PHBhdGggZD0iTTIgMTJoMjAiLz48L3N2Zz4=", // 🌍 diversity
    },
    {
      value: "100+",
      label: "Courses Offered",
      slug: "courses-offered",
      description: null,
      isActive: "false",
      order: 0,
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvb2stb3Blbi1pY29uIGx1Y2lkZS1ib29rLW9wZW4iPjxwYXRoIGQ9Ik0xMiA3djE0Ii8+PHBhdGggZD0iTTMgMThhMSAxIDAgMCAxLTEtMVY0YTEgMSAwIDAgMSAxLTFoNWE0IDQgMCAwIDEgNCA0IDQgNCAwIDAgMSA0LTRoNWExIDEgMCAwIDEgMSAxdjEzYTEgMSAwIDAgMS0xIDFoLTZhMyAzIDAgMCAwLTMgMyAzIDMgMCAwIDAtMy0zeiIvPjwvc3ZnPg==", // 📖 learning materials
    },
    {
      value: "25+",
      label: "Years of Experience",
      slug: "years-of-experience",
      description: null,
      isActive: "false",
      order: 0,
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdXJnbGFzcy1pY29uIGx1Y2lkZS1ob3VyZ2xhc3MiPjxwYXRoIGQ9Ik01IDIyaDE0Ii8+PHBhdGggZD0iTTUgMmgxNCIvPjxwYXRoIGQ9Ik0xNyAyMnYtNC4xNzJhMiAyIDAgMCAwLS41ODYtMS40MTRMMTIgMTJsLTQuNDE0IDQuNDE0QTIgMiAwIDAgMCA3IDE3LjgyOFYyMiIvPjxwYXRoIGQ9Ik03IDJ2NC4xNzJhMiAyIDAgMCAwIC41ODYgMS40MTRMMTIgMTJsNC40MTQtNC40MTRBMiAyIDAgMCAwIDE3IDYuMTcyVjIiLz48L3N2Zz4=", // ⏳ longevity
    },
    {
      value: "200+",
      label: "Corporate Partners",
      slug: "corporate-partners",
      description: null,
      isActive: "false",
      order: 0,
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhhbmRzaGFrZS1pY29uIGx1Y2lkZS1oYW5kc2hha2UiPjxwYXRoIGQ9Im0xMSAxNyAyIDJhMSAxIDAgMSAwIDMtMyIvPjxwYXRoIGQ9Im0xNCAxNCAyLjUgMi41YTEgMSAwIDEgMCAzLTNsLTMuODgtMy44OGEzIDMgMCAwIDAtNC4yNCAwbC0uODguODhhMSAxIDAgMSAxLTMtM2wyLjgxLTIuODFhNS43OSA1Ljc5IDAgMCAxIDcuMDYtLjg3bC40Ny4yOGEyIDIgMCAwIDAgMS40Mi4yNUwyMSA0Ii8+PHBhdGggZD0ibTIxIDMgMSAxMWgtMiIvPjxwYXRoIGQ9Ik0zIDMgMiAxNGw2LjUgNi41YTEgMSAwIDEgMCAzLTMiLz48cGF0aCBkPSJNMyA0aDgiLz48L3N2Zz4=", // 🤝 partnerships
    },
    {
      value: "10,000+",
      label: "Successful Graduates",
      slug: "successful-graduates",
      description: null,
      isActive: "false",
      order: 0,
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWF3YXJkLWljb24gbHVjaWRlLWF3YXJkIj48cGF0aCBkPSJtMTUuNDc3IDEyLjg5IDEuNTE1IDguNTI2YS41LjUgMCAwIDEtLjgxLjQ3bC0zLjU4LTIuNjg3YTEgMSAwIDAgMC0xLjE5NyAwbC0zLjU4NiAyLjY4NmEuNS41IDAgMCAxLS44MS0uNDY5bDEuNTE0LTguNTI2Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI2Ii8+PC9zdmc+", // 🏅 success recognition
    },
    {
      value: "20+",
      label: "Research Projects",
      slug: "research-projects",
      description: null,
      isActive: "false",
      order: 0,
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZsYXNrLWNvbmljYWwtaWNvbiBsdWNpZGUtZmxhc2stY29uaWNhbCI+PHBhdGggZD0iTTE0IDJ2NmEyIDIgMCAwIDAgLjI0NS45Nmw1LjUxIDEwLjA4QTIgMiAwIDAgMSAxOCAyMkg2YTIgMiAwIDAgMS0xLjc1NS0yLjk2bDUuNTEtMTAuMDhBMiAyIDAgMCAwIDEwIDhWMiIvPjxwYXRoIGQ9Ik02LjQ1MyAxNWgxMS4wOTQiLz48cGF0aCBkPSJNOC41IDJoNyIvPjwvc3ZnPg==", // 🔬 research
    },
    {
      value: "95%",
      label: "Employment Rate",
      slug: "employment-rate",
      description: null,
      isActive: "false",
      order: 0,
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyaWVmY2FzZS1idXNpbmVzcy1pY29uIGx1Y2lkZS1icmllZmNhc2UtYnVzaW5lc3MiPjxwYXRoIGQ9Ik0xMiAxMmguMDEiLz48cGF0aCBkPSJNMTYgNlY0YTIgMiAwIDAgMC0yLTJoLTRhMiAyIDAgMCAwLTIgMnYyIi8+PHBhdGggZD0iTTIyIDEzYTE4LjE1IDE4LjE1IDAgMCAxLTIwIDAiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjYiIHJ4PSIyIi8+PC9zdmc+", // 💼 career outcomes
    },
  ];

  const [inserted] = await db
    .insert(statistics)
    .values(statisticData)
    .returning();
};
