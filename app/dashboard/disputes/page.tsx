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
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp
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
  const [activeTab, setActiveTab] = useState<"disputes" | "radar">("disputes");
  const [selectedDispute, setSelectedDispute] = useState<typeof disputes[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-[#000C22] dark:text-white mb-2 tracking-tight">Revenue Protection</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Handle chargeback claims and manage machine-learning fraud prevention.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
             <button 
              onClick={() => setActiveTab("disputes")}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === "disputes" ? "bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20" : "text-[#000C22]/40 dark:text-white/40"}`}
             >
               Disputes
             </button>
             <button 
              onClick={() => setActiveTab("radar")}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === "radar" ? "bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20" : "text-[#000C22]/40 dark:text-white/40"}`}
             >
               Radar Risk
             </button>
          </div>
        </ScrollReveal>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "disputes" ? (
          <motion.div 
            key="disputes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-8"
          >
            {/* ─── Stats ─── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Active Disputes", value: "3", sub: "$2,450.00", icon: "AlertTriangle", color: "#EF4444" },
                { label: "Resolved (30d)", value: "12", sub: "$18,200.00", icon: "CheckCircle2", color: "#10B981" },
                { label: "Win Rate", value: "85.7%", sub: "+2.4% trend", icon: "TrendingUp", color: "#2ACED1" },
                { label: "Risk Score", value: "Low", sub: "Based on Radar", icon: "ShieldCheck", color: "#2ACED1" },
              ].map((stat, i) => (
                <ScrollReveal key={i} direction="bottom" delay={i * 0.05}>
                  <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-[10px] font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest">{stat.label}</p>
                      <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                        {(() => {
                          const Icon = getIcon(stat.icon as string);
                          return <Icon className="w-4 h-4" style={{ color: stat.color }} />;
                        })()}
                      </div>
                    </div>
                    <p className="text-3xl font-black text-[#000C22] dark:text-white mb-1">{stat.value}</p>
                    <p className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-tighter">{stat.sub}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* ─── List Controls ─── */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2ACED1]" />
                <input 
                  type="text" 
                  placeholder="Search disputes..." 
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 focus:border-[#2ACED1] outline-none text-sm font-medium transition-all"
                />
              </div>
              <button className="px-6 py-3 rounded-2xl bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 text-sm font-bold flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#2ACED1]" />
                Advanced Filters
              </button>
            </div>

            {/* ─── Dispute Table-like List ─── */}
            <div className="bg-white/50 dark:bg-[#011B3B]/50 rounded-[2.5rem] border border-black/5 dark:border-white/5 overflow-hidden backdrop-blur-sm shadow-xl">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">
                          <th className="px-8 py-6">Reference</th>
                          <th className="px-8 py-6">Customer</th>
                          <th className="px-8 py-6">Reason</th>
                          <th className="px-8 py-6">Amount</th>
                          <th className="px-8 py-6">Status</th>
                          <th className="px-8 py-6">Deadline</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                       {disputes.map((dp) => (
                         <tr key={dp.id} onClick={() => setSelectedDispute(dp)} className="hover:bg-[#2ACED1]/5 transition-all group cursor-pointer">
                            <td className="px-8 py-5 text-sm font-bold text-[#2ACED1]">{dp.id}</td>
                            <td className="px-8 py-5 text-sm font-bold text-[#000C22] dark:text-white">{dp.customer}</td>
                            <td className="px-8 py-5 text-xs font-medium text-[#000C22]/60 dark:text-[#D8F4F7]/60">{dp.reason}</td>
                            <td className="px-8 py-5 text-sm font-black text-[#000C22] dark:text-white">{dp.amount}</td>
                            <td className="px-8 py-5">
                               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${statusStyles[dp.status as keyof typeof statusStyles]}`}>
                                  {dp.status}
                               </span>
                            </td>
                            <td className="px-8 py-5">
                               <div className="flex flex-col">
                                  <span className={`text-[10px] font-bold ${dp.deadline.includes("Closed") ? "text-[#000C22]/40 dark:text-white/40" : "text-red-500"}`}>
                                     {dp.deadline}
                                  </span>
                               </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="radar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-10"
          >
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <ScrollReveal direction="left">
                   <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-10 opacity-10">
                         <ShieldCheck className="w-40 h-40 text-[#2ACED1]" />
                      </div>
                      <div className="relative z-10">
                         <h3 className="text-2xl font-black text-white mb-4">Risk Protection Enabled</h3>
                         <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                            Our machine learning models analyze 1,000+ data points per transaction to block fraud before it happens.
                         </p>
                         <div className="flex items-center gap-6">
                            <div className="text-center">
                               <p className="text-3xl font-black text-[#2ACED1]">99.8%</p>
                               <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Block accuracy</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                               <p className="text-3xl font-black text-white">$14.2k</p>
                               <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Volume saved</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </ScrollReveal>

                <ScrollReveal direction="right" className="space-y-6">
                   <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5">
                      <div className="flex items-center justify-between mb-6">
                         <h4 className="font-bold text-[#000C22] dark:text-white">Review Settings</h4>
                         <div className="w-10 h-6 bg-[#2ACED1] rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                         </div>
                      </div>
                      <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 leading-relaxed">
                         Transactions with a risk score above 75 will be held for manual review.
                      </p>
                   </div>
                   <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5">
                      <div className="flex items-center justify-between mb-6">
                         <h4 className="font-bold text-[#000C22] dark:text-white">3D Secure</h4>
                         <div className="w-10 h-6 bg-black/10 dark:bg-white/10 rounded-full relative">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                         </div>
                      </div>
                      <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 leading-relaxed">
                         Always require 3DS authentication for payments from high-risk regions.
                      </p>
                   </div>
                </ScrollReveal>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Evidence Sidebar-like Detail ─── */}
      <AnimatePresence>
        {selectedDispute && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDispute(null)}
              className="fixed inset-0 z-[110] bg-[#000C22]/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[120] h-full w-full max-w-md bg-white dark:bg-[#000C22] shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 z-10 px-8 py-6 bg-white/80 dark:bg-[#000C22]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#000C22] dark:text-white tracking-tight">Challenge Dispute</h3>
                  <p className="text-[10px] font-bold text-[#2ACED1] uppercase tracking-widest mt-0.5">{selectedDispute.id}</p>
                </div>
                <button onClick={() => setSelectedDispute(null)} className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  ✕
                </button>
              </div>

              <div className="p-8 space-y-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40">Status Summary</h4>
                  <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold dark:text-white">Current Stage</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${statusStyles[selectedDispute.status as keyof typeof statusStyles]}`}>
                        {selectedDispute.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold dark:text-white">Amount at Risk</span>
                      <span className="text-sm font-black text-red-500">{selectedDispute.amount}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40">Evidence Checklist</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Delivery Confirmation", required: true, completed: false },
                      { label: "Customer Communication", required: true, completed: false },
                      { label: "Purchase History", required: false, completed: true },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${item.completed ? "bg-[#2ACED1] border-[#2ACED1]" : "border-black/20 dark:border-white/20"}`}>
                            {item.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-xs font-bold dark:text-white">{item.label}</span>
                        </div>
                        {item.required && <span className="text-[8px] font-black uppercase text-red-500">Required</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40">Upload Files</h4>
                   <div className="border-2 border-dashed border-[#2ACED1]/20 rounded-3xl p-10 bg-[#2ACED1]/5 flex flex-col items-center text-center gap-4 cursor-pointer hover:border-[#2ACED1]/40 transition-all">
                      <Upload className="w-8 h-8 text-[#2ACED1]" />
                      <div className="space-y-1">
                         <p className="text-sm font-bold dark:text-white">Drag & drop files</p>
                         <p className="text-xs text-[#000C22]/40 dark:text-white/40 leading-relaxed">PDF, JPG, or PNG up to 10MB.<br/>Max 5 files per dispute.</p>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 pt-6 pb-20">
                   <button className="flex-1 py-4 rounded-2xl bg-black/5 dark:bg-white/5 text-sm font-black dark:text-white transition-all">
                      Save Draft
                   </button>
                   <button className="flex-1 py-4 rounded-2xl bg-[#2ACED1] text-white text-sm font-black shadow-xl shadow-[#2ACED1]/20 transition-all">
                      Submit Challenge
                   </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
