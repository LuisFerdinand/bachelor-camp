"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import DesktopNav from "./DesktopNav";
import { UnifiedDesktopMenu, UnifiedMobileMenu } from "./UnifiedMenu";
import { MobileUnifiedMenu } from "./MobileUnifiedMenu";

import Image from "next/image";
import { LOGO_PRIMARY_FALLBACK, LOGO_SECONDARY_FALLBACK } from "@/constants";
import { MobileNav } from "./MobileNav";
import { Menu, MenuIcon, MenuSquare } from "lucide-react";

export const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    { href: "/about-us", label: "About" },
    { href: "/camp", label: "Camp" },
    { href: "/special-program", label: "Programs" },
    { href: "/products", label: "Products" },
    { href: "/blog", label: "Blog" },
    { href: "/contact-us", label: "Contact" },
  ];

  const closeMenus = () => {
    setIsMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const shouldUseSolidStyling = isScrolled || isMenuOpen; // Only mobile menu affects background

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          shouldUseSolidStyling
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-row justify-between items-center gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0 min-w-0 "
            >
              <div className="relative w-32 h-10 items-start justify-start">
                {/* Logo for when not scrolled (top of page) */}
                <Image
                  src={LOGO_SECONDARY_FALLBACK}
                  width={180}
                  height={180}
                  alt="Bachelor Camp Logo"
                  className={`absolute inset-0 h-10 rounded-lg object-cover transition-all duration-500 ease-in-out  ${
                    shouldUseSolidStyling
                      ? "opacity-0 scale-95 rotate-6"
                      : "opacity-100 scale-100 rotate-0"
                  }`}
                />
                {/* Logo for when scrolled/menu open */}
                <Image
                  src={LOGO_PRIMARY_FALLBACK}
                  width={180}
                  height={180}
                  alt="Bachelor Camp Logo Dark"
                  className={`absolute inset-0 h-10 rounded-lg object-cover transition-all duration-500 ease-in-out  ${
                    shouldUseSolidStyling
                      ? "opacity-100 scale-100 rotate-0"
                      : "opacity-0 scale-95 -rotate-6"
                  }`}
                />
              </div>
            </Link>

            <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
              {/* Desktop Navigation */}
              <DesktopNav
                navLinks={navLinks}
                pathname={pathname}
                closeMenus={closeMenus}
                shouldUseSolidStyling={shouldUseSolidStyling}
              />
              <div className="flex items-center space-x-4">
                {/* ✅ NEW: Unified Menu for Desktop */}

                <UnifiedDesktopMenu
                  isOpen={isMenuOpen}
                  toggle={() => setIsMenuOpen(!isMenuOpen)}
                  closeMenus={closeMenus}
                  shouldUseSolidStyling={shouldUseSolidStyling}
                  isSignedIn={isSignedIn || false}
                />

                {/* Mobile Toggle Button (Hamburger) */}
                <button
                  className={`lg:hidden p-2 rounded-lg transition-all duration-500 ease-in-out ${
                    shouldUseSolidStyling ? "text-gray-700" : "text-white"
                  }`}
                  onClick={toggleMobileMenu}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
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
              </div>
            </div>
          </div>
        </div>
      </header>
      <UnifiedMobileMenu
        navLinks={navLinks}
        pathname={pathname}
        isOpen={isMenuOpen}
        closeMenus={closeMenus}
        isSignedIn={isSignedIn || false}
      />
    </>
  );
};
