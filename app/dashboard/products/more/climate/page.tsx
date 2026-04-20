"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cloud, 
  Wind, 
  Droplets, 
  Leaf, 
  Plus, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle2, 
  Globe, 
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Award
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const climateData = [
  { name: "Jan", impact: 1.2 },
  { name: "Feb", impact: 1.8 },
  { name: "Mar", impact: 2.1 },
  { name: "Apr", impact: 2.9 },
  { name: "May", impact: 3.4 },
  { name: "Jun", impact: 4.8 },
];

export default function ClimatePage() {
  const [mounted, setMounted] = useState(false);
  const [contribution, setContribution] = useState(1); // 1% of revenue

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
               <Leaf className="w-8 h-8 text-emerald-500" />
               Climate
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Commit a fraction of your revenue to carbon removal. Join thousands of climate leaders.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/20"
             >
                Increase contribution
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Climate Hero Panel ─── */}
      <ScrollReveal direction="bottom">
         <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-emerald-500/20 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-full bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10 items-center">
               <div className="space-y-6">
                  <div>
                     <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em] mb-2">Total Carbon Removed</p>
                     <p className="text-5xl font-bold text-white">42.8 <span className="text-xl text-white/40">Tons</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Award className="w-5 h-5 text-emerald-500" />
                     </div>
                     <p className="text-xs text-white/70 leading-relaxed">
                        Your business is in the <span className="text-emerald-500 font-bold">top 5%</span> of Kopo Pay Climate contributors this month.
                     </p>
                  </div>
                  <div className="pt-4 flex flex-wrap gap-3">
                     {["Enhanced Weathering", "Direct Air Capture", "Biomass Carbon Removal"].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/50 uppercase">
                           {tag}
                        </span>
                     ))}
                  </div>
               </div>
               
               <div className="lg:col-span-2 h-[280px] bg-black/10 rounded-3xl p-6 border border-white/5 backdrop-blur-sm">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={climateData}>
                        <defs>
                           <linearGradient id="climGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
                              <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#666" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#666" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#011B3B", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "12px", color: "#fff" }} />
                        <Area type="monotone" dataKey="impact" stroke="#10B981" strokeWidth={3} fill="url(#climGrad)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      </ScrollReveal>

      {/* ─── Projects & Badges ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold dark:text-white">Funded Projects</h3>
            <div className="space-y-3">
               {[
                  { name: "Running Tide", impact: "Kelp Carbon Removal", location: "Portland, ME", tech: "Oceanic Sink" },
                  { name: "CarbonBuilt", impact: "CO2-Cured Concrete", location: "Los Angeles, CA", tech: "Storage" },
                  { name: "Heirloom", impact: "Direct Air Capture", location: "Brisbane, CA", tech: "Passive Absorption" },
               ].map((p, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-emerald-500/20 flex items-center justify-between group transition-all hover:bg-emerald-500/5">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                           <Zap className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                           <h4 className="font-bold dark:text-white text-sm">{p.name}</h4>
                           <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{p.impact}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-xs font-bold dark:text-white">{p.tech}</p>
                        <p className="text-[10px] text-white/30 uppercase mt-0.5">{p.location}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#034E78] to-[#011B3B] border border-white/10 text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-5" />
               <Globe className="w-16 h-16 text-emerald-500 mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500" />
               <h3 className="text-xl font-bold text-white mb-2">Climate Badge</h3>
               <p className="text-sm text-white/50 mb-6 italic leading-relaxed">
                  Showcase your commitment to carbon removal on your checkout page and invoices.
               </p>
               <button className="w-full py-3 rounded-xl bg-white text-[#011B3B] font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">
                  Enable Checkout Badge
               </button>
            </div>

            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-emerald-500/20">
               <h4 className="font-bold dark:text-white text-sm mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Transparency
               </h4>
               <p className="text-xs text-white/40 leading-relaxed">
                  100% of your contribution goes directly to frontier carbon removal projects. Kopo Pay covers all operational and transaction fees.
               </p>
               <button className="mt-4 text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1 hover:underline">
                  Download Impact Certificate <ArrowUpRight className="w-3 h-3" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
