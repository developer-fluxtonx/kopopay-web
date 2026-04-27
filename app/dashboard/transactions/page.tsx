"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { Search, Filter, Download, ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

import { PaymentDrawer } from "@/components/molecules/PaymentDrawer";

// Using centralized mock data from `lib/api.ts` via `api.getTransactions()`

const statusColors: Record<string, string> = {
  Succeeded: "bg-emerald-500/10 text-emerald-600",
  Processed: "bg-cyan-500/10 text-cyan-600",
  Pending: "bg-amber-500/10 text-amber-600",
  Failed: "bg-red-500/10 text-red-500",
};

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: transactions } = useApi(() => api.getTransactions(), [], true);

  if (!mounted) return null;

  const filtered = (transactions ?? []).filter((tx: any) =>
    tx.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
    tx.customer?.email?.toLowerCase().includes(search.toLowerCase()) ||
    tx.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10 pb-20">
      <PaymentDrawer 
        isOpen={!!selectedTx} 
        onClose={() => setSelectedTx(null)} 
        transaction={selectedTx} 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">Payments Ledger</h1>
          <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">Monitor and manage all incoming and outgoing financial movements.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] text-[#000C22] dark:text-white font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-black/[0.05] dark:hover:bg-white/[0.05] shadow-sm">
           <Download className="w-4 h-4 text-[#2ACED1]" /> Export Dataset
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-[#2ACED1]/5 blur-2xl group-focus-within:bg-[#2ACED1]/10 transition-all rounded-[2.5rem]" />
          <div className="relative">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2ACED1]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by identity or transaction hash..."
              className="w-full pl-20 pr-10 py-5 rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 focus:border-[#2ACED1]/50 outline-none text-sm font-medium transition-all placeholder:text-[#000C22]/20 dark:placeholder:text-white/10 shadow-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-5 rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/50 dark:text-white/40 hover:border-[#2ACED1]/30 transition-all shadow-sm">
            <Filter className="w-4 h-4 text-[#2ACED1]" /> Filter <ChevronDown className="w-3 h-3 opacity-50" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#011B3B] rounded-[2.5rem] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                {["Transaction Hash", "Origin / Destination", "Asset", "Amount", "Status", "Timestamp"].map((h) => (
                  <th key={h} className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filtered.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="hover:bg-[#2ACED1]/5 transition-all cursor-pointer group"
                >
                  <td className="px-10 py-8 text-xs font-bold text-[#2ACED1] font-mono tracking-tight group-hover:underline">
                    {tx.id}
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg shadow-[#2ACED1]/10">
                        {tx.customer?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#000C22] dark:text-white/90">
                          {tx.customer?.name || "Anonymous User"}
                        </p>
                        <p className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/20 uppercase tracking-widest mt-1">
                          {tx.customer?.email || "No email associated"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-[10px] font-bold text-[#000C22]/40 dark:text-white/30 uppercase tracking-[0.2em]">
                    {tx.method}
                  </td>
                  <td className="px-10 py-8">
                    <span
                      className={`text-sm font-bold flex items-center gap-1 tracking-tight ${
                        tx.amount >= 0 ? "text-emerald-500" : "text-[#000C22] dark:text-white"
                      }`}
                    >
                      {tx.amount >= 0 ? "+" : ""}$
                      {Math.abs(tx.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span >
                  </td>
                  <td className="px-10 py-8">
                    <span
                      className={`text-[9px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest ${
                        statusColors[tx.status] || ""
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-[9px] font-bold text-[#000C22]/30 dark:text-white/10 uppercase tracking-[0.2em]">
                    {tx.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
