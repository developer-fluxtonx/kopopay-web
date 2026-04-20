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
    <div className="flex flex-col gap-6">
      <ScrollReveal direction="left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Event Logs</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Monitor API events and webhook deliveries in real-time.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Circle className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-500">Live API</span>
             </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ─── Top Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: "Total Events (24h)", value: "14,285", icon: "Activity", color: "#2ACED1" },
            { label: "Webhook Delivery Rate", value: "99.98%", icon: "Server", color: "#10B981" },
            { label: "Avg Response Time", value: "142ms", icon: "Clock", color: "#034E78" },
         ].map((stat, i) => (
            <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
               <motion.div 
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 flex items-center justify-between transition-all shadow-sm hover:shadow-md"
               >
                  <div>
                     <p className="text-xs font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 mb-1">{stat.label}</p>
                     <p className="text-2xl font-bold text-[#000C22] dark:text-white">{stat.value}</p>
                  </div>
                               <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5" style={{ color: stat.color }}>
                                  {(() => {
                                     const Icon = getIcon(stat.icon as string);
                                     return <Icon className="w-5 h-5" />;
                                  })()}
                           </div>
               </motion.div>
            </ScrollReveal>
         ))}
      </div>

      {/* ─── Controls ─── */}
      <ScrollReveal direction="bottom" delay={0.2}>
         <div className="flex flex-wrap items-center gap-3 bg-white/50 dark:bg-[#011B3B]/50 p-4 rounded-xl border border-[#2ACED1]/10 backdrop-blur-sm">
            <div className="relative flex-1 min-w-[240px]">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000C22]/40 dark:text-[#D8F4F7]/40" />
               <input 
                 type="text" 
                 placeholder="Search events by ID, type, or resource..." 
                 className="w-full pl-10 pr-4 py-2 font-mono text-sm rounded-lg bg-white dark:bg-[#000C22] border border-[#2ACED1]/20 focus:outline-none focus:border-[#2ACED1] transition-colors"
               />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2ACED1]/20 hover:bg-[#2ACED1]/5 transition-colors text-sm font-semibold">
               <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="p-2 rounded-lg border border-[#2ACED1]/20 hover:bg-[#2ACED1]/5 transition-colors text-sm font-semibold">
               <RefreshCw className="w-4 h-4" />
            </button>
         </div>
      </ScrollReveal>

      {/* ─── Event Stream Table ─── */}
      <ScrollReveal direction="bottom" delay={0.3}>
         <div className="rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-[#000C22]/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 w-48">Event Type</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40">Event ID</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40">Resource ID</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 text-right">Created</th>
                     </tr>
                  </thead>
                  <tbody className="font-mono text-xs">
                     {events.map((evt, i) => (
                        <tr 
                           key={evt.id} 
                           onClick={() => setSelectedEvent(evt)}
                           className="border-b border-[#000C22]/5 dark:border-white/5 hover:bg-[#2ACED1]/5 cursor-pointer transition-colors group"
                        >
                           <td className="px-6 py-4">
                              <span className="font-bold text-[#000C22] dark:text-white group-hover:text-[#2ACED1] transition-colors">{evt.type}</span>
                           </td>
                           <td className="px-6 py-4 text-[#000C22]/70 dark:text-[#D8F4F7]/70">{evt.id}</td>
                           <td className="px-6 py-4 text-[#000C22]/70 dark:text-[#D8F4F7]/70">{evt.resource}</td>
                           <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full ${evt.status.includes('OK') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                 {evt.method} {evt.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-[#000C22]/50 dark:text-[#D8F4F7]/50 text-right">{new Date(evt.time).toLocaleString()}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </ScrollReveal>

      {/* ─── Payload Viewer Modal ─── */}
      <AnimatePresence>
         {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-end p-4 lg:p-6">
               <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedEvent(null)}
                  className="absolute inset-0 bg-[#000C22]/80 backdrop-blur-sm"
               />
               <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="relative w-full max-w-3xl h-full bg-[#000C22] border border-[#2ACED1]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
               >
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#011B3B]">
                     <div className="flex items-center gap-3">
                        <Terminal className="w-5 h-5 text-[#2ACED1]" />
                        <div>
                           <h3 className="font-bold text-white tracking-wide">{selectedEvent.type}</h3>
                           <p className="font-mono text-xs text-white/50">{selectedEvent.id}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <button className="p-2 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                           <Download className="w-4 h-4" />
                        </button>
                        <button onClick={() => setSelectedEvent(null)} className="p-2 rounded hover:bg-red-500/20 hover:text-red-500 text-white/60 transition-colors">
                           ✕
                        </button>
                     </div>
                  </div>

                  {/* Body (JSON Config) */}
                  <div className="flex-1 overflow-auto bg-[#000C22] p-6 custom-scrollbar text-sm font-mono leading-relaxed">
                     <pre className="text-white/80">
                        {JSON.stringify(dummyPayload, null, 2)}
                     </pre>
                  </div>
                  
                  {/* Footer Context */}
                  <div className="px-6 py-3 border-t border-white/10 bg-[#011B3B] flex justify-between items-center text-xs font-mono">
                     <span className="text-white/50">Response generated in 42ms</span>
                     <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> Successfully delivered to 2 endpoints
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}
