"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "../atoms/Button";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);

  const navItems = [
    { href: "#products", label: "Products" },
    { href: "#solutions", label: "Solutions" },
    { href: "#developers", label: "Developers" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <motion.header
      style={{ backgroundColor, backdropFilter: backdropBlur }}
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
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-[#2ACED1]">
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
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="border-t border-black/5 bg-white/95 px-4 py-4 shadow-[0_20px_40px_rgba(0,12,34,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#000C22]/95 sm:hidden"
          >
            <div className="mx-auto max-w-[1280px] space-y-4">
              <nav className="grid gap-2 text-sm font-medium text-[#000C22]/85 dark:text-[#D8F4F7]/85">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-black/5 bg-black/[0.03] px-4 py-3 transition hover:border-[#2ACED1]/30 hover:bg-[#2ACED1]/5 dark:border-white/10 dark:bg-white/5"
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
