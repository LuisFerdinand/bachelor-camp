// app/(auth)/sign-up/_components/SignUpForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useTransition } from "react";
import {
  Loader2,
  Mail,
  ArrowRight,
  Lock,
  Sparkles,
  Send,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  const signUpWithGoogle = () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Account created with Google");
          },
          onError: (error) => {
            toast.error(error.error?.message ?? "Google sign-up failed");
          },
        },
      });
    });
  };

  const signUpWithEmail = () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification code sent to your email");
            router.push(
              `/verify-request?email=${encodeURIComponent(email)}&type=sign-up`
            );
          },
          onError: (error) => {
            toast.error(
              error.error?.message ?? "Failed to send verification code"
            );
          },
        },
      });
    });
  };

  return (
    <>
      {/* Main card */}
      <div className="relative group">
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 dark:from-emerald-700 dark:via-emerald-600 dark:to-green-600 rounded-2xl blur-xl opacity-20 dark:opacity-30 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-500" />

        {/* Card */}
        <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden">
          {/* Premium header accent */}
          <div className="relative h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 dark:from-emerald-600 dark:via-emerald-500 dark:to-green-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
          </div>

          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  Join us today
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-2">
                Create your account
              </h1>
              <p className="text-muted-foreground text-sm">
                Start your journey with us in seconds
              </p>
            </div>

            {/* Google Sign Up Button */}
            <Button
              onClick={signUpWithGoogle}
              disabled={googlePending}
              variant="outline"
              size="lg"
              className="w-full relative group/btn overflow-hidden border-2 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 h-12"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

              {/* Button content */}
              <div className="relative flex items-center justify-center gap-3">
                {googlePending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-semibold">Creating account...</span>
                  </>
                ) : (
                  <>
                    {/* Google Icon */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
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
                    <span className="font-semibold">Continue with Google</span>
                  </>
                )}
              </div>
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground font-medium">
                  Or sign up with email
                </span>
              </div>
            </div>

            {/* Email Sign Up Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                    disabled={emailPending}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && email) {
                        signUpWithEmail();
                      }
                    }}
                  />
                </div>
              </div>

              <Button
                onClick={signUpWithEmail}
                disabled={!email || emailPending}
                size="lg"
                className="w-full h-11 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-emerald-600 dark:to-emerald-700 dark:hover:from-emerald-500 dark:hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/30 transition-all duration-200 group/email"
              >
                {emailPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </div>

            {/* Footer text */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors inline-flex items-center gap-1 group/link"
                >
                  Sign in
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                </Link>
              </p>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 pt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-medium">Secure</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="font-medium">Free</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-emerald-600 dark:text-emerald-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Instant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>

      {/* Terms of service */}
      <p className="text-center text-xs text-muted-foreground px-4 mt-2">
        By continuing, you agree to our{" "}
        <Link
          href="/terms"
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors"
        >
          Privacy Policy
        </Link>
      </p>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};
