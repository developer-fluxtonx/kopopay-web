"use client";

import React, { useState } from "react";
import { 
  SettingsPanel, 
  SettingsField, 
  settingsControlClass,
  SettingsToggleRow 
} from "@/components/templates/SettingsLayout";
import { Button } from "@/components/atoms/Button";
import { Building2, Globe, MapPin, CreditCard, Landmark, CheckCircle2 } from "lucide-react";

export default function BusinessSettingsPage() {
  const [automaticPayouts, setAutomaticPayouts] = useState(true);

  return (
    <div className="space-y-6">
      {/* ─── Business Profile ─── */}
      <SettingsPanel 
        title="Business Profile" 
        description="Publicly visible information and identity verification for your legal entity."
        action={
          <Button variant="action">Update profile</Button>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <SettingsField label="Business Name" hint="As shown on customer receipts and bank statements.">
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#000C22]/30" />
              <input 
                type="text" 
                defaultValue="Kopo Pay Inc." 
                className={`${settingsControlClass} pl-10`} 
              />
            </div>
          </SettingsField>

          <SettingsField label="Support Website" hint="Used for customer disputes and chargebacks.">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#000C22]/30" />
              <input 
                type="url" 
                defaultValue="https://kopopay.com/support" 
                className={`${settingsControlClass} pl-10`} 
              />
            </div>
          </SettingsField>

          <div className="md:col-span-2">
             <SettingsField label="Registered Address">
                <div className="relative">
                   <MapPin className="absolute left-3 top-4 h-4 w-4 text-[#000C22]/30" />
                   <textarea 
                      className={`${settingsControlClass} pl-10 min-h-[100px] py-3`}
                      defaultValue="123 FinTech Ave, Suite 500&#10;San Francisco, CA 94105&#10;United States"
                   />
                </div>
             </SettingsField>
          </div>
        </div>
      </SettingsPanel>

      {/* ─── Payout Settings ─── */}
      <SettingsPanel title="Payout Configuration" description="Manage how and when your earnings are delivered to your bank account.">
         <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#2ACED1]/5 border border-[#2ACED1]/20 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white dark:bg-[#000C22] flex items-center justify-center border border-[#2ACED1]/10">
                     <Landmark className="h-5 w-5 text-[#2ACED1]" />
                  </div>
                  <div>
                     <p className="text-sm font-bold dark:text-white">Silicon Valley Bank (SVB)</p>
                     <p className="text-xs text-[#000C22]/50 dark:text-white/40">Checking account ending in •••• 4829</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                     <CheckCircle2 className="h-3 w-3" /> Verified
                  </span>
                  <Button variant="secondary" className="text-xs px-3 py-1.5 ml-4">Edit</Button>
               </div>
            </div>

            <SettingsToggleRow 
               title="Automatic Payouts" 
               description="Your balance will be settled to your bank account on a recurring schedule."
               checked={automaticPayouts}
               onToggle={() => setAutomaticPayouts(!automaticPayouts)}
            />

            <SettingsField label="Payout Schedule">
               <select className={settingsControlClass} disabled={!automaticPayouts}>
                  <option>Daily (Rolling 2-day basis)</option>
                  <option>Weekly (Every Monday)</option>
                  <option>Monthly (1st of each month)</option>
                  <option>Manual (Self-service only)</option>
               </select>
            </SettingsField>
         </div>
      </SettingsPanel>

      {/* ─── Branding & Statements ─── */}
      <SettingsPanel title="Statement Branding" description="Customize how charges appear on your customers' credit card statements.">
         <div className="grid gap-6 md:grid-cols-2">
            <SettingsField label="Statement Descriptor" hint="Max 22 characters. Only letters, numbers, and spaces.">
               <input 
                  type="text" 
                  defaultValue="KOPOPAY* SOFTWARE" 
                  maxLength={22}
                  className={settingsControlClass} 
               />
            </SettingsField>
            
            <SettingsField label="Shortened Descriptor" hint="For small screens or abbreviated logs.">
               <input 
                  type="text" 
                  defaultValue="KOPOPAY" 
                  maxLength={10}
                  className={settingsControlClass} 
               />
            </SettingsField>
         </div>
      </SettingsPanel>
    </div>
  );
}
