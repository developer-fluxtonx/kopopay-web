"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  MoreVertical, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  Receipt,
  Eye,
  Mail
} from "lucide-react";

const invoices = [
  { id: "INV-2105", customer: "John Doe", amount: "$250.00", status: "Paid", date: "Apr 20, 2026", due: "Immediate", sent: true },
  { id: "INV-2104", customer: "Sarah Smith", amount: "$15.00", status: "Paid", date: "Apr 20, 2026", due: "Immediate", sent: true },
  { id: "INV-2103", customer: "Alex Rivers", amount: "$1,200.00", status: "Open", date: "Apr 15, 2026", due: "May 15, 2026", sent: true },
  { id: "INV-2102", customer: "Maria Garcia", amount: "$45.99", status: "Void", date: "Apr 14, 2026", due: "N/A", sent: false },
  { id: "INV-2101", customer: "David Wilson", amount: "$320.00", status: "Uncollectible", date: "Apr 10, 2026", due: "Apr 10, 2026", sent: true },
];

const statusStyles = {
  "Paid": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Open": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Void": "bg-gray-500/10 text-gray-500 border-gray-500/20",
  "Uncollectible": "bg-red-500/10 text-red-500 border-red-500/20",
  "Draft": "bg-gray-300/10 text-gray-400 border-gray-300/20",
};

export default function InvoicesPage() {
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
               <Receipt className="w-8 h-8 text-[#2ACED1]" />
               Invoices
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">B2B billing, custom reconciliation, and client payment history.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <FileText className="w-4 h-4" /> Create test invoice
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Recovery Stats ─── */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 relative overflow-hidden group">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
               <p className="text-[10px] font-bold text-[#2ACED1] uppercase tracking-[0.2em] mb-2">Total Outstanding</p>
               <p className="text-3xl font-bold text-white">$12,480.00</p>
               <p className="text-xs text-white/40 mt-1">across 14 open invoices</p>
            </div>
            <div className="border-l border-white/10 pl-8">
               <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-2">Collected (30d)</p>
               <p className="text-2xl font-bold text-white">$84,200.00</p>
               <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold mt-1">
                  <TrendingUp className="w-3 h-3" /> +14.2%
               </div>
            </div>
            <div className="border-l border-white/10 pl-8">
               <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] mb-2">Past Due</p>
               <p className="text-2xl font-bold text-white">$1,120.00</p>
               <p className="text-xs text-white/40 mt-1">requires follow-up</p>
            </div>
            <div className="flex flex-col justify-center">
               <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-xs font-bold transition-all w-fit">
                  Detailed Recovery Report <ArrowUpRight className="w-3 h-3" />
               </button>
            </div>
         </div>
      </div>

      {/* ─── Controls ─── */}
      <ScrollReveal direction="bottom">
        <div className="flex flex-wrap items-center justify-between gap-4">
           <div className="flex items-center gap-2 bg-white/50 dark:bg-[#011B3B]/50 p-1.5 rounded-2xl border border-[#2ACED1]/10">
              <button className="px-5 py-2 text-xs font-bold rounded-xl bg-[#2ACED1] text-white shadow-lg">All</button>
              <button className="px-5 py-2 text-xs font-bold text-[#000C22]/60 dark:text-white/60 hover:text-[#2ACED1] transition-colors">Paid</button>
              <button className="px-5 py-2 text-xs font-bold text-[#000C22]/60 dark:text-white/60 hover:text-[#2ACED1] transition-colors">Open</button>
              <button className="px-5 py-2 text-xs font-bold text-[#000C22]/60 dark:text-white/60 hover:text-[#2ACED1] transition-colors">Past Due</button>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2ACED1]/20 text-sm font-bold dark:text-white hover:bg-[#2ACED1]/5 transition-colors">
                 <Filter className="w-4 h-4" /> Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2ACED1]/20 text-sm font-bold dark:text-white hover:bg-[#2ACED1]/5 transition-colors">
                 <Download className="w-4 h-4" /> Export
              </button>
           </div>
        </div>
      </ScrollReveal>

      {/* ─── Table ─── */}
      <div className="rounded-3xl border border-[#2ACED1]/20 bg-white/80 dark:bg-[#011B3B]/80 overflow-hidden shadow-2xl backdrop-blur-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-black/5 dark:bg-white/5 border-b border-[#2ACED1]/10">
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Amount</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Status</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Invoice Number</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Customer</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Due Date</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {invoices.map((inv) => (
                     <tr key={inv.id} className="border-b border-[#2ACED1]/10 last:border-0 hover:bg-[#2ACED1]/5 transition-colors group">
                        <td className="px-8 py-6">
                           <p className="text-base font-bold dark:text-white">{inv.amount}</p>
                           <p className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">USD</p>
                        </td>
                        <td className="px-8 py-6">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusStyles[inv.status as keyof typeof statusStyles]}`}>
                              {inv.status}
                           </span>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <p className="text-sm font-bold dark:text-white font-mono">{inv.id}</p>
                              <p className="text-[10px] text-white/30">{inv.date}</p>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-sm font-bold dark:text-white">{inv.customer}</p>
                           <div className="flex items-center gap-1.5 mt-1">
                              <Mail className={`w-3 h-3 ${inv.sent ? "text-emerald-500" : "text-amber-500"}`} />
                              <span className="text-[10px] text-white/40">{inv.sent ? "Invoice Sent" : "Draft (Not Sent)"}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <p className={`text-sm font-bold ${inv.status === "Open" ? "text-[#2ACED1]" : "dark:text-white/40"}`}>{inv.due}</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button className="p-2 rounded-xl bg-[#2ACED1]/10 text-[#2ACED1] hover:bg-[#2ACED1]/20 transition-all opacity-0 group-hover:opacity-100">
                                 <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 rounded-xl bg-[#2ACED1]/10 text-[#2ACED1] hover:bg-[#2ACED1]/20 transition-all opacity-0 group-hover:opacity-100">
                                 <Download className="w-4 h-4" />
                              </button>
                              <button className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                 <MoreVertical className="w-4 h-4 text-white/40" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
