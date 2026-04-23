"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Globe, Terminal, Copy, Check, Info, ArrowRight, DollarSign, Wallet, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function PayoutsGuide() {
  const [copied, setCopied] = useState("");

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const steps = [
    {
      title: "Set up a Connect account",
      desc: "To send payouts, you first need to create a Connect account for your seller or service provider.",
      code: `const account = await kopopay.accounts.create({
  type: 'express',
  country: 'US',
  email: 'seller@example.com',
  capabilities: {
    transfers: { requested: true },
  },
});`,
      lang: "javascript",
    },
    {
      title: "Add a bank account",
      desc: "Attach a bank account or debit card to the Connect account where funds will be sent.",
      code: `const externalAccount = await kopopay.accounts.createExternalAccount(
  'acct_123',
  { external_account: 'btok_123' }
);`,
      lang: "javascript",
    },
    {
      title: "Create a Payout",
      desc: "Send funds from your account balance to the connected account's bank account.",
      code: `const payout = await kopopay.payouts.create({
  amount: 5000,
  currency: 'usd',
  method: 'instant', // or 'standard'
}, {
  stripeAccount: 'acct_123',
});`,
      lang: "javascript",
    },
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12">
      <ScrollReveal>
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[#008E96] font-bold text-sm mb-4">
            <Globe className="w-4 h-4" /> Global Money Movement
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#000C22] dark:text-white mb-6">
            Send global payouts
          </h1>
          <p className="text-lg text-[#000C22]/70 dark:text-[#D8F4F7]/70 leading-relaxed">
            Pay out your sellers, contractors, or service providers worldwide. 
            Kopo Pay handles cross-border currency conversion and local bank regulations.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          {steps.map((step, i) => (
            <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
              <div className="relative pl-12 border-l-2 border-[#008E96]/20">
                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-[#008E96] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-teal-900/30">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-[#000C22] dark:text-white mb-3">{step.title}</h3>
                <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 mb-6">{step.desc}</p>
                
                <div className="relative group">
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                    <button 
                      onClick={() => copy(step.code)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition"
                    >
                      {copied === step.code ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="bg-[#011B3B] rounded-2xl p-6 text-sm font-mono text-cyan-400/90 overflow-x-auto shadow-inner">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <aside className="space-y-8">
          <ScrollReveal direction="right">
            <div className="bg-white/50 dark:bg-[#011B3B]/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sticky top-28">
              <h4 className="font-bold text-[#000C22] dark:text-white mb-4">Payout Topics</h4>
              <ul className="space-y-3 text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/50">
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Connect Accounts</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Payout Schedules</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Instant Payouts</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Tax Reporting</li>
              </ul>

              <div className="mt-8 pt-8 border-t border-white/5">
                <h4 className="font-bold text-[#000C22] dark:text-white mb-4">Integrations</h4>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between text-sm p-3 rounded-xl bg-white/5 hover:bg-[#2ACED1]/10 transition group">
                    <span className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-[#2ACED1]" /> Transfer API</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                  <button className="w-full flex items-center justify-between text-sm p-3 rounded-xl bg-white/5 hover:bg-[#2ACED1]/10 transition group">
                    <span className="flex items-center gap-2"><Wallet className="w-4 h-4 text-[#2ACED1]" /> Balance API</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </aside>
      </div>
    </div>
  );
}
