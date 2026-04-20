"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Card } from "@/components/atoms/Card";

export interface SurfaceStat {
  label: string;
  value: string;
  detail: string;
  icon: string | LucideIcon;
  accent: string;
}

export interface SurfaceLink {
  label: string;
  description: string;
  href: string;
  icon: string | LucideIcon;
  accent: string;
}

interface DashboardSurfacePageProps {
  breadcrumb: string[];
  tag: string;
  title: string;
  description: string;
  icon: string | LucideIcon;
  accent: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  stats: SurfaceStat[];
  links: SurfaceLink[];
  notes: string[];
  nextSteps: string[];
  snippetTitle?: string;
  snippet?: string;
}

export function DashboardSurfacePage({
  breadcrumb,
  tag,
  title,
  description,
  icon: HeroIcon,
  accent,
  primaryAction,
  secondaryAction,
  stats,
  links,
  notes,
  nextSteps,
  snippetTitle,
  snippet,
}: DashboardSurfacePageProps) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/40 dark:text-[#D8F4F7]/40">
              {breadcrumb.map((part, index) => (
                <span key={`${part}-${index}`} className="inline-flex items-center gap-2">
                  {index === 0 ? (
                    (() => {
                      const Resolved = typeof HeroIcon === "string" ? getIcon(HeroIcon) : (HeroIcon as any);
                      return <Resolved className="h-4 w-4" style={{ color: accent }} />;
                    })()
                  ) : null}
                  <span>{part}</span>
                  {index < breadcrumb.length - 1 && <ChevronRight className="h-3 w-3" />}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#2ACED1]/10 px-3 py-1 text-xs font-semibold text-[#008E96]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
                {tag}
              </div>
              <h1 className="text-2xl font-bold text-[#000C22] dark:text-white md:text-3xl">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-action-button px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:translate-y-[-1px]"
                >
                  {primaryAction.label}
                </Link>
              )}
              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center justify-center rounded-xl border border-[#000C22]/15 px-4 py-2.5 text-sm font-semibold text-[#000C22] transition-colors hover:border-[#2ACED1]/40 hover:bg-[#2ACED1]/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
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
                  {stat.value}
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

      {links.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                Related pages
              </p>
              <h2 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
                Navigate within this area
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="block">
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
      )}

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
          <div className="border-b border-black/5 px-6 py-5 dark:border-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              What this surface covers
            </p>
            <h2 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
              Clean, API-ready structure
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
              Next step
            </p>
            <h2 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
              Move from shell to backend wiring
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

      {snippet && snippetTitle && (
        <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
          <div className="border-b border-black/5 px-6 py-4 dark:border-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              {snippetTitle}
            </p>
          </div>
          <pre className="overflow-x-auto p-6 text-sm leading-6 text-[#000C22] dark:text-[#D8F4F7]">
            {snippet}
          </pre>
        </Card>
      )}
    </div>
  );
}
