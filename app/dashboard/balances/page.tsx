"use client";

import React, { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  TrendingUp,
  Building2,
  ExternalLink,
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

// Animated counter for stats
const DashCounter = ({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) => {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => prefix + (Math.round(v) || 0).toLocaleString() + suffix);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, target]);

  return <motion.span>{display}</motion.span>;
};

const payouts = [
  { id: "PAY_101", bank: "Chase Bank •••• 4242", amount: "$12,450.00", status: "In Transit", date: "Scheduled: Apr 22" },
  { id: "PAY_102", bank: "Morgan Stanley •••• 9812", amount: "$8,200.00", status: "Paid", date: "Sent: Apr 19" },
  { id: "PAY_103", bank: "Chase Bank •••• 4242", amount: "$15,800.00", status: "Paid", date: "Sent: Apr 15" },
  { id: "PAY_104", bank: "Chase Bank •••• 4242", amount: "$9,320.00", status: "Paid", date: "Sent: Apr 10" },
];

export default function BalancesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: balance } = useApi(() => api.getBalance(), [], true);
  const { data: payoutsFetched } = useApi(() => api.getPayouts(), [], true);
  
  if (!mounted) return null;
  
  const displayedPayouts = payoutsFetched ?? payouts;

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Balances</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage your earnings and payout schedules.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(42,206,209,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[#011B3B] border border-[#2ACED1] text-[#008E96] dark:text-[#2ACED1] font-bold transition-all duration-200"
          >
            Pay out now
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </ScrollReveal>
      </div>

      {/* ─── Main Balance Overview ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScrollReveal direction="left">
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(42,206,209,0.1)" }}
            className="p-8 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30 relative overflow-hidden h-full min-h-[240px] flex flex-col justify-between"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ACED1] opacity-5 blur-[100px] pointer-events-none"></div>
            
            <div className="flex items-start justify-between relative">
              <div>
                <p className="text-[#D8F4F7]/50 font-semibold text-sm mb-2 uppercase tracking-widest">Available to pay out</p>
                <div className="text-5xl font-bold text-white tracking-tight">
                  <DashCounter target={balance?.available ?? 42580} prefix="$" />
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                <Wallet className="w-7 h-7 text-[#2ACED1]" />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8 relative">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                <TrendingUp className="w-3 h-3" />
                +14% from last week
              </div>
              <p className="text-white/40 text-xs font-medium">Auto-payout scheduled for Tomorrow</p>
            </div>
          </motion.div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
          {[
            { label: "Pending Balance", value: 8940, prefix: "$", icon: "Clock", color: "#F59E0B" },
            { label: "On the way", value: 12450, prefix: "$", icon: "Building2", color: "#2ACED1" },
            { label: "Reserve", value: 2500, prefix: "$", icon: "AlertCircle", color: "#6B7280" },
            { label: "Gross volume (YTD)", value: 452800, prefix: "$", icon: "DollarSign", color: "#10B981" },
          ].map((item, i) => (
            <ScrollReveal key={i} direction="bottom" delay={0.1 + i * 0.1}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/10 flex flex-col justify-between gap-4 h-full"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5" style={{ color: item.color }}>
                  {(() => {
                    const Icon = getIcon(item.icon as string);
                    return <Icon className="w-5 h-5" />;
                  })()}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-[#000C22] dark:text-white">
                    <DashCounter target={item.value} prefix={item.prefix} />
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ─── Payouts History ─── */}
      <ScrollReveal direction="bottom" delay={0.3}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#000C22] dark:text-white">Payout History</h3>
            <button className="text-sm font-bold text-[#008E96] dark:text-[#2ACED1] hover:underline flex items-center gap-1 transition-all">
              View all
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {displayedPayouts.map((pay, i) => (
              <motion.div
                key={pay.id}
                whileHover={{ scale: 1.01, backgroundColor: "rgba(42,206,209,0.05)" }}
                className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/10 flex flex-wrap items-center justify-between gap-4 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    pay.status === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-cyan-500/10 text-cyan-500"
                  }`}>
                    {pay.status === "Paid" ? <CheckCircle2 className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="font-bold text-[#000C22] dark:text-white">{pay.bank}</p>
                    <p className="text-xs font-medium text-[#000C22]/40 dark:text-[#D8F4F7]/40">{pay.date} • {pay.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="font-bold text-[#000C22] dark:text-white">{pay.amount}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    pay.status === "Paid" ? "bg-emerald-500/10 text-emerald-500" : "bg-cyan-500/10 text-cyan-500"
                  }`}>
                    {pay.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
