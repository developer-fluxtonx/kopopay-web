"use client";

import React, { useState } from "react";
import { 
  SettingsPanel, 
  SettingsField, 
  settingsControlClass,
  SettingsToggleRow 
} from "@/components/templates/SettingsLayout";
import { Button } from "@/components/atoms/Button";
import { Mail, Smartphone, Bell, Globe, ShieldCheck } from "lucide-react";

export default function CommunicationPreferencesPage() {
  const [activeTab, setActiveTab] = useState<"general" | "team">("general");

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2 tracking-tight">Notification Settings</h1>
          <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50">Control how and when you receive updates from your ecosystem.</p>
        </div>
        <div className="flex p-1 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
           <button 
             onClick={() => setActiveTab("general")}
             className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === "general" ? "bg-[#2ACED1] text-white shadow-lg" : "text-[#000C22]/40"}`}
           >
             Personal
           </button>
           <button 
             onClick={() => setActiveTab("team")}
             className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === "team" ? "bg-[#2ACED1] text-white shadow-lg" : "text-[#000C22]/40"}`}
           >
             Team
           </button>
        </div>
      </div>

      {/* ─── Preference Matrix ─── */}
      <div className="bg-white dark:bg-[#011B3B] rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                <th className="px-10 py-5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40">Event Type</th>
                <th className="px-6 py-5 text-center text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40">Email</th>
                <th className="px-6 py-5 text-center text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40">Push</th>
                <th className="px-6 py-5 text-center text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40">SMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {[
                { category: "Payments & Financials", items: [
                  { label: "Successful Payments", desc: "Get notified for every new transaction." },
                  { label: "Refunds & Disputes", desc: "Critical alerts for chargebacks and returns." },
                  { label: "Payout Completions", desc: "Alerts when funds reach your bank account." }
                ]},
                { category: "System & Security", items: [
                  { label: "New Login detected", desc: "Security alerts for unknown device access." },
                  { label: "API Key Changes", desc: "Alerts when secret keys are created or rotated." },
                  { label: "Technical Failures", desc: "Webhook errors or processing interruptions." }
                ]}
              ].map((group, gi) => (
                <React.Fragment key={gi}>
                  <tr className="bg-black/[0.01] dark:bg-white/[0.01]">
                    <td colSpan={4} className="px-10 py-3.5 text-[9px] font-bold text-[#2ACED1] uppercase tracking-[0.2em]">{group.category}</td>
                  </tr>
                  {group.items.map((item, ii) => (
                    <tr key={ii} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-all group">
                      <td className="px-10 py-6">
                        <p className="text-sm font-bold text-[#000C22] dark:text-white">{item.label}</p>
                        <p className="text-xs font-medium text-[#000C22]/40 dark:text-white/40">{item.desc}</p>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <Checkbox />
                      </td>
                      <td className="px-6 py-6 text-center">
                        <Checkbox />
                      </td>
                      <td className="px-6 py-6 text-center">
                        <Checkbox checked={false} />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Communication Channels ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#000C22] dark:text-white tracking-tight">Delivery Channels</h3>
            <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 space-y-6 shadow-sm">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                        <Mail className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-[#000C22] dark:text-white">Primary Email</p>
                        <p className="text-xs text-[#000C22]/40 font-medium">m.safi@example.com</p>
                     </div>
                  </div>
                  <Button variant="secondary" className="text-[10px] px-4 py-2 font-bold">Change</Button>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 rounded-2xl bg-[#2ACED1]/10 text-[#2ACED1]">
                        <Smartphone className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-[#000C22] dark:text-white">Mobile Number</p>
                        <p className="text-xs text-[#000C22]/40 font-medium">+44 •••• •••• 92</p>
                     </div>
                  </div>
                  <Button variant="secondary" className="text-[10px] px-4 py-2 font-bold">Update</Button>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#000C22] dark:text-white tracking-tight">Quiet Hours</h3>
            <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#000C22] dark:text-white">Do Not Disturb</p>
                    <p className="text-xs font-medium text-[#000C22]/40">Pause all non-critical notifications.</p>
                  </div>
                  <div className="w-10 h-5 bg-black/10 dark:bg-white/10 rounded-full relative">
                     <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-black/5 dark:border-white/5">
                     <p className="text-[9px] font-bold text-[#000C22]/30 uppercase tracking-widest mb-1">From</p>
                     <p className="text-sm font-bold dark:text-white">22:00 PM</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-black/5 dark:border-white/5">
                     <p className="text-[9px] font-bold text-[#000C22]/30 uppercase tracking-widest mb-1">To</p>
                     <p className="text-sm font-bold dark:text-white">08:00 AM</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

const Checkbox = ({ checked = true }: { checked?: boolean }) => (
  <button className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
    checked ? "bg-[#2ACED1] border-[#2ACED1] text-white" : "border-black/10 dark:border-white/10"
  }`}>
    {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
  </button>
);

import { CheckCircle2 } from "lucide-react";
