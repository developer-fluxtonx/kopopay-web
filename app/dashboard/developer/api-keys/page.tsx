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

  // Fetch keys from central API
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
  ];

  const keys = keysFetched ?? fallbackKeys;

  const toggleReveal = (id: string) => setRevealed((r) => ({ ...r, [id]: !r[id] }));

  const createKey = async () => {
    setCreating(true);
    try {
      await api.createApiKey({ name: "New Key", type: "Secret", env: "Test" });
      reloadKeys();
      reloadAudits && reloadAudits();
    } catch (err) {
      // ignore for now
    } finally {
      setCreating(false);
    }
  };

  const rotateKey = async (id: string) => {
    setLoadingKeys((s) => ({ ...s, [id]: true }));
    try {
      await api.rotateApiKey(id);
      reloadKeys();
      reloadAudits && reloadAudits();
    } catch (err) {
      // ignore
    } finally {
      setLoadingKeys((s) => ({ ...s, [id]: false }));
    }
  };

  const removeKey = async (id: string) => {
    setLoadingKeys((s) => ({ ...s, [id]: true }));
    try {
      await api.deleteApiKey(id);
      reloadKeys();
      reloadAudits && reloadAudits();
    } catch (err) {
      // ignore
    } finally {
      setLoadingKeys((s) => ({ ...s, [id]: false }));
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">API Keys</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage and secure your application's access to the KopoPay API.</p>
          </div>
            <ScrollReveal direction="right" delay={0.1}>
              <motion.button
                onClick={createKey}
                disabled={creating}
                whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(42,206,209,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg transition-all duration-200 disabled:opacity-60"
              >
                <Plus className="w-5 h-5" />
                {creating ? "Creating…" : "Create Secret Key"}
              </motion.button>
            </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Security Alert */}
      <ScrollReveal direction="bottom">
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-4">
           <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
             <ShieldCheck className="w-5 h-5" />
           </div>
           <div>
             <p className="text-sm font-bold text-amber-600 dark:text-amber-500 mb-1">Security Best Practice</p>
             <p className="text-xs text-amber-700/70 dark:text-amber-500/60 leading-relaxed">
               Always use restricted keys for specific integrations. Secret keys should never be used in client-side code. Use publishable keys for frontend checkout.
             </p>
           </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Keys List */}
          <div className="space-y-4">
            {keys.map((key, i) => (
              <ScrollReveal key={key.id} direction="bottom" delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 hover:border-[#2ACED1]/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${key.env === "Live" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                         <KeyRound className="w-5 h-5" />
                       </div>
                       <div>
                         <h3 className="text-sm font-bold text-[#000C22] dark:text-white">{key.name}</h3>
                         <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest">{key.type}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${key.env === "Live" ? "text-emerald-500" : "text-amber-500"}`}>{key.env}</span>
                         </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button onClick={() => rotateKey(key.id)} disabled={loadingKeys[key.id]} className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/30 dark:text-[#D8F4F7]/30 transition-colors ${loadingKeys[key.id] ? 'opacity-60 cursor-not-allowed' : ''}`}>
                         <RefreshCw className="w-4 h-4" />
                       </button>
                       <button onClick={() => removeKey(key.id)} disabled={loadingKeys[key.id]} className={`p-2 rounded-lg hover:bg-red-500/10 text-[#000C22]/30 dark:text-[#D8F4F7]/30 hover:text-red-500 transition-colors ${loadingKeys[key.id] ? 'opacity-60 cursor-not-allowed' : ''}`}>
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-black/5 dark:bg-black/50 p-3 rounded-xl border border-black/5 dark:border-white/5">
                    <code className="flex-1 font-mono text-sm text-[#000C22] dark:text-[#D8F4F7] truncate">
                      {key.type === "Secret" && !revealed[key.id] ? "sk_••••••••••••••••••••••••" : (key.value || "")}
                    </code>
                    <div className="flex items-center gap-1">
                       {key.type === "Secret" && (
                         <button 
                           onClick={() => toggleReveal(key.id)}
                           className="p-2 rounded-lg hover:bg-white/10 text-[#000C22]/40 dark:text-[#D8F4F7]/40 transition-colors"
                         >
                           {revealed[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                         </button>
                       )}
                       <button 
                         onClick={() => handleCopy(key.value || "", key.id)}
                         className="p-2 rounded-lg hover:bg-white/10 text-[#2ACED1] transition-colors"
                       >
                         {copiedKey === key.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                       </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-[#000C22]/30 dark:text-[#D8F4F7]/30 uppercase tracking-widest">
                    <span>Last used: {key.lastUsed}</span>
                    <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> Encrypted at rest</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <ScrollReveal direction="right">
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 mb-6 flex items-center gap-2">
                <History className="w-4 h-4 text-[#2ACED1]" /> Audit Log
              </h4>
              <div className="space-y-4">
                 {[
                   { action: "Key Created", by: "M. Safi", time: "2 days ago" },
                   { action: "Secret Revealed", by: "M. Safi", time: "4 days ago" },
                   { action: "Key Rotated", by: "System", time: "1 month ago" },
                 ].map((log, i) => (
                   <div key={i} className="flex items-start gap-3 pb-3 border-b border-black/5 dark:border-white/5 last:border-0 last:pb-0">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#2ACED1] mt-1.5" />
                     <div>
                       <p className="text-xs font-bold text-[#000C22] dark:text-white">{log.action}</p>
                       <p className="text-[10px] text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-medium">{log.by} • {log.time}</p>
                     </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-[10px] font-bold uppercase text-[#000C22]/50 dark:text-white/50 hover:bg-[#2ACED1]/10 transition-all">
                Full Security Audit
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30">
               <h4 className="text-xs font-bold text-[#2ACED1] uppercase tracking-widest mb-4 flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4" /> Restricted Keys
               </h4>
               <p className="text-[11px] text-white/70 leading-relaxed mb-6">
                 Create keys with limited permissions to increase security across different microservices.
               </p>
               <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[10px] font-bold uppercase transition-all">
                 Create Restricted Key
               </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
