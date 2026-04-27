"use client";

import React, { useEffect, useState, useMemo } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Zap,
  Globe,
  Bell,
  Search,
  ArrowRight,
  Sparkles,
  DollarSign,
  Activity,
  Users,
  Clock,
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

import { useConfigStore } from "@/store/configStore";

// Animated counter for dashboard stats
const DashCounter = ({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) => {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => prefix + (Math.round(v) || 0).toLocaleString() + suffix);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, target]);

  return <motion.span>{display}</motion.span>;
};

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [showInsight, setShowInsight] = useState(true);
  const { isTestMode } = useConfigStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: stats, loading } = useApi(() => api.getDashboardStats(), [], true);

  const insights = useMemo(() => [
    { id: 1, text: "Your revenue is up 12.4% vs last week, mainly driven by new EU customers.", type: "growth" },
    { id: 2, text: "Average processing time decreased by 0.4s following your API optimization.", type: "performance" },
  ], []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Premium Header & Greeting ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
             <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${isTestMode ? "bg-[#2ACED1]" : "bg-emerald-500"} shadow-[0_0_8px_rgba(42,206,209,0.5)]`} />
             <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isTestMode ? "text-[#2ACED1]" : "text-emerald-500"}`}>
               {isTestMode ? "Test Environment" : "Mainnet Core Active"}
             </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#000C22] dark:text-white tracking-tight">
            Welcome back, <span className="text-[#2ACED1]">John</span>
          </h1>
          <p className="text-sm font-medium text-[#000C22]/40 dark:text-[#D8F4F7]/30 mt-3 max-w-md">
            {isTestMode 
              ? "Simulating global financial operations in a risk-free workspace." 
              : "Overview of your platform's economic pulse and system performance."
            }
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white dark:bg-[#011B3B] p-2.5 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
          <Link href="/dashboard/notifications" className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-all relative group">
             <Bell className="w-5 h-5 text-[#000C22]/40 dark:text-white/40 group-hover:text-[#2ACED1]" />
             <span className="absolute top-3.5 right-3.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-[#011B3B]" />
          </Link>
          <div className="h-8 w-px bg-black/5 dark:bg-white/10" />
          <button className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-2xl hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all group">
             <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] border-2 border-white dark:border-[#011B3B] shadow-lg shadow-[#2ACED1]/10 group-hover:scale-105 transition-transform" />
             <div className="text-left">
               <span className="text-xs font-bold text-[#000C22] dark:text-white block">Main Workspace</span>
               <span className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/20 uppercase tracking-widest">Enterprise v2.4</span>
             </div>
          </button>
        </div>
      </div>

      {/* ─── AI Insights Banner ─── */}
      <AnimatePresence>
        {showInsight && (
          <motion.div 
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            className="relative overflow-hidden p-8 rounded-[3rem] bg-gradient-to-r from-[#034E78] to-[#000C22] border border-white/5 shadow-2xl shadow-[#2ACED1]/5"
          >
             <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Sparkles className="w-48 h-48 text-[#2ACED1]" />
             </div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-start gap-6">
                   <div className="w-16 h-16 rounded-[2rem] bg-[#2ACED1]/10 border border-[#2ACED1]/20 flex items-center justify-center text-[#2ACED1] shadow-lg shadow-[#2ACED1]/5">
                      <Zap className="w-7 h-7 fill-current" />
                   </div>
                   <div>
                      <h3 className="text-white font-bold text-xl mb-1 tracking-tight">Intelligence Briefing</h3>
                      <p className="text-[#D8F4F7]/50 text-sm max-w-xl leading-relaxed font-medium">
                        {insights[0].text}
                      </p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <button className="px-8 py-3.5 rounded-2xl bg-white text-[#000C22] text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-[#2ACED1] hover:text-white active:scale-95 shadow-xl shadow-black/20">
                      Full Analysis
                   </button>
                   <button onClick={() => setShowInsight(false)} className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5 rotate-45" />
                   </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Key Metrics Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Available Liquidity", value: stats?.availableBalance ?? 42850, prefix: "$", suffix: "", icon: DollarSign, change: "Ready", up: true, color: "text-[#2ACED1]" },
          { label: "Settlement Queue", value: stats?.pendingBalance ?? 12400, prefix: "$", suffix: "", icon: Clock, change: "Transit", up: false, color: "text-amber-500" },
          { label: "Gross Volume", value: stats?.revenue ?? 158900, prefix: "$", suffix: "", icon: Activity, change: stats?.revenueChange ?? "+12.4%", up: true, color: "text-emerald-500" },
          { label: "Entity Base", value: stats?.customers ?? 1240, prefix: "", suffix: "", icon: Users, change: stats?.customersChange ?? "+8.1%", up: true, color: "text-blue-500" },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-10 rounded-[3rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#2ACED1]/5 transition-all duration-500 group"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] transition-transform group-hover:scale-110">
                 <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1.5 text-[9px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest ${
                stat.label.includes("Available") ? "bg-[#2ACED1]/10 text-[#2ACED1]" :
                stat.label.includes("Queue") ? "bg-amber-500/10 text-amber-500" :
                stat.up ? "bg-emerald-500/10 text-emerald-500" : "bg-[#2ACED1]/10 text-[#2ACED1]"
              }`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-4xl font-bold text-[#000C22] dark:text-white tracking-tighter mb-2">
              <DashCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix || ""} />
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/20">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ─── Visual Data Layer ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Growth Chart */}
        <div className="lg:col-span-2 p-10 md:p-12 rounded-[3.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm h-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#000C22] dark:text-white tracking-tight">Economic Orchestration</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/20 mt-2">Real-time performance distribution</p>
            </div>
            <div className="flex items-center gap-2 p-1.5 bg-black/[0.03] dark:bg-white/[0.03] rounded-2xl border border-black/5 dark:border-white/5">
               {["7D", "30D", "12M"].map((t) => (
                  <button key={t} className={`px-6 py-2.5 rounded-xl text-[9px] font-bold tracking-widest transition-all ${t === "30D" ? "bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20" : "text-[#000C22]/40 dark:text-white/40 hover:text-[#2ACED1]"}`}>
                     {t}
                  </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
             {[
               { label: "Net Yield", value: "$42.8k", up: true, change: "+12%" },
               { label: "Gross Cap", value: "$158.9k", up: true, change: "+8%" },
               { label: "Expenses", value: "$4.1k", up: false, change: "+2%" },
               { label: "Liquidity", value: "$38.2k", up: true, change: "+15%" },
             ].map((m, i) => (
               <div key={i} className="p-6 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                  <p className="text-[9px] font-bold text-[#000C22]/20 dark:text-white/20 uppercase tracking-[0.2em] mb-2">{m.label}</p>
                  <div className="flex items-center justify-between">
                     <span className="text-xl font-bold text-[#000C22] dark:text-white tracking-tight">{m.value}</span>
                     <span className={`text-[9px] font-bold ${m.up ? "text-emerald-500" : "text-[#2ACED1]"}`}>{m.change}</span>
                  </div>
               </div>
             ))}
          </div>

          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.revenueData || []}>
                <defs>
                  <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2ACED1" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#2ACED1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#011B3B", border: "none", borderRadius: "24px", padding: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                  itemStyle={{ color: "#2ACED1", fontWeight: 800, fontSize: "14px" }}
                  labelStyle={{ color: "#fff", marginBottom: "8px", fontSize: "11px", opacity: 0.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2ACED1" strokeWidth={6} fill="url(#mainGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Distribution */}
        <div className="p-10 rounded-[3rem] bg-[#000C22] border border-[#2ACED1]/20 shadow-2xl h-full flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Market Impact</h3>
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mt-1">Global Presence</p>
              </div>
              <Globe className="w-6 h-6 text-[#2ACED1] animate-spin-slow" />
           </div>
           <div className="flex-1 flex flex-col items-center justify-center py-10">
              <div className="relative mb-12">
                 <div className="absolute inset-0 bg-[#2ACED1]/20 blur-[80px] rounded-full animate-pulse" />
                 <Activity className="w-28 h-28 text-[#2ACED1] relative z-10" />
              </div>
              <div className="w-full space-y-8">
                 {[
                   { l: "Americas Hub", v: 45, c: "bg-blue-500" },
                   { l: "European Union", v: 32, c: "bg-emerald-500" },
                   { l: "Asia Pacific", v: 18, c: "bg-amber-500" },
                 ].map((loc, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-white/40">
                         <span>{loc.l}</span>
                         <span>{loc.v}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} animate={{ width: `${loc.v}%` }} className={`h-full ${loc.c} rounded-full`} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <button className="w-full py-5 rounded-[2rem] bg-white/5 hover:bg-[#2ACED1]/10 text-[#2ACED1] text-[10px] font-bold uppercase tracking-widest transition-all mt-10 border border-white/5 active:scale-95">
              Regional Analytics
           </button>
        </div>
      </div>

      {/* ─── Recent Transactions & Quick Actions Split ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Transactions Table */}
        <div className="lg:col-span-3 rounded-[3.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
          <div className="p-10 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#000C22] dark:text-white tracking-tight">Recent Ledger Movements</h3>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20 mt-1">Live audit log of platform capital</p>
            </div>
            <Link href="/dashboard/transactions" className="text-[10px] font-bold uppercase tracking-widest text-[#2ACED1] hover:underline">Full Dataset</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black/[0.02] dark:bg-white/[0.02]">
                  <th className="text-left text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20 px-10 py-6">Counterparty</th>
                  <th className="text-left text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20 px-10 py-6">Protocol</th>
                  <th className="text-left text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20 px-10 py-6">Volume</th>
                  <th className="text-right text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20 px-10 py-6">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {(stats?.recentTransactions || []).slice(0, 6).map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#2ACED1]/5 transition-all cursor-pointer group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-[#2ACED1]/10">
                          {tx.name.charAt(0)}
                        </div>
                        <div>
                           <span className="text-sm font-bold text-[#000C22] dark:text-white block group-hover:text-[#2ACED1] transition-colors tracking-tight">{tx.name}</span>
                           <span className="text-[9px] text-[#000C22]/30 dark:text-white/20 font-mono uppercase font-bold tracking-widest mt-1 block">{tx.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/50 dark:text-white/30">{tx.type}</td>
                    <td className={`px-10 py-8 text-sm font-bold tracking-tight ${tx.amount.startsWith("+") ? "text-emerald-500" : "text-[#000C22] dark:text-white"}`}>{tx.amount}</td>
                    <td className="px-10 py-8 text-right">
                      <span className={`text-[9px] font-bold px-4 py-1.5 rounded-xl uppercase tracking-widest
                        ${tx.status === "Succeeded" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"}
                      `}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Utilities */}
        <div className="space-y-10">
           <div className="p-10 rounded-[3rem] bg-gradient-to-br from-[#2ACED1] to-[#034E78] text-white shadow-2xl shadow-[#2ACED1]/10">
              <h4 className="font-bold text-lg mb-8 tracking-tight">Quick Connect</h4>
              <div className="grid grid-cols-2 gap-5">
                 {[
                   { n: "Relay", i: "Send", c: "bg-white/10" },
                   { n: "Asset", i: "FileText", c: "bg-white/10" },
                   { n: "Link", i: "Link", c: "bg-white/10" },
                   { n: "Studio", i: "Code", c: "bg-white/10" },
                 ].map((act, i) => (
                   <button key={i} className={`p-5 rounded-[2rem] ${act.c} hover:bg-white/20 transition-all flex flex-col items-center gap-3 group active:scale-95 shadow-sm`}>
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                         {(() => {
                           const Icon = getIcon(act.i);
                           return <Icon className="w-5 h-5 text-white" />;
                         })()}
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{act.n}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="p-10 rounded-[3rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
              <h4 className="font-bold text-[#000C22] dark:text-white mb-8 tracking-tight">Protocol Integrity</h4>
              <div className="space-y-8">
                 {[
                   { l: "API Nodes", v: "100%", s: "nominal" },
                   { l: "Gateway", v: "22ms", s: "fast" },
                   { l: "Inbound", v: "99.9%", s: "stable" },
                 ].map((h, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-[#000C22]/30 dark:text-white/20 uppercase tracking-[0.2em]">{h.l}</span>
                      <div className="text-right">
                         <span className="text-sm font-bold text-[#000C22] dark:text-white block tracking-tight">{h.v}</span>
                         <span className="text-[8px] font-bold uppercase text-emerald-500 tracking-widest">{h.s}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-4 rounded-2xl border border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#2ACED1]/5 transition-all text-[#2ACED1] active:scale-95">
                 Network Status
              </button>
           </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
