"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gavel, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronRight,
  Upload,
  Info,
  ArrowUpRight
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";

const disputes = [
  { id: "dp_01HV7Y", amount: "$1,250.00", reason: "Product not received", status: "Needs response", customer: "Sarah Johnson", deadline: "Apr 25, 2026", evidence: "0%" },
  { id: "dp_01HV6T", amount: "$320.00", reason: "Fraudulent", status: "Under review", customer: "Michael Chen", deadline: "Pending Review", evidence: "100%" },
  { id: "dp_01HV5X", amount: "$4,800.00", reason: "Unrecognized", status: "Won", customer: "Priya Sharma", deadline: "Closed", evidence: "100%" },
  { id: "dp_01HV4A", amount: "$99.00", reason: "Duplicate", status: "Lost", customer: "Tom Baker", deadline: "Closed", evidence: "30%" },
  { id: "dp_01HV3Z", amount: "$1,200.00", reason: "Product unacceptable", status: "Needs response", customer: "James Wilson", deadline: "May 02, 2026", evidence: "0%" },
];

const statusStyles = {
  "Needs response": "bg-red-500/10 text-red-500 border-red-500/20",
  "Under review": "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  "Won": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Lost": "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export default function DisputesPage() {
  const [selectedDispute, setSelectedDispute] = useState<typeof disputes[0] | null>(null);
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Disputes</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Protect your revenue and handle chargeback claims.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-[#2ACED1] uppercase tracking-widest">Inquiry rate</p>
                <p className="text-xl font-bold text-[#000C22] dark:text-white">0.02%</p>
             </div>
             <div className="w-12 h-12 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                <Gavel className="w-6 h-6 text-[#2ACED1]" />
             </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          { label: "Open Disputes", value: "3", sub: "$2,450.00", icon: "AlertTriangle", color: "#EF4444" },
          { label: "Won (Last 30d)", value: "12", sub: "$18,200.00", icon: "CheckCircle2", color: "#10B981" },
          { label: "Lost (Last 30d)", value: "2", sub: "$198.00", icon: "Gavel", color: "#6B7280" },
          { label: "Win Rate", value: "85.7%", sub: "+2.4% vs prev", icon: "ArrowUpRight", color: "#2ACED1" },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(42,206,209,0.1)" }}
              className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-wider">{stat.label}</p>
                {(() => {
                  const Icon = getIcon(stat.icon as string);
                  return <Icon className="w-4 h-4" style={{ color: stat.color }} />;
                })()}
              </div>
              <p className="text-2xl font-bold text-[#000C22] dark:text-white mb-1">{stat.value}</p>
              <p className="text-xs font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">{stat.sub}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Controls ─── */}
      <ScrollReveal direction="bottom">
        <div className="flex flex-wrap items-center gap-4 bg-white/50 dark:bg-[#011B3B]/50 p-4 rounded-xl border border-[#2ACED1]/10 backdrop-blur-sm">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000C22]/40 dark:text-[#D8F4F7]/40" />
            <input 
              type="text" 
              placeholder="Search by customer or dispute ID..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#000C22] border border-[#2ACED1]/20 focus:outline-none focus:border-[#2ACED1] transition-colors text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2ACED1]/20 hover:bg-[#2ACED1]/5 transition-colors text-sm font-semibold">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </ScrollReveal>

      {/* ─── Dispute List ─── */}
      <div className="flex flex-col gap-3">
        {disputes.map((dp, i) => (
          <ScrollReveal key={dp.id} direction={i % 2 === 0 ? "left" : "right"} delay={0.2 + i * 0.05}>
            <motion.div
              onClick={() => setSelectedDispute(dp)}
              whileHover={{ scale: 1.005, backgroundColor: "rgba(42,206,209,0.05)" }}
              className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 flex flex-wrap items-center justify-between gap-4 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${statusStyles[dp.status as keyof typeof statusStyles]}`}>
                  <Gavel className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#000C22] dark:text-white">{dp.customer}</p>
                  <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">{dp.id} • {dp.reason}</p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                   <p className="font-bold text-[#000C22] dark:text-white">{dp.amount}</p>
                   <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">Evidence: {dp.evidence}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[dp.status as keyof typeof statusStyles]}`}>
                      {dp.status}
                   </span>
                   {dp.deadline !== "Closed" && dp.deadline !== "Pending Review" && (
                     <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Due in 5 days</p>
                   )}
                </div>
                <ChevronRight className="w-5 h-5 text-[#2ACED1]/40" />
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Evidence Modal ─── */}
      <AnimatePresence>
        {selectedDispute && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDispute(null)}
              className="absolute inset-0 bg-[#000C22]/80 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedDispute.id}
              className="relative w-full max-w-2xl bg-white dark:bg-[#011B3B] rounded-3xl border border-[#2ACED1]/30 shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <h3 className="text-2xl font-bold dark:text-white">Submit Evidence</h3>
                      <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60">Challenging {selectedDispute.id} for {selectedDispute.customer}</p>
                   </div>
                   <button onClick={() => setSelectedDispute(null)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 dark:text-white">
                      ✕
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   <div className="p-4 rounded-xl bg-[#2ACED1]/5 border border-[#2ACED1]/20">
                      <div className="flex items-center gap-2 mb-2 text-[#008E96] dark:text-[#2ACED1]">
                         <Info className="w-4 h-4" />
                         <p className="text-xs font-bold uppercase tracking-widest">Recommended Actions</p>
                      </div>
                      <ul className="text-xs space-y-2 dark:text-white/70">
                         <li>• Upload delivery confirmation (PDF/JPG)</li>
                         <li>• Attach customer communication logs</li>
                         <li>• Include terms of service agreement</li>
                      </ul>
                   </div>

                   <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2 text-orange-500">
                         <Clock className="w-4 h-4" />
                         <p className="text-xs font-bold uppercase tracking-widest">Deadline</p>
                      </div>
                      <p className="text-xl font-bold dark:text-white">{selectedDispute.deadline}</p>
                      <p className="text-xs dark:text-white/40">Late submissions will result in an automatic loss.</p>
                   </div>
                </div>

                <div className="border-2 border-dashed border-[#2ACED1]/30 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-[#2ACED1] transition-colors group cursor-pointer bg-[#2ACED1]/5">
                   <div className="w-16 h-16 rounded-full bg-[#2ACED1]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-[#2ACED1]" />
                   </div>
                   <div className="text-center">
                      <p className="font-bold dark:text-white">Drop your evidence files here</p>
                      <p className="text-sm text-[#000C22]/40 dark:text-[#D8F4F7]/40">or click to browse from explorer</p>
                   </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                   <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                   <button className="px-8 py-3 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg hover:scale-[1.02] transition-all">
                      Confirm Submission
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
