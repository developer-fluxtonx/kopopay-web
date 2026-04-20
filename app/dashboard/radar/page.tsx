"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  ChevronRight, 
  Search, 
  Filter, 
  Map as MapIcon, 
  Activity, 
  Globe, 
  Ban, 
  Settings2,
  ExternalLink,
  Info,
  Clock,
  ArrowUpRight,
  TrendingDown
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const riskTransactions = [
  { id: "TXN-8821", customer: "Unknown", email: "temp4829@mail.ru", amount: "$4,200", risk: 92, reason: "IP velocity + new card", action: "Blocked", date: "2m ago" },
  { id: "TXN-8819", customer: "John Smith", email: "j.smith@gmail.com", amount: "$890", risk: 45, reason: "New device detected", action: "Review", date: "15m ago" },
  { id: "TXN-8815", customer: "Maria Lopez", email: "maria@corp.mx", amount: "$12,500", risk: 78, reason: "Unusual amount pattern", action: "Review", date: "1h ago" },
  { id: "TXN-8810", customer: "David Lee", email: "david@startup.com", amount: "$320", risk: 12, reason: "Trusted customer", action: "Allowed", date: "3h ago" },
];

const rules = [
  { name: "Block high-risk countries", status: "Active", triggers: 23, description: "Block if IP country is on the critical risk list." },
  { name: "Require 3DS for > $500", status: "Active", triggers: 156, description: "Enforce 3D Secure for large transactions." },
  { name: "Block prepaid cards", status: "Paused", triggers: 0, description: "Restrict payments from non-refillable cards." },
  { name: "Velocity check: 5+ in 1hr", status: "Active", triggers: 8, description: "Flag card numbers appearing 5+ times in 60m." },
];

const chartData = [
  { name: "Mon", fraud: 12, safe: 450 },
  { name: "Tue", fraud: 18, safe: 520 },
  { name: "Wed", fraud: 8, safe: 480 },
  { name: "Thu", fraud: 24, safe: 610 },
  { name: "Fri", fraud: 15, safe: 720 },
  { name: "Sat", fraud: 5, safe: 310 },
  { name: "Sun", fraud: 2, safe: 280 },
];

type TabId = "review" | "rules" | "analytics" | "blocklist";

export default function RadarPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("review");
  const [selectedTx, setSelectedTx] = useState<typeof riskTransactions[0] | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Premium Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1 flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-[#2ACED1]" />
              Radar Fraud Detection
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Machine learning protection with custom risk rule orchestration.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
            >
              <Plus className="w-4 h-4" />
              New Rule
            </motion.button>
            <button className="p-2.5 rounded-xl border border-[#2ACED1]/20 hover:bg-[#2ACED1]/10 transition-colors">
              <Settings2 className="w-5 h-5 text-[#2ACED1]" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Navigation Tabs ─── */}
      <div className="flex items-center gap-1 border-b border-[#2ACED1]/10">
        {[
          { id: "review", label: "Review Queue", icon: Activity },
          { id: "rules", label: "Risk Rules", icon: ShieldCheck },
          { id: "analytics", label: "Insights", icon: Globe },
          { id: "blocklist", label: "Blocklists", icon: Ban },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
                activeTab === tab.id 
                ? "text-[#2ACED1]" 
                : "text-[#000C22]/40 dark:text-[#D8F4F7]/40 hover:text-[#000C22] dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="radar-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2ACED1]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ─── Tab Content ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "review" && (
            <div className="space-y-6">
              {/* Review Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Awaiting Review", value: "18", color: "#EF4444", icon: "Clock" },
                  { label: "Blocked (24h)", value: "247", color: "#2ACED1", icon: "ShieldAlert" },
                  { label: "Accuracy Score", value: "99.8%", color: "#10B981", icon: "ShieldCheck" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold dark:text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Transaction Queue */}
              <div className="rounded-2xl border border-[#2ACED1]/20 bg-white/80 dark:bg-[#011B3B]/80 overflow-hidden">
                <div className="p-6 border-b border-[#2ACED1]/10 flex flex-wrap gap-4 items-center justify-between">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input 
                      type="text" 
                      placeholder="Search risk events..." 
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-[#000C22] border border-[#2ACED1]/10 focus:outline-none focus:border-[#2ACED1] text-sm"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2ACED1]/20 text-sm font-bold dark:text-white hover:bg-[#2ACED1]/5">
                    <Filter className="w-4 h-4" /> Filters
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-black/5 dark:bg-white/5 border-b border-[#2ACED1]/10">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Transaction</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Risk Level</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Reasoning</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Action</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskTransactions.map((tx) => (
                        <tr 
                          key={tx.id} 
                          onClick={() => setSelectedTx(tx)}
                          className="border-b border-[#2ACED1]/10 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group"
                        >
                          <td className="px-6 py-5">
                            <p className="font-bold dark:text-white group-hover:text-[#2ACED1] transition-colors">{tx.customer}</p>
                            <p className="text-xs font-mono text-white/40">{tx.id}</p>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                               <div className="w-16 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full ${tx.risk > 80 ? "bg-red-500" : tx.risk > 40 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${tx.risk}%` }} />
                               </div>
                               <span className={`text-[10px] font-bold ${tx.risk > 80 ? "text-red-500" : tx.risk > 40 ? "text-amber-500" : "text-emerald-500"}`}>{tx.risk}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                             <p className="text-xs text-[#000C22]/60 dark:text-[#D8F4F7]/60 leading-relaxed">{tx.reason}</p>
                          </td>
                          <td className="px-6 py-5">
                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                               tx.action === "Blocked" ? "bg-red-500/10 text-red-500" :
                               tx.action === "Review" ? "bg-amber-500/10 text-amber-500" :
                               "bg-emerald-500/10 text-emerald-600"
                             }`}>
                                {tx.action}
                             </span>
                          </td>
                          <td className="px-6 py-5 text-right text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">{tx.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "rules" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rules.map((rule, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex flex-col group hover:border-[#2ACED1]/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                     <div className="p-3 rounded-xl bg-[#2ACED1]/10 text-[#2ACED1]">
                        <ShieldCheck className="w-6 h-6" />
                     </div>
                     <div className="flex gap-2">
                        <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/40 dark:text-[#D8F4F7]/40 transition-colors">
                           <Settings2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-500 transition-colors">
                           <Ban className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                  <h3 className="font-bold text-[#000C22] dark:text-white mb-2 group-hover:text-[#2ACED1] transition-colors">{rule.name}</h3>
                  <p className="text-sm text-[#000C22]/50 dark:text-[#D8F4F7]/50 mb-6 flex-1">{rule.description}</p>
                  <div className="pt-6 border-t border-[#2ACED1]/10 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div>
                           <p className="text-[10px] font-bold text-[#000C22]/30 dark:text-[#D8F4F7]/30 uppercase">Status</p>
                           <span className={`text-[10px] font-bold uppercase ${rule.status === "Active" ? "text-emerald-500" : "text-gray-400"}`}>{rule.status}</span>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-[#000C22]/30 dark:text-[#D8F4F7]/30 uppercase">Triggers</p>
                           <span className="text-[10px] font-bold dark:text-white">{rule.triggers}</span>
                        </div>
                     </div>
                     <ArrowUpRight className="w-4 h-4 text-[#2ACED1] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
              <button className="p-12 rounded-2xl border-2 border-dashed border-[#2ACED1]/20 hover:border-[#2ACED1]/50 hover:bg-[#2ACED1]/5 transition-all text-center flex flex-col items-center justify-center gap-4 group">
                 <div className="w-12 h-12 rounded-full bg-[#2ACED1]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-[#2ACED1]" />
                 </div>
                 <div>
                    <p className="font-bold dark:text-white">Create New Custom Rule</p>
                    <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">Set up logic for blocking, reviewing, or allowing payments.</p>
                 </div>
              </button>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
                {/* Fraud Chart */}
                <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 h-full">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                        <h3 className="font-bold dark:text-white text-lg">Fraud Attempts</h3>
                        <p className="text-xs text-red-500 font-bold uppercase">Blocked Events</p>
                     </div>
                     <TrendingDown className="w-5 h-5 text-[#2ACED1]" />
                  </div>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="fraudGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.2} />
                            <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(239,68,68,0.1)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                        <Tooltip 
                           contentStyle={{ backgroundColor: "#011B3B", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", color: "#fff" }}
                        />
                        <Area type="monotone" dataKey="fraud" stroke="#EF4444" strokeWidth={3} fill="url(#fraudGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Geo Monitor Placeholder */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 h-full relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2ACED1]/40 via-transparent to-transparent animate-pulse" />
                  <div className="relative z-10">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h3 className="font-bold text-white text-lg">Geographic Risk Monitoring</h3>
                           <p className="text-xs text-[#2ACED1] font-bold uppercase">Global Real-time Traffic</p>
                        </div>
                        <MapIcon className="w-5 h-5 text-[#2ACED1]" />
                     </div>
                     <div className="flex flex-col items-center justify-center h-[200px] mb-8">
                        <Globe className="w-32 h-32 text-[#2ACED1]/20 animate-spin-slow" />
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] mt-4">Visualizing Global Matrix</p>
                     </div>
                     <div className="space-y-3">
                        {["North America (Low Risk)", "Europe (Medium Risk)", "Asia Pacific (Elevated Risk)"].map((region, i) => (
                           <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                              <span className="text-xs text-white/70">{region}</span>
                              <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                 <div className={`h-full ${i === 2 ? "bg-red-500 w-full" : "bg-[#2ACED1] w-1/3"}`} />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "blocklist" && (
             <div className="p-12 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm shadow-2xl text-center flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center">
                   <Ban className="w-10 h-10 text-red-500" />
                </div>
                <div className="max-w-md">
                   <h2 className="text-2xl font-bold dark:text-white mb-2">Global Restricted Lists</h2>
                   <p className="text-[#000C22]/50 dark:text-[#D8F4F7]/50 leading-relaxed mb-8">
                      Manage high-fidelity blocklists for IP addresses, email suffixes, and BIN ranges. Any payment matching these lists will be automatically rejected.
                   </p>
                   <div className="flex flex-wrap items-center justify-center gap-3">
                      <button className="px-6 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-500/20">
                         Create Entry
                      </button>
                      <button className="px-6 py-2.5 rounded-xl border border-[#2ACED1]/20 text-[#2ACED1] font-bold text-sm hover:bg-[#2ACED1]/5">
                         Import CSV Catalog
                      </button>
                   </div>
                </div>
             </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ─── Detail Modal ─── */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setSelectedTx(null)}
               className="absolute inset-0 bg-[#000C22]/90 backdrop-blur-md"
            />
            <motion.div
               layoutId={selectedTx.id}
               className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#011B3B] rounded-[2rem] border border-[#2ACED1]/30 shadow-2xl overflow-hidden flex flex-col"
            >
               <div className="p-8 border-b border-[#2ACED1]/10 bg-[#2ACED1]/5 flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-bold dark:text-white mb-2">{selectedTx.customer}</h3>
                    <div className="flex items-center gap-4">
                       <span className="text-xs font-mono font-bold text-[#2ACED1]">{selectedTx.id}</span>
                       <span className="text-xs text-[#000C22]/40 dark:text-white/40">{selectedTx.email}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedTx(null)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 dark:text-white">
                    ✕
                  </button>
               </div>

               <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                     <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40 mb-4">Risk Evaluation</p>
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-16 h-16 rounded-full border-4 border-[#2ACED1]/20 flex items-center justify-center relative">
                              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                 <circle cx="28" cy="28" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[#2ACED1]" style={{ strokeDasharray: 175, strokeDashoffset: 175 - (175 * selectedTx.risk) / 100 }} />
                              </svg>
                              <span className="font-bold text-xl dark:text-white">{selectedTx.risk}</span>
                           </div>
                           <div>
                              <p className="text-sm font-bold dark:text-white">Score: {selectedTx.risk}/100</p>
                              <p className={`text-[10px] font-bold uppercase ${selectedTx.risk > 70 ? "text-red-500" : "text-emerald-500"}`}>
                                 {selectedTx.risk > 70 ? "Critical Hazard" : "Safe Zone"}
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40 mb-4">Signal Breakdown</p>
                        <div className="space-y-4">
                           {[
                             { label: "IP Velocity", status: "Critical", icon: Activity, color: "text-red-500" },
                             { label: "Device Fingerprint", status: "Unidentified", icon: ShieldAlert, color: "text-amber-500" },
                             { label: "Card Loyalty", status: "First-timer", icon: ShieldCheck, color: "text-blue-500" },
                           ].map((signal, i) => {
                             const Icon = signal.icon;
                             return (
                               <div key={i} className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2">
                                     <Icon className={`w-3 h-3 ${signal.color}`} />
                                     <span className="font-bold dark:text-white/80">{signal.label}</span>
                                  </div>
                                  <span className={`font-bold ${signal.color}`}>{signal.status}</span>
                               </div>
                             );
                           })}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h4 className="text-lg font-bold dark:text-white flex items-center gap-2">
                        <Info className="w-5 h-5 text-[#2ACED1]" />
                        Operational Metadata
                     </h4>
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { label: "Country", value: "Russia (RU)" },
                          { label: "IP Address", value: "192.168.1.45" },
                          { label: "Card Type", value: "VISA Platinum" },
                          { label: "Merchant", value: "Cloud SaaS Pro" },
                        ].map((meta, i) => (
                           <div key={i}>
                              <p className="text-[9px] font-bold uppercase text-[#000C22]/40 dark:text-white/40 mb-1">{meta.label}</p>
                              <p className="text-sm font-bold dark:text-white">{meta.value}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="p-8 border-t border-[#2ACED1]/10 bg-black/5 dark:bg-black/20 flex flex-wrap gap-4 justify-between items-center">
                  <div className="flex gap-3">
                     <button className="px-8 py-3 rounded-xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-all">
                        Block & Report
                     </button>
                     <button className="px-8 py-3 rounded-xl border border-amber-500/30 text-amber-500 font-bold hover:bg-amber-500/5 transition-all">
                        Refund & Flag
                     </button>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-bold text-[#2ACED1] hover:underline">
                     Full Investigation Trace <ExternalLink className="w-4 h-4" />
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
