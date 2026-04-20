"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Link as LinkIcon, 
  Plus, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  ExternalLink, 
  MoreVertical,
  QrCode,
  Globe,
  Settings,
  ArrowUpRight,
  TrendingUp,
  CreditCard
} from "lucide-react";

const paymentLinks = [
  { id: "pl_01HV...", name: "Advanced SaaS Plan", url: "buy.kopopay.com/as_p1", amount: "$199.00", status: "Active", volume: "$12,400", payments: 62 },
  { id: "pl_01HT...", name: "Donation Drive 2026", url: "buy.kopopay.com/donate", amount: "Pay what you want", status: "Active", volume: "$5,210", payments: 145 },
  { id: "pl_01HS...", name: "Standard Product Unit", url: "buy.kopopay.com/std_u", amount: "$45.00", status: "Disabled", volume: "$1,125", payments: 25 },
  { id: "pl_01HR...", name: "Consultation Fee", url: "buy.kopopay.com/consult", amount: "$500.00", status: "Active", volume: "$2,500", payments: 5 },
];

export default function PaymentLinksPage() {
  const [mounted, setMounted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1 flex items-center gap-3">
               <LinkIcon className="w-8 h-8 text-[#2ACED1]" />
               Payment Links
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Sell anywhere without code. Share a URL or embed a QR code.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Create payment link
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Quick Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: "Total Volume", value: "$21,235.00", detail: "+8.4% vs last mo", icon: TrendingUp },
            { label: "Active Links", value: "12", detail: "4 links with traffic today", icon: Globe },
            { label: "Top Seller", value: "SaaS Plan", detail: "Generated $12.4k total", icon: CreditCard },
         ].map((stat, i) => {
            const Icon = stat.icon;
            return (
               <div key={i} className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <div className="flex items-center justify-between mb-4">
                     <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#2ACED1]" />
                     </div>
                     <ArrowUpRight className="w-4 h-4 text-white/20" />
                  </div>
                  <p className="text-3xl font-bold dark:text-white mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-[#000C22]/40 dark:text-white/30 uppercase tracking-[0.15em]">{stat.label}</p>
                  <p className="text-[10px] text-[#2ACED1] mt-2 font-bold">{stat.detail}</p>
               </div>
            );
         })}
      </div>

      {/* ─── Controls ─── */}
      <ScrollReveal direction="bottom">
        <div className="flex flex-wrap items-center justify-between gap-4">
           <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="text" placeholder="Search links by name or URL..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 text-sm focus:outline-none focus:border-[#2ACED1]" />
           </div>
           <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#2ACED1]/20 text-sm font-bold dark:text-white hover:bg-[#2ACED1]/5 transition-colors">
              <Filter className="w-4 h-4" /> Filters
           </button>
        </div>
      </ScrollReveal>

      {/* ─── Links List ─── */}
      <div className="grid grid-cols-1 gap-4">
         {paymentLinks.map((link, i) => (
            <ScrollReveal key={link.id} direction="bottom" delay={0.1 + (i * 0.05)}>
               <motion.div 
                  whileHover={{ scale: 1.002, borderColor: "rgba(42,206,209,0.5)" }}
                  className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex flex-wrap items-center justify-between gap-6 transition-all group"
               >
                  <div className="flex items-center gap-6 min-w-[300px] flex-1">
                     <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5 relative">
                        {link.status === "Active" ? (
                           <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#011B3B] rounded-full" />
                        ) : (
                           <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white dark:border-[#011B3B] rounded-full" />
                        )}
                        <QrCode className="w-7 h-7 text-[#2ACED1]" />
                     </div>
                     <div>
                        <h3 className="font-bold text-lg dark:text-white group-hover:text-[#2ACED1] transition-colors">{link.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="text-xs text-[#000C22]/40 dark:text-white/40 font-mono italic">{link.url}</span>
                           <button 
                              onClick={() => copyToClipboard(link.url, link.id)}
                              className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                           >
                              {copiedId === link.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-[#2ACED1]" />}
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-12">
                     <div className="text-center">
                        <p className="text-sm font-bold dark:text-white">{link.amount}</p>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Price</p>
                     </div>
                     <div className="text-center">
                        <p className="text-sm font-bold dark:text-white">{link.volume}</p>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">{link.payments} sales</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 dark:text-white text-xs font-bold border border-white/5 transition-all">
                        <Settings className="w-3 h-3" /> Edit
                     </button>
                     <button className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <MoreVertical className="w-5 h-5 text-white/20" />
                     </button>
                  </div>
               </motion.div>
            </ScrollReveal>
         ))}
      </div>
    </div>
  );
}
