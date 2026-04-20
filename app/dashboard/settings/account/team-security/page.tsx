"use client";

import React, { useState } from "react";
import { 
  SettingsPanel, 
  SettingsField, 
  settingsControlClass,
  SettingsToggleRow 
} from "@/components/templates/SettingsLayout";
import { Button } from "@/components/atoms/Button";
import { Users, Shield, Lock, ShieldCheck, Mail, MoreVertical, Plus, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const initialMembers = [
  { name: "M Safi", email: "m.safi@example.com", role: "Administrator", status: "Active", avatar: "MS" },
  { name: "Alex Rivers", email: "alex@kopopay.com", role: "Developer", status: "Active", avatar: "AR" },
  { name: "Sarah Smith", email: "sarah@kopopay.com", role: "Finance", status: "Invitation Pending", avatar: "SS" },
];

export default function TeamSecuritySettingsPage() {
  const [require2FA, setRequire2FA] = useState(true);
  const [ipRestriction, setIpRestriction] = useState(false);

  return (
    <div className="space-y-6">
      {/* ─── Team Management ─── */}
      <SettingsPanel 
        title="Team Members" 
        description="Invite and manage team members and their granular permissions."
        action={
          <Button variant="action" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Invite Member
          </Button>
        }
      >
        <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/5">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-black/5 dark:bg-white/5 border-b border-[#2ACED1]/10">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Member</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40">Role</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-[#D8F4F7]/40 text-right">Action</th>
                 </tr>
              </thead>
              <tbody>
                 {initialMembers.map((member, i) => (
                    <tr key={i} className="border-b border-[#2ACED1]/10 last:border-0 hover:bg-[#2ACED1]/5 transition-colors">
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 rounded-full bg-[#2ACED1]/20 flex items-center justify-center text-[10px] font-bold text-[#008E96]">
                                {member.avatar}
                             </div>
                             <div>
                                <p className="text-sm font-bold dark:text-white">{member.name}</p>
                                <p className="text-xs text-[#000C22]/40 dark:text-white/40">{member.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                             member.role === "Administrator" ? "bg-[#2ACED1]/10 text-[#008E96]" : "bg-black/5 dark:bg-white/5 text-[#000C22]/60 dark:text-white/60"
                          }`}>
                             {member.role}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                             <MoreVertical className="h-4 w-4 text-[#000C22]/40 dark:text-white/40" />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </SettingsPanel>

      {/* ─── Security Policies ─── */}
      <SettingsPanel title="Security Policies" description="Enforce security standards across all team members.">
         <div className="space-y-4">
            <SettingsToggleRow 
               title="Require 2FA for all members" 
               description="All team members must enable two-factor authentication to access this account."
               checked={require2FA}
               onToggle={() => setRequire2FA(!require2FA)}
            />

            <SettingsToggleRow 
               title="IP Access Restriction" 
               description="Restrict dashboard access to specific IP ranges (VPN or Office IP)."
               checked={ipRestriction}
               onToggle={() => setIpRestriction(!ipRestriction)}
            />

            {ipRestriction && (
               <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 rounded-xl border border-[#2ACED1]/20 bg-[#2ACED1]/5"
               >
                  <SettingsField label="Allowed IP Ranges (CIDR)" hint="Example: 192.168.1.1/32">
                     <textarea className={`${settingsControlClass} min-h-[80px] font-mono text-xs`} placeholder="Enter IPs separated by commas..." />
                  </SettingsField>
               </motion.div>
            )}
         </div>
      </SettingsPanel>

      {/* ─── Roles & Permissions Hub ─── */}
      <SettingsPanel title="Roles & Permissions" description="Define custom access levels for different team functions.">
         <div className="grid gap-4">
            {[
               { id: "admin", name: "Administrator", desc: "Full access to all accounts and settings." },
               { id: "dev", name: "Developer", desc: "API access, webhooks, and technical configurations." },
               { id: "finance", name: "Finance", desc: "Payouts, reports, and billing data access." },
               { id: "support", name: "Support Specialist", desc: "Refunds and dispute management only." },
            ].map((role) => (
               <div key={role.id} className="p-4 rounded-2xl border border-black/5 bg-white/50 dark:bg-white/5 dark:border-white/5 flex items-center justify-between group hover:border-[#2ACED1]/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-[#000C22]/30 dark:text-white/30 group-hover:text-[#2ACED1] transition-colors" />
                     </div>
                     <div>
                        <p className="text-sm font-bold dark:text-white">{role.name}</p>
                        <p className="text-xs text-[#000C22]/50 dark:text-white/40">{role.desc}</p>
                     </div>
                  </div>
                  <Button variant="secondary" className="text-xs px-4 py-2">View Permissions</Button>
               </div>
            ))}
         </div>
      </SettingsPanel>
    </div>
  );
}
