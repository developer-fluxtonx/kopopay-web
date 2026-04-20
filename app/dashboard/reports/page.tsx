"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
   BarChart3, 
   PieChart, 
   TrendingUp, 
   TrendingDown, 
   Download, 
   Calendar, 
   ArrowUpRight, 
   ArrowDownRight,
   Filter,
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart as RePieChart, Pie
} from "recharts";

const data = [
  { name: "Mon", net: 12000, gross: 12500, fees: 500 },
  { name: "Tue", net: 19000, gross: 19800, fees: 800 },
  { name: "Wed", net: 15000, gross: 15600, fees: 600 },
  { name: "Thu", net: 21000, gross: 21900, fees: 900 },
  { name: "Fri", net: 26000, gross: 27100, fees: 1100 },
  { name: "Sat", net: 18000, gross: 18700, fees: 700 },
  { name: "Sun", net: 9500, gross: 9900, fees: 400 },
];

const pieData = [
  { name: "Card Payments", value: 65, color: "#2ACED1" },
  { name: "Bank Transfers", value: 20, color: "#008E96" },
  { name: "Digital Wallets", value: 15, color: "#034E78" },
];

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState("Last 7 days");
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Financial Reports</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Analyze your revenue, fees, and reconciliation data.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <div className="relative">
                <select 
                   value={timeframe}
                   onChange={(e) => setTimeframe(e.target.value)}
                   className="appearance-none pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-[#011B3B] border border-[#2ACED1]/20 text-sm font-bold dark:text-white outline-none cursor-pointer hover:border-[#2ACED1] transition-all"
                >
                   <option>Last 24 hours</option>
                   <option>Last 7 days</option>
                   <option>Last 30 days</option>
                   <option>Year to date</option>
                </select>
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2ACED1]" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                   <ArrowDownRight className="w-3 h-3 text-[#2ACED1]" />
                </div>
             </div>
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-action-button text-white text-sm font-bold shadow-lg"
             >
                <Download className="w-4 h-4" /> Export
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Top Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: "Net Revenue", value: "$452,800.00", change: "+12.5%", up: true, icon: "DollarSign" },
            { label: "Total Fees", value: "$18,420.00", change: "+8.2%", up: true, icon: "Briefcase" },
            { label: "Refunds", value: "$2,100.00", change: "-15.3%", up: false, icon: "FileText" },
         ].map((stat, i) => (
            <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
               <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20"
               >
                  <div className="flex items-center justify-between mb-4">
                     <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                        {(() => {
                           const Icon = getIcon(stat.icon as string);
                           return <Icon className="w-5 h-5 text-[#2ACED1]" />;
                        })()}
                     </div>
                     <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.up ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"}`}>
                        {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stat.change}
                     </div>
                  </div>
                  <p className="text-3xl font-bold dark:text-white mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">{stat.label}</p>
               </motion.div>
            </ScrollReveal>
         ))}
      </div>

      {/* ─── Complex Charting ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <ScrollReveal direction="left">
            <motion.div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 h-full">
               <div className="flex items-center justify-between mb-8">
                  <div>
                     <h3 className="text-lg font-bold dark:text-white">Revenue Analysis</h3>
                     <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase tracking-widest">Gross vs Net</p>
                  </div>
                  <BarChart3 className="w-5 h-5 text-[#2ACED1]" />
               </div>
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={data}>
                        <defs>
                           <linearGradient id="grossGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2ACED1" stopOpacity={0.2} />
                              <stop offset="100%" stopColor="#2ACED1" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(42,206,209,0.1)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                        <Tooltip 
                           contentStyle={{ backgroundColor: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "12px", color: "#fff" }}
                        />
                        <Area type="monotone" dataKey="gross" stroke="#2ACED1" strokeWidth={3} fill="url(#grossGrad)" />
                        <Area type="monotone" dataKey="net" stroke="#008E96" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </motion.div>
         </ScrollReveal>

         <ScrollReveal direction="right">
            <motion.div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 h-full">
               <div className="flex items-center justify-between mb-8">
                  <div>
                     <h3 className="text-lg font-bold dark:text-white">Payment Methods</h3>
                     <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase tracking-widest">Volume distribution</p>
                  </div>
                  <PieChart className="w-5 h-5 text-[#2ACED1]" />
               </div>
               <div className="h-[300px] flex items-center">
                  <div className="w-1/2 h-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                           <Pie 
                              data={pieData} 
                              innerRadius={60} 
                              outerRadius={80} 
                              paddingAngle={5} 
                              dataKey="value"
                              stroke="none"
                           >
                              {pieData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                           </Pie>
                        </RePieChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-4 pr-4">
                     {pieData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-xs font-bold dark:text-white/80">{item.name}</span>
                           </div>
                           <span className="text-xs font-bold dark:text-white">{item.value}%</span>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.div>
         </ScrollReveal>
      </div>

      {/* ─── Reconciliation & Tax Module ─── */}
      <ScrollReveal direction="bottom">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ACED1] opacity-5 blur-3xl group-hover:opacity-10 transition-opacity" />
               <h4 className="text-xl font-bold text-white mb-2">Automated Reconciliation</h4>
               <p className="text-sm text-white/50 mb-6">Sync your bank statements with Kopo Pay ledger automatically.</p>
               <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/10 uppercase tracking-widest">
                  Configure Sync <ArrowUpRight className="w-3 h-3" />
               </button>
            </div>

            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#008E96]/10 flex items-center justify-center">
                     <Filter className="w-5 h-5 text-[#008E96]" />
                  </div>
                  <h4 className="font-bold dark:text-white">Tax Summary</h4>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between p-3 rounded-lg bg-black/5 dark:bg-white/5">
                     <span className="text-xs font-bold dark:text-white/60">Estimated Sales Tax</span>
                     <span className="text-xs font-bold dark:text-white">$3,240.50</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-black/5 dark:bg-white/5">
                     <span className="text-xs font-bold dark:text-white/60">VAT Collected</span>
                     <span className="text-xs font-bold dark:text-white">$1,120.00</span>
                  </div>
               </div>
            </div>
         </div>
      </ScrollReveal>
    </div>
  );
}
