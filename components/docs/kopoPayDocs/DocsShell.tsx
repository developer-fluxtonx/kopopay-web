"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Sparkles, X } from "lucide-react";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { docsPages, docsSidebarGroups, docsTopCategories } from "@/lib/kopoPayDocs/docsData";

interface DocsShellProps {
  children: React.ReactNode;
}

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export function DocsShell({ children }: DocsShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSearchIndex, setActiveSearchIndex] = useState(0);

  const activeGroupTitle = useMemo(() => {
    const group = docsSidebarGroups.find((section) =>
      section.items.some((item) => isActive(pathname, item.href))
    );
    return group?.title ?? "Browse docs";
  }, [pathname]);

  const headerFeaturedLinks = docsTopCategories.slice(0, 2);
  const headerCategoryLinks = docsTopCategories.slice(2);

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      return [];
    }

    return docsPages
      .filter((page) => {
        const slug = page.slug.join(" ").toLowerCase();
        return (
          page.title.toLowerCase().includes(trimmed) ||
          page.description.toLowerCase().includes(trimmed) ||
          slug.includes(trimmed)
        );
      })
      .slice(0, 8);
  }, [query]);

  const activeSearchResultIndex = searchResults.length
    ? activeSearchIndex % searchResults.length
    : 0;

  const openSearchResult = (index: number) => {
    const page = searchResults[index];

    if (!page) {
      return;
    }

    router.push(`/kopoPayDocs/${page.slug.join("/")}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-[#000C22] dark:bg-[#000C22] dark:text-[#D8F4F7]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#000C22]/90">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-3 px-4 sm:px-6">
          <Link href="/kopoPayDocs" className="flex items-center gap-3">
            <BrandLogo priority size={38} showLabel={false} />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-[#000C22] dark:text-white">Kopo Pay Docs</p>
              <p className="text-[11px] text-[#000C22]/50 dark:text-[#D8F4F7]/45">Clean docs for product and API guides</p>
            </div>
          </Link>

          <div className="relative hidden flex-1 items-center justify-center lg:flex">
            <label className="flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-black/5 bg-black/[0.03] px-4 py-3 text-sm text-[#000C22]/55 dark:border-white/10 dark:bg-white/5 dark:text-[#D8F4F7]/55">
              <Search className="h-4 w-4 text-[#2ACED1]" />
              <input
                aria-label="Search docs"
                placeholder="Search"
                className="w-full bg-transparent outline-none placeholder:text-[#000C22]/35 dark:placeholder:text-[#D8F4F7]/35"
                value={query}
                onFocus={() => setSearchOpen(true)}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSearchOpen(true);
                  setActiveSearchIndex(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setSearchOpen(false);
                    return;
                  }

                  if (!searchOpen || !query.trim() || searchResults.length === 0) {
                    return;
                  }

                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveSearchIndex((current) => (current + 1) % searchResults.length);
                  }

                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActiveSearchIndex((current) => (current - 1 + searchResults.length) % searchResults.length);
                  }

                  if (event.key === "Enter") {
                    event.preventDefault();
                    openSearchResult(activeSearchResultIndex);
                  }
                }}
                aria-controls="kopo-pay-docs-search-results"
                onBlur={() => {
                  window.setTimeout(() => setSearchOpen(false), 120);
                }}
              />
            </label>

            {searchOpen && query.trim() && (
              <div
                id="kopo-pay-docs-search-results"
                className="absolute left-1/2 top-[calc(100%+0.5rem)] z-50 w-full max-w-2xl -translate-x-1/2 rounded-3xl border border-black/5 bg-white p-3 shadow-2xl dark:border-white/10 dark:bg-[#011B3B]"
              >
                {searchResults.length > 0 ? (
                  <div className="grid max-h-80 gap-1 overflow-y-auto">
                    {searchResults.map((page, index) => (
                      <Link
                        key={page.slug.join("/")}
                        href={`/kopoPayDocs/${page.slug.join("/")}`}
                        className={`rounded-2xl px-4 py-3 transition ${
                          index === activeSearchResultIndex
                            ? "bg-[#2ACED1]/10 dark:bg-white/10"
                            : "hover:bg-[#2ACED1]/5 dark:hover:bg-white/5"
                        }`}
                        onMouseEnter={() => setActiveSearchIndex(index)}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                      >
                        <p className="text-sm font-semibold text-[#000C22] dark:text-white">{page.title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                          {page.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[#000C22]/55 dark:border-white/10 dark:text-[#D8F4F7]/55">
                    No docs found for &ldquo;{query}&rdquo;.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="hidden flex-col items-start justify-center gap-1 lg:flex">
            {headerFeaturedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[10px] font-semibold uppercase leading-none tracking-[0.22em] transition ${
                  isActive(pathname, item.href)
                    ? "text-[#008E96] dark:text-[#9DEEFF]"
                    : "text-[#000C22]/45 hover:text-[#008E96] dark:text-[#D8F4F7]/45 dark:hover:text-[#9DEEFF]"
                } ${item.title === "New business" ? "text-[11px] font-bold" : ""}`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <Link
            href="/kopoPayDocs/ask-ai"
            className="hidden items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:border-[#2ACED1]/30 hover:text-[#008E96] dark:border-white/10 dark:bg-white/5 dark:text-white md:inline-flex"
          >
            <Sparkles className="h-4 w-4 text-[#2ACED1]" />
            Ask AI
          </Link>

          <button
            type="button"
            onClick={() =>
              setMobileNavOpen((current) => {
                const next = !current;
                if (next) {
                  setMobileSidebarOpen(false);
                }
                return next;
              })
            }
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-[#000C22] shadow-sm transition hover:border-[#2ACED1]/30 hover:text-[#008E96] dark:border-white/10 dark:bg-white/5 dark:text-white lg:hidden"
            aria-label={mobileNavOpen ? "Close docs navigation" : "Open docs navigation"}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="mx-auto hidden max-w-[1440px] flex-wrap gap-x-5 gap-y-2 px-4 pb-4 sm:px-6 lg:flex">
          {headerCategoryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                isActive(pathname, item.href)
                  ? "text-[#008E96] dark:text-[#9DEEFF]"
                  : "text-[#000C22]/62 hover:text-[#008E96] dark:text-[#D8F4F7]/62 dark:hover:text-[#9DEEFF]"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </header>

      {mobileNavOpen && (
        <div className="border-b border-black/5 bg-white px-4 py-4 dark:border-white/10 dark:bg-[#011B3B] lg:hidden">
          <div className="mx-auto max-w-[1440px] space-y-4">
            <label className="flex items-center gap-3 rounded-2xl border border-black/5 bg-black/[0.03] px-4 py-3 text-sm text-[#000C22]/55 dark:border-white/10 dark:bg-white/5 dark:text-[#D8F4F7]/55">
              <Search className="h-4 w-4 text-[#2ACED1]" />
              <input
                aria-label="Search docs"
                placeholder="Search"
                className="w-full bg-transparent outline-none placeholder:text-[#000C22]/35 dark:placeholder:text-[#D8F4F7]/35"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <div className="flex gap-3">
              <Link
                href="/kopoPayDocs/ask-ai"
                onClick={() => setMobileNavOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-black/5 bg-white px-4 py-3 text-sm font-medium text-[#000C22] dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                Ask AI
              </Link>
              <Link
                href="/kopoPayDocs"
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-action-button px-4 py-3 text-sm font-semibold text-white"
                onClick={() => setMobileNavOpen(false)}
              >
                Docs home
              </Link>
            </div>

            <div className="grid gap-2">
              {docsTopCategories.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    isActive(pathname, item.href)
                      ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                      : "border-black/5 bg-black/[0.03] text-[#000C22]/75 dark:border-white/10 dark:bg-white/5 dark:text-[#D8F4F7]/75"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {mobileSidebarOpen && (
        <div className="border-b border-black/5 bg-white px-4 py-4 dark:border-white/10 dark:bg-[#011B3B] lg:hidden">
          <div className="mx-auto max-w-[1440px] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                  Browse docs
                </p>
                <p className="mt-1 text-sm text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                  Pick a section to open it.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-black/[0.03] text-[#000C22] dark:border-white/10 dark:bg-white/5 dark:text-white"
                aria-label="Close sidebar navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-5">
              {docsSidebarGroups.map((group) => (
                <section key={group.title} className="space-y-2">
                  <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                    {group.title}
                  </p>
                  <div className="grid gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`rounded-2xl px-3 py-2.5 transition ${
                          isActive(pathname, item.href)
                            ? "bg-[#2ACED1]/10 text-[#008E96] dark:text-[#9DEEFF]"
                            : "text-[#000C22]/70 hover:bg-black/[0.03] dark:text-[#D8F4F7]/70 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="block text-sm font-medium">{item.title}</span>
                        <span className="mt-0.5 block text-xs leading-5 text-[#000C22]/45 dark:text-[#D8F4F7]/45">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:pb-10">
        <aside className="hidden lg:block lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:pr-2">
          <div className="flex max-h-[calc(100vh-8rem)] flex-col pr-2">
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="space-y-5">
              {docsSidebarGroups.map((group) => (
                <section key={group.title} className="space-y-2">
                  <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                    {group.title}
                  </p>
                  <div className="grid gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-2xl px-3 py-2.5 transition ${
                          isActive(pathname, item.href)
                            ? "bg-[#2ACED1]/10 text-[#008E96] dark:text-[#9DEEFF]"
                            : "text-[#000C22]/70 hover:bg-black/[0.03] dark:text-[#D8F4F7]/70 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="block text-sm font-medium">{item.title}</span>
                        <span className="mt-0.5 block text-xs leading-5 text-[#000C22]/45 dark:text-[#D8F4F7]/45">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
              </div>
            </div>

            <div className="shrink-0 pt-6">
              <div className="rounded-2xl border border-black/5 bg-white px-3 py-3 shadow-sm dark:border-white/10 dark:bg-[#011B3B]">
                <div className="flex items-center gap-2 text-sm font-medium text-[#000C22]/75 dark:text-[#D8F4F7]/75">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 21 14"
                    className="h-3.5 w-5 overflow-hidden rounded-[2px] border border-black/10"
                  >
                    <rect width="21" height="14" fill="#B22234" />
                    <g fill="#FFFFFF">
                      <rect y="1.4" width="21" height="1.1" />
                      <rect y="4.2" width="21" height="1.1" />
                      <rect y="7" width="21" height="1.1" />
                      <rect y="9.8" width="21" height="1.1" />
                      <rect y="12.6" width="21" height="1.1" />
                    </g>
                    <rect width="8.5" height="7.7" fill="#3C3B6E" />
                    <g fill="#FFFFFF">
                      <circle cx="1.1" cy="1" r="0.35" />
                      <circle cx="2.3" cy="1" r="0.35" />
                      <circle cx="3.5" cy="1" r="0.35" />
                      <circle cx="4.7" cy="1" r="0.35" />
                      <circle cx="5.9" cy="1" r="0.35" />
                      <circle cx="7.1" cy="1" r="0.35" />
                      <circle cx="1.7" cy="2.1" r="0.35" />
                      <circle cx="2.9" cy="2.1" r="0.35" />
                      <circle cx="4.1" cy="2.1" r="0.35" />
                      <circle cx="5.3" cy="2.1" r="0.35" />
                      <circle cx="6.5" cy="2.1" r="0.35" />
                      <circle cx="7.7" cy="2.1" r="0.35" />
                      <circle cx="1.1" cy="3.2" r="0.35" />
                      <circle cx="2.3" cy="3.2" r="0.35" />
                      <circle cx="3.5" cy="3.2" r="0.35" />
                      <circle cx="4.7" cy="3.2" r="0.35" />
                      <circle cx="5.9" cy="3.2" r="0.35" />
                      <circle cx="7.1" cy="3.2" r="0.35" />
                      <circle cx="1.7" cy="4.3" r="0.35" />
                      <circle cx="2.9" cy="4.3" r="0.35" />
                      <circle cx="4.1" cy="4.3" r="0.35" />
                      <circle cx="5.3" cy="4.3" r="0.35" />
                      <circle cx="6.5" cy="4.3" r="0.35" />
                      <circle cx="7.7" cy="4.3" r="0.35" />
                    </g>
                  </svg>
                  <span>United States</span>
                </div>
                <p className="mt-1 text-xs leading-5 text-[#000C22]/45 dark:text-[#D8F4F7]/45">
                  English docs and regional settings
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 pb-8 lg:pb-12 lg:pr-2">
          <div className="mb-6 flex items-center justify-between rounded-3xl border border-black/5 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#011B3B] lg:hidden">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                {activeGroupTitle}
              </p>
              <p className="mt-1 text-sm text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                Open sidebar or top links.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setMobileSidebarOpen((current) => {
                  const next = !current;
                  if (next) {
                    setMobileNavOpen(false);
                  }
                  return next;
                })
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-black/[0.03] text-[#000C22] shadow-sm transition hover:border-[#2ACED1]/30 hover:text-[#008E96] dark:border-white/10 dark:bg-white/5 dark:text-white"
              aria-label={mobileSidebarOpen ? "Close sidebar navigation" : "Open sidebar navigation"}
              aria-expanded={mobileSidebarOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
