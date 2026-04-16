"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, ArrowRight, User, DollarSign } from "lucide-react";

const recentRecipients = [
  { name: "Sarah Johnson", email: "sarah@example.com", avatar: "S" },
  { name: "Michael Chen", email: "michael@example.com", avatar: "M" },
  { name: "Priya Sharma", email: "priya@example.com", avatar: "P" },
];

export default function SendMoneyPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto">
      <ScrollReveal direction="top">
        <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2">Send Money</h1>
        <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium mb-8">Transfer funds to anyone, anywhere, instantly.</p>
      </ScrollReveal>

      {/* Progress Steps */}
      <ScrollReveal direction="left" delay={0.1}>
        <div className="flex items-center gap-2 mb-8">
          {["Recipient", "Amount", "Done"].map((label, i) => (
            <React.Fragment key={i}>
              <div className={`flex items-center gap-2 ${step > i + 1 ? "text-emerald-500" : step === i + 1 ? "text-[#2ACED1]" : "text-[#000C22]/30 dark:text-white/30"}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all
                  ${step > i + 1 ? "border-emerald-500 bg-emerald-500/10" : step === i + 1 ? "border-[#2ACED1] bg-[#2ACED1]/10" : "border-[#000C22]/20 dark:border-white/20"}`}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className="text-sm font-semibold hidden sm:inline">{label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 ${step > i + 1 ? "bg-emerald-500" : "bg-[#000C22]/10 dark:bg-white/10"}`} />}
            </React.Fragment>
          ))}
        </div>
      </ScrollReveal>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm mb-6">
              <h3 className="text-sm font-bold text-[#000C22]/50 dark:text-[#D8F4F7]/50 uppercase tracking-wider mb-4">Recent Recipients</h3>
              <div className="flex flex-col gap-2">
                {recentRecipients.map((r, i) => (
                  <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                    <motion.button
                      whileHover={{ x: 4, boxShadow: "0 4px 20px rgba(42,206,209,0.1)" }}
                      onClick={() => { setRecipient(r.email); setStep(2); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#2ACED1]/5 border border-transparent hover:border-[#2ACED1]/20 transition-all text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white font-bold text-sm">{r.avatar}</div>
                      <div>
                        <p className="text-sm font-semibold text-[#000C22] dark:text-white">{r.name}</p>
                        <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">{r.email}</p>
                      </div>
                    </motion.button>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <ScrollReveal direction="bottom" delay={0.3}>
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm">
                <Input label="Recipient email or phone" placeholder="email@example.com" value={recipient} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)} />
                <Button onClick={() => setStep(2)} variant="primary" className="w-full mt-4" disabled={!recipient}>
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </ScrollReveal>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
            <div className="p-8 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm">
              <ScrollReveal direction="top">
                <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 mb-6">
                  Sending to <span className="font-bold text-[#2ACED1]">{recipient}</span>
                </p>
              </ScrollReveal>

              <ScrollReveal direction="bottom" delay={0.15}>
                <div className="flex items-center justify-center mb-6">
                  <span className="text-4xl font-bold text-[#000C22]/30 dark:text-white/30 mr-2">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-5xl md:text-6xl font-bold bg-transparent outline-none text-[#000C22] dark:text-white w-full text-center placeholder:text-[#000C22]/20 dark:placeholder:text-white/20"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.25}>
                <div className="p-4 rounded-xl bg-[#2ACED1]/5 border border-[#2ACED1]/10 text-sm mb-6">
                  <div className="flex justify-between mb-1">
                    <span className="text-[#000C22]/60 dark:text-[#D8F4F7]/60">Fee</span>
                    <span className="font-semibold text-[#000C22] dark:text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#000C22]/60 dark:text-[#D8F4F7]/60">Estimated arrival</span>
                    <span className="font-semibold text-emerald-600">Instant</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.35}>
                <Button onClick={handleSend} variant="action" className="w-full rounded-xl shadow-[0_8px_25px_rgba(42,206,209,0.25)]" disabled={!amount || isProcessing}>
                  {isProcessing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <>Send ${amount || "0.00"} <Send className="ml-2 w-4 h-4" /></>
                  )}
                </Button>
              </ScrollReveal>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="p-8 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 backdrop-blur-sm text-center">
              <ScrollReveal direction="top">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </motion.div>
              </ScrollReveal>
              <ScrollReveal direction="bottom" delay={0.2}>
                <h2 className="text-2xl font-bold text-[#000C22] dark:text-white mb-2">Payment Sent!</h2>
                <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 mb-6">
                  <span className="font-bold text-emerald-600">${amount}</span> was sent to <span className="font-bold text-[#2ACED1]">{recipient}</span>
                </p>
              </ScrollReveal>
              <ScrollReveal direction="bottom" delay={0.3}>
                <Button onClick={() => { setStep(1); setAmount(""); setRecipient(""); }} variant="secondary" className="rounded-xl">
                  Send another payment
                </Button>
              </ScrollReveal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
