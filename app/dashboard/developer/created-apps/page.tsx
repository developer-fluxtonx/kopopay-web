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
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Created Apps</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage your connected applications and OAuth integration settings.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(42,206,209,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Register New App
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Apps Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app, i) => (
            <ScrollReveal key={app.id} direction="bottom" delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(42,206,209,0.15)" }}
                className="p-6 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 hover:border-[#2ACED1]/60 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white shadow-lg">
                    <Layout className="w-6 h-6" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/30 dark:text-[#D8F4F7]/30 hover:text-[#2ACED1] transition-colors">
                      <Settings2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/30 dark:text-[#D8F4F7]/30 hover:text-[#2ACED1] transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#000C22] dark:text-white group-hover:text-[#2ACED1] transition-colors mb-1">{app.name}</h3>
                  <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50 font-medium">{app.type}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase">Auth Type</span>
                     <span className="text-xs font-bold text-[#000C22] dark:text-white">{app.authType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase">Active Users</span>
                     <span className="text-xs font-bold text-[#000C22] dark:text-white">{app.users}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2ACED1]/10 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${app.status === "Production" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-amber-500"}`} />
                     <span className="text-[10px] font-bold text-[#000C22]/60 dark:text-[#D8F4F7]/60 uppercase tracking-widest">{app.status}</span>
                   </div>
                   <span className="text-[10px] font-bold text-[#000C22]/30 dark:text-[#D8F4F7]/30 uppercase">{app.id}</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
          
          <ScrollReveal direction="bottom" delay={0.3}>
            <button className="w-full h-full min-h-[240px] rounded-3xl border-2 border-dashed border-[#2ACED1]/20 hover:border-[#2ACED1]/50 hover:bg-[#2ACED1]/5 transition-all group flex flex-col items-center justify-center p-6 text-center">
               <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <Plus className="w-6 h-6 text-[#2ACED1]" />
               </div>
               <p className="text-sm font-bold text-[#000C22] dark:text-white mb-1">Create New Application</p>
               <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">Connect another site or service to KopoPay.</p>
            </button>
          </ScrollReveal>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <ScrollReveal direction="right">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30">
               <h4 className="text-xs font-bold text-[#2ACED1] uppercase tracking-widest mb-6 flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4" /> OAuth Security
               </h4>
               <p className="text-xs text-white/70 leading-relaxed mb-6">
                 Your applications use industry-standard OAuth 2.0 to securely access customer data. Manage redirect URIs and scopes in the app settings.
               </p>
               <div className="space-y-3">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                     <Code className="w-4 h-4 text-[#2ACED1]" />
                   </div>
                   <p className="text-[11px] font-bold text-white">Client ID Secret Key Mode</p>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                     <Users className="w-4 h-4 text-[#2ACED1]" />
                   </div>
                   <p className="text-[11px] font-bold text-white">RBAC Permissions Enabled</p>
                 </div>
               </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="p-8 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
               <h4 className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Zap className="w-4 h-4 text-amber-500" /> Platform Insights
               </h4>
               <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-bold text-[#000C22] dark:text-white uppercase tracking-wider">App Data Usage</span>
                       <span className="text-xs font-bold text-emerald-500">Normal</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-[#2ACED1] w-[42%]" />
                    </div>
                  </div>
                  <p className="text-[10px] text-[#000C22]/50 dark:text-[#D8F4F7]/50 leading-relaxed">
                    Your applications are currently processing 450 requests per minute.
                  </p>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
