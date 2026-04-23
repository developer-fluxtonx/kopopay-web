"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Globe2,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Button } from "@/components/atoms/Button";

const heroScreens = [
  {
    id: "checkout",
    eyebrow: "Checkout flow",
    title: "Dynamic checkout optimized for conversion",
    detail: "Cards, wallets, bank methods, and local payment options adapt automatically.",
    stats: [
      { label: "Conversion uplift", value: "+8.4%" },
      { label: "Markets live", value: "46" },
    ],
    methods: ["Cards", "Apple Pay", "Bank debit", "Local methods"],
    sidePanel: {
      title: "Checkout activity",
      rows: [
        ["Smart routing", "Enabled"],
        ["Wallet match", "High"],
        ["Guest checkout", "On"],
      ],
    },
  },
  {
    id: "ops",
    eyebrow: "Payment operations",
    title: "Unified payment activity across regions",
    detail: "Track approvals, retries, disputes, and payout timing from one clean workspace.",
    stats: [
      { label: "Approval rate", value: "98.2%" },
      { label: "Dispute trend", value: "-19%" },
    ],
    methods: ["Monitoring", "Retries", "Recovery", "Payouts"],
    sidePanel: {
      title: "Operations feed",
      rows: [
        ["Retries recovered", "$42k"],
        ["Disputes escalated", "3"],
        ["Payout batches", "12"],
      ],
    },
  },
  {
    id: "methods",
    eyebrow: "Method orchestration",
    title: "Show the right payment method at the right moment",
    detail: "Intelligent routing surfaces the strongest local and global payment options per customer.",
    stats: [
      { label: "Methods active", value: "100+" },
      { label: "Wallet share", value: "34%" },
    ],
    methods: ["Wallets", "Cards", "Bank pay", "Installments"],
    sidePanel: {
      title: "Method signals",
      rows: [
        ["Top wallet", "Apple Pay"],
        ["Local leader", "Bank debit"],
        ["Fallback path", "Cards"],
      ],
    },
  },
];

const featureCards = [
  {
    title: "Global reach",
    copy: "Accept payments in major markets with local methods, currency support, and one unified platform.",
    icon: Globe2,
  },
  {
    title: "Convert more customers",
    copy: "Improve checkout performance with smart method ordering, cleaner payment flows, and fewer drop-offs.",
    icon: ShoppingBag,
  },
  {
    title: "Less fraud",
    copy: "Combine built-in fraud controls with practical operational visibility to reduce risky payment volume.",
    icon: ShieldCheck,
  },
  {
    title: "Move faster and lower costs",
    copy: "Ship payments, reporting, and automation from one platform instead of stitching disconnected systems.",
    icon: Zap,
  },
];

const brands = [
  { name: "Amazon", logo: "/brand-logos/amazon.svg" },
  { name: "BMW", logo: "/brand-logos/bmw.svg" },
  { name: "Toyota", logo: "/brand-logos/toyota.svg" },
  { name: "Shopify", logo: "/brand-logos/shopify.svg" },
  { name: "Airbnb", logo: "/brand-logos/airbnb.svg" },
  { name: "Spotify", logo: "/brand-logos/spotify.svg" },
];

const acceptWays = [
  {
    title: "Hosted checkout",
    copy: "Launch quickly with a polished payment experience that is easy to activate and optimize.",
    icon: CreditCard,
    points: ["Prebuilt payment page", "Wallets and cards", "Fast setup"],
  },
  {
    title: "Embedded payments",
    copy: "Keep customers inside your product with components for mobile, web, and platform surfaces.",
    icon: Smartphone,
    points: ["Native product UX", "Flexible components", "Cross-platform"],
  },
  {
    title: "In-person payments",
    copy: "Extend the same payment system into physical retail, field teams, and in-store operations.",
    icon: Store,
    points: ["Reader support", "Retail workflows", "Unified reporting"],
  },
];

const aiSignals = [
  { label: "Approval optimization", value: "Smart retries recovering high-value payments" },
  { label: "Method intelligence", value: "Adaptive payment method ordering by geography and device" },
  { label: "Risk screening", value: "Suspicious transactions isolated before they damage revenue" },
];

export default function PaymentsPage() {
  const [activeScreen, setActiveScreen] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveScreen((current) => (current + 1) % heroScreens.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#F7FEFF_0%,#E8FAFC_18%,#FFFFFF_100%)] dark:bg-[linear-gradient(180deg,#000C22_0%,#011B3B_42%,#000C22_100%)]">
      <div className="mx-auto max-w-[1360px] px-6 pb-20 pt-4 md:px-8 md:pt-5 lg:px-10 lg:pt-6">
        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <ScrollReveal direction="left">
            <div className="lg:-mt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2ACED1]/25 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#008E96] shadow-sm backdrop-blur-md dark:bg-white/5 dark:text-[#2ACED1]">
                <Zap className="h-4 w-4" />
                Payments
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-[#000C22] dark:text-white md:text-6xl lg:text-7xl">
                Payments built to help modern businesses accept more and scale cleanly.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#000C22]/66 dark:text-[#D8F4F7]/68">
                Accept payments online, optimize conversion, reduce fraud, and expand globally with
                one modern payment platform shaped around KopoPay&apos;s own product language.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" size="lg" className="rounded-full px-8">
                  Start Accepting Payments <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Contact sales
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="absolute -left-8 top-8 h-36 w-36 rounded-full bg-[#2ACED1]/18 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-[#034E78]/16 blur-3xl" />

              <div className="relative overflow-hidden rounded-[34px] border border-[#2ACED1]/18 bg-[#000C22] p-5 text-white shadow-[0_28px_90px_rgba(0,12,34,0.24)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2ACED1]/78">
                      Payment workspace
                    </p>
                    <p className="mt-2 text-xl font-bold">Live product surfaces for modern commerce</p>
                  </div>
                  <div className="rounded-full bg-[#2ACED1]/12 px-3 py-1 text-xs font-semibold text-[#7CF7F8]">
                    Auto rotating
                  </div>
                </div>

                <div className="mt-5 min-h-[430px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={heroScreens[activeScreen].id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="grid gap-4"
                    >
                      <div className="rounded-[26px] border border-white/10 bg-white/6 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2ACED1]/75">
                              {heroScreens[activeScreen].eyebrow}
                            </p>
                            <h2 className="mt-3 text-2xl font-bold">
                              {heroScreens[activeScreen].title}
                            </h2>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-white/66">
                              {heroScreens[activeScreen].detail}
                            </p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <CreditCard className="h-6 w-6 text-[#2ACED1]" />
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {heroScreens[activeScreen].stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="rounded-[20px] border border-white/10 bg-white/5 p-4"
                            >
                              <p className="text-xs uppercase tracking-[0.18em] text-white/42">
                                {stat.label}
                              </p>
                              <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
                        <div className="rounded-[26px] border border-white/10 bg-white/6 p-5">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-white">Checkout preview</p>
                            <span className="rounded-full bg-[#2ACED1]/12 px-3 py-1 text-xs font-semibold text-[#7CF7F8]">
                              Live methods
                            </span>
                          </div>
                          <div className="mt-5 space-y-3">
                            {heroScreens[activeScreen].methods.map((method, index) => (
                              <div
                                key={method}
                                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2ACED1]/10 text-[#2ACED1]">
                                    <CheckCircle2 className="h-4 w-4" />
                                  </div>
                                  <span className="text-sm text-white/72">{method}</span>
                                </div>
                                <span className="text-xs text-white/42">0{index + 1}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <div className="rounded-[26px] border border-white/10 bg-white/6 p-5">
                            <p className="text-sm font-semibold text-white">Method mix</p>
                            <div className="mt-5 h-32 rounded-[20px] border border-white/10 bg-[#021733] p-4">
                              <div className="grid h-full grid-cols-4 items-end gap-3">
                                {[66, 84, 58, 76].map((height, index) => (
                                  <div key={`${height}-${index}`} className="flex h-full flex-col justify-end gap-2">
                                    <div
                                      className="rounded-t-[14px] bg-gradient-to-t from-[#008E96] to-[#6FF5F7]"
                                      style={{ height: `${height}%` }}
                                    />
                                    <span className="text-center text-[11px] text-white/42">
                                      {["Cards", "Wallets", "Bank", "Local"][index]}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="rounded-[26px] border border-white/10 bg-white/6 p-5">
                            <p className="text-sm font-semibold text-white">
                              {heroScreens[activeScreen].sidePanel.title}
                            </p>
                            <div className="mt-4 space-y-3">
                              {heroScreens[activeScreen].sidePanel.rows.map(([label, value]) => (
                                <div
                                  key={label}
                                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                                >
                                  <span className="text-sm text-white/64">{label}</span>
                                  <span className="text-sm font-semibold text-white">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <ScrollReveal key={card.title} delay={index * 0.06}>
                <div className="rounded-[30px] border border-[#2ACED1]/12 bg-white/78 p-6 shadow-[0_18px_44px_rgba(0,12,34,0.05)] backdrop-blur-md transition duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#008E96] dark:text-[#2ACED1]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#000C22] dark:text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#000C22]/62 dark:text-[#D8F4F7]/62">
                    {card.copy}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </section>

        <section className="mt-16">
          <ScrollReveal>
            <div className="rounded-[32px] border border-[#2ACED1]/12 bg-white/78 p-6 shadow-[0_18px_44px_rgba(0,12,34,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008E96] dark:text-[#2ACED1]">
                    Trusted by commerce leaders
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-[#000C22] dark:text-white">
                    Payment infrastructure used by ambitious digital brands
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-[#000C22]/62 dark:text-[#D8F4F7]/62">
                  Purpose-built for teams that care about reliability, conversion, and a cleaner
                  global payments stack.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex items-center gap-4 rounded-[24px] border border-black/5 bg-[#F8FEFF] px-5 py-5 shadow-sm dark:border-white/10 dark:bg-[#021733]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-white/10">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={44}
                        height={44}
                        className="h-11 w-11 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#000C22] dark:text-white">{brand.name}</p>
                      <p className="text-sm text-[#000C22]/52 dark:text-[#D8F4F7]/52">Commerce leader</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <ScrollReveal direction="left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008E96] dark:text-[#2ACED1]">
                Online payments
              </p>
              <h2 className="mt-3 text-4xl font-bold text-[#000C22] dark:text-white">
                Try the demo and see how payment flows can feel faster, cleaner, and easier to trust.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#000C22]/62 dark:text-[#D8F4F7]/62">
                Explore a checkout experience built to reduce friction, surface stronger payment
                methods, and keep the path to payment completion simple.
              </p>
              <div className="mt-7">
                <Button variant="primary" size="lg" className="rounded-full px-8">
                  Try the demo <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="rounded-[32px] border border-[#2ACED1]/14 bg-[#000C22] p-6 text-white shadow-[0_28px_90px_rgba(0,12,34,0.24)] dark:bg-[#021733]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Demo checkout</p>
                <span className="rounded-full bg-[#2ACED1]/12 px-3 py-1 text-xs font-semibold text-[#7CF7F8]">
                  Sandbox
                </span>
              </div>
              <div className="mt-5 rounded-[26px] border border-white/10 bg-white/6 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-white/58">KopoPay Commerce</p>
                    <p className="mt-1 text-2xl font-bold">$128.00</p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-[#2ACED1]" />
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    ["Card details", "•••• 4242"],
                    ["Billing address", "California, US"],
                    ["Wallet options", "Apple Pay enabled"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="text-sm text-white/64">{label}</span>
                      <span className="text-sm font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-gradient-action-button px-5 py-4">
                  <span className="text-sm font-semibold text-white">Pay now</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="mt-16">
          <ScrollReveal>
            <div className="rounded-[34px] border border-[#2ACED1]/12 bg-white/78 p-8 shadow-[0_18px_44px_rgba(0,12,34,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008E96] dark:text-[#2ACED1]">
                  Multiple ways to accept payments online
                </p>
                <h2 className="mt-3 text-4xl font-bold text-[#000C22] dark:text-white">
                  Use the payment surface that matches your business model and speed.
                </h2>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {acceptWays.map((way) => {
                  const Icon = way.icon;

                  return (
                    <div
                      key={way.title}
                      className="rounded-[28px] border border-black/5 bg-[#F8FEFF] p-6 shadow-sm transition duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[#021733]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#008E96] dark:text-[#2ACED1]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-[#000C22] dark:text-white">{way.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#000C22]/62 dark:text-[#D8F4F7]/62">
                        {way.copy}
                      </p>
                      <div className="mt-5 rounded-[22px] border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-[#011B3B]">
                        <div className="space-y-3">
                          {way.points.map((point) => (
                            <div
                              key={point}
                              className="flex items-center justify-between rounded-xl bg-[#F8FEFF] px-3 py-3 text-sm dark:bg-white/5"
                            >
                              <span className="text-[#000C22]/65 dark:text-[#D8F4F7]/65">{point}</span>
                              <ChevronRight className="h-4 w-4 text-[#2ACED1]" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="mt-16 rounded-[34px] border border-[#2ACED1]/14 bg-[#000C22] p-8 text-white shadow-[0_28px_90px_rgba(0,12,34,0.24)] dark:bg-[#021733]">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2ACED1]/78">
                  Powerful AI-powered optimization
                </p>
                <h2 className="mt-3 text-4xl font-bold">
                  Increase revenue and reduce payment friction with smarter decisioning.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/66">
                  Use payment intelligence to improve authorization outcomes, surface the best
                  payment methods, and reduce manual intervention across your payment stack.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-4">
              {aiSignals.map((signal) => (
                <ScrollReveal key={signal.label}>
                  <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#2ACED1]">
                        <Bot className="h-5 w-5" />
                      </div>
                      <p className="text-lg font-semibold text-white">{signal.label}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/64">{signal.value}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
