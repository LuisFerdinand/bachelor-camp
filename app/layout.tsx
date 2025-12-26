import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bachelor Camp",
  description:
    "Premium English learning experience with professional facilities and expert instructors",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/Logo.ico", type: "image/ico" }],
    apple: "/Logo.ico",
  },
  // openGraph: {
  //   title: "Bachelor Camp",
  //   description:
  //     "Premium English learning experience with professional facilities and expert instructors",
  //   images: ["/Logo.ico"],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Bachelor Camp",
  //   description:
  //     "Premium English learning experience with professional facilities and expert instructors",
  //   images: ["/Logo.ico"],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TRPCProvider>
          <Toaster position="bottom-right"></Toaster>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
