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
  const [activeTab, setActiveTab] = useState<"products" | "subscriptions">("products");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: productsFetched } = useApi(() => api.getProducts(), [], true);
  
  if (!mounted) return null;

  const displayedProducts = productsFetched ?? [];

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-[#000C22] dark:text-white mb-2 tracking-tight">Product Catalog</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Powering your commerce with modular products and subscriptions.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <div className="flex p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                <button 
                  onClick={() => setActiveTab("products")}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === "products" ? "bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20" : "text-[#000C22]/40 dark:text-white/40"}`}
                >
                  Products
                </button>
                <button 
                  onClick={() => setActiveTab("subscriptions")}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === "subscriptions" ? "bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20" : "text-[#000C22]/40 dark:text-white/40"}`}
                >
                  Subscriptions
                </button>
             </div>
             <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#2ACED1] text-white text-sm font-black shadow-xl shadow-[#2ACED1]/20">
                <Plus className="w-5 h-5" /> Create New
             </button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Quick Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Active Items", value: String(displayedProducts.length), icon: "Package", color: "#2ACED1" },
          { label: "Monthly Recurring", value: "$45.2k", icon: "Zap", color: "#008E96" },
          { label: "Growth Index", value: "94.2", icon: "TrendingUp", color: "#034E78" },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
            <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-[#2ACED1]/10 text-[#2ACED1]">
                    {(() => {
                      const Icon = getIcon(stat.icon as string);
                      return <Icon className="w-6 h-6 text-[#2ACED1]" />;
                    })()}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#2ACED1]/40" />
               </div>
               <p className="text-3xl font-black text-[#000C22] dark:text-white mb-1">{stat.value}</p>
               <p className="text-[10px] font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Product Table ─── */}
      <div className="bg-white/50 dark:bg-[#011B3B]/50 rounded-[3rem] border border-black/5 dark:border-white/5 overflow-hidden backdrop-blur-sm shadow-xl">
         <div className="px-8 py-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-black/5 dark:bg-white/5">
            <div className="flex items-center gap-4 flex-1 max-w-md">
               <Search className="w-5 h-5 text-[#2ACED1]" />
               <input placeholder="Search items or plans..." className="bg-transparent border-none outline-none text-sm font-bold w-full" />
            </div>
            <button className="p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#2ACED1]/10 transition-colors">
               <Filter className="w-4 h-4 text-[#2ACED1]" />
            </button>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">
                    <th className="px-10 py-6">Product</th>
                    <th className="px-10 py-6">Pricing Model</th>
                    <th className="px-10 py-6">Base Price</th>
                    <th className="px-10 py-6">Status</th>
                    <th className="px-10 py-6">Sales (30d)</th>
                    <th className="px-10 py-6 text-right">Revenue</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                 {displayedProducts.map((prod) => (
                   <tr key={prod.id} className="hover:bg-[#2ACED1]/5 transition-all group cursor-pointer">
                      <td className="px-10 py-5">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center shadow-lg shadow-[#2ACED1]/10">
                               <Tag className="w-5 h-5 text-white" />
                            </div>
                            <div>
                               <p className="text-sm font-black text-[#000C22] dark:text-white">{prod.name}</p>
                               <p className="text-[10px] font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-tighter">ID: {prod.id}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-5">
                         <div className="flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-[#2ACED1]" />
                            <span className="text-xs font-bold text-[#000C22]/60 dark:text-[#D8F4F7]/60">{prod.type === "Physical" ? "One-time" : "Recurring"}</span>
                         </div>
                      </td>
                      <td className="px-10 py-5 text-sm font-black text-[#000C22] dark:text-white">{prod.price}</td>
                      <td className="px-10 py-5">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            prod.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-black/5 dark:bg-white/5 text-white/40"
                         }`}>
                            {prod.status}
                         </span>
                      </td>
                      <td className="px-10 py-5 text-sm font-bold text-[#000C22]/60 dark:text-[#D8F4F7]/60">{prod.sales} units</td>
                      <td className="px-10 py-5 text-right">
                         <div className="flex flex-col items-end">
                            <p className="text-sm font-black text-[#2ACED1]">$14,200</p>
                            <p className="text-[8px] font-black text-emerald-500 uppercase">+12%</p>
                         </div>
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

import { Layers, Zap, TrendingUp } from "lucide-react";
