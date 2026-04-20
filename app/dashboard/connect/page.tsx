"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Plus, 
  ChevronRight, 
  ExternalLink, 
  Users, 
  DollarSign, 
  ArrowUpRight,
  Search,
  Filter,
  MoreVertical,
  Activity,
  Layers,
  ShieldCheck,
  Building2,
  RefreshCw,
  Mail
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";

const connectedAccounts = [
  { name: "FoodieMarket", email: "ops@foodiemarket.com", balance: 8420, payouts: 12300, status: "Active", payout: "Weekly", type: "Standard" },
  { name: "TechTrainers", email: "finance@techtrainers.io", balance: 2140, payouts: 34200, status: "Active", payout: "Daily", type: "Express" },
  { name: "DesignHub Pro", email: "billing@designhub.co", balance: 560, payouts: 5600, status: "Pending", payout: "Monthly", type: "Custom" },
  { name: "Global Logistics", email: "shipping@globallog.com", balance: 14500, payouts: 89000, status: "Active", payout: "Daily", type: "Standard" },
];

export default function ConnectPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1 flex items-center gap-2">
               <Layers className="w-8 h-8 text-[#2ACED1]" />
               Connect
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Powering your platform's multiparty payments and global ecosystem payouts.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Add account
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Platform Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
         {[
            { label: "Accounts", value: "342", sub: "12 pending", icon: Users, color: "#2ACED1" },
            { label: "Platform Rev", value: "$12,480", sub: "+8.4% this week", icon: DollarSign, color: "#10B981" },
            { label: "Gross Payouts", value: "$412.5k", sub: "Settled 24h ago", icon: RefreshCw, color: "#034E78" },
            { label: "Verify Health", value: "99.8%", sub: "Passing KYC", icon: ShieldCheck, color: "#10B981" },
         ].map((stat, i) => {
            const Icon = stat.icon;
            return (
               <div key={i} className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 group transition-all hover:bg-white dark:hover:bg-[#011B3B]">
                  <div className="flex items-center justify-between mb-3">
                     <div className="w-9 h-9 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#2ACED1]" />
                     </div>
                     <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-[#2ACED1] transition-colors" />
                  </div>
                  <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                  <p className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/30 uppercase tracking-widest mt-1">{stat.label}</p>
                  <p className="text-[10px] text-[#2ACED1] font-bold mt-1 uppercase">{stat.sub}</p>
               </div>
            );
         })}
      </div>

      {/* ─── Accounts Management ─── */}
      <div className="space-y-4">
         <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-bold dark:text-white">Connected Accounts</h2>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input type="text" placeholder="Search accounts..." className="pl-10 pr-4 py-2 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 text-sm focus:outline-none focus:border-[#2ACED1]" />
               </div>
               <button className="p-2 rounded-xl border border-[#2ACED1]/20 hover:bg-[#2ACED1]/10 text-[#2ACED1] transition-colors">
                  <Filter className="w-5 h-5" />
               </button>
            </div>
         </div>

         <div className="flex flex-col gap-3">
            {connectedAccounts.map((acc, i) => (
               <ScrollReveal key={i} direction="bottom" delay={i * 0.05}>
                  <motion.div 
                     whileHover={{ x: 4, borderColor: "rgba(42,206,209,0.5)" }}
                     className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 flex flex-wrap items-center justify-between gap-6 transition-all group cursor-pointer"
                  >
                     <div className="flex items-center gap-5 min-w-[300px] flex-1">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white font-bold text-lg shadow-lg relative">
                           {acc.name.charAt(0)}
                           {acc.status === "Active" && (
                              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[#011B3B] rounded-full" />
                           )}
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                              <h3 className="font-bold dark:text-white text-lg group-hover:text-[#2ACED1] transition-colors">{acc.name}</h3>
                              <span className="text-[10px] font-bold text-[#2ACED1]/60 uppercase tracking-widest">{acc.type}</span>
                           </div>
                           <p className="text-xs text-white/40 flex items-center gap-1.5 mt-1">
                              <Mail className="w-3 h-3" /> {acc.email}
                           </p>
                        </div>
                     </div>

                     <div className="flex items-center gap-12 text-right">
                        <div>
                           <p className="text-sm font-bold dark:text-white">${acc.balance.toLocaleString()}</p>
                           <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Balance</p>
                        </div>
                        <div>
                           <p className="text-sm font-bold text-emerald-500">${acc.payouts.toLocaleString()}</p>
                           <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Life Payouts</p>
                        </div>
                        <div className="min-w-[80px]">
                           <p className="text-sm font-bold dark:text-white italic">{acc.payout}</p>
                           <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Schedule</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 dark:text-white text-xs font-bold border border-white/5 transition-all opacity-0 group-hover:opacity-100">
                           View Details
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

      {/* ─── Orchestration Panel ─── */}
      <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-80 h-80 bg-[#2ACED1]/5 blur-[100px]" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h3 className="text-3xl font-bold text-white leading-tight">Master your platform's <br/><span className="text-[#2ACED1]">money movement.</span></h3>
               <p className="text-sm text-white/60 leading-relaxed">
                  Connect provides the financial infrastructure to handle payouts, automated tax collection, and cross-border money movement. Whether you're an on-demand marketplace or an enterprise platform, manage every cent from one central dashboard.
               </p>
               <div className="flex items-center gap-4">
                  <button className="px-6 py-3 rounded-xl bg-[#2ACED1] text-[#011B3B] font-bold text-sm shadow-xl shadow-[#2ACED1]/20 hover:scale-105 transition-all">
                     View Multi-party flows
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">
                     API Reference
                  </button>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               {[
                  { label: "Onboarding", icon: "UserPlus", desc: "Customizable KYC/AML flows." },
                  { label: "Split Payments", icon: "ArrowLeftRight", desc: "Complex revenue share logic." },
                  { label: "Payout Schedules", icon: "Clock", desc: "Daily, weekly, or T+2." },
                  { label: "Connect Treasury", icon: "Landmark", desc: "Hold balances for users." },
               ].map((tool, i) => {
                  const Icon = i === 0 ? Users : i === 1 ? RefreshCw : i === 2 ? Activity : Building2;
                  return (
                     <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2ACED1]/30 transition-all group/tool">
                        <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center mb-3 group-hover/tool:scale-110 transition-transform">
                            <Icon className="w-5 h-5 text-[#2ACED1]" />
                        </div>
                        <h4 className="text-white font-bold text-sm mb-1">{tool.label}</h4>
                        <p className="text-[10px] text-white/40 leading-relaxed font-medium uppercase tracking-tight">{tool.desc}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
    </div>
  );
}
