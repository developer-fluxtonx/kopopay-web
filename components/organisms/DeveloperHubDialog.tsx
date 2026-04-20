"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  FileText,
  Layers3,
  Link2,
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { Modal } from "@/components/molecules/Modal";
import {
  developerDocsItems,
  developerMenuMoreItem,
  developerMoreItems,
  developerPrimaryItems,
  type SidebarRouteItem,
} from "./dashboardSidebar.config";

interface DeveloperHubDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const developerSurfaceItems = [
  ...developerPrimaryItems,
  developerMenuMoreItem,
  ...developerMoreItems,
  ...developerDocsItems,
];

const developerLookupOrder = [
  ...developerMoreItems,
  ...developerDocsItems,
  ...developerPrimaryItems.slice(1),
  developerMenuMoreItem,
  developerPrimaryItems[0],
];

const isInCollection = (item: SidebarRouteItem, collection: SidebarRouteItem[]) =>
  collection.some((entry) => entry.id === item.id);

const findDeveloperItemByPath = (pathname: string) => {
  const exactMatch = developerSurfaceItems.find((item) => item.href === pathname);
  if (exactMatch) {
    return exactMatch;
  }

  return (
    developerLookupOrder.find((item) => pathname.startsWith(`${item.href}/`)) ??
    developerPrimaryItems[0]
  );
};

const getPanelContext = (item: SidebarRouteItem) => {
  if (item.id === developerMenuMoreItem.id || isInCollection(item, developerMoreItems)) {
    return {
      groupLabel: "More tools",
      groupDescription: "Health, Inspector, Blueprints, and Shell stay together here.",
      notes: [
        "The More flyout opens to the right on desktop and keeps the list readable.",
        "Each nested tool has its own route so backend wiring stays isolated.",
        "The panel is intentionally narrow and scrollable for faster scanning.",
      ],
      relatedItems:
        item.id === developerMenuMoreItem.id
          ? developerMoreItems
          : developerMoreItems.filter((child) => child.id !== item.id),
    };
  }

  if (isInCollection(item, developerDocsItems)) {
    return {
      groupLabel: "Documentation",
      groupDescription: "API reference, SDKs, CLI, keys, and app tooling.",
      notes: [
        "Documentation stays grouped separately so it is easy to discover.",
        "Every docs destination can later map to a real product or backend page.",
        "The dialog keeps docs close to the developer tools without feeling crowded.",
      ],
      relatedItems: developerDocsItems.filter((child) => child.id !== item.id),
    };
  }

  return {
    groupLabel: "Developer tools",
    groupDescription: "Overview, Webhooks, Events, and Logs live in the main launcher.",
    notes: [
      "This launcher behaves like a compact page shell instead of a huge modal.",
      "Click any item to preview the route before opening the full page.",
      "The structure is route-first so future API actions stay easy to plug in.",
    ],
    relatedItems: developerPrimaryItems.filter((child) => child.id !== item.id),
  };
};

export const DeveloperHubDialog: React.FC<DeveloperHubDialogProps> = ({
  isOpen,
  onClose,
  pathname,
}) => {
  const [selectedId, setSelectedId] = useState(() => findDeveloperItemByPath(pathname).id);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [copiedRoute, setCopiedRoute] = useState<string | null>(null);
  const DeveloperIcon = getIcon(developerPrimaryItems[0].icon);

  const selectedItem =
    developerSurfaceItems.find((item) => item.id === selectedId) ?? developerPrimaryItems[0];
  const panelContext = getPanelContext(selectedItem);

  const summaryCards = [
    {
      label: "Route",
      value: selectedItem.href,
      detail: "Deep-link target for this surface.",
      icon: "Link2",
      accent: selectedItem.accent,
    },
    {
      label: "Group",
      value: panelContext.groupLabel,
      detail: panelContext.groupDescription,
      icon: "Layers3",
      accent: "#034E78",
    },
    {
      label: "Related",
      value: `${panelContext.relatedItems.length}`,
      detail: "Pages in the same branch.",
      icon: "FileText",
      accent: "#2ACED1",
    },
  ];

  const handleSelectItem = (item: SidebarRouteItem) => {
    setSelectedId(item.id);
    setCopiedRoute(null);

    if (item.id !== developerMenuMoreItem.id && !isInCollection(item, developerMoreItems)) {
      setIsMoreOpen(false);
    }
  };

  const handleMoreToggle = () => {
    setSelectedId(developerMenuMoreItem.id);
    setIsMoreOpen((current) => !current);
    setCopiedRoute(null);
  };

  const handleCopyRoute = async () => {
    await navigator.clipboard.writeText(selectedItem.href);
    setCopiedRoute(selectedItem.href);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsMoreOpen(false);
        onClose();
      }}
      title="Developer"
      panelClassName="max-w-[1120px] h-[min(780px,calc(100vh-2rem))] flex flex-col overflow-hidden"
      bodyClassName="!p-0 flex-1 min-h-0"
    >
      <div className="grid h-full min-h-0 bg-white/95 dark:bg-[#011B3B]/95 md:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="relative flex min-h-0 flex-col border-b border-black/5 bg-[#F8FCFD] dark:border-white/5 dark:bg-white/[0.02] md:border-b-0 md:border-r">
          <div className="shrink-0 border-b border-black/5 px-5 py-4 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-action-button text-white shadow-md">
                <DeveloperIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                  Developer
                </p>
                <p className="text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                  API keys, webhooks, events, and docs.
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-visible px-3 py-4 custom-scrollbar">
            <div className="space-y-4">
              <section className="space-y-2">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                  Developer
                </p>
                <div className="space-y-1.5">
                  {developerPrimaryItems.map((item) => {
                    const active = selectedItem.id === item.id;
                    const ItemIcon = getIcon(item.icon);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectItem(item)}
                        className={`group flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition-colors ${
                          active
                            ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                            : "border-black/5 bg-white/70 text-[#000C22]/75 hover:bg-black/5 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/75 dark:hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                            active
                              ? "border-[#2ACED1]/30 bg-white/90 dark:bg-[#000C22]"
                              : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                          }`}
                        >
                          <ItemIcon className="h-4 w-4" style={{ color: item.accent }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                              {item.label}
                            </p>
                            <ChevronRight
                              className={`h-4 w-4 text-[#000C22]/20 transition-transform dark:text-[#D8F4F7]/20 ${
                                active ? "translate-x-0.5 text-[#2ACED1]" : ""
                              }`}
                            />
                          </div>
                          <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="relative overflow-visible space-y-2">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                  More
                </p>

                <div className="relative overflow-visible">
                  <button
                    type="button"
                    onClick={handleMoreToggle}
                    className={`group flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition-colors ${
                      selectedItem.id === developerMenuMoreItem.id ||
                      isInCollection(selectedItem, developerMoreItems)
                        ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                        : "border-black/5 bg-white/70 text-[#000C22]/75 hover:bg-black/5 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/75 dark:hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                        selectedItem.id === developerMenuMoreItem.id ||
                        isInCollection(selectedItem, developerMoreItems)
                          ? "border-[#2ACED1]/30 bg-white/90 dark:bg-[#000C22]"
                          : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                      }`}
                    >
                      {(() => {
                        const Icon = getIcon(developerMenuMoreItem.icon);
                        return <Icon className="h-4 w-4 text-[#2ACED1]" />;
                      })()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                            {developerMenuMoreItem.label}
                          </p>
                          <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                            {developerMenuMoreItem.description}
                          </p>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 text-[#000C22]/20 transition-transform dark:text-[#D8F4F7]/20 ${
                            isMoreOpen ? "rotate-90 text-[#2ACED1]" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isMoreOpen && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          className="absolute left-full top-0 z-30 ml-3 hidden w-72 md:block"
                        >
                          <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/95 p-3 shadow-2xl dark:bg-[#011B3B]/95">
                            <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                              Nested tools
                            </p>
                            <div className="grid gap-1">
                              {developerMoreItems.map((item) => {
                                const active = selectedItem.id === item.id;
                                const ItemIcon = getIcon(item.icon);

                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                      handleSelectItem(item);
                                      setIsMoreOpen(false);
                                    }}
                                    className={`flex items-start gap-3 rounded-2xl px-3 py-2 text-left transition-colors ${
                                      active
                                        ? "bg-[#2ACED1]/10 text-[#008E96]"
                                        : "text-[#000C22]/75 hover:bg-black/5 dark:text-[#D8F4F7]/75 dark:hover:bg-white/10"
                                    }`}
                                  >
                                    <div
                                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                                        active
                                          ? "border-[#2ACED1]/30 bg-white/90 dark:bg-[#000C22]"
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
                                  </button>
                                );
                              })}
                            </div>
                          </Card>
                        </motion.div>

                        <div className="grid gap-1 md:hidden">
                          <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/95 p-3 dark:bg-[#011B3B]/95">
                            <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                              Nested tools
                            </p>
                            <div className="grid gap-1">
                              {developerMoreItems.map((item) => {
                                const active = selectedItem.id === item.id;
                                const ItemIcon = getIcon(item.icon);

                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                      handleSelectItem(item);
                                      setIsMoreOpen(false);
                                    }}
                                    className={`flex items-start gap-3 rounded-2xl px-3 py-2 text-left transition-colors ${
                                      active
                                        ? "bg-[#2ACED1]/10 text-[#008E96]"
                                        : "text-[#000C22]/75 hover:bg-black/5 dark:text-[#D8F4F7]/75 dark:hover:bg-white/10"
                                    }`}
                                  >
                                    <div
                                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                                        active
                                          ? "border-[#2ACED1]/30 bg-white/90 dark:bg-[#000C22]"
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
                                  </button>
                                );
                              })}
                            </div>
                          </Card>
                        </div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              <section className="space-y-2">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                  Documentation
                </p>
                <div className="space-y-1.5">
                  {developerDocsItems.map((item) => {
                    const active = selectedItem.id === item.id;
                    const ItemIcon = getIcon(item.icon);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectItem(item)}
                        className={`group flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition-colors ${
                          active
                            ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                            : "border-black/5 bg-white/70 text-[#000C22]/75 hover:bg-black/5 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/75 dark:hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                            active
                              ? "border-[#2ACED1]/30 bg-white/90 dark:bg-[#000C22]"
                              : "border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5"
                          }`}
                        >
                          <ItemIcon className="h-4 w-4" style={{ color: item.accent }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                              {item.label}
                            </p>
                            <ChevronRight
                              className={`h-4 w-4 text-[#000C22]/20 transition-transform dark:text-[#D8F4F7]/20 ${
                                active ? "translate-x-0.5 text-[#2ACED1]" : ""
                              }`}
                            />
                          </div>
                          <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </aside>

        <div className="min-h-0 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(42,206,209,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,252,253,0.95))] px-5 py-5 dark:bg-[radial-gradient(circle_at_top_right,rgba(42,206,209,0.16),transparent_34%),linear-gradient(180deg,rgba(1,27,59,0.95),rgba(1,27,59,0.98))] md:px-6 md:py-6 custom-scrollbar">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              <span>Dashboard</span>
              <ChevronRight className="h-3 w-3" />
              <span>Developer</span>
              <ChevronRight className="h-3 w-3" />
              <span>{panelContext.groupLabel}</span>
            </div>

            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/90 dark:bg-[#011B3B]/85">
                <div className="grid gap-6 p-5 lg:grid-cols-[1.08fr_0.92fr] lg:p-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#2ACED1]/10 px-3 py-1 text-xs font-semibold text-[#008E96]">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: selectedItem.accent }}
                      />
                      Route preview
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-[#000C22] dark:text-white">
                        {selectedItem.label}
                      </h3>
                      <p className="max-w-2xl text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                        {selectedItem.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2 bg-white/70 dark:bg-white/5"
                        onClick={handleCopyRoute}
                      >
                        {copiedRoute === selectedItem.href ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        {copiedRoute === selectedItem.href ? "Copied" : "Copy route"}
                      </Button>

                      <Link
                        href={selectedItem.href}
                        onClick={onClose}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-action-button px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:translate-y-[-1px]"
                      >
                        Open page
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {summaryCards.map((card) => {
                      const StatIcon = getIcon(card.icon as string);
                      const isRouteCard = card.label === "Route";

                      return (
                        <div
                          key={card.label}
                          className="rounded-2xl border border-black/5 bg-white/75 p-4 dark:border-white/5 dark:bg-white/5"
                        >
                          <div className="flex items-center justify-between">
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-xl"
                              style={{ backgroundColor: `${card.accent}16` }}
                            >
                              <StatIcon className="h-5 w-5" style={{ color: card.accent }} />
                            </div>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                              Ready
                            </span>
                          </div>
                          <p className="mt-4 text-[#000C22] dark:text-white">
                            <span
                              className={
                                isRouteCard
                                  ? "block break-all font-mono text-sm font-semibold leading-6"
                                  : "block text-lg font-bold"
                              }
                            >
                              {card.value}
                            </span>
                          </p>
                          <p className="mt-1 text-xs font-semibold text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                            {card.label}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-[#000C22]/45 dark:text-[#D8F4F7]/45">
                            {card.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/90 dark:bg-[#011B3B]/85">
                <div className="border-b border-black/5 px-5 py-4 dark:border-white/5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                    What this covers
                  </p>
                  <h4 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
                    Clean menu, compact shell
                  </h4>
                </div>
                <div className="space-y-3 p-5">
                  {panelContext.notes.map((note, index) => (
                    <div
                      key={note}
                      className="flex gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
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

              <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/90 dark:bg-[#011B3B]/85">
                <div className="border-b border-black/5 px-5 py-4 dark:border-white/5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                    Related pages
                  </p>
                  <h4 className="mt-2 text-lg font-bold text-[#000C22] dark:text-white">
                    Browse within the same branch
                  </h4>
                </div>
                <div className="space-y-3 p-5">
                  {panelContext.relatedItems.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#2ACED1]/25 bg-[#2ACED1]/5 p-5 text-sm text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                      No sibling pages in this branch yet.
                    </div>
                  ) : (
                    panelContext.relatedItems.map((item) => {
                      const ItemIcon = getIcon(item.icon);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectItem(item)}
                          className="group flex w-full items-start gap-3 rounded-2xl border border-black/5 bg-white/70 px-4 py-3 text-left transition-colors hover:border-[#2ACED1]/30 hover:bg-[#2ACED1]/5 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10"
                        >
                          <div
                            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-[#2ACED1]/10 dark:border-white/5"
                          >
                            <ItemIcon className="h-4 w-4" style={{ color: item.accent }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <p className="text-sm font-semibold text-[#000C22] transition-colors group-hover:text-[#008E96] dark:text-white">
                                  {item.label}
                                </p>
                                <p className="mt-0.5 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                                  {item.description}
                                </p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-[#000C22]/25 transition-transform group-hover:translate-x-1 group-hover:text-[#2ACED1] dark:text-[#D8F4F7]/25" />
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
