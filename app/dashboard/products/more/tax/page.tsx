"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Scale, 
  Receipt, 
  MapPin, 
  Calculator, 
  ShieldCheck, 
  ArrowUpRight,
  TrendingUp,
  Landmark
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";

const taxRegimes = [
  { region: "California, US", type: "Sales Tax", rate: "7.25%", status: "Active", volume: "$1.2M", nexus: "Yes" },
  { region: "New York, US", type: "Sales Tax", rate: "8.875%", status: "Active", volume: "$840k", nexus: "Yes" },
  { region: "European Union", type: "VAT", rate: "20% (Avg)", status: "Active", volume: "$2.4M", nexus: "Yes" },
  { region: "United Kingdom", type: "VAT", rate: "20%", status: "Monitored", volume: "$120k", nexus: "No" },
  { region: "Ontario, CAN", type: "HST", rate: "13%", status: "Upcoming", volume: "$45k", nexus: "Threshold near" },
];

export default function TaxPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Tax Compliance</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage nexus, tax calculations, and registration status globally.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(42,206,209,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg transition-all duration-200"
            >
              <Calculator className="w-5 h-5" />
              Tax Settings
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Tax Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Tax Collected", value: "$452,180", detail: "Last 30 days (+12%)", icon: "TrendingUp", accent: "#2ACED1" },
          { label: "Active Registrations", value: "14", detail: "Across 8 countries", icon: "Landmark", accent: "#008E96" },
          { label: "Compliance Score", value: "100%", detail: "All filings verified", icon: "ShieldCheck", accent: "#034E78" },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest">{stat.label}</p>
                {(() => {
                  const Icon = getIcon(stat.icon);
                  return <Icon className="w-5 h-5" style={{ color: stat.accent }} />;
                })()}
              </div>
              <p className="text-2xl font-bold text-[#000C22] dark:text-white mb-1">{stat.value}</p>
              <p className="text-[10px] font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">{stat.detail}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tax Regimes Table */}
        <div className="lg:col-span-2">
          <ScrollReveal direction="bottom">
            <div className="rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 overflow-hidden">
              <div className="p-6 border-b border-[#2ACED1]/10 flex items-center justify-between">
                <h3 className="font-bold text-[#000C22] dark:text-white">Tax Jurisdictions</h3>
                <div className="flex gap-2">
                   <button className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-xs font-bold text-[#000C22] dark:text-white hover:bg-[#2ACED1]/10 transition-colors">
                     Download Reports
                   </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#000C22]/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                      <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Region</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Rate</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Volume</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Nexus</th>
                      <th className="text-right text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxRegimes.map((regime, i) => (
                      <tr key={i} className="border-b border-[#000C22]/5 dark:border-white/5 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#2ACED1]/10 flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-[#2ACED1]" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#000C22] dark:text-white truncate max-w-[120px]">{regime.region}</p>
                              <p className="text-[10px] text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-medium">{regime.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 font-bold text-sm text-[#000C22] dark:text-white">{regime.rate}</td>
                        <td className="px-6 py-5 text-sm font-medium text-[#000C22] dark:text-white">{regime.volume}</td>
                        <td className="px-6 py-5">
                          <p className={`text-[10px] font-bold ${regime.nexus === "Yes" ? "text-emerald-600" : regime.nexus === "No" ? "text-[#000C22]/40 dark:text-[#D8F4F7]/40" : "text-amber-500"}`}>
                            {regime.nexus}
                          </p>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            regime.status === "Active" ? "bg-emerald-500/10 text-emerald-600" :
                            regime.status === "Monitored" ? "bg-amber-500/10 text-amber-600" :
                            "bg-blue-500/10 text-blue-600"
                          }`}>
                            {regime.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <ScrollReveal direction="right">
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
              <div className="flex items-center gap-2 text-[#008E96] mb-4">
                <Receipt className="w-5 h-5" />
                <h4 className="text-sm font-bold uppercase tracking-wider">Automated Filing</h4>
              </div>
              <p className="text-xs text-[#000C22]/60 dark:text-[#D8F4F7]/60 leading-relaxed mb-4">
                KopoPay can automatically file your sales tax returns in over 40 US states and 25 countries. Connect your accounting software to get started.
              </p>
              <button className="w-full py-2.5 rounded-xl bg-[#2ACED1]/10 hover:bg-[#2ACED1]/20 text-[#008E96] text-[10px] font-bold uppercase transition-all">
                Learn More
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30">
              <h4 className="text-xs font-bold text-[#2ACED1] uppercase tracking-widest mb-4">Nexus Alerts</h4>
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white text-[10px] font-bold mb-1">British Columbia, CAN</p>
                  <p className="text-white/50 text-[9px] mb-2">Approaching economic nexus threshold (85%)</p>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[85%]" />
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white text-[10px] font-bold mb-1">Texas, US</p>
                  <p className="text-white/50 text-[9px] mb-2">Nexus reached. Registration required.</p>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
