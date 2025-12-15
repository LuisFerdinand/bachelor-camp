"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk, SignInButton, SignUpButton } from "@clerk/nextjs";

import {
  LogOut,
  User,
  LayoutDashboard,
  Heart,
  BookOpen,
  Menu,
  Calendar,
  Home as HomeIcon,
  Crown,
  ShieldCheck,
  Shield,
  Award,
  Users,
  PenTool,
  UserCircle,
  Sparkles,
  Building2,
  Package,
  Wrench,
  Truck,
  ShoppingBag,
  X,
  ChevronRight,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const roleConfig = {
  super_admin: {
    icon: Crown,
    label: "Super Admin",
    gradient: "from-yellow-400 to-yellow-600",
    badgeColor: "bg-yellow-500",
  },
  admin_academic: {
    icon: ShieldCheck,
    label: "Admin Academic",
    gradient: "from-brand-500 to-brand-700",
    badgeColor: "bg-brand-600",
  },
  admin_room_master: {
    icon: Shield,
    label: "Room Master",
    gradient: "from-brand-700 to-brand-900",
    badgeColor: "bg-brand-800",
  },
  teacher: {
    icon: Award,
    label: "Teacher",
    gradient: "from-emerald-400 to-emerald-600",
    badgeColor: "bg-emerald-500",
  },
  accommodation_staff: {
    icon: Users,
    label: "Accommodation Staff",
    gradient: "from-amber-400 to-amber-600",
    badgeColor: "bg-amber-500",
  },
  author: {
    icon: PenTool,
    label: "Author",
    gradient: "from-purple-400 to-purple-600",
    badgeColor: "bg-purple-500",
  },
  student: {
    icon: UserCircle,
    label: "Student",
    gradient: "from-slate-400 to-slate-600",
    badgeColor: "bg-slate-500",
  },
};

interface UnifiedDesktopMenuProps {
  isOpen: boolean;
  toggle: () => void;
  closeMenus: () => void;
  shouldUseSolidStyling: boolean;
  isSignedIn: boolean;
}

export const UnifiedDesktopMenu = ({
  isOpen,
  toggle,
  closeMenus,
  shouldUseSolidStyling,
  isSignedIn,
}: UnifiedDesktopMenuProps) => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const userRole =
    (user?.publicMetadata.role as keyof typeof roleConfig) || "student";
  const roleInfo = roleConfig[userRole];
  const RoleIcon = roleInfo?.icon || UserCircle;

  const handleSignOut = () => {
    closeMenus();
    signOut();
  };

  const handleLinkClick = () => {
    closeMenus();
  };

  const quickLinks = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      path: "/users/current",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: Heart,
      path: "/favorites",
    },
    {
      id: "orders",
      label: "My Orders",
      icon: ShoppingBag,
      path: "/orders",
    },
  ];

  return (
    <div className="relative">
      {/* Desktop Toggle Button */}
      <div
        onClick={toggle}
        className={`hidden lg:flex p-3 md:py-2 md:px-3 border flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition shrink-0 ${
          shouldUseSolidStyling
            ? "border-neutral-200 bg-white"
            : "border-white/30 bg-white/20 backdrop-blur-sm text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-transform duration-500 ease-in-out ${
            isOpen ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
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
        <div className="hidden md:block">
          {isSignedIn && user?.imageUrl ? (
            <img
              className="rounded-full size-6 object-cover"
              alt="Avatar"
              src={user.imageUrl}
            />
          ) : (
            <div className="size-6 rounded-full bg-gray-300 flex items-center justify-center">
              <UserCircle className="size-3 text-gray-600" />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Dropdown Menu */}
      {isOpen && (
        <div className="hidden lg:block absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {isSignedIn ? (
            <>
              {/* User Info Header */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {user?.fullName?.[0] || "U"}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 p-1 ${roleInfo.badgeColor} rounded-full shadow-md ring-2 ring-white`}
                    >
                      <RoleIcon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 truncate">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {user?.emailAddresses[0]?.emailAddress || ""}
                    </p>
                    <div
                      className={`inline-flex mt-1 px-2 py-0.5 ${roleInfo.badgeColor} rounded-md`}
                    >
                      <span className="text-[10px] font-bold text-white">
                        {roleInfo.label.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Booking Actions */}
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
                  Quick Actions
                </p>
                <div className="space-y-2">
                  <a
                    href="/program-booking"
                    onClick={handleLinkClick}
                    className="group flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700">
                      <svg
                        className="w-4 h-4 text-white"
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
                    </div>
                    <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                      Book a Program
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a
                    href="/booking"
                    onClick={handleLinkClick}
                    className="group flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-brand-600 hover:bg-blue-50 transition-all"
                  >
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800">
                      <svg
                        className="w-4 h-4 text-white"
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
                    </div>
                    <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-brand-700">
                      Book Accommodation
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
                  </a>
                </div>
              </div>

              {/* Account Links */}
              <div className="py-2">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.path}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-all group"
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Sign Out */}
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-br from-red-500 to-red-700 text-white text-sm font-semibold hover:shadow-md transition-all group"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="p-4">
              {/* Welcome Section */}
              <div className="text-center py-4 border-b border-gray-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 mb-3 shadow-lg">
                  <UserCircle className="w-9 h-9 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  Welcome Back
                </h3>
                <p className="text-sm text-gray-600">
                  Sign in to access your account
                </p>
              </div>

              {/* Booking Options for Non-Signed Users */}
              <div className="py-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Quick Booking
                </p>
                <a
                  href="/program-booking"
                  onClick={handleLinkClick}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                >
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700">
                    <svg
                      className="w-4 h-4 text-white"
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
                  </div>
                  <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                    Book a Program
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-all" />
                </a>

                <a
                  href="/booking"
                  onClick={handleLinkClick}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-lg border border-gray-200 hover:border-brand-600 hover:bg-blue-50 transition-all"
                >
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800">
                    <svg
                      className="w-4 h-4 text-white"
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
                  </div>
                  <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-brand-700">
                    Book Accommodation
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>

              {/* Auth Buttons */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <SignInButton mode="modal">
                  <button
                    onClick={handleLinkClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 text-white text-sm font-semibold hover:shadow-md transition-all"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button
                    onClick={handleLinkClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-brand-600 text-brand-600 text-sm font-semibold hover:bg-blue-50 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    Create Account
                  </button>
                </SignUpButton>
              </div>

              {/* Features */}
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="p-1 rounded bg-amber-500">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span>Access exclusive deals</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="p-1 rounded bg-brand-600">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                  <span>Save and track favorites</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="p-1 rounded bg-emerald-600">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span>Premium support & verified equipment</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
interface NavLink {
  label: string;
  href: string;
}

interface UnifiedMobileMenuProps {
  navLinks: NavLink[];
  pathname: string;
  isOpen: boolean;
  closeMenus: () => void;
  isSignedIn: boolean;
}

export const UnifiedMobileMenu = ({
  navLinks,
  isOpen,
  closeMenus,
  isSignedIn,
  pathname,
}: UnifiedMobileMenuProps) => {
  const { user } = useUser();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const { signOut } = useClerk();
  const router = useRouter();

  const productsDropdown = [
    {
      href: "/products",
      label: "All Products",
      icon: Sparkles,
      description: "Browse our full range",
      gradient: "from-amber-500 to-yellow-600",
    },
    {
      href: "/products/equipment",
      label: "Heavy Equipment",
      icon: Building2,
      description: "Construction machinery",
      gradient: "from-slate-600 to-slate-800",
    },
    {
      href: "/products/parts",
      label: "Spare Parts",
      icon: Package,
      description: "Replacement parts",
      gradient: "from-orange-500 to-red-600",
    },
    {
      href: "/products/components",
      label: "Components",
      icon: Wrench,
      description: "Building infrastructure",
      gradient: "from-stone-600 to-stone-800",
    },
  ];

  const userMenuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      path: "/users/current",
      gradient: "from-slate-600 to-slate-800",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      gradient: "from-amber-600 to-orange-700",
    },
    {
      id: "favorites",
      label: "Saved Items",
      icon: Heart,
      path: "/favorites",
      gradient: "from-rose-600 to-red-700",
    },
    {
      id: "rentals",
      label: "My Rentals",
      icon: Truck,
      path: "/rentals",
      gradient: "from-emerald-600 to-teal-700",
    },
    {
      id: "orders",
      label: "My Orders",
      icon: ShoppingBag,
      path: "/orders",
      gradient: "from-blue-600 to-indigo-700",
    },
  ];

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const handleLinkClick = () => {
    setExpandedMenu(null);
    closeMenus();
  };

  const handleSignOut = () => {
    closeMenus();
    signOut();
  };

  const userRole =
    (user?.publicMetadata.role as keyof typeof roleConfig) || "student";
  const roleInfo = roleConfig[userRole];
  const RoleIcon = roleInfo?.icon || UserCircle;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeMenus}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 350 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl lg:hidden overflow-hidden flex flex-col"
            >
              <div className="relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#083cbc] via-[#1d4ed8] to-[#1e40af]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent" />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="absolute inset-0 overflow-hidden opacity-20">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-2 left-4 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
                </div>

                <div className="relative px-5 py-2 flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
                      <Menu className="size-4" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm tracking-tight drop-shadow-md">
                        Menu
                      </h2>
                      <p className="text-xs text-white/90 drop-shadow-sm">
                        Navigate & explore
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={closeMenus}
                    className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const hasDropdown = link.label === "Products";
                  const isExpanded = expandedMenu === link.label;

                  if (hasDropdown) {
                    return (
                      <div key={link.href}>
                        <button
                          onClick={() => toggleSubmenu(link.label)}
                          className={`w-full group relative overflow-hidden rounded-xl transition-all duration-200 border ${
                            isActive || isExpanded
                              ? "border-brand-600/30 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                          }`}
                        >
                          <div className="relative flex items-center justify-between px-4 py-2">
                            <span
                              className={`font-semibold text-[15px] transition-colors ${
                                isActive || isExpanded
                                  ? "text-brand-600"
                                  : "text-gray-800"
                              }`}
                            >
                              {link.label}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown
                                className={`w-5 h-5 ${
                                  isExpanded
                                    ? "text-brand-600"
                                    : "text-gray-400"
                                }`}
                              />
                            </motion.div>
                          </div>

                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="absolute left-0 top-1  w-1 h-7 bg-brand-600 rounded-r-full"
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 ml-3 space-y-2 border-l-2 border-gray-200 pl-3 pb-1">
                                {productsDropdown.map((item) => {
                                  const Icon = item.icon;
                                  const isItemActive = pathname === item.href;

                                  return (
                                    <motion.a
                                      key={item.href}
                                      href={item.href}
                                      onClick={handleLinkClick}
                                      initial={{ x: -10, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      transition={{ duration: 0.2 }}
                                      className={`group/item relative flex items-start justify-center gap-3 p-3 rounded-xl transition-all duration-200 border ${
                                        isItemActive
                                          ? "border-brand-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm"
                                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                                      }`}
                                    >
                                      <div
                                        className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${
                                          item.gradient
                                        } shadow-sm transition-transform duration-200 ${
                                          isItemActive
                                            ? "scale-105"
                                            : "group-hover/item:scale-105"
                                        }`}
                                      >
                                        <Icon className="size-3 text-white" />
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center mb-0.5  ">
                                          <span
                                            className={`font-semibold text-sm transition-colors  leading-none ${
                                              isItemActive
                                                ? "text-brand-600"
                                                : "text-gray-900"
                                            }`}
                                          >
                                            {item.label}
                                          </span>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-none">
                                          {item.description}
                                        </p>
                                      </div>

                                      <ChevronRight
                                        className={`w-4 h-4 flex-shrink-0 transition-all ${
                                          isItemActive
                                            ? "text-brand-600 translate-x-0.5"
                                            : "text-gray-400 group-hover/item:translate-x-0.5"
                                        }`}
                                      />
                                    </motion.a>
                                  );
                                })}

                                <motion.a
                                  href="/special-product"
                                  onClick={handleLinkClick}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.2, delay: 0.1 }}
                                  className="group relative flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white text-sm font-bold rounded-xl   transition-all duration-200 overflow-hidden"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{
                                      duration: 0.7,
                                      ease: "easeInOut",
                                    }}
                                  />

                                  <span className="relative z-10">
                                    View All Products
                                  </span>
                                  <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </motion.a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  // Regular Links
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`block group relative overflow-hidden rounded-xl transition-all duration-200 border ${
                        isActive
                          ? "border-brand-600/30 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                      }`}
                    >
                      <div className="relative flex items-center justify-between px-4 py-2">
                        <span
                          className={`font-semibold text-[15px] transition-colors ${
                            isActive ? "text-brand-600" : "text-gray-800"
                          }`}
                        >
                          {link.label}
                        </span>
                        <ChevronRight
                          className={`w-5 h-5 transition-all ${
                            isActive
                              ? "text-brand-600 translate-x-0.5"
                              : "text-gray-400 group-hover:translate-x-0.5"
                          }`}
                        />
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute left-0 top-1  w-1 h-7 bg-brand-600 rounded-r-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </a>
                  );
                })}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 px-1">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                      Quick Actions
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  </div>

                  <a
                    href="/program-booking"
                    onClick={handleLinkClick}
                    className="group relative overflow-hidden flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
                      <svg
                        className="w-4 h-4"
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
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm leading-tight">
                        Book a Program
                      </p>
                      <p className="text-[10px] text-white/90">
                        Reserve your spot
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href="/booking"
                    onClick={handleLinkClick}
                    className="group relative overflow-hidden flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
                      <svg
                        className="w-4 h-4"
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
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm leading-tight">
                        Book Accommodation
                      </p>
                      <p className="text-[10px] text-white/90">
                        Find your stay
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </nav>

              {/* Compact Auth Section */}
              <div className="flex-shrink-0 border-t border-2 border-brand-600/20 bg-gradient-to-br from-blue-50 to-indigo-50">
                {isSignedIn ? (
                  <div className="p-3 space-y-2.5">
                    {/* Compact User Card */}
                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-brand-600">
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white font-bold text-sm">
                          {user?.fullName?.[0] || "U"}
                        </div>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 p-0.5 ${roleInfo.badgeColor} rounded-full ring-1 ring-white`}
                        >
                          <RoleIcon className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs text-gray-900 truncate">
                          {user?.fullName || "User"}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`px-1.5 py-0.5 ${roleInfo.badgeColor} rounded text-[9px] font-bold text-white`}
                          >
                            {roleInfo.label.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {userMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.id}
                            href={item.path}
                            onClick={handleLinkClick}
                            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white border border-brand-600/20 hover:border-brand-600 transition-colors"
                          >
                            <div
                              className={`p-1 rounded-md bg-gradient-to-br ${item.gradient}`}
                            >
                              <Icon className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-[9px] font-medium text-gray-700 text-center leading-tight">
                              {item.label}
                            </span>
                          </a>
                        );
                      })}
                    </div>

                    {/* Compact Sign Out */}
                    <button
                      onClick={handleSignOut}
                      className="w-full rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 py-2 flex items-center justify-center gap-1.5 text-white text-xs font-semibold hover:shadow-md transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="p-3 space-y-2.5">
                    {/* Compact Welcome */}
                    <div className="text-center py-1.5">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 mb-2 shadow-md">
                        <UserCircle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-sm text-gray-900 mb-0.5">
                        Welcome Back
                      </h3>
                      <p className="text-[10px] text-gray-600">
                        Sign in to access features
                      </p>
                    </div>

                    {/* Compact Auth Buttons */}
                    <SignInButton mode="modal">
                      <button
                        className="w-full rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 py-2.5 flex items-center justify-center gap-2 text-white text-sm font-semibold hover:shadow-md transition-all"
                        onClick={handleLinkClick}
                      >
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                      <button
                        className="w-full rounded-lg border-2 border-brand-600 py-2.5 flex items-center justify-center gap-2 text-brand-600 text-sm font-semibold hover:bg-blue-50 transition-all"
                        onClick={handleLinkClick}
                      >
                        <Sparkles className="w-4 h-4" />
                        Create Account
                      </button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
