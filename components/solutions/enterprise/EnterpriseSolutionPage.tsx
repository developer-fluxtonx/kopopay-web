"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CreditCard,
  CheckCircle2,
  Globe2,
  Layers3,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";

const logoCloud = [
  "BMW",
  "Toyota",
  "Amazon",
  "Shopify",
  "Airbnb",
  "Spotify",
  "Adobe",
  "Nike",
  "Target",
  "Netflix",
  "IKEA",
  "Salesforce",
];

const outcomeCards = [
  {
    title: "Global payment orchestration",
    copy: "Route local and international flows through one enterprise-ready payment layer.",
    icon: Globe2,
  },
  {
    title: "Finance automation at scale",
    copy: "Unify billing, invoicing, payouts, and reporting without stitching fragmented tools.",
    icon: Layers3,
  },
  {
    title: "Security and control",
    copy: "Protect critical revenue rails with configurable controls, approvals, and audit visibility.",
    icon: ShieldCheck,
  },
];

const enterpriseStats = [
  { label: "Markets activated", value: "42", detail: "Live regions with local payment coverage" },
  { label: "Approval uplift", value: "+11%", detail: "Smart retry and route optimization" },
  { label: "Finance hours saved", value: "320/mo", detail: "Automated reconciliation and reporting" },
];

const slidingSignals = [
  { title: "Authorization health", metric: "98.4%", change: "+2.3%" },
  { title: "Failed payment recovery", metric: "$2.8M", change: "+14.1%" },
  { title: "Enterprise payout SLA", metric: "4.2h", change: "-36%" },
  { title: "Risk review queue", metric: "19", change: "-41%" },
];

const financeTimeline = [
  { month: "Apr", value: 54 },
  { month: "May", value: 71 },
  { month: "Jun", value: 89 },
  { month: "Jul", value: 82 },
];

const financeLinePoints = financeTimeline
  .map((item, index) => {
    const x = financeTimeline.length === 1 ? 50 : (index / (financeTimeline.length - 1)) * 100;
    const y = 100 - item.value;
    return `${x},${y}`;
  })
  .join(" ");

const capabilityColumns = [
  {
    title: "Operational Scale",
    points: [
      "Handle multi-entity payment and payout programs from one control plane.",
      "Support cross-functional teams across finance, operations, and product.",
      "Keep expansion projects aligned through shared reporting and controls.",
    ],
  },
  {
    title: "Executive Visibility",
    points: [
      "Surface business-critical payment KPIs in one place.",
      "Track conversion, recovery, disputes, and payouts in near real time.",
      "Give finance leaders clearer signals before issues hit revenue.",
    ],
  },
  {
    title: "Implementation Readiness",
    points: [
      "Start with existing checkout and billing flows, then layer enterprise orchestration.",
      "Map business units, approval paths, and reporting needs without rebuilding everything.",
      "Use modular product surfaces so teams can scale in phases.",
    ],
  },
];

export function EnterpriseSolutionPage() {
  const marqueeLogos = [...logoCloud, ...logoCloud];

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#F8FEFF_0%,#E6FAFC_24%,#FFFFFF_100%)] dark:bg-[linear-gradient(180deg,#000C22_0%,#011B3B_45%,#000C22_100%)]">
      <div className="mx-auto max-w-[1360px] px-6 pb-20 pt-8 md:px-8 lg:px-10">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-[#000C22]/55 dark:text-[#D8F4F7]/55">
          <Link href="/checkout" className="transition hover:text-[#008E96] dark:hover:text-[#2ACED1]">
            Solutions
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#000C22] dark:text-white">Enterprise</span>
        </div>

        <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <ScrollReveal direction="left">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2ACED1]/25 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#008E96] shadow-sm backdrop-blur-md dark:bg-white/5 dark:text-[#2ACED1]">
                <Building2 className="h-4 w-4" />
                Enterprise Solutions
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-[#000C22] dark:text-white md:text-6xl lg:text-7xl">
                Enterprise payments and financial operations built to scale cleanly.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#000C22]/68 dark:text-[#D8F4F7]/70">
                Bring checkout, subscriptions, invoicing, payouts, reporting, and risk controls into
                one enterprise operating layer. Designed for large teams that need reliability,
                visibility, and room to expand globally.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" size="lg" className="rounded-full px-8">
                  Talk to sales <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link
                  href="/sdk/docs"
                  className="inline-flex items-center rounded-full border border-[#000C22]/10 bg-white/75 px-6 py-3 text-sm font-semibold text-[#000C22] transition hover:border-[#2ACED1]/35 hover:text-[#008E96] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-[#2ACED1]"
                >
                  Explore docs
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {enterpriseStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[26px] border border-[#2ACED1]/12 bg-white/78 p-5 shadow-[0_18px_40px_rgba(0,12,34,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-white/5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#000C22]/45 dark:text-[#D8F4F7]/45">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-[#000C22] dark:text-white">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-[#000C22]/58 dark:text-[#D8F4F7]/58">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-[#2ACED1]/18 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-[#034E78]/16 blur-3xl" />

              <div className="relative overflow-hidden rounded-[34px] border border-[#2ACED1]/18 bg-[#000C22] p-6 text-white shadow-[0_30px_90px_rgba(0,12,34,0.28)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2ACED1]/75">
                      Enterprise control room
                    </p>
                    <h2 className="mt-3 text-2xl font-bold">Revenue, risk, and payout signals in one view</h2>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Sparkles className="h-5 w-5 text-[#2ACED1]" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/62">Global authorization mix</span>
                      <span className="font-semibold text-[#2ACED1]">Healthy</span>
                    </div>
                    <div className="mt-4 h-28">
                      <div className="grid h-full grid-cols-12 items-end gap-2">
                        {[72, 58, 81, 63, 77, 69, 84, 71, 67, 88, 74, 79].map((height, index) => (
                          <div key={`${height}-${index}`} className="group flex h-full items-end">
                            <div
                              className="relative w-full rounded-full bg-gradient-to-t from-[#2ACED1] to-[#6FF5F7] transition duration-200 group-hover:brightness-110"
                              style={{ height: `${height}%` }}
                            >
                              <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#021733] px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-md transition duration-200 group-hover:opacity-100">
                                {height}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {slidingSignals.map((signal, index) => (
                      <motion.div
                        key={signal.title}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.08 }}
                        className="rounded-[22px] border border-white/10 bg-white/6 p-4"
                      >
                        <p className="text-sm text-white/58">{signal.title}</p>
                        <p className="mt-2 text-2xl font-bold text-white">{signal.metric}</p>
                        <div className="mt-2 inline-flex rounded-full bg-[#2ACED1]/12 px-3 py-1 text-xs font-semibold text-[#7CF7F8]">
                          {signal.change}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="mt-16">
          <ScrollReveal>
            <div className="rounded-[30px] border border-[#2ACED1]/12 bg-white/75 p-6 shadow-[0_18px_44px_rgba(0,12,34,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008E96] dark:text-[#2ACED1]">
                    Trusted by modern teams
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-[#000C22] dark:text-white">
                    Enterprise-ready workflows for teams operating at scale
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-[#000C22]/62 dark:text-[#D8F4F7]/62">
                  Inspired by the confidence of Stripe's enterprise storytelling, but shaped for
                  Kopo Pay's own visual language and product mix.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
                <div className="md:col-span-3 xl:col-span-6 overflow-hidden rounded-[24px] border border-black/5 bg-[#F8FEFF] py-3 dark:border-white/10 dark:bg-[#021733]">
                  <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="flex w-max gap-4"
                  >
                    {marqueeLogos.map((logo, index) => (
                      <div
                        key={`${logo}-${index}`}
                        className="flex min-h-16 min-w-[168px] items-center justify-center rounded-[18px] border border-black/5 bg-white px-4 py-4 text-center text-sm font-semibold text-[#000C22]/72 dark:border-white/10 dark:bg-[#011B3B] dark:text-[#D8F4F7]/72"
                      >
                        {logo}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {outcomeCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <ScrollReveal key={card.title} delay={index * 0.08}>
                <div className="rounded-[30px] border border-[#2ACED1]/12 bg-white/78 p-6 shadow-[0_18px_40px_rgba(0,12,34,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-white/5">
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
            <div className="grid gap-6 rounded-[34px] border border-[#2ACED1]/12 bg-white/78 p-8 shadow-[0_18px_44px_rgba(0,12,34,0.06)] backdrop-blur-md xl:grid-cols-[0.98fr_1.02fr] dark:border-white/10 dark:bg-white/5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#008E96] dark:text-[#2ACED1]">
                  Revenue and finance automation
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#000C22] dark:text-white">
                  Connect payment operations with finance-ready reporting and billing control.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#000C22]/62 dark:text-[#D8F4F7]/62">
                  Give revenue teams one clear operating view across collections, invoicing,
                  retries, payouts, and monthly performance. Built to feel like a polished product
                  surface rather than a static marketing block.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[24px] border border-black/5 bg-[#F8FEFF] p-5 dark:border-white/10 dark:bg-[#021733]">
                    <CreditCard className="h-6 w-6 text-[#008E96] dark:text-[#2ACED1]" />
                    <p className="mt-4 text-base font-semibold text-[#000C22] dark:text-white">
                      Payment capture
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#000C22]/58 dark:text-[#D8F4F7]/58">
                      Payment operations and authorization performance in one stream.
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-black/5 bg-[#F8FEFF] p-5 dark:border-white/10 dark:bg-[#021733]">
                    <ReceiptText className="h-6 w-6 text-[#008E96] dark:text-[#2ACED1]" />
                    <p className="mt-4 text-base font-semibold text-[#000C22] dark:text-white">
                      Billing automation
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#000C22]/58 dark:text-[#D8F4F7]/58">
                      Manage invoices, subscription activity, and recovery flows together.
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-black/5 bg-[#F8FEFF] p-5 dark:border-white/10 dark:bg-[#021733]">
                    <WalletCards className="h-6 w-6 text-[#008E96] dark:text-[#2ACED1]" />
                    <p className="mt-4 text-base font-semibold text-[#000C22] dark:text-white">
                      Finance visibility
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#000C22]/58 dark:text-[#D8F4F7]/58">
                      Give finance leaders monthly signals they can act on immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[28px] border border-[#2ACED1]/15 bg-[#000C22] p-5 text-white shadow-[0_24px_60px_rgba(0,12,34,0.24)] dark:bg-[#021733]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2ACED1]/78">
                        Revenue workspace
                      </p>
                      <p className="mt-2 text-xl font-bold">Collections and finance overview</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-[#7CF7F8]">
                      Live
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/58">Monthly collections</p>
                          <p className="mt-2 text-3xl font-bold">$8.4M</p>
                        </div>
                        <div className="rounded-full bg-[#2ACED1]/14 px-3 py-1 text-xs font-semibold text-[#7CF7F8]">
                          +18.6%
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="relative h-44 rounded-[18px] border border-white/10 bg-white/5 px-4 pb-8 pt-4">
                          <div className="pointer-events-none absolute inset-x-4 top-4 bottom-8 grid grid-rows-4">
                            {[0, 1, 2, 3].map((line) => (
                              <div key={line} className="border-t border-white/8" />
                            ))}
                          </div>

                          <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="absolute inset-x-4 top-4 bottom-8 h-[calc(100%-3rem)] w-[calc(100%-2rem)]"
                          >
                            <polyline
                              fill="none"
                              stroke="rgba(111,245,247,0.28)"
                              strokeWidth="5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={financeLinePoints}
                            />
                            <polyline
                              fill="none"
                              stroke="#6FF5F7"
                              strokeWidth="2.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={financeLinePoints}
                            />
                          </svg>

                          <div className="absolute inset-x-4 top-4 bottom-8 flex items-stretch justify-between">
                            {financeTimeline.map((item) => (
                              <div key={item.month} className="group relative flex flex-1 justify-center">
                                <div className="relative h-full w-full">
                                  <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-transparent transition group-hover:bg-[#6FF5F7]/20" />
                                  <div
                                    className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#000C22] bg-[#6FF5F7] shadow-[0_0_0_4px_rgba(111,245,247,0.16)] transition group-hover:scale-110 dark:border-[#021733]"
                                    style={{ top: `calc(${100 - item.value}% - 0.4rem)` }}
                                  />
                                  <div
                                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#021733] px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100"
                                    style={{ top: `calc(${100 - item.value}% - 2.8rem)` }}
                                  >
                                    {item.month}: ${item.value / 10}M
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="absolute inset-x-4 bottom-0 grid grid-cols-4 text-center text-xs text-white/56">
                            {financeTimeline.map((item) => (
                              <span key={item.month}>{item.month}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                      <p className="text-sm text-white/58">Automation queue</p>
                      <div className="mt-4 space-y-3">
                        {[
                          ["Invoice batches", "132 ready"],
                          ["Retry flows", "24 active"],
                          ["Payout reviews", "7 pending"],
                          ["Reconciliation sync", "Synced"],
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
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-black/5 bg-[#F8FEFF] p-5 dark:border-white/10 dark:bg-[#021733]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#008E96] dark:text-[#2ACED1]">
                      Screenshot card
                    </p>
                    <div className="mt-4 rounded-[20px] border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#011B3B]">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                          Payment reconciliation
                        </p>
                        <span className="rounded-full bg-[#2ACED1]/12 px-3 py-1 text-xs font-semibold text-[#008E96] dark:text-[#2ACED1]">
                          Synced
                        </span>
                      </div>
                      <div className="mt-4 space-y-2">
                        {["Captured payments", "Refund adjustments", "Tax mapping"].map((item) => (
                          <div
                            key={item}
                            className="flex items-center justify-between rounded-2xl bg-[#F8FEFF] px-3 py-3 text-sm dark:bg-white/5"
                          >
                            <span className="text-[#000C22]/65 dark:text-[#D8F4F7]/65">{item}</span>
                            <span className="font-semibold text-[#000C22] dark:text-white">Completed</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-black/5 bg-[#F8FEFF] p-5 dark:border-white/10 dark:bg-[#021733]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#008E96] dark:text-[#2ACED1]">
                      Screenshot card
                    </p>
                    <div className="mt-4 rounded-[20px] border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#011B3B]">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                          Billing performance
                        </p>
                        <span className="rounded-full bg-[#2ACED1]/12 px-3 py-1 text-xs font-semibold text-[#008E96] dark:text-[#2ACED1]">
                          Optimized
                        </span>
                      </div>
                      <div className="mt-4 h-32">
                        <div className="flex h-full items-end gap-2">
                          {[42, 56, 49, 68, 74, 62].map((height, index) => (
                            <div key={`${height}-${index}`} className="group flex h-full flex-1 items-end">
                              <div
                                className="relative w-full rounded-t-xl bg-gradient-to-t from-[#008E96] to-[#6FF5F7] transition duration-200 group-hover:brightness-110"
                                style={{ height: `${height}%` }}
                              >
                                <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-black/5 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#000C22] opacity-0 shadow-md transition duration-200 group-hover:opacity-100 dark:border-white/10 dark:bg-[#021733] dark:text-white">
                                  {height}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-4 text-xs text-[#000C22]/52 dark:text-[#D8F4F7]/52">
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="mt-16 rounded-[34px] border border-[#2ACED1]/12 bg-[#000C22] p-8 text-white shadow-[0_28px_90px_rgba(0,12,34,0.24)] dark:bg-[#021733]">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
            <ScrollReveal direction="left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2ACED1]/75">
                  Why enterprises choose this model
                </p>
                <h2 className="mt-4 text-3xl font-bold">
                  A cleaner operating layer for revenue-critical systems
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
                  Enterprise teams do not need more disconnected tooling. They need fewer handoffs,
                  more visibility, and product surfaces that can scale from one market to many.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-3">
              {capabilityColumns.map((column, index) => (
                <ScrollReveal key={column.title} delay={index * 0.08}>
                  <div className="rounded-[26px] border border-white/10 bg-white/6 p-5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#2ACED1]" />
                      <p className="text-base font-semibold text-white">{column.title}</p>
                    </div>
                    <div className="mt-4 space-y-3">
                      {column.points.map((point) => (
                        <p key={point} className="text-sm leading-6 text-white/66">
                          {point}
                        </p>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <ScrollReveal>
            <div className="grid gap-6 rounded-[32px] border border-[#2ACED1]/12 bg-white/78 p-8 shadow-[0_18px_44px_rgba(0,12,34,0.06)] backdrop-blur-md lg:grid-cols-[0.9fr_1.1fr] dark:border-white/10 dark:bg-white/5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008E96] dark:text-[#2ACED1]">
                  Next step
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#000C22] dark:text-white">
                  Build enterprise solutions as a reusable system, not one-off landing pages.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-black/5 bg-[#F8FEFF] p-5 dark:border-white/10 dark:bg-[#021733]">
                  <BarChart3 className="h-6 w-6 text-[#008E96] dark:text-[#2ACED1]" />
                  <p className="mt-4 text-lg font-semibold text-[#000C22] dark:text-white">
                    Shared route family
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                    Future solution detail pages can live under the same route family and component
                    system.
                  </p>
                </div>
                <div className="rounded-[24px] border border-black/5 bg-[#F8FEFF] p-5 dark:border-white/10 dark:bg-[#021733]">
                  <Layers3 className="h-6 w-6 text-[#008E96] dark:text-[#2ACED1]" />
                  <p className="mt-4 text-lg font-semibold text-[#000C22] dark:text-white">
                    Reusable sections
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                    Logos, animated insight cards, proof blocks, and capability sections are ready
                    to extend.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
