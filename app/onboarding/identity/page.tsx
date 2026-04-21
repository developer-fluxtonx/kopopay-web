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

  return (
    <AuthLayout 
      title="Verify your identity" 
      subtitle="To comply with financial regulations, we need to verify your business identity."
    >
      <div className="mt-4 relative min-h-[250px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-4"
            >
              <div className="p-4 border border-dashed border-[#000C22]/20 dark:border-white/20 rounded-xl bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center text-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-white dark:bg-[#011B3B] flex items-center justify-center shadow-sm">
                   <Upload className="w-5 h-5 text-[#2ACED1]" />
                 </div>
                 <div>
                   <p className="font-medium text-[#000C22] dark:text-white">Upload Government ID</p>
                   <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60">Passport, DL, or National ID</p>
                 </div>
              </div>
              <Button onClick={simulateUpload} disabled={isVerifying} className="w-full">
                {isVerifying ? "Processing..." : "Select File & Upload"}
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-4"
            >
              <div className="p-4 border border-[#000C22]/10 dark:border-white/10 rounded-xl bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center text-center gap-3">
                 <div className="w-full h-32 bg-black/10 dark:bg-black/40 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {isVerifying && (
                      <motion.div 
                        initial={{ top: 0 }} 
                        animate={{ top: "100%" }} 
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute w-full h-1 bg-[#2ACED1]"
                      />
                    )}
                    <Camera className={`w-8 h-8 ${isVerifying ? 'text-[#2ACED1]' : 'text-[#000C22]/40 dark:text-white/40'}`} />
                 </div>
                 <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                   Position your face within the frame.<br/>We use biometric checks to prevent fraud.
                 </p>
              </div>
              <Button onClick={simulateLiveness} disabled={isVerifying} className="w-full">
                {isVerifying ? "Scanning..." : "Start Liveness Check"}
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center gap-4 py-6"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#000C22] dark:text-white mb-1">Identity Verified</h3>
                <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60">Your account is now fully approved to process payments globally.</p>
              </div>
              <Button onClick={finishOnboarding} className="w-full mt-2">
                Go to Dashboard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {step < 3 && (
         <div className="flex justify-center mt-6 gap-2">
           <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-[#2ACED1]' : 'bg-black/10 dark:bg-white/10'}`} />
           <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-[#2ACED1]' : 'bg-black/10 dark:bg-white/10'}`} />
         </div>
      )}
    </AuthLayout>
  );
}
