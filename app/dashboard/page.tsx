"use client";

import React, { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

// Animated counter for dashboard stats
const DashCounter = ({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) => {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => prefix + (Math.round(v) || 0).toLocaleString() + suffix);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, target]);

  return <motion.span>{display}</motion.span>;
};

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: stats, loading } = useApi(() => api.getDashboardStats(), [], true);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Greeting ─── */}
      <ScrollReveal direction="left">
        <div className={loading ? "animate-pulse" : ""}>
          <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Good morning, John</h1>
          <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Here&apos;s what&apos;s happening with your payments today.</p>
        </div>
      </ScrollReveal>

      {/* ─── Quick Actions ─── */}
      <ScrollReveal direction="right" delay={0.1}>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Send Money", icon: "Send", color: "#2ACED1" },
            { label: "Receive", icon: "Download", color: "#008E96" },
            { label: "New Invoice", icon: "CreditCard", color: "#034E78" },
          ].map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(42,206,209,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-[#011B3B] border border-[#2ACED1]/20 text-sm font-semibold text-[#000C22] dark:text-white hover:border-[#2ACED1] transition-all duration-200"
            >
              {(() => {
                const Icon = getIcon(action.icon as string);
                return <Icon className="w-4 h-4" style={{ color: action.color }} />;
              })()}
              {action.label}
            </motion.button>
          ))}
        </div>
      </ScrollReveal>

      {/* ─── Stat Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Revenue", value: stats?.revenue ?? 0, prefix: "$", icon: "DollarSign", change: stats?.revenueChange ?? "+0%", up: true, dir: "left" as const },
          { label: "Transactions", value: stats?.transactions ?? 0, prefix: "", icon: "Activity", change: stats?.transactionsChange ?? "+0%", up: true, dir: "bottom" as const },
          { label: "Active Customers", value: stats?.customers ?? 0, prefix: "", icon: "Users", change: stats?.customersChange ?? "+0%", up: true, dir: "bottom" as const },
          { label: "Avg. Processing", value: stats?.processingTime ?? 0, prefix: "", suffix: "s", icon: "Clock", change: stats?.processingTimeChange ?? "-0s", up: false, dir: "right" as const },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction={stat.dir} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(42,206,209,0.15)" }}
              className={`p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 hover:border-[#2ACED1]/60 transition-all duration-300 cursor-pointer ${loading ? "opacity-50" : ""}`}
            >
              <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                    {(() => {
                      const Icon = getIcon(stat.icon as string);
                      return <Icon className="w-5 h-5 text-[#2ACED1]" />;
                    })()}
                </div>
                <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.up ? "bg-emerald-500/10 text-emerald-600" : "bg-cyan-500/10 text-cyan-600"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">
                <DashCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix || ""} />
              </p>
              <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">{stat.label}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Charts Row ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <ScrollReveal direction="left" delay={0.1}>
          <motion.div
            whileHover={{ boxShadow: "0 10px 30px rgba(42,206,209,0.12)" }}
            className={`p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 transition-shadow duration-300 ${loading ? "opacity-50" : ""}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#000C22] dark:text-white">Revenue</h3>
                <p className="text-sm text-[#000C22]/50 dark:text-[#D8F4F7]/50 font-medium">Monthly overview</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> +24%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={stats?.revenueData || []}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2ACED1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2ACED1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "12px", color: "#fff", fontSize: 13 }}
                  formatter={(value: any) => [`$${(value || 0).toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2ACED1" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </ScrollReveal>

        {/* Transactions Chart */}
        <ScrollReveal direction="right" delay={0.2}>
          <motion.div
            whileHover={{ boxShadow: "0 10px 30px rgba(42,206,209,0.12)" }}
            className={`p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 transition-shadow duration-300 ${loading ? "opacity-50" : ""}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#000C22] dark:text-white">Transactions</h3>
                <p className="text-sm text-[#000C22]/50 dark:text-[#D8F4F7]/50 font-medium">This week</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats?.transactionData || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#011B3B", border: "1px solid rgba(42,206,209,0.3)", borderRadius: "12px", color: "#fff", fontSize: 13 }}
                  formatter={(value: any) => [value, "Transactions"]}
                />
                <Bar dataKey="count" fill="#2ACED1" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* ─── Recent Transactions Table ─── */}
      <ScrollReveal direction="bottom" delay={0.1}>
        <motion.div
          whileHover={{ boxShadow: "0 10px 30px rgba(42,206,209,0.08)" }}
          className={`rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 overflow-hidden transition-shadow duration-300 ${loading ? "opacity-50" : ""}`}
        >
          <div className="p-6 border-b border-[#2ACED1]/10">
            <h3 className="text-lg font-bold text-[#000C22] dark:text-white">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#000C22]/5 dark:border-white/5">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-3">Customer</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-3">Type</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-3">Status</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {(stats?.recentTransactions || []).map((tx, i) => (
                  <ScrollReveal key={tx.id} direction={i % 2 === 0 ? "left" : "right"} delay={0.15 + i * 0.08}>
                    <tr className="border-b border-[#000C22]/5 dark:border-white/5 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white text-xs font-bold">
                            {tx.name.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-[#000C22] dark:text-white">{tx.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[#000C22]/70 dark:text-[#D8F4F7]/70">{tx.type}</td>
                      <td className={`px-6 py-4 text-sm font-bold ${tx.amount.startsWith("+") ? "text-emerald-600" : "text-[#000C22]/70 dark:text-[#D8F4F7]/70"}`}>{tx.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                          ${tx.status === "Succeeded" ? "bg-emerald-500/10 text-emerald-600" : ""}
                          ${tx.status === "Processed" ? "bg-cyan-500/10 text-cyan-600" : ""}
                          ${tx.status === "Pending" ? "bg-amber-500/10 text-amber-600" : ""}
                        `}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#000C22]/50 dark:text-[#D8F4F7]/50">{tx.time}</td>
                    </tr>
                  </ScrollReveal>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </ScrollReveal>
    </div>
  );
}
