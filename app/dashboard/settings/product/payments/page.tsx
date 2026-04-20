"use client";

import React, { useState } from "react";
import { 
  SettingsPanel, 
  SettingsField, 
  settingsControlClass,
  SettingsToggleRow 
} from "@/components/templates/SettingsLayout";
import { Button } from "@/components/atoms/Button";
import { CreditCard, Wallet, Smartphone, Landmark, Palette, Globe, Layout, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentsSettingsPage() {
  const [methods, setMethods] = useState({
    cards: true,
    applePay: true,
    googlePay: true,
    bankTransfer: false,
    crypto: false,
  });

  const toggle = (key: keyof typeof methods) => {
    setMethods(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* ─── Payment Methods ─── */}
      <SettingsPanel 
        title="Payment Methods" 
        description="Choose which payment methods are active for your checkout and invoices."
        action={
          <Button variant="action">Save configuration</Button>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
           <div className="p-4 rounded-2xl border border-black/5 bg-white/50 dark:bg-white/5 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <CreditCard className="h-4 w-4 text-[#2ACED1]" />
                 <span className="text-xs font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40">Cards & Traditional</span>
              </div>
              <SettingsToggleRow 
                 title="Credit & Debit Cards" 
                 description="Visa, Mastercard, Amex, Discover."
                 checked={methods.cards}
                 onToggle={() => toggle("cards")}
              />
              <SettingsToggleRow 
                 title="Bank Transfers" 
                 description="ACH, SEPA, and SWIFT transfers."
                 checked={methods.bankTransfer}
                 onToggle={() => toggle("bankTransfer")}
              />
           </div>

           <div className="p-4 rounded-2xl border border-black/5 bg-white/50 dark:bg-white/5 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Wallet className="h-4 w-4 text-orange-500" />
                 <span className="text-xs font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40">Digital Wallets</span>
              </div>
              <SettingsToggleRow 
                 title="Apple Pay" 
                 description="One-click checkout for iOS users."
                 checked={methods.applePay}
                 onToggle={() => toggle("applePay")}
              />
              <SettingsToggleRow 
                 title="Google Pay" 
                 description="Secure wallet payments for Android."
                 checked={methods.googlePay}
                 onToggle={() => toggle("googlePay")}
              />
           </div>
        </div>
      </SettingsPanel>

      {/* ─── Checkout Customization ─── */}
      <SettingsPanel title="Checkout Appearance" description="Control how Kopo Pay hosted payment surfaces look and feel.">
         <div className="grid gap-8 md:grid-cols-[1fr_0.8fr]">
            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <SettingsField label="Primary Brand Color">
                     <div className="flex gap-2">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-[#2ACED1] border border-black/5" />
                        <input type="text" defaultValue="#2ACED1" className={settingsControlClass} />
                     </div>
                  </SettingsField>
                  <SettingsField label="Accent Color">
                     <div className="flex gap-2">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-[#034E78] border border-black/5" />
                        <input type="text" defaultValue="#034E78" className={settingsControlClass} />
                     </div>
                  </SettingsField>
               </div>

               <SettingsField label="Checkout Header Label">
                  <input type="text" defaultValue="Secure Payment to Kopo Pay Inc." className={settingsControlClass} />
               </SettingsField>

               <div className="pt-4 border-t border-[#2ACED1]/10">
                  <SettingsToggleRow 
                    title="Allow Promotion Codes" 
                    description="Enable customers to apply discounts at checkout."
                    checked={true}
                    onToggle={() => {}}
                  />
               </div>
            </div>

            {/* Preview Card */}
            <div className="p-6 rounded-3xl bg-black/[0.02] dark:bg-black/20 border border-black/5 border-dashed relative">
               <p className="text-[10px] font-bold uppercase text-[#000C22]/30 dark:text-white/20 mb-4 flex items-center gap-1">
                  <Palette className="h-3 w-3" /> Live Preview
               </p>
               <div className="w-full aspect-[4/5] bg-white dark:bg-[#011B3B] rounded-2xl shadow-xl border border-[#2ACED1]/20 overflow-hidden flex flex-col scale-90 origin-top">
                  <div className="p-4 bg-[#2ACED1]/10 border-b border-[#2ACED1]/10 flex items-center gap-2">
                     <div className="h-6 w-6 rounded bg-[#2ACED1]" />
                     <div className="h-2 w-24 bg-[#000C22]/10 dark:bg-white/10 rounded" />
                  </div>
                  <div className="p-6 space-y-4">
                     <div className="h-4 w-3/4 bg-[#000C22]/5 dark:bg-white/5 rounded" />
                     <div className="h-10 w-full bg-[#000C22]/5 dark:bg-white/5 rounded-xl border border-[#2ACED1]/20" />
                     <div className="h-10 w-full bg-[#034E78] rounded-xl flex items-center justify-center">
                        <div className="h-2 w-20 bg-white/30 rounded" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </SettingsPanel>

      {/* ─── Currency & Settlement ─── */}
      <SettingsPanel title="Currency & Multi-region" description="Manage default currencies and automated FX conversion.">
         <div className="grid gap-6 md:grid-cols-2">
            <SettingsField label="Settlement Currency" hint="Fixed to your primary bank account currency.">
               <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                  <input type="text" defaultValue="USD - US Dollar" className={`${settingsControlClass} pl-10`} disabled />
               </div>
            </SettingsField>

            <SettingsField label="Dynamic Exchange Rates" hint="Automatically convert foreign currencies at mid-market rates.">
               <select className={settingsControlClass}>
                  <option>Enabled (Recommended)</option>
                  <option>Fixed (Manual Adjustment)</option>
               </select>
            </SettingsField>
         </div>
      </SettingsPanel>
    </div>
  );
}
