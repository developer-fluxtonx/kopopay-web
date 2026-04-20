"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Card } from "@/components/atoms/Card";
import { settingsGroups, settingsNavItems, settingsPages } from "@/app/dashboard/settings/settings.config";

export const settingsControlClass =
  "w-full rounded-xl border border-[#000C22]/10 bg-white px-4 py-3 text-sm text-[#000C22] outline-none transition focus:border-[#2ACED1] focus:ring-4 focus:ring-[#2ACED1]/15 dark:border-[#D8F4F7]/10 dark:bg-[#011B3B] dark:text-white dark:focus:border-[#2ACED1]";

interface SettingsPanelProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SettingsPanel({
  title,
  description,
  action,
  children,
  className = "",
}: SettingsPanelProps) {
  return (
    <Card
      className={`overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80 ${className}`}
    >
      <div className="flex flex-col gap-4 border-b border-black/5 px-6 py-5 dark:border-white/5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
            Section
          </p>
          <h2 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="p-6">{children}</div>
    </Card>
  );
}

interface SettingsFieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsField({
  label,
  hint,
  children,
  className = "",
}: SettingsFieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm font-medium text-[#000C22]/80 dark:text-[#D8F4F7]/80">
        {label}
      </span>
      {children}
      {hint && (
        <span className="text-xs leading-5 text-[#000C22]/45 dark:text-[#D8F4F7]/45">
          {hint}
        </span>
      )}
    </label>
  );
}

interface SettingsToggleRowProps {
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function SettingsToggleRow({
  title,
  description,
  checked,
  onToggle,
  disabled = false,
}: SettingsToggleRowProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={checked}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition-colors ${
        checked
          ? "border-[#2ACED1]/35 bg-[#2ACED1]/5"
          : "border-black/5 bg-white/55 dark:border-white/5 dark:bg-[#000C22]/35"
      } ${disabled ? "cursor-not-allowed opacity-60" : "hover:border-[#2ACED1]/25"}`}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#000C22] dark:text-white">
          {title}
        </p>
        <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
          {description}
        </p>
      </div>
      <span
        className={`relative inline-flex h-7 w-12 shrink-0 rounded-full p-1 transition-colors ${
          checked ? "bg-[#2ACED1]" : "bg-black/10 dark:bg-white/10"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </motion.button>
  );
}

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isActivePath = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const activePage = settingsPages.find((item) => isActivePath(item.href)) ?? null;
  const activeGroup =
    settingsGroups.find(
      (group) =>
        pathname === group.href ||
        pathname.startsWith(`${group.href}/`) ||
        group.items.some((item) => isActivePath(item.href))
    ) ??
    settingsGroups[0];
  const pageTitle = activePage
    ? activePage.label
    : pathname === "/dashboard/settings"
      ? "Settings"
      : activeGroup.label;
  const showGroupCrumb = pathname !== "/dashboard/settings";
  const showLeafCrumb = Boolean(activePage);
  const summaryText = activePage
    ? `${activeGroup.items.length} pages live in this category.`
    : pathname === "/dashboard/settings"
      ? "Three categories, eighteen routes, and a clean route tree."
      : `${activeGroup.items.length} leaf routes live in this section.`;
  const pageDescription = activePage
    ? activePage.description
    : pathname === "/dashboard/settings"
      ? "A grouped settings workspace designed for fast, API-ready product work."
      : activeGroup.description;

  return (
    <div className="relative flex flex-col gap-6">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-[#2ACED1]/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-[#034E78]/10 blur-3xl" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="xl:sticky xl:top-0 xl:h-fit">
          <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/90 shadow-[0_16px_48px_rgba(0,12,34,0.08)] dark:bg-[#011B3B]/80">
            <div className="border-b border-black/5 px-5 py-5 dark:border-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                Settings
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#000C22] dark:text-white">
                Workspace control
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                Keep your account, security, and product controls aligned.
              </p>
            </div>
            <nav className="flex flex-col gap-4 p-3" aria-label="Settings navigation">
              <Link
                href="/dashboard/settings"
                className={`group relative flex items-start gap-3 rounded-2xl px-4 py-3 transition-colors ${
                  pathname === "/dashboard/settings"
                    ? "bg-[#2ACED1]/10 text-[#008E96]"
                    : "text-[#000C22]/70 hover:bg-black/5 dark:text-[#D8F4F7]/70 dark:hover:bg-white/5"
                }`}
              >
                <span
                  className="absolute left-2 top-3 bottom-3 w-1 rounded-full transition-opacity"
                  style={{
                    backgroundColor: "#2ACED1",
                    opacity: pathname === "/dashboard/settings" ? 1 : 0,
                  }}
                />
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                    pathname === "/dashboard/settings"
                      ? "border-[#2ACED1]/30 bg-white/85 dark:bg-[#000C22]"
                      : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                  }`}
                >
                  <LayoutGrid className="h-5 w-5 text-[#2ACED1]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                      Overview
                    </p>
                    <ChevronRight className="h-4 w-4 text-[#000C22]/20 transition-colors group-hover:text-[#2ACED1]" />
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                    Stripe-style grouped settings hub
                  </p>
                </div>
              </Link>

              {settingsGroups.map((group) => {
                const isGroupActive =
                  pathname === group.href || pathname.startsWith(`${group.href}/`);

                return (
                  <div key={group.id} className="space-y-2">
                    <Link
                      href={group.href}
                      className={`flex items-center justify-between gap-2 rounded-2xl px-2 py-2 transition-colors ${
                        isGroupActive
                          ? "bg-[#2ACED1]/5"
                          : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.26em] text-[#000C22]/40 dark:text-[#D8F4F7]/40">
                          {group.label}
                        </h4>
                        <p className="mt-1 text-[11px] leading-5 text-[#000C22]/45 dark:text-[#D8F4F7]/45">
                          {group.description}
                        </p>
                      </div>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
                        style={{
                          backgroundColor: `${group.accent}14`,
                          color: group.accent,
                        }}
                      >
                        {group.items.length}
                      </span>
                    </Link>

                    <div className="flex flex-col gap-1">
                      {group.items.map((item) => {
                        const isActive = isActivePath(item.href);
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            className={`group relative flex items-start gap-3 rounded-2xl px-4 py-3 transition-colors ${
                              isActive
                                ? "bg-[#2ACED1]/10 text-[#008E96]"
                                : "text-[#000C22]/70 hover:bg-black/5 dark:text-[#D8F4F7]/70 dark:hover:bg-white/5"
                            }`}
                          >
                            <span
                              className="absolute left-2 top-3 bottom-3 w-1 rounded-full transition-opacity"
                              style={{
                                backgroundColor: item.accent,
                                opacity: isActive ? 1 : 0,
                              }}
                            />
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                                isActive
                                  ? "border-[#2ACED1]/30 bg-white/85 dark:bg-[#000C22]"
                                  : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                              }`}
                            >
                              {(() => {
                                const Icon = getIcon(item.icon);
                                return <Icon className="h-5 w-5" style={{ color: item.accent }} />;
                              })()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                                  {item.label}
                                </p>
                                <ChevronRight className="h-4 w-4 text-[#000C22]/20 transition-colors group-hover:text-[#2ACED1]" />
                              </div>
                              <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>
          </Card>
        </aside>

        <section className="min-w-0 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-[28px] border border-[#2ACED1]/15 bg-white/80 shadow-[0_16px_48px_rgba(0,12,34,0.06)] backdrop-blur-sm dark:bg-[#011B3B]/75"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(42,206,209,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(3,78,120,0.09),transparent_28%)]" />
            <div className="relative flex flex-col gap-5 p-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/40 dark:text-[#D8F4F7]/40">
                  <LayoutGrid className="h-4 w-4" />
                  <span>Dashboard</span>
                  <ChevronRight className="h-3 w-3" />
                  <span>Settings</span>
                  {showGroupCrumb && (
                    <>
                      <ChevronRight className="h-3 w-3" />
                      <span>{activeGroup.label}</span>
                    </>
                  )}
                  {showLeafCrumb && (
                    <>
                      <ChevronRight className="h-3 w-3" />
                      <span>{activePage?.label}</span>
                    </>
                  )}
                </div>
                <h1 className="mt-3 text-2xl font-bold text-[#000C22] dark:text-white md:text-3xl">
                  {pageTitle}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                  {pageDescription}
                </p>
              </div>
              <div className="flex min-w-[220px] flex-col gap-3 rounded-2xl border border-[#2ACED1]/15 bg-white/70 p-4 dark:bg-white/5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: activePage?.accent ?? activeGroup.accent }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#000C22]/40 dark:text-[#D8F4F7]/40">
                    Workspace status
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                  {pathname === "/dashboard/settings"
                    ? "Settings hub ready"
                    : activeGroup.label}
                </p>
                <p className="text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                  {summaryText}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="xl:hidden">
            <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/90 dark:bg-[#011B3B]/80">
              <div className="flex gap-2 overflow-x-auto p-3 custom-scrollbar">
                <Link
                  href="/dashboard/settings"
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    pathname === "/dashboard/settings"
                      ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                      : "border-black/5 bg-black/5 text-[#000C22]/65 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/65"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4 text-[#2ACED1]" />
                  Overview
                </Link>
                {settingsNavItems.map((item) => {
                  const isActive = isActivePath(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                        isActive
                          ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                          : "border-black/5 bg-black/5 text-[#000C22]/65 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/65"
                      }`}
                    >
                      {(() => {
                        const Icon = getIcon(item.icon);
                        return <Icon className="h-4 w-4" style={{ color: item.accent }} />;
                      })()}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </Card>
          </div>

          {children}
        </section>
      </div>
    </div>
  );
};
