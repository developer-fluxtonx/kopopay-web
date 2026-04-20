"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Plus, 
  ChevronRight, 
  Building2, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Activity,
  ArrowUpRight,
  BookOpen,
  MapPin,
  Scale
} from "lucide-react";

const atlasCompanies = [
  { id: "at_01H...", name: "Kopo Pay Inc.", status: "Active", type: "Delaware C Corp", date: "Jan 12, 2026", taxId: "99-1234567" },
  { id: "at_02I...", name: "Design Studio LLC", status: "Active", type: "Wyoming LLC", date: "Mar 05, 2026", taxId: "98-7654321" },
  { id: "at_03J...", name: "Future Ventures", status: "Processing", type: "Delaware C Corp", date: "Apr 18, 2026", taxId: "Pending" },
];

export default function AtlasPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1 flex items-center gap-2">
               <Globe className="w-8 h-8 text-[#2ACED1]" />
               Atlas
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Form your business from anywhere in the world. Incorporated and ready to scale.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Start formation
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Atlas Steps ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
         {[
            { label: "Steps Completed", value: "3/5", icon: CheckCircle2, color: "#10B981" },
            { label: "Formation Window", value: "T+4d", icon: Clock, color: "#2ACED1" },
            { label: "Documents Filed", value: "12", icon: FileText, color: "#034E78" },
            { label: "Legal Regions", value: "Global", icon: MapPin, color: "#008E96" },
         ].map((stat, i) => {
            const Icon = stat.icon;
            return (
               <div key={i} className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <div className="flex items-center justify-between mb-3">
                     <div className="w-9 h-9 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#2ACED1]" />
                     </div>
                  </div>
                  <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                  <p className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/30 uppercase tracking-widest mt-1">{stat.label}</p>
               </div>
            );
         })}
      </div>

      {/* ─── Company Management ─── */}
      <div className="space-y-4">
         <h2 className="text-lg font-bold dark:text-white">Your Atlas Entities</h2>
         <div className="grid grid-cols-1 gap-4">
            {atlasCompanies.map((company, i) => (
               <ScrollReveal key={company.id} direction="bottom" delay={i * 0.1}>
                  <motion.div 
                     whileHover={{ x: 4, borderColor: "rgba(42,206,209,0.5)" }}
                     className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex flex-wrap items-center justify-between gap-6 transition-all group"
                  >
                     <div className="flex items-center gap-6 flex-1 min-w-[300px]">
                        <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5">
                           <Building2 className="w-7 h-7 text-[#2ACED1]" />
                        </div>
                        <div>
                           <h3 className="font-bold text-lg dark:text-white group-hover:text-[#2ACED1] transition-colors">{company.name}</h3>
                           <p className="text-xs text-white/40 italic mt-0.5">{company.type} • Formed {company.date}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-12">
                        <div className="text-center">
                           <p className="text-sm font-bold dark:text-white font-mono">{company.taxId}</p>
                           <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">IRS Tax ID (EIN)</p>
                        </div>
                        <div className="text-center">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                              company.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                           }`}>
                              {company.status}
                           </span>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#2ACED1] hover:bg-white/10 transition-all">
                           <FileText className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                           <MoreVertical className="w-5 h-5 text-white/20" />
                        </button>
                     </div>
                  </motion.div>
               </ScrollReveal>
            ))}
         </div>
      </div>

      {/* ─── Resources ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
         <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#2ACED1]/5 rounded-bl-full group-hover:scale-110 transition-transform" />
            <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-xl">
                     <Scale className="w-6 h-6 text-[#2ACED1]" />
                  </div>
                  <div>
                     <h4 className="text-white font-bold text-lg italic">Post-formation Guide</h4>
                     <p className="text-xs text-white/40">Everything you need to do after incorporation.</p>
                  </div>
               </div>
               <div className="space-y-4">
                  {[
                     "Get an IRS tax ID",
                     "Open a business bank account",
                     "Issue stock to founders",
                     "Authorize board of directors",
                  ].map((step, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                           <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        </div>
                        <span className="text-xs text-white/70 font-medium">{step}</span>
                     </div>
                  ))}
               </div>
               <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest transition-all">
                  Launch Masterclass <ArrowUpRight className="w-3 h-3 ml-2" />
               </button>
            </div>
         </div>

         <div className="p-8 rounded-[2rem] bg-[#2ACED1]/5 border border-[#2ACED1]/20 flex flex-col justify-between">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#2ACED1]/10 text-[#2ACED1]">
                     <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">Expert Consultation</h3>
               </div>
               <p className="text-sm dark:text-white/60 leading-relaxed italic">
                  "Atlas isn't just about the paperwork. We provide access to top legal and accounting firms to ensure your company is structured for global investment from day one."
               </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-[#2ACED1]/10">
               <p className="text-xs font-bold dark:text-white mb-4 uppercase tracking-widest text-[#2ACED1]">Partner Network Benefits</p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                     <p className="text-sm font-bold dark:text-white">$5,000</p>
                     <p className="text-[10px] text-white/30 uppercase font-bold">AWS Credits</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                     <p className="text-sm font-bold dark:text-white">6 Months</p>
                     <p className="text-[10px] text-white/30 uppercase font-bold">Legal Fee Waiver</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
