"use client";

import { ArrowUpRight, CreditCard, DollarSign, RefreshCw } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { SettingsPanel } from "@/components/templates/SettingsLayout";

const plans = [
  {
    name: "Starter",
    price: 29,
    detail: "Up to 100 customers and basic analytics.",
    popular: false,
  },
  {
    name: "Growth",
    price: 79,
    detail: "Up to 1,000 customers, support, and branding.",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 299,
    detail: "Unlimited customers, SLAs, and custom integrations.",
    popular: false,
  },
];

const spendRows = [
  { label: "Payments volume", value: "$142,580", change: "+12.4%" },
  { label: "Fee estimate", value: "$2,840", change: "-4.1%" },
  { label: "Products enabled", value: "6", change: "+1" },
  { label: "Seats used", value: "3 / 10", change: "+1" },
];

export default function PlansAndFeesSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsPanel
        title="Plans and fees"
        description="Track product spend, current plan usage, and cost controls without leaving settings."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {spendRows.map((row) => (
            <div
              key={row.label}
              className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                  <DollarSign className="h-5 w-5 text-[#2ACED1]" />
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  {row.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-[#000C22] dark:text-white">
                {row.value}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                {row.label}
              </p>
            </div>
          ))}
        </div>
      </SettingsPanel>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 md:grid-cols-3 xl:col-span-1">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`group overflow-hidden border p-5 ${
                plan.popular
                  ? "border-[#2ACED1]/35 bg-gradient-to-br from-[#011B3B] to-[#034E78] text-white"
                  : "border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80"
              }`}
            >
              {plan.popular && (
                <span className="inline-flex rounded-full bg-[#2ACED1] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#000C22]">
                  Popular
                </span>
              )}
              <h3 className="mt-3 text-lg font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm leading-6 opacity-80">{plan.detail}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-sm opacity-60">/mo</span>
              </div>
              <Button
                type="button"
                variant={plan.popular ? "action" : "outline"}
                size="sm"
                className="mt-5 w-full"
              >
                {plan.popular ? "Current plan" : "Switch plan"}
              </Button>
            </Card>
          ))}
        </div>

        <SettingsPanel
          title="Cost controls"
          description="Budget, fee, and usage controls for the products you enable."
          action={
            <Button type="button" variant="action">
              Save plan controls
            </Button>
          }
        >
          <div className="space-y-3">
            {[
              "Set monthly spend caps for product usage.",
              "Lock approval on any new paid product.",
              "Route invoice alerts to finance and ops.",
              "Review price changes before each renewal.",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2ACED1]/10 text-xs font-bold text-[#008E96]">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-[#000C22]/70 dark:text-[#D8F4F7]/70">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#2ACED1]" />
                <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                  Billing cycle
                </p>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                Plans renew on the 1st of each month.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-[#2ACED1]" />
                <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                  Renewal policy
                </p>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                Product fees are reviewed before automatic renewal.
              </p>
            </div>
          </div>
        </SettingsPanel>
      </div>
    </div>
  );
}
