"use client";

import { buttonVariants } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // Determine back button destination
  const getBackDestination = () => {
    if (pathname.startsWith("/verify-request")) {
      return "back"; // Go to previous page
    }
    return "/"; // Go to home for sign-in and sign-up
  };

  const handleBackClick = (e: React.MouseEvent) => {
    const destination = getBackDestination();
    if (destination === "back") {
      e.preventDefault();
      router.back();
    }
  };
  return (
    <>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative flex min-h-screen max-h-screen flex-col items-center justify-center overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large gradient orbs */}
            <div
              className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-brand-200/40 to-orange-200/40 dark:from-brand-900/20 dark:to-orange-900/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <div
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-red-200/30 to-brand-200/30 dark:from-red-900/20 dark:to-brand-900/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "5s", animationDelay: "1s" }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <Link
            href={getBackDestination() === "back" ? "#" : "/"}
            onClick={handleBackClick}
            className={buttonVariants({
              variant: "outline",
              className:
                "absolute top-4 left-4 md:top-6 md:left-6 z-20 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm bg-background/80",
            })}
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Link>

          {/* Absolute positioned Theme Toggle */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
            <ThemeToggle />
          </div>

          {/* Content Container - Centered vertically and horizontally */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-4 py-8 space-y-2">
            {/* Logo */}
            <div className="flex items-center justify-center flex-shrink-0">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <Link
                  href="/"
                  className="relative z-10 transition-transform hover:scale-105 duration-200"
                >
                  <Image
                    src="/Logo.png"
                    width={80}
                    height={80}
                    alt="Logo"
                    className="w-20 h-20 object-contain drop-shadow-lg"
                  />
                </Link>

                {/* Animated ring */}
                <div
                  className="absolute inset-0 rounded-xl border-2 border-brand-600/30 dark:border-brand-400/30 animate-ping pointer-events-none"
                  style={{ animationDuration: "2s" }}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="w-full">{children}</div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </ThemeProvider>
    </>
  );
};

export default AuthLayout;
