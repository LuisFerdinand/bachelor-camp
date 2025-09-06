import FloatingWhatsApp from "@/components/common/FloatingWA";
import Footer from "@/components/layout/Footer";
// import { TRPCProvider } from "@/trpc/client";
import React from "react";
import { HomeNavbar } from "../components/HomeNavbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}
export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div>
      <HomeNavbar />
      <main className="relative">{children}</main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
};
