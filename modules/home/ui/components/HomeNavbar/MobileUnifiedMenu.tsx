"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import MenuItem from "@/components/MenuItem";
import { Separator } from "@/components/ui/separator";
import {
  LogOut,
  User,
  LayoutDashboard,
  Heart,
  BookOpen,
  Calendar,
  Home as HomeIcon,
} from "lucide-react";

interface MobileUnifiedMenuProps {
  isOpen: boolean;
  closeMenus: () => void;
  navLinks: Array<{ href: string; label: string }>;
  pathname: string;
  isSignedIn: boolean;
}

export const MobileUnifiedMenu = ({
  isOpen,
  closeMenus,
  navLinks,
  pathname,
  isSignedIn,
}: MobileUnifiedMenuProps) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"book" | "account">("book");

  const handleTabSwitch = (tab: "book" | "account") => {
    setActiveTab(tab);
  };

  return (
    <div
      className={`lg:hidden bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-screen py-4 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Navigation Links */}
        <nav
          className={`flex flex-col space-y-1 transition-all duration-500 ease-in-out delay-150 ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 rounded-lg transition-all duration-300 ease-in-out ${
                pathname === link.href
                  ? "text-brand-600 bg-brand-50"
                  : "text-gray-600 hover:text-brand-600 hover:bg-gray-50"
              } ${
                isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen ? `${200 + index * 50}ms` : "0ms",
              }}
              onClick={closeMenus}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Modern Toggle Section */}
        <div
          className={`border-t border-gray-200 mt-4 pt-4 transition-all duration-300 ease-in-out ${
            isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
          }`}
          style={{ transitionDelay: isOpen ? "500ms" : "0ms" }}
        >
          {/* Toggle Tabs */}
          <div className="mb-4 px-2">
            <div className="relative bg-gray-200 rounded-full p-1 flex">
              {/* Animated Background Circle */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md transition-all duration-300 ease-out ${
                  activeTab === "book" ? "left-1" : "left-[calc(50%+3px)]"
                }`}
              />

              {/* Tab Buttons */}
              <button
                onClick={() => handleTabSwitch("book")}
                className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "book" ? "text-brand-600" : "text-gray-600"
                }`}
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </button>
              <button
                onClick={() => handleTabSwitch("account")}
                className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "account" ? "text-brand-600" : "text-gray-600"
                }`}
              >
                <User className="w-4 h-4" />
                My Account
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-1">
            {/* Book Tab Content */}
            {activeTab === "book" && (
              <div
                className={`space-y-1 transition-all duration-300 ease-in-out ${
                  isOpen ? "animate-fadeIn" : ""
                }`}
              >
                <Link
                  href="/program-booking"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                  onClick={closeMenus}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book a Program</span>
                </Link>
                <Link
                  href="/booking"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                  onClick={closeMenus}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Book Accommodation</span>
                </Link>
              </div>
            )}

            {/* Account Tab Content */}
            {activeTab === "account" && (
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? "animate-fadeIn" : ""
                }`}
              >
                {isSignedIn ? (
                  <>
                    <div className="flex flex-col px-4 py-3 bg-brand-50 rounded-lg mb-2">
                      <span className="font-medium text-gray-900">
                        {user?.fullName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user?.primaryEmailAddress?.emailAddress}
                      </span>
                    </div>
                    <MenuItem
                      onClick={() => {
                        closeMenus();
                        router.push("/users/current");
                      }}
                      label="My Profile"
                      icon={User}
                    />
                    <MenuItem
                      onClick={() => {
                        closeMenus();
                        router.push("/dashboard");
                      }}
                      label="My Dashboard"
                      icon={LayoutDashboard}
                    />
                    <MenuItem
                      onClick={() => {
                        closeMenus();
                        router.push("/favourites");
                      }}
                      label="Favorites"
                      icon={Heart}
                    />
                    <MenuItem
                      onClick={() => {
                        closeMenus();
                        router.push("/courses");
                      }}
                      label="My Courses"
                      icon={BookOpen}
                    />
                    <MenuItem
                      onClick={() => {
                        closeMenus();
                        router.push("/orders");
                      }}
                      label="My Order"
                    />
                    <div className="mx-2 my-2">
                      <Separator />
                    </div>
                    <MenuItem
                      onClick={() => {
                        signOut();
                        closeMenus();
                      }}
                      label="Sign Out"
                      icon={LogOut}
                      color="text-red-700"
                    />
                  </>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer">
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
                      </div>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer">
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
                      </div>
                    </SignUpButton>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};