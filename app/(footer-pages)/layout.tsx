import React from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

export default function FooterPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#000C22] selection:bg-[#2ACED1] selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-32 pb-16 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-b from-[#2ACED1]/10 to-transparent blur-[120px] pointer-events-none -z-10" />
        {children}
      </main>
      <Footer />
    </div>
  );
}
