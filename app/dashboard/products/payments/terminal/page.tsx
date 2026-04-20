"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tablet, 
  Smartphone, 
  Plus, 
  Search, 
  Filter, 
  Settings, 
  Cpu, 
  Wifi, 
  Battery, 
  ShieldCheck, 
  MoreVertical, 
  ArrowUpRight,
  MapPin,
  Activity,
  Box
} from "lucide-react";

const readers = [
  { id: "tm_01J...", name: "Front DESK-1", status: "Online", location: "SF Main Office", serial: "M482-990-211", battery: "92%", model: "Kopo Tap Station" },
  { id: "tm_02K...", name: "Boutique-A", status: "Offline", location: "NYC Retail Hub", serial: "M482-990-215", battery: "14%", model: "Handheld Reader" },
  { id: "tm_03L...", name: "Pop-up Store", status: "Online", location: "Global Expo 2026", serial: "M482-990-220", battery: "100%", model: "Kopo Tap Station" },
];

export default function TerminalPage() {
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
               <Tablet className="w-8 h-8 text-[#2ACED1]" />
               Terminal
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Unified in-person payments. Manage readers, locations, and hardware logs.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Register reader
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Hardware Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
         {[
            { label: "Active Readers", value: "142", sub: "98% uptime", icon: Activity, color: "#2ACED1" },
            { label: "Locations", value: "18", sub: "Global distribution", icon: MapPin, color: "#008E96" },
            { label: "Reader Health", value: "Excellent", sub: "All firmware current", icon: ShieldCheck, color: "#10B981" },
            { label: "Inventory", value: "12", sub: "Units in transit", icon: Box, color: "#034E78" },
         ].map((stat, i) => {
            const Icon = stat.icon;
            return (
               <div key={i} className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <div className="flex items-center justify-between mb-3">
                     <div className="w-9 h-9 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#2ACED1]" />
                     </div>
                     <Settings className="w-4 h-4 text-white/20" />
                  </div>
                  <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                  <p className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/30 uppercase tracking-widest mt-1">{stat.label}</p>
               </div>
            );
         })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Reader List */}
         <div className="lg:col-span-2 space-y-4">
            <ScrollReveal direction="bottom">
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-lg font-bold dark:text-white">Registered Hardware</h2>
                 <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#2ACED1]" />
                    <span className="text-xs font-bold text-[#2ACED1]">Filters</span>
                 </div>
              </div>
              
              <div className="space-y-3">
                 {readers.map((r, i) => (
                    <motion.div 
                       key={r.id}
                       whileHover={{ x: 4, borderColor: "rgba(42,206,209,0.5)" }}
                       className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex items-center justify-between group transition-all"
                    >
                       <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${r.status === "Online" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                             <div className={`w-6 h-6 rounded-md bg-white dark:bg-[#000C22] flex items-center justify-center border border-black/5 dark:border-white/5`}>
                                <Smartphone className={`w-3.5 h-3.5 ${r.status === "Online" ? "text-emerald-500" : "text-red-500"}`} />
                             </div>
                          </div>
                          <div>
                             <h4 className="font-bold dark:text-white">{r.name}</h4>
                             <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] text-white/40 font-mono">{r.serial}</span>
                                <span className="text-[10px] font-bold text-white/20">•</span>
                                <span className="text-[10px] text-white/40">{r.location}</span>
                             </div>
                          </div>
                       </div>

                       <div className="flex items-center gap-8">
                          <div className="text-right">
                             <div className="flex items-center gap-1.5 justify-end mb-1">
                                <Battery className={`w-3.5 h-3.5 ${parseInt(r.battery) < 20 ? "text-red-500" : "text-emerald-500"}`} />
                                <span className="text-xs font-bold dark:text-white">{r.battery}</span>
                             </div>
                             <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{r.status}</p>
                          </div>
                          <MoreVertical className="w-5 h-5 text-white/20 group-hover:text-white transition-colors cursor-pointer" />
                       </div>
                    </motion.div>
                 ))}
              </div>
            </ScrollReveal>
         </div>

         {/* Developer Tools Sidepanel */}
         <div className="space-y-6">
            <ScrollReveal direction="right">
               <div className="p-6 rounded-3xl bg-gradient-to-br from-[#034E78] to-[#011B3B] border border-[#2ACED1]/30 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Cpu className="w-24 h-24 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Simulated Reader</h3>
                  <p className="text-sm text-white/60 mb-6 leading-relaxed">
                     Test your Terminal integration without physical hardware. Use the Kopo Pay Virtual Reader.
                  </p>
                  <button className="w-full py-3 rounded-xl bg-[#2ACED1] text-[#011B3B] font-bold text-sm shadow-xl shadow-[#2ACED1]/20 hover:scale-[1.02] transition-all">
                     Launch Simulator
                  </button>
                  <p className="text-[10px] text-white/30 text-center mt-4 font-bold uppercase tracking-[0.2em]">Developer Workbench v2.1</p>
               </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
               <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <h4 className="font-bold dark:text-white mb-4 flex items-center gap-2">
                     <Wifi className="w-4 h-4 text-[#2ACED1]" /> Network Connectivity
                  </h4>
                  <div className="space-y-4">
                     {[
                        { label: "API Gateway", status: "96ms", health: "Good" },
                        { label: "Firmware CDN", status: "142ms", health: "Good" },
                        { label: "Hardware Relay", status: "21ms", health: "Excellent" },
                     ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                           <span className="text-white/40">{item.label}</span>
                           <div className="flex gap-4 font-bold">
                              <span className="text-white/60">{item.status}</span>
                              <span className="text-emerald-500 uppercase tracking-tighter">{item.health}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollReveal>
         </div>
      </div>
    </div>
  );
}
