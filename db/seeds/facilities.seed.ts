// db/seeds/facilities.seed.ts
import { db } from "..";
import { v4 as uuidv4 } from "uuid";
import { facilities } from "../schema";

export const seedFacilities = async () => {
  console.log("🌱 Seeding facilities...");

  // Optional: clear existing data
  await db.delete(facilities);

  const defaultImage = "/default/Facility.jpg";

  type FacilityInsert = typeof facilities.$inferInsert;

  const buildingFacilities: FacilityInsert[] = [
    {
      id: uuidv4(),
      name: "Luxury Dormitories",
      slug: "luxury-dormitories",
      type: "building",
      status: "active",
      description:
        "Air-conditioned dormitory rooms equipped with modern amenities for maximum comfort.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdXNlLWljb24gbHVjaWRlLWhvdXNlIj48cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiLz48cGF0aCBkPSJNMyAxMGEyIDIgMCAwIDEgLjcwOS0xLjUyOGw3LTZhMiAyIDAgMCAxIDIuNTgyIDBsNyA2QTIgMiAwIDAgMSAyMSAxMHY5YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yeiIvPjwvc3ZnPg==",
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      order: 1,
      category: "accommodation",
      isFeatured: "true",
    },
    {
      id: uuidv4(),
      name: "High-Speed Internet",
      slug: "high-speed-internet",
      type: "building",
      status: "active",
      description:
        "24/7 WiFi access available across the entire buildingus for seamless connectivity.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdpZmktaWNvbiBsdWNpZGUtd2lmaSI+PHBhdGggZD0iTTEyIDIwaC4wMSIvPjxwYXRoIGQ9Ik0yIDguODJhMTUgMTUgMCAwIDEgMjAgMCIvPjxwYXRoIGQ9Ik01IDEyLjg1OWExMCAxMCAwIDAgMSAxNCAwIi8+PHBhdGggZD0iTTguNSAxNi40MjlhNSA1IDAgMCAxIDcgMCIvPjwvc3ZnPg==",
      imageUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      order: 2,
      category: "amenities",
      isFeatured: "true",
    },
    {
      id: uuidv4(),
      name: "International Cuisine",
      slug: "international-cuisine",
      type: "building",
      status: "active",
      description:
        "Diverse dining options with international and healthy meal plans.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXV0ZW5zaWxzLWNyb3NzZWQtaWNvbiBsdWNpZGUtdXRlbnNpbHMtY3Jvc3NlZCI+PHBhdGggZD0ibTE2IDItMi4zIDIuM2EzIDMgMCAwIDAgMCA0LjJsMS44IDEuOGEzIDMgMCAwIDAgNC4yIDBMMjIgOCIvPjxwYXRoIGQ9Ik0xNSAxNSAzLjMgMy4zYTQuMiA0LjIgMCAwIDAgMCA2bDcuMyA3LjNjLjcuNyAyIC43IDIuOCAwTDE1IDE1Wm0wIDAgNyA3Ii8+PHBhdGggZD0ibTIuMSAyMS44IDYuNC02LjMiLz48cGF0aCBkPSJtMTkgNS03IDciLz48L3N2Zz4=",
      imageUrl:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      order: 3,
      category: "dining",
      isFeatured: "true",
    },
    {
      id: uuidv4(),
      name: "Fitness Center",
      slug: "fitness-center",
      type: "building",
      status: "active",
      description:
        "Modern gym facilities and sports areas to support a healthy lifestyle.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWR1bWJiZWxsLWljb24gbHVjaWRlLWR1bWJiZWxsIj48cGF0aCBkPSJNMTcuNTk2IDEyLjc2OGEyIDIgMCAxIDAgMi44MjktMi44MjlsLTEuNzY4LTEuNzY3YTIgMiAwIDAgMCAyLjgyOC0yLjgyOWwtMi44MjgtMi44MjhhMiAyIDAgMCAwLTIuODI5IDIuODI4bC0xLjc2Ny0xLjc2OGEyIDIgMCAxIDAtMi44MjkgMi44Mjl6Ii8+PHBhdGggZD0ibTIuNSAyMS41IDEuNC0xLjQiLz48cGF0aCBkPSJtMjAuMSAzLjkgMS40LTEuNCIvPjxwYXRoIGQ9Ik01LjM0MyAyMS40ODVhMiAyIDAgMSAwIDIuODI5LTIuODI4bDEuNzY3IDEuNzY4YTIgMiAwIDEgMCAyLjgyOS0yLjgyOWwtNi4zNjQtNi4zNjRhMiAyIDAgMSAwLTIuODI5IDIuODI5bDEuNzY4IDEuNzY3YTIgMiAwIDAgMC0yLjgyOCAyLjgyOXoiLz48cGF0aCBkPSJtOS42IDE0LjQgNC44LTQuOCIvPjwvc3ZnPg==",
      imageUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      order: 4,
      category: "sports",
      isFeatured: "true",
    },
    {
      id: uuidv4(),
      name: "Study Lounges",
      slug: "study-lounges",
      type: "building",
      status: "active",
      description:
        "Comfortable lounges designed for group study and collaborative learning.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvZmZlZS1pY29uIGx1Y2lkZS1jb2ZmZWUiPjxwYXRoIGQ9Ik0xMCAydjIiLz48cGF0aCBkPSJNMTQgMnYyIi8+PHBhdGggZD0iTTE2IDhhMSAxIDAgMCAxIDEgMXY4YTQgNCAwIDAgMS00IDRIN2E0IDQgMCAwIDEtNC00VjlhMSAxIDAgMCAxIDEtMWgxNGE0IDQgMCAxIDEgMCA4aC0xIi8+PHBhdGggZD0iTTYgMnYyIi8+PC9zdmc+",
      imageUrl:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      order: 5,
      category: "study",
      isFeatured: "true",
    },
    {
      id: uuidv4(),
      name: "Cultural Center",
      slug: "cultural-center",
      type: "building",
      status: "active",
      description:
        "Dedicated spaces for cultural exchange and international community activities.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWVhcnRoLWljb24gbHVjaWRlLWVhcnRoIj48cGF0aCBkPSJNMjEuNTQgMTVIMTdhMiAyIDAgMCAwLTIgMnY0LjU0Ii8+PHBhdGggZD0iTTcgMy4zNFY1YTMgMyAwIDAgMCAzIDNhMiAyIDAgMCAxIDIgMmMwIDEuMS45IDIgMiAyYTIgMiAwIDAgMCAyLTJjMC0xLjEuOS0yIDItMmgzLjE3Ii8+PHBhdGggZD0iTTExIDIxLjk1VjE4YTIgMiAwIDAgMC0yLTJhMiAyIDAgMCAxLTItMnYtMWEyIDIgMCAwIDAtMi0ySDIuMDUiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjwvc3ZnPg==",
      imageUrl:
        "https://images.unsplash.com/photo-1659287590518-81891c997956?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      order: 6,
      category: "community",
      isFeatured: "true",
    },
    {
      id: uuidv4(),
      name: "Library",
      slug: "library",
      type: "building",
      status: "active",
      category: "study",
      description:
        "Quiet study space with access to books and digital materials.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxpYnJhcnktYmlnLWljb24gbHVjaWRlLWxpYnJhcnktYmlnIj48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjEiLz48cGF0aCBkPSJNNyAzdjE4Ii8+PHBhdGggZD0iTTIwLjQgMTguOWMuMi41LS4xIDEuMS0uNiAxLjNsLTEuOS43Yy0uNS4yLTEuMS0uMS0xLjMtLjZMMTEuMSA1LjFjLS4yLS41LjEtMS4xLjYtMS4zbDEuOS0uN2MuNS0uMiAxLjEuMSAxLjMuNloiLz48L3N2Zz4=",
      imageUrl: defaultImage,
      order: 0,
    },
    {
      id: uuidv4(),
      name: "Outdoor Sports Fields",
      slug: "outdoor-sports-fields",
      type: "building",
      status: "active",
      category: "sports",
      description:
        "Fields and courts for football, basketball, and volleyball.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXZvbGxleWJhbGwtaWNvbiBsdWNpZGUtdm9sbGV5YmFsbCI+PHBhdGggZD0iTTExLjEgNy4xYTE2LjU1IDE2LjU1IDAgMCAxIDEwLjkgNCIvPjxwYXRoIGQ9Ik0xMiAxMmExMi42IDEyLjYgMCAwIDEtOC43IDUiLz48cGF0aCBkPSJNMTYuOCAxMy42YTE2LjU1IDE2LjU1IDAgMCAxLTkgNy41Ii8+PHBhdGggZD0iTTIwLjcgMTdhMTIuOCAxMi44IDAgMCAwLTguNy01IDEzLjMgMTMuMyAwIDAgMSAwLTEwIi8+PHBhdGggZD0iTTYuMyAzLjhhMTYuNTUgMTYuNTUgMCAwIDAgMS45IDExLjUiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjwvc3ZnPg==",
      imageUrl: defaultImage,
      order: 0,
    },
    {
      id: uuidv4(),
      name: "Medical Center",
      slug: "medical-center",
      type: "building",
      status: "active",
      category: "health",
      description: "On-site clinic and health services for students.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJyaWVmY2FzZS1tZWRpY2FsLWljb24gbHVjaWRlLWJyaWVmY2FzZS1tZWRpY2FsIj48cGF0aCBkPSJNMTIgMTF2NCIvPjxwYXRoIGQ9Ik0xNCAxM2gtNCIvPjxwYXRoIGQ9Ik0xNiA2VjRhMiAyIDAgMCAwLTItMmgtNGEyIDIgMCAwIDAtMiAydjIiLz48cGF0aCBkPSJNMTggNnYxNCIvPjxwYXRoIGQ9Ik02IDZ2MTQiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjYiIHJ4PSIyIi8+PC9zdmc+",
      imageUrl: defaultImage,
      order: 0,
    },
    {
      id: uuidv4(),
      name: "Event Hall",
      slug: "event-hall",
      type: "building",
      status: "active",
      category: "entertainment",
      description:
        "A multi-purpose hall for events, workshops, and performances.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxhbmRtYXJrLWljb24gbHVjaWRlLWxhbmRtYXJrIj48cGF0aCBkPSJNMTAgMTh2LTciLz48cGF0aCBkPSJNMTEuMTIgMi4xOThhMiAyIDAgMCAxIDEuNzYuMDA2bDcuODY2IDMuODQ3Yy40NzYuMjMzLjMxLjk0OS0uMjIuOTQ5SDMuNDc0Yy0uNTMgMC0uNjk1LS43MTYtLjIyLS45NDl6Ii8+PHBhdGggZD0iTTE0IDE4di03Ii8+PHBhdGggZD0iTTE4IDE4di03Ii8+PHBhdGggZD0iTTMgMjJoMTgiLz48cGF0aCBkPSJNNiAxOHYtNyIvPjwvc3ZnPg==",
      imageUrl: defaultImage,
      order: 0,
    },

    // --- RoomType Facilities ---
    {
      id: uuidv4(),
      name: "Private Bathroom",
      slug: "private-bathroom",
      type: "roomType",
      status: "active",
      category: "accommodation",
      description:
        "Each room is equipped with a private bathroom and hot shower.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJhdGgtaWNvbiBsdWNpZGUtYmF0aCI+PHBhdGggZD0iTTEwIDQgOCA2Ii8+PHBhdGggZD0iTTE3IDE5djIiLz48cGF0aCBkPSJNMiAxMmgyMCIvPjxwYXRoIGQ9Ik03IDE5djIiLz48cGF0aCBkPSJNOSA1IDcuNjIxIDMuNjIxQTIuMTIxIDIuMTIxIDAgMCAwIDQgNXYxMmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJ2LTUiLz48L3N2Zz4=",
      imageUrl: defaultImage,
      order: 0,
    },
    {
      id: uuidv4(),
      name: "Air Conditioning",
      slug: "air-conditioning",
      type: "roomType",
      status: "active",
      category: "amenities",
      description: "Individually controlled AC units for a comfortable stay.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFpci12ZW50LWljb24gbHVjaWRlLWFpci12ZW50Ij48cGF0aCBkPSJNMTggMTcuNWEyLjUgMi41IDAgMSAxLTQgMi4wM1YxMiIvPjxwYXRoIGQ9Ik02IDEySDRhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoMTZhMiAyIDAgMCAxIDIgMnY1YTIgMiAwIDAgMS0yIDJoLTIiLz48cGF0aCBkPSJNNiA4aDEyIi8+PHBhdGggZD0iTTYuNiAxNS41NzJBMiAyIDAgMSAwIDEwIDE3di01Ii8+PC9zdmc+",
      imageUrl: defaultImage,
      order: 0,
    },
    {
      id: uuidv4(),
      name: "Workspace Desk",
      slug: "workspace-desk",
      type: "roomType",
      status: "active",
      category: "study",
      description: "Dedicated desk and chair for studying or remote work.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxhbXAtZGVzay1pY29uIGx1Y2lkZS1sYW1wLWRlc2siPjxwYXRoIGQ9Ik0xMC4yOTMgMi4yOTNhMSAxIDAgMCAxIDEuNDE0IDBsMi41IDIuNSA1Ljk5NCAxLjIyN2ExIDEgMCAwIDEgLjUwNiAxLjY4N2wtNyA3YTEgMSAwIDAgMS0xLjY4Ny0uNTA2bC0xLjIyNy01Ljk5NC0yLjUtMi41YTEgMSAwIDAgMSAwLTEuNDE0eiIvPjxwYXRoIGQ9Im0xNC4yMDcgNC43OTMtMy40MTQgMy40MTQiLz48cGF0aCBkPSJNMyAyMGEyIDIgMCAwIDEgMi0yaDRhMiAyIDAgMCAxIDIgMnYxYTEgMSAwIDAgMS0xIDFINGExIDEgMCAwIDEtMS0xeiIvPjxwYXRoIGQ9Im05LjA4NiA2LjUtNC43OTMgNC43OTNhMSAxIDAgMCAwLS4xOCAxLjE3TDcgMTgiLz48L3N2Zz4=",
      imageUrl: defaultImage,
    },
    {
      id: uuidv4(),
      name: "Wardrobe Storage",
      slug: "wardrobe-storage",
      type: "roomType",
      status: "active",
      category: "amenities",
      description: "Spacious wardrobe with hangers and shelves.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFyY2hpdmUtaWNvbiBsdWNpZGUtYXJjaGl2ZSI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjUiIHg9IjIiIHk9IjMiIHJ4PSIxIi8+PHBhdGggZD0iTTQgOHYxMWEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOCIvPjxwYXRoIGQ9Ik0xMCAxMmg0Ii8+PC9zdmc+",
      imageUrl: defaultImage,
    },
    {
      id: uuidv4(),
      name: "Smart TV",
      slug: "smart-tv",
      type: "roomType",
      status: "active",
      category: "entertainment",
      description: "Flat-screen TV with streaming apps and channels.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXR2LW1pbmltYWwtcGxheS1pY29uIGx1Y2lkZS10di1taW5pbWFsLXBsYXkiPjxwYXRoIGQ9Ik0xNS4wMzMgOS40NGEuNjQ3LjY0NyAwIDAgMSAwIDEuMTJsLTQuMDY1IDIuMzUyYS42NDUuNjQ1IDAgMCAxLS45NjgtLjU2VjcuNjQ4YS42NDUuNjQ1IDAgMCAxIC45NjctLjU2eiIvPjxwYXRoIGQ9Ik03IDIxaDEwIi8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0IiB4PSIyIiB5PSIzIiByeD0iMiIvPjwvc3ZnPg==",
      imageUrl: defaultImage,
    },
    {
      id: uuidv4(),
      name: "Mini Fridge",
      slug: "mini-fridge",
      type: "roomType",
      status: "active",
      category: "amenities",
      description: "Compact fridge to store drinks and snacks.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXJlZnJpZ2VyYXRvci1pY29uIGx1Y2lkZS1yZWZyaWdlcmF0b3IiPjxwYXRoIGQ9Ik01IDZhNCA0IDAgMCAxIDQtNGg2YTQgNCAwIDAgMSA0IDR2MTRhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJWNloiLz48cGF0aCBkPSJNNSAxMGgxNCIvPjxwYXRoIGQ9Ik0xNSA3djYiLz48L3N2Zz4=",
      imageUrl: defaultImage,
    },
    {
      id: uuidv4(),
      name: "Balcony View",
      slug: "balcony-view",
      type: "roomType",
      status: "active",
      category: "amenities",
      description: "Rooms with private balconies and scenic views.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRlbGVzY29wZS1pY29uIGx1Y2lkZS10ZWxlc2NvcGUiPjxwYXRoIGQ9Im0xMC4wNjUgMTIuNDkzLTYuMTggMS4zMThhLjkzNC45MzQgMCAwIDEtMS4xMDgtLjcwMmwtLjUzNy0yLjE1YTEuMDcgMS4wNyAwIDAgMSAuNjkxLTEuMjY1bDEzLjUwNC00LjQ0Ii8+PHBhdGggZD0ibTEzLjU2IDExLjc0NyA0LjMzMi0uOTI0Ii8+PHBhdGggZD0ibTE2IDIxLTMuMTA1LTYuMjEiLz48cGF0aCBkPSJNMTYuNDg1IDUuOTRhMiAyIDAgMCAxIDEuNDU1LTIuNDI1bDEuMDktLjI3MmExIDEgMCAwIDEgMS4yMTIuNzI3bDEuNTE1IDYuMDZhMSAxIDAgMCAxLS43MjcgMS4yMTNsLTEuMDkuMjcyYTIgMiAwIDAgMS0yLjQyNS0xLjQ1NXoiLz48cGF0aCBkPSJtNi4xNTggOC42MzMgMS4xMTQgNC40NTYiLz48cGF0aCBkPSJtOCAyMSAzLjEwNS02LjIxIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMyIgcj0iMiIvPjwvc3ZnPg==",
      imageUrl: defaultImage,
    },
    {
      id: uuidv4(),
      name: "Daily Housekeeping",
      slug: "daily-housekeeping",
      type: "roomType",
      status: "active",
      category: "services",
      description: "Daily cleaning service to keep your room tidy.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJydXNoLWNsZWFuaW5nLWljb24gbHVjaWRlLWJydXNoLWNsZWFuaW5nIj48cGF0aCBkPSJtMTYgMjItMS00Ii8+PHBhdGggZD0iTTE5IDEzLjk5YTEgMSAwIDAgMCAxLTFWMTJhMiAyIDAgMCAwLTItMmgtM2ExIDEgMCAwIDEtMS0xVjRhMiAyIDAgMCAwLTQgMHY1YTEgMSAwIDAgMS0xIDFINmEyIDIgMCAwIDAtMiAydi45OWExIDEgMCAwIDAgMSAxIi8+PHBhdGggZD0iTTUgMTRoMTRsMS45NzMgNi43NjdBMSAxIDAgMCAxIDIwIDIySDRhMSAxIDAgMCAxLS45NzMtMS4yMzN6Ii8+PHBhdGggZD0ibTggMjIgMS00Ii8+PC9zdmc+",
      imageUrl: defaultImage,
    },
    {
      id: uuidv4(),
      name: "Laundry Service",
      slug: "laundry-service",
      type: "roomType",
      status: "active",
      category: "services",
      description: "On-demand laundry and ironing services.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhc2hpbmctbWFjaGluZS1pY29uIGx1Y2lkZS13YXNoaW5nLW1hY2hpbmUiPjxwYXRoIGQ9Ik0zIDZoMyIvPjxwYXRoIGQ9Ik0xNyA2aC4wMSIvPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIyMCIgeD0iMyIgeT0iMiIgcng9IjIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEzIiByPSI1Ii8+PHBhdGggZD0iTTEyIDE4YTIuNSAyLjUgMCAwIDAgMC01IDIuNSAyLjUgMCAwIDEgMC01Ii8+PC9zdmc+",
      imageUrl: defaultImage,
    },
    {
      id: uuidv4(),
      name: "Soundproof Walls",
      slug: "soundproof-walls",
      type: "roomType",
      status: "active",
      category: "comfort",
      description: "Enhanced privacy with soundproofing.",
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhlYWRwaG9uZXMtaWNvbiBsdWNpZGUtaGVhZHBob25lcyI+PHBhdGggZD0iTTMgMTRoM2EyIDIgMCAwIDEgMiAydjNhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ2LTdhOSA5IDAgMCAxIDE4IDB2N2EyIDIgMCAwIDEtMiAyaC0xYTIgMiAwIDAgMS0yLTJ2LTNhMiAyIDAgMCAxIDItMmgzIi8+PC9zdmc+",
      imageUrl: defaultImage,
    },
  ];

  await db.insert(facilities).values(buildingFacilities);

  console.log("✅ Facilities seeded successfully!");
};
