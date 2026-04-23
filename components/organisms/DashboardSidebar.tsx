"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  MoreVertical,
  Plus,
  X,
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { Modal } from "@/components/molecules/Modal";
import { DeveloperHubDialog } from "./DeveloperHubDialog";
import {
  dashboardMainNav,
  dashboardShortcutSeeds,
  developerDocsItems,
  developerMenuMoreItem,
  developerMoreItems,
  developerPrimaryItems,
  productOperationsSection,
  productSidebarSections,
  type SidebarRouteItem,
} from "./dashboardSidebar.config";

export interface DashboardSidebarProps {
  isSidebarOpen: boolean;
}

const sidebarLinkClass =
  "flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors";

const compactLinkClass =
  "flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors";

const inferShortcutIcon = (href: string) => {
  if (href.includes("developer")) {
    return developerPrimaryItems[0].icon;
  }

  if (href.includes("report") || href.includes("data")) {
    return dashboardShortcutSeeds[0].icon;
  }

  if (href.includes("billing")) {
    return dashboardMainNav[0].icon;
  }

  return dashboardMainNav[4].icon;
};

const getInitialProductGroup = (pathname: string) => {
  const match = productSidebarSections.find(
    (section) => pathname === section.href || pathname.startsWith(`${section.href}/`)
  );

  if (match) {
    return match.id;
  }

  if (
    pathname === productOperationsSection.href ||
    pathname.startsWith(`${productOperationsSection.href}/`)
  ) {
    return productOperationsSection.id;
  }

  return productSidebarSections[0]?.id ?? "payments";
};

const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const normalizeShortcutHref = (value: string) => {
  if (!value) {
    return value;
  }

  if (value.startsWith("/")) {
    return value;
  }

  return `/dashboard/${value.replace(/^\/+/, "")}`;
};

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isSidebarOpen }) => {
  const pathname = usePathname();
  const [expandedGroup, setExpandedGroup] = useState<string>(() =>
    getInitialProductGroup(pathname)
  );
  const [isShortcutModalOpen, setIsShortcutModalOpen] = useState(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [customShortcuts, setCustomShortcuts] = useState<SidebarRouteItem[]>([]);
  const [shortcutDraft, setShortcutDraft] = useState({
    label: "Data management",
    href: "/dashboard/products/reporting/data-management",
  });
  const DeveloperIcon = getIcon(developerPrimaryItems[0].icon);

  useEffect(() => {
    setExpandedGroup(getInitialProductGroup(pathname));
  }, [pathname]);

  const shortcuts = [...dashboardShortcutSeeds, ...customShortcuts];

  const saveShortcut = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const label = shortcutDraft.label.trim();
    const href = normalizeShortcutHref(shortcutDraft.href.trim());

    if (!label || !href) {
      return;
    }

    setCustomShortcuts((current) => [
      ...current,
      {
        id: `shortcut-${Date.now()}`,
        label,
        description: `Shortcut to ${label}`,
        href,
        icon: inferShortcutIcon(href),
        accent: "#2ACED1",
        keywords: [label, href],
      },
    ]);

    setShortcutDraft({
      label: "",
      href: "",
    });
  };

  const removeShortcut = (id: string) => {
    setCustomShortcuts((current) => current.filter((shortcut) => shortcut.id !== id));
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 290 : 84 }}
        className="relative z-20 flex h-full flex-col border-r border-black/5 bg-white transition-all duration-300 dark:border-white/5 dark:bg-[#011B3B]"
      >
        <div className="flex h-16 items-center gap-3 whitespace-nowrap border-b border-black/5 px-4 overflow-hidden dark:border-white/5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-action-button">
            <Image
              src="/kopopay-mark.svg"
              alt="Kopo Pay"
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </div>
          {isSidebarOpen && <span className="font-bold tracking-tight">Kopo Pay</span>}
        </div>

        <div className="flex-1 overflow-y-auto py-5 custom-scrollbar">
          <div className="space-y-6 px-3">
            <section className="space-y-3">
              {isSidebarOpen && (
                <div className="px-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                    Navigation
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#000C22]/45 dark:text-[#D8F4F7]/45">
                    Core workspace pages
                  </p>
                </div>
              )}

              <nav className="flex flex-col gap-1.5">
                {dashboardMainNav.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      title={!isSidebarOpen ? item.label : undefined}
                      className={`${compactLinkClass} ${
                        active
                          ? "bg-[#2ACED1]/10 text-[#008E96] dark:text-[#2ACED1]"
                          : "text-[#000C22]/70 hover:bg-black/5 dark:text-[#D8F4F7]/70 dark:hover:bg-white/5"
                      }`}
                    >
                        <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          active
                            ? "border-[#2ACED1]/30 bg-white/85 dark:bg-[#000C22]"
                            : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                        }`}
                      >
                        {(() => {
                          const Icon = getIcon(item.icon);
                          return <Icon className="h-5 w-5" style={{ color: item.accent }} />;
                        })()}
                      </div>
                      {isSidebarOpen && (
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </section>

            <section className="space-y-3">
              <div
                className="group rounded-3xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 p-3 transition-colors hover:border-[#2ACED1]/30"
                role="button"
                tabIndex={0}
                onClick={() => setIsShortcutModalOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setIsShortcutModalOpen(true);
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2ACED1]/20 bg-white/70 text-[#2ACED1] dark:bg-white/5">
                    <MoreVertical className="h-5 w-5" />
                  </div>
                  {isSidebarOpen && (
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                            Shortcuts
                          </p>
                          <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                            Pin pages like Data management
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="opacity-0 shadow-none transition-opacity group-hover:opacity-100"
                          onClick={(event) => {
                            event.stopPropagation();
                            setIsShortcutModalOpen(true);
                          }}
                        >
                          Manage Shortcut
                        </Button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {shortcuts.slice(0, 3).map((shortcut) => {
                          const ShortcutIcon = getIcon(shortcut.icon);
                          const active = isActivePath(pathname, shortcut.href);

                          return (
                            <Link
                              key={shortcut.id}
                              href={shortcut.href}
                              title={shortcut.label}
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                                active
                                  ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                                  : "border-black/5 bg-white/70 text-[#000C22]/65 hover:border-[#2ACED1]/25 hover:bg-[#2ACED1]/5 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/65"
                              }`}
                            >
                              <ShortcutIcon className="h-3.5 w-3.5" style={{ color: shortcut.accent }} />
                              {shortcut.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="space-y-3">
              {isSidebarOpen && (
                <div className="px-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                    Products
                  </p>
                </div>
              )}

              <div className="space-y-2">
                {productSidebarSections.map((section) => {
                  const isExpanded = expandedGroup === section.id;
                  const hasActiveItem = section.items.some((item) => isActivePath(pathname, item.href));
                  const SectionIcon = getIcon(section.icon);

                  return (
                    <div
                      key={section.id}
                      className={`rounded-3xl border transition-colors ${
                        isExpanded || hasActiveItem
                          ? "border-[#2ACED1]/20 bg-[#2ACED1]/5"
                          : "border-black/5 bg-white/65 hover:border-[#2ACED1]/15 dark:border-white/5 dark:bg-white/5"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedGroup(isExpanded ? "" : section.id)}
                        title={!isSidebarOpen ? section.label : undefined}
                        className={`${compactLinkClass} w-full ${
                          hasActiveItem
                            ? "text-[#008E96] dark:text-[#2ACED1]"
                            : "text-[#000C22]/75 dark:text-[#D8F4F7]/75"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                            hasActiveItem || isExpanded
                              ? "border-[#2ACED1]/30 bg-white/85 dark:bg-[#000C22]"
                              : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                          }`}
                        >
                          <SectionIcon className="h-5 w-5" style={{ color: section.accent }} />
                        </div>
                        {isSidebarOpen && (
                          <div className="min-w-0 flex-1 text-left">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                                  {section.label}
                                </p>
                                <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                                  {section.description}
                                </p>
                              </div>
                              <ChevronRight
                                className={`h-4 w-4 text-[#000C22]/25 transition-transform dark:text-[#D8F4F7]/25 ${
                                  isExpanded ? "rotate-90 text-[#2ACED1]" : ""
                                }`}
                              />
                            </div>
                          </div>
                        )}
                      </button>

                      {isSidebarOpen && isExpanded && (
                        <div className="px-2 pb-2">
                          <div className="mt-1 grid gap-1">
                            {section.items.map((item) => {
                              const active = isActivePath(pathname, item.href);

                              return (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  className={`group flex items-start gap-3 rounded-2xl px-3 py-2 transition-colors ${
                                    active
                                      ? "bg-white/80 text-[#008E96] dark:bg-[#000C22] dark:text-[#2ACED1]"
                                      : "text-[#000C22]/70 hover:bg-white/70 dark:text-[#D8F4F7]/70 dark:hover:bg-white/5"
                                  }`}
                                >
                                  <div
                                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                                      active
                                        ? "border-[#2ACED1]/25 bg-[#2ACED1]/10"
                                        : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                                    }`}
                                  >
                                    {(() => {
                                      const Icon = getIcon(item.icon);
                                      return <Icon className="h-4 w-4" style={{ color: item.accent }} />;
                                    })()}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="text-sm font-medium text-[#000C22] dark:text-white">
                                        {item.label}
                                      </p>
                                      <ChevronRight className="h-4 w-4 text-[#000C22]/20 transition-colors group-hover:text-[#2ACED1]" />
                                    </div>
                                    <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="space-y-3">
              {isSidebarOpen && (
                <div className="px-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                    Global Operations
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#000C22]/45 dark:text-[#D8F4F7]/45">
                    Payouts and workflow controls
                  </p>
                </div>
              )}

              <div className="grid gap-2">
                {productOperationsSection.items.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      title={!isSidebarOpen ? item.label : undefined}
                      className={`${sidebarLinkClass} rounded-3xl border ${
                        active
                          ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                          : "border-black/5 bg-white/70 text-[#000C22]/75 hover:bg-black/5 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/75 dark:hover:bg-white/10"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          active
                            ? "border-[#2ACED1]/30 bg-white/85 dark:bg-[#000C22]"
                            : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                        }`}
                      >
                        {(() => {
                          const Icon = getIcon(item.icon);
                          return <Icon className="h-5 w-5" style={{ color: item.accent }} />;
                        })()}
                      </div>
                      {isSidebarOpen && (
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-auto border-t border-black/5 p-3 dark:border-white/5">
          <button
            type="button"
            onClick={() => setIsDeveloperModalOpen(true)}
            className={`group flex w-full items-center justify-between rounded-3xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 px-3 py-3 text-left transition-colors hover:border-[#2ACED1]/30 ${
              isSidebarOpen ? "" : "justify-center"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2ACED1]/20 bg-white/70 text-[#2ACED1] dark:bg-white/5">
                <DeveloperIcon className="h-5 w-5" />
              </div>
              {isSidebarOpen && (
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                    Developer
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                    API, logs, and documentation
                  </p>
                </div>
              )}
            </div>
            {isSidebarOpen && <ChevronRight className="h-4 w-4 text-[#000C22]/30 transition-transform group-hover:translate-x-0.5 dark:text-[#D8F4F7]/30" />}
          </button>
        </div>
      </motion.aside>

      <Modal
        isOpen={isShortcutModalOpen}
        onClose={() => setIsShortcutModalOpen(false)}
        title="Manage Shortcuts"
        panelClassName="max-w-5xl"
        bodyClassName="p-0"
      >
        <div className="grid gap-6 p-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
            <div className="border-b border-black/5 px-5 py-4 dark:border-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                Saved shortcuts
              </p>
              <h3 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
                Quick access pages
              </h3>
            </div>
            <div className="space-y-3 p-5">
              {shortcuts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#2ACED1]/25 bg-[#2ACED1]/5 p-5 text-sm text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                  No shortcuts yet. Add one from the form on the right.
                </div>
              ) : (
                shortcuts.map((shortcut) => {
                  const ShortcutIcon = getIcon(shortcut.icon);

                  return (
                    <div
                      key={shortcut.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
                    >
                      <Link href={shortcut.href} className="flex min-w-0 items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                          <ShortcutIcon className="h-5 w-5" style={{ color: shortcut.accent }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                            {shortcut.label}
                          </p>
                          <p className="mt-0.5 truncate text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                            {shortcut.href}
                          </p>
                        </div>
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeShortcut(shortcut.id)}
                        className="rounded-full p-2 text-[#000C22]/35 transition-colors hover:bg-black/5 hover:text-[#000C22] dark:text-[#D8F4F7]/35 dark:hover:bg-white/5 dark:hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </Card>

          <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
            <div className="border-b border-black/5 px-5 py-4 dark:border-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                Add shortcut
              </p>
              <h3 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
                Pin any page
              </h3>
            </div>
            <form className="space-y-4 p-5" onSubmit={saveShortcut}>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#000C22]/80 dark:text-[#D8F4F7]/80">
                  Label
                </span>
                <input
                  value={shortcutDraft.label}
                  onChange={(event) =>
                    setShortcutDraft((current) => ({ ...current, label: event.target.value }))
                  }
                  className="w-full rounded-xl border border-[#000C22]/10 bg-white px-4 py-3 text-sm text-[#000C22] outline-none transition focus:border-[#2ACED1] focus:ring-4 focus:ring-[#2ACED1]/15 dark:border-[#D8F4F7]/10 dark:bg-[#011B3B] dark:text-white"
                  placeholder="Data management"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#000C22]/80 dark:text-[#D8F4F7]/80">
                  Page path
                </span>
                <input
                  value={shortcutDraft.href}
                  onChange={(event) =>
                    setShortcutDraft((current) => ({ ...current, href: event.target.value }))
                  }
                  className="w-full rounded-xl border border-[#000C22]/10 bg-white px-4 py-3 text-sm text-[#000C22] outline-none transition focus:border-[#2ACED1] focus:ring-4 focus:ring-[#2ACED1]/15 dark:border-[#D8F4F7]/10 dark:bg-[#011B3B] dark:text-white"
                  placeholder="/dashboard/products/reporting/data-management"
                />
              </label>

              <div className="rounded-2xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 p-4">
                <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                  Tip
                </p>
                <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                  Paste any dashboard route. If you use a relative page name, it will be
                  normalized under `/dashboard/`.
                </p>
              </div>

              <Button type="submit" variant="action" className="w-full">
                <Plus className="h-4 w-4" />
                Add shortcut
              </Button>
            </form>
          </Card>
        </div>
      </Modal>

      <DeveloperHubDialog
        key={`${pathname}-${isDeveloperModalOpen ? "open" : "closed"}`}
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
        pathname={pathname}
      />

      {false && (
      <Modal
        isOpen={isDeveloperModalOpen}
        onClose={() => {
          setIsDeveloperModalOpen(false);
          setIsMoreOpen(false);
        }}
        title="Developer"
        panelClassName="max-w-6xl overflow-visible"
        bodyClassName="p-0"
      >
        <div className="relative grid gap-6 p-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <Card className="overflow-visible border border-[#2ACED1]/15 bg-white/85 p-5 dark:bg-[#011B3B]/80">
            <div className="space-y-3">
              {developerPrimaryItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                const ItemIcon = getIcon(item.icon);

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsDeveloperModalOpen(false)}
                    className={`group flex items-start gap-3 rounded-2xl border px-3 py-3 transition-colors ${
                      active
                        ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                        : "border-black/5 bg-white/70 text-[#000C22]/75 hover:bg-black/5 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/75 dark:hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                        active
                          ? "border-[#2ACED1]/30 bg-white/85 dark:bg-[#000C22]"
                          : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                      }`}
                    >
                      <ItemIcon className="h-5 w-5" style={{ color: item.accent }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}

              <div className="relative overflow-visible">
                <button
                  type="button"
                  onClick={() => setIsMoreOpen((current) => !current)}
                  className="flex w-full items-center justify-between rounded-2xl border border-black/5 bg-white/70 px-3 py-3 text-left transition-colors hover:bg-black/5 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2ACED1]/20 bg-[#2ACED1]/10">
                      {(() => {
                        const Icon = getIcon(developerMenuMoreItem.icon);
                        return <Icon className="h-5 w-5 text-[#2ACED1]" />;
                      })()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                        {developerMenuMoreItem.label}
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                        {developerMenuMoreItem.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 text-[#000C22]/25 transition-transform dark:text-[#D8F4F7]/25 ${
                      isMoreOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      className="absolute left-full top-0 z-20 ml-3 w-72"
                    >
                      <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/95 p-3 shadow-2xl dark:bg-[#011B3B]/95">
                        <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                          More tools
                        </p>
                        <div className="grid gap-1">
                          {developerMoreItems.map((item) => {
                            const active = isActivePath(pathname, item.href);
                            const ItemIcon = getIcon(item.icon);

                            return (
                              <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => setIsDeveloperModalOpen(false)}
                                className={`flex items-start gap-3 rounded-2xl px-3 py-2 transition-colors ${
                                  active
                                    ? "bg-[#2ACED1]/10 text-[#008E96]"
                                    : "text-[#000C22]/75 hover:bg-black/5 dark:text-[#D8F4F7]/75 dark:hover:bg-white/10"
                                }`}
                              >
                                <div
                                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                                    active
                                      ? "border-[#2ACED1]/30 bg-white/85 dark:bg-[#000C22]"
                                      : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                                  }`}
                                >
                                  <ItemIcon className="h-4 w-4" style={{ color: item.accent }} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-[#000C22] dark:text-white">
                                    {item.label}
                                  </p>
                                  <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
              <div className="border-b border-black/5 px-5 py-4 dark:border-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                  Documentation
                </p>
                <h3 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
                  Reference and tooling
                </h3>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">
                {developerDocsItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                            const ItemIcon = getIcon(item.icon);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsDeveloperModalOpen(false)}
                      className={`rounded-2xl border p-4 transition-colors ${
                        active
                          ? "border-[#2ACED1]/30 bg-[#2ACED1]/10"
                          : "border-black/5 bg-white/70 hover:bg-black/5 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${item.accent}16` }}
                        >
                          <ItemIcon className="h-4 w-4" style={{ color: item.accent }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                            {item.label}
                          </p>
                          <p className="text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 p-5 dark:bg-[#011B3B]/80">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                  Quick start
                </p>
                <p className="mt-2 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                  The developer dialog mirrors Stripe&apos;s nested navigation flow while staying
                  aligned with Kopo Pay&apos;s own design language.
                </p>
              </Card>

              <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 p-5 dark:bg-[#011B3B]/80">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                  Route coverage
                </p>
                <p className="mt-2 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                  Every action in the dialog points to a real route, including the nested More
                  flyout and documentation destinations.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Modal>
      )}
    </>
  );
};
