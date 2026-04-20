"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Zap, 
  Activity, 
  Settings, 
  ChevronRight, 
  Plus, 
  MoreVertical, 
  Cpu, 
  HardDrive, 
  Network,
  ArrowUpRight,
  Monitor
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from "recharts";

const usageData = [
  { name: "Mon", consumption: 420 },
  { name: "Tue", consumption: 580 },
  { name: "Wed", consumption: 920 },
  { name: "Thu", consumption: 740 },
  { name: "Fri", consumption: 1100 },
  { name: "Sat", consumption: 480 },
  { name: "Sun", consumption: 320 },
];

const meters = [
  { id: "met_01...", name: "API Request Meter", rate: "$0.002 / req", usage: "1.2M", status: "Active" },
  { id: "met_02...", name: "Compute Units", rate: "$0.05 / min", usage: "4,820", status: "Active" },
  { id: "met_03...", name: "Storage Volume", rate: "$0.10 / GB", usage: "450GB", status: "Active" },
];

export default function UsageBasedBillingPage() {
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
               <Zap className="w-8 h-8 text-[#2ACED1]" />
               Usage-based Billing
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Billed for what they used. Monitor meters, consumption triggers, and real-time events.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Create meter
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Usage Chart Large Card ─── */}
      <ScrollReveal direction="bottom">
         <div className="p-8 rounded-[2rem] bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm shadow-xl">
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
               <div>
                  <h3 className="text-xl font-bold dark:text-white">Aggregate Consumption</h3>
                  <p className="text-xs text-[#000C22]/40 dark:text-white/40 font-bold uppercase tracking-widest mt-1">Total units processed this period</p>
               </div>
               <div className="px-4 py-2 rounded-xl bg-[#2ACED1]/10 text-[#2ACED1] text-xs font-bold border border-[#2ACED1]/20">
                  Live Feed Tracking
               </div>
            </div>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(42,206,209,0.05)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#888" }} />
                     <Tooltip contentStyle={{ backgroundColor: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "12px", color: "#fff" }} />
                     <Bar dataKey="consumption" fill="#2ACED1" radius={[6, 6, 0, 0]} barSize={40}>
                        {usageData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === 4 ? "#034E78" : "#2ACED1"} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </ScrollReveal>

      {/* ─── Meters & Automation ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="space-y-4">
            <h3 className="text-lg font-bold dark:text-white mb-4">Active Consumption Meters</h3>
            <div className="space-y-3">
               {meters.map((m, i) => (
                  <motion.div 
                     key={i}
                     whileHover={{ x: 4, borderColor: "rgba(42,206,209,0.5)" }}
                     className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex items-center justify-between group transition-all"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                           <Activity className="w-5 h-5 text-[#2ACED1]" />
                        </div>
                        <div>
                           <h4 className="font-bold dark:text-white">{m.name}</h4>
                           <p className="text-[10px] text-white/40 font-mono italic">{m.rate}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold dark:text-white">{m.usage}</p>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Active</p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>

         <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold dark:text-white mb-4">Dev Workbench Hooks</h3>
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ACED1] opacity-5 blur-3xl group-hover:opacity-10 transition-opacity" />
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#2ACED1]">
                        <Cpu className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-bold text-white mb-1 italic font-heading">Real-time Metering API</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                           Stream your usage events directly to Kopo Pay. Our globally distributed gateway handles sub-millisecond event ingestion.
                        </p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <button className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/10 uppercase tracking-widest">
                        API Documentation <ArrowUpRight className="w-3 h-3" />
                     </button>
                     <button className="flex items-center gap-2 text-xs font-bold text-[#2ACED1] hover:underline">
                        Simulate Event <Monitor className="w-4 h-4 ml-1" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
