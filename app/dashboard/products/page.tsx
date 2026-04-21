"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Tag,
  ArrowUpRight,
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";

// Centralized product mock data provided by `lib/api.ts` via `api.getProducts()`

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: productsFetched } = useApi(() => api.getProducts(), [], true);
  
  if (!mounted) return null;

  const displayedProducts = productsFetched ?? [];
  return (
    <div className="flex flex-col gap-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Products Catalog</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage your offerings and pricing models.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(42,206,209,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Create Product
          </motion.button>
        </ScrollReveal>
      </div>

      {/* ─── Quick Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Products", value: String(displayedProducts.length), icon: "Package", color: "#2ACED1" },
          { label: "Recurring Revenue", value: "$45,200", icon: "Zap", color: "#008E96" },
          { label: "Total Sales", value: "8,940", icon: "Layers", color: "#034E78" },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(42,206,209,0.15)" }}
              className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                    {(() => {
                      const Icon = getIcon(stat.icon as string);
                      return <Icon className="w-6 h-6 text-[#2ACED1]" />;
                    })()}
                  </div>
                <div>
                  <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#000C22] dark:text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Controls ─── */}
      <ScrollReveal direction="bottom">
        <div className="flex flex-wrap items-center gap-4 bg-white/50 dark:bg-[#011B3B]/50 p-4 rounded-xl border border-[#2ACED1]/10">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000C22]/40 dark:text-[#D8F4F7]/40" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#000C22] border border-[#2ACED1]/20 focus:outline-none focus:border-[#2ACED1] transition-colors text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2ACED1]/20 hover:bg-[#2ACED1]/5 transition-colors text-sm font-semibold">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </ScrollReveal>

      {/* ─── Products Table ─── */}
      <ScrollReveal direction="bottom" delay={0.1}>
        <motion.div
          whileHover={{ boxShadow: "0 10px 30px rgba(42,206,209,0.08)" }}
          className="rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 overflow-hidden transition-shadow duration-300"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#000C22]/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Product Name</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Type</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Price</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Stock</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-4">Sales</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map((prod, i) => (
                  <tr key={prod.id} className="border-b border-[#000C22]/5 dark:border-white/5 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2ACED1]/20 to-[#034E78]/20 flex items-center justify-center">
                          <Tag className="w-5 h-5 text-[#2ACED1]" />
                        </div>
                        <span className="text-sm font-bold text-[#000C22] dark:text-white">{prod.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-[#000C22]/60 dark:text-[#D8F4F7]/60">{prod.type}</span>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-[#000C22] dark:text-white">{prod.price}</td>
                    <td className="px-6 py-5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        prod.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-gray-500/10 text-gray-500"
                      }`}>
                        {prod.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">{prod.stock}</td>
                    <td className="px-6 py-5 text-right font-bold text-[#000C22] dark:text-white">{prod.sales}</td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/40 dark:text-white/40 group-hover:text-[#2ACED1] transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </ScrollReveal>
    </div>
  );
}
