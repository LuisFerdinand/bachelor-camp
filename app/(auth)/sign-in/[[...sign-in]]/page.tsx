"use client";

import { useSignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();

  const handleGoogle = async () => {
    if (!isLoaded) return;
    await signIn!.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback", // halaman callback (step #6)
      redirectUrlComplete: "/dashboard", // tujuan akhir setelah sukses
    });
  };

  return (
    <main className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Create your account
        </h1>
        <button
          onClick={handleGoogle}
          className="w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
        >
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-600 underline">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
