"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Link as LinkIcon, 
  Camera, 
  ShieldCheck, 
  Users, 
  Building2,
  ExternalLink
} from "lucide-react";

export default function ProfilesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Business Profiles</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage your public identity, contact info, and business metadata.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg transition-all duration-200"
            >
              Update Profile
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          <ScrollReveal direction="bottom">
            <div className="p-8 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20">
              <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white text-3xl font-bold overflow-hidden shadow-xl">
                    K
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#2ACED1] text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-[#000C22] dark:text-white">Kopo Pay Technologies</h2>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                      Verified
                    </span>
                  </div>
                  <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 text-sm mb-4">Financial Infrastructure for the internet.</p>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#000C22]/40 dark:text-[#D8F4F7]/40">
                    <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> kopopay.com</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> San Francisco, CA</span>
                    <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Fintech / SaaS</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#2ACED1]/10">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#2ACED1]">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#2ACED1]/20 transition-all">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#000C22]/40 dark:text-[#D8F4F7]/40" />
                        <span className="text-sm font-medium text-[#000C22] dark:text-white">billing@kopopay.com</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#000C22]/30 uppercase">Primary</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#2ACED1]/20 transition-all">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#000C22]/40 dark:text-[#D8F4F7]/40" />
                        <span className="text-sm font-medium text-[#000C22] dark:text-white">+1 (555) 012-3456</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#2ACED1]">Public Links</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#2ACED1]/20 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="w-4 h-4 text-[#000C22]/40 dark:text-[#D8F4F7]/40" />
                        <span className="text-sm font-medium text-[#000C22] dark:text-white group-hover:text-[#2ACED1]">Checkout Page</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#2ACED1]" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[#2ACED1]/20 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="w-4 h-4 text-[#000C22]/40 dark:text-[#D8F4F7]/40" />
                        <span className="text-sm font-medium text-[#000C22] dark:text-white group-hover:text-[#2ACED1]">Support Portal</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#2ACED1]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Connected Teams */}
          <ScrollReveal direction="bottom" delay={0.1}>
            <div className="p-8 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="font-bold text-[#000C22] dark:text-white flex items-center gap-2 uppercase tracking-widest text-xs">
                   <Users className="w-4 h-4 text-[#2ACED1]" /> Team Access
                 </h3>
                 <button className="text-[10px] font-bold text-[#2ACED1] hover:underline uppercase">Manage Team</button>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {["Admin", "Finance", "Developer", "Support"].map((role) => (
                   <div key={role} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent text-center group hover:border-[#2ACED1]/20 transition-all">
                     <div className="w-10 h-10 rounded-full bg-[#2ACED1]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#2ACED1]/20 transition-colors">
                       <span className="font-bold text-[#2ACED1] text-xs leading-none">{role.charAt(0)}</span>
                     </div>
                     <p className="text-xs font-bold text-[#000C22] dark:text-white mb-1">{role}</p>
                     <p className="text-[9px] text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase font-bold">2 Members</p>
                   </div>
                 ))}
               </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <ScrollReveal direction="right">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-[#2ACED1]/30">
              <h4 className="text-xs font-bold text-[#2ACED1] uppercase tracking-widest mb-6">Profile Completion</h4>
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="94" className="text-[#2ACED1]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">75%</span>
                  <span className="text-[9px] font-bold text-white/50 uppercase">Complete</span>
                </div>
              </div>
              <p className="text-[11px] text-white/60 text-center leading-relaxed">
                Complete your business information to unlock higher transaction limits and instant payouts.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20">
              <h4 className="text-xs font-bold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Trust & Safety
              </h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                   <p className="text-[11px] font-bold text-[#000C22] dark:text-white">KYB Status</p>
                   <span className="text-[9px] font-bold text-emerald-600 uppercase">Approved</span>
                 </div>
                 <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                   <p className="text-[11px] font-bold text-[#000C22] dark:text-white">PCI Compliance</p>
                   <span className="text-[9px] font-bold text-emerald-600 uppercase">Level 1</span>
                 </div>
                 <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                   <p className="text-[11px] font-bold text-[#000C22] dark:text-white">2FA Security</p>
                   <span className="text-[9px] font-bold text-emerald-600 uppercase">Active</span>
                 </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
