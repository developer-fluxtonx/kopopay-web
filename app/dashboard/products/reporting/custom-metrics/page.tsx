"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  LineChart, 
  TrendingUp, 
  MoreVertical, 
  Plus, 
  ChevronRight, 
  Settings, 
  Target, 
  Layers, 
  Zap,
  ArrowUpRight,
  Filter,
  Download
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, 
  LineChart as ReLineChart, Line 
} from "recharts";

const metricData = [
  { name: "Mon", current: 2400, target: 2000 },
  { name: "Tue", current: 1398, target: 2000 },
  { name: "Wed", current: 9800, target: 8000 },
  { name: "Thu", current: 3908, target: 4000 },
  { name: "Fri", current: 4800, target: 5000 },
  { name: "Sat", current: 3800, target: 3000 },
  { name: "Sun", current: 4300, target: 4000 },
];

const dashboardMetrics = [
  { id: "cm_01", name: "LTV to CAC Ratio", value: "3.4:1", health: "Healthy", trend: "+0.2" },
  { id: "cm_02", name: "Quick Ratio", value: "1.8", health: "Warning", trend: "-0.1" },
  { id: "cm_03", name: "Net Revenue Retention", value: "114%", health: "Excellent", trend: "+2.4%" },
  { id: "cm_04", name: "Magic Number", value: "0.82", health: "Healthy", trend: "+0.05" },
];

export default function CustomMetricsPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1 flex items-center gap-3">
               <Layers className="w-8 h-8 text-[#2ACED1]" />
               Custom Metrics
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Build your own north-star metrics. Combine transaction data with custom business logic.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Add Metric
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Metric Workbench Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {dashboardMetrics.map((metric, i) => (
            <ScrollReveal key={metric.id} direction="bottom" delay={i * 0.1}>
               <motion.div 
                  whileHover={{ y: -4, borderColor: "rgba(42,206,209,0.5)" }}
                  className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 group transition-all"
               >
                  <div className="flex items-center justify-between mb-4">
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        metric.health === "Excellent" ? "bg-emerald-500/10 text-emerald-600" :
                        metric.health === "Healthy" ? "bg-blue-500/10 text-blue-600" :
                        "bg-amber-500/10 text-amber-600"
                     }`}>
                        {metric.health}
                     </span>
                     <MoreVertical className="w-4 h-4 text-white/20 group-hover:text-white transition-colors cursor-pointer" />
                  </div>
                  <h3 className="text-sm font-bold dark:text-white group-hover:text-[#2ACED1] transition-colors">{metric.name}</h3>
                  <div className="flex items-end justify-between mt-4">
                     <p className="text-3xl font-bold dark:text-white">{metric.value}</p>
                     <p className={`text-xs font-bold ${metric.trend.startsWith("+") ? "text-emerald-500" : "text-amber-500"}`}>{metric.trend}</p>
                  </div>
               </motion.div>
            </ScrollReveal>
         ))}
      </div>

      {/* ─── Primary Visualization ─── */}
      <ScrollReveal direction="bottom">
         <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ACED1]/5 blur-[80px]" />
            <div className="flex flex-wrap items-center justify-between mb-10 gap-4 relative z-10">
               <div>
                  <h3 className="text-xl font-bold text-white">Metrics Pulse Monitor</h3>
                  <p className="text-xs text-[#2ACED1] font-bold uppercase tracking-widest mt-1">Real-time performance vs goals</p>
               </div>
               <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest">
                     <Download className="w-3 h-3" /> PDF Export
                  </button>
                  <button className="p-2 rounded-xl border border-[#2ACED1]/20 text-[#2ACED1]">
                     <Settings className="w-4 h-4" />
                  </button>
               </div>
            </div>
            <div className="h-[350px] w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={metricData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                     <Tooltip contentStyle={{ backgroundColor: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "12px", color: "#fff" }} />
                     <Line type="monotone" dataKey="target" stroke="rgba(255,255,255,0.1)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                     <Line type="monotone" dataKey="current" stroke="#2ACED1" strokeWidth={3} dot={{ r: 4, fill: "#2ACED1", strokeWidth: 0 }} />
                  </ReLineChart>
               </ResponsiveContainer>
            </div>
         </div>
      </ScrollReveal>

      {/* ─── Metric Builder Hint ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#2ACED1]/10 text-[#2ACED1]">
               <Zap className="w-6 h-6" />
            </div>
            <div>
               <h4 className="font-bold dark:text-white text-base mb-1">Dynamic Formula Builder</h4>
               <p className="text-xs dark:text-white/40 leading-relaxed mb-4">
                  Create complex metrics like ARPU, LTV, and Churn using our drag-and-drop formula engine. Combine Sigma query results with manual indicators.
               </p>
               <button className="flex items-center gap-1 text-[10px] font-bold text-[#2ACED1] uppercase tracking-widest hover:underline">
                  Launch Builder <ArrowUpRight className="w-3 h-3" />
               </button>
            </div>
         </div>

         <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500">
               <Target className="w-6 h-6" />
            </div>
            <div>
               <h4 className="font-bold dark:text-white text-base mb-1">Goal Orchestration</h4>
               <p className="text-xs dark:text-white/40 leading-relaxed mb-4">
                  Set quarterly targets for each metric and receive automated alerts when team performance deviates from the calculated forecast.
               </p>
               <button className="flex items-center gap-1 text-[10px] font-bold text-cyan-500 uppercase tracking-widest hover:underline">
                  Set Quarterly Goals <ArrowUpRight className="w-3 h-3" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
