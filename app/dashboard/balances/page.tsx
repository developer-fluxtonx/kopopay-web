"use client";

import React, { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  TrendingUp,
  Building2,
  ExternalLink,
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

// Animated counter for stats
const DashCounter = ({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) => {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => prefix + (Math.round(v) || 0).toLocaleString() + suffix);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, target]);

  return <motion.span>{display}</motion.span>;
};

// Use centralized mock data from `lib/api.ts` instead of local fallback arrays

export default function BalancesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: balance } = useApi(() => api.getBalance(), [], true);
  const { data: payoutsFetched } = useApi(() => api.getPayouts(), [], true);
  
  if (!mounted) return null;
  
  const displayedPayouts = payoutsFetched ?? [];

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">Financial Treasury</h1>
          <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">Real-time breakdown of your capital, pending settlements, and global payout status.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] text-[#000C22] dark:text-white font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-black/[0.05] dark:hover:bg-white/[0.05]">
             Treasury Settings
           </button>
           <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2ACED1] text-white font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-[#2ACED1]/20 active:scale-95">
             Transfer Funds
             <ArrowUpRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* ─── Main Balance Overview ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="p-12 rounded-[3rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30 relative overflow-hidden h-full flex flex-col justify-between shadow-2xl shadow-[#2ACED1]/5">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
               <Wallet className="w-56 h-56 text-[#2ACED1]" />
            </div>
            
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                  <div className="h-2 w-2 rounded-full bg-[#2ACED1] animate-pulse shadow-[0_0_8px_rgba(42,206,209,0.5)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2ACED1]/80">Vault Liquidity</span>
               </div>
               <h2 className="text-6xl font-bold text-white tracking-tighter mb-6">
                 <DashCounter target={balance?.available ?? 42580} prefix="$" />
               </h2>
               <div className="flex flex-wrap items-center gap-8">
                  <div className="flex items-center gap-2.5 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                     <CheckCircle2 className="w-4 h-4 text-[#2ACED1]" />
                     Instant Settlement Ready
                  </div>
                  <div className="flex items-center gap-2.5 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                     <Building2 className="w-4 h-4 text-[#2ACED1]" />
                     Verified Bank: •••• 9012
                  </div>
               </div>
            </div>

            <div className="mt-16 p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-xl flex items-center justify-between relative z-10">
               <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Cycle Horizon</p>
                  <p className="text-sm font-bold text-white tracking-tight">Next Payout: April 28</p>
               </div>
               <div className="h-10 w-px bg-white/10" />
               <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Estimated Yield</p>
                  <p className="text-sm font-bold text-[#2ACED1] tracking-tight">$3,420.00</p>
               </div>
               <button className="w-12 h-12 rounded-2xl bg-[#2ACED1]/10 text-[#2ACED1] flex items-center justify-center hover:bg-[#2ACED1]/20 transition-all active:scale-90">
                  <ExternalLink className="w-5 h-5" />
               </button>
            </div>
          </div>
        </div>

        <div className="space-y-10">
           {[
             { label: "Pending Reserve", value: 8940, prefix: "$", icon: "Clock", color: "#F59E0B", desc: "Settling in 2.5 days" },
             { label: "Stability Buffer", value: 2500, prefix: "$", icon: "Shield", color: "#6B7280", desc: "Escrowed protection" },
           ].map((item, i) => (
             <div
               key={i}
               className="p-10 rounded-[3rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 flex flex-col justify-between h-[calc(50%-20px)] shadow-sm hover:border-[#2ACED1]/20 transition-all duration-500"
             >
                <div className="flex items-center justify-between mb-6">
                   <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03]" style={{ color: item.color }}>
                      {(() => {
                        const Icon = getIcon(item.icon as string);
                        return <Icon className="w-6 h-6" />;
                      })()}
                   </div>
                   <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/20 uppercase tracking-[0.2em] mb-2">{item.label}</p>
                   <p className="text-3xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">
                      <DashCounter target={item.value} prefix={item.prefix} />
                   </p>
                   <p className="text-[10px] font-medium text-[#000C22]/40 dark:text-white/30">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* ─── Payouts History ─── */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#000C22] dark:text-white tracking-tight">Settlement Records</h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#000C22]/30 dark:text-white/30 mt-1">Audit log of all outbound transfers</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-[10px] font-bold uppercase tracking-widest text-[#000C22]/50 dark:text-white/40">Filters</button>
             <button className="px-5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-[10px] font-bold uppercase tracking-widest text-[#000C22]/50 dark:text-white/40">Export</button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#011B3B] rounded-[2.5rem] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                     <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20">Ref ID</th>
                     <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20">Maturity Date</th>
                     <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20">Destination</th>
                     <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20">Gross Amount</th>
                     <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20 text-right">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {displayedPayouts.map((pay) => (
                    <tr key={pay.id} className="hover:bg-[#2ACED1]/5 transition-all group cursor-pointer">
                       <td className="px-10 py-8 text-xs font-bold text-[#000C22] dark:text-white/90 font-mono">{pay.id}</td>
                       <td className="px-10 py-8 text-xs font-medium text-[#000C22]/60 dark:text-white/40">{pay.date}</td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center text-[#2ACED1]">
                                <Building2 className="w-5 h-5" />
                             </div>
                             <span className="text-xs font-bold text-[#000C22] dark:text-white/90">{pay.bank}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-xs font-bold text-[#000C22] dark:text-white/90">{pay.amount}</td>
                       <td className="px-10 py-8 text-right">
                          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest ${
                            pay.status === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-cyan-500/10 text-cyan-500"
                          }`}>
                            {pay.status}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
