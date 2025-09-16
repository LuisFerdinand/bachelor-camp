export const DEFAULT_LIMIT = 10;
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const MAX_IMAGES = 5;
export const PRODUCT_IMAGE_FALLBACK = "/images/ImagePlaceholder.png";
export const USER_IMAGE_FALLBACK = "/images/UserPlaceholder.jpg";

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
