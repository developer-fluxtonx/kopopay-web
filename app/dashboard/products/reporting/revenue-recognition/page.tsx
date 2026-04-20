"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Scale, 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Info, 
  Calendar, 
  Download, 
  Filter, 
  ArrowUpRight,
  Database,
  History,
  Target
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const revRecData = [
  { name: "Jan", recognized: 45000, deferred: 120000 },
  { name: "Feb", recognized: 48000, deferred: 115000 },
  { name: "Mar", recognized: 52000, deferred: 108000 },
  { name: "Apr", recognized: 55000, deferred: 95000 },
  { name: "May", recognized: 61000, deferred: 82000 },
  { name: "Jun", recognized: 68000, deferred: 70000 },
];

export default function RevenueRecognitionPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1 flex items-center gap-3">
               <Scale className="w-8 h-8 text-[#2ACED1]" />
               Revenue Recognition
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">ASC 606 / IFRS 15 compliance. Automated scheduling and deferred revenue tracking.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white text-sm font-bold shadow-lg">
                <Download className="w-4 h-4" /> Export Report
             </button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Revenue Waterfall ─── */}
      <ScrollReveal direction="bottom">
         <div className="p-8 rounded-[2rem] bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm shadow-xl">
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
               <div>
                  <h3 className="text-xl font-bold dark:text-white">Revenue Waterfall</h3>
                  <p className="text-xs text-[#000C22]/40 dark:text-white/40 font-bold uppercase tracking-widest mt-1">Recognized vs Deferred Balances</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-[#2ACED1]" />
                     <span className="text-xs font-bold dark:text-white/60">Recognized</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-[#034E78]" />
                     <span className="text-xs font-bold dark:text-white/60">Deferred</span>
                  </div>
               </div>
            </div>
            <div className="h-[350px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revRecData}>
                     <defs>
                        <linearGradient id="recGrad" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#2ACED1" stopOpacity={0.2} />
                           <stop offset="100%" stopColor="#2ACED1" stopOpacity={0} />
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(42,206,209,0.05)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                     <Tooltip contentStyle={{ backgroundColor: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "12px", color: "#fff" }} />
                     <Area type="monotone" dataKey="deferred" stroke="#034E78" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
                     <Area type="monotone" dataKey="recognized" stroke="#2ACED1" strokeWidth={3} fill="url(#recGrad)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </ScrollReveal>

      {/* ─── Compliance Modules ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {[
            { title: "Rulesets", value: "3 Active", icon: Target, desc: "SaaS Subscription, Add-on, and Professional Services rules." },
            { title: "Deferred Liab.", value: "$1.2M", icon: History, desc: "Total revenue currently held in the deferred liability ledger." },
            { title: "Close Status", value: "June Open", icon: CheckCircle2, desc: "Financial period for June 2026 is currently open for adjustment." },
         ].map((module, i) => {
            const Icon = module.icon;
            return (
               <div key={i} className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center mb-4">
                     <Icon className="w-5 h-5 text-[#2ACED1]" />
                  </div>
                  <h4 className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/40 uppercase tracking-widest mb-1">{module.title}</h4>
                  <p className="text-2xl font-bold dark:text-white mb-2">{module.value}</p>
                  <p className="text-xs text-[#000C22]/50 dark:text-white/50">{module.desc}</p>
                  <button className="mt-6 flex items-center gap-1 text-[10px] font-bold text-[#2ACED1] uppercase tracking-tighter hover:underline">
                     Configure Module <ArrowUpRight className="w-3 h-3" />
                  </button>
               </div>
            );
         })}
      </div>

      {/* ─── Info Alert ─── */}
      <div className="p-6 rounded-2xl bg-[#034E78]/10 border border-[#034E78]/30 flex items-start gap-4">
         <Info className="w-6 h-6 text-[#2ACED1] shrink-0" />
         <div>
            <h4 className="font-bold dark:text-white text-sm mb-1">Automatic Compliance Handling</h4>
            <p className="text-xs dark:text-white/60 leading-relaxed max-w-4xl">
               Kopo Pay automatically calculates recognized revenue for all recurring billing entities based on your configured rulesets. Adjustments can be made to deferred revenue entries through the manual reconciliation panel.
            </p>
         </div>
      </div>
    </div>
  );
}
