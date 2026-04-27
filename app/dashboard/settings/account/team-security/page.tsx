"use client";

import React, { useState } from "react";
import { 
  SettingsPanel, 
  SettingsField, 
  settingsControlClass,
  SettingsToggleRow 
} from "@/components/templates/SettingsLayout";
import { Button } from "@/components/atoms/Button";
import { 
  Users, 
  Shield, 
  Lock, 
  ShieldCheck, 
  Mail, 
  MoreVertical, 
  Plus, 
  UserPlus,
  ArrowRight,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialMembers = [
  { name: "M Safi", email: "m.safi@example.com", role: "Administrator", status: "Active", avatar: "MS" },
  { name: "Alex Rivers", email: "alex@kopopay.com", role: "Developer", status: "Active", avatar: "AR" },
  { name: "Sarah Smith", email: "sarah@kopopay.com", role: "Finance", status: "Invitation Pending", avatar: "SS" },
];

export default function TeamSecuritySettingsPage() {
  const [require2FA, setRequire2FA] = useState(true);
  const [ipRestriction, setIpRestriction] = useState(false);

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Team Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#000C22] dark:text-white mb-2 tracking-tight">Team & Access</h1>
          <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage human resources, granular roles, and security policies.</p>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#2ACED1] text-white text-sm font-black shadow-lg shadow-[#2ACED1]/20 hover:scale-[1.02] transition-all">
          <UserPlus className="w-5 h-5" /> Invite Member
        </button>
      </div>

      {/* ─── Active Members ─── */}
      <div className="bg-white dark:bg-[#011B3B] rounded-[2.5rem] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex items-center justify-between">
          <h3 className="text-sm font-black text-[#000C22] dark:text-white uppercase tracking-widest">Active Members</h3>
          <span className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/40 uppercase tracking-widest">{initialMembers.length} Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/30">
                <th className="px-8 py-4">User</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {initialMembers.map((member, i) => (
                <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white font-black text-xs">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#000C22] dark:text-white">{member.name}</p>
                        <p className="text-xs font-bold text-[#000C22]/40 dark:text-white/40">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                      member.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className={`w-3.5 h-3.5 ${member.role === "Administrator" ? "text-[#2ACED1]" : "text-[#000C22]/20"}`} />
                      <span className="text-xs font-bold text-[#000C22] dark:text-white">{member.role}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all">
                      <MoreVertical className="w-5 h-5 text-[#000C22]/40 dark:text-white/40" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Security Policies */}
        <div className="space-y-6">
           <h3 className="text-xl font-black text-[#000C22] dark:text-white tracking-tight">Security Governance</h3>
           <div className="p-8 rounded-[2rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 space-y-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-[#000C22] dark:text-white">Forced MFA</h4>
                  <p className="text-xs text-[#000C22]/40 dark:text-white/40 mt-1">Require 2FA for all team members across the organization.</p>
                </div>
                <button onClick={() => setRequire2FA(!require2FA)} className={`w-12 h-7 rounded-full relative transition-all ${require2FA ? "bg-[#2ACED1]" : "bg-black/10 dark:bg-white/10"}`}>
                   <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${require2FA ? "right-1" : "left-1"}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-[#000C22] dark:text-white">IP Perimeter</h4>
                  <p className="text-xs text-[#000C22]/40 dark:text-white/40 mt-1">Restrict dashboard access to trusted network ranges.</p>
                </div>
                <button onClick={() => setIpRestriction(!ipRestriction)} className={`w-12 h-7 rounded-full relative transition-all ${ipRestriction ? "bg-[#2ACED1]" : "bg-black/10 dark:bg-white/10"}`}>
                   <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${ipRestriction ? "right-1" : "left-1"}`} />
                </button>
              </div>

              <AnimatePresence>
                {ipRestriction && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#000C22]/40 dark:text-white/40 mb-3">Allowed IP Addresses</p>
                     <textarea className="w-full bg-transparent border-none outline-none text-xs font-mono dark:text-white min-h-[60px]" placeholder="192.168.1.1, 10.0.0.0/24..." />
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* Roles Explorer */}
        <div className="space-y-6">
           <h3 className="text-xl font-black text-[#000C22] dark:text-white tracking-tight">Granular Roles</h3>
           <div className="space-y-4">
              {[
                { name: "Owner", desc: "Full ownership of the organization entity.", color: "#2ACED1" },
                { name: "Administrator", desc: "System-wide access except entity ownership.", color: "#10B981" },
                { name: "Developer", desc: "Full access to API, keys, and webhooks.", color: "#6366F1" },
                { name: "Finance Manager", desc: "Access to payouts, balances, and tax data.", color: "#F59E0B" },
              ].map((role, i) => (
                <div key={i} className="p-6 rounded-[1.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:border-[#2ACED1]/30 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-10 rounded-full" style={{ backgroundColor: role.color }} />
                      <div>
                         <h4 className="text-sm font-black text-[#000C22] dark:text-white">{role.name}</h4>
                         <p className="text-[10px] font-bold text-[#000C22]/40 dark:text-white/40">{role.desc}</p>
                      </div>
                   </div>
                   <ArrowRight className="w-4 h-4 text-[#000C22]/20 group-hover:text-[#2ACED1] transition-all" />
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* ─── Audit Logs ─── */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-[#000C22] dark:text-white tracking-tight">Audit Trail</h3>
        <div className="bg-white dark:bg-[#011B3B] rounded-[2.5rem] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#000C22]/30 dark:text-white/30">
                    <th className="px-8 py-4">Action</th>
                    <th className="px-8 py-4">Member</th>
                    <th className="px-8 py-4">Target</th>
                    <th className="px-8 py-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                   {[
                     { action: "API Key Rotated", member: "M Safi", target: "Secret Key (Live)", time: "2 mins ago" },
                     { action: "Member Invited", member: "M Safi", target: "sarah@kopopay.com", time: "1 hour ago" },
                     { action: "Role Modified", member: "Alex Rivers", target: "Support -> Admin", time: "5 hours ago" },
                   ].map((log, i) => (
                     <tr key={i} className="hover:bg-black/5 dark:hover:bg-white/5 transition-all group">
                        <td className="px-8 py-5">
                           <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5">
                                 <History className="w-3.5 h-3.5 text-[#2ACED1]" />
                              </div>
                              <span className="text-sm font-black text-[#000C22] dark:text-white">{log.action}</span>
                           </div>
                        </td>
                        <td className="px-8 py-5 text-xs font-bold text-[#000C22]/60 dark:text-white/60">{log.member}</td>
                        <td className="px-8 py-5 text-[10px] font-mono text-[#000C22]/40 dark:text-white/40">{log.target}</td>
                        <td className="px-8 py-5 text-right text-[10px] font-bold text-[#000C22]/30 dark:text-white/30 uppercase">{log.time}</td>
                     </tr>
                   ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
