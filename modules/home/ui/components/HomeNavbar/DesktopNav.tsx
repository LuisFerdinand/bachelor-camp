import {
  Building2,
  ChevronDown,
  PackageIcon,
  Sparkles,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  navLinks: { href: string; label: string }[];
  pathname: string;
  closeMenus: () => void;
  shouldUseSolidStyling: boolean;
  theme?: string;
};

export default function DesktopNav({
  navLinks,
  pathname,
  shouldUseSolidStyling,
  closeMenus,
  theme = "dark",
}: Props) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const productsDropdown = [
    {
      href: "/products",
      label: "All Products",
      icon: Sparkles,
      description: "Browse our full range of equipment and parts",
      gradient: "from-amber-500 to-yellow-600",
      accentColor: "bg-amber-500",
    },
    {
      href: "/products/equipment",
      label: "Heavy Equipment",
      icon: Building2,
      description: "Excavators, loaders, and other construction machinery",
      gradient: "from-slate-600 to-slate-800",
      accentColor: "bg-slate-600",
    },
    {
      href: "/products/parts",
      label: "Spare Parts",
      icon: PackageIcon,
      description: "Genuine and high-quality replacement parts",
      gradient: "from-orange-500 to-red-600",
      accentColor: "bg-orange-500",
    },
    {
      href: "/products/components",
      label: "Construction Components",
      icon: Wrench,
      description: "Essential components for building and infrastructure",
      gradient: "from-stone-600 to-stone-800",
      accentColor: "bg-stone-600",
    },
  ];

  const handleMouseEnter = (label: string) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(label);
    setHoveredLink(label);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to allow moving to dropdown
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setHoveredLink(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    // Clear the timeout when entering the dropdown
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    // Immediately close when leaving the dropdown
    setOpenDropdown(null);
    setHoveredLink(null);
  };

  return (
    <nav className="hidden lg:flex items-center gap-1.5">
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.label === "Products" &&
            pathname.startsWith("/special-product"));
        const hasDropdown = link.label === "Products";
        const isHovered = hoveredLink === link.label;

        if (hasDropdown) {
          return (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "text-white shadow-lg shadow-brand/30"
                    : shouldUseSolidStyling
                      ? "text-gray-700 hover:text-gray-900"
                      : theme === "light"
                        ? "text-black/70 hover:text-black"
                        : "text-white/70 hover:text-white"
                }`}
              >
                {/* Active crimson background with metallic shine */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 rounded-lg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                    {/* Animated shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                  </>
                )}

                {/* Hover effect with red undertone */}
                {!isActive && (
                  <div
                    className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      shouldUseSolidStyling
                        ? "bg-gradient-to-br from-gray-100 to-red-50/50 opacity-0 group-hover:opacity-100"
                        : "bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                    }`}
                  />
                )}

                {/* Border glow on hover */}
                {!isActive && (
                  <div
                    className={`border-brand/0 group-hover:border-brand/20 absolute inset-0 rounded-lg  transition-all duration-300`}
                  />
                )}

                <span className="relative z-10 tracking-wide">
                  {link.label}
                </span>
                <ChevronDown
                  className={`relative z-10 w-4 h-4 transition-all duration-300 ${
                    openDropdown === link.label ? "rotate-180" : ""
                  }`}
                />

                {/* Premium metallic underline for active state */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full" />
                )}
              </button>

              {/* Enhanced Dropdown Menu with Crimson Theme */}
              <div
                ref={dropdownRef}
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[420px] mt-2 transition-all duration-300 ${
                  openDropdown === link.label
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-brand/20 overflow-hidden backdrop-blur-xl">
                  {/* Premium red header with metallic effect */}
                  <div className="relative h-2 bg-gradient-to-r from-brand-800 via-brand-700 to-brand-800 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                  </div>

                  <div className="p-4 space-y-2">
                    {productsDropdown.map((item, index) => {
                      const Icon = item.icon;
                      const isItemActive = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenus}
                          className={`group/item relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 overflow-hidden border-2 ${
                            isItemActive
                              ? "bg-gradient-to-br from-red-50 to-orange-50 border-brand-700 shadow-md shadow-brand/10"
                              : "hover:bg-gray-50 border-gray-200 hover:border-gray-300"
                          }`}
                          style={{
                            animationDelay: `${index * 50}ms`,
                          }}
                        >
                          {/* Icon container with custom gradient */}
                          <div
                            className={`relative flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${
                              item.gradient
                            } shadow-lg transition-all duration-300 ${
                              isItemActive
                                ? "scale-105 shadow-xl"
                                : "group-hover/item:scale-105 group-hover/item:shadow-xl"
                            }`}
                          >
                            <Icon className="w-5 h-5 text-white drop-shadow-sm" />

                            {/* Shine effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`font-bold text-base transition-colors duration-300 ${
                                  isItemActive
                                    ? "text-brand"
                                    : "text-gray-900 group-hover/item:text-brand"
                                }`}
                              >
                                {item.label}
                              </span>

                              {/* Active badge with crimson theme */}
                              {isItemActive && (
                                <span className="px-2 py-0.5 text-[10px] font-extrabold text-white bg-brand-700 rounded-md shadow-sm">
                                  ACTIVE
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-gray-600 group-hover/item:text-gray-700 transition-colors duration-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Arrow indicator */}
                          <ChevronDown
                            className={`w-5 h-5 -rotate-90 transition-all duration-300 flex-shrink-0 ${
                              isItemActive
                                ? "text-brand-700 translate-x-0 opacity-100"
                                : "text-gray-400 opacity-0 -translate-x-3 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-brand"
                            }`}
                          />

                          {/* Accent line on left */}
                          <div
                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 ${
                              item.accentColor
                            } ${
                              isItemActive
                                ? "h-12 opacity-100"
                                : "h-0 opacity-0 group-hover/item:h-12 group-hover/item:opacity-100"
                            }`}
                          />

                          {/* Subtle gradient overlay on hover */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover/item:opacity-[0.03] transition-opacity duration-300`}
                          />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Premium CTA Footer */}
                  <div className="px-4 pb-4 pt-2">
                    <Link
                      href="/special-product"
                      className="relative flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white text-sm font-bold rounded-xl shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 transition-all duration-300 group overflow-hidden"
                      onClick={closeMenus}
                    >
                      {/* Metallic shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                      <span className="relative z-10 tracking-wide">
                        Explore All Products
                      </span>
                      <ChevronDown className="relative z-10 w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>

                {/* Dropdown Arrow with red accent */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-brand/20 rotate-45" />
              </div>
            </div>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group relative px-5 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300 overflow-hidden border-none ${
              isActive
                ? "text-white shadow-lg shadow-brand/30"
                : shouldUseSolidStyling
                  ? "text-gray-700 hover:text-gray-900"
                  : theme === "light"
                    ? "text-black/70 hover:text-black"
                    : "text-white/70 hover:text-white"
            }`}
            onClick={closeMenus}
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {/* Active crimson background with metallic depth */}
            {isActive && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                {/* Continuous shimmer animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] rounded-lg" />
              </>
            )}

            {/* Hover effect */}
            {!isActive && (
              <>
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    shouldUseSolidStyling
                      ? "bg-gradient-to-br from-gray-100 to-red-50/50 opacity-0 group-hover:opacity-100"
                      : "bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 rounded-lg border-brand/0 group-hover:border-brand/20 transition-all duration-300`}
                />
              </>
            )}

            <span className="relative z-10 tracking-wide">{link.label}</span>

            {/* Premium metallic underline for active */}
            {isActive && (
              <>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full" />
              </>
            )}

            {/* Hover indicator with red glow */}
            {!isActive && hoveredLink === link.label && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-700 animate-in fade-in zoom-in duration-200 shadow-sm shadow-brand/50" />
            )}
          </Link>
        );
      })}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </nav>
  );
}
