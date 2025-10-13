"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk, SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import MenuItem from "@/components/MenuItem";
import { Separator } from "@/components/ui/separator";
import { USER_IMAGE_FALLBACK } from "@/constants";
import {
  LogOut,
  User,
  LayoutDashboard,
  Heart,
  BookOpen,
  Menu,
  Calendar,
  Home as HomeIcon,
} from "lucide-react";

interface UnifiedMenuProps {
  isOpen: boolean;
  toggle: () => void;
  closeMenus: () => void;
  shouldUseSolidStyling: boolean;
  isSignedIn: boolean;
}

export const UnifiedMenu = ({
  isOpen,
  toggle,
  closeMenus,
  shouldUseSolidStyling,
  isSignedIn,
}: UnifiedMenuProps) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"book" | "account">("book");

  const handleTabSwitch = (tab: "book" | "account") => {
    setActiveTab(tab);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <div
        onClick={toggle}
        className={`hidden lg:flex p-4 md:py-2 md:px-3 border-[1px]  flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition shrink-0 ${
          shouldUseSolidStyling
            ? "border-neutral-200 bg-white"
            : "border-white/30 bg-white/20 backdrop-blur-sm"
        }`}
      >
        <Menu
          className={`size-6 ${
            shouldUseSolidStyling ? "text-gray-700" : "text-white"
          }`}
        />
        <div className="hidden md:block">
          <Image
            className="rounded-full"
            height={35}
            width={35}
            alt="Avatar"
            src={user?.imageUrl || USER_IMAGE_FALLBACK}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="hidden lg:block absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-60 overflow-hidden">
          {/* Modern Toggle Tabs */}
          <div className="p-3 bg-gray-50">
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
                className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  activeTab === "book" ? "text-brand-600" : "text-gray-600"
                }`}
              >
                <Calendar className="inline-block w-4 h-4 mr-1" />
                Book
              </button>
              <button
                onClick={() => handleTabSwitch("account")}
                className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  activeTab === "account" ? "text-brand-600" : "text-gray-600"
                }`}
              >
                <User className="inline-block w-4 h-4 mr-1" />
                Account
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="py-2">
            {/* Book Tab Content */}
            {activeTab === "book" && (
              <div className="animate-fadeIn">
                <Link
                  href="/program-booking"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors duration-200"
                  onClick={closeMenus}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book a Program</span>
                </Link>
                <Link
                  href="/accommodation-booking"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors duration-200"
                  onClick={closeMenus}
                >
                  <HomeIcon className="w-5 h-5" />
                  <span>Book Accommodation</span>
                </Link>
              </div>
            )}

            {/* Account Tab Content */}
            {activeTab === "account" && (
              <div className="animate-fadeIn">
                {isSignedIn ? (
                  <>
                    <div className="flex flex-col px-4 py-3 bg-gray-50">
                      <span className="font-medium text-gray-900">
                        {user?.fullName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user?.primaryEmailAddress?.emailAddress}
                      </span>
                    </div>
                    <div className="mx-2 my-2">
                      <Separator />
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
                      onClick={() => signOut()}
                      label="Sign Out"
                      icon={LogOut}
                      color="text-red-700"
                    />
                  </>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <MenuItem onClick={() => {}} label="Sign In" />
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <MenuItem onClick={() => {}} label="Sign Up" />
                    </SignUpButton>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
