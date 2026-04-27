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

type Step = "account-type" | "business-profile" | "representative-details" | "payout-setup" | "final-review";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<Step>("account-type");
  const [accountType, setAccountType] = useState<"individual" | "business" | null>(null);
  const [businessData, setBusinessData] = useState({ 
    name: "", 
    website: "", 
    industry: "",
    taxId: "",
    address: "",
    supportEmail: ""
  });
  const [representativeData, setRepresentativeData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    idNumber: "",
    homeAddress: ""
  });
  const [bankData, setBankData] = useState({
    accountHolder: "",
    routingNumber: "",
    accountNumber: ""
  });
  
  const router = useRouter();

  const nextStep = (step: Step) => setCurrentStep(step);
  
  const finishOnboarding = () => {
    safePush(router, "/onboarding/identity");
  };

  const stepTitles: Record<Step, string> = {
    "account-type": "Welcome to KopoPay",
    "business-profile": "Business Profile",
    "representative-details": "Representative Details",
    "payout-setup": "Payout Configuration",
    "final-review": "Review & Confirm"
  };

  return (
    <AuthLayout 
      title={stepTitles[currentStep]}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Legal Business Name" 
                    placeholder="Acme Corp" 
                    value={businessData.name}
                    onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                  />
                  <Input 
                    label="Tax ID / Registration Number" 
                    placeholder="12-3456789" 
                    value={businessData.taxId}
                    onChange={(e) => setBusinessData({...businessData, taxId: e.target.value})}
                  />
                </div>
                <Input 
                  label="Business Website" 
                  placeholder="https://example.com" 
                  value={businessData.website}
                  onChange={(e) => setBusinessData({...businessData, website: e.target.value})}
                />
                <Input 
                  label="Business Address" 
                  placeholder="123 Financial St, Suite 100" 
                  value={businessData.address}
                  onChange={(e) => setBusinessData({...businessData, address: e.target.value})}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#000C22]/70 dark:text-white/70">Industry</label>
                    <select 
                      value={businessData.industry}
                      onChange={(e) => setBusinessData({...businessData, industry: e.target.value})}
                      className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-[#2ACED1] outline-none text-sm transition-all text-[#000C22] dark:text-white"
                    >
                      <option value="">Select Industry</option>
                      <option value="saas">Software / SaaS</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="consulting">Consulting</option>
                    </select>
                  </div>
                  <Input 
                    label="Support Email" 
                    placeholder="support@acme.com" 
                    value={businessData.supportEmail}
                    onChange={(e) => setBusinessData({...businessData, supportEmail: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => nextStep("account-type")} className="flex-1">
                   Back
                </Button>
                <Button onClick={() => nextStep("representative-details")} className="flex-[2]">
                   Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Representative Details */}
          {currentStep === "representative-details" && (
            <motion.div
              key="representative-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="First Name" 
                    placeholder="John" 
                    value={representativeData.firstName}
                    onChange={(e) => setRepresentativeData({...representativeData, firstName: e.target.value})}
                  />
                  <Input 
                    label="Last Name" 
                    placeholder="Doe" 
                    value={representativeData.lastName}
                    onChange={(e) => setRepresentativeData({...representativeData, lastName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Date of Birth" 
                    type="date"
                    value={representativeData.dob}
                    onChange={(e) => setRepresentativeData({...representativeData, dob: e.target.value})}
                  />
                  <Input 
                    label="National ID / SSN" 
                    placeholder="XXX-XX-XXXX" 
                    value={representativeData.idNumber}
                    onChange={(e) => setRepresentativeData({...representativeData, idNumber: e.target.value})}
                  />
                </div>
                <Input 
                  label="Home Address" 
                  placeholder="456 Personal Ave, Apt 12" 
                  value={representativeData.homeAddress}
                  onChange={(e) => setRepresentativeData({...representativeData, homeAddress: e.target.value})}
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => nextStep("business-profile")} className="flex-1">
                   Back
                </Button>
                <Button onClick={() => nextStep("payout-setup")} className="flex-[2]">
                   Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Payout Setup */}
          {currentStep === "payout-setup" && (
            <motion.div
              key="payout-setup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="space-y-6">
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

                <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-4">
                  <h4 className="text-sm font-bold text-[#000C22] dark:text-white">Bank Details</h4>
                  <Input 
                    label="Account Holder Name" 
                    placeholder="Acme Corp" 
                    value={bankData.accountHolder}
                    onChange={(e) => setBankData({...bankData, accountHolder: e.target.value})}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      label="Routing Number" 
                      placeholder="110000000" 
                      value={bankData.routingNumber}
                      onChange={(e) => setBankData({...bankData, routingNumber: e.target.value})}
                    />
                    <Input 
                      label="Account Number" 
                      placeholder="000123456789" 
                      value={bankData.accountNumber}
                      onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => nextStep("representative-details")} className="flex-1">
                   Back
                </Button>
                <Button onClick={() => nextStep("final-review")} className="flex-[2]">
                   Verify Details
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Final Review */}
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
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                     <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Business</span>
                        <p className="text-sm font-bold">{businessData.name || "N/A"}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Representative</span>
                        <p className="text-sm font-bold">{representativeData.firstName} {representativeData.lastName}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Account Type</span>
                        <p className="text-sm font-bold capitalize">{accountType}</p>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Bank Status</span>
                        <p className="text-sm font-bold text-emerald-400">Ready to Connect</p>
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
        {["account-type", "business-profile", "representative-details", "payout-setup", "final-review"].map((step, idx) => {
          const steps = ["account-type", "business-profile", "representative-details", "payout-setup", "final-review"];
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
