"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { RefreshCcw, Terminal, Copy, Check, Info, ArrowRight, BookOpen, Layers, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function SubscriptionsGuide() {
  const [copied, setCopied] = useState("");

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const steps = [
    {
      title: "Create a Product and Price",
      desc: "Before subscribing a customer, you need to define what they are buying. Products describe what you sell, and Prices define how much and how often to charge.",
      code: `const product = await kopopay.products.create({
  name: 'Premium Plan',
});

const price = await kopopay.prices.create({
  product: product.id,
  unit_amount: 1000,
  currency: 'usd',
  recurring: { interval: 'month' },
});`,
      lang: "javascript",
    },
    {
      title: "Create a Customer",
      desc: "To start a subscription, you need a Customer object to attach the billing details and payment method.",
      code: `const customer = await kopopay.customers.create({
  email: 'customer@example.com',
  payment_method: 'pm_card_visa', // Set after collecting PM
  invoice_settings: { default_payment_method: 'pm_card_visa' },
});`,
      lang: "javascript",
    },
    {
      title: "Start the Subscription",
      desc: "Subscribe the customer to the price you created. This will automatically generate invoices and charge the customer.",
      code: `const subscription = await kopopay.subscriptions.create({
  customer: customer.id,
  items: [{ price: price.id }],
  payment_behavior: 'default_incomplete',
  payment_settings: { save_default_payment_method: 'on_subscription' },
  expand: ['latest_invoice.payment_intent'],
});`,
      lang: "javascript",
    },
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12">
      <ScrollReveal>
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[#034E78] dark:text-[#2ACED1] font-bold text-sm mb-4">
            <RefreshCcw className="w-4 h-4" /> Billing Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#000C22] dark:text-white mb-6">
            Set up subscriptions
          </h1>
          <p className="text-lg text-[#000C22]/70 dark:text-[#D8F4F7]/70 leading-relaxed">
            Implement recurring billing to charge your customers on a weekly, monthly, or yearly basis. 
            Kopo Pay handles prorations, renewals, and automated email notifications for you.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          {steps.map((step, i) => (
            <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
              <div className="relative pl-12 border-l-2 border-[#034E78]/20">
                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-[#034E78] dark:bg-[#2ACED1] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-900/30">
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
              <h4 className="font-bold text-[#000C22] dark:text-white mb-4">Subscription Topics</h4>
              <ul className="space-y-3 text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/50">
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Fixed-price billing</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Usage-based billing</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Trial periods</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Pausing & Canceling</li>
              </ul>

              <div className="mt-8 pt-8 border-t border-white/5">
                <h4 className="font-bold text-[#000C22] dark:text-white mb-4">Resources</h4>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between text-sm p-3 rounded-xl bg-white/5 hover:bg-[#2ACED1]/10 transition group">
                    <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#2ACED1]" /> Customer Portal</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                  <button className="w-full flex items-center justify-between text-sm p-3 rounded-xl bg-white/5 hover:bg-[#2ACED1]/10 transition group">
                    <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#2ACED1]" /> Billing API</span>
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
