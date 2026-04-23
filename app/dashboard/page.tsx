"use client";

import React, { useEffect, useState, useMemo } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
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
    <div className="flex flex-col gap-8 pb-20">
      {/* ─── Premium Header & Greeting ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ScrollReveal direction="left">
          <div className={loading ? "animate-pulse" : ""}>
            <div className="flex items-center gap-3 mb-2">
               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2ACED1]">System Live</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#000C22] dark:text-white tracking-tight">
              Welcome back, <span className="text-[#2ACED1]">John</span>
            </h1>
            <p className="text-[#000C22]/50 dark:text-[#D8F4F7]/50 font-medium mt-2">Here&apos;s the current pulse of your financial ecosystem.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
           <div className="flex items-center gap-4 bg-white/50 dark:bg-[#011B3B]/50 p-2 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-md">
              <button className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative">
                 <Bell className="w-5 h-5 text-[#000C22]/60 dark:text-white/60" />
                 <span className="absolute top-3 right-3 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-[#011B3B]" />
              </button>
              <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
              <button className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2ACED1] to-[#034E78] border-2 border-white dark:border-[#011B3B]" />
                 <span className="text-sm font-bold text-[#000C22] dark:text-white">Workspace 1</span>
              </button>
           </div>
        </ScrollReveal>
      </div>

      {/* ─── AI Insights Banner ─── */}
      <AnimatePresence>
        {showInsight && (
          <ScrollReveal direction="bottom" delay={0.1}>
            <motion.div 
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-[#034E78] to-[#000C22] border border-[#2ACED1]/30 shadow-2xl shadow-[#2ACED1]/10"
            >
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles className="w-32 h-32 text-[#2ACED1]" />
               </div>
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                     <div className="p-3 rounded-2xl bg-[#2ACED1]/20 border border-[#2ACED1]/30 text-[#2ACED1]">
                        <Zap className="w-6 h-6 fill-current" />
                     </div>
                     <div>
                        <h3 className="text-white font-bold text-lg mb-1">Smart Analytics Insight</h3>
                        <p className="text-[#D8F4F7]/70 text-sm max-w-xl leading-relaxed">
                          {insights[0].text}
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10">
                        View Detailed Report
                     </button>
                     <button onClick={() => setShowInsight(false)} className="p-2.5 text-white/40 hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4 rotate-45" />
                     </button>
                  </div>
               </div>
            </motion.div>
          </ScrollReveal>
        )}
      </AnimatePresence>

      {/* ─── Key Metrics Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: stats?.revenue ?? 0, prefix: "$", icon: DollarSign, change: stats?.revenueChange ?? "+12.4%", up: true, color: "text-[#2ACED1]" },
          { label: "Transactions", value: stats?.transactions ?? 0, prefix: "", icon: Activity, change: stats?.transactionsChange ?? "+5.2%", up: true, color: "text-emerald-500" },
          { label: "Active Customers", value: stats?.customers ?? 0, prefix: "", icon: Users, change: stats?.customersChange ?? "+8.1%", up: true, color: "text-blue-500" },
          { label: "Avg. Processing", value: stats?.processingTime ?? 0, prefix: "", suffix: "s", icon: Clock, change: stats?.processingTimeChange ?? "-0.4s", up: false, color: "text-purple-500" },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction="bottom" delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-[2rem] bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#2ACED1]/10 transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-black/5 dark:bg-white/5 transition-transform group-hover:rotate-12`}>
                   <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${stat.up ? "bg-emerald-500/10 text-emerald-500" : "bg-[#2ACED1]/10 text-[#2ACED1]"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-4xl font-black text-[#000C22] dark:text-white tracking-tighter mb-1">
                <DashCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix || ""} />
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">{stat.label}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Visual Data Layer ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <ScrollReveal direction="left" className="lg:col-span-2">
          <div className="p-8 rounded-[2.5rem] bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 shadow-xl h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h3 className="text-2xl font-black text-[#000C22] dark:text-white tracking-tight">Financial Velocity</h3>
                <p className="text-sm text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-medium">Real-time revenue orchestration over 30 days</p>
              </div>
              <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-xl">
                 {["1D", "1W", "1M", "1Y"].map((t) => (
                    <button key={t} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${t === "1M" ? "bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20" : "text-[#000C22]/40 dark:text-white/40 hover:text-[#2ACED1]"}`}>
                       {t}
                    </button>
                 ))}
              </div>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.revenueData || []}>
                  <defs>
                    <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2ACED1" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#2ACED1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                  <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "20px", color: "#fff", fontSize: 12, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                    cursor={{ stroke: "#2ACED1", strokeWidth: 1, strokeDasharray: "4 4" }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#2ACED1" strokeWidth={4} fill="url(#mainGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollReveal>

        {/* Global Distribution */}
        <ScrollReveal direction="right">
          <div className="p-8 rounded-[2.5rem] bg-[#000C22] border border-[#2ACED1]/20 shadow-2xl h-full flex flex-col">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white tracking-tight">Global Impact</h3>
                <Globe className="w-5 h-5 text-[#2ACED1] animate-spin-slow" />
             </div>
             <div className="flex-1 flex flex-col items-center justify-center py-6">
                <div className="relative mb-10">
                   <div className="absolute inset-0 bg-[#2ACED1]/20 blur-[60px] rounded-full animate-pulse" />
                   <Activity className="w-24 h-24 text-[#2ACED1] relative z-10" />
                </div>
                <div className="w-full space-y-6">
                   {[
                     { l: "United States", v: 45, c: "bg-blue-500" },
                     { l: "European Union", v: 32, c: "bg-emerald-500" },
                     { l: "Asia Pacific", v: 18, c: "bg-amber-500" },
                   ].map((loc, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-white/60">
                           <span>{loc.l}</span>
                           <span>{loc.v}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${loc.v}%` }} className={`h-full ${loc.c}`} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <button className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-[#2ACED1] text-xs font-bold transition-all mt-8 border border-white/5">
                Explore Regional Data
             </button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Recent Transactions & Quick Actions Split ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Transactions Table */}
        <ScrollReveal direction="bottom" className="lg:col-span-3">
          <div className="rounded-[2.5rem] bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 overflow-hidden shadow-xl">
            <div className="p-8 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-black text-[#000C22] dark:text-white">Recent Movements</h3>
              <button className="text-xs font-bold text-[#2ACED1] hover:underline">View All Records</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                    <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-8 py-4">Counterparty</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-8 py-4">Protocol</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-8 py-4">Volume</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-8 py-4">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {(stats?.recentTransactions || []).slice(0, 6).map((tx, i) => (
                    <tr key={tx.id} className="hover:bg-[#2ACED1]/5 transition-all cursor-pointer group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white text-xs font-black shadow-lg shadow-[#2ACED1]/20">
                            {tx.name.charAt(0)}
                          </div>
                          <div>
                             <span className="text-sm font-bold text-[#000C22] dark:text-white block group-hover:text-[#2ACED1] transition-colors">{tx.name}</span>
                             <span className="text-[10px] text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-mono uppercase">{tx.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-xs font-bold text-[#000C22]/60 dark:text-[#D8F4F7]/60">{tx.type}</td>
                      <td className={`px-8 py-5 text-sm font-black ${tx.amount.startsWith("+") ? "text-emerald-500" : "text-[#000C22] dark:text-white"}`}>{tx.amount}</td>
                      <td className="px-8 py-5">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter
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
        </ScrollReveal>

        {/* Quick Utilities */}
        <ScrollReveal direction="right" className="space-y-6">
           <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#2ACED1] to-[#034E78] text-white shadow-2xl shadow-[#2ACED1]/20">
              <h4 className="font-bold text-lg mb-6">Quick Connect</h4>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { n: "Send", i: "Send", c: "bg-white/10" },
                   { n: "Invoice", i: "FileText", c: "bg-white/10" },
                   { n: "Link", i: "Link", c: "bg-white/10" },
                   { n: "API", i: "Code", c: "bg-white/10" },
                 ].map((act, i) => (
                   <button key={i} className={`p-4 rounded-2xl ${act.c} hover:scale-105 transition-all flex flex-col items-center gap-2 group`}>
                      <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20">
                         {(() => {
                           const Icon = getIcon(act.i);
                           return <Icon className="w-4 h-4 text-white" />;
                         })()}
                      </div>
                      <span className="text-[10px] font-bold uppercase">{act.n}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 shadow-xl">
              <h4 className="font-bold text-[#000C22] dark:text-white mb-6">System Health</h4>
              <div className="space-y-6">
                 {[
                   { l: "API Nodes", v: "100%", s: "nominal" },
                   { l: "Database", v: "22ms", s: "fast" },
                   { l: "Webhooks", v: "99.9%", s: "stable" },
                 ].map((h, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#000C22]/50 dark:text-[#D8F4F7]/50 uppercase tracking-widest">{h.l}</span>
                      <div className="text-right">
                         <span className="text-sm font-black text-[#000C22] dark:text-white block">{h.v}</span>
                         <span className="text-[8px] font-black uppercase text-emerald-500 tracking-tighter">{h.s}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-3 rounded-xl border border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#2ACED1]/5 transition-all text-[#2ACED1]">
                 View Detailed Status
              </button>
           </div>
        </ScrollReveal>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
