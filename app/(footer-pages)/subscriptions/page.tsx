"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Button } from "@/components/atoms/Button";
import { ChevronRight, Repeat } from "lucide-react";

export default function SubscriptionsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
        <ScrollReveal direction="left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14A9AE]/10 dark:bg-black/40 backdrop-blur-md border border-[#2ACED1]/30 mb-8 shadow-sm">
            <Repeat className="w-4 h-4 text-[#2ACED1]" />
            <span className="text-xs font-semibold tracking-wide text-[#000C22] dark:text-[#D8F4F7]">Smart Billing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight leading-[1.1]">
            Build and scale recurring revenue.
          </h1>
          <p className="text-xl text-[#000C22]/70 dark:text-[#D8F4F7]/70 mb-10 leading-relaxed max-w-lg">
            A complete billing engine to support any pricing model. Handle subscriptions, usage-based billing, trials, and invoices seamlessly.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="rounded-full shadow-[0_8px_30px_rgb(42,206,209,0.3)] px-8 hover:shadow-[0_12px_40px_rgb(42,206,209,0.5)] transition-all duration-300">
              Start now <ChevronRight className="ml-1 w-5 h-5" />
            </Button>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
           <div className="relative w-full max-w-lg mx-auto space-y-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="bg-white/60 dark:bg-[#011B3B]/60 backdrop-blur-sm border border-[#2ACED1]/20 rounded-2xl p-6 shadow-lg shadow-cyan-500/5 flex items-center justify-between hover:scale-105 transition-transform duration-300">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white font-bold">
                     {i === 1 ? 'Pro' : i === 2 ? 'Team' : 'Ent'}
                   </div>
                   <div>
                     <h4 className="font-bold text-[#000C22] dark:text-white">Monthly Subscription</h4>
                     <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">Renews on {new Date().toLocaleDateString()}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-lg text-[#000C22] dark:text-white">${i * 29}.00</p>
                   <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
                 </div>
               </div>
             ))}
           </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
