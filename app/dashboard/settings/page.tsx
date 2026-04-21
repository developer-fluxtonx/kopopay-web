"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import api from "@/lib/api";
import { useApi } from "@/lib/useApi";
import {
  settingsGroups,
  settingsOverviewStats,
} from "./settings.config";

export default function SettingsPage() {
  const { data: settingsStats } = useApi(() => api.getSettingsStats(), [], true);

  const displayValue = (statLabel: string, fallback: string) => {
    if (!settingsStats) return fallback;
    switch (statLabel) {
      case "Groups":
        return settingsStats.groups ?? fallback;
      case "Pages":
        return settingsStats.pages ?? fallback;
      case "API-ready":
        return settingsStats.apiReady ?? fallback;
      case "Legacy redirects":
        return settingsStats.legacyRedirects ?? fallback;
      default:
        return fallback;
    }
  };
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#2ACED1]/10 px-3 py-1 text-xs font-semibold text-[#008E96]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Stripe-style structure, Kopo Pay identity
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#000C22] dark:text-white md:text-3xl">
                One settings tree, organized for a real product.
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                Personal, account, and product settings now live in separate
                folders, with one shared shell and API-ready route registry.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="action">
                Save draft
              </Button>
              <Link
                href="/dashboard/settings/personal/developers"
                className="inline-flex items-center justify-center rounded-xl border border-[#000C22]/20 px-5 py-2.5 text-base font-medium text-[#000C22] transition-all duration-200 hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
              >
                Open developers
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {settingsOverviewStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/5 bg-white/70 p-4 transition-colors hover:border-[#2ACED1]/30 dark:border-white/5 dark:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${stat.accent}16` }}
                  >
                    {(() => {
                      const Icon = typeof stat.icon === "string" ? getIcon(stat.icon) : (stat.icon as any);
                      return <Icon className="h-5 w-5" style={{ color: stat.accent }} />;
                    })()}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                    Live
                  </span>
                </div>
                <p className="mt-4 text-2xl font-bold text-[#000C22] dark:text-white">
                  {displayValue(stat.label, stat.value)}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                  {stat.label}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#000C22]/45 dark:text-[#D8F4F7]/45">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {settingsGroups.map((group) => (
        <section key={group.id} className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-[#000C22]/55 dark:bg-white/5 dark:text-[#D8F4F7]/55">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: group.accent }}
                />
                {group.items.length} pages
              </div>
              <h3 className="mt-3 text-xl font-bold text-[#000C22] dark:text-white">
                {group.label}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                {group.description}
              </p>
            </div>
            <Link
              href={group.href}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-[#000C22]/15 px-4 py-2 text-sm font-semibold text-[#000C22] transition-colors hover:border-[#2ACED1]/40 hover:bg-[#2ACED1]/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
            >
              Open section
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <Link key={item.id} href={item.href} className="block">
                <Card className="group h-full border border-[#2ACED1]/15 bg-white/85 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#2ACED1]/35 dark:bg-[#011B3B]/80">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/5 dark:border-white/5"
                        style={{ backgroundColor: `${item.accent}16` }}
                      >
                        {(() => {
                          const Icon = typeof item.icon === "string" ? getIcon(item.icon) : (item.icon as any);
                          return <Icon className="h-5 w-5" style={{ color: item.accent }} />;
                        })()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#000C22] transition-colors group-hover:text-[#008E96] dark:text-white">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#000C22]/30 transition-transform group-hover:translate-x-1 group-hover:text-[#2ACED1] dark:text-[#D8F4F7]/30" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
          <div className="flex items-center justify-between border-b border-black/5 px-6 py-5 dark:border-white/5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                Why this layout works
              </p>
              <h3 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
                Clean now, scalable later
              </h3>
            </div>
            <CheckCircle2 className="h-5 w-5 text-[#2ACED1]" />
          </div>
          <div className="space-y-3 p-6">
            {[
              "Each setting area has its own folder and route.",
              "The shared layout keeps styling and navigation consistent.",
              "API wiring can slot into these pages without restructuring.",
            ].map((note, index) => (
              <div
                key={note}
                className="flex gap-3 rounded-2xl border border-black/5 bg-white/60 p-4 dark:border-white/5 dark:bg-white/5"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2ACED1]/10 text-xs font-bold text-[#008E96]">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-[#000C22]/65 dark:text-[#D8F4F7]/65">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
          <div className="border-b border-black/5 px-6 py-5 dark:border-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              Next step
            </p>
            <h3 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
              Hook these pages to APIs
            </h3>
          </div>
          <div className="p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Personal settings API",
                "Account profile service",
                "Product configuration service",
                "Settings audit log",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 text-sm font-medium text-[#000C22]/75 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
