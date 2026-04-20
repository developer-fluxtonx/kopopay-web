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
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Webhooks</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Configure real-time event notifications for your application.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(42,206,209,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Add Endpoint
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Endpoints List */}
          <ScrollReveal direction="bottom">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#000C22]/40 dark:text-[#D8F4F7]/40">Active Endpoints</h3>
                <button className="text-[10px] font-bold text-[#2ACED1] uppercase">Refresh Status</button>
              </div>
              {webhooks.map((wh, i) => (
                <motion.div
                  key={wh.id}
                  whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                  className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/15 hover:border-[#2ACED1]/40 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                        <Webhook className="w-5 h-5 text-[#2ACED1]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#000C22] dark:text-white mb-1 group-hover:text-[#2ACED1] transition-colors">{wh.url}</p>
                        <p className="text-[10px] text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase tracking-widest">{wh.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                         wh.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                       }`}>
                         {wh.status}
                       </span>
                       <button className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/30 dark:text-[#D8F4F7]/30">
                         <MoreVertical className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {wh.events.map((event, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[#000C22]/50 dark:text-[#D8F4F7]/50 text-[10px] font-medium border border-transparent hover:border-[#2ACED1]/20 transition-all">
                        {event}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-[#2ACED1]/10 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                       <div>
                         <p className="text-[9px] text-[#000C22]/30 dark:text-[#D8F4F7]/30 font-bold uppercase mb-0.5">Success Rate</p>
                         <p className="text-xs font-bold text-[#000C22] dark:text-white">{wh.health}</p>
                       </div>
                       <div>
                         <p className="text-[9px] text-[#000C22]/30 dark:text-[#D8F4F7]/30 font-bold uppercase mb-0.5">Last Sent</p>
                         <p className="text-xs font-bold text-[#000C22] dark:text-white">{wh.lastDelivery}</p>
                       </div>
                    </div>
                    <button className="text-[10px] font-bold text-[#2ACED1] flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Logs <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Recent Delivery Logs */}
          <ScrollReveal direction="bottom" delay={0.1}>
            <div className="rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/15 overflow-hidden">
               <div className="p-6 border-b border-[#2ACED1]/15 flex items-center justify-between">
                 <h3 className="font-bold text-[#000C22] dark:text-white">Delivery History</h3>
                 <div className="flex items-center gap-4 text-[10px] font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest">
                   <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Success</span>
                   <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> Error</span>
                 </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full">
                   <tbody>
                     {logs.map((log) => (
                       <tr key={log.id} className="border-b border-[#000C22]/5 dark:border-white/5 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group">
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                             {log.status === 200 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
                             <span className="text-sm font-bold text-[#000C22] dark:text-white truncate max-w-[200px]">{log.event}</span>
                           </div>
                         </td>
                         <td className="px-6 py-4">
                           <span className={`text-[10px] font-bold ${log.status === 200 ? "text-emerald-600" : "text-red-600"}`}>{log.status}</span>
                         </td>
                         <td className="px-6 py-4">
                            <span className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-medium">{log.duration}</span>
                         </td>
                         <td className="px-6 py-4 text-right text-xs text-[#000C22]/30 dark:text-[#D8F4F7]/30 font-bold">{log.time}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <ScrollReveal direction="right">
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/15">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#008E96] mb-6 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Webhook Security
              </h4>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-[#000C22] dark:text-white">Signing Secret</p>
                    <RefreshCw className="w-3 h-3 text-[#2ACED1] cursor-pointer hover:rotate-180 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-[10px] text-[#000C22]/60 dark:text-[#D8F4F7]/60 bg-black/10 dark:bg-black/40 px-2 py-1 rounded select-all">whsec_************************</code>
                  </div>
                </div>
                <p className="text-[10px] text-[#000C22]/50 dark:text-[#D8F4F7]/50 leading-relaxed">
                  Verify payloads from KopoPay using this secret to ensure they haven't been tampered with.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30">
               <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Activity className="w-4 h-4 text-[#2ACED1]" /> Live Stream
               </h4>
               <div className="space-y-3">
                 {[1, 2, 3].map((_, i) => (
                   <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-white/80">POST /kopopay</span>
                      </div>
                      <span className="text-[9px] font-bold text-white/30 uppercase">Just now</span>
                   </div>
                 ))}
               </div>
               <button className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-[9px] font-bold uppercase transition-all">
                 Open Full Monitor
               </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
