"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/atoms/Card";
import { settingsGroups, settingsPages } from "@/app/dashboard/settings/settings.config";

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
          <h2 className="text-lg font-bold text-[#000C22] dark:text-white">
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
  const pageDescription = activePage
    ? activePage.description
    : pathname === "/dashboard/settings"
      ? "Manage your account, security, and product preferences in one place."
      : activeGroup.description;

  return (
    <div className="relative flex flex-col gap-6">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-[#2ACED1]/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-[#034E78]/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] border border-[#2ACED1]/15 bg-white/80 p-6 shadow-[0_16px_48px_rgba(0,12,34,0.06)] backdrop-blur-sm dark:bg-[#011B3B]/75"
      >
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-[#000C22] dark:text-white md:text-3xl">
            {pageTitle}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
            {pageDescription}
          </p>
        </div>
      </motion.div>

      {children}
    </div>
  );
};
