"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { Search, Filter, Download, ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

// fallback for UI shape if API is not available
const mockTransactions = [
  { id: "TXN-20260415001", customer: { name: "Sarah Johnson", email: "sarah@acme.com" }, method: "Visa •••• 4242", amount: 1250.0, status: "Succeeded", date: "Apr 15, 2026" },
  { id: "TXN-20260415002", customer: { name: "Michael Chen", email: "michael@startup.io" }, method: "Mastercard •••• 8811", amount: -320.0, status: "Processed", date: "Apr 15, 2026" },
];

const statusColors: Record<string, string> = {
  Succeeded: "bg-emerald-500/10 text-emerald-600",
  Processed: "bg-cyan-500/10 text-cyan-600",
  Pending: "bg-amber-500/10 text-amber-600",
  Failed: "bg-red-500/10 text-red-500",
};

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: transactions } = useApi(() => api.getTransactions(), [], true);

  if (!mounted) return null;

  const filtered = (transactions ?? mockTransactions).filter(
    (tx: any) =>
      tx.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      tx.customer?.email?.toLowerCase().includes(search.toLowerCase()) ||
      tx.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <ScrollReveal direction="left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#000C22] dark:text-white">Transactions</h1>
            <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">View and manage all your payment activity.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(42,206,209,0.15)" }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-[#011B3B] border border-[#2ACED1]/20 text-sm font-semibold hover:border-[#2ACED1] transition-all"
            >
              <Download className="w-4 h-4 text-[#2ACED1]" /> Export CSV
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Filters Bar */}
      <ScrollReveal direction="top" delay={0.15}>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000C22]/40 dark:text-[#D8F4F7]/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer or transaction ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 focus:border-[#2ACED1] outline-none text-sm transition-colors placeholder:text-[#000C22]/30 dark:placeholder:text-white/30"
            />
          </div>
          <motion.button whileHover={{ y: -1 }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 text-sm font-medium hover:border-[#2ACED1] transition-colors">
            <Filter className="w-4 h-4 text-[#2ACED1]" /> Filter <ChevronDown className="w-3 h-3 opacity-50" />
          </motion.button>
        </div>
      </ScrollReveal>

      {/* Table */}
      <ScrollReveal direction="bottom" delay={0.2}>
        <motion.div
          whileHover={{ boxShadow: "0 10px 30px rgba(42,206,209,0.08)" }}
          className="rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 overflow-hidden transition-shadow"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#000C22]/5 dark:border-white/5">
                  {["Transaction", "Customer", "Method", "Amount", "Status", "Date"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx, i) => (
                  <ScrollReveal
                    key={tx.id}
                    as="tr"
                    direction={i % 2 === 0 ? "left" : "right"}
                    delay={0.05 * i}
                    className="border-b border-[#000C22]/5 dark:border-white/5 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-[#2ACED1] group-hover:underline">
                      {tx.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {tx.customer?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                            {tx.customer?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">
                            {tx.customer?.email || ""}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#000C22]/70 dark:text-[#D8F4F7]/70">
                      {tx.method}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-bold flex items-center gap-1 ${
                          tx.amount >= 0 ? "text-emerald-600" : "text-[#000C22]/70 dark:text-[#D8F4F7]/70"
                        }`}
                      >
                        {tx.amount >= 0 ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {tx.amount >= 0 ? "+" : ""}$
                        {Math.abs(tx.amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          statusColors[tx.status] || ""
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                      {tx.date}
                    </td>
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
