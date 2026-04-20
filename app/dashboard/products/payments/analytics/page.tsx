"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  Filter, 
  ArrowUpRight,
  PieChart,
  LineChart,
  Activity
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart as RePieChart, Pie, Line, LineChart as ReLineChart
} from "recharts";

const performanceData = [
  { name: "Mon", revenue: 45000, attempts: 1200, successful: 1150 },
  { name: "Tue", revenue: 52000, attempts: 1450, successful: 1380 },
  { name: "Wed", revenue: 48000, attempts: 1100, successful: 1050 },
  { name: "Thu", revenue: 61000, attempts: 1600, successful: 1540 },
  { name: "Fri", revenue: 72000, attempts: 1900, successful: 1820 },
  { name: "Sat", revenue: 35000, attempts: 900, successful: 870 },
  { name: "Sun", revenue: 28000, attempts: 750, successful: 720 },
];

const conversionData = [
  { name: "Card", value: 72, color: "#2ACED1" },
  { name: "Wallet", value: 18, color: "#008E96" },
  { name: "Bank", value: 10, color: "#034E78" },
];

export default function PaymentsAnalyticsPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Payments Analytics</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Deep insights into conversion rates, volume trends, and payment health.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2ACED1]" />
                <select className="appearance-none pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-[#011B3B] border border-[#2ACED1]/20 text-sm font-bold dark:text-white outline-none cursor-pointer">
                   <option>Last 7 days</option>
                   <option>Last 30 days</option>
                   <option>Year to date</option>
                </select>
             </div>
             <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white text-sm font-bold shadow-lg">
                <Download className="w-4 h-4" /> Export Report
             </button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Success Rate Large Card ─── */}
      <ScrollReveal direction="bottom">
         <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ACED1]/10 blur-[100px] -z-1" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
               <div className="space-y-6">
                  <div>
                     <p className="text-[10px] font-bold text-[#2ACED1] uppercase tracking-[0.3em] mb-2">Checkout Success Rate</p>
                     <p className="text-5xl font-bold text-white">96.4%</p>
                     <div className="flex items-center gap-2 mt-3">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-500">+1.2% from last week</span>
                     </div>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">
                     Your conversion rate is 4.1% higher than the industry average for SaaS products in your region.
                  </p>
                  <button className="text-xs font-bold text-[#2ACED1] underline underline-offset-4 flex items-center gap-1">
                     View breakdown <ArrowUpRight className="w-3 h-3" />
                  </button>
               </div>
               
               <div className="lg:col-span-2 h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <ReLineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#666" }} />
                        <YAxis hide />
                        <Tooltip contentStyle={{ backgroundColor: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "12px", color: "#fff" }} />
                        <Line type="monotone" dataKey="successful" stroke="#2ACED1" strokeWidth={4} dot={{ r: 4, fill: "#2ACED1", strokeWidth: 0 }} />
                        <Line type="monotone" dataKey="attempts" stroke="rgba(255,255,255,0.1)" strokeWidth={2} dot={false} />
                     </ReLineChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Volume Distribution */}
         <ScrollReveal direction="left">
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
               <div className="flex items-center justify-between mb-8">
                  <div>
                     <h3 className="font-bold dark:text-white text-lg">Volume by Channel</h3>
                     <p className="text-xs text-[#000C22]/40 dark:text-white/40 font-bold uppercase">Payment method split</p>
                  </div>
                  <PieChart className="w-5 h-5 text-[#2ACED1]" />
               </div>
               <div className="h-[250px] flex items-center">
                  <div className="w-1/2 h-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                           <Pie data={conversionData} innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                              {conversionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                           </Pie>
                        </RePieChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-4">
                     {conversionData.map(c => (
                        <div key={c.name} className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                              <span className="text-sm font-medium dark:text-white/70">{c.name}</span>
                           </div>
                           <span className="text-sm font-bold dark:text-white">{c.value}%</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </ScrollReveal>

         {/* Daily Revenue */}
         <ScrollReveal direction="right">
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
               <div className="flex items-center justify-between mb-8">
                  <div>
                     <h3 className="font-bold dark:text-white text-lg">Daily Revenue</h3>
                     <p className="text-xs text-[#000C22]/40 dark:text-white/40 font-bold uppercase">Gross Settlements</p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-[#2ACED1]" />
               </div>
               <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(42,206,209,0.05)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#888" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#888" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "12px", color: "#fff" }} />
                        <Bar dataKey="revenue" fill="#2ACED1" radius={[4, 4, 0, 0]} barSize={34}>
                           {performanceData.map((e, i) => <Cell key={i} fill={i === 4 ? "#034E78" : "#2ACED1"} />)}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </ScrollReveal>
      </div>

      {/* ─── Health Monitor ─── */}
      <ScrollReveal direction="bottom">
         <div className="p-6 rounded-2xl bg-[#2ACED1]/5 border border-[#2ACED1]/20 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-[#011B3B] flex items-center justify-center border border-[#2ACED1]/20">
                  <Activity className="w-6 h-6 text-[#2ACED1] animate-pulse" />
               </div>
               <div>
                  <h4 className="font-bold dark:text-white italic">Operational Health</h4>
                  <p className="text-xs text-[#000C22]/50 dark:text-white/40">API Status: <span className="text-emerald-500 font-bold">100% Up</span> • Latency: <span className="text-emerald-500 font-bold">42ms</span></p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="px-4 py-2 rounded-xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <p className="text-[10px] font-bold text-white/30 uppercase mb-1">Average Auth Time</p>
                  <p className="text-lg font-bold dark:text-white">1.8s</p>
               </div>
               <div className="px-4 py-2 rounded-xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <p className="text-[10px] font-bold text-white/30 uppercase mb-1">3DS Interaction</p>
                  <p className="text-lg font-bold dark:text-white">12.4%</p>
               </div>
            </div>
         </div>
      </ScrollReveal>
    </div>
  );
}
