"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Terminal, 
  Code, 
  ShieldAlert, 
  Cpu, 
  Clock,
  Download,
  X,
  Copy,
  Check,
  ChevronRight,
  Globe,
  Activity
} from "lucide-react";

const logEntries = [
  { 
    id: "LOG_001", 
    method: "POST", 
    endpoint: "/v1/charges", 
    status: 200, 
    latency: "45ms", 
    time: "14:45:01", 
    ip: "192.168.1.1",
    request: {
      amount: 2000,
      currency: "usd",
      source: "tok_visa",
      description: "Charge for sarah.j@example.com"
    },
    response: {
      id: "ch_3P2Xz2Lp",
      object: "charge",
      amount: 2000,
      balance_transaction: "txn_1P2Xz2Lp",
      paid: true,
      status: "succeeded"
    }
  },
  { 
    id: "LOG_002", 
    method: "GET", 
    endpoint: "/v1/customers/cus_921", 
    status: 200, 
    latency: "12ms", 
    time: "14:44:59", 
    ip: "192.168.1.1",
    request: {},
    response: {
      id: "cus_921",
      object: "customer",
      email: "john.doe@gmail.com",
      created: 1713532400
    }
  },
  { 
    id: "LOG_003", 
    method: "POST", 
    endpoint: "/v1/payouts", 
    status: 401, 
    latency: "8ms", 
    time: "14:43:50", 
    ip: "45.22.11.0",
    request: { amount: 5000, destination: "ba_1P2Y01" },
    response: {
      error: {
        code: "authentication_required",
        message: "No API key provided."
      }
    }
  },
  { 
    id: "LOG_004", 
    method: "POST", 
    endpoint: "/v1/tokens", 
    status: 201, 
    latency: "120ms", 
    time: "14:40:12", 
    ip: "192.168.1.1",
    request: { card: { number: "**** **** **** 4242", cvc: "***" } },
    response: { id: "tok_1P2Y02", object: "token", used: false }
  },
  { id: "LOG_005", method: "GET", endpoint: "/v1/balance", status: 200, latency: "32ms", time: "14:38:45", ip: "88.1.22.45", request: {}, response: { object: "balance", pending: [], available: [{ amount: 12500, currency: "usd" }] } },
  { id: "LOG_006", method: "PUT", endpoint: "/v1/settings", status: 403, latency: "15ms", time: "14:35:00", ip: "192.168.1.1", request: { default_currency: "eur" }, response: { error: { message: "Insufficient permissions to update workspace settings." } } },
];

export default function DeveloperLogsPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="relative flex flex-col gap-10 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">System Logs</h1>
          <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">Inspect real-time API requests and system diagnostics across your infrastructure.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 text-[#000C22] dark:text-white font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-black/5 active:scale-95 shadow-sm">
             <Download className="w-4 h-4 text-[#2ACED1]" /> Export JSON
          </button>
        </div>
      </div>

      {/* Diagnostic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Request Volume", value: "85,420", detail: "Last 24h", icon: Activity },
          { label: "Med. Latency", value: "32ms", detail: "System-wide", icon: Clock },
          { label: "Error Rate", value: "0.04%", detail: "Healthy", icon: ShieldAlert },
          { label: "Active Nodes", value: "12", detail: "Global Edge", icon: Cpu },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
             <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
                <stat.icon className="w-4 h-4 text-[#2ACED1]/30" />
             </div>
             <p className="text-2xl font-bold text-[#000C22] dark:text-white tracking-tight mb-1">{stat.value}</p>
             <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Logs Table Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/30">API Request History</h3>
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 uppercase"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Success</span>
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-red-500 uppercase"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Errors</span>
           </div>
        </div>

        <div className="rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center gap-4 bg-black/[0.01] dark:bg-white/[0.01]">
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2ACED1]" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by method, endpoint, or status code..." 
                  className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-black/5 dark:bg-black/20 border-none outline-none text-[#000C22] dark:text-white text-xs font-medium transition-all focus:ring-2 ring-[#2ACED1]/20"
                />
             </div>
             <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-[9px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40">Filters</button>
                <button className="px-4 py-2 rounded-xl bg-[#2ACED1]/10 text-[#2ACED1] text-[9px] font-bold uppercase tracking-widest">Live: ON</button>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-black/5 dark:bg-white/5 text-[#000C22]/30 dark:text-white/30 border-b border-black/5 dark:border-white/5">
                  <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-widest">Time</th>
                  <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-widest">Method</th>
                  <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-widest">Endpoint</th>
                  <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-[9px] font-bold uppercase tracking-widest text-center">Latency</th>
                  <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-widest text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {logEntries.map((log) => (
                  <tr 
                    key={log.id} 
                    onClick={() => setSelectedLog(log)}
                    className={`hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group ${selectedLog?.id === log.id ? "bg-[#2ACED1]/5" : ""}`}
                  >
                    <td className="px-10 py-6">
                      <span className="text-[11px] font-mono font-bold text-[#000C22]/30 dark:text-white/30">{log.time}</span>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`text-[9px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                         log.method === "POST" ? "bg-emerald-500/10 text-emerald-500" :
                         log.method === "GET" ? "bg-blue-500/10 text-blue-500" :
                         "bg-amber-500/10 text-amber-500"
                       }`}>
                         {log.method}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                         <Code className="w-4 h-4 text-[#2ACED1] opacity-30" />
                         <span className="text-xs font-bold text-[#000C22] dark:text-white/80 group-hover:text-[#2ACED1] transition-colors">{log.endpoint}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className={`text-[11px] font-bold ${log.status >= 400 ? "text-red-500" : "text-emerald-500"}`}>
                         {log.status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className="text-xs font-bold text-[#000C22]/30 dark:text-white/30">{log.latency}</span>
                    </td>
                    <td className="px-10 py-6 text-right">
                       <span className="text-[10px] font-mono font-bold text-[#000C22]/30 dark:text-white/20">{log.ip}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Terminal View */}
      <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-[#2ACED1]/10 to-[#034E78]/10 border border-black/5 dark:border-white/5">
        <div className="bg-[#000C22] rounded-[2rem] overflow-hidden shadow-2xl">
           <div className="flex items-center gap-2 px-8 py-4 bg-white/5 border-b border-white/5">
              <div className="flex gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                 <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
              </div>
              <span className="text-[9px] font-bold text-white/20 uppercase ml-6 tracking-[0.2em] flex items-center gap-2">
                 <Terminal className="w-4 h-4 text-[#2ACED1]/40" /> KopoPay Real-time Trace
              </span>
           </div>
           <div className="p-8 font-mono text-[11px] leading-relaxed">
              <p className="text-emerald-500 mb-1">$ kopopay listen --forward-to localhost:4242</p>
              <p className="text-white/60 mb-2">{"Ready! Webhooks will be delivered to http://localhost:4242"}</p>
              <p className="text-[#2ACED1] mb-1">{"2026-04-20 14:45:01  --> payment.succeeded [EV_901]"}</p>
              <p className="text-white/40 mb-1">{"                    <--  200 OK (120ms)"}</p>
              <p className="text-red-500 animate-pulse">_</p>
           </div>
        </div>
      </div>

      {/* --- Log Inspector Side Panel --- */}
      <AnimatePresence>
        {selectedLog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLog(null)}
              className="fixed inset-0 z-[60] bg-[#000C22]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[600px] bg-white dark:bg-[#011B3B] shadow-2xl z-[70] border-l border-[#2ACED1]/20 flex flex-col"
            >
              <div className="p-8 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider ${
                      selectedLog.method === "POST" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                    }`}>
                      {selectedLog.method}
                    </span>
                    <h3 className="font-mono text-xs font-bold text-[#000C22] dark:text-white truncate max-w-[300px]">
                      {selectedLog.endpoint}
                    </h3>
                 </div>
                 <div className="flex items-center gap-2">
                    <button onClick={() => handleCopy(JSON.stringify(selectedLog, null, 2))} className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/40 dark:text-white/40 transition-colors">
                       {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setSelectedLog(null)} className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/40 dark:text-white/40 transition-colors">
                       <X className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-10">
                 <div className="grid grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5">
                       <p className="text-[9px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest mb-1.5">Status</p>
                       <p className={`text-sm font-bold ${selectedLog.status >= 400 ? "text-red-500" : "text-emerald-500"}`}>{selectedLog.status}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5">
                       <p className="text-[9px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest mb-1.5">Latency</p>
                       <p className="text-sm font-bold text-[#000C22] dark:text-white">{selectedLog.latency}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5">
                       <p className="text-[9px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest mb-1.5">Source IP</p>
                       <p className="text-[10px] font-mono font-bold text-[#000C22] dark:text-white">{selectedLog.ip}</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#2ACED1]" />
                       <h4 className="text-[10px] font-bold text-[#000C22] dark:text-white uppercase tracking-[0.2em]">Request Body</h4>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-[#000C22] text-[#2ACED1]/90 font-mono text-[11px] leading-relaxed overflow-x-auto shadow-2xl">
                       <pre>{JSON.stringify(selectedLog.request, null, 2)}</pre>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                       <h4 className="text-[10px] font-bold text-[#000C22] dark:text-white uppercase tracking-[0.2em]">Response Body</h4>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-[#000C22] text-white/80 font-mono text-[11px] leading-relaxed overflow-x-auto shadow-2xl">
                       <pre>{JSON.stringify(selectedLog.response, null, 2)}</pre>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[9px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-widest px-2">Request Headers</h4>
                    <div className="space-y-3 p-6 rounded-[2rem] bg-black/[0.01] dark:bg-white/[0.01] border border-black/5">
                       {[
                         { key: "Content-Type", val: "application/json" },
                         { key: "Authorization", val: "Bearer sk_live_••••••••••••" },
                         { key: "User-Agent", val: "KopoPay-SDK/v2.0" },
                       ].map((h, i) => (
                         <div key={i} className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/5 last:border-0">
                            <span className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/30 uppercase">{h.key}</span>
                            <span className="text-[10px] font-mono font-bold text-[#000C22] dark:text-white">{h.val}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex gap-4">
                 <button className="flex-1 py-4 rounded-[1.2rem] bg-[#2ACED1] text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#2ACED1]/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Replay Request
                 </button>
                 <button className="px-8 py-4 rounded-[1.2rem] border border-[#2ACED1]/30 text-[#2ACED1] font-bold text-xs uppercase tracking-widest hover:bg-[#2ACED1]/5 transition-all">
                    Export
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
