"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  LifeBuoy, 
  RefreshCw, 
  Mail, 
  ShieldCheck, 
  Plus, 
  ChevronRight, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  Target
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const recoveryData = [
  { name: "Mon", recovered: 1200, lost: 300 },
  { name: "Tue", recovered: 1900, lost: 450 },
  { name: "Wed", recovered: 1500, lost: 200 },
  { name: "Thu", recovered: 2100, lost: 600 },
  { name: "Fri", recovered: 2600, lost: 150 },
  { name: "Sat", recovered: 1800, lost: 100 },
  { name: "Sun", recovered: 950, lost: 50 },
];

const smartRetries = [
  { id: "srt_01...", name: "Optimal Window Retry", status: "Active", count: 1245, success: "18.4%" },
  { id: "srt_02...", name: "Weekend Pause", status: "Active", count: 842, success: "12.1%" },
  { id: "srt_03...", name: "Expiring Card Pre-auth", status: "Paused", count: 0, success: "0%" },
];

export default function RevenueRecoveryPage() {
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
               <LifeBuoy className="w-8 h-8 text-[#2ACED1]" />
               Revenue Recovery
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Capture every possible dollar. Smart retries, dunning emails, and churn prevention.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Create recovery rule
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Recovery Performance Card ─── */}
      <ScrollReveal direction="bottom">
         <div className="p-8 rounded-[2rem] bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm shadow-xl flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 space-y-6">
               <div>
                  <p className="text-[10px] font-bold text-[#2ACED1] uppercase tracking-[0.3em] mb-2">Recovered (Last 30d)</p>
                  <p className="text-4xl font-bold dark:text-white">$14,280.50</p>
               </div>
               <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-xs font-bold text-emerald-600 mb-1 flex items-center gap-2">
                     <TrendingUp className="w-4 h-4" /> Optimization Active
                  </p>
                  <p className="text-xs text-emerald-600/70">Kopo Pay's ML retry logic is recovering 12% more revenue than basic retries.</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                     <p className="text-[10px] font-bold text-white/30 uppercase mb-1">Success Rate</p>
                     <p className="text-lg font-bold dark:text-white">24.1%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                     <p className="text-[10px] font-bold text-white/30 uppercase mb-1">Dunning ROI</p>
                     <p className="text-lg font-bold dark:text-white">12x</p>
                  </div>
               </div>
            </div>

            <div className="lg:w-2/3 h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={recoveryData}>
                     <defs>
                        <linearGradient id="recovGrad" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#2ACED1" stopOpacity={0.2} />
                           <stop offset="100%" stopColor="#2ACED1" stopOpacity={0} />
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(42,206,209,0.05)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                     <YAxis hide />
                     <Tooltip contentStyle={{ backgroundColor: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "12px", color: "#fff" }} />
                     <Area type="monotone" dataKey="recovered" stroke="#2ACED1" strokeWidth={3} fill="url(#recovGrad)" />
                     <Area type="monotone" dataKey="lost" stroke="#EF4444" strokeWidth={1} strokeDasharray="3 3" fill="transparent" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </ScrollReveal>

      {/* ─── Smart Retries & Emails ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="space-y-4">
            <h3 className="text-lg font-bold dark:text-white mb-4">Smart Retry Rules</h3>
            <div className="space-y-3">
               {smartRetries.map((rule, i) => (
                  <motion.div 
                     key={i}
                     whileHover={{ x: 4, borderColor: "rgba(42,206,209,0.5)" }}
                     className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex items-center justify-between group transition-all"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                           <RefreshCw className="w-5 h-5 text-[#2ACED1]" />
                        </div>
                        <div>
                           <h4 className="font-bold dark:text-white text-sm">{rule.name}</h4>
                           <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{rule.count} executions</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-emerald-500">{rule.success} success</p>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-0.5">{rule.status}</p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <h3 className="text-lg font-bold dark:text-white mb-4">Dunning Campaigns</h3>
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ACED1]/5 rounded-bl-full group-hover:scale-110 transition-transform" />
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                        <Mail className="w-6 h-6 text-[#2ACED1]" />
                     </div>
                     <div>
                        <h4 className="font-bold text-white">Automated Customer Dunning</h4>
                        <p className="text-xs text-white/40">Multi-stage email sequences for expired cards.</p>
                     </div>
                  </div>

                  <div className="space-y-3">
                     {[
                        { label: "Day 0: Notice of payment failure", rate: "42% open" },
                        { label: "Day 3: Second attempt failed", rate: "38% open" },
                        { label: "Day 7: Final notice before cancel", rate: "51% open" },
                     ].map((step, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                           <span className="text-xs text-white/70">{step.label}</span>
                           <span className="text-xs text-[#2ACED1] font-bold">{step.rate}</span>
                        </div>
                     ))}
                  </div>

                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-all uppercase tracking-widest">
                     Edit Email Templates <ArrowUpRight className="w-3 h-3 ml-2" />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
