"use client";

import { useEffect, useRef, useState, useMemo } from "react";
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
  Plus,
  Zap,
  Moon,
  Sun,
  ArrowUpRight,
  History,
} from "lucide-react";
import { settingsGroups, settingsPages } from "@/app/dashboard/settings/settings.config";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: "transaction" | "customer" | "product" | "page" | "settings" | "action";
  url?: string;
  keywords?: string[];
  action?: () => void;
  group: string;
}

const STATIC_RESULTS: SearchResult[] = [
  {
    id: "tx_1",
    title: "$1,250.00",
    subtitle: "Sarah Johnson - Apr 15",
    type: "transaction",
    url: "/dashboard/transactions/TXN-20260415001",
    group: "Transactions",
  },
  {
    id: "cus_1",
    title: "Sarah Johnson",
    subtitle: "sarah.j@acme-corp.com",
    type: "customer",
    url: "/dashboard/customers/cus_9821HY",
    group: "Customers",
  },
  {
    id: "prod_1",
    title: "Premium Subscription",
    subtitle: "$49.00/mo",
    type: "product",
    url: "/dashboard/products",
    group: "Products",
  },
];

export const CommandCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Combine all results
  const allPossibleResults = useMemo(() => {
    const settings: SearchResult[] = [
      {
        id: "settings-overview",
        title: "Settings Overview",
        subtitle: "Workspace hub",
        type: "settings",
        url: "/dashboard/settings",
        keywords: ["settings", "overview", "hub"],
        group: "Settings",
      },
      ...settingsGroups.map((group) => ({
        id: `settings-group-${group.id}`,
        title: group.label,
        subtitle: group.description,
        type: "settings" as const,
        url: group.href,
        group: "Settings",
        keywords: [
          group.label,
          group.description,
          ...group.items.map((item) => item.label),
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
          group: "Pages",
          keywords: [groupLabel, page.label, page.description, ...(page.keywords ?? [])],
        };
      }),
    ];

    const actions: SearchResult[] = [
      {
        id: "action-new-payment",
        title: "Create New Payment",
        subtitle: "Generate a payment link or invoice",
        type: "action",
        group: "Quick Actions",
        keywords: ["new", "payment", "invoice", "create"],
        action: () => alert("New Payment Modal (Coming Soon)"),
      },
      {
        id: "action-toggle-theme",
        title: "Toggle Appearance",
        subtitle: "Switch between light and dark mode",
        type: "action",
        group: "Quick Actions",
        keywords: ["theme", "dark", "light", "appearance"],
        action: () => {
          document.documentElement.classList.toggle("dark");
        },
      },
    ];

    return [...actions, ...STATIC_RESULTS, ...settings];
  }, []);

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return allPossibleResults.slice(0, 10);

    return allPossibleResults.filter((item) => {
      const haystack = [item.title, item.subtitle, ...(item.keywords ?? []), item.group]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    }).slice(0, 15);
  }, [query, allPossibleResults]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }

      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          const selected = filteredResults[selectedIndex];
          if (selected) {
            handleSelect(selected);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setQuery("");
    if (result.action) {
      result.action();
    } else if (result.url) {
      import("@/lib/safeRouter").then(({ safePush }) => safePush(router, result.url!));
    }
  };

  const getIconForType = (type: SearchResult["type"]) => {
    switch (type) {
      case "transaction": return <CreditCard className="h-4 w-4 text-emerald-500" />;
      case "customer": return <Users className="h-4 w-4 text-[#2ACED1]" />;
      case "product": return <Package className="h-4 w-4 text-[#034E78]" />;
      case "settings": return <LayoutGrid className="h-4 w-4 text-[#2ACED1]" />;
      case "action": return <Zap className="h-4 w-4 text-amber-500" />;
      default: return <Settings className="h-4 w-4 text-gray-400" />;
    }
  };

  // Grouping results for UI
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    filteredResults.forEach((res) => {
      if (!groups[res.group]) groups[res.group] = [];
      groups[res.group].push(res);
    });
    return groups;
  }, [filteredResults]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#000C22]/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#2ACED1]/30 bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] dark:bg-[#011B3B]"
          >
            {/* Search Input Area */}
            <div className="flex items-center gap-4 border-b border-[#000C22]/5 px-6 py-5 dark:border-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#2ACED1]">
                <Command className="h-5 w-5 animate-pulse" />
              </div>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything or run an action..."
                className="flex-1 border-none bg-transparent text-xl font-medium outline-none text-[#000C22] placeholder:text-[#000C22]/30 dark:text-white dark:placeholder:text-white/30"
              />
              <div className="hidden items-center gap-2 md:flex">
                <kbd className="flex h-6 items-center gap-1 rounded-lg border border-black/10 bg-black/5 px-2 text-[10px] font-bold text-black/40 dark:border-white/10 dark:bg-white/10 dark:text-white/40">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[65vh] overflow-y-auto p-3 custom-scrollbar">
              {filteredResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                   <div className="mb-4 rounded-full bg-black/5 p-4 dark:bg-white/5">
                      <Search className="h-8 w-8 text-[#000C22]/20 dark:text-white/20" />
                   </div>
                   <p className="text-lg font-bold text-[#000C22] dark:text-white">No results found</p>
                   <p className="text-sm text-[#000C22]/50 dark:text-white/50">Try searching for settings, customers, or actions.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedResults).map(([groupName, items]) => (
                    <div key={groupName} className="space-y-1">
                      <h3 className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#000C22]/40 dark:text-[#D8F4F7]/40">
                        {groupName}
                      </h3>
                      <div className="flex flex-col gap-1">
                        {items.map((result) => {
                          const isSelected = filteredResults.indexOf(result) === selectedIndex;
                          return (
                            <button
                              key={result.id}
                              onMouseEnter={() => setSelectedIndex(filteredResults.indexOf(result))}
                              onClick={() => handleSelect(result)}
                              className={`group relative flex items-center justify-between rounded-2xl p-4 text-left transition-all duration-200 ${
                                isSelected 
                                  ? "bg-gradient-to-r from-[#2ACED1]/20 to-[#034E78]/10 shadow-sm" 
                                  : "hover:bg-black/5 dark:hover:bg-white/5"
                              }`}
                            >
                              {isSelected && (
                                <motion.div 
                                  layoutId="active-bg"
                                  className="absolute inset-0 rounded-2xl border border-[#2ACED1]/30"
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                              )}
                              
                              <div className="relative z-10 flex items-center gap-4">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                                  isSelected ? "bg-[#2ACED1] text-white scale-110 rotate-3" : "bg-black/5 dark:bg-white/5"
                                }`}>
                                  {getIconForType(result.type)}
                                </div>
                                <div>
                                  <p className={`text-sm font-bold transition-colors ${
                                    isSelected ? "text-[#000C22] dark:text-white" : "text-[#000C22]/70 dark:text-white/70"
                                  }`}>
                                    {result.title}
                                  </p>
                                  <p className="text-xs text-[#000C22]/40 dark:text-[#D8F4F7]/40">
                                    {result.subtitle}
                                  </p>
                                </div>
                              </div>

                              <div className="relative z-10 flex items-center gap-3">
                                {isSelected && (
                                  <motion.span 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[10px] font-bold text-[#2ACED1]"
                                  >
                                    ENTER TO OPEN
                                  </motion.span>
                                )}
                                <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
                                  isSelected ? "translate-x-1 text-[#2ACED1]" : "text-[#000C22]/20 dark:text-white/20"
                                }`} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Command Bar Footer */}
            <div className="flex items-center justify-between border-t border-[#000C22]/5 bg-black/5 px-6 py-4 dark:border-white/10 dark:bg-black/20">
              <div className="flex items-center gap-6 text-[10px] font-bold text-[#000C22]/40 dark:text-white/40 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                   <span className="flex h-5 w-5 items-center justify-center rounded bg-black/5 dark:bg-white/10">↑</span>
                   <span className="flex h-5 w-5 items-center justify-center rounded bg-black/5 dark:bg-white/10">↓</span>
                   <span>Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="flex h-9 w-9 items-center justify-center rounded bg-black/5 dark:bg-white/10 text-[8px]">ENTER</span>
                   <span>Select</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#2ACED1]/60">
                 <Zap className="h-3 w-3 fill-current" />
                 <span className="text-[10px] font-bold tracking-tighter italic">QUANTUM ENGINE 2.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
