"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "../atoms/Button";
import {
  marketingNavItems,
  navbarProductColumns,
  navbarSolutionColumns,
} from "./navbarProducts.config";

const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isSolutionsMenuOpen, setIsSolutionsMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const otherNavItems = marketingNavItems.filter(
    (item) => item.label !== "Products" && item.label !== "Solutions"
  );
  const shouldLockScroll = isProductsMenuOpen || isSolutionsMenuOpen || isMobileMenuOpen;
  const headerStyle = isHydrated
    ? { backgroundColor, backdropFilter: backdropBlur }
    : { backgroundColor: "rgba(255, 255, 255, 0)", backdropFilter: "blur(0px)" };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsMenuOpen(false);
    setIsSolutionsMenuOpen(false);
    setIsMobileProductsOpen(false);
    setIsMobileSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (navRef.current && target && !navRef.current.contains(target)) {
        setIsProductsMenuOpen(false);
        setIsSolutionsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const { body, documentElement } = document;

    if (!shouldLockScroll) {
      body.style.overflow = "";
      body.style.touchAction = "";
      documentElement.style.overflow = "";
      documentElement.style.touchAction = "";
      return;
    }

    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    documentElement.style.overflow = "hidden";
    documentElement.style.touchAction = "none";

    return () => {
      body.style.overflow = "";
      body.style.touchAction = "";
      documentElement.style.overflow = "";
      documentElement.style.touchAction = "";
    };
  }, [shouldLockScroll]);

  return (
    <motion.header
      ref={navRef}
      style={headerStyle}
      className="fixed left-0 right-0 top-0 z-50 border-b border-transparent transition-colors duration-200 dark:bg-[#000C22]/80"
    >
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-action-button">
            <span className="text-lg font-bold text-white">K</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#000C22] dark:text-white">
            Kopo Pay
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#000C22]/80 dark:text-[#D8F4F7]/80 md:flex">
          <div
            className="relative"
          >
            <button
              type="button"
              aria-expanded={isProductsMenuOpen}
              onClick={() => {
                setIsProductsMenuOpen((current) => {
                  const next = !current;
                  if (next) {
                    setIsSolutionsMenuOpen(false);
                  }
                  return next;
                });
                setIsSolutionsMenuOpen(false);
              }}
              className={`group inline-flex items-center gap-2 rounded-full px-1 py-1 transition-colors ${
                isProductsMenuOpen
                  ? "text-[#008E96] dark:text-[#2ACED1]"
                  : "hover:text-[#2ACED1]"
              }`}
            >
              <span>Products</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isProductsMenuOpen ? "rotate-180 text-[#2ACED1]" : ""
                }`}
              />
            </button>
          </div>

          <div
            className="relative"
          >
            <button
              type="button"
              aria-expanded={isSolutionsMenuOpen}
              onClick={() => {
                setIsSolutionsMenuOpen((current) => {
                  const next = !current;
                  if (next) {
                    setIsProductsMenuOpen(false);
                  }
                  return next;
                });
                setIsProductsMenuOpen(false);
              }}
              className={`group inline-flex items-center gap-2 rounded-full px-1 py-1 transition-colors ${
                isSolutionsMenuOpen
                  ? "text-[#008E96] dark:text-[#2ACED1]"
                  : "hover:text-[#2ACED1]"
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isSolutionsMenuOpen ? "rotate-180 text-[#2ACED1]" : ""
                }`}
              />
            </button>
          </div>

          {otherNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                isActivePath(pathname, item.href)
                  ? "text-[#008E96] dark:text-[#2ACED1]"
                  : "hover:text-[#2ACED1]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/auth/login"
            className="hidden text-sm font-medium transition-colors hover:text-[#2ACED1] sm:inline-block"
          >
            Sign in
          </Link>
          <Button variant="primary" size="sm" className="rounded-full px-4 sm:px-5">
            Start now <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#000C22] shadow-sm transition hover:border-[#2ACED1]/40 hover:text-[#2ACED1] dark:border-white/10 dark:bg-white/5 dark:text-white sm:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isProductsMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="hidden md:block"
          >
            <div className="max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain border-t border-black/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.985),rgba(216,244,247,0.94))] shadow-[0_30px_90px_rgba(0,12,34,0.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(1,27,59,0.98),rgba(0,12,34,0.99))]">
              <div className="pointer-events-none absolute inset-x-0 top-20 h-28 bg-[radial-gradient(circle_at_top,rgba(42,206,209,0.22),transparent_72%)]" />
              <div className="mx-auto max-w-[1440px] px-6 py-8">
                <div className="grid gap-6 xl:grid-cols-[1.2fr_4fr]">
                  <div className="rounded-[32px] bg-[#000C22] p-7 text-white shadow-[0_24px_64px_rgba(0,12,34,0.24)] dark:bg-[#021733]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#2ACED1]/80">
                      Product Stack
                    </p>
                    <h3 className="mt-3 text-[30px] font-bold leading-tight">
                      Build every payment and revenue flow from one surface.
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-white/68">
                      Explore Kopo Pay products in a full-screen discovery view instead of a
                      cramped dropdown box.
                    </p>

                    <div className="mt-6 space-y-3">
                      <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-white">Start with the catalog</p>
                        <p className="mt-1 text-sm leading-6 text-white/62">
                          Browse all product surfaces and jump into the right dashboard area.
                        </p>
                        <Link
                          href="/dashboard/products"
                          onClick={() => setIsProductsMenuOpen(false)}
                          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold transition ${
                            isActivePath(pathname, "/dashboard/products")
                              ? "text-white"
                              : "text-[#2ACED1] hover:text-white"
                          }`}
                        >
                          Open product catalog
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                            Coverage
                          </p>
                          <p className="mt-2 text-2xl font-bold text-white">
                            {navbarProductColumns.reduce(
                              (total, column) => total + column.links.length,
                              0
                            )}
                          </p>
                          <p className="mt-1 text-sm text-white/62">Live product entry points</p>
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                            Best For
                          </p>
                          <p className="mt-2 text-sm leading-6 text-white/70">
                            Teams shipping payments, billing, marketplaces, and finance ops.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                    {navbarProductColumns.map((column, columnIndex) => (
                      <motion.div
                        key={column.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: columnIndex * 0.04 }}
                        className="rounded-[30px] border border-black/5 bg-white/78 p-5 shadow-[0_18px_40px_rgba(0,12,34,0.06)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
                      >
                        <div className="mb-4 border-b border-black/5 pb-4 dark:border-white/10">
                          <p className="text-base font-semibold text-[#000C22] dark:text-white">
                            {column.label}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-[#000C22]/52 dark:text-[#D8F4F7]/55">
                            {column.description}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          {column.links.map((link) => {
                            const active = isActivePath(pathname, link.href);

                            return (
                              <Link
                                key={link.id}
                                href={link.href}
                                onClick={() => setIsProductsMenuOpen(false)}
                                className={`group block rounded-[20px] px-3 py-2.5 transition duration-200 ${
                                  active
                                    ? "bg-[#D8F4F7] shadow-[inset_0_0_0_1px_rgba(42,206,209,0.22)] dark:bg-[#2ACED1]/14"
                                    : "hover:bg-[#D8F4F7] hover:shadow-[inset_0_0_0_1px_rgba(42,206,209,0.18)] dark:hover:bg-[#2ACED1]/10"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <p
                                      className={`text-sm font-semibold transition-colors ${
                                        active
                                          ? "text-[#008E96] dark:text-[#2ACED1]"
                                          : "text-[#000C22] group-hover:text-[#008E96] dark:text-white dark:group-hover:text-[#2ACED1]"
                                      }`}
                                    >
                                      {link.label}
                                    </p>
                                    <p className="mt-0.5 text-xs leading-5 text-[#000C22]/46 dark:text-[#D8F4F7]/48">
                                      {link.description}
                                    </p>
                                  </div>
                                  <span
                                    className={`mt-1 h-2 w-2 shrink-0 rounded-full transition duration-200 ${
                                      active
                                        ? "scale-125 bg-[#008E96] dark:bg-[#2ACED1]"
                                        : "bg-[#2ACED1]/40 group-hover:scale-125 group-hover:bg-[#008E96] dark:group-hover:bg-[#2ACED1]"
                                    }`}
                                  />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSolutionsMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="hidden md:block"
          >
            <div className="max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain border-t border-black/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.985),rgba(216,244,247,0.94))] shadow-[0_30px_90px_rgba(0,12,34,0.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(1,27,59,0.98),rgba(0,12,34,0.99))]">
              <div className="pointer-events-none absolute inset-x-0 top-20 h-28 bg-[radial-gradient(circle_at_top,rgba(42,206,209,0.22),transparent_72%)]" />
              <div className="mx-auto max-w-[1440px] px-6 py-8">
                <div className="grid gap-6 xl:grid-cols-[1.2fr_4fr]">
                  <div className="rounded-[32px] bg-[#000C22] p-7 text-white shadow-[0_24px_64px_rgba(0,12,34,0.24)] dark:bg-[#021733]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#2ACED1]/80">
                      Solution Library
                    </p>
                    <h3 className="mt-3 text-[30px] font-bold leading-tight">
                      Find the right Kopo Pay path by stage, use case, industry, and ecosystem.
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-white/68">
                      Stripe-style discovery for solutions, powered only by pages that already
                      exist in your system today.
                    </p>

                    <div className="mt-6 space-y-3">
                      <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-white">Start with checkout</p>
                        <p className="mt-1 text-sm leading-6 text-white/62">
                          Browse the main solutions entry point, then jump into the most relevant
                          guide or surface.
                        </p>
                        <Link
                          href="/checkout"
                          onClick={() => setIsSolutionsMenuOpen(false)}
                          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold transition ${
                            isActivePath(pathname, "/checkout")
                              ? "text-white"
                              : "text-[#2ACED1] hover:text-white"
                          }`}
                        >
                          Open solutions overview
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                            Coverage
                          </p>
                          <p className="mt-2 text-2xl font-bold text-white">
                            {navbarSolutionColumns.reduce(
                              (total, column) => total + column.links.length,
                              0
                            )}
                          </p>
                          <p className="mt-1 text-sm text-white/62">Live solution entry points</p>
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                            Built From
                          </p>
                          <p className="mt-2 text-sm leading-6 text-white/70">
                            Existing docs, guides, support pages, and connected dashboard routes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                    {navbarSolutionColumns.map((column, columnIndex) => (
                      <motion.div
                        key={column.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: columnIndex * 0.04 }}
                        className="rounded-[30px] border border-black/5 bg-white/78 p-5 shadow-[0_18px_40px_rgba(0,12,34,0.06)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
                      >
                        <div className="mb-4 border-b border-black/5 pb-4 dark:border-white/10">
                          <p className="text-base font-semibold text-[#000C22] dark:text-white">
                            {column.label}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-[#000C22]/52 dark:text-[#D8F4F7]/55">
                            {column.description}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          {column.links.map((link) => {
                            const active = isActivePath(pathname, link.href);

                            return (
                              <Link
                                key={link.id}
                                href={link.href}
                                onClick={() => setIsSolutionsMenuOpen(false)}
                                className={`group block rounded-[20px] px-3 py-2.5 transition duration-200 ${
                                  active
                                    ? "bg-[#D8F4F7] shadow-[inset_0_0_0_1px_rgba(42,206,209,0.22)] dark:bg-[#2ACED1]/14"
                                    : "hover:bg-[#D8F4F7] hover:shadow-[inset_0_0_0_1px_rgba(42,206,209,0.18)] dark:hover:bg-[#2ACED1]/10"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <p
                                      className={`text-sm font-semibold transition-colors ${
                                        active
                                          ? "text-[#008E96] dark:text-[#2ACED1]"
                                          : "text-[#000C22] group-hover:text-[#008E96] dark:text-white dark:group-hover:text-[#2ACED1]"
                                      }`}
                                    >
                                      {link.label}
                                    </p>
                                    <p className="mt-0.5 text-xs leading-5 text-[#000C22]/46 dark:text-[#D8F4F7]/48">
                                      {link.description}
                                    </p>
                                  </div>
                                  <span
                                    className={`mt-1 h-2 w-2 shrink-0 rounded-full transition duration-200 ${
                                      active
                                        ? "scale-125 bg-[#008E96] dark:bg-[#2ACED1]"
                                        : "bg-[#2ACED1]/40 group-hover:scale-125 group-hover:bg-[#008E96] dark:group-hover:bg-[#2ACED1]"
                                    }`}
                                  />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain border-t border-black/5 bg-white/95 px-4 py-4 shadow-[0_20px_40px_rgba(0,12,34,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#000C22]/95 sm:hidden"
          >
            <div className="mx-auto max-w-[1280px] space-y-4">
              <nav className="grid gap-2 text-sm font-medium text-[#000C22]/85 dark:text-[#D8F4F7]/85">
                <div className="overflow-hidden rounded-[24px] border border-[#2ACED1]/20 bg-[linear-gradient(180deg,rgba(216,244,247,0.55),rgba(255,255,255,0.92))] shadow-[0_14px_34px_rgba(0,12,34,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(42,206,209,0.08),rgba(255,255,255,0.04))]">
                  <button
                    type="button"
                    aria-expanded={isMobileProductsOpen}
                    onClick={() => {
                      setIsMobileProductsOpen((current) => !current);
                      setIsMobileSolutionsOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-4 py-4 text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#000C22] dark:text-white">Products</p>
                      <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                        Payments, revenue, money management, and platform tools
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2ACED1]/20 bg-white/70 dark:bg-white/5">
                      <ChevronDown
                        className={`h-4 w-4 text-[#2ACED1] transition-transform duration-200 ${
                          isMobileProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isMobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-black/5 px-3 pb-3 pt-2 dark:border-white/10">
                          <Link
                            href="/dashboard/products"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`mb-2 flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition dark:border-white/10 dark:bg-white/5 ${
                              isActivePath(pathname, "/dashboard/products")
                                ? "border-[#2ACED1]/35 bg-[#D8F4F7] text-[#008E96] dark:bg-[#2ACED1]/12 dark:text-[#2ACED1]"
                                : "border-[#2ACED1]/15 bg-white/80 text-[#008E96] hover:border-[#2ACED1]/35 dark:text-[#2ACED1]"
                            }`}
                          >
                            <span>Open product catalog</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>

                          <div className="grid gap-2">
                            {navbarProductColumns.map((column) => (
                              <div
                                key={column.id}
                                className="rounded-[20px] border border-black/5 bg-white/75 p-3 dark:border-white/10 dark:bg-white/5"
                              >
                                <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                                  {column.label}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/52">
                                  {column.description}
                                </p>
                                <div className="mt-3 grid gap-1.5">
                                  {column.links.map((link) => {
                                    const active = isActivePath(pathname, link.href);

                                    return (
                                      <Link
                                        key={link.id}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm transition ${
                                          active
                                            ? "bg-[#D8F4F7] dark:bg-[#2ACED1]/12"
                                            : "hover:bg-[#D8F4F7] dark:hover:bg-[#2ACED1]/10"
                                        }`}
                                      >
                                        <div className="pr-3">
                                          <p
                                            className={`font-medium ${
                                              active
                                                ? "text-[#008E96] dark:text-[#2ACED1]"
                                                : "text-[#000C22] dark:text-white"
                                            }`}
                                          >
                                            {link.label}
                                          </p>
                                          <p className="mt-0.5 text-xs leading-5 text-[#000C22]/48 dark:text-[#D8F4F7]/48">
                                            {link.description}
                                          </p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 shrink-0 text-[#2ACED1]" />
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-[#2ACED1]/20 bg-[linear-gradient(180deg,rgba(216,244,247,0.55),rgba(255,255,255,0.92))] shadow-[0_14px_34px_rgba(0,12,34,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(42,206,209,0.08),rgba(255,255,255,0.04))]">
                  <button
                    type="button"
                    aria-expanded={isMobileSolutionsOpen}
                    onClick={() => {
                      setIsMobileSolutionsOpen((current) => !current);
                      setIsMobileProductsOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-4 py-4 text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#000C22] dark:text-white">Solutions</p>
                      <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                        By stage, use case, industry, and ecosystem
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2ACED1]/20 bg-white/70 dark:bg-white/5">
                      <ChevronDown
                        className={`h-4 w-4 text-[#2ACED1] transition-transform duration-200 ${
                          isMobileSolutionsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isMobileSolutionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-black/5 px-3 pb-3 pt-2 dark:border-white/10">
                          <Link
                            href="/checkout"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`mb-2 flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition dark:border-white/10 dark:bg-white/5 ${
                              isActivePath(pathname, "/checkout")
                                ? "border-[#2ACED1]/35 bg-[#D8F4F7] text-[#008E96] dark:bg-[#2ACED1]/12 dark:text-[#2ACED1]"
                                : "border-[#2ACED1]/15 bg-white/80 text-[#008E96] hover:border-[#2ACED1]/35 dark:text-[#2ACED1]"
                            }`}
                          >
                            <span>Open solutions overview</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>

                          <div className="grid gap-2">
                            {navbarSolutionColumns.map((column) => (
                              <div
                                key={column.id}
                                className="rounded-[20px] border border-black/5 bg-white/75 p-3 dark:border-white/10 dark:bg-white/5"
                              >
                                <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                                  {column.label}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/52">
                                  {column.description}
                                </p>
                                <div className="mt-3 grid gap-1.5">
                                  {column.links.map((link) => {
                                    const active = isActivePath(pathname, link.href);

                                    return (
                                      <Link
                                        key={link.id}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm transition ${
                                          active
                                            ? "bg-[#D8F4F7] dark:bg-[#2ACED1]/12"
                                            : "hover:bg-[#D8F4F7] dark:hover:bg-[#2ACED1]/10"
                                        }`}
                                      >
                                        <div className="pr-3">
                                          <p
                                            className={`font-medium ${
                                              active
                                                ? "text-[#008E96] dark:text-[#2ACED1]"
                                                : "text-[#000C22] dark:text-white"
                                            }`}
                                          >
                                            {link.label}
                                          </p>
                                          <p className="mt-0.5 text-xs leading-5 text-[#000C22]/48 dark:text-[#D8F4F7]/48">
                                            {link.description}
                                          </p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 shrink-0 text-[#2ACED1]" />
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {otherNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition dark:border-white/10 dark:bg-white/5 ${
                      isActivePath(pathname, item.href)
                        ? "border-[#2ACED1]/30 bg-[#2ACED1]/8 text-[#008E96] dark:text-[#2ACED1]"
                        : "border-black/5 bg-black/[0.03] hover:border-[#2ACED1]/30 hover:bg-[#2ACED1]/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-[#2ACED1]" />
                  </Link>
                ))}
              </nav>

              <div className="flex gap-3">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-[#000C22] transition hover:border-[#2ACED1]/40 hover:text-[#2ACED1] dark:border-white/10 dark:text-white"
                >
                  Sign in
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 rounded-xl px-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
