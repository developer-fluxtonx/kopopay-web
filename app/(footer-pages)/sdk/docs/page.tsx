"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import Link from "next/link";
import {
  BookOpen, Zap, Code, Globe, Shield, RefreshCcw, CreditCard,
  Terminal, Layers, FileText, ArrowRight, Users, LifeBuoy,
  PlayCircle, Puzzle, ChevronRight
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const quickstart = [
  { icon: <Zap className="w-5 h-5 text-[#2ACED1]" />, title: "Accept a payment", desc: "Set up a checkout flow and accept your first payment in minutes.", href: "/sdk/guides/accept-a-payment" },
  { icon: <RefreshCcw className="w-5 h-5 text-[#2ACED1]" />, title: "Set up a subscription", desc: "Create a recurring billing plan and start charging customers automatically.", href: "/sdk/guides/subscriptions" },
  { icon: <Globe className="w-5 h-5 text-[#2ACED1]" />, title: "Send global payouts", desc: "Pay out to contractors, sellers, or service providers worldwide.", href: "/sdk/guides/payouts" },
];

const categories = [
  {
    title: "Payments",
    icon: <Zap className="w-5 h-5" />,
    color: "#2ACED1",
    desc: "Core checkout flows and payment processing.",
    links: [
      { label: "Accept a payment", href: "/sdk/guides/accept-a-payment" },
      { label: "Connect (Marketplaces)", href: "/sdk/guides/connect" },
      { label: "Payment Methods", href: "/sdk/api-reference/payment-methods" },
      { label: "Refunds", href: "/sdk/api-reference/refunds" },
    ],
  },
  {
    title: "Billing",
    icon: <RefreshCcw className="w-5 h-5" />,
    color: "#034E78",
    desc: "Recurring subscriptions and invoice management.",
    links: [
      { label: "Subscriptions Guide", href: "/sdk/guides/subscriptions" },
      { label: "Invoicing Guide", href: "/sdk/guides/invoices" },
      { label: "Products & Prices", href: "/sdk/api-reference/products" },
      { label: "Revenue Recovery", href: "/sdk/guides/invoices#recovery" },
    ],
  },
  {
    title: "Security & Fraud",
    icon: <Shield className="w-5 h-5" />,
    color: "#008E96",
    desc: "Protect your business with fraud detection and 3D Secure.",
    links: [
      { label: "Disputes Guide", href: "/sdk/api-reference/disputes" },
      { label: "Radar Rules", href: "/sdk/api-reference/radar" },
      { label: "3D Secure", href: "/sdk/api-reference/3d-secure" },
      { label: "Identity Verification", href: "/sdk/api-reference/identity" },
    ],
  },
  {
    title: "Customers & Global",
    icon: <Globe className="w-5 h-5" />,
    color: "#2ACED1",
    desc: "Manage global customers and multi-currency payouts.",
    links: [
      { label: "Customers API", href: "/sdk/api-reference/customers" },
      { label: "Payouts Guide", href: "/sdk/guides/payouts" },
      { label: "International Guide", href: "/sdk/guides/international" },
      { label: "Global Balances", href: "/sdk/api-reference/balances" },
    ],
  },
  {
    title: "Developer Tools",
    icon: <Code className="w-5 h-5" />,
    color: "#008E96",
    desc: "Webhooks, CLI, testing, and API keys.",
    links: [
      { label: "Webhooks Guide", href: "/sdk/guides/webhooks" },
      { label: "SDK Libraries", href: "/sdk/libraries" },
      { label: "API Keys", href: "/sdk/api-reference/authentication" },
      { label: "API Logs", href: "/dashboard/developer/logs" },
    ],
  },
];

const sdkGuides = [
  { name: "Node.js", install: "npm install kopopay-node", href: "/sdk/libraries", color: "#339933" },
  { name: "Python", install: "pip install kopopay", href: "/sdk/libraries", color: "#3776AB" },
  { name: "Go", install: "go get github.com/kopopay/kopopay-go", href: "/sdk/libraries", color: "#00ACD7" },
  { name: "Ruby", install: "gem install kopopay", href: "/sdk/libraries", color: "#CC342D" },
  { name: "PHP", install: "composer require kopopay/kopopay-php", href: "/sdk/libraries", color: "#777BB4" },
  { name: "Java", install: "implementation 'com.kopopay:kopopay-java:22.0.0'", href: "/sdk/libraries", color: "#ED8B00" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SdkDocsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 pb-20">

      {/* Hero */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14A9AE]/10 border border-[#2ACED1]/30 mb-8 mt-12">
            <BookOpen className="w-4 h-4 text-[#2ACED1]" />
            <span className="text-xs font-semibold tracking-wide text-[#000C22] dark:text-[#D8F4F7]">Documentation Hub</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight leading-tight">
            Build faster with <span className="text-[#2ACED1]">Kopo Pay</span>
          </h1>
          <p className="text-lg text-[#000C22]/70 dark:text-[#D8F4F7]/70 mb-10">
            Everything you need to integrate payments, billing, and financial services into your product.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/sdk/api-reference"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2ACED1] text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:bg-[#14A9AE] transition-all duration-300"
            >
              API Reference <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sdk/libraries"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#2ACED1]/30 text-[#000C22] dark:text-white font-semibold hover:border-[#2ACED1] hover:bg-[#2ACED1]/5 transition-all duration-300"
            >
              <Layers className="w-4 h-4 text-[#2ACED1]" /> SDK Libraries
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Quickstart */}
      <ScrollReveal delay={0.05}>
        <h2 className="text-xl font-bold text-[#000C22] dark:text-white mb-6 flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-[#2ACED1]" /> Start here
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {quickstart.map((q, i) => (
            <Link key={i} href={q.href}>
              <div className="group bg-white/40 dark:bg-[#011B3B]/40 border border-[#2ACED1]/15 rounded-2xl p-6 hover:border-[#2ACED1]/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer h-full flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2ACED1]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {q.icon}
                </div>
                <h3 className="font-bold text-[#000C22] dark:text-white">{q.title}</h3>
                <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 leading-relaxed flex-1">{q.desc}</p>
                <div className="flex items-center text-xs font-bold text-[#2ACED1] gap-1 group-hover:gap-2 transition-all">
                  Get started <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* Browse by topic */}
      <ScrollReveal delay={0.05}>
        <h2 className="text-xl font-bold text-[#000C22] dark:text-white mb-6 flex items-center gap-2">
          <Puzzle className="w-5 h-5 text-[#2ACED1]" /> Browse by topic
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
          {categories.map((cat, i) => (
            <ScrollReveal key={i} direction="bottom" delay={0.05 * i}>
              <div
                className="group bg-white/40 dark:bg-[#011B3B]/40 border border-[#2ACED1]/10 rounded-3xl p-7 hover:border-[#2ACED1]/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 h-full flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                  style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg text-[#000C22] dark:text-white mb-2">{cat.title}</h3>
                <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 mb-5 leading-relaxed flex-1">{cat.desc}</p>
                <ul className="space-y-2">
                  {cat.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between text-sm text-[#000C22]/70 dark:text-[#D8F4F7]/60 hover:text-[#2ACED1] dark:hover:text-[#2ACED1] transition-colors py-1 border-b border-[#2ACED1]/5 group/link"
                      >
                        {link.label}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      {/* SDK Quick Install */}
      <ScrollReveal delay={0.05}>
        <h2 className="text-xl font-bold text-[#000C22] dark:text-white mb-6 flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-[#2ACED1]" /> Official Libraries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {sdkGuides.map((sdk, i) => (
            <Link key={i} href={sdk.href}>
              <div className="group flex items-center gap-4 bg-white/40 dark:bg-[#011B3B]/40 border border-[#2ACED1]/10 rounded-2xl p-4 hover:border-[#2ACED1]/50 transition-all duration-300 cursor-pointer">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: sdk.color }}
                >
                  {sdk.name.slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-[#000C22] dark:text-white mb-1">{sdk.name}</p>
                  <code className="text-xs font-mono text-[#000C22]/50 dark:text-[#D8F4F7]/40 truncate block">{sdk.install}</code>
                </div>
                <ChevronRight className="w-4 h-4 text-[#2ACED1] opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* Bottom CTA row */}
      <ScrollReveal delay={0.05}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Link href="/sdk/api-reference">
            <div className="group flex items-center gap-5 bg-gradient-to-r from-[#2ACED1]/10 to-transparent border border-[#2ACED1]/20 rounded-3xl p-7 hover:border-[#2ACED1]/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer">
              <Code className="w-10 h-10 text-[#2ACED1] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#000C22] dark:text-white mb-1">API Reference</h3>
                <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60">Complete reference for all endpoints, parameters, and response shapes.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#2ACED1] ml-auto opacity-0 group-hover:opacity-100 transition" />
            </div>
          </Link>
          <Link href="/support">
            <div className="group flex items-center gap-5 bg-gradient-to-r from-[#034E78]/10 to-transparent border border-[#034E78]/20 rounded-3xl p-7 hover:border-[#034E78]/50 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300 cursor-pointer">
              <LifeBuoy className="w-10 h-10 text-[#034E78] dark:text-[#2ACED1] flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[#000C22] dark:text-white mb-1">Get Support</h3>
                <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60">Our team is available 24/7 to help you build and resolve issues.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#2ACED1] ml-auto opacity-0 group-hover:opacity-100 transition" />
            </div>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
