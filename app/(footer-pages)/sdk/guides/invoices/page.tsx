"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { 
  Receipt, Terminal, Copy, Check, Info, ArrowRight, 
  ShieldCheck, FileText, Zap, CreditCard, ChevronRight,
  Clock, Calendar, DollarSign, Percent
} from "lucide-react";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const sidebarItems = [
  { label: "Overview", id: "overview" },
  { label: "One-off Invoices", id: "oneoff" },
  { label: "Recurring Invoicing", id: "recurring" },
  { label: "Tax & Discounts", id: "tax" },
  { label: "Payment Collection", id: "collection" },
  { label: "Webhooks", id: "webhooks" },
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

export default function InvoicesGuide() {
  const [active, setActive] = useState("overview");

  return (
    <div className="min-h-screen bg-[#000C22]">
      {/* Header Banner */}
      <div className="border-b border-white/5 bg-[#011B3B]/60 backdrop-blur-xl px-6 py-6">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="w-4 h-4 text-[#2ACED1]" />
              <span className="text-xs font-bold text-[#2ACED1] uppercase tracking-[0.2em]">Invoicing Guide</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Billing & Invoicing</h1>
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
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Overview</h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                Kopo Pay Invoicing is a complete billing solution that automates payment collection, PDF generation, and revenue reporting. 
                Whether you're sending a one-off invoice for professional services or managing thousands of recurring subscription bills, 
                our API handles the entire lifecycle.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Clock className="w-6 h-6 text-[#2ACED1] mb-4" />
                  <h3 className="text-white font-bold mb-2 text-sm">Auto-Collection</h3>
                  <p className="text-xs text-white/50 leading-relaxed">Automatically charge stored payment methods on the due date.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <FileText className="w-6 h-6 text-[#2ACED1] mb-4" />
                  <h3 className="text-white font-bold mb-2 text-sm">PDF Generation</h3>
                  <p className="text-xs text-white/50 leading-relaxed">Professional, platform-branded PDFs generated for every invoice.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Percent className="w-6 h-6 text-[#2ACED1] mb-4" />
                  <h3 className="text-white font-bold mb-2 text-sm">Global Tax</h3>
                  <p className="text-xs text-white/50 leading-relaxed">Automatic tax calculation based on customer location.</p>
                </div>
              </div>
            </section>

            <section id="oneoff" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">One-off Invoices</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Send a manual invoice to a customer for a specific purchase or service.
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2ACED1]" />
                    Step 1: Create an Invoice
                  </h4>
                  <CodeBlock 
                    label="Node.js"
                    code={`const invoice = await kopopay.invoices.create({
  customer: 'cus_123',
  description: 'Consulting Services - April',
});`}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2ACED1]" />
                    Step 2: Add Invoice Items
                  </h4>
                  <CodeBlock 
                    label="Node.js"
                    code={`const item = await kopopay.invoiceItems.create({
  customer: 'cus_123',
  invoice: invoice.id,
  amount: 5000,
  currency: 'usd',
  description: '5 hours of professional consulting',
});`}
                  />
                </div>
              </div>
            </section>

            <section id="recurring" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Recurring Invoicing</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                For subscriptions, Kopo Pay generates invoices automatically at the start of every billing cycle.
              </p>
              <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 mb-8">
                <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Subscription Lifecycle
                </h4>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">T-3</div>
                    <p className="text-xs text-white/60">`invoice.upcoming` event fires. Great for notifying customers about upcoming charges.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">T=0</div>
                    <p className="text-xs text-white/60">`invoice.created` event fires. The invoice is drafted and finalized.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0">T+1</div>
                    <p className="text-xs text-white/60">`invoice.paid` event fires once payment is successfully collected.</p>
                  </li>
                </ul>
              </div>
            </section>

            <section id="tax" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Tax & Discounts</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Apply tax rates and coupons to your invoices with simple API parameters.
              </p>
              <CodeBlock 
                label="Node.js"
                code={`const invoice = await kopopay.invoices.create({
  customer: 'cus_123',
  default_tax_rates: ['txr_vat_20'],
  discounts: [{ coupon: 'SPRING_SALE_2026' }],
});`}
              />
            </section>

            <section id="collection" className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-6">Payment Collection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Zap className="w-6 h-6 text-[#2ACED1] mb-4" />
                  <h4 className="text-white font-bold mb-2">Auto-Collection</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Charge the saved card on file. If it fails, Kopo Pay triggers Smart Retries.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Calendar className="w-6 h-6 text-[#2ACED1] mb-4" />
                  <h4 className="text-white font-bold mb-2">Send for Payment</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Email the invoice to the customer with a link to a hosted payment page.</p>
                </div>
              </div>
            </section>

            <div className="pt-10 border-t border-white/5 flex items-center justify-between">
              <div className="text-sm text-white/40 italic">Last updated: April 22, 2026</div>
              <Link href="/sdk/guides/international" className="flex items-center gap-2 text-sm font-bold text-[#2ACED1] hover:gap-3 transition-all">
                Next: International Payments <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </main>
      </div>
    </div>
  );
}
