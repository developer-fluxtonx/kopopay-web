"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, 
  Plus, 
  ChevronRight, 
  TrendingUp, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldCheck,
  Target,
  BarChart3,
  Scale
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from "recharts";

const offerHistory = [
  { id: "cap_01H...", amount: "$50,000", fee: "$6,000", totalRepay: "$56,000", status: "Active", date: "Jan 2026" },
  { id: "cap_02I...", amount: "$15,000", fee: "$1,800", totalRepay: "$16,800", status: "Paid Off", date: "Aug 2025" },
];

const revenueForecast = [
  { month: "Jan", rev: 45000 },
  { month: "Feb", rev: 52000 },
  { month: "Mar", rev: 61000 },
  { month: "Apr", rev: 58000 },
  { month: "May", rev: 72000 },
  { month: "Jun", rev: 85000 },
];

export default function CapitalPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1 flex items-center gap-2">
               <DollarSign className="w-8 h-8 text-[#2ACED1]" />
               Capital
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Fast, flexible funding based on your business volume. No credit checks, just code.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                Check eligibility
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Hero Offer Card ─── */}
      <ScrollReveal direction="bottom">
         <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#011B3B] to-[#034E78] border border-[#2ACED1]/30 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-full bg-[#2ACED1]/5 skew-x-[-20deg] translate-x-32" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2ACED1]/10 border border-[#2ACED1]/20">
                     <TrendingUp className="w-4 h-4 text-[#2ACED1]" />
                     <span className="text-[10px] font-bold text-[#2ACED1] uppercase tracking-[0.2em]">New Offer Available</span>
                  </div>
                  <h2 className="text-4xl font-bold text-white leading-tight">Grow your business <br/>with <span className="text-[#2ACED1]">$125,000</span></h2>
                  <p className="text-white/50 text-sm leading-relaxed max-w-md">
                     We've analyzed your recent sales growth. You are eligible for a pre-approved capital advance with a fixed fee and flexible repayment.
                  </p>
                  <div className="flex items-center gap-8">
                     <div>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Fixed Fee</p>
                        <p className="text-xl font-bold text-white">$14,500</p>
                     </div>
                     <div className="w-px h-10 bg-white/10" />
                     <div>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Repayment Rate</p>
                        <p className="text-xl font-bold text-white">12%</p>
                     </div>
                  </div>
                  <button className="px-8 py-4 rounded-2xl bg-white text-[#011B3B] font-bold text-sm shadow-xl hover:scale-105 transition-all">
                     View Offer Details
                  </button>
               </div>
               
               <div className="bg-black/20 rounded-3xl p-8 border border-white/5 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-8">
                     <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Revenue Forecast Basis</p>
                     <BarChart3 className="w-5 h-5 text-[#2ACED1]" />
                  </div>
                  <div className="h-[200px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueForecast}>
                           <Bar dataKey="rev" fill="#2ACED1" radius={[4, 4, 0, 0]} barSize={25} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex justify-between text-[10px] font-bold text-white/20 uppercase">
                     <span>Estimated payout day: Friday</span>
                     <span>Reliability: 98%</span>
                  </div>
               </div>
            </div>
         </div>
      </ScrollReveal>

      {/* ─── Active & Past Financing ─── */}
      <div className="space-y-4">
         <h2 className="text-lg font-bold dark:text-white">Repayment Activity</h2>
         <div className="grid grid-cols-1 gap-4">
            {offerHistory.map((off, i) => (
               <div key={off.id} className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex flex-wrap items-center justify-between gap-6 transition-all group">
                  <div className="flex items-center gap-6 flex-1 min-w-[250px]">
                     <div className="w-12 h-12 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-[#2ACED1]" />
                     </div>
                     <div>
                        <h4 className="font-bold dark:text-white text-base">Advance {off.id}</h4>
                        <p className="text-xs text-white/40 font-medium">Approved {off.date}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-12">
                     <div className="text-center">
                        <p className="text-sm font-bold dark:text-white">{off.amount}</p>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Paid to you</p>
                     </div>
                     <div className="text-center">
                        <p className="text-sm font-bold dark:text-white">{off.totalRepay}</p>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Total to repay</p>
                     </div>
                     <div className="text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                           off.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                        }`}>
                           {off.status}
                        </span>
                     </div>
                  </div>

                  <button className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                     <ChevronRight className="w-5 h-5 text-white/20" />
                  </button>
               </div>
            ))}
         </div>
      </div>

      {/* ─── How it works ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { title: "No Credit Checks", desc: "Eligibility is determined by your Kopo Pay sales history, not credit scores.", icon: ShieldCheck },
            { title: "Flexible Repayment", desc: "We take a fixed percentage of your daily sales. If sales slow down, your payments do too.", icon: Target },
            { title: "Scale Anywhere", desc: "Use funds for inventory, marketing, or expansion. No restrictions on growth.", icon: Scale },
         ].map((item, i) => {
            const Icon = item.icon;
            return (
               <div key={i} className="p-6 rounded-2xl bg-[#2ACED1]/5 border border-[#2ACED1]/20 group">
                  <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <Icon className="w-5 h-5 text-[#2ACED1]" />
                  </div>
                  <h4 className="font-bold dark:text-white text-sm mb-2">{item.title}</h4>
                  <p className="text-xs dark:text-white/40 leading-relaxed font-medium">{item.desc}</p>
               </div>
            );
         })}
      </div>
    </div>
  );
}
