"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, ShieldOff, AlertTriangle, TrendingDown, Eye, Plus, ChevronRight } from "lucide-react";

const riskTransactions = [
  { id: "TXN-8821", customer: "Unknown", email: "temp4829@mail.ru", amount: "$4,200", risk: 92, reason: "IP velocity + new card", action: "Blocked" },
  { id: "TXN-8819", customer: "John Smith", email: "j.smith@gmail.com", amount: "$890", risk: 45, reason: "New device detected", action: "Review" },
  { id: "TXN-8815", customer: "Maria Lopez", email: "maria@corp.mx", amount: "$12,500", risk: 78, reason: "Unusual amount pattern", action: "Review" },
  { id: "TXN-8810", customer: "David Lee", email: "david@startup.com", amount: "$320", risk: 12, reason: "Trusted customer", action: "Allowed" },
];

const rules = [
  { name: "Block high-risk countries", status: "Active", triggers: 23 },
  { name: "Require 3DS for > $500", status: "Active", triggers: 156 },
  { name: "Block prepaid cards", status: "Paused", triggers: 0 },
  { name: "Velocity check: 5+ in 1hr", status: "Active", triggers: 8 },
];

export default function RadarPage() {
  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-1">Radar — Fraud Protection</h1>
        <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">ML-powered fraud detection, risk scoring, and manual review queue.</p>
      </ScrollReveal>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Blocked", value: "247", icon: ShieldOff, color: "text-red-500", bg: "bg-red-500/10", dir: "left" as const },
          { label: "Under Review", value: "18", icon: Eye, color: "text-amber-500", bg: "bg-amber-500/10", dir: "bottom" as const },
          { label: "Allowed", value: "3,421", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-500/10", dir: "bottom" as const },
          { label: "Fraud Rate", value: "0.12%", icon: TrendingDown, color: "text-[#2ACED1]", bg: "bg-[#2ACED1]/10", dir: "right" as const },
        ].map((s, i) => (
          <ScrollReveal key={i} direction={s.dir} delay={i * 0.08}>
            <motion.div whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(42,206,209,0.15)" }}
              className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 hover:border-[#2ACED1]/60 transition-all">
              <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}><s.icon className={`w-4 h-4 ${s.color}`} /></div>
              <p className="text-2xl font-bold text-[#000C22] dark:text-white">{s.value}</p>
              <p className="text-xs font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50 mt-1">{s.label}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Rules */}
      <ScrollReveal direction="left" delay={0.1}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#000C22] dark:text-white">Active Rules</h2>
          <motion.button whileHover={{ y: -1 }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2ACED1]/10 text-[#2ACED1] text-sm font-bold hover:bg-[#2ACED1]/20 border border-[#2ACED1]/20 transition-all">
            <Plus className="w-4 h-4" /> Add Rule
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
              <motion.div whileHover={{ x: 3, boxShadow: "0 6px 20px rgba(42,206,209,0.1)" }}
                className="p-4 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 hover:border-[#2ACED1]/50 transition-all flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-[#2ACED1]" />
                  <div>
                    <p className="text-sm font-semibold text-[#000C22] dark:text-white">{rule.name}</p>
                    <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">{rule.triggers} triggers this month</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rule.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-[#000C22]/5 text-[#000C22]/40 dark:bg-white/5 dark:text-white/40"}`}>{rule.status}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      {/* Risk Queue Table */}
      <ScrollReveal direction="bottom" delay={0.15}>
        <h2 className="text-lg font-bold text-[#000C22] dark:text-white mb-4">Risk Review Queue</h2>
        <motion.div whileHover={{ boxShadow: "0 10px 30px rgba(42,206,209,0.08)" }}
          className="rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 overflow-hidden">
          <table className="w-full"><thead><tr className="border-b border-[#000C22]/5 dark:border-white/5">
            {["Transaction", "Customer", "Amount", "Risk Score", "Reason", "Action"].map(h => (
              <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-5 py-3">{h}</th>
            ))}
          </tr></thead><tbody>
            {riskTransactions.map((tx, i) => (
              <tr key={i} className="border-b border-[#000C22]/5 dark:border-white/5 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer">
                <td className="px-5 py-3.5 text-sm font-mono text-[#2ACED1]">{tx.id}</td>
                <td className="px-5 py-3.5"><p className="text-sm font-semibold text-[#000C22] dark:text-white">{tx.customer}</p><p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">{tx.email}</p></td>
                <td className="px-5 py-3.5 text-sm font-bold text-[#000C22] dark:text-white">{tx.amount}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-[#000C22]/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${tx.risk > 70 ? "bg-red-500" : tx.risk > 40 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${tx.risk}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${tx.risk > 70 ? "text-red-500" : tx.risk > 40 ? "text-amber-500" : "text-emerald-500"}`}>{tx.risk}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-[#000C22]/60 dark:text-[#D8F4F7]/60 max-w-[180px]">{tx.reason}</td>
                <td className="px-5 py-3.5"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tx.action === "Blocked" ? "bg-red-500/10 text-red-500" : tx.action === "Review" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"}`}>{tx.action}</span></td>
              </tr>
            ))}
          </tbody></table>
        </motion.div>
      </ScrollReveal>
    </div>
  );
}
