"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SsoCallbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <AuthenticateWithRedirectCallback />
      <div className="animate-spin h-6 w-6 rounded-full border-2 border-brand-600 border-t-transparent" />
      <p className="text-sm text-gray-500">Finalizing login…</p>
    </div>
  );
}
