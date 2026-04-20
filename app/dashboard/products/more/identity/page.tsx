"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  BadgeCheck, 
  ShieldCheck, 
  UserCheck, 
  FileSearch, 
  Search, 
  Filter, 
  ArrowRight, 
  AlertTriangle,
  Info
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";

const identities = [
  { 
    id: "ID_501", 
    customer: "Sarah Johnson", 
    type: "Individual", 
    status: "Verified", 
    checkDate: "Feb 12, 2026",
    document: "Passport",
    risk: "Low"
  },
  { 
    id: "ID_502", 
    customer: "Acme Corp Ltd", 
    type: "Business (KYB)", 
    status: "Pending", 
    checkDate: "Apr 18, 2026",
    document: "Articles of Inc.",
    risk: "Medium"
  },
  { 
    id: "ID_503", 
    customer: "Michael Chen", 
    type: "Individual", 
    status: "Manual Review", 
    checkDate: "Apr 20, 2026",
    document: "Driver's License",
    risk: "High"
  },
  { 
    id: "ID_504", 
    customer: "Elena Rodriguez", 
    type: "Individual", 
    status: "Verified", 
    checkDate: "Jan 05, 2026",
    document: "National ID",
    risk: "Low"
  },
];

export default function IdentityPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Identity</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Verify customer identities and manage KYC/KYB compliance.</p>
          </div>
          <div className="flex gap-3">
            <ScrollReveal direction="right" delay={0.1}>
              <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-[#2ACED1]/20 text-[#000C22] dark:text-white font-bold transition-all duration-200"
              >
                Verification Rules
              </motion.button>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* Verification Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Verifications", value: "1,240", icon: "BadgeCheck", accent: "#2ACED1" },
          { label: "Successful", value: "94%", icon: "ShieldCheck", accent: "#008E96" },
          { label: "Needs Review", value: "12", icon: "FileSearch", accent: "#F59E0B" },
          { label: "Risk Flagged", value: "3", icon: "AlertTriangle", accent: "#EF4444" },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/10">
              <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4">
                {(() => {
                  const Icon = getIcon(stat.icon);
                  return <Icon className="w-5 h-5" style={{ color: stat.accent }} />;
                })()}
              </div>
              <p className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-[#000C22] dark:text-white">{stat.value}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification List */}
        <div className="lg:col-span-2">
          <ScrollReveal direction="bottom">
            <div className="rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 overflow-hidden">
              <div className="p-6 border-b border-[#2ACED1]/10 flex items-center justify-between bg-black/5 dark:bg-white/5">
                <h3 className="font-bold text-[#000C22] dark:text-white">Recent Verifications</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#000C22]/30 dark:text-[#D8F4F7]/30" />
                  <input 
                    type="text" 
                    placeholder="Search id..." 
                    className="pl-9 pr-4 py-1.5 rounded-lg bg-white/50 dark:bg-[#011B3B]/50 border border-[#2ACED1]/15 focus:border-[#2ACED1] outline-none text-xs transition-all"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#000C22]/5 dark:border-white/5">
                      <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Customer</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Status</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Doc Type</th>
                      <th className="text-right text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {identities.map((id, i) => (
                      <tr key={id.id} className="border-b border-[#000C22]/5 dark:border-white/5 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white text-[10px] font-bold">
                              {id.customer.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#000C22] dark:text-white group-hover:text-[#2ACED1] transition-colors">{id.customer}</p>
                              <p className="text-[10px] text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-medium">{id.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            id.status === "Verified" ? "bg-emerald-500/10 text-emerald-600" :
                            id.status === "Pending" ? "bg-amber-500/10 text-amber-600" :
                            "bg-red-500/10 text-red-600"
                          }`}>
                            {id.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-xs font-medium text-[#000C22]/60 dark:text-[#D8F4F7]/60">{id.document}</p>
                        </td>
                        <td className="px-6 py-5 text-right font-medium text-[#000C22]/40 dark:text-[#D8F4F7]/40 text-xs">{id.checkDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Requirements & Info */}
        <div className="space-y-6">
          <ScrollReveal direction="right">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30">
              <h4 className="text-xs font-bold text-[#2ACED1] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" /> Compliance Notice
              </h4>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Anti-Money Laundering (AML) regulations require all customers in High Risk regions to undergo multi-factor identity verification including biometric liveness checks.
              </p>
              <button className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[10px] font-bold uppercase transition-all">
                Update Settings
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
              <h4 className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest mb-4">Security Features</h4>
              <div className="space-y-4">
                {[
                  { title: "Liveness Detection", desc: "Prevents spoofing with selfie checks.", status: "Enabled" },
                  { title: "Document OCR", desc: "Automatic information extraction.", status: "Active" },
                  { title: "PeP/Sanctions Screening", desc: "Global database cross-referencing.", status: "Enabled" },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2ACED1] mt-1.5" />
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-xs font-bold text-[#000C22] dark:text-white">{feature.title}</p>
                        <p className="text-[10px] font-bold text-emerald-600">{feature.status}</p>
                      </div>
                      <p className="text-[10px] text-[#000C22]/50 dark:text-[#D8F4F7]/50">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
