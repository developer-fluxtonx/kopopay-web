"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { CheckCircle2 } from "lucide-react";

export default function StatusPage() {
  const services = [
    { name: "API", status: "Operational" },
    { name: "Dashboard", status: "Operational" },
    { name: "Webhooks", status: "Operational" },
    { name: "Checkout", status: "Operational" },
    { name: "Billing", status: "Operational" },
  ];

  return (
    <div className="max-w-[800px] mx-auto px-6">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight">System Status</h1>
          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl w-fit">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">All Systems Operational</span>
          </div>
        </div>
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <div className="bg-white/40 dark:bg-[#011B3B]/40 border border-[#2ACED1]/20 rounded-3xl overflow-hidden shadow-lg backdrop-blur-xl">
          <div className="px-6 py-4 border-b border-[#2ACED1]/10 bg-[#2ACED1]/5">
            <h3 className="font-semibold text-[#000C22] dark:text-white text-lg">Services</h3>
          </div>
          <div className="divide-y divide-[#2ACED1]/10">
            {services.map((service, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between">
                <span className="font-medium text-[#000C22]/80 dark:text-[#D8F4F7]/90">{service.name}</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{service.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
           <p className="text-[#000C22]/50 dark:text-[#D8F4F7]/50 text-sm">
             Uptime over the past 90 days: <span className="font-bold text-[#2ACED1]">99.99%</span>
           </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
