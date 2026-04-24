"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  SettingsPanel, 
  SettingsField, 
  settingsControlClass,
  SettingsToggleRow 
} from "@/components/templates/SettingsLayout";
import { Button } from "@/components/atoms/Button";
import { User, Mail, Shield, Smartphone, Key } from "lucide-react";

export default function PersonalDetailsPage() {
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-6">
      {/* ─── Profile Section ─── */}
      <SettingsPanel 
        title="Profile Information" 
        description="This information will be displayed on your invoices and public profile."
        action={
          <Button variant="action">Save changes</Button>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <SettingsField label="Full Name" hint="As it appears on your government ID.">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#000C22]/30" />
              <input 
                type="text" 
                defaultValue="M Safi" 
                className={`${settingsControlClass} pl-10`} 
              />
            </div>
          </SettingsField>

          <SettingsField label="Email Address" hint="For notifications and account recovery.">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#000C22]/30" />
              <input 
                type="email" 
                defaultValue="m.safi@example.com" 
                className={`${settingsControlClass} pl-10`} 
              />
            </div>
          </SettingsField>

          <SettingsField label="Phone Number" hint="Used for security verification.">
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#000C22]/30" />
              <input 
                type="tel" 
                defaultValue="+1 (555) 000-0000" 
                className={`${settingsControlClass} pl-10`} 
              />
            </div>
          </SettingsField>

          <SettingsField label="Timezone">
            <select className={settingsControlClass}>
              <option>UTC-07:00 Pacific Time</option>
              <option>UTC+00:00 GMT</option>
              <option>UTC+05:30 IST</option>
            </select>
          </SettingsField>
        </div>
      </SettingsPanel>

      {/* ─── Security Section ─── */}
      <SettingsPanel 
        title="Security & Access" 
        description="Manage your password and secondary authentication methods."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl border border-black/5 bg-white/50 dark:bg-white/5 dark:border-white/5">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Key className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm font-semibold dark:text-white">Account Password</p>
                <p className="text-xs text-[#000C22]/50 dark:text-white/40">Last changed 3 months ago</p>
              </div>
            </div>
            <Link
              href="/dashboard/settings/personal/password"
              className="inline-flex items-center justify-center rounded-xl bg-[#D8F4F7] px-4 py-2 text-xs font-medium text-[#000C22] transition-colors hover:bg-[#DCFCFF]"
            >
              Change password
            </Link>
          </div>

          <SettingsToggleRow 
            title="Two-factor authentication (2FA)" 
            description="Add an extra layer of security to your account."
            checked={twoFactor}
            onToggle={() => setTwoFactor(!twoFactor)}
          />

          <div className="p-4 rounded-2xl border border-dashed border-[#2ACED1]/30 bg-[#2ACED1]/5">
            <p className="text-xs font-bold text-[#008E96] uppercase tracking-widest mb-2 flex items-center gap-2">
              <Shield className="h-3 w-3" /> Recommended
            </p>
            <p className="text-xs text-[#000C22]/60 dark:text-[#D8F4F7]/60 leading-relaxed">
              We recommend using a hardware security key (U2F) or an authenticator app for the highest level of security.
            </p>
          </div>
        </div>
      </SettingsPanel>

      {/* ─── Danger Zone ─── */}
      <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
        <h3 className="text-lg font-bold text-red-600 mb-1 font-heading">Delete Account</h3>
        <p className="text-sm text-red-600/70 mb-4">
          Permanently delete your personal profile and all associated data. This action is irreversible.
        </p>
        <button className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors">
          Delete my account
        </button>
      </div>
    </div>
  );
}
