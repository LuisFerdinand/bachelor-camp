// app/(auth)/verify-request/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useTransition, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Loader2,
  Mail,
  ShieldCheck,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const VerifyRequest = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [verifyPending, startVerifyTransition] = useTransition();
  const [resendPending, startResendTransition] = useTransition();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const params = useSearchParams();
  const email = params.get("email") as string;
  const type = params.get("type") || "sign-in"; // Default to sign-in if no type specified
  const isSignUp = type === "sign-up";
  const isOtpCompleted = otp.length === 6;

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (!isOtpCompleted || verifyPending) return;
    verifyOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOtpCompleted]);

  function verifyOtp() {
    startVerifyTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              isSignUp
                ? "Account created successfully!"
                : "Email verified successfully!"
            );
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error?.message ?? "Invalid verification code");
            setOtp(""); // Clear OTP on error
          },
        },
      });
    });
  }

  function resendOtp() {
    if (!canResend) return;

    startResendTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("New verification code sent!");
            setCountdown(60);
            setCanResend(false);
            setOtp("");
          },
          onError: (error) => {
            toast.error(
              error.error?.message ?? "Failed to resend verification code"
            );
          },
        },
      });
    });
  }

  if (!email) {
    router.push(isSignUp ? "/sign-up" : "/sign-in");
    return null;
  }

  const backUrl = isSignUp ? "/sign-up" : "/sign-in";
  const backText = isSignUp ? "sign up" : "sign in";
  const headerText = isSignUp ? "Verify Your Email" : "Check Your Email";
  const headerAccent = isSignUp
    ? "from-emerald-700 via-emerald-600 to-green-600 dark:from-emerald-600 dark:via-emerald-500 dark:to-green-500"
    : "from-brand-700 via-brand-600 to-blue-600 dark:from-brand-600 dark:via-brand-500 dark:to-blue-500";
  const glowEffect = isSignUp
    ? "from-emerald-600 via-emerald-500 to-green-500 dark:from-emerald-700 dark:via-emerald-600 dark:to-green-600"
    : "from-brand-600 via-brand-500 to-blue-500 dark:from-brand-700 dark:via-brand-600 dark:to-blue-600";

  return (
    <>
      {/* Main card */}
      <div className="relative group">
        {/* Glow effect behind card */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${glowEffect} rounded-2xl blur-xl opacity-20 dark:opacity-30 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-500`}
        />

        {/* Card */}
        <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden">
          {/* Premium header accent */}
          <div
            className={`relative h-1.5 bg-gradient-to-r ${headerAccent} overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
          </div>

          <div className="p-6 sm:p-8">
            {/* Icon Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-2">
                {headerText}
              </h1>
              <p className="text-sm text-muted-foreground max-w-sm">
                We've sent a 6-digit verification code to
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${isSignUp ? "text-emerald-600 dark:text-emerald-400" : "text-brand-600 dark:text-brand-400"}`}
              >
                {email}
              </p>
            </div>

            {/* OTP Input */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-col items-center space-y-3">
                <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  maxLength={6}
                  disabled={verifyPending}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={0}
                      className={`w-12 h-14 text-lg font-bold border-2 rounded-xl transition-all duration-200 ${isSignUp ? "focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-emerald-500/20" : "focus:border-brand-600 dark:focus:border-brand-500 focus:ring-brand-500/20"} focus:ring-2`}
                    />
                    <InputOTPSlot
                      index={1}
                      className={`w-12 h-14 text-lg font-bold border-2 rounded-xl transition-all duration-200 ${isSignUp ? "focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-emerald-500/20" : "focus:border-brand-600 dark:focus:border-brand-500 focus:ring-brand-500/20"} focus:ring-2`}
                    />
                    <InputOTPSlot
                      index={2}
                      className={`w-12 h-14 text-lg font-bold border-2 rounded-xl transition-all duration-200 ${isSignUp ? "focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-emerald-500/20" : "focus:border-brand-600 dark:focus:border-brand-500 focus:ring-brand-500/20"} focus:ring-2`}
                    />
                  </InputOTPGroup>
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={3}
                      className={`w-12 h-14 text-lg font-bold border-2 rounded-xl transition-all duration-200 ${isSignUp ? "focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-emerald-500/20" : "focus:border-brand-600 dark:focus:border-brand-500 focus:ring-brand-500/20"} focus:ring-2`}
                    />
                    <InputOTPSlot
                      index={4}
                      className={`w-12 h-14 text-lg font-bold border-2 rounded-xl transition-all duration-200 ${isSignUp ? "focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-emerald-500/20" : "focus:border-brand-600 dark:focus:border-brand-500 focus:ring-brand-500/20"} focus:ring-2`}
                    />
                    <InputOTPSlot
                      index={5}
                      className={`w-12 h-14 text-lg font-bold border-2 rounded-xl transition-all duration-200 ${isSignUp ? "focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-emerald-500/20" : "focus:border-brand-600 dark:focus:border-brand-500 focus:ring-brand-500/20"} focus:ring-2`}
                    />
                  </InputOTPGroup>
                </InputOTP>

                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Enter the 6-digit code from your email
                </p>
              </div>

              {/* Verify Button */}
              <Button
                onClick={verifyOtp}
                disabled={!isOtpCompleted || verifyPending}
                size="lg"
                className={`w-full h-12 ${isSignUp ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-emerald-600 dark:to-emerald-700 dark:hover:from-emerald-500 dark:hover:to-emerald-600 shadow-emerald-500/20 dark:shadow-emerald-900/30" : "bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 dark:from-brand-600 dark:to-brand-700 dark:hover:from-brand-500 dark:hover:to-brand-600 shadow-brand-500/20 dark:shadow-brand-900/30"} text-white shadow-lg transition-all duration-200 group/verify`}
              >
                {verifyPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : isOtpCompleted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    {isSignUp ? "Create Account" : "Verify & Continue"}
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 mr-2" />
                    Enter Code to Verify
                  </>
                )}
              </Button>
            </div>

            {/* Resend Section */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-3 text-muted-foreground font-medium">
                    Didn't receive the code?
                  </span>
                </div>
              </div>

              <Button
                onClick={resendOtp}
                disabled={!canResend || resendPending}
                variant="outline"
                size="lg"
                className={`w-full h-11 border-2 ${isSignUp ? "hover:border-emerald-300 dark:hover:border-emerald-700" : "hover:border-brand-300 dark:hover:border-brand-700"} transition-all duration-200`}
              >
                {resendPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : canResend ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Code
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend in {countdown}s
                  </>
                )}
              </Button>
            </div>

            {/* Back Link */}
            <div className="mt-6 text-center">
              <Link
                href={backUrl}
                className={`inline-flex items-center gap-2 text-sm text-muted-foreground ${isSignUp ? "hover:text-emerald-600 dark:hover:text-emerald-400" : "hover:text-brand-600 dark:hover:text-brand-400"} transition-colors group/back`}
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover/back:-translate-x-0.5" />
                Back to {backText}
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 text-xs text-blue-900 dark:text-blue-100">
                  <p className="font-semibold mb-1">Can't find the email?</p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Check your spam folder or wait a few moments for the email
                    to arrive. The code expires in 10 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default VerifyRequest;
