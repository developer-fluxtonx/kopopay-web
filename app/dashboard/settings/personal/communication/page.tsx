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
  const [prefs, setPrefs] = useState({
    marketing: false,
    security: true,
    activity: true,
    payouts: true,
    sms: false,
    webhooks: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* ─── Email Notifications ─── */}
      <SettingsPanel 
        title="Email Notifications" 
        description="Choose which types of emails you would like to receive from Kopo Pay."
        action={
          <Button variant="action">Save preferences</Button>
        }
      >
        <div className="space-y-3">
          <SettingsToggleRow 
            title="General Activity" 
            description="Receive summaries of your account activity, reports, and team updates."
            checked={prefs.activity}
            onToggle={() => toggle("activity")}
          />
          <SettingsToggleRow 
            title="Payout & Balance Alerts" 
            description="Get notified as soon as a payout is initiated or your balance reaches a threshold."
            checked={prefs.payouts}
            onToggle={() => toggle("payouts")}
          />
          <SettingsToggleRow 
            title="Security & Technical" 
            description="Critical alerts regarding account security, legal updates, and system health."
            checked={prefs.security}
            onToggle={() => toggle("security")}
            disabled={true} // Mandated security alerts
          />
          <SettingsToggleRow 
            title="Product & Marketing" 
            description="Updates on new features, tips, and partner offers (roughly once per week)."
            checked={prefs.marketing}
            onToggle={() => toggle("marketing")}
          />
        </div>
      </SettingsPanel>

      {/* ─── Channel Preferences ─── */}
      <SettingsPanel 
        title="Additional Channels" 
        description="Configure alternative ways for Kopo Pay to reach you during critical events."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-5 rounded-2xl border border-black/5 bg-white/50 dark:bg-white/5 dark:border-white/5">
             <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                   <Smartphone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                   <p className="text-sm font-semibold dark:text-white">SMS Notifications</p>
                   <p className="text-xs text-[#000C22]/50 dark:text-white/40">Real-time mobile alerts</p>
                </div>
             </div>
             <SettingsToggleRow 
                title="Enable SMS" 
                description="Use for high-priority fraud alerts only."
                checked={prefs.sms}
                onToggle={() => toggle("sms")}
             />
          </div>

          <div className="p-5 rounded-2xl border border-black/5 bg-white/50 dark:bg-white/5 dark:border-white/5">
             <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                   <Bell className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                   <p className="text-sm font-semibold dark:text-white">Push Notifications</p>
                   <p className="text-xs text-[#000C22]/50 dark:text-white/40">Browser & mobile app</p>
                </div>
             </div>
             <Button variant="secondary" className="w-full text-xs">Configure in App</Button>
          </div>
        </div>
      </SettingsPanel>

      {/* ─── Digest Settings ─── */}
      <SettingsPanel title="Report Digest" description="Frequency settings for your financial and activity summaries.">
        <div className="grid gap-6 md:grid-cols-2">
          <SettingsField label="Financial Digest Frequency">
            <select className={settingsControlClass}>
              <option>Daily at 8:00 AM</option>
              <option>Weekly (Mondays)</option>
              <option>Monthly</option>
              <option>Disabled</option>
            </select>
          </SettingsField>
          
          <SettingsField label="Digest Format">
            <select className={settingsControlClass}>
              <option>Rich HTML (Recommended)</option>
              <option>Plain Text</option>
              <option>JSON Link (API)</option>
            </select>
          </SettingsField>
        </div>
      </SettingsPanel>
    </div>
  );
}
