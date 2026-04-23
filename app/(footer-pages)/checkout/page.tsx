"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Button } from "@/components/atoms/Button";
import { ChevronRight, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
        <ScrollReveal direction="left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14A9AE]/10 dark:bg-black/40 backdrop-blur-md border border-[#2ACED1]/30 mb-8 shadow-sm">
            <ShoppingBag className="w-4 h-4 text-[#2ACED1]" />
            <span className="text-xs font-semibold tracking-wide text-[#000C22] dark:text-[#D8F4F7]">Optimized Checkout</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight leading-[1.1]">
            Increase conversion with a frictionless checkout.
          </h1>
          <p className="text-xl text-[#000C22]/70 dark:text-[#D8F4F7]/70 mb-10 leading-relaxed max-w-lg">
            Use our pre-built checkout page or build your own completely custom UI. Dynamically show the most relevant payment methods to maximize conversion.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="rounded-full shadow-[0_8px_30px_rgb(42,206,209,0.3)] px-8 hover:shadow-[0_12px_40px_rgb(42,206,209,0.5)] transition-all duration-300">
              Start now <ChevronRight className="ml-1 w-5 h-5" />
            </Button>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
           <div className="relative w-full max-w-md mx-auto bg-white dark:bg-[#011B3B] rounded-3xl border border-[#2ACED1]/20 shadow-2xl overflow-hidden shadow-cyan-500/20 p-8">
             <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/10 dark:border-white/10">
               <span className="font-semibold text-lg text-[#000C22] dark:text-white">Pay Kopo Pay</span>
               <span className="font-bold text-2xl text-[#000C22] dark:text-white">$129.00</span>
             </div>
             <div className="space-y-4 mb-6">
                <div className="h-12 w-full bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 animate-pulse" />
                <div className="flex gap-4">
                  <div className="h-12 flex-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 animate-pulse" />
                  <div className="h-12 w-24 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 animate-pulse" />
                </div>
             </div>
             <div className="h-14 w-full bg-[#2ACED1] rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/30">
                Pay Now
             </div>
           </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
