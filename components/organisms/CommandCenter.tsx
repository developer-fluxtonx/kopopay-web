"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Command,
  CreditCard,
  LayoutGrid,
  Package,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { settingsGroups, settingsPages } from "@/app/dashboard/settings/settings.config";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: "transaction" | "customer" | "product" | "page" | "settings";
  url: string;
  keywords?: string[];
}

const STATIC_RESULTS: SearchResult[] = [
  {
    id: "tx_1",
    title: "$1,250.00",
    subtitle: "Sarah Johnson - Apr 15",
    type: "transaction",
    url: "/dashboard/transactions/TXN-20260415001",
  },
  {
    id: "cus_1",
    title: "Sarah Johnson",
    subtitle: "sarah.j@acme-corp.com",
    type: "customer",
    url: "/dashboard/customers/cus_9821HY",
  },
  {
    id: "prod_1",
    title: "Premium Subscription",
    subtitle: "$49.00/mo",
    type: "product",
    url: "/dashboard/products",
  },
];

const SETTINGS_RESULTS: SearchResult[] = [
  {
    id: "settings-overview",
    title: "Settings Overview",
    subtitle: "Workspace hub",
    type: "settings",
    url: "/dashboard/settings",
    keywords: ["settings", "overview", "hub"],
  },
  ...settingsGroups.map((group) => ({
    id: `settings-group-${group.id}`,
    title: group.label,
    subtitle: group.description,
    type: "settings" as const,
    url: group.href,
    keywords: [
      group.label,
      group.description,
      ...group.items.map((item) => item.label),
      ...group.items.flatMap((item) => item.keywords ?? []),
    ],
  })),
  ...settingsPages.map((page) => {
    const groupLabel =
      settingsGroups.find((group) => group.id === page.groupId)?.label ?? "Settings";

    return {
      id: `settings-page-${page.id}`,
      title: page.label,
      subtitle: `${groupLabel} · ${page.description}`,
      type: "page" as const,
      url: page.href,
      keywords: [groupLabel, page.label, page.description, ...(page.keywords ?? [])],
    };
  }),
];

const ALL_RESULTS: SearchResult[] = [...STATIC_RESULTS, ...SETTINGS_RESULTS];

export const CommandCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const closeCommandCenter = () => {
      setIsOpen(false);
      setQuery("");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          closeCommandCenter();
        } else {
          setIsOpen(true);
        }
      }

      if (e.key === "Escape") {
        closeCommandCenter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredResults = ALL_RESULTS.filter((item) => {
    if (!normalizedQuery) {
      return true;
    }

    const haystack = [item.title, item.subtitle, ...(item.keywords ?? [])]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  const visibleResults = normalizedQuery ? filteredResults : filteredResults.slice(0, 12);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(url);
  };

  const getIconForType = (type: SearchResult["type"]) => {
    switch (type) {
      case "transaction":
        return <CreditCard className="h-4 w-4 text-emerald-500" />;
      case "customer":
        return <Users className="h-4 w-4 text-[#2ACED1]" />;
      case "product":
        return <Package className="h-4 w-4 text-[#034E78]" />;
      case "settings":
        return <LayoutGrid className="h-4 w-4 text-[#2ACED1]" />;
      case "page":
      default:
        return <Settings className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#000C22]/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#2ACED1]/30 bg-white shadow-2xl dark:bg-[#011B3B]"
          >
            <div className="flex items-center gap-3 border-b border-[#000C22]/5 px-4 py-4 dark:border-white/5">
              <Search className="h-5 w-5 text-[#2ACED1]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search customers, transactions, pages, or settings..."
                className="flex-1 border-none bg-transparent text-lg outline-none text-[#000C22] placeholder:text-[#000C22]/40 dark:text-white dark:placeholder:text-white/40"
              />
              <div className="flex gap-1 text-[10px] font-bold text-[#000C22]/40 dark:text-white/40">
                <span className="rounded bg-black/5 px-2 py-1 dark:bg-white/5">ESC</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
              {normalizedQuery && visibleResults.length === 0 ? (
                <div className="py-12 text-center text-sm text-[#000C22]/50 dark:text-white/50">
                  No results found for {query}
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {visibleResults.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => handleSelect(result.url)}
                      className="group flex items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
                          {getIconForType(result.type)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#000C22] transition-colors group-hover:text-[#2ACED1] dark:text-white">
                            {result.title}
                          </p>
                          <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                            {result.subtitle}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#000C22]/20 transition-colors group-hover:text-[#2ACED1] dark:text-white/20" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#000C22]/5 bg-black/5 px-4 py-3 text-xs font-medium text-[#000C22]/50 dark:border-white/5 dark:bg-white/5 dark:text-white/50">
              <div className="flex items-center gap-2">
                <span>Pro Tip: Press</span>
                <span className="flex items-center gap-1 rounded bg-black/10 px-1.5 py-0.5 dark:bg-white/10">
                  <Command className="h-3 w-3" /> K
                </span>
                <span>anywhere to search</span>
              </div>
              <span className="opacity-50">Kopo Pay Command Center</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
