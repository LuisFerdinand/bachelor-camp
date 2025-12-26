"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSignOut() {
  const router = useRouter();
  const handleSignOut = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfully");
        },
        onError: () => {
          toast.error("Failed to sign out. Please try again.");
        },
      },
    });
  };
  return handleSignOut;
}
