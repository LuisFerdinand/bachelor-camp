import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/trpc/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bachelor Camp",
  description:
    "Premium English learning experience with professional facilities and expert instructors",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/Logo.ico", type: "image/ico" }],
    apple: "/Logo.ico",
  },
  openGraph: {
    title: "Bachelor Camp",
    description:
      "Premium English learning experience with professional facilities and expert instructors",
    images: ["/Logo.ico"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bachelor Camp",
    description:
      "Premium English learning experience with professional facilities and expert instructors",
    images: ["/Logo.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TRPCProvider>{children}</TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
