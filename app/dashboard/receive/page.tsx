"use client";

import React, { useState } from "react";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Button } from "@/components/atoms/Button";
import { KycRequirementGate } from "@/components/kyc/KycRequirementGate";
import { KycStatusBadge } from "@/components/kyc/KycStatusBadge";
import { motion } from "framer-motion";
import { Copy, Check, QrCode, Download, Link2 } from "lucide-react";
import { isKycVerified } from "@/lib/kyc";
import { useAuthStore } from "@/store/authStore";

const qrPatternIndices = [
  0, 1, 2, 5, 6, 7, 8, 10, 12, 13, 15, 16, 18, 20, 21, 23,
  24, 26, 27, 29, 31, 33, 34, 36, 37, 39, 40, 41, 42, 45, 47, 48,
  50, 52, 53, 55, 56, 57, 58, 61, 62, 63,
];

export default function ReceivePage() {
  const user = useAuthStore((state) => state.user);
  const [copied, setCopied] = useState(false);
  const paymentLink = "https://pay.kopopay.com/p/usr_dummy123";
  const isVerifiedForCollections = isKycVerified(user?.kyc);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVerifiedForCollections) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <ScrollReveal direction="top">
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2">Receive Payments</h1>
          <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">
            Payment links and QR collections unlock after profile verification is complete.
          </p>
        </ScrollReveal>

        <KycRequirementGate featureName="receive payments" profile={user?.kyc} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#000C22] dark:text-white tracking-tight">Receive Payments</h1>
          <KycStatusBadge profile={user?.kyc} />
        </div>
        <p className="text-sm font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/40 max-w-md">Share your secure payment link or premium QR code to orchestrate instant capital inflow from anywhere.</p>
      </div>

      <div className="space-y-10">
        {/* Payment Link Card */}
        <div className="p-10 rounded-[3rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-[#2ACED1]/5 transition-all duration-500 group">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#2ACED1]/10 flex items-center justify-center text-[#2ACED1] group-hover:scale-110 transition-transform">
              <Link2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-[#000C22] dark:text-white tracking-tight">Direct Asset Link</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/30 dark:text-white/20 mt-1">Universal payment endpoint</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 px-6 py-5 bg-black/[0.03] dark:bg-black/20 rounded-[1.5rem] border border-black/5 dark:border-white/5 text-xs font-mono font-bold text-[#000C22]/80 dark:text-[#2ACED1] truncate">
              {paymentLink}
            </div>
            <button
              onClick={handleCopy}
              className="p-5 rounded-[1.5rem] bg-[#2ACED1] text-white shadow-lg shadow-[#2ACED1]/20 hover:opacity-90 active:scale-95 transition-all shrink-0"
            >
              {copied ? <Check className="w-6 h-6 stroke-[3]" /> : <Copy className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>
        </div>

        {/* QR Code Card */}
        <div className="p-10 rounded-[3rem] bg-[#000C22] border border-[#2ACED1]/20 shadow-2xl relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#2ACED1]/5 blur-[100px] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-12 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#2ACED1]">
                <QrCode className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white tracking-tight">Express Checkout QR</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">Scan for biometric relay</p>
              </div>
            </div>
            <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
               <Download className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex justify-center mb-12 relative z-10">
            <div className="relative p-2 bg-gradient-to-br from-[#2ACED1]/40 to-transparent rounded-[2.5rem] group-hover:scale-105 transition-transform duration-500">
               <div className="w-56 h-56 bg-white dark:bg-[#000C22] rounded-[2rem] border border-[#2ACED1]/30 p-6 flex items-center justify-center relative shadow-2xl">
                 <div className="grid grid-cols-8 gap-1.5 w-full h-full opacity-90">
                   {Array.from({ length: 64 }, (_, i) => {
                     const isBlack = qrPatternIndices.includes(i);
                     return (
                       <div key={i} className={`rounded-[2px] ${isBlack ? "bg-[#000C22] dark:bg-[#2ACED1]" : "bg-transparent"}`} />
                     );
                   })}
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#031322] border border-white/10 shadow-2xl shadow-black/50">
                     <BrandLogo size={36} showLabel={false} />
                   </div>
                 </div>
               </div>
            </div>
          </div>
          
          <button className="w-full py-5 rounded-[2rem] bg-white text-[#000C22] text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-[#2ACED1] hover:text-white active:scale-95 shadow-xl shadow-black/20 relative z-10">
            Export High-Res Identifier
          </button>
        </div>

        {/* Dynamic Analytics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            { label: "Maturity Volume", value: "$8,420", color: "text-[#2ACED1]" },
            { label: "Collection Pulse", value: "47 Txns", color: "text-emerald-500" },
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 text-center shadow-sm">
              <p className={`text-3xl font-bold ${stat.color} tracking-tighter`}>{stat.value}</p>
              <p className="text-[9px] font-bold text-[#000C22]/30 dark:text-white/20 mt-2 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
