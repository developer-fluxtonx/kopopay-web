"use client";

import React, { useState } from "react";
import { 
  SettingsPanel, 
  SettingsField, 
  settingsControlClass,
  SettingsToggleRow 
} from "@/components/templates/SettingsLayout";
import { Button } from "@/components/atoms/Button";
import { FileText, CreditCard, RefreshCw, Clock, User, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export default function BillingSettingsPage() {
  const [automaticCollection, setAutomaticCollection] = useState(true);
  const [allowPortal, setAllowPortal] = useState(true);

  return (
    <div className="space-y-6">
      {/* ─── Subscription Defaults ─── */}
      <SettingsPanel 
        title="Subscription Defaults" 
        description="Global settings for new subscriptions created via API or Dashboard."
        action={
          <Button variant="action">Save defaults</Button>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <SettingsField label="Default Trial Period (Days)">
            <input type="number" defaultValue={14} className={settingsControlClass} />
          </SettingsField>

          <SettingsField label="Grace Period for Unpaid Invoices" hint="Days before subscription auto-cancels.">
            <select className={settingsControlClass}>
              <option>7 days</option>
              <option>14 days</option>
              <option>30 days</option>
              <option>Immediate cancellation</option>
            </select>
          </SettingsField>

          <div className="md:col-span-2">
             <SettingsToggleRow 
                title="Automatic Charge Collection" 
                description="Automatically attempt to charge the customer's default payment source upon invoice generation."
                checked={automaticCollection}
                onToggle={() => setAutomaticCollection(!automaticCollection)}
             />
          </div>
        </div>
      </SettingsPanel>

      {/* ─── Invoicing ─── */}
      <SettingsPanel title="Invoice & Receipt Customization" description="Configure the document lifecycle and numbering sequence.">
         <div className="grid gap-6 md:grid-cols-2">
            <SettingsField label="Invoice Prefix" hint="Used globally (e.g., INV-)">
               <input type="text" defaultValue="INV-" className={settingsControlClass} />
            </SettingsField>
            
            <SettingsField label="Next Invoice Number">
               <input type="number" defaultValue={2105} className={settingsControlClass} />
            </SettingsField>
            
            <div className="md:col-span-2 space-y-4">
               <SettingsToggleRow 
                  title="PDF Attachment in Emails" 
                  description="Include the full PDF invoice in finalized email notifications."
                  checked={true}
                  onToggle={() => {}}
               />
               <SettingsToggleRow 
                  title="Tax ID Collection" 
                  description="Require VAT/Tax IDs from international business customers."
                  checked={false}
                  onToggle={() => {}}
               />
            </div>
         </div>
      </SettingsPanel>

      {/* ─── Customer Portal ─── */}
      <SettingsPanel title="Customer Portal" description="Control what customers can do when they log into their self-service billing area.">
         <div className="space-y-4">
            <SettingsToggleRow 
               title="Enable Hosted Customer Portal" 
               description="A dedicated link for customers to manage their own payments and info."
               checked={allowPortal}
               onToggle={() => setAllowPortal(!allowPortal)}
            />

            {allowPortal && (
               <div className="p-5 rounded-2xl border border-[#2ACED1]/20 bg-[#2ACED1]/5 space-y-6">
                  <div className="flex items-center justify-between">
                     <p className="text-sm font-bold dark:text-white">Portal URL</p>
                     <p className="text-xs text-[#2ACED1] font-mono select-all">billing.kopopay.com/portal/kopo_inc</p>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                     {[
                        "Update payment methods",
                        "Cancel subscriptions",
                        "Switch plans",
                        "View billing history",
                     ].map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                           <div className="h-4 w-4 rounded bg-[#2ACED1] flex items-center justify-center">
                              <ShieldCheck className="h-3 w-3 text-white" />
                           </div>
                           <span className="text-xs font-medium dark:text-white/70">{feature}</span>
                        </div>
                     ))}
                  </div>
                  <Button variant="secondary" className="w-full text-xs">Configure Brand Elements</Button>
               </div>
            )}
         </div>
      </SettingsPanel>
    </div>
  );
}
