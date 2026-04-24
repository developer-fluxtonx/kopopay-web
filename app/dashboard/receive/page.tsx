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
    <div className="max-w-xl mx-auto">
      <ScrollReveal direction="top">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white">Receive Payments</h1>
          <KycStatusBadge profile={user?.kyc} />
        </div>
        <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium mb-8">Share your payment link or QR code to receive money from anyone.</p>
      </ScrollReveal>

      {/* Payment Link Card */}
      <ScrollReveal direction="left" delay={0.1}>
        <motion.div
          whileHover={{ boxShadow: "0 10px 30px rgba(42,206,209,0.12)" }}
          className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm mb-6 transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-[#2ACED1]" />
            </div>
            <div>
              <h3 className="font-bold text-[#000C22] dark:text-white">Your Payment Link</h3>
              <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">Share this link to receive payments</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 bg-[#F2FCFC] dark:bg-[#000C22]/60 rounded-xl border border-[#2ACED1]/20 text-sm font-mono text-[#000C22]/80 dark:text-[#D8F4F7]/80 truncate">
              {paymentLink}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="p-3 rounded-xl bg-[#2ACED1]/10 hover:bg-[#2ACED1]/20 border border-[#2ACED1]/20 transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5 text-[#2ACED1]" />}
            </motion.button>
          </div>
        </motion.div>
      </ScrollReveal>

      {/* QR Code Card */}
      <ScrollReveal direction="right" delay={0.2}>
        <motion.div
          whileHover={{ boxShadow: "0 10px 30px rgba(42,206,209,0.12)" }}
          className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm mb-6 transition-shadow"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#034E78]/10 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-[#034E78] dark:text-[#D8F4F7]" />
            </div>
            <div>
              <h3 className="font-bold text-[#000C22] dark:text-white">QR Code</h3>
              <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">Let customers scan to pay</p>
            </div>
          </div>
          
          {/* Simulated QR code using CSS grid */}
          <div className="flex justify-center mb-6">
            <div className="w-48 h-48 bg-white dark:bg-[#000C22] rounded-2xl border-2 border-[#2ACED1]/30 p-4 flex items-center justify-center relative shadow-[0_0_30px_rgba(42,206,209,0.1)]">
              {/* 8x8 grid simulating a QR code */}
              <div className="grid grid-cols-8 gap-[3px] w-full h-full">
                {Array.from({ length: 64 }, (_, i) => {
                  const isBlack = qrPatternIndices.includes(i);
                  return (
                    <div key={i} className={`rounded-[2px] ${isBlack ? "bg-[#000C22] dark:bg-[#2ACED1]" : "bg-transparent"}`} />
                  );
                })}
              </div>
              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#031322]/95 p-1 shadow-md">
                  <BrandLogo size={30} showLabel={false} />
                </div>
              </div>
            </div>
          </div>
          
          <Button variant="secondary" className="w-full rounded-xl border-[#2ACED1]/20 hover:border-[#2ACED1] gap-2">
            <Download className="w-4 h-4" /> Download QR Code
          </Button>
        </motion.div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal direction="bottom" delay={0.3}>
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ y: -3 }} className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 text-center">
            <p className="text-2xl font-bold text-[#000C22] dark:text-white">$8,420</p>
            <p className="text-xs font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50 mt-1 uppercase tracking-wider">Received this month</p>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 text-center">
            <p className="text-2xl font-bold text-[#000C22] dark:text-white">47</p>
            <p className="text-xs font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50 mt-1 uppercase tracking-wider">Payments received</p>
          </motion.div>
        </div>
      </ScrollReveal>
    </div>
  );
}
