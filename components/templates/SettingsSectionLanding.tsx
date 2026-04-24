"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Card } from "@/components/atoms/Card";
import type { SettingsGroupItem } from "@/app/dashboard/settings/settings.config";

interface SettingsSectionLandingProps {
  group: SettingsGroupItem;
  intro: string;
}

export function SettingsSectionLanding({
  group,
  intro,
}: SettingsSectionLandingProps) {
  const firstPage = group.items[0];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
        <div className="space-y-4 p-6">
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
              Back to settings
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
    </div>
  );
}
