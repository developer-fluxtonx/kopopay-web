"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Download, 
  Filter, 
  PieChart as PieChartIcon, 
  Globe2, 
  Users,
  Layers,
  ArrowRight
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Cell, 
  Pie 
} from "recharts";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

const COLORS = ["#2ACED1", "#034E78", "#008E96", "#F59E0B", "#10B981"];

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState("30D");

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: stats } = useApi(() => api.getDashboardStats(), [], true);

  if (!mounted) return null;

  const deviceData = [
    { name: "Desktop", value: 65 },
    { name: "Mobile", value: 28 },
    { name: "Tablet", value: 7 },
  ];

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-[#000C22] dark:text-white mb-2 tracking-tight">Intelligence Hub</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Predictive insights and real-time performance tracking.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <div className="flex p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                {["7D", "30D", "12M", "ALL"].map((range) => (
                  <button 
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${timeRange === range ? "bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20" : "text-[#000C22]/40 dark:text-white/40"}`}
                  >
                    {range}
                  </button>
                ))}
             </div>
             <button className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 text-[#2ACED1] hover:bg-[#2ACED1]/10 transition-all">
                <Download className="w-5 h-5" />
             </button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── High-Level Summary ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Net Revenue", value: 124500, change: "+18.2%", up: true, icon: TrendingUp },
          { label: "Avg. Order Value", value: 84.20, change: "+4.1%", up: true, icon: Layers },
          { label: "Retention Rate", value: 72, suffix: "%", change: "-1.2%", up: false, icon: Users },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
            <motion.div whileHover={{ y: -5 }} className="p-8 rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-[#2ACED1]/10 text-[#2ACED1]">
                     <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${stat.up ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
               </div>
               <p className="text-4xl font-black text-[#000C22] dark:text-white tracking-tighter mb-1">
                 {stat.label.includes("Revenue") || stat.label.includes("Value") ? "$" : ""}{stat.value.toLocaleString()}{stat.suffix || ""}
               </p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">{stat.label}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Main Performance Graph ─── */}
      <ScrollReveal direction="bottom">
        <div className="p-10 rounded-[3rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-xl">
           <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-[#000C22] dark:text-white tracking-tight">Growth Projection</h3>
                <p className="text-sm text-[#000C22]/40 dark:text-[#D8F4F7]/40">Cumulative volume trends vs. goals.</p>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#2ACED1]" />
                    <span className="text-xs font-bold text-[#000C22]/60 dark:text-white/60">Actual</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/10 border border-[#2ACED1] border-dashed" />
                    <span className="text-xs font-bold text-[#000C22]/60 dark:text-white/60">Goal</span>
                 </div>
              </div>
           </div>
           <div className="h-[400px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={stats?.revenueData || []}>
                 <defs>
                   <linearGradient id="analGrad" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#2ACED1" stopOpacity={0.3} />
                     <stop offset="100%" stopColor="#2ACED1" stopOpacity={0} />
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                 <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                 <YAxis tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                 <Tooltip
                   contentStyle={{ background: "#011B3B", border: "none", borderRadius: "24px", padding: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                   itemStyle={{ color: "#2ACED1", fontWeight: 800, fontSize: "14px" }}
                   labelStyle={{ color: "#fff", marginBottom: "8px", fontSize: "12px", opacity: 0.5 }}
                 />
                 <Area type="monotone" dataKey="revenue" stroke="#2ACED1" strokeWidth={6} fill="url(#analGrad)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </ScrollReveal>

      {/* ─── Bottom Insights Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Device Distribution */}
        <ScrollReveal direction="left" className="lg:col-span-1">
          <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 h-full">
            <h4 className="text-lg font-black text-[#000C22] dark:text-white mb-8">Device Mix</h4>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={10}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-4">
               {deviceData.map((d, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                       <span className="text-xs font-bold text-[#000C22]/60 dark:text-white/60">{d.name}</span>
                    </div>
                    <span className="text-xs font-black text-[#000C22] dark:text-white">{d.value}%</span>
                 </div>
               ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Global Sales Map (Visual Concept) */}
        <ScrollReveal direction="bottom" className="lg:col-span-2">
          <div className="p-8 rounded-[2.5rem] bg-[#000C22] border border-[#2ACED1]/20 text-white h-full relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Globe2 className="w-64 h-64 text-[#2ACED1]" />
             </div>
             
             <div className="relative z-10">
                <h4 className="text-xl font-black mb-1">Global Expansion</h4>
                <p className="text-sm text-white/40 mb-10">Active volume across 42 markets.</p>
                
                <div className="space-y-8">
                   {[
                     { country: "North America", value: "$420.5k", growth: "+12%", active: true },
                     { country: "Europe", value: "$285.2k", growth: "+8%", active: true },
                     { country: "Middle East", value: "$12.4k", growth: "+145%", active: false },
                   ].map((market, i) => (
                     <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className={`w-3 h-3 rounded-full ${market.active ? "bg-[#2ACED1] shadow-[0_0_10px_#2ACED1]" : "bg-white/10"}`} />
                           <span className="font-bold tracking-tight">{market.country}</span>
                        </div>
                        <div className="flex items-center gap-8">
                           <span className="font-black text-lg">{market.value}</span>
                           <span className="text-[#2ACED1] text-xs font-black">{market.growth}</span>
                           <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all" />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
