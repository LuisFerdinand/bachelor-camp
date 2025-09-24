export const DEFAULT_LIMIT = 10;
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const MAX_IMAGES = 5;
export const PRODUCT_IMAGE_FALLBACK = "/images/ImagePlaceholder.png";
export const USER_IMAGE_FALLBACK = "/images/UserPlaceholder.jpg";

// Header/Logo fallbacks
export const LOGO_PRIMARY_FALLBACK = "/header/Logo1.png";
export const LOGO_SECONDARY_FALLBACK = "/header/Logo2.png";

// Hero section fallbacks
export const ABOUT_BANNER_FALLBACK = "/HeroBg/About/AboutBanner.png";
export const CAMP_DESKTOP_FALLBACK = "/HeroBg/Camp/CampBgDesktop.png";
export const CAMP_MOBILE_FALLBACK = "/HeroBg/Camp/CampBgMobile.png";
export const CONTACT_BANNER_FALLBACK = "/HeroBg/Contact/ContactBanner.png";
export const PROGRAM_BANNER_FALLBACK = "/HeroBg/Program/ProgBanner.png";
export const BLOG_IMAGE_FALLBACK = "/images/ImagePlaceholder.png";

// Activity fallbacks (you can pick one as default or use specific ones)
export const ACTIVITY_DEFAULT_FALLBACK = "/activity/Activity1.png";
export const ACTIVITY_FALLBACKS = {
  activity1: "/home/activity/Activity1.png",
  activity2: "/home/activity/Activity2.png",
  activity3: "/home/activity/Activity3.png",
  activity4: "/home/activity/Activity4.png",
  activity5: "/home/activity/Activity5.png",
  activity6: "/home/activity/Activity6.png",
} as const;

// Facilities fallbacks
export const FACILITIES_FALLBACKS = {
  culturalCenter: "/home/facilities/culCen.png",
  interFood: "/home/facilities/intFood.png",
  luxuryDorm: "/home/facilities/luxDorm.png",
  studyRoom: "/home/facilities/StudyRoom.png",
} as const;

// Student life fallbacks
export const STUDENT_LIFE_FALLBACKS = {
  mobile: "/home/student-life/student-life-mobile.png",
  desktop: "/home/student-life/student-life.png",
} as const;

// Test fallbacks
export const TEST_IMAGE_FALLBACK = "/home/testi/testi.png";

export const ICON_URL_FALLBACK =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJhZGdlLWNoZWNrLWljb24gbHVjaWRlLWJhZGdlLWNoZWNrIj48cGF0aCBkPSJNMy44NSA4LjYyYTQgNCAwIDAgMSA0Ljc4LTQuNzcgNCA0IDAgMCAxIDYuNzQgMCA0IDQgMCAwIDEgNC43OCA0Ljc4IDQgNCAwIDAgMSAwIDYuNzQgNCA0IDAgMCAxLTQuNzcgNC43OCA0IDQgMCAwIDEtNi43NSAwIDQgNCAwIDAgMS00Ljc4LTQuNzcgNCA0IDAgMCAxIDAtNi43NloiLz48cGF0aCBkPSJtOSAxMiAyIDIgNC00Ii8+PC9zdmc+";

export const LINK_FALLBACK = "/";

export const bannerStyles = {
  badge: {
    base: "bg-accent-100 text-accent-800 hover:bg-accent-200",
  },
  buttons: {
    primary: {
      base: "bg-brand-500 text-white shadow-lg hover:bg-brand-600",
    },
    outline: {
      base: "border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white bg-white/10 backdrop-blur-sm shadow-lg",
    },
    gradient: {
      base: `relative overflow-hidden rounded-2xl border-2 border-indigo-500 
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
             px-6 py-3 font-semibold text-white shadow-lg 
             transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl`,
      inner: "relative z-10",
      hoverOverlay:
        "absolute inset-0 -z-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
    },
  },
} as const;
