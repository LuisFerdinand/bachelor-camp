"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Building2,
  PackageIcon,
  Sparkles,
  Wrench,
  Shield,
  LogOut,
  LogIn,
} from "lucide-react";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
  pathname: string;
  isOpen: boolean;
  closeMenus: () => void;
  isSignedIn: boolean;
}

export const MobileNav = ({
  navLinks,
  isOpen,
  closeMenus,
  isSignedIn,
  pathname,
}: MobileNavProps) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

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
      icon: PackageIcon,
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

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const handleLinkClick = () => {
    setExpandedMenu(null);
    closeMenus();
  };
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeMenus}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 350 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl lg:hidden overflow-hidden flex flex-col"
            >
              {/* Premium Header with Crimson Gradient */}
              <div className="relative overflow-hidden flex-shrink-0">
                {/* Luxurious metallic crimson background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7a0101] via-[#940101] to-[#a80101]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Radial light effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent" />

                {/* Animated shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-2 left-4 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
                </div>

                <div className="relative px-5 py-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
                      <Menu className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg tracking-tight drop-shadow-md">
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

                {/* Decorative bottom border */}
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              {/* Scrollable Navigation Content */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const hasDropdown = link.label === "Products";
                  const isExpanded = expandedMenu === link.label;

                  if (hasDropdown) {
                    return (
                      <div key={link.href}>
                        {/* Products Menu Button */}
                        <button
                          onClick={() => toggleSubmenu(link.label)}
                          className={`w-full group relative overflow-hidden rounded-xl transition-all duration-200 border ${
                            isActive || isExpanded
                              ? "border-[#940101]/30 bg-gradient-to-br from-red-50 to-orange-50 shadow-sm"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                          }`}
                        >
                          <div className="relative flex items-center justify-between px-4 py-3.5">
                            <span
                              className={`font-semibold text-[15px] transition-colors ${
                                isActive || isExpanded
                                  ? "text-[#940101]"
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
                                    ? "text-[#940101]"
                                    : "text-gray-400"
                                }`}
                              />
                            </motion.div>
                          </div>

                          {/* Active indicator */}
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#940101] rounded-r-full"
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}
                        </button>

                        {/* Animated Dropdown */}
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
                                      className={`group/item relative flex items-start gap-3 p-3 rounded-xl transition-all duration-200 border ${
                                        isItemActive
                                          ? "border-[#940101] bg-gradient-to-br from-red-50 to-orange-50 shadow-sm"
                                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                                      }`}
                                    >
                                      {/* Icon with gradient */}
                                      <div
                                        className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${
                                          item.gradient
                                        } shadow-sm transition-transform duration-200 ${
                                          isItemActive
                                            ? "scale-105"
                                            : "group-hover/item:scale-105"
                                        }`}
                                      >
                                        <Icon className="w-4 h-4 text-white" />
                                      </div>

                                      {/* Content */}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                          <span
                                            className={`font-semibold text-sm transition-colors ${
                                              isItemActive
                                                ? "text-[#940101]"
                                                : "text-gray-900"
                                            }`}
                                          >
                                            {item.label}
                                          </span>
                                          {isItemActive && (
                                            <span className="px-1.5 py-0.5 text-[9px] font-bold text-white bg-[#940101] rounded-md shadow-sm">
                                              ACTIVE
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                          {item.description}
                                        </p>
                                      </div>

                                      {/* Arrow */}
                                      <ChevronRight
                                        className={`w-4 h-4 flex-shrink-0 transition-all ${
                                          isItemActive
                                            ? "text-[#940101] translate-x-0.5"
                                            : "text-gray-400 group-hover/item:translate-x-0.5"
                                        }`}
                                      />
                                    </motion.a>
                                  );
                                })}

                                {/* View All Products CTA */}
                                <motion.a
                                  href="/special-product"
                                  onClick={handleLinkClick}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.2, delay: 0.1 }}
                                  className="group relative flex items-center justify-center gap-2 px-4 py-3 mt-2 bg-gradient-to-br from-[#940101] via-[#a80101] to-[#7a0101] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#940101]/30 hover:shadow-xl hover:shadow-[#940101]/40 active:shadow-md transition-all duration-200 overflow-hidden"
                                >
                                  {/* Metallic overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                  {/* Shimmer */}
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
                          ? "border-[#940101]/30 bg-gradient-to-br from-red-50 to-orange-50 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                      }`}
                    >
                      <div className="relative flex items-center justify-between px-4 py-3.5">
                        <span
                          className={`font-semibold text-[15px] transition-colors ${
                            isActive ? "text-[#940101]" : "text-gray-800"
                          }`}
                        >
                          {link.label}
                        </span>
                        <ChevronRight
                          className={`w-5 h-5 transition-all ${
                            isActive
                              ? "text-[#940101] translate-x-0.5"
                              : "text-gray-400 group-hover:translate-x-0.5"
                          }`}
                        />
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute left-0 top-1 -translate-y-1/2 w-1 h-10 bg-[#940101] rounded-r-full"
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
              </nav>

              {/* Premium Footer Section */}
              <div className="flex-shrink-0 border-t border-gray-200 bg-gradient-to-b from-gray-50/50 to-gray-100/30 p-4 space-y-3">
                {/* Features */}
                <div className="flex items-center gap-3 px-3 py-2.5 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-sm">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900">
                      Trusted Equipment
                    </p>
                    <p className="text-[10px] text-gray-600 leading-tight">
                      Premium quality guaranteed
                    </p>
                  </div>
                </div>

                {/* Auth/Action Section */}
                {isSignedIn ? (
                  <button
                    className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#940101] via-[#a80101] to-[#7a0101] transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md"
                    onClick={handleLinkClick}
                  >
                    {/* Metallic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    <div className="relative px-4 py-3 flex items-center justify-center gap-2 text-white">
                      <LogOut className="w-4 h-4" />
                      <span className="font-bold text-sm tracking-wide">
                        Sign Out
                      </span>
                    </div>
                  </button>
                ) : (
                  <a
                    href="/signin"
                    onClick={handleLinkClick}
                    className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#940101] via-[#a80101] to-[#7a0101] transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md"
                  >
                    {/* Metallic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {/* Shimmer on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />

                    <div className="relative px-4 py-3 flex items-center justify-center gap-2 text-white">
                      <LogIn className="w-4 h-4" />
                      <span className="font-bold text-sm tracking-wide">
                        Sign In
                      </span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                )}

                {/* Version/Copyright */}
                <p className="text-center text-[10px] text-gray-500 pt-1">
                  Premium Equipment Rental © 2024
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
