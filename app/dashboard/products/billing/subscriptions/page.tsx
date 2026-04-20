"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  RefreshCw, 
  User, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Coins,
  ArrowUpRight
} from "lucide-react";

const subscriptions = [
  { id: "sub_1H9J...", customer: "Pro Tech Labs", plan: "Enterprise Elite", amount: "$2,400.00 / mo", status: "Active", nextInvoice: "May 12, 2026" },
  { id: "sub_1H8K...", customer: "Alice Johnson", plan: "Basic Launch", amount: "$29.00 / mo", status: "Active", nextInvoice: "Apr 28, 2026" },
  { id: "sub_1H7L...", customer: "Startup Hub", plan: "Pro Growth", amount: "$199.00 / mo", status: "Canceled", nextInvoice: "June 01, 2026 (Ends)" },
  { id: "sub_1H6M...", customer: "James Moriarty", plan: "Enterprise Elite", amount: "$2,400.00 / mo", status: "Past Due", nextInvoice: "N/A" },
  { id: "sub_1H5N...", customer: "Cyberdyne Systems", plan: "Pro Growth", amount: "$199.00 / mo", status: "Active", nextInvoice: "May 05, 2026" },
];

const statusStyles = {
  "Active": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Canceled": "bg-red-500/10 text-red-500 border-red-500/20",
  "Past Due": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "Trialing": "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export default function SubscriptionsPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Subscriptions</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage recurring relationships and billing lifecycles.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Create subscription
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Stats Highlights ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: "Active Subscriptions", value: "842", sub: "3.2% churn last 30d", icon: RefreshCw, color: "#2ACED1" },
            { label: "Annual Recurring Revenue", value: "$1.42M", sub: "+$12.5k this month", icon: Coins, color: "#10B981" },
            { label: "Failed Renewals", value: "8", sub: "Requires manual attention", icon: Clock, color: "#F59E0B" },
         ].map((stat, i) => {
            const Icon = stat.icon;
            return (
               <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
                  <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 shadow-sm relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-[#2ACED1]/5 rounded-bl-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform" />
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                           <Icon className="w-5 h-5" style={{ color: stat.color }} />
                        </div>
                        <p className="text-xs font-bold text-[#000C22]/40 dark:text-white/30 uppercase tracking-widest">{stat.label}</p>
                     </div>
                     <p className="text-3xl font-bold dark:text-white mb-1">{stat.value}</p>
                     <p className="text-[10px] font-bold text-gray-500 uppercase">{stat.sub}</p>
                  </div>
               </ScrollReveal>
            );
         })}
      </div>

      {/* ─── Filters ─── */}
      <ScrollReveal direction="bottom">
        <div className="flex flex-wrap items-center justify-between gap-4">
           <div className="flex items-center gap-4 bg-white/50 dark:bg-[#011B3B]/50 p-2 rounded-xl border border-[#2ACED1]/10 backdrop-blur-sm">
              <button className="px-5 py-2 text-xs font-bold rounded-lg bg-[#2ACED1] text-white shadow-lg">All</button>
              <button className="px-5 py-2 text-xs font-bold text-[#000C22]/60 dark:text-white/60 hover:text-[#2ACED1] transition-colors">Active</button>
              <button className="px-5 py-2 text-xs font-bold text-[#000C22]/60 dark:text-white/60 hover:text-[#2ACED1] transition-colors">Canceled</button>
              <button className="px-5 py-2 text-xs font-bold text-[#000C22]/60 dark:text-white/60 hover:text-[#2ACED1] transition-colors">Past Due</button>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                 <input type="text" placeholder="Search subscriptions..." className="pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 text-sm focus:outline-none focus:border-[#2ACED1]" />
              </div>
              <button className="p-2.5 rounded-xl border border-[#2ACED1]/20 hover:bg-[#2ACED1]/10 text-[#2ACED1] transition-colors">
                 <Filter className="w-5 h-5" />
              </button>
           </div>
        </div>
      </ScrollReveal>

      {/* ─── List ─── */}
      <div className="flex flex-col gap-3">
         {subscriptions.map((sub, i) => (
            <ScrollReveal key={sub.id} direction={i % 2 === 0 ? "left" : "right"} delay={0.2 + (i * 0.05)}>
               <motion.div 
                  whileHover={{ scale: 1.005, backgroundColor: "rgba(42,206,209,0.05)" }}
                  className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex flex-wrap items-center justify-between gap-4 cursor-pointer transition-all"
               >
                  <div className="flex items-center gap-4 min-w-[240px]">
                     <div className="w-10 h-10 rounded-full bg-[#2ACED1]/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-[#2ACED1]" />
                     </div>
                     <div>
                        <p className="font-bold dark:text-white">{sub.customer}</p>
                        <p className="text-xs text-white/40">{sub.id} • {sub.plan}</p>
                     </div>
                  </div>

                  <div className="flex flex-1 items-center justify-between px-8 border-x border-[#2ACED1]/10">
                     <div>
                        <p className="text-sm font-bold dark:text-white">{sub.amount}</p>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                           <ArrowUpRight className="w-3 h-3" /> Recurring
                        </p>
                     </div>
                     <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                           <Calendar className="w-3 h-3 text-[#2ACED1]" />
                           <p className="text-xs font-bold dark:text-white">{sub.nextInvoice}</p>
                        </div>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Next Invoice</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-6 min-w-[140px] justify-end">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusStyles[sub.status as keyof typeof statusStyles]}`}>
                        {sub.status}
                     </span>
                     <ChevronRight className="w-5 h-5 text-[#2ACED1]/40" />
                  </div>
               </motion.div>
            </ScrollReveal>
         ))}
      </div>
    </div>
  );
}
