"use client";

import { Check, Copy, Eye, EyeOff, Plus, Terminal, Webhook } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import {
  SettingsPanel,
  SettingsToggleRow,
} from "@/components/templates/SettingsLayout";

const endpoints = [
  {
    url: "https://api.kopopay.com/webhooks/payments",
    events: "payment.succeeded, payment.failed",
    status: "Active",
  },
  {
    url: "https://api.kopopay.com/webhooks/disputes",
    events: "charge.disputed, evidence.updated",
    status: "Testing",
  },
];

export default function DevelopersSettingsPage() {
  const [showKeys, setShowKeys] = useState(false);
  const [copied, setCopied] = useState<"live" | "test" | null>(null);
  const [liveMode, setLiveMode] = useState(false);

  const copyKey = async (value: string, label: "live" | "test") => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1500);
  };

  const liveKey = "pk_live_kopo_51Hg8rK...xR9dT";
  const testKey = "pk_test_kopo_51Hg8rK...mN3qW";

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[#000C22] dark:text-white tracking-tight">Developer Workspace</h1>
        <p className="text-sm font-medium text-[#000C22]/40 dark:text-white/40">Manage your API keys, webhooks, and local integration tools.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Environment", value: liveMode ? "Live" : "Test", icon: Terminal },
          { label: "Active Keys", value: "2 Total", icon: Plus },
          { label: "Endpoints", value: "2 Online", icon: Webhook },
          { label: "CLI Version", value: "v2.4.0", icon: Terminal },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[2rem] border border-black/5 bg-white dark:border-white/5 dark:bg-[#011B3B] p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/20">
                 {item.label}
               </p>
               <item.icon className="w-4 h-4 text-[#2ACED1]/40" />
            </div>
            <p className="text-xl font-bold text-[#000C22] dark:text-white tracking-tight">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-10 xl:grid-cols-[1fr_0.8fr]">
        <div className="space-y-10">
          <SettingsPanel
            title="Authentication Keys"
            description="Manage your secret and publishable keys for this environment."
            action={
              <Button type="button" variant="action" size="sm" onClick={() => setLiveMode((value) => !value)}>
                {liveMode ? "Switch to Test Mode" : "Switch to Live Mode"}
              </Button>
            }
          >
            <div className="space-y-4">
              {[
                { label: "Publishable key", value: liveMode ? liveKey : testKey, kind: "test" as const },
                { label: "Secret key", value: liveMode ? "sk_live_kopo_..." : "sk_test_kopo_...", kind: "live" as const },
              ].map((key) => (
                <div
                  key={key.label}
                  className="flex flex-col gap-4 rounded-[2rem] border border-black/5 bg-white dark:border-white/5 dark:bg-[#011B3B] p-6 lg:flex-row lg:items-center lg:justify-between shadow-sm group"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/20 mb-2">
                      {key.label}
                    </p>
                    <p className="font-mono text-xs font-bold text-[#000C22] dark:text-white/90">
                      {showKeys ? key.value : "••••••••••••••••••••••••••••••••"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowKeys((value) => !value)}
                      className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-[#000C22]/40 dark:text-white/40 hover:text-[#2ACED1] transition-all"
                    >
                      {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => copyKey(key.value, key.kind)}
                      className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-[#000C22]/40 dark:text-white/40 hover:text-[#2ACED1] transition-all"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SettingsPanel>

          <SettingsPanel
            title="Webhook Endpoints"
            description="Subscribe to events occurring in your KopoPay account."
            action={
               <Button type="button" variant="outline" size="sm">
                 <Plus className="h-4 w-4" /> Add Endpoint
               </Button>
             }
          >
            <div className="space-y-4">
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.url}
                  className="flex flex-col gap-4 rounded-[2rem] border border-black/5 bg-white dark:border-white/5 dark:bg-[#011B3B] p-6 lg:flex-row lg:items-center lg:justify-between shadow-sm hover:border-[#2ACED1]/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2ACED1]/5">
                      <Webhook className="h-6 w-6 text-[#2ACED1]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#000C22] dark:text-white/90 font-mono tracking-tight">
                        {endpoint.url}
                      </p>
                      <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20">
                        {endpoint.events}
                      </p>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest ${
                    endpoint.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                  }`}>
                    {endpoint.status}
                  </span>
                </div>
              ))}
            </div>
          </SettingsPanel>
        </div>

        <div className="space-y-10">
          <SettingsPanel
            title="Workbench"
            description="Compact explorer for integration health checks."
          >
            <div className="rounded-[2rem] bg-[#000C1A] border border-white/5 overflow-hidden shadow-xl relative group">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <Terminal className="h-4 w-4 text-[#2ACED1]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Live Explorer
                  </span>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]/40" />
                   <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]/40" />
                   <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]/40" />
                </div>
              </div>

              <div className="relative p-8 bg-[#000C1A]">
                {/* Copy Button Overlay */}
                <button 
                  onClick={() => {
                    const text = `curl https://api.kopopay.com/v1/payments -H "Authorization: Bearer sk_test_..." -d amount=2000 -d currency=usd -d description="Payment for order #1234"`;
                    navigator.clipboard.writeText(text);
                    setCopied("test");
                    setTimeout(() => setCopied(null), 1500);
                  }}
                  className="absolute top-4 right-6 p-2.5 rounded-xl bg-white/5 hover:bg-[#2ACED1]/10 text-white/30 hover:text-[#2ACED1] border border-white/5 transition-all active:scale-90"
                >
                  {copied === "test" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>

                <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed whitespace-pre-wrap break-all">
                  <div className="flex gap-3">
                    <span className="text-white/10 shrink-0 select-none">01</span>
                    <p><span className="text-emerald-400 font-bold">curl</span> <span className="text-white font-medium">https://api.kopopay.com/v1/payments \</span></p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-white/10 shrink-0 select-none">02</span>
                    <p><span className="text-[#2ACED1] font-bold">  -H</span> <span className="text-amber-300 font-medium">&quot;Authorization: Bearer sk_test_...&quot;</span> <span className="text-white">\</span></p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-white/10 shrink-0 select-none">03</span>
                    <p><span className="text-[#2ACED1] font-bold">  -d</span> <span className="text-blue-400 font-medium">amount</span>=<span className="text-emerald-400">2000</span> <span className="text-white">\</span></p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-white/10 shrink-0 select-none">04</span>
                    <p><span className="text-[#2ACED1] font-bold">  -d</span> <span className="text-blue-400 font-medium">currency</span>=<span className="text-emerald-400">usd</span> <span className="text-white">\</span></p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-white/10 shrink-0 select-none">05</span>
                    <p><span className="text-[#2ACED1] font-bold">  -d</span> <span className="text-blue-400 font-medium">description</span>=<span className="text-amber-300 font-medium">&quot;Payment for order #1234&quot;</span></p>
                  </div>
                </div>
              </div>
            </div>
          </SettingsPanel>

          <SettingsPanel
            title="Developer Toggles"
            description="Control integration behavior per environment."
          >
            <div className="space-y-4">
              <SettingsToggleRow
                title="Webhook Retries"
                description="Automatic backoff for failed events."
                checked
                onToggle={() => undefined}
              />
              <SettingsToggleRow
                title="Production Safety"
                description="Require confirmation for live key edits."
                checked
                onToggle={() => undefined}
              />
            </div>
          </SettingsPanel>
        </div>
      </div>
    </div>
  );
}
