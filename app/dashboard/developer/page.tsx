"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { Copy, Check, Eye, EyeOff, Plus, Webhook, Terminal, ToggleLeft, ToggleRight, Zap } from "lucide-react";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

import { useConfigStore } from "@/store/configStore";

export default function DeveloperPage() {
  const [mounted, setMounted] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { isTestMode, toggleTestMode } = useConfigStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const liveKey = "pk_live_kopo_51Hg8rK...xR9dT";
  const testKey = "pk_test_kopo_51Hg8rK...mN3qW";
  const secretLive = "sk_live_kopo_51Hg8rK...yB7pZ";
  const secretTest = "sk_test_kopo_51Hg8rK...kL2nX";

  const handleCopy = (key: string, label: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const { data: webhooksFetched } = useApi(() => api.getWebhooks(), [], true);
  const webhooks = webhooksFetched ?? [
    { url: "https://api.myapp.com/webhooks/kopo", events: "payment.succeeded, invoice.paid", status: "Active" },
    { url: "https://staging.myapp.com/hooks", events: "All events", status: "Testing" },
  ];

  return (
    <div className="flex flex-col gap-10 pb-20">
      <ScrollReveal direction="left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">Developer Overview</h1>
            <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">Monitor your integration health, manage authentication, and explore the API.</p>
          </div>
          <div className="flex items-center gap-3 p-1.5 bg-black/[0.03] dark:bg-white/[0.03] rounded-[1.25rem] border border-black/5 dark:border-white/5">
             <button 
              onClick={() => isTestMode && toggleTestMode()}
              className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${!isTestMode ? "bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20" : "text-[#000C22]/30 dark:text-white/30"}`}
             >
               Live
             </button>
             <button 
              onClick={() => !isTestMode && toggleTestMode()}
              className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isTestMode ? "bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20" : "text-[#000C22]/30 dark:text-white/30"}`}
             >
               Test
             </button>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* API Keys Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#000C22] dark:text-white uppercase tracking-[0.2em] opacity-40">Authentication</h2>
            <button 
              onClick={() => setShowKeys(!showKeys)}
              className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-[#2ACED1] hover:bg-[#2ACED1]/10 transition-all shadow-sm"
            >
              {showKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="space-y-6">
            {[
              { label: "Publishable Key", value: isTestMode ? testKey : liveKey },
              { label: "Secret Key", value: isTestMode ? secretTest : secretLive },
            ].map((key, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20">{key.label}</span>
                  <button 
                    onClick={() => handleCopy(key.value, key.label)}
                    className="p-2.5 rounded-xl opacity-0 group-hover:opacity-100 bg-[#2ACED1]/10 text-[#2ACED1] hover:bg-[#2ACED1]/20 transition-all"
                  >
                    {copiedKey === key.label ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="font-mono text-xs font-bold text-[#000C22] dark:text-white/90 break-all leading-relaxed">
                  {showKeys ? key.value : "••••••••••••••••••••••••••••••••••••••••••••••••••"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Webhooks Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#000C22] dark:text-white uppercase tracking-[0.2em] opacity-40">Recent Webhooks</h2>
            <button className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#2ACED1] shadow-sm active:scale-95 transition-all">
              Configure
            </button>
          </div>
          <div className="space-y-4">
            {webhooks.map((wh, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm flex items-center justify-between hover:border-[#2ACED1]/20 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2ACED1]/5 flex items-center justify-center text-[#2ACED1]">
                    <Webhook className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#000C22] dark:text-white/90 font-mono tracking-tight">{wh.url}</p>
                    <p className="text-[9px] font-bold text-[#000C22]/30 dark:text-white/20 mt-1.5 uppercase tracking-[0.15em]">{wh.events}</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                  wh.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                }`}>
                  {wh.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Start & Workbench Section */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-10 items-start">
        {/* Quick Start Guide */}
        <div className="xl:col-span-2 space-y-8 p-10 rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">Quick Start Guide</h3>
            <p className="text-xs font-medium text-[#000C22]/50 dark:text-white/40 leading-relaxed">
              Integrate KopoPay into your application in less than 5 minutes. Use our SDKs or raw API endpoints.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              { title: "Authenticate", desc: "Use your Secret Key to sign requests via Bearer token." },
              { title: "Create Payment", desc: "Initialize a payment intent with amount and currency." },
              { title: "Handle Webhooks", desc: "Listen for 'payment.succeeded' events to fulfill orders." },
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#2ACED1]/10 flex items-center justify-center text-[10px] font-bold text-[#2ACED1] shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-[#000C22] dark:text-white uppercase tracking-widest mb-1">{step.title}</h4>
                  <p className="text-[10px] font-medium text-[#000C22]/40 dark:text-white/30">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 rounded-2xl border border-[#2ACED1]/30 text-[#2ACED1] text-[10px] font-bold uppercase tracking-widest hover:bg-[#2ACED1]/5 transition-all">
             View Full Documentation
          </button>
        </div>

        {/* Workbench Section */}
        <div className="xl:col-span-3 rounded-[2.5rem] bg-[#000C1A] border border-white/5 overflow-hidden shadow-2xl relative group">
          <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-4">
               <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
               </div>
               <div className="flex items-center gap-2 ml-4">
                  <Terminal className="w-4 h-4 text-[#2ACED1]" />
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">API Explorer</span>
               </div>
            </div>
            <div className="flex items-center gap-1.5">
               {["cURL", "Node", "PY"].map((lang) => (
                 <button key={lang} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${lang === "cURL" ? "bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20" : "text-white/20 hover:text-white/40"}`}>
                    {lang}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="relative p-10 bg-[#000C1A]">
            {/* Copy Button Overlay */}
            <button 
              onClick={() => handleCopy(`curl https://api.kopopay.com/v1/payments -H "Authorization: Bearer ${isTestMode ? "sk_test_..." : "sk_live_..."}" -d amount=2000 -d currency=usd -d description="Premium Subscription"`, "workbench")}
              className="absolute top-6 right-8 p-3 rounded-2xl bg-white/5 hover:bg-[#2ACED1]/10 text-white/40 hover:text-[#2ACED1] border border-white/5 transition-all active:scale-90"
            >
              {copiedKey === "workbench" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            <div className="font-mono text-xs leading-relaxed whitespace-pre-wrap break-all">
              <div className="flex gap-4">
                <span className="text-white/10 shrink-0 select-none">01</span>
                <p><span className="text-emerald-400 font-bold">curl</span> <span className="text-white font-medium">https://api.kopopay.com/v1/payments \</span></p>
              </div>
              <div className="flex gap-4">
                <span className="text-white/10 shrink-0 select-none">02</span>
                <p><span className="text-[#2ACED1] font-bold">  -H</span> <span className="text-amber-300 font-medium">&quot;Authorization: Bearer {isTestMode ? "sk_test_..." : "sk_live_..."}&quot;</span> <span className="text-white">\</span></p>
              </div>
              <div className="flex gap-4">
                <span className="text-white/10 shrink-0 select-none">03</span>
                <p><span className="text-[#2ACED1] font-bold">  -d</span> <span className="text-blue-400 font-medium">amount</span>=<span className="text-emerald-400">2000</span> <span className="text-white">\</span></p>
              </div>
              <div className="flex gap-4">
                <span className="text-white/10 shrink-0 select-none">04</span>
                <p><span className="text-[#2ACED1] font-bold">  -d</span> <span className="text-blue-400 font-medium">currency</span>=<span className="text-emerald-400">usd</span> <span className="text-white">\</span></p>
              </div>
              <div className="flex gap-4">
                <span className="text-white/10 shrink-0 select-none">05</span>
                <p><span className="text-[#2ACED1] font-bold">  -d</span> <span className="text-blue-400 font-medium">description</span>=<span className="text-amber-300 font-medium">&quot;Premium Subscription&quot;</span></p>
              </div>
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="px-8 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[8px] font-bold text-emerald-500/60 uppercase tracking-widest">Active Connection</span>
             </div>
             <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest">Global v2.4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
