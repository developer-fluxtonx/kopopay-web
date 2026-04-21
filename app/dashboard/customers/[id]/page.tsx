"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Mail,
  MoreVertical,
  Activity,
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle2,
  Package,
  MapPin,
  Clock,
  ArrowUpRight,
  Edit2
} from "lucide-react";

export default function CustomerDetailPage() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data for the specific customer
  const customer = {
    id: id || "cus_9821HY",
    name: "Sarah Johnson",
    email: "sarah.j@acme-corp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Boulevard, Suite 400, San Francisco, CA 94105",
    status: "Active",
    created: "Jan 12, 2025",
    ltv: 52340.50,
    mrr: 1250.00,
    cards: [
      { id: "pm_101", brand: "Visa", last4: "4242", exp: "12/28", isDefault: true },
      { id: "pm_102", brand: "Mastercard", last4: "8811", exp: "05/26", isDefault: false },
    ],
    subscriptions: [
      { id: "sub_A912", plan: "Enterprise Hosting", amount: "$1,250/mo", status: "Active", next_billing: "May 15, 2026" }
    ],
    recent_transactions: [
      { id: "TXN-20260415", amount: "+$1,250.00", status: "Succeeded", date: "Apr 15" },
      { id: "TXN-20260315", amount: "+$1,250.00", status: "Succeeded", date: "Mar 15" },
      { id: "TXN-20260215", amount: "+$1,250.00", status: "Succeeded", date: "Feb 15" },
    ]
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Top Navigation ─── */}
      <div className="flex items-center justify-between">
             <button 
                onClick={() => import("@/lib/safeRouter").then(({ safeBack }) => safeBack(router))}
           className="flex items-center gap-2 text-sm font-bold text-[#000C22]/60 dark:text-[#D8F4F7]/60 hover:text-[#2ACED1] transition-colors"
         >
            <ArrowLeft className="w-4 h-4" /> Back to customers
         </button>
         <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#011B3B] border border-[#2ACED1]/20 text-sm font-semibold hover:border-[#2ACED1] transition-all">
               <Edit2 className="w-4 h-4 text-[#2ACED1]" /> Edit Profile
            </button>
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/40 dark:text-white/40"><MoreVertical className="w-5 h-5" /></button>
         </div>
      </div>

      {/* ─── Customer Header Card ─── */}
      <ScrollReveal direction="bottom">
         <div className="p-8 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ACED1] opacity-5 blur-[100px] pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center border-4 border-[#011B3B] shadow-lg shrink-0">
                     <span className="text-3xl font-bold text-white">{customer.name.charAt(0)}</span>
                  </div>
                  <div>
                     <h2 className="text-3xl font-bold text-white tracking-tight mb-1">{customer.name}</h2>
                     <div className="flex items-center gap-4 text-white/60 text-sm font-medium">
                        <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {customer.email}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> San Francisco, CA</span>
                     </div>
                  </div>
               </div>
               
               <div className="flex gap-6 text-right">
                  <div>
                     <p className="text-xs font-bold text-[#2ACED1] uppercase tracking-widest mb-1">Lifetime Value</p>
                     <p className="text-2xl font-bold text-white">${customer.ltv?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "0.00"}</p>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-white/10 self-center" />
                  <div className="hidden sm:block">
                     <p className="text-xs font-bold text-[#2ACED1] uppercase tracking-widest mb-1">MRR</p>
                     <p className="text-2xl font-bold text-white">${customer.mrr?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "0.00"}</p>
                  </div>
               </div>
            </div>
         </div>
      </ScrollReveal>

      {/* ─── Detail Tabs ─── */}
      <div className="flex border-b border-[#000C22]/5 dark:border-white/5 gap-8 overflow-x-auto custom-scrollbar">
         {["overview", "subscriptions", "payments", "invoices", "events"].map((tab) => (
            <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap relative ${
                  activeTab === tab ? "text-[#2ACED1]" : "text-[#000C22]/40 dark:text-[#D8F4F7]/40 hover:text-[#2ACED1]/60"
               }`}
            >
               {tab}
               {activeTab === tab && (
                  <motion.div layoutId="customerTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2ACED1]" />
               )}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
         {/* Main Content (2/3 width) */}
         <div className="xl:col-span-2 flex flex-col gap-6">
            <ScrollReveal direction="bottom">
               {/* Subscriptions Section */}
               <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Active Subscriptions</h4>
                     <button className="text-xs font-bold text-[#2ACED1] hover:underline">Add Subscription</button>
                  </div>
                  
                  {customer.subscriptions.map(sub => (
                     <div key={sub.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 gap-4">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-[#2ACED1]" />
                           </div>
                           <div>
                              <p className="font-bold dark:text-white">{sub.plan}</p>
                              <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">{sub.amount}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <p className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 mb-1 tracking-wider uppercase">Next Invoice</p>
                              <p className="text-sm font-bold dark:text-white">{sub.next_billing}</p>
                           </div>
                           <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500">
                              {sub.status}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            </ScrollReveal>

            <ScrollReveal direction="bottom" delay={0.1}>
               {/* Recent Transactions */}
               <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Recent Activity</h4>
                     <button className="text-xs font-bold text-[#2ACED1] hover:underline">View All</button>
                  </div>
                  
                  <div className="space-y-2">
                     {customer.recent_transactions.map((txn, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                 <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                              </div>
                              <div>
                                 <p className="text-sm font-bold dark:text-white group-hover:text-[#2ACED1] transition-colors">{txn.amount}</p>
                                 <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">{txn.id}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-xs font-bold text-emerald-500 mb-0.5">{txn.status}</p>
                              <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">{txn.date}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollReveal>
         </div>

         {/* Sidebar Content (1/3 width) */}
         <div className="flex flex-col gap-6">
            <ScrollReveal direction="right">
               {/* Details Sidebar */}
               <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 mb-6">Details</h4>
                  
                  <div className="space-y-4">
                     <div>
                        <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase mb-1">Customer ID</p>
                        <p className="text-sm font-mono text-[#2ACED1]">{customer.id}</p>
                     </div>
                     <div>
                        <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase mb-1">Created</p>
                        <p className="text-sm font-medium dark:text-white">{customer.created}</p>
                     </div>
                     <div>
                        <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase mb-1">Phone</p>
                        <p className="text-sm font-medium dark:text-white">{customer.phone}</p>
                     </div>
                     <div>
                        <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase mb-1">Billing Address</p>
                        <p className="text-sm font-medium dark:text-white/80 leading-relaxed">{customer.address}</p>
                     </div>
                  </div>
               </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
               {/* Payment Methods */}
               <div className="p-6 rounded-2xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20">
                  <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center gap-2 text-[#2ACED1]">
                        <CreditCard className="w-4 h-4" />
                        <h4 className="text-xs font-bold uppercase tracking-widest">Payment Methods</h4>
                     </div>
                     <button className="text-xs font-bold text-white/50 hover:text-white transition-colors">Add</button>
                  </div>
                  
                  <div className="space-y-3">
                     {customer.cards.map((card, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-6 bg-white flex items-center justify-center rounded-sm text-[10px] font-bold text-[#011B3B]">
                                 {card.brand}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-white">•••• {card.last4}</p>
                                 <p className="text-[10px] text-white/40">Expires {card.exp}</p>
                              </div>
                           </div>
                           {card.isDefault && (
                              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-white/70 uppercase">Default</span>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollReveal>
         </div>
      </div>
    </div>
  );
}
