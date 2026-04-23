"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { 
  Users, Terminal, Copy, Check, Info, ArrowRight, 
  ShieldCheck, Globe, Zap, CreditCard, ChevronRight,
  Search, BookOpen, Layers, Code, LifeBuoy
} from "lucide-react";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const sidebarItems = [
  { label: "Introduction", id: "intro" },
  { label: "Account Types", id: "accounts" },
  { label: "Onboarding", id: "onboarding" },
  { label: "Creating Charges", id: "charges" },
  { label: "Split Payments", id: "splits" },
  { label: "Payouts", id: "payouts" },
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

export default function ConnectGuide() {
  const [active, setActive] = useState("intro");

  return (
    <div className="min-h-screen bg-[#000C22]">
      {/* Header Banner */}
      <div className="border-b border-white/5 bg-[#011B3B]/60 backdrop-blur-xl px-6 py-6">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-[#2ACED1]" />
              <span className="text-xs font-bold text-[#2ACED1] uppercase tracking-[0.2em]">Connect Guide</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Marketplaces & Platforms</h1>
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

          <div className="mt-auto pb-10 px-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2ACED1]/10 to-transparent border border-[#2ACED1]/20">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">Need help?</p>
              <p className="text-xs text-white/60 leading-relaxed mb-3">Our solution architects can help you design your platform.</p>
              <button className="text-xs font-bold text-[#2ACED1] flex items-center gap-1 hover:gap-2 transition-all">
                Contact Sales <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 px-8 lg:px-12 py-10 overflow-y-auto custom-scrollbar h-full">
          <ScrollReveal>
            <section id="intro" className="mb-20">
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Introduction</h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                Kopo Pay Connect is the fastest and easiest way to integrate payments into your software platform or marketplace. 
                Whether you're building a SaaS for hair salons, an e-commerce marketplace like Shopify, or a ride-sharing app, 
                Connect handles onboarding, global money movement, and regulatory complexity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Globe className="w-8 h-8 text-[#2ACED1] mb-4" />
                  <h3 className="text-white font-bold mb-2">Global Onboarding</h3>
                  <p className="text-sm text-white/50 leading-relaxed">Onboard sellers and service providers in 150+ countries with localized KYC/KYB flows.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Zap className="w-8 h-8 text-[#2ACED1] mb-4" />
                  <h3 className="text-white font-bold mb-2">Flexible Split Payments</h3>
                  <p className="text-sm text-white/50 leading-relaxed">Automatically split a single transaction between multiple sellers and take your platform fee.</p>
                </div>
              </div>
            </section>

            <section id="accounts" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Connect Account Types</h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Choose the account type that best fits your platform's user experience and business model.
              </p>
              <div className="space-y-4">
                <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 rounded bg-[#2ACED1]/20 text-[#2ACED1] text-[10px] font-bold uppercase tracking-widest">Standard</span>
                    <h4 className="text-white font-bold text-lg">Express Accounts</h4>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    Recommended for most marketplaces. Kopo Pay handles the onboarding UI and dashboard for your sellers. 
                    Best for low operational overhead.
                  </p>
                  <ul className="text-xs text-white/40 space-y-2">
                    <li className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-400" /> Pre-built onboarding UI</li>
                    <li className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-400" /> Platform-branded dashboard</li>
                    <li className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-400" /> Automatic tax reporting</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest">Advanced</span>
                    <h4 className="text-white font-bold text-lg">Custom Accounts</h4>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    Full control over the entire user experience. Your platform collects the KYC information and provides the dashboard. 
                    Requires more development effort and compliance knowledge.
                  </p>
                  <ul className="text-xs text-white/40 space-y-2">
                    <li className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-400" /> White-label everything</li>
                    <li className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-400" /> Full control over money movement</li>
                    <li className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-400" /> API-based data collection</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="onboarding" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Onboarding Sellers</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Use **Account Links** to safely redirect users to Kopo Pay's onboarding flow and back to your site.
              </p>
              <CodeBlock 
                label="Node.js"
                code={`const accountLink = await kopopay.accountLinks.create({
  account: 'acct_123...',
  refresh_url: 'https://example.com/reauth',
  return_url: 'https://example.com/return',
  type: 'account_onboarding',
});`}
              />
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-emerald-400 font-bold">Secure Redirects</h4>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  Account links expire after use or after a short duration. Never store these links; always generate them on-demand.
                </p>
              </div>
            </section>

            <section id="charges" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Creating Charges</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                There are three ways to create charges on Connect. **Destination Charges** are the most common.
              </p>
              <CodeBlock 
                label="Node.js"
                code={`const paymentIntent = await kopopay.paymentIntents.create({
  amount: 10000,
  currency: 'usd',
  payment_method_types: ['card'],
  transfer_data: {
    destination: 'acct_123...', // The seller's account ID
  },
  application_fee_amount: 1230, // Your platform's cut (12.30 USD)
});`}
              />
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-4">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-sm text-white/70 leading-relaxed">
                  In a Destination Charge, the platform is the merchant of record, and the funds are automatically transferred to the seller's account minus your fee.
                </p>
              </div>
            </section>

            <section id="splits" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Split Payments</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                For complex orders involving multiple sellers, use **Separate Charges and Transfers**.
              </p>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[#2ACED1] flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Create the charge on the platform</h4>
                    <p className="text-sm text-white/50 leading-relaxed">Charge the customer for the full order amount (e.g., $100).</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[#2ACED1] flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Create multiple transfers</h4>
                    <p className="text-sm text-white/50 leading-relaxed">Transfer $40 to Seller A and $50 to Seller B. The platform keeps the remaining $10.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="payouts" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Payout Schedules</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Control when your sellers get paid. You can use Kopo Pay's automatic schedules or trigger manual payouts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#2ACED1]/30 transition">
                  <h5 className="text-white font-bold mb-1">Automatic Daily</h5>
                  <p className="text-xs text-white/40">Funds are paid out every day as they become available.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#2ACED1]/30 transition">
                  <h5 className="text-white font-bold mb-1">Instant Payouts</h5>
                  <p className="text-xs text-white/40">Push funds to a debit card in seconds (where supported).</p>
                </div>
              </div>
            </section>

            <div className="pt-10 border-t border-white/5 flex items-center justify-between">
              <div className="text-sm text-white/40 italic">Last updated: April 22, 2026</div>
              <Link href="/sdk/api-reference/customers" className="flex items-center gap-2 text-sm font-bold text-[#2ACED1] hover:gap-3 transition-all">
                Next: Customers API <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </main>
      </div>
    </div>
  );
}
