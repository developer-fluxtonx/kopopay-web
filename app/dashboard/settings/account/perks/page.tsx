"use client";

import { BadgeCheck, Gift, Rocket, Star, Ticket } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { SettingsPanel } from "@/components/templates/SettingsLayout";

const perks = [
  {
    name: "Notion for Startups",
    savings: "$1,200",
    detail: "Workspace credits for documentation and planning.",
  },
  {
    name: "Linear for Teams",
    savings: "$600",
    detail: "Project tracking discounts for product teams.",
  },
  {
    name: "Cloud credits",
    savings: "$2,000",
    detail: "Infrastructure credits to support growth.",
  },
];

export default function PerksSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsPanel
        title="Perks"
        description="Discounts on tools to run your startup."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Active perks", value: "3" },
            { label: "Savings", value: "$3,800" },
            { label: "Renewal window", value: "30 days" },
            { label: "Eligible team", value: "Founders" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                  <Gift className="h-5 w-5 text-[#2ACED1]" />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Live
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-[#000C22] dark:text-white">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </SettingsPanel>

      <SettingsPanel
        title="Available offers"
        description="Discounts that help the team ship faster and spend less."
        action={
          <Button type="button" variant="outline" size="sm">
            <Ticket className="h-4 w-4" />
            Browse partner perks
          </Button>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          {perks.map((perk) => (
            <div
              key={perk.name}
              className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                  <Star className="h-4 w-4 text-[#2ACED1]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                    {perk.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                    Up to {perk.savings}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                {perk.detail}
              </p>
            </div>
          ))}
        </div>
      </SettingsPanel>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SettingsPanel
          title="Eligibility"
          description="Simple guardrails for which teams can claim the perks."
        >
          <div className="space-y-3">
            {[
              "Startup verified and active.",
              "Account in good standing.",
              "At least one product enabled.",
              "Founding team has admin access.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <BadgeCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-sm leading-6 text-[#000C22]/70 dark:text-[#D8F4F7]/70">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </SettingsPanel>

        <SettingsPanel
          title="Perk highlights"
          description="A short explanation of how these offers support growth."
        >
          <div className="space-y-3">
            {[
              "Discounts are updated without changing your product experience.",
              "The perks block can be synced to a backend eligibility service.",
              "Savings can be rolled into billing or finance workflows later.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2ACED1]/10">
                  <Rocket className="h-4 w-4 text-[#2ACED1]" />
                </div>
                <p className="text-sm leading-6 text-[#000C22]/70 dark:text-[#D8F4F7]/70">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </SettingsPanel>
      </div>
    </div>
  );
}
