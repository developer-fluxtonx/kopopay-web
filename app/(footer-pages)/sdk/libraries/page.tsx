"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { 
  Terminal, Copy, Check, Info, ArrowRight, 
  Globe, Code, Box, Layers, 
  ChevronRight, ExternalLink, Download, Star
} from "lucide-react";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const sdks = [
  { 
    name: "Node.js", 
    version: "v12.4.0", 
    install: "npm install kopopay-node", 
    repo: "kopopay/kopopay-node",
    color: "#339933",
    desc: "The official Node.js library for Kopo Pay API integration."
  },
  { 
    name: "Python", 
    version: "v3.2.1", 
    install: "pip install kopopay", 
    repo: "kopopay/kopopay-python",
    color: "#3776AB",
    desc: "A Pythonic interface for all Kopo Pay endpoints."
  },
  { 
    name: "Go", 
    version: "v1.5.0", 
    install: "go get github.com/kopopay/kopopay-go", 
    repo: "kopopay/kopopay-go",
    color: "#00ACD7",
    desc: "High-performance Go client with full type safety."
  },
  { 
    name: "Ruby", 
    version: "v2.8.0", 
    install: "gem install kopopay", 
    repo: "kopopay/kopopay-ruby",
    color: "#CC342D",
    desc: "Integrate Kopo Pay into your Rails or Ruby apps seamlessly."
  },
  { 
    name: "PHP", 
    version: "v7.1.0", 
    install: "composer require kopopay/kopopay-php", 
    repo: "kopopay/kopopay-php",
    color: "#777BB4",
    desc: "Compatible with Laravel, Symfony, and pure PHP apps."
  },
  { 
    name: "Java", 
    version: "v22.0.0", 
    install: "implementation 'com.kopopay:kopopay-java:22.0.0'", 
    repo: "kopopay/kopopay-java",
    color: "#ED8B00",
    desc: "Enterprise-grade Java SDK with Maven and Gradle support."
  },
];

const mobileSdks = [
  { name: "iOS", tech: "Swift", icon: <Box className="w-5 h-5" />, href: "#" },
  { name: "Android", tech: "Kotlin", icon: <Box className="w-5 h-5" />, href: "#" },
  { name: "Flutter", tech: "Dart", icon: <Box className="w-5 h-5" />, href: "#" },
  { name: "React Native", tech: "JS/TS", icon: <Box className="w-5 h-5" />, href: "#" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SdkCard({ sdk }: { sdk: typeof sdks[0] }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#2ACED1]/40 hover:bg-[#2ACED1]/5 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-lg" style={{ backgroundColor: sdk.color }}>
            {sdk.name.slice(0, 2)}
          </div>
          <div>
            <h3 className="text-white font-bold">{sdk.name}</h3>
            <span className="text-[10px] text-white/40 font-mono tracking-tighter">{sdk.version}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="#" className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white transition">
            <Code className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <p className="text-xs text-white/60 leading-relaxed mb-6 h-12">
        {sdk.desc}
      </p>

      <div className="relative rounded-xl bg-[#011B3B] border border-white/10 p-3 mb-4 group-hover:border-[#2ACED1]/30 transition">
        <button
          onClick={() => { navigator.clipboard.writeText(sdk.install); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
        <code className="text-[10px] font-mono text-[#2ACED1] block pr-8 truncate">
          {sdk.install}
        </code>
      </div>

      <button className="w-full py-2.5 rounded-xl border border-[#2ACED1]/30 text-[#2ACED1] text-xs font-bold hover:bg-[#2ACED1] hover:text-white transition-all flex items-center justify-center gap-2">
        View Documentation <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LibrariesPage() {
  return (
    <div className="min-h-screen bg-[#000C22] pb-20">
      {/* Hero Section */}
      <div className="relative pt-24 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#2ACED1]/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Official SDKs</span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
                Integrate with your <br />
                <span className="text-[#2ACED1]">Favorite Language</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed">
                Start building quickly with our official client libraries. We handle the heavy lifting of 
                HTTP requests, authentication, and error handling so you can focus on your business logic.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Backend SDKs Grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Layers className="w-6 h-6 text-[#2ACED1]" /> Backend SDKs
          </h2>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Star className="w-4 h-4 text-amber-400" /> 12k+ Stars on Github
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sdks.map((sdk, i) => (
            <ScrollReveal key={i} delay={0.05 * i} direction="bottom">
              <SdkCard sdk={sdk} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Mobile & Frontend SDKs */}
      <div className="max-w-[1280px] mx-auto px-6 py-10 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Mobile & Frontend</h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Build beautiful, secure checkout experiences in your mobile apps. Our mobile SDKs 
              support native payment methods like Apple Pay and Google Pay out of the box.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {mobileSdks.map((sdk, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2ACED1]/30 transition group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="text-[#2ACED1]">{sdk.icon}</div>
                    <div>
                      <h4 className="text-white text-sm font-bold">{sdk.name}</h4>
                      <p className="text-[10px] text-white/40">{sdk.tech}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-[#2ACED1] transition" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video bg-[#011B3B] group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2ACED1]/20 to-transparent opacity-50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
              <Download className="w-12 h-12 text-[#2ACED1] mb-6 animate-bounce" />
              <h3 className="text-2xl font-bold text-white mb-4">Community Libraries</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-8">
                Looking for Rust, C#, or Flutter? Check out our developer-maintained community libraries.
              </p>
              <button className="px-8 py-3 rounded-full bg-white text-[#000C22] font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                Browse Community <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="max-w-[1280px] mx-auto px-6 mt-20">
        <div className="p-12 rounded-3xl bg-gradient-to-br from-[#011B3B] to-[#000C22] border border-white/10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Can't find what you're looking for?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Our API is standard REST. You can use any HTTP client to interact with Kopo Pay. 
            Check our raw API Reference for technical details.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/sdk/api-reference" className="px-8 py-3 rounded-full bg-[#2ACED1] text-white font-bold text-sm hover:bg-[#14A9AE] transition">
              Raw API Reference
            </Link>
            <Link href="/support" className="px-8 py-3 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/5 transition">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
