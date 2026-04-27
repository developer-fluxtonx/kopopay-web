"use client";

import React, { useState } from "react";
import { 
  SettingsPanel, 
  SettingsField, 
  settingsControlClass,
  SettingsToggleRow 
} from "@/components/templates/SettingsLayout";
import { Button } from "@/components/atoms/Button";
import { Building2, Globe, MapPin, CreditCard, Landmark, CheckCircle2, ShieldCheck, Mail } from "lucide-react";

export default function BusinessSettingsPage() {
  const [automaticPayouts, setAutomaticPayouts] = useState(true);

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Verification Status Banner ─── */}
      <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#2ACED1]/15 to-[#034E78]/5 border border-[#2ACED1]/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#000C22] flex items-center justify-center shadow-lg shadow-[#2ACED1]/5">
               <ShieldCheck className="w-7 h-7 text-[#2ACED1]" />
            </div>
            <div>
               <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-lg font-bold text-[#000C22] dark:text-white tracking-tight">Entity Verified</h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[7px] font-bold uppercase tracking-widest">Verified</span>
               </div>
               <p className="text-xs font-medium text-[#000C22]/40 dark:text-[#D8F4F7]/40">Your legal entity is fully verified for global payouts and high-volume processing.</p>
            </div>
         </div>
         <Button variant="secondary" className="text-[10px] px-6 py-2.5 font-bold">View Compliance Docs</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Business Profile */}
        <div className="space-y-6">
           <h3 className="text-lg font-bold text-[#000C22] dark:text-white tracking-tight">Legal Identity</h3>
           <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 space-y-6 shadow-sm">
              <div className="space-y-5">
                <div>
                   <label className="text-xs font-semibold text-[#000C22] dark:text-white mb-2 block">Legal Business Name</label>
                   <input defaultValue="Kopo Pay International Ltd." className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-2.5 text-xs font-bold dark:text-white outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="text-xs font-semibold text-[#000C22] dark:text-white mb-2 block">Entity Type</label>
                      <select className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-2.5 text-xs font-bold dark:text-white outline-none">
                         <option>Private Corporation</option>
                         <option>Individual / Sole Trader</option>
                         <option>Non-profit</option>
                      </select>
                   </div>
                   <div>
                      <label className="text-xs font-semibold text-[#000C22] dark:text-white mb-2 block">Country</label>
                      <input defaultValue="United States" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-2.5 text-xs font-bold dark:text-white outline-none" disabled />
                   </div>
                </div>
                <div>
                   <label className="text-xs font-semibold text-[#000C22] dark:text-white mb-2 block">Tax ID / EIN</label>
                   <div className="relative">
                      <input defaultValue="••-••••942" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-2.5 text-xs font-bold dark:text-white outline-none" />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-[#2ACED1] uppercase">Change</button>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Customer Support Hub */}
        <div className="space-y-6">
           <h3 className="text-lg font-bold text-[#000C22] dark:text-white tracking-tight">Support Hub</h3>
           <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 space-y-6 shadow-sm">
              <div className="space-y-5">
                <div>
                   <label className="text-xs font-semibold text-[#000C22] dark:text-white mb-2 block">Support Email</label>
                   <input defaultValue="support@kopopay.com" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-2.5 text-xs font-bold dark:text-white outline-none" />
                </div>
                <div>
                   <label className="text-xs font-semibold text-[#000C22] dark:text-white mb-2 block">Support Website</label>
                   <input defaultValue="https://help.kopopay.com" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-2.5 text-xs font-bold dark:text-white outline-none" />
                </div>
                <div>
                   <label className="text-xs font-semibold text-[#000C22] dark:text-white mb-2 block">Support Phone</label>
                   <input defaultValue="+1 (888) 293-4921" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-2.5 text-xs font-bold dark:text-white outline-none" />
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* ─── Public Branding ─── */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-[#000C22] dark:text-white tracking-tight">Statement Branding</h3>
        <div className="bg-white dark:bg-[#011B3B] rounded-[2rem] border border-black/5 dark:border-white/5 p-8 grid grid-cols-1 md:grid-cols-2 gap-10 shadow-sm">
           <div className="space-y-6">
              <div>
                 <label className="text-xs font-semibold text-[#000C22] dark:text-white mb-2 block">Statement Descriptor</label>
                 <input defaultValue="KOPOPAY* SOFTWARE" maxLength={22} className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-2.5 text-xs font-mono font-bold dark:text-white outline-none focus:ring-2 ring-[#2ACED1]/20" />
                 <p className="text-[9px] text-[#000C22]/30 dark:text-white/30 mt-2 font-bold uppercase tracking-widest">As it appears on bank logs (Max 22 chars)</p>
              </div>
              <div>
                 <label className="text-xs font-semibold text-[#000C22] dark:text-white mb-2 block">Support Address</label>
                 <textarea defaultValue="123 FinTech Ave, Suite 500, San Francisco, CA 94105" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-2.5 text-xs font-bold dark:text-white outline-none min-h-[100px]" />
              </div>
           </div>
           <div className="p-6 rounded-3xl bg-black/[0.02] dark:bg-black/20 border border-black/5 border-dashed">
              <p className="text-[9px] font-bold uppercase text-[#000C22]/30 mb-5 tracking-widest text-center">Banking Log Preview</p>
              <div className="bg-white dark:bg-[#000C22] rounded-2xl p-5 shadow-xl border border-black/5">
                 <div className="flex items-center justify-between mb-4 border-b border-black/5 pb-3">
                    <span className="text-[9px] font-bold text-[#000C22]/30 uppercase">APR 27, 2026</span>
                    <span className="text-[9px] font-bold text-[#2ACED1] uppercase">PENDING</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-mono font-bold text-[#000C22] dark:text-white tracking-widest">KOPOPAY* SOFTWARE</p>
                       <p className="text-[9px] text-[#000C22]/30 mt-0.5">San Francisco, CA</p>
                    </div>
                    <p className="text-xs font-bold dark:text-white">$450.00</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
