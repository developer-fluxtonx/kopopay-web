"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  User, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Globe,
  Wallet,
  Landmark,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { Input } from "@/components/atoms/Input";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { safePush } from "@/lib/safeRouter";

import { PAYOUT_METHODS } from "@/lib/paymentConfigs";

type Step = "account-type" | "business-profile" | "payout-setup" | "final-review";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<Step>("account-type");
  const [accountType, setAccountType] = useState<"individual" | "business" | null>(null);
  const [businessData, setBusinessData] = useState({ name: "", website: "", industry: "" });
  const router = useRouter();

  const nextStep = (step: Step) => setCurrentStep(step);
  
  const finishOnboarding = () => {
    // Navigate to identity verification as the final hard-check
    safePush(router, "/onboarding/identity");
  };

  return (
    <AuthLayout 
      title={
        currentStep === "account-type" ? "Welcome to KopoPay" :
        currentStep === "business-profile" ? "Tell us about your business" :
        currentStep === "payout-setup" ? "Payout Configuration" : "Review & Confirm"
      }
      subtitle={
        currentStep === "account-type" ? "Let's get your account set up for global payments." :
        "Complete these steps to unlock full platform features."
      }
    >
      <div className="mt-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: Account Type */}
          {currentStep === "account-type" && (
            <motion.div
              key="account-type"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: "individual", title: "Individual / Freelancer", icon: User, desc: "Best for sole proprietors and independent contractors." },
                  { id: "business", title: "Registered Business", icon: Building2, desc: "For LLPs, Corporations, and Non-profits." }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setAccountType(type.id as any)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left flex items-start gap-4 ${
                      accountType === type.id 
                        ? "border-[#2ACED1] bg-[#2ACED1]/5 shadow-lg shadow-[#2ACED1]/10" 
                        : "border-black/5 dark:border-white/5 hover:border-[#2ACED1]/30 bg-white dark:bg-white/5"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${accountType === type.id ? "bg-[#2ACED1] text-white" : "bg-black/5 dark:bg-white/5 text-[#2ACED1]"}`}>
                       <type.icon className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="font-bold text-[#000C22] dark:text-white">{type.title}</h3>
                       <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 leading-snug">{type.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <Button 
                disabled={!accountType} 
                onClick={() => nextStep("business-profile")} 
                className="w-full mt-4"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* STEP 2: Business Profile */}
          {currentStep === "business-profile" && (
            <motion.div
              key="business-profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="space-y-4">
                <Input 
                  label="Legal Business Name" 
                  placeholder="Acme Corp" 
                  value={businessData.name}
                  onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                />
                <Input 
                  label="Business Website" 
                  placeholder="https://example.com" 
                  value={businessData.website}
                  onChange={(e) => setBusinessData({...businessData, website: e.target.value})}
                />
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#000C22]/70 dark:text-white/70">Industry</label>
                  <select className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-[#2ACED1] outline-none text-sm transition-all">
                    <option>Software / SaaS</option>
                    <option>E-commerce</option>
                    <option>Consulting</option>
                    <option>Education</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => nextStep("account-type")} className="flex-1">
                   Back
                </Button>
                <Button onClick={() => nextStep("payout-setup")} className="flex-[2]">
                   Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Payout Setup */}
          {currentStep === "payout-setup" && (
            <motion.div
              key="payout-setup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="space-y-4">
                <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60">Choose how you want to receive your settled funds.</p>
                <div className="space-y-3">
                   {PAYOUT_METHODS.map((method) => (
                     <div key={method.id} className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex items-center justify-between group hover:border-[#2ACED1]/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="p-2 rounded-lg bg-white dark:bg-[#011B3B] text-[#2ACED1]">
                              <method.icon className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-[#000C22] dark:text-white">{method.title}</p>
                              <p className="text-[10px] text-[#000C22]/40 dark:text-white/40 uppercase font-bold tracking-widest">{method.detail}</p>
                           </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                   ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => nextStep("business-profile")} className="flex-1">
                   Back
                </Button>
                <Button onClick={() => nextStep("final-review")} className="flex-[2]">
                   Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Final Review */}
          {currentStep === "final-review" && (
            <motion.div
              key="final-review"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6"
            >
               <div className="p-6 rounded-2xl bg-[#000C22] text-white space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                     <span className="text-xs font-bold uppercase tracking-widest text-white/40">Profile Summary</span>
                     <ShieldCheck className="w-5 h-5 text-[#2ACED1]" />
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between text-sm">
                        <span className="text-white/40">Type</span>
                        <span className="font-bold capitalize">{accountType}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-white/40">Business</span>
                        <span className="font-bold">{businessData.name || "Kopo Merchant"}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-white/40">Market</span>
                        <span className="font-bold">Global / Multi-currency</span>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                     <Briefcase className="w-5 h-5 text-amber-500 shrink-0" />
                     <p className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed font-medium">
                        By continuing, you agree to our Merchant Services Agreement and certify that the business information provided is accurate.
                     </p>
                  </div>
                  <Button onClick={finishOnboarding} className="w-full py-4 text-lg">
                     Agree & Start Verification
                  </Button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="mt-12 flex items-center justify-center gap-3">
        {["account-type", "business-profile", "payout-setup", "final-review"].map((step, idx) => {
          const steps = ["account-type", "business-profile", "payout-setup", "final-review"];
          const currentIdx = steps.indexOf(currentStep);
          return (
            <div 
              key={step} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx <= currentIdx ? "w-8 bg-[#2ACED1]" : "w-4 bg-black/5 dark:bg-white/5"
              }`} 
            />
          );
        })}
      </div>
    </AuthLayout>
  );
}
