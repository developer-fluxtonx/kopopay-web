"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  User, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface PaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any;
}

export const PaymentDrawer: React.FC<PaymentDrawerProps> = ({ isOpen, onClose, transaction }) => {
  if (!transaction) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-[#000C22]/60 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[120] h-full w-full max-w-lg bg-white dark:bg-[#000814] shadow-2xl overflow-y-auto border-l border-black/5 dark:border-white/5"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 px-8 py-6 bg-white/90 dark:bg-[#000814]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center text-[#2ACED1]">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#000C22] dark:text-white tracking-tight">Payment Inspector</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/20">Ref ID: {transaction.id}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-all active:scale-90">
                <X className="w-5 h-5 text-[#000C22]/40 dark:text-white/40" />
              </button>
            </div>

            <div className="p-10 space-y-12 pb-24">
              {/* Main Amount & Status */}
              <div className="text-center space-y-4">
                <p className="text-6xl font-bold text-[#000C22] dark:text-white tracking-tighter">
                  ${Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className={`text-[10px] font-bold px-4 py-1.5 rounded-xl uppercase tracking-widest ${
                    transaction.status === "Succeeded" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                  }`}>
                    {transaction.status}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10" />
                  <span className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/20 uppercase tracking-widest">{transaction.date}</span>
                </div>
              </div>

              {/* Financial Architecture */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/20">Financial Breakdown</h4>
                <div className="p-8 rounded-[2.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#000C22]/50 dark:text-white/40">Gross Liquidity</span>
                    <span className="font-bold text-[#000C22] dark:text-white">${Math.abs(transaction.amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#000C22]/50 dark:text-white/40">KopoPay Network Fee</span>
                    <span className="font-bold text-red-500/80">-${(Math.abs(transaction.amount) * 0.029 + 0.30).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-black/5 dark:bg-white/5 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/50 dark:text-white/40">Net Settlement</span>
                    <span className="text-xl font-bold text-[#2ACED1] tracking-tight">${(Math.abs(transaction.amount) - (Math.abs(transaction.amount) * 0.029 + 0.30)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Lifecycle Timeline */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/20">Transaction Lifecycle</h4>
                <div className="space-y-8 relative ml-4">
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-black/5 dark:bg-white/5" />
                  {[
                    { title: "Funds Settled", time: "10:45 AM", desc: "Capital has been moved to your available balance.", active: true },
                    { title: "Secure Authorization", time: "10:44 AM", desc: "Network ID: AUTH-XP-90123", active: true },
                    { title: "Lifecycle Initiated", time: "10:44 AM", desc: "Checkout session completed via API.", active: true },
                  ].map((event, idx) => (
                    <div key={idx} className="relative pl-10">
                      <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ${event.active ? "bg-[#2ACED1] shadow-[0_0_8px_rgba(42,206,209,0.5)]" : "bg-white/10"}`} />
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-xs font-bold text-[#000C22] dark:text-white/90 uppercase tracking-widest">{event.title}</p>
                          <span className="text-[10px] font-bold text-[#000C22]/20 dark:text-white/10">{event.time}</span>
                        </div>
                        <p className="text-[11px] font-medium text-[#000C22]/40 dark:text-white/30 mt-1.5 leading-relaxed">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Radar Intelligence */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/20">Radar Intelligence</h4>
                <div className="p-8 rounded-[2.5rem] border border-emerald-500/10 bg-emerald-500/5 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Low Risk Profile</p>
                    <p className="text-[11px] font-medium text-emerald-600/70 mt-1">Verified via Kopo AI with 99.9% confidence.</p>
                  </div>
                  <div className="text-3xl font-bold text-emerald-500 tracking-tight">98</div>
                </div>
              </div>

              {/* Entity Context */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/20">Entity Context</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-5 p-2">
                    <div className="w-14 h-14 rounded-[1.25rem] bg-[#2ACED1]/5 flex items-center justify-center text-[#2ACED1]">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#000C22] dark:text-white tracking-tight">{transaction.customer?.name || "Anonymous"}</p>
                      <p className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/20 uppercase tracking-widest mt-1">{transaction.customer?.email || "No email provided"}</p>
                    </div>
                  </div>
                  <button className="w-full py-4 rounded-2xl border border-[#2ACED1]/30 text-[#2ACED1] text-[10px] font-bold uppercase tracking-widest hover:bg-[#2ACED1]/5 transition-all">
                    View Full Entity Profile
                  </button>
                </div>
              </div>

              {/* Management Actions */}
              <div className="flex gap-4 pt-10">
                <button className="flex-1 py-4 rounded-2xl bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all">
                  Initiate Refund
                </button>
                <button className="flex-1 py-4 rounded-2xl border border-black/5 dark:border-white/5 text-[#000C22]/60 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                  Sync Receipt
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
