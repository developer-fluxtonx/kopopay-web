"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  RefreshCw, 
  MoreVertical,
  Activity,
  ArrowUpRight,
  Zap,
  DollarSign
} from "lucide-react";

const issuedCards = [
  { id: "ic_01H...", holder: "Alex Rivers", type: "Virtual", last4: "8821", status: "Active", limit: "$5,000", spent: "$1,240" },
  { id: "ic_02I...", holder: "Sarah Smith", type: "Physical", last4: "4412", status: "Active", limit: "$2,000", spent: "$450" },
  { id: "ic_03J...", holder: "Marketing Dept", type: "Virtual", last4: "1092", status: "Frozen", limit: "$10,000", spent: "$8,900" },
];

export default function IssuingPage() {
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
               <CreditCard className="w-8 h-8 text-[#2ACED1]" />
               Issuing
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Create and manage physical and virtual cards for your team or customers.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Create card
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Cards Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
         {[
            { label: "Active Cards", value: "42", icon: CreditCard },
            { label: "Total Spent (Mo)", value: "$12,480", icon: DollarSign },
            { label: "Pending Approvals", value: "3", icon: Activity },
            { label: "Issuing Balance", value: "$45,000", icon: ShieldCheck },
         ].map((stat, i) => {
            const Icon = stat.icon;
            return (
               <div key={i} className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <div className="flex items-center justify-between mb-3">
                     <div className="w-9 h-9 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#2ACED1]" />
                     </div>
                     <MoreVertical className="w-4 h-4 text-white/20" />
                  </div>
                  <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                  <p className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/30 uppercase tracking-widest mt-1">{stat.label}</p>
               </div>
            );
         })}
      </div>

      {/* ─── Card Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {issuedCards.map((card, i) => (
            <ScrollReveal key={card.id} direction="bottom" delay={i * 0.1}>
               <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-[2rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30 relative overflow-hidden group shadow-2xl"
               >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ACED1]/10 blur-3xl -z-1" />
                  
                  <div className="flex justify-between items-start mb-12">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                           <Zap className="w-4 h-4 text-[#2ACED1]" />
                        </div>
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Kopo Pay Issued</span>
                     </div>
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        card.status === "Active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                     }`}>
                        {card.status}
                     </span>
                  </div>

                  <div className="mb-8">
                     <p className="text-xl font-mono text-white tracking-[0.3em] mb-1">•••• •••• •••• {card.last4}</p>
                     <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{card.holder}</p>
                  </div>

                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Spend this month</p>
                        <div className="flex items-baseline gap-2">
                           <p className="text-lg font-bold text-white">{card.spent}</p>
                           <p className="text-[10px] text-white/20">/ {card.limit}</p>
                        </div>
                        <div className="w-32 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                           <div 
                              className="h-full bg-[#2ACED1]" 
                              style={{ width: `${(parseInt(card.spent.replace('$','').replace(',','')) / parseInt(card.limit.replace('$','').replace(',',''))) * 100}%` }} 
                           />
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                           <Smartphone className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                           <Lock className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </motion.div>
            </ScrollReveal>
         ))}
         
         {/* Add New Card Call to Action */}
         <ScrollReveal direction="bottom" delay={0.3}>
            <div className="h-full rounded-[2rem] border-2 border-dashed border-[#2ACED1]/20 flex flex-col items-center justify-center p-8 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group">
               <div className="w-16 h-16 rounded-full bg-[#2ACED1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-[#2ACED1]" />
               </div>
               <h3 className="font-bold dark:text-white text-lg">Issue New Card</h3>
               <p className="text-xs text-[#000C22]/40 dark:text-white/40 text-center mt-2 px-4 italic"> Instantly generate virtual cards for vendors or physical cards for employees.</p>
            </div>
         </ScrollReveal>
      </div>

      {/* ─── Control Center ─── */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
         <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <RefreshCw className="w-5 h-5 text-[#2ACED1]" />
               <div>
                  <h4 className="font-bold dark:text-white text-sm">Real-time Authorization Hooks</h4>
                  <p className="text-xs dark:text-white/40">You are currently handling 100% of auth requests via your backend.</p>
               </div>
            </div>
            <button className="px-6 py-2 rounded-xl border border-[#2ACED1]/20 text-[#2ACED1] text-xs font-bold hover:bg-[#2ACED1]/10 transition-all uppercase tracking-widest">
               Configure Webhooks <ArrowUpRight className="w-3 h-3 ml-2" />
            </button>
         </div>
      </div>
    </div>
  );
}
