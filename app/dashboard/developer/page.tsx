"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { Copy, Check, Eye, EyeOff, Plus, Webhook, Terminal, ToggleLeft, ToggleRight } from "lucide-react";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

export default function DeveloperPage() {
  const [mounted, setMounted] = useState(false);
  const [showLive, setShowLive] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(false);

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

  const { data: webhooksFetched, loading: webhooksLoading, reload: reloadWebhooks } = useApi(() => api.getWebhooks(), [], true);
  const webhooks = webhooksFetched ?? [
    { url: "https://api.myapp.com/webhooks/kopo", events: "payment.succeeded, invoice.paid", status: "Active" },
    { url: "https://staging.myapp.com/hooks", events: "All events", status: "Testing" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-1">Developer</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">API keys, webhooks, and integration tools.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setIsLiveMode(!isLiveMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${isLiveMode ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600" : "bg-amber-500/10 border-amber-500/30 text-amber-600"}`}>
              {isLiveMode ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              {isLiveMode ? "Live Mode" : "Test Mode"}
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* API Keys */}
      <ScrollReveal direction="top" delay={0.1}>
        <h2 className="text-lg font-bold text-[#000C22] dark:text-white mb-4">API Keys</h2>
        <div className="flex flex-col gap-3">
          {[
            { label: "Publishable Key", value: isLiveMode ? liveKey : testKey, show: isLiveMode ? showLive : showTest, toggle: () => isLiveMode ? setShowLive(!showLive) : setShowTest(!showTest) },
            { label: "Secret Key", value: isLiveMode ? secretLive : secretTest, show: isLiveMode ? showLive : showTest, toggle: () => isLiveMode ? setShowLive(!showLive) : setShowTest(!showTest) },
          ].map((key, i) => (
            <ScrollReveal key={i} direction={i === 0 ? "left" : "right"} delay={i * 0.1 + 0.15}>
              <motion.div whileHover={{ boxShadow: "0 6px 20px rgba(42,206,209,0.1)" }}
                className="p-4 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex items-center gap-4 transition-shadow">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#000C22]/50 dark:text-[#D8F4F7]/50 uppercase tracking-wider mb-1">{key.label}</p>
                  <p className="text-sm font-mono text-[#000C22] dark:text-white truncate">
                    {key.show ? key.value : "••••••••••••••••••••••••••"}
                  </p>
                </div>
                <button onClick={key.toggle} className="p-2 rounded-lg hover:bg-[#2ACED1]/10 transition-colors">
                  {key.show ? <EyeOff className="w-4 h-4 text-[#000C22]/50 dark:text-[#D8F4F7]/50" /> : <Eye className="w-4 h-4 text-[#000C22]/50 dark:text-[#D8F4F7]/50" />}
                </button>
                <button onClick={() => handleCopy(key.value, key.label)} className="p-2 rounded-lg hover:bg-[#2ACED1]/10 transition-colors">
                  {copiedKey === key.label ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-[#2ACED1]" />}
                </button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      {/* Quick Start */}
      <ScrollReveal direction="left" delay={0.2}>
        <h2 className="text-lg font-bold text-[#000C22] dark:text-white mb-4">Quick Start</h2>
        <motion.div whileHover={{ boxShadow: "0 8px 25px rgba(42,206,209,0.1)" }}
          className="rounded-2xl bg-[#0D1117] border border-[#2ACED1]/20 overflow-hidden transition-shadow">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
            <Terminal className="w-4 h-4 text-[#2ACED1]" />
            <span className="text-xs font-bold text-white/60">cURL — Create a Payment</span>
          </div>
          <pre className="p-4 text-sm text-[#D8F4F7] overflow-x-auto font-mono leading-relaxed">
{`curl https://api.kopopay.com/v1/payments \\
  -H "Authorization: Bearer sk_test_..." \\
  -d amount=2000 \\
  -d currency=usd \\
  -d description="Payment for order #1234"`}
          </pre>
        </motion.div>
      </ScrollReveal>

      {/* Webhooks */}
      <ScrollReveal direction="right" delay={0.25}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#000C22] dark:text-white">Webhooks</h2>
          <motion.button whileHover={{ y: -1 }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2ACED1]/10 text-[#2ACED1] text-sm font-bold hover:bg-[#2ACED1]/20 border border-[#2ACED1]/20 transition-all">
            <Plus className="w-4 h-4" /> Add Endpoint
          </motion.button>
        </div>
        <div className="flex flex-col gap-3">
          {webhooks.map((wh, i) => (
            <motion.div key={i} whileHover={{ x: 3, boxShadow: "0 6px 20px rgba(42,206,209,0.1)" }}
              className="p-4 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 hover:border-[#2ACED1]/50 transition-all flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Webhook className="w-5 h-5 text-[#2ACED1]" />
                <div>
                  <p className="text-sm font-semibold font-mono text-[#000C22] dark:text-white">{wh.url}</p>
                  <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">{wh.events}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${wh.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{wh.status}</span>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
