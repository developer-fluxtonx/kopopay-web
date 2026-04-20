"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  FileText, 
  ArrowUpRight, 
  Terminal, 
  Code, 
  ShieldAlert, 
  Cpu, 
  Clock,
  Download,
  MoreHorizontal
} from "lucide-react";

const logEntries = [
  { id: "LOG_001", method: "POST", endpoint: "/v1/charges", status: 200, latency: "45ms", time: "14:45:01", ip: "192.168.1.1" },
  { id: "LOG_002", method: "GET", endpoint: "/v1/customers/cus_921", status: 200, latency: "12ms", time: "14:44:59", ip: "192.168.1.1" },
  { id: "LOG_003", method: "POST", endpoint: "/v1/payouts", status: 401, latency: "8ms", time: "14:43:50", ip: "45.22.11.0" },
  { id: "LOG_004", method: "POST", endpoint: "/v1/tokens", status: 201, latency: "120ms", time: "14:40:12", ip: "192.168.1.1" },
  { id: "LOG_005", method: "GET", endpoint: "/v1/balance", status: 200, latency: "32ms", time: "14:38:45", ip: "88.1.22.45" },
  { id: "LOG_006", method: "PUT", endpoint: "/v1/settings", status: 403, latency: "15ms", time: "14:35:00", ip: "192.168.1.1" },
];

export default function DeveloperLogsPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Developer Logs</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Inspect real-time API requests and system diagnostics.</p>
          </div>
          <div className="flex gap-3">
             <ScrollReveal direction="right" delay={0.1}>
               <motion.button
                 whileHover={{ y: -2 }}
                 className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-[#2ACED1]/20 text-[#008E96] font-bold text-sm transition-all duration-200"
               >
                 <Download className="w-4 h-4" />
                 Export Logs
               </motion.button>
             </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* Diagnostic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Request Volume", value: "85k", detail: "Last 24h", icon: "Activity" },
          { label: "Med. Latency", value: "32ms", detail: "System-wide", icon: "Clock" },
          { label: "Error Rate", value: "0.04%", detail: "Healthy", icon: "ShieldAlert" },
          { label: "Active Nodes", value: "12", detail: "Global Edge", icon: "Cpu" },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction="bottom" delay={i * 0.05}>
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/10">
              <p className="text-[10px] font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-[#000C22] dark:text-white mb-0.5">{stat.value}</p>
              <p className="text-[9px] font-medium text-emerald-600 uppercase">{stat.detail}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Logs Table */}
      <ScrollReveal direction="bottom" delay={0.1}>
        <div className="rounded-2xl bg-[#000C22] border border-[#2ACED1]/20 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-[#2ACED1]/10 flex flex-col md:flex-row md:items-center gap-4 bg-white/5">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by method, endpoint, or status code..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-[#2ACED1] outline-none text-white text-sm transition-all"
                />
             </div>
             <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all">
                  200 OK
                </button>
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all">
                  Errors
                </button>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-black/20 text-white/40 border-b border-white/5">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Time</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Method</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Endpoint</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Latency</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logEntries.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-white/50">{log.time}</span>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                         log.method === "POST" ? "bg-emerald-500/10 text-emerald-500" :
                         log.method === "GET" ? "bg-blue-500/10 text-blue-500" :
                         "bg-amber-500/10 text-amber-500"
                       }`}>
                         {log.method}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                         <Code className="w-3 h-3 text-[#2ACED1] opacity-40" />
                         <span className="text-sm font-medium text-white/80 group-hover:text-[#2ACED1] transition-colors">{log.endpoint}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`text-xs font-bold ${log.status >= 400 ? "text-red-500" : "text-emerald-500"}`}>
                         {log.status}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-xs text-white/40">{log.latency}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className="text-xs font-mono text-white/30">{log.ip}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* Terminal Preview */}
      <ScrollReveal direction="bottom" delay={0.2}>
        <div className="p-1 rounded-2xl bg-gradient-to-br from-[#2ACED1]/20 to-[#034E78]/20">
          <div className="bg-[#000C22] rounded-xl overflow-hidden shadow-2xl">
             <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-500/50" />
                   <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <span className="text-[10px] font-bold text-white/30 uppercase ml-4 tracking-widest flex items-center gap-2">
                   <Terminal className="w-3 h-3" /> System Out / TTY_01
                </span>
             </div>
             <div className="p-6 font-mono text-xs leading-relaxed">
                <p className="text-emerald-500 mb-1">$ kopopay listen --forward-to localhost:4242</p>
                <p className="text-white/60 mb-1">{"Ready! Webhooks will be delivered to http://localhost:4242"}</p>
                <p className="text-[#2ACED1] mb-1">{"2026-04-20 14:45:01  --> payment.succeeded [EV_901]"}</p>
                <p className="text-white/40 mb-1">{"                    <--  200 OK (120ms)"}</p>
                <p className="text-[#2ACED1] mb-1">{"2026-04-20 14:45:05  --> customer.created  [EV_903]"}</p>
                <p className="text-white/40 mb-1">{"                    <--  200 OK (85ms)"}</p>
                <p className="text-red-500 animate-pulse">_</p>
             </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
