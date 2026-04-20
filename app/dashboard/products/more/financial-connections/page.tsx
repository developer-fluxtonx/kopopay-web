"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Link2, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  ExternalLink, 
  MoreVertical,
  Landmark,
  ShieldCheck,
  RefreshCw,
  ArrowUpRight,
  Database,
  Building2
} from "lucide-react";

const andyConnections = [
  { id: "fc_01H...", bank: "Chase Bank", account: "Checking (Personal)", status: "Connected", balance: "$4,250.00", owner: "John Doe" },
  { id: "fc_02I...", bank: "Bank of America", account: "Savings", status: "Connected", balance: "$12,800.00", owner: "John Doe" },
  { id: "fc_03J...", bank: "Wells Fargo", account: "Business Checking", status: "Disconnected", balance: "--", owner: "Kopo Pay Inc." },
];

export default function FinancialConnectionsPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1 flex items-center gap-3">
               <Link2 className="w-8 h-8 text-[#2ACED1]" />
               Financial Connections
            </h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Securely link and verify customer bank accounts for smarter payouts and risk checks.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg"
             >
                <Plus className="w-4 h-4" /> Link account
             </motion.button>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Connect Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: "Total Linked Accounts", value: "1,240", detail: "84% success rate", icon: Database },
            { label: "Verified Data Points", value: "42.8k", detail: "Balances, owners, transactions", icon: ShieldCheck },
            { label: "Active Integrations", value: "14", detail: "Plat, Finicity, SaltEdge", icon: Landmark },
         ].map((stat, i) => {
            const Icon = stat.icon;
            return (
               <div key={i} className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center mb-4">
                     <Icon className="w-5 h-5 text-[#2ACED1]" />
                  </div>
                  <p className="text-3xl font-bold dark:text-white mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-[#000C22]/40 dark:text-white/30 uppercase tracking-[0.15em]">{stat.label}</p>
                  <p className="text-[10px] text-[#2ACED1] mt-2 font-bold uppercase">{stat.detail}</p>
               </div>
            );
         })}
      </div>

      {/* ─── Connections Table ─── */}
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold dark:text-white">Linked Accounts</h2>
            <div className="flex items-center gap-2">
               <Search className="w-4 h-4 text-white/40" />
               <input type="text" placeholder="Search by bank or owner..." className="bg-transparent border-none outline-none text-sm text-white/60" />
            </div>
         </div>

         <div className="rounded-2xl border border-[#2ACED1]/20 bg-white/80 dark:bg-[#011B3B]/80 overflow-hidden shadow-xl">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-black/5 dark:bg-white/5 border-b border-[#2ACED1]/10">
                     <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Bank Institution</th>
                     <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Status</th>
                     <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Owner</th>
                     <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 text-right">Balance</th>
                  </tr>
               </thead>
               <tbody>
                  {andyConnections.map((c) => (
                     <tr key={c.id} className="border-b border-[#2ACED1]/10 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer group">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#2ACED1]/20 flex items-center justify-center">
                                 <Building2 className="w-4 h-4 text-[#2ACED1]" />
                              </div>
                              <div>
                                 <p className="text-sm font-bold dark:text-white">{c.bank}</p>
                                 <p className="text-[10px] text-white/40">{c.account}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                              c.status === "Connected" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                           }`}>
                              {c.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-sm dark:text-white/70">{c.owner}</td>
                        <td className="px-6 py-4 text-right">
                           {c.status === "Connected" ? (
                              <p className="text-sm font-bold dark:text-white">{c.balance}</p>
                           ) : (
                              <button className="text-[10px] font-bold text-[#2ACED1] uppercase hover:underline flex items-center gap-1 justify-end ml-auto">
                                 Reconnect <RefreshCw className="w-3 h-3" />
                              </button>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* ─── Compliance Section ─── */}
      <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ACED1]/5 blur-[80px]" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h3 className="text-2xl font-bold text-white italic">Privacy & Security as a Pillar</h3>
               <p className="text-sm text-white/60 leading-relaxed">
                  We use bank-grade encryption to protect customer data. Kopo Pay never stores raw bank credentials. All data is tokenized and processed via audited financial infrastructure providers.
               </p>
               <div className="flex flex-wrap gap-4">
                  {["SOC2 Type II", "GDPR Compliant", "PCI-DSS Level 1"].map(cert => (
                     <div key={cert} className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                        <CheckCircle2 className="w-3 h-3 text-[#2ACED1]" />
                        <span className="text-[10px] font-bold text-white/80 uppercase">{cert}</span>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#2ACED1]/20 flex items-center justify-center">
                     <ShieldCheck className="w-6 h-6 text-[#2ACED1]" />
                  </div>
                  <div>
                     <h4 className="text-white font-bold">Data Permissions</h4>
                     <p className="text-xs text-white/40">Control what data you request from customers.</p>
                  </div>
               </div>
               
               <div className="space-y-3">
                  {[
                     { label: "Account Balances", status: "Included" },
                     { label: "Transaction History (90 days)", status: "Optional" },
                     { label: "Identity Verification", status: "Included" },
                     { label: "Routing & Account Numbers", status: "Included" },
                  ].map((p, i) => (
                     <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 text-xs">
                        <span className="text-white/70">{p.label}</span>
                        <span className="text-[#2ACED1] font-bold uppercase tracking-widest">{p.status}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
