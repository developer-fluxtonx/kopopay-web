"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Button } from "@/components/atoms/Button";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    badge: "Fast launch",
    price: "2.7%",
    fee: "+ 25c",
    description: "For startups, indie teams, and brands getting their first serious payment volume.",
    accent: "from-[#D8F4F7] to-white",
    ring: "border-[#2ACED1]/18",
    cta: "Start now",
    ctaVariant: "secondary" as const,
    stats: [
      { label: "Setup", value: "No fees" },
      { label: "Payouts", value: "2-day" },
    ],
    features: [
      "135+ currencies with local method support",
      "Hosted checkout and payment links",
      "Machine-learning fraud screening",
      "Basic reporting and disputes support",
    ],
  },
  {
    name: "Growth",
    badge: "Most popular",
    price: "2.4%",
    fee: "+ 20c",
    description: "For scaling businesses that want better conversion, clearer reporting, and stronger controls.",
    accent: "from-[#000C22] via-[#011B3B] to-[#034E78]",
    ring: "border-[#2ACED1]/35",
    cta: "Choose Growth",
    ctaVariant: "primary" as const,
    featured: true,
    stats: [
      { label: "Savings", value: "Lower than Stripe" },
      { label: "Uplift", value: "+8.2%" },
    ],
    features: [
      "Advanced payment optimization",
      "Subscriptions, invoicing, and billing flows",
      "Revenue recovery and finance automation",
      "Priority support with implementation guidance",
    ],
  },
  {
    name: "Enterprise",
    badge: "Custom architecture",
    price: "Custom",
    fee: "volume-based",
    description: "For large platforms and global businesses with complex payment, finance, and payout needs.",
    accent: "from-[#F4FBFC] to-[#D8F4F7]",
    ring: "border-[#034E78]/14",
    cta: "Talk to sales",
    ctaVariant: "outline" as const,
    stats: [
      { label: "Model", value: "Interchange+" },
      { label: "Support", value: "Dedicated" },
    ],
    features: [
      "Custom contracts and negotiated rates",
      "Dedicated account and solution engineering",
      "Multi-entity, marketplace, and payout support",
      "Security reviews, onboarding, and migration planning",
    ],
  },
];

const valueHighlights = [
  {
    title: "Cleaner economics",
    copy: "KopoPay keeps pricing sharp for growth teams with a lower headline rate on core card payments.",
    icon: BarChart3,
  },
  {
    title: "Global-ready coverage",
    copy: "Local methods, modern checkout flows, and flexible currency support without bloated setup overhead.",
    icon: Globe2,
  },
  {
    title: "Risk built in",
    copy: "Fraud controls and operational visibility are part of the platform, not awkward add-ons.",
    icon: ShieldCheck,
  },
];

export default function PricingPage() {
  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#F7FEFF_0%,#E9FBFD_18%,#FFFFFF_100%)] dark:bg-[linear-gradient(180deg,#000C22_0%,#011B3B_42%,#000C22_100%)]">
      <div className="mx-auto max-w-[1340px] px-6 pb-20 pt-8 md:px-8">
        <section className="relative overflow-hidden rounded-[36px] border border-[#2ACED1]/12 bg-white/72 px-6 py-10 shadow-[0_22px_60px_rgba(0,12,34,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:px-10 md:py-14">
          <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-[#2ACED1]/12 blur-3xl" />
          <div className="absolute left-0 top-20 h-40 w-40 rounded-full bg-[#034E78]/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2ACED1]/20 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#008E96] shadow-sm dark:bg-white/5 dark:text-[#2ACED1]">
                <Sparkles className="h-4 w-4" />
                Pricing
              </div>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-[#000C22] dark:text-white md:text-6xl lg:text-7xl">
                Professional pricing that feels built for modern revenue teams.
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#000C22]/66 dark:text-[#D8F4F7]/68">
                Transparent rates, polished product coverage, and plans that scale from launch to
                enterprise operations. Designed to feel premium, not generic.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 0.08}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-[34px] border ${plan.ring} ${
                  plan.featured
                    ? "bg-[linear-gradient(180deg,#000C22_0%,#011B3B_58%,#023459_100%)] text-white shadow-[0_28px_90px_rgba(0,12,34,0.18)]"
                    : "bg-white/78 text-[#000C22] shadow-[0_20px_50px_rgba(0,12,34,0.06)] dark:bg-white/5 dark:text-white"
                } p-7 transition duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${
                    plan.featured ? "from-[#2ACED1]/12 to-transparent" : plan.accent
                  } opacity-80`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                          plan.featured
                            ? "bg-[#2ACED1]/14 text-[#7CF7F8]"
                            : "bg-[#2ACED1]/10 text-[#008E96] dark:text-[#2ACED1]"
                        }`}
                      >
                        {plan.badge}
                      </div>
                      <h2 className="mt-4 text-3xl font-bold">{plan.name}</h2>
                    </div>
                    {plan.featured && (
                      <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7CF7F8]">
                        Recommended
                      </div>
                    )}
                  </div>

                  <p
                    className={`mt-4 min-h-14 text-sm leading-6 ${
                      plan.featured ? "text-white/66" : "text-[#000C22]/60 dark:text-[#D8F4F7]/62"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-7 flex items-end gap-3">
                    <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                    <span
                      className={`pb-1 text-lg ${
                        plan.featured ? "text-white/68" : "text-[#000C22]/55 dark:text-[#D8F4F7]/55"
                      }`}
                    >
                      {plan.fee}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      plan.featured ? "text-white/52" : "text-[#000C22]/48 dark:text-[#D8F4F7]/48"
                    }`}
                  >
                    {plan.name === "Enterprise"
                      ? "Tailored around payment volume, complexity, and implementation scope"
                      : "Per successful card payment with no hidden setup costs"}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {plan.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className={`rounded-[22px] border px-4 py-4 ${
                          plan.featured
                            ? "border-white/10 bg-white/6"
                            : "border-black/5 bg-[#F8FEFF] dark:border-white/10 dark:bg-white/5"
                        }`}
                      >
                        <p
                          className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                            plan.featured ? "text-white/45" : "text-[#000C22]/42 dark:text-[#D8F4F7]/42"
                          }`}
                        >
                          {stat.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-7 flex-1">
                  <div
                    className={`rounded-[26px] border p-5 ${
                      plan.featured
                        ? "border-white/10 bg-white/6"
                        : "border-black/5 bg-[#F8FEFF] dark:border-white/10 dark:bg-white/5"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                        plan.featured ? "text-white/45" : "text-[#000C22]/42 dark:text-[#D8F4F7]/42"
                      }`}
                    >
                      Includes
                    </p>
                    <div className="mt-4 space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle2
                            className={`mt-0.5 h-5 w-5 shrink-0 ${
                              plan.featured ? "text-[#7CF7F8]" : "text-[#2ACED1]"
                            }`}
                          />
                          <p
                            className={`text-sm leading-6 ${
                              plan.featured ? "text-white/78" : "text-[#000C22]/72 dark:text-[#D8F4F7]/72"
                            }`}
                          >
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative mt-7">
                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className={`w-full rounded-full ${
                      plan.featured
                        ? "shadow-[0_12px_34px_rgba(42,206,209,0.18)]"
                        : plan.ctaVariant === "outline"
                          ? "border-[#000C22]/12 dark:border-white/10"
                          : ""
                    }`}
                  >
                    {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {valueHighlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal key={item.title} delay={0.12 + index * 0.06}>
                <div className="rounded-[28px] border border-[#2ACED1]/12 bg-white/78 p-6 shadow-[0_18px_44px_rgba(0,12,34,0.05)] backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#008E96] dark:text-[#2ACED1]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#000C22] dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#000C22]/62 dark:text-[#D8F4F7]/62">
                    {item.copy}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </section>
      </div>
    </div>
  );
}
