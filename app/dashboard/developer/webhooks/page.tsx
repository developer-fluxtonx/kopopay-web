"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Webhook, 
  Key, 
  Activity, 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  MoreVertical,
  ArrowRight,
  Clock,
  RefreshCw
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";

const webhooks = [
  { 
    id: "WH_701", 
    url: "https://api.acme.com/webhooks/kopopay", 
    events: ["payment.succeeded", "payment.failed"], 
    status: "Active", 
    lastDelivery: "2m ago", 
    health: "99.8%",
    accent: "#2ACED1"
  },
  { 
    id: "WH_702", 
    url: "https://hooks.slack.com/services/...", 
    events: ["dispute.created"], 
    status: "Active", 
    lastDelivery: "1hr ago", 
    health: "100%",
    accent: "#008E96"
  },
  { 
    id: "WH_703", 
    url: "https://dev-test.acme.io/receiver", 
    events: ["*"], 
    status: "Failing", 
    lastDelivery: "15m ago", 
    health: "42.0%",
    accent: "#EF4444"
  },
];

const logs = [
  { id: "EV_901", event: "payment.succeeded", status: 200, time: "2:45 PM", duration: "120ms" },
  { id: "EV_902", event: "payment.succeeded", status: 200, time: "2:42 PM", duration: "95ms" },
  { id: "EV_903", event: "customer.created", status: 200, time: "1:30 PM", duration: "110ms" },
  { id: "EV_904", event: "payment.failed", status: 500, time: "12:15 PM", duration: "3.2s" },
];

export default function WebhooksPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">Webhooks</h1>
          <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">Configure real-time event notifications for your application ecosystem.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2ACED1] text-white text-xs font-bold shadow-lg shadow-[#2ACED1]/20 transition-all hover:opacity-90 active:scale-95">
           <Plus className="w-4 h-4" /> Add Endpoint
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Endpoints List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/30">Active Endpoints</h3>
              <button className="text-[10px] font-bold text-[#2ACED1] uppercase tracking-widest">Refresh Status</button>
            </div>
            {webhooks.map((wh) => (
              <div key={wh.id} className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm group hover:border-[#2ACED1]/30 transition-all duration-500">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#2ACED1]/10 flex items-center justify-center shadow-lg shadow-[#2ACED1]/5">
                      <Webhook className="w-6 h-6 text-[#2ACED1]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#000C22] dark:text-white mb-1 group-hover:text-[#2ACED1] transition-colors">{wh.url}</p>
                      <p className="text-[9px] text-[#000C22]/30 dark:text-white/30 font-bold uppercase tracking-widest">{wh.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                       wh.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                     }`}>
                       {wh.status}
                     </span>
                     <button className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/30 dark:text-white/30">
                       <MoreVertical className="w-4 h-4" />
                     </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {wh.events.map((event, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-[#000C22]/40 dark:text-white/40 text-[10px] font-bold uppercase tracking-tighter border border-transparent hover:border-[#2ACED1]/20 transition-all">
                      {event}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-8">
                     <div>
                       <p className="text-[9px] text-[#000C22]/30 dark:text-white/30 font-bold uppercase tracking-widest mb-1">Success Rate</p>
                       <p className="text-xs font-bold text-[#000C22] dark:text-white">{wh.health}</p>
                     </div>
                     <div>
                       <p className="text-[9px] text-[#000C22]/30 dark:text-white/30 font-bold uppercase tracking-widest mb-1">Last Sent</p>
                       <p className="text-xs font-bold text-[#000C22] dark:text-white">{wh.lastDelivery}</p>
                     </div>
                  </div>
                  <button className="text-[10px] font-bold text-[#2ACED1] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    Delivery Logs <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Delivery Logs */}
          <div className="space-y-4">
             <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/30 px-2">Delivery History</h3>
             <div className="rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead>
                     <tr className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                        <th className="px-8 py-4 text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest">Event</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest text-center">Status</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest text-center">Latency</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest text-right">Time</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            {log.status === 200 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
                            <span className="text-sm font-bold text-[#000C22] dark:text-white truncate max-w-[200px]">{log.event}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className={`text-[10px] font-bold ${log.status === 200 ? "text-emerald-600" : "text-red-600"}`}>{log.status}</span>
                        </td>
                        <td className="px-8 py-5 text-center">
                           <span className="text-xs text-[#000C22]/40 dark:text-white/40 font-medium">{log.duration}</span>
                        </td>
                        <td className="px-8 py-5 text-right text-[10px] text-[#000C22]/30 dark:text-white/30 font-bold uppercase">{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                 <Shield className="w-4 h-4 text-[#008E96]" />
                 <h4 className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/40 uppercase tracking-[0.2em]">Payload Security</h4>
              </div>
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold text-[#000C22] dark:text-white uppercase tracking-widest">Signing Secret</p>
                    <RefreshCw className="w-3.5 h-3.5 text-[#2ACED1] cursor-pointer hover:rotate-180 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-[10px] font-mono text-[#000C22]/40 dark:text-white/40 bg-black/5 dark:bg-black/40 px-2 py-1 rounded select-all tracking-wider">whsec_••••••••••••••••••••</code>
                  </div>
                </div>
                <p className="text-[10px] text-[#000C22]/40 dark:text-white/40 leading-relaxed font-medium">
                  Use this secret to verify that payloads are legitimately from KopoPay. Verification prevents spoofing attacks on your listener.
                </p>
              </div>
           </div>

           <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 shadow-xl shadow-[#2ACED1]/5 relative overflow-hidden">
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#2ACED1]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/20 flex items-center justify-center text-[#2ACED1]">
                       <Activity className="w-5 h-5" />
                    </div>
                    <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-[0.2em] animate-pulse">Live</span>
                 </div>
                 <h4 className="text-sm font-bold text-white mb-6">Real-time Stream</h4>
                 <div className="space-y-4">
                   {[1, 2, 3].map((_, i) => (
                     <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-bold text-white/70">POST /v1/kopopay</span>
                        </div>
                        <span className="text-[8px] font-bold text-white/20 uppercase">Just now</span>
                     </div>
                   ))}
                 </div>
                 <button className="w-full mt-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-[9px] font-bold uppercase tracking-widest transition-all">
                    Open Full Monitor
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
