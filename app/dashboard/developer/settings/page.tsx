"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Settings2, 
  Shield, 
  Bell, 
  Globe, 
  Cpu, 
  Users, 
  Database, 
  Save, 
  ChevronRight,
  Info
} from "lucide-react";

export default function DeveloperSettingsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Developer Settings</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Configure global integration defaults, team access, and regional behavior.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg transition-all duration-200"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Integration Settings */}
          <ScrollReveal direction="bottom">
            <div className="p-8 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
               <h3 className="text-sm font-bold uppercase tracking-widest text-[#2ACED1] mb-8 flex items-center gap-2">
                 <Cpu className="w-5 h-5" /> Integration Defaults
               </h3>
               
               <div className="space-y-6">
                 {[
                   { label: "API Version", value: "2026-01-01 (Latest)", action: "Upgrade" },
                   { label: "Webhook Signature Version", value: "v1", action: "Manage" },
                   { label: "Default Currency", value: "USD", action: "Change" },
                   { label: "Idempotency Window", value: "24 Hours", action: "Edit" },
                 ].map((setting, i) => (
                   <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#2ACED1]/20 transition-all group">
                     <div>
                       <p className="text-xs font-bold text-[#000C22] dark:text-white mb-1">{setting.label}</p>
                       <p className="text-sm text-[#000C22]/50 dark:text-[#D8F4F7]/50 font-medium">{setting.value}</p>
                     </div>
                     <button className="mt-2 sm:mt-0 px-4 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-[#2ACED1]/30 text-[10px] font-bold uppercase text-[#008E96] opacity-0 group-hover:opacity-100 transition-all">
                       {setting.action}
                     </button>
                   </div>
                 ))}
               </div>
            </div>
          </ScrollReveal>

          {/* Security & Access */}
          <ScrollReveal direction="bottom" delay={0.1}>
            <div className="p-8 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
               <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-8 flex items-center gap-2">
                 <Shield className="w-5 h-5" /> Security & Restrictions
               </h3>
               
               <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#000C22] dark:text-white mb-1">IP Whitelisting</p>
                      <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50 leading-relaxed max-w-md">
                        Restrict API calls to specific IP addresses. Highly recommended for production environments.
                      </p>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center px-1">
                       <div className="w-4 h-4 rounded-full bg-emerald-500 ml-auto" />
                    </div>
                 </div>
                 <div className="h-px bg-[#2ACED1]/10" />
                 <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#000C22] dark:text-white mb-1">Detailed Error Messages</p>
                      <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50 leading-relaxed max-w-md">
                        Return full stack traces and verbose debugging info in API responses. Recommended for Test Mode only.
                      </p>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-slate-500/10 border border-slate-500/30 flex items-center px-1">
                       <div className="w-4 h-4 rounded-full bg-slate-400" />
                    </div>
                 </div>
               </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="space-y-6">
          <ScrollReveal direction="right">
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
               <h4 className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Globe className="w-4 h-4 text-[#2ACED1]" /> Regional Config
               </h4>
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent">
                    <p className="text-[10px] font-bold text-[#000C22]/50 dark:text-white/50 uppercase mb-2">Edge Termination</p>
                    <div className="flex justify-between items-center">
                       <span className="text-sm font-bold text-[#000C22] dark:text-white">Global (Auto)</span>
                       <ChevronRight className="w-4 h-4 text-[#2ACED1]" />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent">
                    <p className="text-[10px] font-bold text-[#000C22]/50 dark:text-white/50 uppercase mb-2">Data Sovereignty</p>
                    <div className="flex justify-between items-center">
                       <span className="text-sm font-bold text-[#000C22] dark:text-white">North America</span>
                       <ChevronRight className="w-4 h-4 text-[#2ACED1]" />
                    </div>
                  </div>
               </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30">
               <div className="flex items-center gap-2 text-[#2ACED1] mb-4">
                 <Info className="w-5 h-5" />
                 <h4 className="text-xs font-bold uppercase tracking-widest leading-none">Developer Beta</h4>
               </div>
               <p className="text-[11px] text-white/70 leading-relaxed mb-6">
                 Interested in testing our new GraphQL API or early-access Webhook delivery guarantees?
               </p>
               <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[10px] font-bold uppercase transition-all">
                 Join Beta Program
               </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
