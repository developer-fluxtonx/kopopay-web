"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Button } from "@/components/atoms/Button";
import { ChevronRight, Code, Terminal, Server } from "lucide-react";

export default function ApiReferencePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
        <ScrollReveal direction="left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14A9AE]/10 dark:bg-black/40 backdrop-blur-md border border-[#2ACED1]/30 mb-8 shadow-sm">
            <Code className="w-4 h-4 text-[#2ACED1]" />
            <span className="text-xs font-semibold tracking-wide text-[#000C22] dark:text-[#D8F4F7]">API Reference</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight leading-[1.1]">
            Build with the best APIs.
          </h1>
          <p className="text-xl text-[#000C22]/70 dark:text-[#D8F4F7]/70 mb-10 leading-relaxed max-w-lg">
            Our RESTful APIs are designed with developers in mind. Clean abstractions, predictable responses, and comprehensive documentation make integration a breeze.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="rounded-full shadow-[0_8px_30px_rgb(42,206,209,0.3)] px-8 hover:shadow-[0_12px_40px_rgb(42,206,209,0.5)] transition-all duration-300">
              View API Docs <ChevronRight className="ml-1 w-5 h-5" />
            </Button>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
           <div className="relative w-full rounded-3xl bg-[#011B3B] border border-white/10 shadow-2xl overflow-hidden shadow-cyan-500/20">
             <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 text-center text-[11px] text-white/40 font-mono">cURL</div>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto text-white/90">
                <pre>
                  <code>
{`curl https://api.kopopay.com/v1/charges \\
  -u sk_test_redacted_example_key: \\
  -d amount=2000 \\
  -d currency=usd \\
  -d source=tok_mastercard \\
  -d description="Charge for custom.com"`}
                  </code>
                </pre>
              </div>
           </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
