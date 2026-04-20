"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Wallet, 
  Globe, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

const payoutData = [
  { name: "Mon", amount: 12400 },
  { name: "Tue", amount: 18200 },
  { name: "Wed", amount: 15800 },
  { name: "Thu", amount: 23100 },
  { name: "Fri", amount: 27600 },
  { name: "Sat", amount: 32000 },
  { name: "Sun", amount: 29500 },
];

const pendingPayouts = [
  { id: "PO_912", amount: "$12,450.00", currency: "USD", method: "SWIFT", destination: "Acme Corp Ltd", status: "Succeeded", date: "2m ago" },
  { id: "PO_913", amount: "€8,200.00", currency: "EUR", method: "SEPA", destination: "Startup Hub GmbH", status: "In Transit", date: "1hr ago" },
  { id: "PO_914", amount: "$4,800.00", currency: "USD", method: "ACH", destination: "Priya Sharma", status: "Scheduled", date: "4hr ago" },
  { id: "PO_915", amount: "£1,250.00", currency: "GBP", method: "FPS", destination: "Elena Rodriguez", status: "Failed", date: "Yesterday" },
];

export default function GlobalPayoutsPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Global Payouts</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage cross-border disbursements and payout orchestration.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(42,206,209,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              New Payout
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Section */}
          <ScrollReveal direction="bottom">
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#000C22] dark:text-white">Payout Volume</h3>
                  <p className="text-sm text-[#000C22]/50 dark:text-[#D8F4F7]/50 font-medium">Weekly disbursement activity</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold ring-1 ring-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={payoutData}>
                  <defs>
                    <linearGradient id="payoutGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2ACED1" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#2ACED1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "12px", color: "#fff", fontSize: 13 }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#2ACED1" strokeWidth={2.5} fill="url(#payoutGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ScrollReveal>

          {/* Table Section */}
          <ScrollReveal direction="bottom" delay={0.1}>
            <div className="rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 overflow-hidden">
              <div className="p-6 border-b border-[#2ACED1]/10 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#000C22] dark:text-white">Recent Payouts</h3>
                <button className="text-sm font-bold text-[#2ACED1] hover:underline transition-all">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#000C22]/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Destination</th>
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Method</th>
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Amount</th>
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Status</th>
                      <th className="text-right text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingPayouts.map((payout, i) => (
                      <tr key={payout.id} className="border-b border-[#000C22]/5 dark:border-white/5 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-[#000C22] dark:text-white">{payout.destination}</p>
                          <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">{payout.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-[#000C22]/70 dark:text-[#D8F4F7]/70 uppercase tracking-widest">{payout.method}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-[#000C22] dark:text-white">{payout.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            payout.status === "Succeeded" ? "bg-emerald-500/10 text-emerald-600" :
                            payout.status === "Failed" ? "bg-red-500/10 text-red-600" :
                            "bg-amber-500/10 text-amber-600"
                          }`}>
                            {payout.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">{payout.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="space-y-6">
          <ScrollReveal direction="right">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#2ACED1] mb-6">Payout Balance</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-white/40 font-bold uppercase mb-1">Available for payout</p>
                  <p className="text-3xl font-bold text-white">$45,280.50 <span className="text-white/40 text-lg font-medium">USD</span></p>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase mb-1">In Transit</p>
                    <p className="text-sm font-bold text-white">$12,400.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40 font-bold uppercase mb-1">Next Payout</p>
                    <p className="text-sm font-bold text-[#2ACED1]">Scheduled</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
              <h4 className="text-sm font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 mb-6">Quick Filters</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Successful", icon: "CheckCircle2", color: "text-emerald-500" },
                  { label: "Pending", icon: "Clock", color: "text-amber-500" },
                  { label: "Failed", icon: "AlertCircle", color: "text-red-500" },
                  { label: "Regional", icon: "Globe", color: "text-[#2ACED1]" },
                ].map((filter, i) => (
                  <button key={i} className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#2ACED1]/20 transition-all text-left group">
                    {(() => {
                      const Icon = getIcon(filter.icon);
                      return <Icon className={`w-4 h-4 mb-2 ${filter.color}`} />;
                    })()}
                    <p className="text-xs font-bold text-[#000C22] dark:text-white group-hover:text-[#2ACED1]">{filter.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
