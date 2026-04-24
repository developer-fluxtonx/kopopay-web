"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Card } from "@/components/atoms/Card";
import { settingsGroups } from "./settings.config";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
        <div className="space-y-3 p-6">
          <h2 className="text-2xl font-bold text-[#000C22] dark:text-white md:text-3xl">
            Settings
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
            Choose the area you want to manage and open the page you need.
          </p>
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
        </section>
      ))}
    </div>
  );
}
