"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { 
  KeyRound, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Plus, 
  RefreshCw, 
  Trash2, 
  ShieldCheck, 
  AlertTriangle,
  History,
  Lock
} from "lucide-react";

export default function ApiKeysPage() {
  const [mounted, setMounted] = useState(false);
  const [showLive, setShowLive] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [loadingKeys, setLoadingKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: keysFetched, loading: keysLoading, reload: reloadKeys } = useApi(() => api.getApiKeys(), [], true);
  const { data: auditsFetched, loading: auditsLoading, reload: reloadAudits } = useApi(() => api.getApiKeyAudits(), [], true);

  if (!mounted) return null;

  const handleCopy = (key: string, label: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fallbackKeys = [
    { 
      id: "KEY_001",
      name: "Default Live Key", 
      type: "Publishable", 
      value: "pk_live_51Hg8rKJKG...xR9dT", 
      env: "Live",
      lastUsed: "2m ago"
    },
    { 
      id: "KEY_002",
      name: "Production Secret", 
      type: "Secret", 
      value: "sk_live_921Xj82...mQ2p", 
      env: "Live",
      lastUsed: "14h ago"
    },
  ];

  const keys = keysFetched ?? fallbackKeys;

  const toggleReveal = (id: string) => setRevealed((r) => ({ ...r, [id]: !r[id] }));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">API Management</h1>
          <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">Manage and secure your application's access to the KopoPay ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 rounded-2xl bg-[#2ACED1] text-white text-xs font-bold shadow-lg shadow-[#2ACED1]/20 transition-all hover:opacity-90 active:scale-95 flex items-center gap-2">
             <Plus className="w-4 h-4" /> Create Secret Key
          </button>
        </div>
      </div>

      {/* Security Context Banner */}
      <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 flex items-center gap-6">
         <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
            <ShieldCheck className="w-6 h-6" />
         </div>
         <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-500 mb-0.5">Security Best Practice</h4>
            <p className="text-xs font-medium text-amber-700/60 dark:text-amber-500/40">Never expose secret keys in client-side code. Use restricted keys for specific microservices to minimize risk.</p>
         </div>
         <button className="text-[10px] font-bold text-amber-600 uppercase tracking-widest px-4 py-2 bg-amber-500/10 rounded-xl">Learn More</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-[0.2em]">Active Credentials</h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 uppercase"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live Mode</span>
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-amber-500 uppercase"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Test Mode</span>
            </div>
          </div>

          <div className="space-y-4">
            {keys.map((key) => (
              <div key={key.id} className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm group hover:border-[#2ACED1]/30 transition-all duration-500">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${key.env === "Live" ? "bg-emerald-500/10 text-emerald-600 shadow-emerald-500/5" : "bg-amber-500/10 text-amber-600 shadow-amber-500/5"}`}>
                          <KeyRound className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-[#000C22] dark:text-white mb-0.5">{key.name}</p>
                          <div className="flex items-center gap-2">
                             <span className="text-[9px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest">{key.type}</span>
                             <span className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10" />
                             <span className="text-[9px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest">{key.lastUsed}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-[#000C22]/40 dark:text-white/40 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 bg-black/5 dark:bg-black/40 p-4 rounded-2xl border border-black/5 dark:border-white/5">
                    <code className="flex-1 font-mono text-xs text-[#000C22] dark:text-[#D8F4F7] truncate tracking-wider">
                       {key.type === "Secret" && !revealed[key.id] ? "sk_live_••••••••••••••••••••••••••••" : key.value}
                    </code>
                    <div className="flex items-center gap-1.5">
                       {key.type === "Secret" && (
                         <button onClick={() => toggleReveal(key.id)} className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-[#000C22]/40 dark:text-white/40 transition-colors">
                           {revealed[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                         </button>
                       )}
                       <button onClick={() => handleCopy(key.value, key.id)} className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-[#2ACED1] transition-colors">
                         {copiedKey === key.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                       </button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
           <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                 <History className="w-4 h-4 text-[#2ACED1]" />
                 <h4 className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/40 uppercase tracking-[0.2em]">Security Audits</h4>
              </div>
              <div className="space-y-6">
                 {[
                   { action: "Key Created", by: "M. Safi", time: "2 days ago", icon: Plus },
                   { action: "Secret Revealed", by: "M. Safi", time: "4 days ago", icon: Eye },
                   { action: "Key Rotated", by: "System", time: "1 month ago", icon: RefreshCw },
                 ].map((log, i) => (
                   <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#000C22]/40 dark:text-white/40">
                         <log.icon className="w-4 h-4" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-[#000C22] dark:text-white">{log.action}</p>
                         <p className="text-[9px] font-medium text-[#000C22]/30 dark:text-white/30 uppercase mt-0.5">{log.by} • {log.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-3 rounded-xl border border-black/5 dark:border-white/5 text-[9px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40 hover:bg-[#2ACED1]/5 hover:text-[#2ACED1] transition-all">
                 View Full Security Logs
              </button>
           </div>

           <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 shadow-xl shadow-[#2ACED1]/5 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#2ACED1]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/20 flex items-center justify-center text-[#2ACED1] mb-6">
                    <Lock className="w-5 h-5" />
                 </div>
                 <h4 className="text-sm font-bold text-white mb-2">Restricted Access</h4>
                 <p className="text-xs font-medium text-white/50 leading-relaxed mb-6">Enhance security by creating keys with scoped permissions for specific features.</p>
                 <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest transition-all">
                    Generate Scoped Key
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
