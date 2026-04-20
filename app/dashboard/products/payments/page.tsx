"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ChevronRight, 
  MoreVertical,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";

const initialPayments = [
  { id: "pi_3O5w2...", amount: "$250.00", status: "Succeeded", customer: "John Doe", date: "Apr 20, 2026, 12:45 PM", method: "Visa •••• 4242" },
  { id: "pi_3O5w1...", amount: "$15.00", status: "Refunded", customer: "Sarah Smith", date: "Apr 20, 2026, 11:30 AM", method: "Mastercard •••• 5555" },
  { id: "pi_3O5w0...", amount: "$1,200.00", status: "Incomplete", customer: "Alex Rivers", date: "Apr 20, 2026, 10:15 AM", method: "ACH Direct Debit" },
  { id: "pi_3O5v9...", amount: "$45.99", status: "Succeeded", customer: "Maria Garcia", date: "Apr 19, 2026, 09:20 PM", method: "Apple Pay" },
  { id: "pi_3O5v8...", amount: "$320.00", status: "Succeeded", customer: "David Wilson", date: "Apr 19, 2026, 06:10 PM", method: "Visa •••• 1234" },
];

const statusStyles = {
  "Succeeded": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Refunded": "bg-gray-500/10 text-gray-500 border-gray-500/20",
  "Incomplete": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "Failed": "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function PaymentsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Payments</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage and monitor all incoming transaction volume.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2ACED1]/20 text-sm font-bold dark:text-white hover:bg-[#2ACED1]/5"
             >
                <Download className="w-4 h-4" /> Export
             </motion.button>
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Create payment
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Payment Stats Highlights ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Gross Volume", value: "$124,502.00", change: "+12%", up: true },
          { label: "Successful Payments", value: "1,248", change: "+18%", up: true },
          { label: "Net Revenue", value: "$118,290.00", change: "+10%", up: true },
          { label: "Refunds", value: "$420.00", change: "-5%", up: false },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm">
              <p className="text-xs font-bold text-[#000C22]/40 dark:text-white/30 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-center justify-between">
                 <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                 <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${stat.up ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"}`}>
                    <TrendingUp className="w-3 h-3" /> {stat.change}
                 </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Controls ─── */}
      <ScrollReveal direction="bottom">
        <div className="flex flex-wrap items-center gap-4 bg-white/50 dark:bg-[#011B3B]/50 p-4 rounded-xl border border-[#2ACED1]/10 backdrop-blur-sm">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000C22]/40 dark:text-[#D8F4F7]/40" />
            <input 
              type="text" 
              placeholder="Filter by ID, customer, amount or date..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#000C22] border border-[#2ACED1]/20 focus:outline-none focus:border-[#2ACED1] transition-colors text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2ACED1]/20 hover:bg-[#2ACED1]/5 transition-colors text-sm font-semibold">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </ScrollReveal>

      {/* ─── Payments Table ─── */}
      <ScrollReveal direction="bottom" delay={0.2}>
         <div className="rounded-2xl border border-[#2ACED1]/20 bg-white/80 dark:bg-[#011B3B]/80 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-black/5 dark:bg-white/5 border-b border-[#2ACED1]/10">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Amount</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Description</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Customer</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 text-right">Date</th>
                     </tr>
                  </thead>
                  <tbody>
                     {initialPayments.map((p) => (
                        <tr key={p.id} className="border-b border-[#2ACED1]/10 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <p className="text-sm font-bold dark:text-white">{p.amount}</p>
                                 <span className="text-[10px] text-white/20 uppercase tracking-tighter">USD</span>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${statusStyles[p.status as keyof typeof statusStyles]}`}>
                                 {p.status === "Succeeded" ? <CheckCircle2 className="w-3 h-3" /> : p.status === "Incomplete" ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                 {p.status}
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <p className="text-xs text-[#000C22]/40 dark:text-white/40 mb-1">{p.id}</p>
                              <div className="flex items-center gap-2">
                                 <CreditCard className="w-3 h-3 text-[#2ACED1]" />
                                 <p className="text-[10px] font-medium dark:text-white/60">{p.method}</p>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <p className="text-sm font-bold dark:text-white underline decoration-[#2ACED1]/20 underline-offset-4">{p.customer}</p>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <p className="text-xs text-[#000C22]/40 dark:text-white/40">{p.date}</p>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </ScrollReveal>
    </div>
  );
}
