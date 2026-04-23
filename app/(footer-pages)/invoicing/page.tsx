"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Button } from "@/components/atoms/Button";
import { ChevronRight, FileText } from "lucide-react";

export default function InvoicingPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
        <ScrollReveal direction="left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14A9AE]/10 dark:bg-black/40 backdrop-blur-md border border-[#2ACED1]/30 mb-8 shadow-sm">
            <FileText className="w-4 h-4 text-[#2ACED1]" />
            <span className="text-xs font-semibold tracking-wide text-[#000C22] dark:text-[#D8F4F7]">Professional Invoicing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight leading-[1.1]">
            Get paid faster with smart invoices.
          </h1>
          <p className="text-xl text-[#000C22]/70 dark:text-[#D8F4F7]/70 mb-10 leading-relaxed max-w-lg">
            Create, customize, and send professional invoices in minutes. Automate reminders and let your customers pay with one click using Kopo Pay checkout.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="rounded-full shadow-[0_8px_30px_rgb(42,206,209,0.3)] px-8 hover:shadow-[0_12px_40px_rgb(42,206,209,0.5)] transition-all duration-300">
              Start now <ChevronRight className="ml-1 w-5 h-5" />
            </Button>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
           <div className="relative w-full aspect-[4/3] bg-white dark:bg-[#011B3B] rounded-3xl border border-[#2ACED1]/20 shadow-2xl overflow-hidden shadow-cyan-500/20 p-8 flex flex-col">
             <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 bg-[#2ACED1] rounded-xl" />
                <div className="text-right">
                  <h3 className="font-bold text-2xl text-[#000C22] dark:text-white">INVOICE</h3>
                  <p className="text-[#000C22]/50 dark:text-[#D8F4F7]/50 text-sm">#INV-2026-001</p>
                </div>
             </div>
             
             <div className="flex-1">
               <div className="w-full h-8 bg-black/5 dark:bg-white/5 rounded-md mb-3" />
               <div className="w-3/4 h-8 bg-black/5 dark:bg-white/5 rounded-md mb-3" />
               <div className="w-1/2 h-8 bg-black/5 dark:bg-white/5 rounded-md mb-3" />
             </div>
             
             <div className="pt-6 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
                <span className="font-bold text-[#000C22]/70 dark:text-[#D8F4F7]/70">Total Due</span>
                <span className="font-bold text-3xl text-[#2ACED1]">$4,500.00</span>
             </div>
           </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
