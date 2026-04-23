"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Search, ArrowRight, Star, GitFork, CheckCircle2, Code, BookOpen } from "lucide-react";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = ["All", "Server SDKs", "Client SDKs", "Mobile", "Frontend Libraries", "CLI Tools"];

const libraries = [
  // ── Server SDKs ─────────────────────────────────────────────────────────────
  {
    name: "kopo-node",
    language: "Node.js",
    category: "Server SDKs",
    install: "npm install kopopay",
    description: "The official Kopo Pay Node.js library. Full TypeScript support with complete JSDoc coverage.",
    stars: "8.2k",
    forks: "1.1k",
    version: "v22.3.0",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#339933"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fill="#fff" fontWeight="bold">N</text>
      </svg>
    ),
    color: "#339933",
  },
  {
    name: "kopo-python",
    language: "Python",
    category: "Server SDKs",
    install: "pip install kopopay",
    description: "The official Python library for the Kopo Pay API. Supports sync and async (asyncio) usage.",
    stars: "6.4k",
    forks: "890",
    version: "v9.1.0",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#3776AB"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#FFD43B" fontWeight="bold">Py</text>
      </svg>
    ),
    color: "#3776AB",
  },
  {
    name: "kopo-php",
    language: "PHP",
    category: "Server SDKs",
    install: "composer require kopopay/kopopay-php",
    description: "Official PHP library. Supports PHP 7.4+. Fully typed with PHPStan level 8.",
    stars: "4.1k",
    forks: "740",
    version: "v15.4.0",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#777BB4"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold">PHP</text>
      </svg>
    ),
    color: "#777BB4",
  },
  {
    name: "kopo-ruby",
    language: "Ruby",
    category: "Server SDKs",
    install: "gem install kopopay",
    description: "The official Kopo Pay gem for Ruby. Compatible with Ruby 2.7+ and all major frameworks.",
    stars: "3.8k",
    forks: "620",
    version: "v12.2.0",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#CC342D"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">RB</text>
      </svg>
    ),
    color: "#CC342D",
  },
  {
    name: "kopo-go",
    language: "Go",
    category: "Server SDKs",
    install: "go get github.com/kopopay/kopopay-go",
    description: "The official Kopo Pay Go library. Idiomatic Go with full context and error handling support.",
    stars: "5.0k",
    forks: "780",
    version: "v78.6.0",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#00ACD7"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="bold">Go</text>
      </svg>
    ),
    color: "#00ACD7",
  },
  {
    name: "kopo-java",
    language: "Java",
    category: "Server SDKs",
    install: "implementation 'com.kopopay:kopopay-java:22.0.0'",
    description: "Official Java library. Works with Maven and Gradle. Java 8+ compatible.",
    stars: "3.2k",
    forks: "560",
    version: "v22.0.0",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#ED8B00"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">JAVA</text>
      </svg>
    ),
    color: "#ED8B00",
  },
  {
    name: "kopo-dotnet",
    language: ".NET / C#",
    category: "Server SDKs",
    install: "dotnet add package KopoPay",
    description: "Official .NET library. Supports C# 8+ with nullable reference types and async/await.",
    stars: "2.9k",
    forks: "480",
    version: "v43.2.1",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#512BD4"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">.NET</text>
      </svg>
    ),
    color: "#512BD4",
  },
  // ── Client SDKs ─────────────────────────────────────────────────────────────
  {
    name: "kopo-js",
    language: "JavaScript (Browser)",
    category: "Client SDKs",
    install: '<script src="https://js.kopopay.com/v3/"></script>',
    description: "Kopo.js is a lightweight JavaScript library for building payment flows. Load it directly from our CDN.",
    stars: "11.4k",
    forks: "2.1k",
    version: "v3.0",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#F7DF1E"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fill="#222" fontWeight="bold">JS</text>
      </svg>
    ),
    color: "#F7DF1E",
  },
  {
    name: "kopo-react",
    language: "React",
    category: "Client SDKs",
    install: "npm install @kopopay/react",
    description: "React components and hooks for integrating Kopo Pay into your React or Next.js application.",
    stars: "9.3k",
    forks: "1.4k",
    version: "v4.5.0",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#222"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#61DBFB" fontWeight="bold">⚛</text>
      </svg>
    ),
    color: "#61DBFB",
  },
  // ── Mobile ──────────────────────────────────────────────────────────────────
  {
    name: "kopo-ios",
    language: "Swift (iOS)",
    category: "Mobile",
    install: ".package(url: \"https://github.com/kopopay/kopopay-ios\")",
    description: "Native iOS SDK for building custom payment UIs with Apple Pay, Cards, and more.",
    stars: "4.5k",
    forks: "670",
    version: "v22.8.2",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#000"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="bold"></text>
      </svg>
    ),
    color: "#000000",
  },
  {
    name: "kopo-android",
    language: "Kotlin (Android)",
    category: "Mobile",
    install: "implementation 'com.kopopay:kopopay-android:20.26.4'",
    description: "Native Android SDK with full Google Pay support, card scanning, and 3D Secure handling.",
    stars: "3.9k",
    forks: "580",
    version: "v20.26.4",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#3DDC84"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">DROID</text>
      </svg>
    ),
    color: "#3DDC84",
  },
  {
    name: "kopo-react-native",
    language: "React Native",
    category: "Mobile",
    install: "npm install @kopopay/react-native",
    description: "Kopo Pay React Native library. Cross-platform support for iOS and Android with native payment sheets.",
    stars: "5.6k",
    forks: "890",
    version: "v0.37.0",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#222"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fill="#61DBFB" fontWeight="bold">RN</text>
      </svg>
    ),
    color: "#61DBFB",
  },
  // ── Frontend Libraries ───────────────────────────────────────────────────────
  {
    name: "kopo-elements",
    language: "Web Components",
    category: "Frontend Libraries",
    install: "npm install @kopopay/elements",
    description: "Prebuilt, customizable payment UI components (Card Element, IBAN, etc.) that can be embedded in any web app.",
    stars: "7.1k",
    forks: "1.0k",
    version: "v1.54.1",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#2ACED1"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">EL</text>
      </svg>
    ),
    color: "#2ACED1",
  },
  // ── CLI Tools ────────────────────────────────────────────────────────────────
  {
    name: "kopo-cli",
    language: "CLI",
    category: "CLI Tools",
    install: "brew install kopopay/kopopay-cli/kopo",
    description: "The Kopo Pay CLI lets you build, test and manage your Kopo Pay integration from the terminal.",
    stars: "6.8k",
    forks: "940",
    version: "v1.21.5",
    official: true,
    docsUrl: "/kopoPayDocs",
    ghUrl: "#",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z" fill="#011B3B"/>
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#2ACED1" fontWeight="bold">CLI</text>
      </svg>
    ),
    color: "#034E78",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LibrariesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = libraries.filter((lib) => {
    const matchCat = activeCategory === "All" || lib.category === activeCategory;
    const matchSearch =
      lib.name.toLowerCase().includes(search.toLowerCase()) ||
      lib.language.toLowerCase().includes(search.toLowerCase()) ||
      lib.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-6">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14A9AE]/10 border border-[#2ACED1]/30 mb-8">
            <span className="text-xs font-semibold tracking-wide text-[#000C22] dark:text-[#D8F4F7]">
              Official Kopo Pay Libraries
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight">
            Libraries &amp; SDKs
          </h1>
          <p className="text-lg text-[#000C22]/70 dark:text-[#D8F4F7]/70">
            Official, actively maintained client libraries to integrate Kopo Pay
            into any stack.
          </p>
        </div>
      </ScrollReveal>

      {/* Search + Filter */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#000C22]/30 dark:text-white/30" />
            <input
              type="text"
              placeholder="Search libraries…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[#2ACED1]/20 bg-white/60 dark:bg-[#011B3B]/60 backdrop-blur-xl text-[#000C22] dark:text-white placeholder:text-[#000C22]/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#2ACED1]/40 transition text-sm font-medium"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-semibold border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#2ACED1] text-white border-[#2ACED1] shadow-lg shadow-cyan-500/20"
                    : "bg-white/50 dark:bg-[#011B3B]/40 text-[#000C22]/70 dark:text-white/60 border-[#2ACED1]/15 hover:border-[#2ACED1]/50 hover:text-[#2ACED1]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Library Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#000C22]/40 dark:text-white/30 text-lg">
          No libraries found for &ldquo;{search}&rdquo;
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((lib, idx) => (
            <ScrollReveal key={lib.name} direction="bottom" delay={0.05 * (idx % 6)}>
              <div className="group relative bg-white/50 dark:bg-[#011B3B]/50 backdrop-blur-xl border border-[#2ACED1]/15 rounded-3xl p-6 flex flex-col gap-5 shadow-sm hover:border-[#2ACED1]/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 h-full">
                {/* Official badge */}
                {lib.official && (
                  <div className="absolute top-5 right-5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2ACED1]/10 border border-[#2ACED1]/20">
                    <CheckCircle2 className="w-3 h-3 text-[#2ACED1]" />
                    <span className="text-[10px] font-bold text-[#2ACED1] uppercase tracking-widest">Official</span>
                  </div>
                )}

                {/* Top row: icon + meta */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ backgroundColor: `${lib.color}18` }}
                  >
                    {lib.icon}
                  </div>
                  <div className="flex-1 min-w-0 pr-16">
                    <h3 className="font-bold text-lg text-[#000C22] dark:text-white truncate">{lib.name}</h3>
                    <p className="text-xs font-semibold text-[#000C22]/50 dark:text-[#D8F4F7]/50 uppercase tracking-wider mt-0.5">
                      {lib.language}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#000C22]/70 dark:text-[#D8F4F7]/70 leading-relaxed flex-1">
                  {lib.description}
                </p>

                {/* Install command */}
                <div className="rounded-xl bg-[#000C22]/5 dark:bg-black/40 border border-black/5 dark:border-white/5 px-4 py-3">
                  <code className="text-xs font-mono text-[#008E96] dark:text-[#2ACED1] break-all">
                    {lib.install}
                  </code>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-4 text-xs text-[#000C22]/40 dark:text-white/30 font-medium">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {lib.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {lib.forks}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-[#2ACED1]/10 text-[#008E96] dark:text-[#2ACED1] font-bold">
                      {lib.version}
                    </span>
                  </div>
                  <Link
                    href={lib.docsUrl}
                    className="flex items-center gap-1 text-xs font-bold text-[#2ACED1] opacity-0 group-hover:opacity-100 transition-all duration-200 hover:gap-2"
                  >
                    Docs <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <ScrollReveal delay={0.1}>
        <div className="mt-20 text-center rounded-3xl border border-[#2ACED1]/20 bg-gradient-to-b from-[#2ACED1]/5 to-transparent p-14">
          <h2 className="text-3xl font-bold text-[#000C22] dark:text-white mb-4">
            Can&apos;t find what you need?
          </h2>
          <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 mb-8 max-w-xl mx-auto">
            Use our REST API directly or contribute your own community library.
            We&apos;re always looking to expand our ecosystem.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/sdk/api-reference"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2ACED1] text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:bg-[#14A9AE] transition-all duration-300"
            >
              <Code className="w-4 h-4" /> View API Reference
            </Link>
            <Link
              href="/sdk/docs"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#2ACED1]/30 text-[#000C22] dark:text-white font-semibold hover:border-[#2ACED1] hover:bg-[#2ACED1]/5 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4 text-[#2ACED1]" /> Read the Docs
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
