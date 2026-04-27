"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
   Terminal, 
   Search, 
   Filter, 
   RefreshCw, 
   Download,
   Circle,
   ArrowRight,
   CheckCircle2,
   Activity,
   X,
   Clock
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";

const events = [
  { id: "evt_34Xy98Z", type: "charge.succeeded", resource: "ch_1N2y0F", time: "2026-04-16T14:32:05Z", status: "200 OK", method: "POST" },
  { id: "evt_34Xy98Y", type: "payment_intent.succeeded", resource: "pi_3M1x", time: "2026-04-16T14:32:04Z", status: "200 OK", method: "POST" },
  { id: "evt_34Xy97W", type: "customer.created", resource: "cus_9821HY", time: "2026-04-16T14:28:10Z", status: "200 OK", method: "POST" },
  { id: "evt_34Xy95A", type: "charge.failed", resource: "ch_9X1z2L", time: "2026-04-16T13:15:22Z", status: "402 Payment Required", method: "POST" },
  { id: "evt_34Xy92B", type: "invoice.payment_failed", resource: "in_1L0x", time: "2026-04-16T13:15:21Z", status: "200 OK", method: "POST" },
  { id: "evt_34Xy91C", type: "balance.available", resource: "txn_10X4", time: "2026-04-16T12:00:00Z", status: "200 OK", method: "POST" },
  { id: "evt_34Xy88D", type: "checkout.session.completed", resource: "cs_test_a1", time: "2026-04-16T10:45:12Z", status: "200 OK", method: "POST" },
];

export default function EventLogsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Dummy JSON payload for the modal
  const dummyPayload = {
    id: selectedEvent?.id,
    object: "event",
    api_version: "2026-01-01",
    created: 1713444725,
    data: {
      object: {
        id: selectedEvent?.resource,
        object: selectedEvent?.type.split('.')[0] || "object",
        amount: 125000,
        amount_captured: 125000,
        amount_refunded: 0,
        balance_transaction: "txn_10XqLz2eZvKYlo2C",
        billing_details: {
          address: { city: null, country: "US", line1: null, line2: null, postal_code: "94105", state: null },
          email: "sarah.j@acme-corp.com",
          name: "Sarah Johnson",
          phone: null
        },
        calculated_statement_descriptor: "ST* KOPO PAY",
        captured: true,
        created: 1713444725,
        currency: "usd",
        customer: "cus_9821HY",
        description: "Cloud Hosting - Monthly",
        paid: true,
        status: "succeeded"
      }
    },
    livemode: true,
    pending_webhooks: 0,
    request: { id: "req_XyZ123", idempotency_key: "idemp_abc789" },
    type: selectedEvent?.type
  };

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">Event Stream</h1>
          <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">A comprehensive history of all API activity and state changes in your workspace.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/10">
              <Circle className="w-2 h-2 text-emerald-500 fill-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Streaming Live</span>
           </div>
        </div>
      </div>

      {/* ─── Top Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: "Total Events (24h)", value: "14,285", icon: Activity, color: "#2ACED1" },
            { label: "Webhook Success", value: "99.98%", icon: CheckCircle2, color: "#10B981" },
            { label: "Avg Latency", value: "142ms", icon: Clock, color: "#034E78" },
         ].map((stat, i) => (
            <div key={i} className="p-6 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm">
               <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
                  <stat.icon className="w-4 h-4 text-[#2ACED1]/30" />
               </div>
               <p className="text-2xl font-bold text-[#000C22] dark:text-white tracking-tight">{stat.value}</p>
            </div>
         ))}
      </div>

      {/* ─── Controls ─── */}
      <div className="flex flex-wrap items-center gap-4 bg-black/[0.02] dark:bg-white/[0.02] p-6 rounded-[2rem] border border-black/5 dark:border-white/5">
         <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2ACED1]" />
            <input 
              type="text" 
              placeholder="Filter by event type, ID, or resource..." 
              className="w-full pl-12 pr-4 py-3 text-xs font-bold rounded-2xl bg-white dark:bg-[#000C22] border-none outline-none ring-1 ring-black/5 dark:ring-white/5 focus:ring-[#2ACED1]/50 transition-all shadow-sm"
            />
         </div>
         <button className="px-6 py-3 rounded-xl bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40 shadow-sm">
            Filters
         </button>
         <button className="p-3 rounded-xl bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 text-[#2ACED1] shadow-sm">
            <RefreshCw className="w-4 h-4" />
         </button>
      </div>

      {/* ─── Event Stream Table ─── */}
      <div className="rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                     <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/30">Event Type</th>
                     <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/30">Event ID</th>
                     <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/30">Resource</th>
                     <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/30">Status</th>
                     <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/30 text-right">Created</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {events.map((evt) => (
                     <tr 
                        key={evt.id} 
                        onClick={() => setSelectedEvent(evt)}
                        className="hover:bg-[#2ACED1]/5 cursor-pointer transition-colors group"
                     >
                        <td className="px-10 py-6">
                           <span className="text-xs font-bold text-[#000C22] dark:text-white/90 group-hover:text-[#2ACED1] transition-colors">{evt.type}</span>
                        </td>
                        <td className="px-10 py-6 font-mono text-[10px] font-bold text-[#000C22]/30 dark:text-white/20">{evt.id}</td>
                        <td className="px-10 py-6 font-mono text-[10px] font-bold text-[#000C22]/30 dark:text-white/20">{evt.resource}</td>
                        <td className="px-10 py-6">
                           <span className={`text-[9px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider ${evt.status.includes('OK') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                              {evt.status}
                           </span>
                        </td>
                        <td className="px-10 py-6 text-[10px] font-bold text-[#000C22]/30 dark:text-white/20 text-right uppercase">{new Date(evt.time).toLocaleTimeString()}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* ─── Payload Viewer Side-over ─── */}
      <AnimatePresence>
         {selectedEvent && (
            <>
               <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedEvent(null)}
                  className="fixed inset-0 z-[60] bg-[#000C22]/60 backdrop-blur-sm"
               />
               <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-full w-full max-w-[700px] bg-white dark:bg-[#011B3B] shadow-2xl z-[70] border-l border-[#2ACED1]/20 flex flex-col"
               >
                  <div className="p-8 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <Terminal className="w-5 h-5 text-[#2ACED1]" />
                        <div>
                           <h3 className="text-sm font-bold text-[#000C22] dark:text-white tracking-tight">{selectedEvent.type}</h3>
                           <p className="font-mono text-[10px] font-bold text-[#000C22]/30 dark:text-white/20 uppercase tracking-widest">{selectedEvent.id}</p>
                        </div>
                     </div>
                     <button onClick={() => setSelectedEvent(null)} className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/40 dark:text-white/40 transition-colors">
                        <X className="w-5 h-5" />
                     </button>
                  </div>

                  <div className="flex-1 overflow-auto bg-[#000C22] p-10 custom-scrollbar shadow-inner">
                     <div className="flex items-center gap-2 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2ACED1] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#2ACED1]/60 uppercase tracking-[0.2em]">Live Payload Inspector</span>
                     </div>
                     <pre className="text-xs font-mono text-[#2ACED1] leading-relaxed">
                        {JSON.stringify(dummyPayload, null, 2)}
                     </pre>
                  </div>
                  
                  <div className="p-8 border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex justify-between items-center">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                           <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/30 uppercase tracking-widest leading-none">
                           Successfully Delivered <br/> <span className="text-[8px] opacity-60">To 2 Webhook Endpoints</span>
                        </p>
                     </div>
                     <button className="px-6 py-3 rounded-xl bg-[#2ACED1] text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-[#2ACED1]/20 active:scale-95 transition-all">
                        Resend Webhook
                     </button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
    </div>
  );
}
