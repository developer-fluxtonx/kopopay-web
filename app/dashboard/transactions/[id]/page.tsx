"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
   ArrowLeft, 
   ChevronRight, 
   CreditCard, 
   Clock, 
   CheckCircle2,
   XCircle, 
   ShieldCheck, 
   ExternalLink,
   Copy,
   Download,
   MoreVertical,
   Mail,
   RefreshCw,
   Code
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";
import type { Transaction } from "@/lib/types";

export default function TransactionDetailPage() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [activeTab, setActiveTab] = useState("overview");

  React.useEffect(() => {
    setMounted(true);
  }, []);

   // fallback for UI shape if API is not available
   const mockTxn: Transaction = {
      id: id || "TXN-20260415001",
      amount: 1250.0,
      currency: "USD",
      status: "Succeeded",
      date: "Apr 15, 2026, 14:32:05",
      description: "Cloud Hosting - Monthly Subscription (O-8912)",
      customer: { id: "cus_9821HY", name: "Sarah Johnson", email: "sarah@acme.com" },
      payment_method: { brand: "Visa", last4: "4242", type: "Credit Card", issuer: "JPMorgan Chase" },
      fraud_details: { risk_score: 12, risk_level: "Normal", outcome: "Authorized", cvc_check: "Passed", address_check: "Passed" },
   };

   const { data: fetchedTxn } = useApi(() => (id ? api.getTransaction(id as string) : Promise.resolve(null)), [id], Boolean(id));
   const txn = (fetchedTxn ?? mockTxn);

   if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Top Navigation ─── */}
      <div className="flex items-center justify-between">
         <button 
           onClick={() => import("@/lib/safeRouter").then(({ safeBack }) => safeBack(router))}
           className="flex items-center gap-2 text-sm font-bold text-[#000C22]/60 dark:text-[#D8F4F7]/60 hover:text-[#2ACED1] transition-colors"
         >
            <ArrowLeft className="w-4 h-4" /> Back to transactions
         </button>
         <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/40 dark:text-white/40"><Mail className="w-5 h-5" /></button>
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/40 dark:text-white/40"><RefreshCw className="w-5 h-5" /></button>
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/40 dark:text-white/40"><Download className="w-5 h-5" /></button>
         </div>
      </div>

      {/* ─── Transaction Summary Card ─── */}
      <ScrollReveal direction="bottom">
         <div className="p-8 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ACED1] opacity-5 blur-[100px] pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                     <CreditCard className="w-8 h-8 text-[#2ACED1]" />
                  </div>
                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-4xl font-bold text-white tracking-tight">${txn.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "0.00"}</h2>
                        <span className="text-xl font-medium text-white/40">USD</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold ring-1 ring-emerald-500/30">
                           <CheckCircle2 className="w-3 h-3" />
                           {txn.status}
                        </span>
                        <p className="text-white/40 text-sm font-medium">{txn.date}</p>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 text-white/50 bg-white/5 px-4 py-2 rounded-xl border border-white/5 font-mono text-xs">
                     {txn.id}
                     <Copy className="w-3 h-3 hover:text-[#2ACED1] cursor-pointer transition-colors" />
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-action-button text-white font-bold text-sm shadow-lg hover:scale-[1.02] transition-all">
                     Refund Payment
                  </button>
               </div>
            </div>
         </div>
      </ScrollReveal>

      {/* ─── Detail Tabs ─── */}
      <div className="flex border-b border-[#000C22]/5 dark:border-white/5 gap-8">
         {["overview", "frauds & risk", "timeline", "logs"].map((tab) => (
            <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === tab ? "text-[#2ACED1]" : "text-[#000C22]/40 dark:text-[#D8F4F7]/40 hover:text-[#2ACED1]/60"
               }`}
            >
               {tab}
               {activeTab === tab && (
                  <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2ACED1]" />
               )}
            </button>
         ))}
      </div>

      {/* ─── Tab Content ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Details */}
         <div className="lg:col-span-2 flex flex-col gap-6">
            <ScrollReveal direction="bottom">
               <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 mb-6">Payment Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                     {[
                        { label: "Description", value: txn.description },
                        { label: "Statement Descriptor", value: "SAAS* KOPO PAY" },
                        { label: "Amount", value: `${txn.amount} ${txn.currency}` },
                        { label: "Fee", value: "$36.55" },
                        { label: "Net Amount", value: "$1,213.45" },
                        { label: "Status", value: txn.status },
                     ].map((item, i) => (
                        <div key={i}>
                           <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase mb-1">{item.label}</p>
                           <p className="text-sm font-medium dark:text-white">{item.value}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollReveal>

            <ScrollReveal direction="bottom" delay={0.1}>
               <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 mb-6">Customer & Origin</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                     {[
                        { label: "Customer Name", value: txn.customer.name, link: true },
                        { label: "Email Address", value: txn.customer.email },
                        { label: "Customer ID", value: txn.customer.id },
                        { label: "IP Address", value: txn.customer.ip },
                        { label: "Payment Method", value: `${txn.payment_method.brand} •••• ${txn.payment_method.last4}` },
                        { label: "Bank of Origin", value: txn.payment_method.issuer },
                     ].map((item, i) => (
                        <div key={i}>
                           <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase mb-1">{item.label}</p>
                           <div className="flex items-center gap-2">
                              <p className={`text-sm font-medium dark:text-white ${item.link ? "text-[#2ACED1] underline cursor-pointer" : ""}`}>{item.value}</p>
                              {item.link && <ExternalLink className="w-3 h-3 text-[#2ACED1]" />}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollReveal>
         </div>

         {/* Side Details / Risk */}
         <div className="flex flex-col gap-6">
            <ScrollReveal direction="right">
               <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Risk Analysis</h4>
                     <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                     <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex-1">
                        <p className="text-2xl font-bold text-emerald-500">{txn.fraud_details.risk_score}</p>
                        <p className="text-[10px] font-bold text-emerald-500/60 uppercase">Normal Risk</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     {[
                        { label: "Outcome", value: txn.fraud_details.outcome, color: "text-emerald-500" },
                        { label: "CVC Check", value: txn.fraud_details.cvc_check, icon: "CheckCircle2" },
                        { label: "Address Check", value: txn.fraud_details.address_check, icon: "CheckCircle2" },
                     ].map((check, i) => (
                        <div key={i} className="flex items-center justify-between">
                           <span className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40">{check.label}</span>
                           <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold ${check.color || "dark:text-white"}`}>{check.value}</span>
                                             {check.icon && (() => {
                                                const Icon = getIcon(check.icon as string);
                                                return <Icon className="w-3 h-3 text-emerald-500" />;
                                             })()}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
               <div className="p-6 rounded-2xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20">
                  <div className="flex items-center gap-2 mb-4 text-[#2ACED1]">
                     <Code className="w-4 h-4" />
                     <h4 className="text-xs font-bold uppercase tracking-widest">Metadata</h4>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-[10px] font-bold text-white/40">order_id</span>
                        <span className="text-[10px] font-bold text-white">ORD-99120</span>
                     </div>
                     <div className="flex justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-[10px] font-bold text-white/40">plan_tier</span>
                        <span className="text-[10px] font-bold text-white">enterprise</span>
                     </div>
                  </div>
               </div>
            </ScrollReveal>
         </div>
      </div>
    </div>
  );
}
