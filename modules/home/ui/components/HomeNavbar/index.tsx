"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import DesktopNav from "./DesktopNav";
import BookMenu from "./BookMenu";
import AuthButton from "@/modules/auth/ui/components/AuthButton";
import Image from "next/image";

export const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookMenuOpen, setIsBookMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  // Scroll effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/camp", label: "Camp" },
    { href: "/special-program", label: "Programs" },
    { href: "/about-us", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact-us", label: "Contact" },
  ];

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsBookMenuOpen(false);
  };

  const shouldUseSolidStyling = isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out py-4 ${
        shouldUseSolidStyling
          ? "bg-white backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 relative">
            <div className="relative w-32 h-10">
              {/* Logo for when not scrolled (top of page) */}
              <Image
                src="/Logo2.png"
                width={180}
                height={180}
                alt="Bachelor Camp Logo"
                className={`absolute inset-0 h-12 rounded-lg object-cover transition-all duration-500 ease-in-out ${
                  shouldUseSolidStyling
                    ? "opacity-0 scale-95 rotate-6"
                    : "opacity-100 scale-100 rotate-0"
                }`}
              />
              {/* Logo for when scrolled/menu open */}
              <Image
                src="/Logo1.png"
                width={180}
                height={180}
                alt="Bachelor Camp Logo Dark"
                className={`absolute inset-0 h-12 rounded-lg object-cover transition-all duration-500 ease-in-out ${
                  shouldUseSolidStyling
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-95 -rotate-6"
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav
            navLinks={navLinks}
            pathname={pathname}
            closeMenus={closeMenus}
            shouldUseSolidStyling={shouldUseSolidStyling}
          />

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <BookMenu
              isOpen={isBookMenuOpen}
              toggle={() => setIsBookMenuOpen(!isBookMenuOpen)}
              closeMenus={closeMenus}
              shouldUseSolidStyling={shouldUseSolidStyling}
              isSignedIn={isSignedIn || false}
            />

            {/* Mobile Toggle */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-all duration-500 ease-in-out ${
                shouldUseSolidStyling ? "text-gray-700" : "text-white"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-500 ease-in-out ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>

            {/* Auth Button (Clerk UI) */}
            <AuthButton />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-screen py-4 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <nav
            className={`flex flex-col space-y-1 transition-all duration-500 ease-in-out delay-150 ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg transition-all duration-300 ease-in-out ${
                  pathname === link.href
                    ? "text-brand-600 bg-brand-50"
                    : "text-gray-600 hover:text-brand-600 hover:bg-gray-50"
                } ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                style={{
                  transitionDelay: isMenuOpen ? `${200 + index * 50}ms` : "0ms",
                }}
                onClick={closeMenus}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Book Section */}
            <div
              className={`border-t border-gray-200 mt-4 pt-4 transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
              style={{ transitionDelay: isMenuOpen ? "500ms" : "0ms" }}
            >
              <div className="space-y-1">
                <Link
                  href="/booking"
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: isMenuOpen ? "550ms" : "0ms" }}
                  onClick={closeMenus}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Book a Program</span>
                </Link>
                <Link
                  href="/booking"
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: isMenuOpen ? "600ms" : "0ms" }}
                  onClick={closeMenus}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Book Accommodation</span>
                </Link>
                <div className="border-t border-gray-200 my-2"></div>
                <Link
                  href="/login"
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: isMenuOpen ? "650ms" : "0ms" }}
                  onClick={closeMenus}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: isMenuOpen ? "700ms" : "0ms" }}
                  onClick={closeMenus}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span>Sign Up</span>
                </Link>
                <Link
                  href="/profile"
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: isMenuOpen ? "750ms" : "0ms" }}
                  onClick={closeMenus}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>My Profile</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
