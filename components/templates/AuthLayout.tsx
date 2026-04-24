"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLogo } from "../atoms/BrandLogo";

export const AuthLayout = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) => {
  return (
    <div className="min-h-screen flex selection:bg-[#2ACED1] selection:text-white bg-gradient-main dark:bg-[#000C22]">
      {/* Left Marketing Side (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-[#000C22] relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#034E78]/40 via-[#000C22]/80 to-[#000C22] z-0 blur-3xl rounded-full" />
        
        <div className="z-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <BrandLogo
              priority
              size={38}
              labelClassName="font-bold text-xl tracking-tight text-white"
            />
          </Link>
        </div>
        
        <div className="z-10 mb-20 text-white max-w-md">
          <h2 className="text-4xl font-bold tracking-tight mb-4 leading-tight">Scale your business globally.</h2>
          <p className="text-[#D8F4F7]/70 text-lg leading-relaxed">
            Join thousands of businesses that trust Kopo Pay for their financial infrastructure. Start processing payments in minutes.
          </p>
        </div>
        
        <div className="z-10 flex gap-4 text-sm text-[#D8F4F7]/40">
          <Link href="#" className="hover:text-white transition">Terms</Link>
          <Link href="#" className="hover:text-white transition">Privacy</Link>
          <Link href="#" className="hover:text-white transition">Contact</Link>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white dark:bg-[#011B3B] rounded-2xl shadow-xl border border-black/5 dark:border-white/5 p-8"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <BrandLogo
              priority
              size={38}
              labelClassName="font-bold text-xl tracking-tight text-[#000C22] dark:text-white"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2">{title}</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 text-sm">{subtitle}</p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
};
