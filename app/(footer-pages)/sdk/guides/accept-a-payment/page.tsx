"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { ChevronRight, Terminal, Copy, Check, Info, ArrowRight, Play, BookOpen } from "lucide-react";
import { useState } from "react";

export default function AcceptPaymentGuide() {
  const [copied, setCopied] = useState("");

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const steps = [
    {
      title: "Install the SDK",
      desc: "First, add the Kopo Pay library to your project using your preferred package manager.",
      code: "npm install @kopopay/kopopay-node",
      lang: "bash",
    },
    {
      title: "Initialize the client",
      desc: "Use your secret API key to initialize the Kopo Pay client. Never share this key on the client-side.",
      code: `const kopopay = require('kopopay')('sk_test_...');

// Or using ES modules
import KopoPay from 'kopopay';
const kopopay = new KopoPay('sk_test_...');`,
      lang: "javascript",
    },
    {
      title: "Create a Payment Intent",
      desc: "Create a PaymentIntent on your server to track a payment. This returns a client_secret.",
      code: `const paymentIntent = await kopopay.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  automatic_payment_methods: { enabled: true },
});

const clientSecret = paymentIntent.client_secret;`,
      lang: "javascript",
    },
    {
      title: "Confirm on the client",
      desc: "Use Kopo.js on your frontend to collect payment details and confirm the payment.",
      code: `const { error } = await kopopay.confirmPayment({
  elements,
  confirmParams: {
    return_url: 'https://example.com/order/123/complete',
  },
});`,
      lang: "javascript",
    },
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12">
      <ScrollReveal>
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[#2ACED1] font-bold text-sm mb-4">
            <Play className="w-4 h-4" /> Quickstart Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#000C22] dark:text-white mb-6">
            Accept a payment
          </h1>
          <p className="text-lg text-[#000C22]/70 dark:text-[#D8F4F7]/70 leading-relaxed">
            This guide shows you how to integrate Kopo Pay to accept payments on your website. 
            We'll use a server-side SDK to create a Payment Intent and Kopo.js to handle the frontend flow.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          {steps.map((step, i) => (
            <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
              <div className="relative pl-12 border-l-2 border-[#2ACED1]/20">
                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-[#2ACED1] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-500/30">
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
                  <pre className="bg-[#011B3B] rounded-2xl p-6 text-sm font-mono text-[#2ACED1]/90 overflow-x-auto shadow-inner">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <div className="bg-[#2ACED1]/5 border border-[#2ACED1]/20 rounded-3xl p-8 flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#2ACED1]/10 flex items-center justify-center text-[#2ACED1] flex-shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#000C22] dark:text-white mb-2">Security Note</h4>
                <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 leading-relaxed">
                  Always use your **Secret Key** (`sk_test_...`) on your server and your **Publishable Key** (`pk_test_...`) on your client. 
                  Never expose your secret key in your frontend code or public repositories.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <aside className="space-y-8">
          <ScrollReveal direction="right">
            <div className="bg-white/50 dark:bg-[#011B3B]/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sticky top-28">
              <h4 className="font-bold text-[#000C22] dark:text-white mb-4">On this page</h4>
              <ul className="space-y-3 text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/50">
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Requirements</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Server Setup</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Frontend Integration</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Testing Payments</li>
              </ul>

              <div className="mt-8 pt-8 border-t border-white/5">
                <h4 className="font-bold text-[#000C22] dark:text-white mb-4">Related Docs</h4>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between text-sm p-3 rounded-xl bg-white/5 hover:bg-[#2ACED1]/10 transition group">
                    <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#2ACED1]" /> API Reference</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                  <button className="w-full flex items-center justify-between text-sm p-3 rounded-xl bg-white/5 hover:bg-[#2ACED1]/10 transition group">
                    <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-[#2ACED1]" /> Test Cards</span>
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
