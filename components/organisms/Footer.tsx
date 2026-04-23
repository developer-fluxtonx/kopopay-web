"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";

export function Footer() {
  return (
    <ScrollReveal direction="bottom">
      <footer className="bg-gradient-primary-button py-16 px-6 relative z-20 text-white border-none">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg">
                  <span className="text-[#008E96] font-bold text-lg">K</span>
                </div>
                <span className="text-xl font-bold tracking-tight">Kopo Pay</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-[200px]">
                Powering the next generation of global commerce. Built for developers by developers.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="bottom" delay={0.2}>
              <h6 className="font-bold mb-4 uppercase text-xs tracking-widest">Products</h6>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/payments" className="hover:text-white transition">Payments</Link></li>
                <li><Link href="/checkout" className="hover:text-white transition">Checkout</Link></li>
                <li><Link href="/subscriptions" className="hover:text-white transition">Subscriptions</Link></li>
                <li><Link href="/invoicing" className="hover:text-white transition">Invoicing</Link></li>
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="bottom" delay={0.3}>
              <h6 className="font-bold mb-4 uppercase text-xs tracking-widest">Developers</h6>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/sdk/docs" className="hover:text-white transition">Documentation</Link></li>
                <li><Link href="/sdk/api-reference" className="hover:text-white transition">API Reference</Link></li>
                <li><Link href="/libraries" className="hover:text-white transition">SDKs</Link></li>
                <li><Link href="/status" className="hover:text-white transition">Status</Link></li>
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="bottom" delay={0.4}>
              <h6 className="font-bold mb-4 uppercase text-xs tracking-widest">Resources</h6>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
              </ul>
            </ScrollReveal>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-white/40">
            <p>© {new Date().getFullYear()} Kopo Pay, Inc. All rights reserved.</p>
            <div className="flex gap-6">
               <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
               <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
               <Link href="/cookies" className="hover:text-white transition">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </ScrollReveal>
  );
}
