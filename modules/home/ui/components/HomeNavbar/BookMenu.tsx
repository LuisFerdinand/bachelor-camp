'use client';
import Link from 'next/link';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  closeMenus: () => void;
  shouldUseSolidStyling: boolean;
  isSignedIn: boolean;
};

export default function BookMenu({ isOpen, toggle, closeMenus, shouldUseSolidStyling, /* isSignedIn */}: Props) {
  return (
    <div className="hidden lg:block relative">
      <button
        onClick={toggle}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-500 ease-in-out ${
          shouldUseSolidStyling
            ? 'bg-brand-600 text-white hover:bg-brand-700'
            : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
        }`}
      >
        <span className="font-medium">Book Now</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-60">
          <div className="py-2">
            <Link
              href="/booking"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors duration-200"
              onClick={closeMenus}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                Book a Program
              </span>
            </Link>
            <Link
              href="/booking"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors duration-200"
              onClick={closeMenus}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>
                Book Accommodation
              </span>
            </Link>

            {/* <div className="border-t border-gray-200 my-2"></div> */}

            {/* {!isSignedIn ? (
              <>
                <Link href="/login" onClick={closeMenus} className="block px-4 py-3 hover:bg-gray-50 text-gray-700">
                  Sign In
                </Link>
                <Link href="/register" onClick={closeMenus} className="block px-4 py-3 hover:bg-gray-50 text-gray-700">
                  Sign Up
                </Link>
              </>
            ) : (
              <Link href="/profile" onClick={closeMenus} className="block px-4 py-3 hover:bg-gray-50 text-gray-700">
                My Profile
              </Link>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}
