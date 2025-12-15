"use client";

import { useSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogle = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    try {
      await signIn!.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-brand-200/40 to-orange-200/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-red-200/30 to-brand-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo placeholder - you'll replace this */}
          <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Your logo */}
              <Link href={"/"}>
                <Image
                  src="/Logo.png" // change this to your logo path
                  width={100}
                  height={100}
                  alt="Logo"
                  className="w-16 h-16 object-contain"
                />
              </Link>

              {/* Animated ring */}
              <div
                className="absolute inset-0 rounded-xl border-2 border-brand/20 animate-ping"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>

          {/* Main card */}
          <div className="relative group">
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 via-red-500 to-orange-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

            {/* Card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              {/* Premium header accent */}
              <div className="relative h-2 bg-gradient-to-r from-brand-800 via-brand-600 to-orange-600 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>

              <div className="p-8 sm:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-brand-800 to-gray-900 bg-clip-text text-transparent mb-3">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 text-base">
                    Sign in to continue to your account
                  </p>
                </div>

                {/* Google Sign In Button */}
                <button
                  onClick={handleGoogle}
                  disabled={!isLoaded || isLoading}
                  className="group/btn relative w-full overflow-hidden rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Button background layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 transition-transform duration-300 group-hover/btn:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-3 px-6 py-4 text-white">
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span className="font-semibold">Signing in...</span>
                      </>
                    ) : (
                      <>
                        {/* Google Icon */}
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        <span className="font-semibold text-base">
                          Continue with Google
                        </span>
                      </>
                    )}
                  </div>

                  {/* Button border glow */}
                  <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover/btn:border-white/40 transition-colors duration-300" />
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-gray-500 font-medium">
                      Secure authentication powered by Google
                    </span>
                  </div>
                </div>

                {/* Footer text */}
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a
                      href="/sign-up"
                      className="relative font-semibold text-brand-700 hover:text-brand-800 transition-colors inline-flex items-center gap-1 group/link"
                    >
                      Create account
                      <svg
                        className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </p>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 pt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Secure</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Private</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 text-brand-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Fast</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-1 bg-gradient-to-r from-transparent via-brand-600/20 to-transparent" />
            </div>
          </div>

          {/* Terms of service */}
          <p className="text-center text-xs text-gray-500 mt-6 px-4">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="text-brand-700 hover:text-brand-800 underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-brand-700 hover:text-brand-800 underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

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
    </main>
  );
}
