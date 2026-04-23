"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { 
  Globe, Terminal, Copy, Check, Info, ArrowRight, 
  ShieldCheck, Zap, CreditCard, ChevronRight,
  MapPin, Landmark, DollarSign, Wallet
} from "lucide-react";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const sidebarItems = [
  { label: "Overview", id: "overview" },
  { label: "Local Payment Methods", id: "local-methods" },
  { label: "Currency Conversion", id: "fx" },
  { label: "Dynamic Tax", id: "tax" },
  { label: "Compliance & VAT", id: "compliance" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl bg-[#011B3B] border border-white/10 overflow-hidden mb-6">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="text-white/40 hover:text-white transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-[#2ACED1] overflow-x-auto leading-relaxed">{code}</pre>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InternationalGuide() {
  const [active, setActive] = useState("overview");

  return (
    <div className="min-h-screen bg-[#000C22]">
      {/* Header Banner */}
      <div className="border-b border-white/5 bg-[#011B3B]/60 backdrop-blur-xl px-6 py-6">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-[#2ACED1]" />
              <span className="text-xs font-bold text-[#2ACED1] uppercase tracking-[0.2em]">Global Guide</span>
            </div>
            <h1 className="text-3xl font-bold text-white">International Payments</h1>
          </div>
          <div className="hidden md:flex gap-4">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50">
              API Version: 2026-04-22
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto flex h-[calc(100vh-100px)] overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-white/5 pt-8 pr-4 overflow-y-auto custom-scrollbar h-full">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === item.id
                    ? "bg-[#2ACED1]/15 text-[#2ACED1] border border-[#2ACED1]/20 shadow-[0_0_20px_rgba(42,206,209,0.1)]"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
                {active === item.id && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 px-8 lg:px-12 py-10 overflow-y-auto custom-scrollbar h-full">
          <ScrollReveal>
            <section id="overview" className="mb-20">
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Global Expansion</h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                Kopo Pay enables businesses to accept payments from customers in 150+ countries and 135+ currencies. 
                Our infrastructure automatically handles currency conversion, local payment regulations, and high-performance routing 
                to ensure the best conversion rates for your international customers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Landmark className="w-6 h-6 text-[#2ACED1] mb-4" />
                  <h3 className="text-white font-bold mb-2 text-sm">Local Acquiring</h3>
                  <p className="text-xs text-white/50 leading-relaxed">Lower fees and higher authorization rates through localized processing.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Wallet className="w-6 h-6 text-[#2ACED1] mb-4" />
                  <h3 className="text-white font-bold mb-2 text-sm">Alternative PMs</h3>
                  <p className="text-xs text-white/50 leading-relaxed">Accept iDEAL, Bancontact, Giropay, and dozens more with a single API.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <DollarSign className="w-6 h-6 text-[#2ACED1] mb-4" />
                  <h3 className="text-white font-bold mb-2 text-sm">Instant FX</h3>
                  <p className="text-xs text-white/50 leading-relaxed">Receive funds in your preferred currency at competitive market rates.</p>
                </div>
              </div>
            </section>

            <section id="local-methods" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Local Payment Methods</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Cards are just the beginning. In many markets, digital wallets and bank redirects are the preferred way to pay.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded bg-[#2ACED1]/10 flex items-center justify-center text-[#2ACED1] font-bold">EU</div>
                  <div>
                    <h4 className="text-white text-sm font-bold">Europe</h4>
                    <p className="text-[10px] text-white/40">iDEAL, SEPA, Bancontact, Sofort</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded bg-[#2ACED1]/10 flex items-center justify-center text-[#2ACED1] font-bold">AS</div>
                  <div>
                    <h4 className="text-white text-sm font-bold">Asia</h4>
                    <p className="text-[10px] text-white/40">Alipay, WeChat Pay, GrabPay</p>
                  </div>
                </div>
              </div>
              <h4 className="text-sm font-bold text-white mb-3">Enabling a Local Method</h4>
              <CodeBlock 
                label="Node.js"
                code={`const paymentIntent = await kopopay.paymentIntents.create({
  amount: 1099,
  currency: 'eur',
  payment_method_types: ['ideal', 'card'],
});`}
              />
            </section>

            <section id="fx" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Currency Conversion</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                You can charge customers in their local currency while receiving settlements in your base currency.
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-5">
                <Zap className="w-6 h-6 text-[#2ACED1] flex-shrink-0" />
                <div>
                  <h4 className="text-white font-bold mb-2">Adaptive Pricing</h4>
                  <p className="text-sm text-white/50 leading-relaxed">
                    Show localized prices (e.g., £9.99 vs $12.50) to increase conversion by up to 25%. Kopo Pay handles the math and the risk.
                  </p>
                </div>
              </div>
            </section>

            <section id="tax" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Dynamic Tax</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Automatically calculate and collect VAT, GST, and Sales Tax based on the customer's location.
              </p>
              <CodeBlock 
                label="Node.js"
                code={`const taxCalculation = await kopopay.tax.calculations.create({
  currency: 'usd',
  line_items: [{ amount: 2000, reference: 'L1' }],
  customer_details: {
    address: {
      country: 'FR',
      postal_code: '75001'
    }
  }
});`}
              />
            </section>

            <section id="compliance" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Compliance & VAT</h2>
              <div className="p-6 rounded-2xl bg-[#2ACED1]/5 border border-[#2ACED1]/20">
                <h4 className="text-[#2ACED1] font-bold mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Regulatory Readiness
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  We handle SCA (Strong Customer Authentication) requirements in Europe and compliance reporting in Asia-Pacific markets, 
                  so you can focus on your product, not regulation.
                </p>
              </div>
            </section>

            <div className="pt-10 border-t border-white/5 flex items-center justify-between">
              <div className="text-sm text-white/40 italic">Last updated: April 22, 2026</div>
              <Link href="/sdk/libraries" className="flex items-center gap-2 text-sm font-bold text-[#2ACED1] hover:gap-3 transition-all">
                Next: SDK Libraries <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </main>
      </div>
    </div>
  );
}
