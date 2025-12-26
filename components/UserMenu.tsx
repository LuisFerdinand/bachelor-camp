"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  User,
  LayoutDashboard,
  Heart,
  BookOpen,
  Menu,
  ShoppingBag,
  ChevronRight,
  Sparkles,
  UserCircle,
  X,
  Truck,
  Shield,
  Award,
  Crown,
  ShieldCheck,
  Users,
  PenTool,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { USER_IMAGE_FALLBACK } from "@/constants";
import { ROLES } from "@/db/schema/enums";

type Role = (typeof ROLES)[number];

interface UserMenuProps {
  isOpen: boolean;
  toggle: () => void;
  closeMenus: () => void;
  shouldUseSolidStyling?: boolean;
  isSignedIn: boolean;
}

const roleConfig: Record<
  Role,
  {
    icon: any;
    label: string;
    gradient: string; // for role badge
    badgeColor: string; // solid for compact badge
  }
> = {
  super_admin: {
    icon: Crown,
    label: "Super Admin",
    gradient: "from-yellow-400 to-yellow-600",
    badgeColor: "bg-yellow-500",
  },

  admin: {
    icon: ShieldCheck,
    label: "Admin Academic",
    gradient: "from-brand-500 to-brand-700",
    badgeColor: "bg-brand-600",
  },

  room_master: {
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

};

export const UserMenu = ({
  isOpen,
  toggle,
  closeMenus,
  shouldUseSolidStyling,
  isSignedIn,
}: UserMenuProps) => {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Get user role from Clerk metadata (you can adjust this based on your implementation)
  const userRole = (user?.publicMetadata?.role as Role) || "admin";
  const roleInfo = roleConfig[userRole];
  const RoleIcon = roleInfo.icon;

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      path: "/users/current",
      gradient: "from-slate-600 to-slate-800",
      accentColor: "bg-slate-600",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      gradient: "from-amber-600 to-orange-700",
      accentColor: "bg-amber-600",
    },
    {
      id: "favorites",
      label: "Saved Items",
      icon: Heart,
      path: "/favorites",
      gradient: "from-rose-600 to-red-700",
      accentColor: "bg-rose-600",
    },
    {
      id: "rentals",
      label: "My Rentals",
      icon: Truck,
      path: "/rentals",
      gradient: "from-emerald-600 to-teal-700",
      accentColor: "bg-emerald-600",
    },
    {
      id: "orders",
      label: "My Orders",
      icon: ShoppingBag,
      path: "/orders",
      gradient: "from-blue-600 to-indigo-700",
      accentColor: "bg-blue-600",
    },
  ];

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenus();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        closeMenus();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, closeMenus]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    closeMenus();
    router.push(path);
  };

  const handleSignOut = () => {
    closeMenus();
    signOut();
  };

  return (
    <>
      <div className="relative">
        {/* Premium Menu Button with Crimson Accent */}

        <div
          ref={buttonRef}
          onClick={toggle}
          className={`
          group relative overflow-hidden
          p-1.5 pr-2 md:py-2 md:px-3.5
          border-2 transition-all duration-300 ease-out
          flex flex-row items-center gap-2.5 rounded-full cursor-pointer
          bg-white hover:shadow-lg hover:shadow-[#940101]/20
          ${
            isOpen
              ? "border-[#940101] shadow-lg shadow-[#940101]/20 scale-95"
              : "border-gray-200 hover:border-[#940101]/40"
          }
        `}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="User menu"
        >
          {/* Subtle red gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex items-center gap-2.5">
            <div className="relative">
              <Menu
                className={`size-5 text-gray-700 transition-all duration-300 ${
                  isOpen
                    ? "rotate-90 text-[#940101]"
                    : "group-hover:scale-110 group-hover:text-[#940101]"
                }`}
              />
            </div>

            <div className="hidden md:block relative">
              {/* Glow effect on hover */}
              <div
                className={`absolute inset-0 rounded-full bg-[#940101] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`}
              />
              <Image
                className="rounded-full ring-2 ring-white shadow-md relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:ring-[#940101]/30"
                height={34}
                width={34}
                alt="Avatar"
                src={user?.imageUrl || USER_IMAGE_FALLBACK}
              />
              {/* Premium status indicator */}
              {isSignedIn && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white z-20 shadow-sm">
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </div>
              )}
            </div>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full" />
        </div>

        {/* Enhanced Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={closeMenus}
          />
        )}

        {/* Premium Dropdown Menu - Responsive Design */}
        {isOpen && (
          <div
            ref={menuRef}
            className={`
            fixed md:absolute 
            inset-x-0 bottom-0 md:right-0 md:left-auto md:top-full md:bottom-auto
            md:mt-3 md:w-80
            bg-white 
            rounded-t-3xl md:rounded-2xl 
            shadow-2xl border-2 border-[#940101]/20 
            z-50 
            max-h-[90vh] md:max-h-none
            overflow-hidden
            animate-in slide-in-from-bottom md:slide-in-from-top-4 fade-in duration-300
            md:origin-top-right
          `}
            role="menu"
            aria-orientation="vertical"
          >
            <div className="flex flex-col h-full">
              {isSignedIn ? (
                <>
                  {/* Mobile: Drag Handle */}
                  <div className="md:hidden flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                  </div>

                  {/* Premium User Info Section with Crimson Gradient */}
                  <div className="relative overflow-hidden">
                    {/* Luxurious metallic crimson background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7a0101] via-[#940101] to-[#a80101]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Radial light effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent" />

                    {/* Animated shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

                    {/* Decorative elements */}
                    <div className="absolute inset-0 overflow-hidden opacity-20">
                      <div className="absolute top-6 right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                      <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
                    </div>

                    <div className="relative px-5 md:px-6 py-6 md:py-6 text-white">
                      <div className="flex items-start gap-4">
                        <div className="relative group/avatar flex-shrink-0">
                          {/* Elegant glow */}
                          <div className="absolute inset-0 bg-white/30 rounded-full blur-lg group-hover/avatar:blur-xl transition-all duration-300" />
                          <Image
                            className="rounded-full ring-4 ring-white/40 shadow-xl relative z-10 transition-all duration-300 active:scale-95 md:group-hover/avatar:scale-105 md:group-hover/avatar:ring-white/60"
                            height={72}
                            width={72}
                            alt="Avatar"
                            src={user?.imageUrl || USER_IMAGE_FALLBACK}
                          />
                          {/* Role badge with appropriate icon */}
                          <div
                            className={`absolute -bottom-1 -right-1 p-2 md:p-1.5 bg-gradient-to-br ${roleInfo.gradient} rounded-full shadow-lg z-20 transition-transform duration-300 ring-2 ring-white active:scale-90 md:group-hover/avatar:rotate-12`}
                          >
                            <RoleIcon className="w-4 h-4 md:w-3.5 md:h-3.5 text-white" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 pt-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-xl md:text-xl leading-tight truncate drop-shadow-md">
                              {user?.fullName || "User"}
                            </h3>
                            {/* Role badge */}
                            <div
                              className={`px-2 py-1 md:py-0.5 ${roleInfo.badgeColor} backdrop-blur-sm rounded-md border border-white/30 shadow-sm`}
                            >
                              <span className="text-[10px] font-extrabold tracking-wide text-white leading-none">
                                {roleInfo.label.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm md:text-sm text-white/90 truncate drop-shadow-sm mb-3">
                            {user?.primaryEmailAddress?.emailAddress}
                          </p>
                          {/* Member since */}
                          <div className="flex items-center gap-2 text-xs text-white/80">
                            <Shield className="w-4 h-4 md:w-3.5 md:h-3.5" />
                            <span className="leading-none">
                              Member since 2024
                            </span>
                          </div>
                        </div>

                        {/* Close button */}
                        <button
                          onClick={closeMenus}
                          className="p-2 md:p-1.5 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors duration-200 backdrop-blur-sm -mt-1"
                          aria-label="Close menu"
                        >
                          <X className="w-6 h-6 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Decorative bottom border */}
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>

                  {/* Premium Menu Items - Scrollable on mobile */}
                  <div className="flex-1 overflow-y-auto px-4 md:px-3 py-5 md:py-4 space-y-2 md:space-y-1.5">
                    {menuItems.map((item, index) => {
                      const Icon = item.icon;
                      const isHovered = hoveredItem === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigation(item.path)}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onTouchStart={() => setHoveredItem(item.id)}
                          onTouchEnd={() => setHoveredItem(null)}
                          className="w-full group relative overflow-hidden rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#940101] focus:ring-offset-2 border-gray-200 border active:scale-[0.98]"
                          role="menuitem"
                          style={{
                            animationDelay: `${index * 40}ms`,
                          }}
                        >
                          {/* Gradient background on hover/touch */}
                          <div
                            className={`
                          absolute inset-0 bg-gradient-to-br ${item.gradient}
                          transition-opacity duration-200
                          ${isHovered ? "opacity-5" : "opacity-0"}
                        `}
                          />

                          {/* Border highlight */}
                          <div
                            className={`
                          absolute inset-0 rounded-xl border-2 transition-colors duration-200
                          ${
                            isHovered ? "border-gray-200" : "border-transparent"
                          }
                        `}
                          />

                          <div
                            className={`
                          relative flex items-center gap-4 md:gap-3.5 px-5 py-4 md:px-4 md:py-3.5
                          transition-all duration-200
                          ${isHovered ? "translate-x-1" : ""}
                        `}
                          >
                            {/* Icon with sophisticated gradient */}
                            <div
                              className={`
                            relative p-3 md:p-2.5 rounded-xl bg-gradient-to-br ${
                              item.gradient
                            }
                            transition-all duration-200 shadow-sm
                            ${isHovered ? "scale-110 shadow-lg" : ""}
                          `}
                            >
                              <Icon className="w-5 h-5 md:w-4.5 md:h-4.5 text-white drop-shadow-sm" />
                              {/* Shine overlay */}
                              <div
                                className={`absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transition-opacity duration-200 ${
                                  isHovered ? "opacity-100" : "opacity-0"
                                }`}
                              />
                            </div>

                            {/* Accent bar */}
                            <div
                              className={`
                            absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-200
                            ${item.accentColor}
                            ${
                              isHovered
                                ? "h-12 md:h-10 opacity-100"
                                : "h-0 opacity-0"
                            }
                          `}
                            />

                            <span
                              className={`
                            flex-1 text-left font-semibold text-base md:text-[15px] text-gray-700
                            transition-colors duration-200
                            ${isHovered ? "text-gray-900" : ""}
                          `}
                            >
                              {item.label}
                            </span>

                            <ChevronRight
                              className={`
                            w-5 h-5 text-gray-400 transition-all duration-200
                            ${isHovered ? "translate-x-1 text-[#940101]" : ""}
                          `}
                            />
                          </div>

                          {/* Bottom shimmer on hover */}
                          <div
                            className={`absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent transition-opacity duration-200 ${
                              isHovered ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <Separator className="mx-4 bg-gray-200" />

                  {/* Premium Sign Out Button */}
                  <div className="px-4 md:px-3 py-5 md:py-4 bg-gray-50/50 md:bg-transparent">
                    <button
                      onClick={handleSignOut}
                      onMouseEnter={() => setHoveredItem("signout")}
                      onMouseLeave={() => setHoveredItem(null)}
                      onTouchStart={() => setHoveredItem("signout")}
                      onTouchEnd={() => setHoveredItem(null)}
                      className="w-full group relative overflow-hidden rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#940101] focus:ring-offset-2 border-2 border-transparent hover:border-[#940101]/20 active:scale-[0.98]"
                      role="menuitem"
                    >
                      <div
                        className={`
                      absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50
                      transition-opacity duration-200
                      ${hoveredItem === "signout" ? "opacity-100" : "opacity-0"}
                    `}
                      />

                      <div
                        className={`
                      relative flex items-center gap-4 md:gap-3.5 px-5 py-4 md:px-4 md:py-3.5
                      transition-all duration-200
                      ${hoveredItem === "signout" ? "translate-x-1" : ""}
                    `}
                      >
                        <div
                          className={`
                        p-3 md:p-2.5 rounded-xl bg-gradient-to-br from-[#940101] to-[#7a0101]
                        transition-all duration-200 shadow-sm
                        ${
                          hoveredItem === "signout"
                            ? "scale-110 shadow-lg shadow-[#940101]/30"
                            : ""
                        }
                      `}
                        >
                          <LogOut className="w-5 h-5 md:w-4.5 md:h-4.5 text-white" />
                        </div>

                        <span className="flex-1 text-left font-semibold text-base md:text-[15px] text-[#940101]">
                          Sign Out
                        </span>

                        <ChevronRight
                          className={`
                        w-5 h-5 text-[#940101]/60 transition-all duration-200
                        ${
                          hoveredItem === "signout"
                            ? "translate-x-1 text-[#940101]"
                            : ""
                        }
                      `}
                        />
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Mobile: Drag Handle */}
                  <div className="md:hidden flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                  </div>

                  <div className="p-6 md:p-5 space-y-5 md:space-y-4">
                    {/* Premium welcome section */}
                    <div className="text-center pb-4 md:pb-3">
                      <div className="relative inline-flex items-center justify-center w-24 h-24 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#940101] via-[#a80101] to-[#7a0101] mb-5 md:mb-4 shadow-xl shadow-[#940101]/30 overflow-hidden">
                        {/* Animated shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        <UserCircle className="w-12 h-12 md:w-10 md:h-10 text-white relative z-10 drop-shadow-lg" />
                      </div>
                      <h3 className="font-bold text-3xl md:text-2xl text-gray-900 mb-3 md:mb-2 tracking-tight">
                        Welcome Back
                      </h3>
                      <p className="text-base md:text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                        Sign in to access premium features and manage your
                        equipment
                      </p>
                    </div>

                    {/* Premium Sign In Button */}
                    <SignInButton mode="modal">
                      <button className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#940101] via-[#a80101] to-[#7a0101] transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md hover:shadow-[#940101]/30 focus:outline-none focus:ring-2 focus:ring-[#940101] focus:ring-offset-2 active:scale-[0.98]">
                        {/* Metallic overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <div className="relative px-6 py-4.5 md:py-4 flex items-center justify-center gap-3 md:gap-2.5">
                          <UserCircle className="w-6 h-6 md:w-5 md:h-5 text-white transition-transform duration-200 drop-shadow-sm" />
                          <span className="font-bold text-base md:text-[15px] text-white leading-none tracking-wide">
                            Sign In
                          </span>
                        </div>
                      </button>
                    </SignInButton>

                    {/* Elegant Sign Up Button */}
                    <SignUpButton mode="modal">
                      <button className="w-full group relative overflow-hidden rounded-xl border-2 border-[#940101]/30 hover:border-[#940101] bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#940101] focus:ring-offset-2 hover:shadow-md active:scale-[0.98]">
                        <div className="relative px-6 py-4.5 md:py-4 flex items-center justify-center gap-3 md:gap-2.5">
                          <Sparkles className="w-6 h-6 md:w-5 md:h-5 text-[#940101] transition-transform duration-200" />
                          <span className="font-bold text-base md:text-[15px] text-[#940101] leading-none tracking-wide">
                            Create Account
                          </span>
                        </div>
                      </button>
                    </SignUpButton>

                    {/* Feature highlights with crimson accents */}
                    <div className="pt-4 md:pt-3 space-y-4 md:space-y-3 border-t border-gray-200">
                      <div className="flex items-start gap-3.5 md:gap-3 text-base md:text-sm text-gray-700 group hover:text-gray-900 transition-colors duration-200">
                        <div className="p-2 md:p-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex-shrink-0 shadow-sm transition-transform duration-200 active:scale-90">
                          <Sparkles className="w-4 h-4 md:w-3.5 md:h-3.5 text-white" />
                        </div>
                        <span className="leading-relaxed pt-0.5">
                          Access exclusive equipment and special deals
                        </span>
                      </div>
                      <div className="flex items-start gap-3.5 md:gap-3 text-base md:text-sm text-gray-700 group hover:text-gray-900 transition-colors duration-200">
                        <div className="p-2 md:p-1.5 rounded-lg bg-gradient-to-br from-[#940101] to-[#7a0101] flex-shrink-0 shadow-sm transition-transform duration-200 active:scale-90">
                          <Heart className="w-4 h-4 md:w-3.5 md:h-3.5 text-white" />
                        </div>
                        <span className="leading-relaxed pt-0.5">
                          Save favorites and track your rental history
                        </span>
                      </div>
                      <div className="flex items-start gap-3.5 md:gap-3 text-base md:text-sm text-gray-700 group hover:text-gray-900 transition-colors duration-200">
                        <div className="p-2 md:p-1.5 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 flex-shrink-0 shadow-sm transition-transform duration-200 active:scale-90">
                          <Shield className="w-4 h-4 md:w-3.5 md:h-3.5 text-white" />
                        </div>
                        <span className="leading-relaxed pt-0.5">
                          Premium support and verified equipment
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

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
      </div>
    </>
  );
};
