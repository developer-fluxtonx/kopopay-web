"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Package, 
  Plus, 
  ExternalLink, 
  ShieldCheck, 
  Users, 
  Settings2, 
  Layout, 
  Code,
  Zap
} from "lucide-react";

const apps = [
  { 
    id: "APP_01", 
    name: "Customer Dashboard", 
    type: "Web Application", 
    authType: "OAuth 2.0", 
    status: "Production", 
    users: "12k", 
    accent: "#2ACED1" 
  },
  { 
    id: "APP_02", 
    name: "Kopo Mobile Pay", 
    type: "iOS / Android", 
    authType: "API Keys", 
    status: "Development", 
    users: "142", 
    accent: "#008E96" 
  },
  { 
    id: "APP_03", 
    name: "Partner Portal", 
    type: "Single Page App", 
    authType: "Connect", 
    status: "Active", 
    users: "85", 
    accent: "#034E78" 
  },
];

export default function CreatedAppsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">Ecosystem Apps</h1>
          <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">Manage your connected applications, OAuth credentials, and integration health.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2ACED1] text-white text-xs font-bold shadow-lg shadow-[#2ACED1]/20 transition-all hover:opacity-90 active:scale-95">
           <Plus className="w-4 h-4" /> Register New App
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Apps Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app) => (
            <div key={app.id} className="p-8 rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm group hover:border-[#2ACED1]/30 transition-all duration-500">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white shadow-xl shadow-[#2ACED1]/10">
                    <Layout className="w-7 h-7" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-[#000C22]/30 dark:text-white/30 hover:text-[#2ACED1] transition-colors">
                      <Settings2 className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-[#000C22]/30 dark:text-white/30 hover:text-[#2ACED1] transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#000C22] dark:text-white group-hover:text-[#2ACED1] transition-colors mb-1">{app.name}</h3>
                  <p className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-[0.2em]">{app.type}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest">Authentication</span>
                     <span className="text-xs font-bold text-[#000C22] dark:text-white tracking-tight">{app.authType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest">Active Installs</span>
                     <span className="text-xs font-bold text-[#000C22] dark:text-white tracking-tight">{app.users}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-2.5">
                     <div className={`w-2 h-2 rounded-full ${app.status === "Production" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]"}`} />
                     <span className="text-[9px] font-bold text-[#000C22]/40 dark:text-white/40 uppercase tracking-widest">{app.status}</span>
                   </div>
                   <span className="text-[9px] font-bold text-[#000C22]/20 dark:text-white/10 uppercase tracking-widest">{app.id}</span>
                </div>
            </div>
          ))}
          
          <button className="w-full h-full min-h-[300px] rounded-[2.5rem] border-2 border-dashed border-black/5 dark:border-white/5 hover:border-[#2ACED1]/30 hover:bg-[#2ACED1]/5 transition-all group flex flex-col items-center justify-center p-8 text-center">
             <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
               <Plus className="w-8 h-8 text-[#2ACED1]" />
             </div>
             <p className="text-sm font-bold text-[#000C22] dark:text-white mb-2">Register New Application</p>
             <p className="text-[11px] font-medium text-[#000C22]/40 dark:text-white/30 leading-relaxed max-w-[200px]">Connect another site, mobile app, or internal service.</p>
          </button>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 shadow-xl shadow-[#2ACED1]/5 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#2ACED1]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/20 flex items-center justify-center text-[#2ACED1] mb-6">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
                 <h4 className="text-sm font-bold text-white mb-3">OAuth Governance</h4>
                 <p className="text-xs font-medium text-white/50 leading-relaxed mb-8">
                   All applications utilize secure OAuth 2.0 flows. You can manage scopes and redirect URIs independently for each environment.
                 </p>
                 <div className="space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#2ACED1]" />
                     <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">PKCE Flow Supported</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#2ACED1]" />
                     <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Multi-Scope Authorization</p>
                   </div>
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <h4 className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/40 uppercase tracking-[0.2em]">Platform Pulse</h4>
                 </div>
                 <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
              </div>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-[9px] font-bold text-[#000C22]/60 dark:text-white/60 uppercase tracking-widest">Throughput Usage</span>
                       <span className="text-[10px] font-bold text-[#2ACED1]">42%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-[#2ACED1] w-[42%] rounded-full" />
                    </div>
                 </div>
                 <p className="text-[10px] text-[#000C22]/40 dark:text-white/30 leading-relaxed font-medium">
                    Your applications are currently processing <span className="text-[#000C22] dark:text-white font-bold">450 req/min</span> across all global nodes.
                 </p>
                 <button className="w-full py-3 rounded-xl border border-black/5 dark:border-white/5 text-[9px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40 hover:bg-[#2ACED1]/5 hover:text-[#2ACED1] transition-all">
                    View Usage Metrics
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
