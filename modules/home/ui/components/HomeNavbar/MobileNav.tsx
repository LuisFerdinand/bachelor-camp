"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
  isOpen: boolean;
  closeMenus: () => void;
  isSignedIn: boolean;
}


export const MobileNav = ({
  navLinks,
  isOpen,
  closeMenus,
  isSignedIn,
}: MobileNavProps) => {
  
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 transition-opacity lg:hidden ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`absolute top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={closeMenus} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-800 hover:text-blue-600 transition-colors"
              onClick={closeMenus}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth buttons */}
          {isSignedIn ? (
            <button
              className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              onClick={() => {
                // call your signOut function here
                closeMenus();
              }}
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/signin"
              className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-center"
              onClick={closeMenus}
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
