"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { Search, Plus, Mail, MoreHorizontal, ArrowUpRight } from "lucide-react";

const customers = [
  { id: "cus_001", name: "Sarah Johnson", email: "sarah@acme.com", payments: 42, volume: 52340, status: "Active", joined: "Jan 2025" },
  { id: "cus_002", name: "Michael Chen", email: "michael@startup.io", payments: 18, volume: 12800, status: "Active", joined: "Mar 2025" },
  { id: "cus_003", name: "Priya Sharma", email: "priya@enterprise.co", payments: 67, volume: 148200, status: "Active", joined: "Nov 2024" },
  { id: "cus_004", name: "James Wilson", email: "james@corp.com", payments: 5, volume: 3200, status: "At Risk", joined: "Feb 2026" },
  { id: "cus_005", name: "Elena Rodriguez", email: "elena@shop.mx", payments: 31, volume: 28700, status: "Active", joined: "Jul 2025" },
  { id: "cus_006", name: "Ahmed Hassan", email: "ahmed@fintech.ae", payments: 89, volume: 234500, status: "VIP", joined: "Sep 2024" },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-600",
  "At Risk": "bg-amber-500/10 text-amber-600",
  VIP: "bg-purple-500/10 text-purple-600",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <ScrollReveal direction="left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#000C22] dark:text-white">Customers</h1>
            <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage your customer relationships and payment history.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(42,206,209,0.15)" }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2ACED1] to-[#008E96] text-white text-sm font-semibold shadow-[0_4px_15px_rgba(42,206,209,0.3)] hover:shadow-[0_8px_25px_rgba(42,206,209,0.4)] transition-all"
            >
              <Plus className="w-4 h-4" /> Add Customer
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Search */}
      <ScrollReveal direction="top" delay={0.1}>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000C22]/40 dark:text-[#D8F4F7]/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 focus:border-[#2ACED1] outline-none text-sm transition-colors placeholder:text-[#000C22]/30 dark:placeholder:text-white/30"
          />
        </div>
      </ScrollReveal>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((customer, i) => (
          <ScrollReveal key={customer.id} direction={["left", "bottom", "right"][i % 3] as "left" | "bottom" | "right"} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(42,206,209,0.15)" }}
              className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 hover:border-[#2ACED1]/60 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#000C22] dark:text-white group-hover:text-[#2ACED1] transition-colors">{customer.name}</h3>
                    <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {customer.email}
                    </p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-[#2ACED1]/10 transition-colors opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-4 h-4 text-[#000C22]/50 dark:text-[#D8F4F7]/50" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#F2FCFC] dark:bg-[#000C22]/60">
                  <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50 mb-0.5">Payments</p>
                  <p className="text-lg font-bold text-[#000C22] dark:text-white">{customer.payments}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F2FCFC] dark:bg-[#000C22]/60">
                  <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50 mb-0.5">Volume</p>
                  <p className="text-lg font-bold text-[#000C22] dark:text-white">${customer.volume.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[customer.status]}`}>{customer.status}</span>
                <span className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">Since {customer.joined}</span>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
