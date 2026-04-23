"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Button } from "@/components/atoms/Button";
import { ChevronRight, Layers } from "lucide-react";

export default function SdksPage() {
  const sdks = [
    { name: "Node.js", cmd: "npm install kopopay" },
    { name: "Python", cmd: "pip install kopopay" },
    { name: "Ruby", cmd: "gem install kopopay" },
    { name: "Go", cmd: "go get github.com/kopopay/kopopay-go" },
    { name: "PHP", cmd: "composer require kopopay/kopopay-php" },
    { name: "Java", cmd: "implementation 'com.kopopay:kopopay-java:22.0.0'" }
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
        <ScrollReveal direction="left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14A9AE]/10 dark:bg-black/40 backdrop-blur-md border border-[#2ACED1]/30 mb-8 shadow-sm">
            <Layers className="w-4 h-4 text-[#2ACED1]" />
            <span className="text-xs font-semibold tracking-wide text-[#000C22] dark:text-[#D8F4F7]">Client & Server SDKs</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight leading-[1.1]">
            SDKs for every stack.
          </h1>
          <p className="text-xl text-[#000C22]/70 dark:text-[#D8F4F7]/70 mb-10 leading-relaxed max-w-lg">
            Integrate Kopo Pay into your application quickly with our official client and server libraries.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/libraries"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2ACED1] text-white font-semibold text-lg shadow-[0_8px_30px_rgb(42,206,209,0.3)] hover:shadow-[0_12px_40px_rgb(42,206,209,0.5)] hover:bg-[#14A9AE] transition-all duration-300"
            >
              View all libraries <ChevronRight className="ml-1 w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {sdks.map((sdk, idx) => (
               <div key={idx} className="bg-white/60 dark:bg-[#011B3B]/60 backdrop-blur-sm border border-[#2ACED1]/20 rounded-2xl p-6 shadow-lg shadow-cyan-500/5 hover:border-[#2ACED1] transition-colors duration-300">
                 <h4 className="font-bold text-[#000C22] dark:text-white mb-3">{sdk.name}</h4>
                 <code className="block bg-black/5 dark:bg-black/40 p-3 rounded-xl text-xs font-mono text-[#000C22]/80 dark:text-[#D8F4F7]/80 truncate">
                   {sdk.cmd}
                 </code>
               </div>
             ))}
           </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
