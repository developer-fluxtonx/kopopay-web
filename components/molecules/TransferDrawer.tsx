"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ArrowRight, 
  Landmark, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Info,
  ChevronDown,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface TransferDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

export const TransferDrawer: React.FC<TransferDrawerProps> = ({ 
  isOpen, 
  onClose, 
  availableBalance 
}) => {
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
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[101] h-full w-full max-w-[480px] bg-white dark:bg-[#000C22] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-black/5 dark:border-white/5 bg-[#F9FAFB] dark:bg-[#011B3B]">
              <div>
                <h2 className="text-xl font-black text-[#000C22] dark:text-white tracking-tight">Initiate Transfer</h2>
                <p className="text-xs font-bold text-[#000C22]/40 dark:text-white/40 uppercase tracking-widest mt-1">Settlement Pipeline</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <X className="w-6 h-6 text-[#000C22]/40" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* Balance Card */}
              <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#2ACED1] to-[#034E78] text-white shadow-xl shadow-[#2ACED1]/20">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Available for payout</p>
                 <h3 className="text-4xl font-black tracking-tighter">${availableBalance.toLocaleString()}</h3>
              </div>

              {/* Transfer Form */}
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#000C22]/40 mb-3 block">Amount to Transfer</label>
                    <div className="relative">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-[#000C22]/30">$</span>
                       <input 
                         type="number" 
                         defaultValue={availableBalance}
                         className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-6 py-5 text-2xl font-black dark:text-white outline-none focus:ring-2 ring-[#2ACED1]/20" 
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#000C22]/40 block">Destination Bank</label>
                    <div className="p-5 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-between group hover:border-[#2ACED1]/30 transition-all cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-[#2ACED1]/10 text-[#2ACED1]">
                             <Landmark className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-sm font-black text-[#000C22] dark:text-white">Silicon Valley Bank</p>
                             <p className="text-xs text-[#000C22]/40 uppercase font-bold tracking-tighter">Checking •••• 9012</p>
                          </div>
                       </div>
                       <ChevronDown className="w-4 h-4 text-[#000C22]/20" />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#000C22]/40 block">Transfer Speed</label>
                    <div className="grid grid-cols-1 gap-3">
                       <div className="p-5 rounded-2xl border-2 border-[#2ACED1] bg-[#2ACED1]/5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="p-3 rounded-xl bg-[#2ACED1] text-white">
                                <Zap className="w-5 h-5" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-[#000C22] dark:text-white">Instant Transfer</p>
                                <p className="text-xs text-[#000C22]/40 font-bold">Within 30 minutes • 1.5% Fee</p>
                             </div>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-[#2ACED1]" />
                       </div>
                       <div className="p-5 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-between opacity-60">
                          <div className="flex items-center gap-4">
                             <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                                <Clock className="w-5 h-5" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-[#000C22] dark:text-white">Standard (1-2 Days)</p>
                                <p className="text-xs text-[#000C22]/40 font-bold">No additional fee</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Summary */}
              <div className="p-6 rounded-2xl bg-[#F9FAFB] dark:bg-white/5 space-y-4">
                 <div className="flex justify-between text-xs font-bold text-[#000C22]/40">
                    <span>Transfer Amount</span>
                    <span className="text-[#000C22] dark:text-white">${availableBalance.toLocaleString()}.00</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold text-[#000C22]/40">
                    <span>Instant Fee (1.5%)</span>
                    <span className="text-[#000C22] dark:text-white">-${(availableBalance * 0.015).toLocaleString()}</span>
                 </div>
                 <div className="h-px bg-black/5 dark:bg-white/5" />
                 <div className="flex justify-between text-sm font-black">
                    <span className="dark:text-white">Total Settlement</span>
                    <span className="text-[#2ACED1]">${(availableBalance * 0.985).toLocaleString()}</span>
                 </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-black/5 dark:border-white/5">
               <Button variant="action" className="w-full py-6 text-sm font-black uppercase tracking-widest shadow-xl shadow-[#2ACED1]/20">
                  Confirm Payout
               </Button>
               <div className="flex items-center justify-center gap-2 mt-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#000C22]/40">Authenticated & Secured</span>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
