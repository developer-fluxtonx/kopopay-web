"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { safePush } from "@/lib/safeRouter";
import { motion, AnimatePresence } from "framer-motion";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { Button } from "@/components/atoms/Button";
import { Upload, Camera, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function IdentityVerificationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);

  const simulateUpload = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
    }, 1500);
  };

  const simulateLiveness = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
    }, 2000);
  };

  const finishOnboarding = () => {
    safePush(router, "/dashboard");
  };

  const steps = [
    { id: 1, title: "Identity Document" },
    { id: 2, title: "Liveness Check" },
    { id: 3, title: "Verification" }
  ];

  return (
    <AuthLayout 
      title={step === 3 ? "Verification Complete" : "Verify your identity"} 
      subtitle={step === 3 ? "Your account is ready for production." : "To comply with global financial regulations, we need to verify your business identity."}
    >
      <div className="mt-8">
        {/* Step Indicator */}
        {step < 3 && (
          <div className="flex items-center justify-between mb-10 px-2">
            {steps.slice(0, 2).map((s, idx) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step >= s.id ? "bg-[#2ACED1] text-white" : "bg-black/5 dark:bg-white/5 text-[#000C22]/40 dark:text-white/40"
                  }`}>
                    {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.id}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    step >= s.id ? "text-[#2ACED1]" : "text-[#000C22]/40 dark:text-white/40"
                  }`}>{s.title}</span>
                </div>
                {idx === 0 && (
                  <div className={`flex-1 h-px mx-4 transition-all duration-300 ${
                    step > 1 ? "bg-[#2ACED1]" : "bg-black/5 dark:bg-white/5"
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="relative min-h-[250px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-6"
              >
                <div className="p-8 border-2 border-dashed border-[#2ACED1]/20 rounded-3xl bg-[#2ACED1]/5 flex flex-col items-center justify-center text-center gap-4 group hover:border-[#2ACED1]/40 transition-all cursor-pointer">
                   <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#011B3B] flex items-center justify-center shadow-lg shadow-[#2ACED1]/5 group-hover:scale-110 transition-transform">
                     <Upload className="w-6 h-6 text-[#2ACED1]" />
                   </div>
                   <div>
                     <p className="font-bold text-[#000C22] dark:text-white text-lg">Official ID Document</p>
                     <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 max-w-[240px] mx-auto mt-1">
                       Please upload a clear photo of your Passport, Driver&apos;s License, or National ID.
                     </p>
                   </div>
                </div>
                
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#000C22]/40 dark:text-white/40 mb-2">Requirements</h4>
                  <ul className="text-xs text-[#000C22]/70 dark:text-white/70 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#2ACED1]" /> All four corners visible
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#2ACED1]" /> No glare or blur
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#2ACED1]" /> Valid (not expired)
                    </li>
                  </ul>
                </div>

                <Button onClick={simulateUpload} disabled={isVerifying} className="w-full py-4 text-md shadow-xl shadow-[#2ACED1]/20">
                  {isVerifying ? "Processing Document..." : "Select File & Upload"}
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-6"
              >
                <div className="p-4 border border-[#000C22]/10 dark:border-white/10 rounded-3xl bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center text-center gap-6">
                   <div className="w-full aspect-video bg-black/20 dark:bg-black/60 rounded-2xl flex items-center justify-center relative overflow-hidden border border-white/5">
                      {isVerifying && (
                        <motion.div 
                          initial={{ top: 0 }} 
                          animate={{ top: "100%" }} 
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute w-full h-1 bg-[#2ACED1] shadow-[0_0_15px_#2ACED1] z-10"
                        />
                      )}
                      <Camera className={`w-12 h-12 transition-all duration-300 ${isVerifying ? 'text-[#2ACED1] scale-110' : 'text-[#000C22]/20 dark:text-white/20'}`} />
                      
                      {/* Biometric overlay frame */}
                      <div className="absolute inset-8 border-2 border-white/10 rounded-full border-dashed" />
                   </div>
                   <div className="px-4">
                     <p className="font-bold text-[#000C22] dark:text-white text-lg">Liveness Check</p>
                     <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 mt-1">
                       Position your face within the frame and follow the on-screen prompts.
                     </p>
                   </div>
                </div>
                <Button onClick={simulateLiveness} disabled={isVerifying} className="w-full py-4 text-md shadow-xl shadow-[#2ACED1]/20">
                  {isVerifying ? "Scanning Biometrics..." : "Start Liveness Check"}
                </Button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-8 py-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
                  <div className="w-24 h-24 rounded-3xl bg-emerald-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20 relative z-10 rotate-12">
                    <ShieldCheck className="w-12 h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#000C22] dark:text-white tracking-tight">System Approved</h3>
                  <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 max-w-[280px] mx-auto leading-relaxed">
                    Identity verified successfully. You can now process high-volume transactions and access all settlement features.
                  </p>
                </div>
                <Button onClick={finishOnboarding} className="w-full py-4 text-lg shadow-xl shadow-[#2ACED1]/10">
                  Enter Dashboard
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AuthLayout>
  );
}
