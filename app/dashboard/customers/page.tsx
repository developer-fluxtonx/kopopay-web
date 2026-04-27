"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { Search, Plus, Mail, MoreHorizontal, ArrowUpRight } from "lucide-react";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

// Use centralized customer mock data from `lib/api.ts` (via `api.getCustomers()`)

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-600",
  "At Risk": "bg-amber-500/10 text-amber-600",
  VIP: "bg-purple-500/10 text-purple-600",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: customersFetched } = useApi(() => api.getCustomers(), [], true);
  
  if (!mounted) return null;

  const displayedCustomers = customersFetched ?? [];

  const filtered = displayedCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">Customer CRM</h1>
          <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">Strategic insights and lifecycle management for your global customer base.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2ACED1] text-white font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-[#2ACED1]/20 active:scale-95">
           <Plus className="w-4 h-4" /> Register Customer
        </button>
      </div>

      {/* Search & Filters */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#2ACED1]/5 blur-2xl group-focus-within:bg-[#2ACED1]/10 transition-all rounded-[2.5rem]" />
        <div className="relative">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2ACED1]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or unique identity..."
            className="w-full pl-20 pr-10 py-6 rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 focus:border-[#2ACED1]/50 outline-none text-sm font-medium transition-all placeholder:text-[#000C22]/20 dark:placeholder:text-white/10 shadow-sm"
          />
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map((customer) => (
          <div
            key={customer.id}
            className="p-10 rounded-[3rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#2ACED1]/5 transition-all duration-500 cursor-pointer group relative overflow-hidden"
          >
            {/* Status Indicator Bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${
              customer.status === "Active" ? "bg-emerald-500" : 
              customer.status === "VIP" ? "bg-purple-500" : "bg-amber-500"
            }`} />

            <div className="flex items-start justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-[#2ACED1]/10">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-[#000C22] dark:text-white text-lg tracking-tight group-hover:text-[#2ACED1] transition-colors">{customer.name}</h3>
                  <p className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/20 flex items-center gap-2 mt-1.5 uppercase tracking-widest">
                    <Mail className="w-3.5 h-3.5 text-[#2ACED1]" /> {customer.email}
                  </p>
                </div>
              </div>
              <button className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <MoreHorizontal className="w-5 h-5 text-[#000C22]/20 dark:text-white/20" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-6 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#000C22]/20 dark:text-white/20 mb-2">Transactions</p>
                <p className="text-2xl font-bold text-[#000C22] dark:text-white tracking-tight">{customer.payments}</p>
              </div>
              <div className="p-6 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#000C22]/20 dark:text-white/20 mb-2">Lifetime Vol</p>
                <p className="text-2xl font-bold text-[#2ACED1] tracking-tighter">${((customer.volume ?? 0)).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:divide-white/5">
              <div className="flex items-center gap-2.5">
                 <div className={`w-2 h-2 rounded-full ${
                   customer.status === "Active" ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" : 
                   customer.status === "VIP" ? "bg-purple-500" : "bg-amber-500"
                 }`} />
                 <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${
                   customer.status === "Active" ? "text-emerald-500" : 
                   customer.status === "VIP" ? "text-purple-500" : "text-amber-500"
                 }`}>{customer.status}</span>
              </div>
              <span className="text-[9px] font-bold text-[#000C22]/20 dark:text-white/10 uppercase tracking-[0.2em]">Member since {customer.joined}</span>
            </div>

            <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
               <ArrowUpRight className="w-6 h-6 text-[#2ACED1]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
