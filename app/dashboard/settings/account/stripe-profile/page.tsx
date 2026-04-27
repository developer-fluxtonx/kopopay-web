"use client";

import { Mail, Sparkles } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  SettingsField,
  SettingsPanel,
  settingsControlClass,
} from "@/components/templates/SettingsLayout";

export default function StripeProfileSettingsPage() {
  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Profile Overview ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10">
         {/* Identity Card */}
         <div className="space-y-6">
            <h3 className="text-xl font-black text-[#000C22] dark:text-white tracking-tight">Public Identity</h3>
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/20 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Globe className="w-40 h-40 text-[#2ACED1]" />
               </div>
               
               <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                     <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl shadow-[#2ACED1]/10 text-2xl font-black text-[#000C22]">
                        K
                     </div>
                     <span className="px-3 py-1 rounded-full bg-[#2ACED1]/20 text-[#2ACED1] text-[8px] font-black uppercase tracking-widest border border-[#2ACED1]/30">Verified Entity</span>
                  </div>

                  <div>
                     <h4 className="text-2xl font-black text-white tracking-tight">Kopo Pay Inc.</h4>
                     <p className="text-xs font-medium text-[#D8F4F7]/40 mt-1">Software & FinTech Infrastructure</p>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                     <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-[#2ACED1]" />
                        <span className="text-xs font-bold text-[#D8F4F7]/60 underline">kopopay.com</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#2ACED1]" />
                        <span className="text-xs font-bold text-[#D8F4F7]/60">support@kopopay.com</span>
                     </div>
                  </div>

                  <div className="flex gap-2">
                     <div className="h-2 flex-1 rounded-full bg-[#2ACED1]" />
                     <div className="h-2 flex-1 rounded-full bg-white/20" />
                     <div className="h-2 flex-1 rounded-full bg-white/20" />
                  </div>
               </div>
            </div>
         </div>

         {/* Settings Form */}
         <div className="space-y-6">
            <h3 className="text-xl font-black text-[#000C22] dark:text-white tracking-tight">Public Profile Settings</h3>
            <div className="p-10 rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 space-y-8 shadow-sm">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                     <label className="text-xs font-black text-[#000C22] dark:text-white mb-2 block">Display Name</label>
                     <input defaultValue="Kopo Pay" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none" />
                  </div>
                  <div>
                     <label className="text-xs font-black text-[#000C22] dark:text-white mb-2 block">Public Website</label>
                     <input defaultValue="https://kopopay.com" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none" />
                  </div>
                  <div className="md:col-span-2">
                     <label className="text-xs font-black text-[#000C22] dark:text-white mb-2 block">Public Description</label>
                     <textarea defaultValue="Kopo Pay helps merchants move money with a clean, fast payments stack." className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none min-h-[100px]" />
                  </div>
                  <div>
                     <label className="text-xs font-black text-[#000C22] dark:text-white mb-2 block">Support Phone</label>
                     <input defaultValue="+1 (555) 123-4567" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none" />
                  </div>
                  <div>
                     <label className="text-xs font-black text-[#000C22] dark:text-white mb-2 block">Industry</label>
                     <select className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none">
                        <option>Software</option>
                        <option>E-commerce</option>
                        <option>Services</option>
                     </select>
                  </div>
               </div>
               
               <div className="pt-8 border-t border-black/5 dark:border-white/5">
                  <Button variant="action" className="px-10 py-4 text-xs font-black uppercase tracking-widest">Update Public Profile</Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

import { Globe } from "lucide-react";
