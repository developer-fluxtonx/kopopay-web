"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, LayoutGrid } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Card } from "@/components/atoms/Card";
import type { SettingsGroupItem } from "@/app/dashboard/settings/settings.config";

interface SettingsSectionLandingProps {
  group: SettingsGroupItem;
  intro: string;
  notes: string[];
  nextSteps: string[];
}

export function SettingsSectionLanding({
  group,
  intro,
  notes,
  nextSteps,
}: SettingsSectionLandingProps) {
  const firstPage = group.items[0];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/40 dark:text-[#D8F4F7]/40">
              <LayoutGrid className="h-4 w-4 text-[#2ACED1]" />
              <Link href="/dashboard/settings" className="transition-colors hover:text-[#008E96]">
                Dashboard
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span>Settings</span>
              <ChevronRight className="h-3 w-3" />
              <span>{group.label}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#000C22] dark:text-white md:text-3xl">
                {group.label}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                {intro}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center justify-center rounded-xl border border-[#000C22]/15 px-4 py-2.5 text-sm font-semibold text-[#000C22] transition-colors hover:border-[#2ACED1]/40 hover:bg-[#2ACED1]/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
              >
                Back to overview
              </Link>
              <Link
                href={firstPage.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-action-button px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:translate-y-[-1px]"
              >
                Open first page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                Leaf routes
              </p>
              <p className="mt-3 text-2xl font-bold text-[#000C22] dark:text-white">
                {group.items.length}
              </p>
              <p className="mt-1 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                Nested pages stay isolated for backend wiring.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                Shared shell
              </p>
              <p className="mt-3 text-2xl font-bold text-[#000C22] dark:text-white">
                Ready
              </p>
              <p className="mt-1 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                One layout, one registry, and one navigation model.
              </p>
            </div>
            <div className="rounded-2xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 p-4 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                Section focus
              </p>
              <p className="mt-2 text-sm leading-6 text-[#000C22]/65 dark:text-[#D8F4F7]/65">
                {group.description}
              </p>
            </div>
          </div>
        </div>
      </Card>

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
                        const Icon = getIcon(item.icon);
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

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
          <div className="border-b border-black/5 px-6 py-5 dark:border-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              Why this section works
            </p>
            <h2 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
              Simple to extend
            </h2>
          </div>
          <div className="space-y-3 p-6">
            {notes.map((note, index) => (
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
              API-ready next steps
            </p>
            <h2 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
              Wire this section to backend services
            </h2>
          </div>
          <div className="space-y-3 p-6">
            {nextSteps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2ACED1]/10 text-xs font-bold text-[#008E96]">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-[#000C22]/70 dark:text-[#D8F4F7]/70">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
