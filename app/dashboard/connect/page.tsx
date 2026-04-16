"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { Briefcase, Plus, Users, DollarSign, ArrowUpRight, ChevronRight, ExternalLink } from "lucide-react";

const connectedAccounts = [
  { name: "FoodieMarket", email: "ops@foodiemarket.com", balance: 8420, payouts: 12300, status: "Active", payout: "Weekly" },
  { name: "TechTrainers", email: "finance@techtrainers.io", balance: 2140, payouts: 34200, status: "Active", payout: "Daily" },
  { name: "DesignHub Pro", email: "billing@designhub.co", balance: 560, payouts: 5600, status: "Pending", payout: "Monthly" },
];

export default function ConnectPage() {
  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-1">Connect</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage connected accounts, split payments, and platform payouts.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(42,206,209,0.15)" }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2ACED1] to-[#008E96] text-white text-sm font-semibold shadow-[0_4px_15px_rgba(42,206,209,0.3)] transition-all">
              <Plus className="w-4 h-4" /> Add Account
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Connected Accounts", value: "24", icon: Users, dir: "left" as const },
          { label: "Platform Revenue", value: "$4,820", icon: DollarSign, dir: "bottom" as const },
          { label: "Total Payouts", value: "$52,100", icon: ArrowUpRight, dir: "right" as const },
        ].map((s, i) => (
          <ScrollReveal key={i} direction={s.dir} delay={i * 0.08}>
            <motion.div whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(42,206,209,0.15)" }}
              className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 hover:border-[#2ACED1]/60 transition-all">
              <div className="w-9 h-9 rounded-lg bg-[#2ACED1]/10 flex items-center justify-center mb-3"><s.icon className="w-4 h-4 text-[#2ACED1]" /></div>
              <p className="text-2xl font-bold text-[#000C22] dark:text-white">{s.value}</p>
              <p className="text-xs font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50 mt-1">{s.label}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Connected Accounts List */}
      <ScrollReveal direction="bottom" delay={0.15}>
        <h2 className="text-lg font-bold text-[#000C22] dark:text-white mb-4">Connected Accounts</h2>
        <div className="flex flex-col gap-4">
          {connectedAccounts.map((acc, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
              <motion.div whileHover={{ x: 4, boxShadow: "0 8px 25px rgba(42,206,209,0.12)" }}
                className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 hover:border-[#2ACED1]/50 transition-all cursor-pointer group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {acc.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#000C22] dark:text-white group-hover:text-[#2ACED1] transition-colors">{acc.name}</h3>
                        <ExternalLink className="w-3 h-3 text-[#000C22]/30 dark:text-[#D8F4F7]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">{acc.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">Balance</p>
                      <p className="text-sm font-bold text-[#000C22] dark:text-white">${acc.balance.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">Total Payouts</p>
                      <p className="text-sm font-bold text-emerald-600">${acc.payouts.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">Schedule</p>
                      <p className="text-sm font-semibold text-[#000C22] dark:text-white">{acc.payout}</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${acc.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{acc.status}</span>
                    <ChevronRight className="w-4 h-4 text-[#000C22]/30 dark:text-[#D8F4F7]/30 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
