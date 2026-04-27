"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Ban,
  Download,
  Filter,
  Fingerprint,
  Globe,
  Link as LinkIcon,
  Map as MapIcon,
  Plus,
  Search,
  Settings2,
  Share2,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GeometricHeroSphere } from "@/components/atoms/GeometricHeroSphere";

type RadarTab = "review" | "rules" | "analytics" | "blocklist";
type DetailTab = "signals" | "network";

type RiskTransaction = {
  id: string;
  customer: string;
  email: string;
  amount: string;
  risk: number;
  reason: string;
  action: "Blocked" | "Review" | "Allowed";
  age: string;
  network: number;
  country: string;
};

type RadarRule = {
  name: string;
  status: "Active" | "Paused" | "Draft";
  triggers: number;
  description: string;
};

type RiskSignal = {
  label: string;
  score: number;
  status: string;
  tone: "danger" | "warning" | "safe";
};

const summaryMetrics = [
  { label: "Pending review", value: "18", delta: "+3", tone: "danger" },
  { label: "Blocked in 24h", value: "247", delta: "-12%", tone: "success" },
  { label: "Precision", value: "99.9%", delta: "Stable", tone: "neutral" },
  { label: "False positives", value: "0.02%", delta: "Low", tone: "neutral" },
] as const;

const riskTransactions: RiskTransaction[] = [
  {
    id: "TXN-8821",
    customer: "Unknown",
    email: "temp4829@mail.ru",
    amount: "$4,200",
    risk: 92,
    reason: "IP velocity and fresh card combination",
    action: "Blocked",
    age: "2m ago",
    network: 5,
    country: "RU",
  },
  {
    id: "TXN-8819",
    customer: "John Smith",
    email: "j.smith@gmail.com",
    amount: "$890",
    risk: 45,
    reason: "New device with a short account history",
    action: "Review",
    age: "15m ago",
    network: 2,
    country: "US",
  },
  {
    id: "TXN-8815",
    customer: "Maria Lopez",
    email: "maria@corp.mx",
    amount: "$12,500",
    risk: 78,
    reason: "High-value order from unfamiliar fingerprint",
    action: "Review",
    age: "1h ago",
    network: 1,
    country: "MX",
  },
  {
    id: "TXN-8810",
    customer: "David Lee",
    email: "david@startup.com",
    amount: "$320",
    risk: 12,
    reason: "Established customer with stable behavior",
    action: "Allowed",
    age: "3h ago",
    network: 0,
    country: "US",
  },
];

const protectionRules: RadarRule[] = [
  {
    name: "Block high-risk countries",
    status: "Active",
    triggers: 23,
    description: "Stop payments from jurisdictions on the critical watch list.",
  },
  {
    name: "Require 3DS above $500",
    status: "Active",
    triggers: 156,
    description: "Escalate higher-value payments into step-up authentication.",
  },
  {
    name: "Velocity threshold",
    status: "Active",
    triggers: 8,
    description: "Flag cards that appear too frequently inside a short window.",
  },
  {
    name: "Prepaid card review",
    status: "Paused",
    triggers: 0,
    description: "Route prepaid and disposable funding sources for inspection.",
  },
];

const weeklyRiskData = [
  { name: "Mon", safe: 450, fraud: 12 },
  { name: "Tue", safe: 520, fraud: 18 },
  { name: "Wed", safe: 480, fraud: 8 },
  { name: "Thu", safe: 610, fraud: 24 },
  { name: "Fri", safe: 720, fraud: 15 },
  { name: "Sat", safe: 310, fraud: 5 },
  { name: "Sun", safe: 280, fraud: 2 },
];

const geoSignals = [
  { region: "North America", status: "Stable", tone: "success" },
  { region: "CIS Regions", status: "High risk", tone: "danger" },
  { region: "Southeast Asia", status: "Elevated", tone: "warning" },
  { region: "European Union", status: "Nominal", tone: "success" },
] as const;

const signalBreakdown: RiskSignal[] = [
  { label: "IP velocity", score: 95, status: "Critical", tone: "danger" },
  { label: "Device consistency", score: 42, status: "Review", tone: "warning" },
  { label: "Behavioral latency", score: 18, status: "Nominal", tone: "safe" },
  { label: "Card-email affinity", score: 88, status: "High risk", tone: "danger" },
];

const blocklistEntries = [
  {
    title: "IP ranges",
    copy: "Push known malicious network blocks into your detection layer.",
  },
  {
    title: "BIN and card patterns",
    copy: "Catch prepaid, disposable, or repeated card patterns before authorization.",
  },
  {
    title: "Email and device fingerprints",
    copy: "Reject recurring risk clusters tied to disposable identities.",
  },
];

const metricToneClass: Record<string, string> = {
  danger: "text-red-500",
  success: "text-emerald-500",
  neutral: "text-[#008E96]",
};

const signalToneClass: Record<string, string> = {
  danger: "text-red-500",
  warning: "text-amber-500",
  safe: "text-emerald-500",
};

const statusToneClass: Record<RadarRule["status"], string> = {
  Active: "bg-emerald-500/10 text-emerald-600",
  Paused: "bg-amber-500/10 text-amber-600",
  Draft: "bg-[#2ACED1]/10 text-[#008E96]",
};

const transactionToneClass = (risk: number) => {
  if (risk >= 80) return "bg-red-500/10 text-red-500 border-red-500/20";
  if (risk >= 40) return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
};

export default function RadarPage() {
  const [activeTab, setActiveTab] = useState<RadarTab>("review");
  const [selectedTx, setSelectedTx] = useState<RiskTransaction | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("signals");

  return (
    <div className="min-h-screen pb-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <ScrollReveal direction="left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2ACED1]/20 bg-[#2ACED1]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#008E96] dark:text-[#2ACED1]">
              <ShieldAlert className="h-4 w-4" />
              Radar
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#000C22] dark:text-white md:text-5xl">
              Monitor, score, and act on suspicious payments before they become losses.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#000C22]/62 dark:text-[#D8F4F7]/65 md:text-base">
              Radar centralizes fraud review, protection rules, and risk analytics in a single
              operational surface for teams that need speed, precision, and auditability.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-action-button px-5 py-3 text-sm font-semibold text-white shadow-md"
            >
              <Plus className="h-4 w-4" />
              New rule
            </motion.button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#2ACED1]/20 text-[#2ACED1] transition-colors hover:bg-[#2ACED1]/5">
              <Settings2 className="h-5 w-5" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-[#2ACED1]/15 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#011B3B]/80"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
              {metric.label}
            </p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-3xl font-bold text-[#000C22] dark:text-white">{metric.value}</p>
              <span className={`text-[11px] font-semibold ${metricToneClass[metric.tone]}`}>
                {metric.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-2 overflow-x-auto border-b border-[#2ACED1]/10 pb-px">
        {[
          { id: "review", label: "Review queue", icon: Activity },
          { id: "rules", label: "Protection rules", icon: ShieldCheck },
          { id: "analytics", label: "Analytics", icon: Globe },
          { id: "blocklist", label: "Blocklist", icon: Ban },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as RadarTab)}
              className={`relative inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "text-[#008E96] dark:text-[#2ACED1]"
                  : "text-[#000C22]/48 hover:text-[#000C22] dark:text-[#D8F4F7]/48 dark:hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="radar-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-[#2ACED1]"
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-8"
        >
          {activeTab === "review" && (
            <div className="space-y-6">
              <div className="rounded-[28px] border border-[#2ACED1]/15 bg-white/80 p-6 shadow-[0_18px_44px_rgba(0,12,34,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-[#011B3B]/80">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#008E96] dark:text-[#2ACED1]">
                      Review center
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-[#000C22] dark:text-white">
                      Focus on the highest-risk activity first.
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-[#000C22]/54 dark:text-[#D8F4F7]/54">
                    <span className="rounded-full bg-[#2ACED1]/10 px-3 py-1 text-[#008E96] dark:text-[#2ACED1]">
                      Live queue
                    </span>
                    <span>Updated just now</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-action-button px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-[#2ACED1]/20 px-4 py-2.5 text-sm font-semibold text-[#000C22] transition-colors hover:bg-[#2ACED1]/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-[#2ACED1]/15 bg-white/80 shadow-xl dark:border-white/10 dark:bg-[#011B3B]/80">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2ACED1]/10 bg-black/5 p-5 dark:bg-white/5">
                  <div className="relative min-w-[240px] flex-1">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2ACED1]/45" />
                    <input
                      type="text"
                      placeholder="Search transactions, fingerprints, or email patterns"
                      className="w-full rounded-xl border border-[#2ACED1]/10 bg-white py-3 pl-12 pr-4 text-sm text-[#000C22] outline-none transition focus:border-[#2ACED1] dark:bg-[#000C22] dark:text-white"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-[#000C22]/54 dark:text-[#D8F4F7]/54">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-600">
                      99.9% precision
                    </span>
                    <span className="rounded-full bg-[#2ACED1]/10 px-3 py-1 text-[#008E96] dark:text-[#2ACED1]">
                      18 pending
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#2ACED1]/10 bg-black/5 dark:bg-white/5">
                        <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                          Risk score
                        </th>
                        <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                          Signal
                        </th>
                        <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                          Age
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskTransactions.map((tx) => (
                        <tr
                          key={tx.id}
                          onClick={() => {
                            setSelectedTx(tx);
                            setDetailTab("signals");
                          }}
                          className="cursor-pointer border-b border-[#2ACED1]/10 transition-colors hover:bg-[#2ACED1]/5"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-semibold text-white ${
                                  tx.risk >= 80
                                    ? "bg-gradient-to-br from-red-500 to-red-700"
                                    : "bg-gradient-to-br from-[#2ACED1] to-[#034E78]"
                                }`}
                              >
                                {tx.customer.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-[#000C22] transition-colors group-hover:text-[#008E96] dark:text-white">
                                  {tx.customer}
                                </p>
                                <p className="mt-0.5 text-[10px] font-mono text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                                  {tx.id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${tx.risk}%` }}
                                  className={`h-full rounded-full ${
                                    tx.risk >= 80
                                      ? "bg-red-500"
                                      : tx.risk >= 40
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                  }`}
                                />
                              </div>
                              <span
                                className={`text-xs font-semibold ${
                                  tx.risk >= 80
                                    ? "text-red-500"
                                    : tx.risk >= 40
                                      ? "text-amber-500"
                                      : "text-emerald-600"
                                }`}
                              >
                                {tx.risk}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <LinkIcon
                                className={`h-3 w-3 ${
                                  tx.network > 0 ? "text-red-400" : "text-emerald-400"
                                }`}
                              />
                              <span className="text-xs text-[#000C22]/54 dark:text-[#D8F4F7]/54">
                                {tx.reason}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${transactionToneClass(
                                tx.risk
                              )}`}
                            >
                              {tx.action}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right text-xs text-[#000C22]/42 dark:text-[#D8F4F7]/42">
                            {tx.age}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "rules" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#008E96] dark:text-[#2ACED1]">
                    Protection rules
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#000C22] dark:text-white">
                    Tune risk posture without slowing down checkout.
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-7 text-[#000C22]/58 dark:text-[#D8F4F7]/58">
                  Rules are scoped for speed, explainability, and operational control. Each rule is
                  visible, editable, and ready to ship through a review workflow.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {protectionRules.map((rule) => (
                  <div
                    key={rule.name}
                    className="group flex h-full flex-col rounded-[26px] border border-[#2ACED1]/15 bg-white/80 p-6 shadow-sm transition-colors hover:border-[#2ACED1]/35 dark:border-white/10 dark:bg-[#011B3B]/80"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#008E96] dark:text-[#2ACED1]">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${statusToneClass[rule.status]}`}
                      >
                        {rule.status}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-[#000C22] transition-colors group-hover:text-[#008E96] dark:text-white">
                      {rule.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-[#000C22]/58 dark:text-[#D8F4F7]/58">
                      {rule.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-[#2ACED1]/10 pt-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#000C22]/34 dark:text-[#D8F4F7]/34">
                          Triggers
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#000C22] dark:text-white">
                          {rule.triggers}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-[#2ACED1] opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                ))}

                <button className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-[26px] border-2 border-dashed border-[#2ACED1]/20 bg-[#2ACED1]/5 p-6 text-center transition-colors hover:border-[#2ACED1]/45 hover:bg-[#2ACED1]/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2ACED1]/10 text-[#2ACED1]">
                    <Plus className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#000C22] dark:text-white">
                    Add rule
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[#000C22]/48 dark:text-[#D8F4F7]/48">
                    Ship a new heuristic for your risk team.
                  </p>
                </button>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[28px] border border-[#2ACED1]/15 bg-white/80 p-6 shadow-[0_18px_44px_rgba(0,12,34,0.06)] dark:border-white/10 dark:bg-[#011B3B]/80">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#008E96] dark:text-[#2ACED1]">
                      Analytics
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-[#000C22] dark:text-white">
                      Risk volume and safe traffic over time
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                    <TrendingDown className="h-4 w-4" />
                    -14% exposure
                  </div>
                </div>

                <div className="mt-6 h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyRiskData}>
                      <defs>
                        <linearGradient id="radarSafe" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2ACED1" stopOpacity={0.22} />
                          <stop offset="100%" stopColor="#2ACED1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(42,206,209,0.1)" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A94A6" }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8A94A6" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#011B3B",
                          border: "1px solid rgba(42,206,209,0.28)",
                          borderRadius: "16px",
                          color: "#fff",
                        }}
                      />
                      <Area type="monotone" dataKey="safe" stroke="#2ACED1" strokeWidth={3} fill="url(#radarSafe)" />
                      <Area
                        type="monotone"
                        dataKey="fraud"
                        stroke="#EF4444"
                        strokeWidth={2}
                        fill="transparent"
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[28px] border border-[#2ACED1]/15 bg-[#000C22] p-6 text-white shadow-[0_24px_64px_rgba(0,12,34,0.22)] dark:bg-[#021733]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2ACED1]/80">
                      Geo monitor
                    </p>
                    <h3 className="mt-2 text-xl font-bold">Traffic distribution by region</h3>
                  </div>
                  <Globe className="h-5 w-5 text-[#2ACED1]" />
                </div>

                <div className="mt-6 flex h-[260px] items-center justify-center rounded-[24px] border border-white/10 bg-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 z-0 opacity-60">
                    <GeometricHeroSphere />
                  </div>
                  <div className="pointer-events-none relative z-10 flex h-40 w-40 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-[#2ACED1]/15" />
                    <div className="absolute inset-4 rounded-full border border-[#2ACED1]/10" />
                    <div className="absolute inset-8 rounded-full border border-[#2ACED1]/10" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {geoSignals.map((node) => (
                    <div key={node.region} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">
                        {node.region}
                      </p>
                      <p
                        className={`mt-2 text-sm font-semibold ${
                          node.tone === "danger"
                            ? "text-red-400"
                            : node.tone === "warning"
                              ? "text-amber-400"
                              : "text-emerald-400"
                        }`}
                      >
                        {node.status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "blocklist" && (
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[28px] border border-[#2ACED1]/15 bg-white/80 p-6 shadow-[0_18px_44px_rgba(0,12,34,0.06)] dark:border-white/10 dark:bg-[#011B3B]/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                    <Ban className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#008E96] dark:text-[#2ACED1]">
                      Blocklist catalog
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-[#000C22] dark:text-white">
                      Edge filters for known risk patterns
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#000C22]/58 dark:text-[#D8F4F7]/58">
                  Maintain network, identity, and device-based blocklists that can be synchronized
                  into your fraud stack. The goal is fast rejection with a clear audit trail.
                </p>

                <div className="mt-6 space-y-3">
                  {blocklistEntries.map((entry) => (
                    <div
                      key={entry.title}
                      className="rounded-2xl border border-[#2ACED1]/10 bg-[#2ACED1]/5 p-4"
                    >
                      <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                        {entry.title}
                      </p>
                      <p className="mt-2 text-xs leading-6 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                        {entry.copy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[#2ACED1]/15 bg-white/80 p-6 shadow-[0_18px_44px_rgba(0,12,34,0.06)] dark:border-white/10 dark:bg-[#011B3B]/80">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#008E96] dark:text-[#2ACED1]">
                      Operational actions
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-[#000C22] dark:text-white">
                      Keep the team close to the controls that matter
                    </h3>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-[#2ACED1]/20 px-4 py-2.5 text-sm font-semibold text-[#000C22] transition-colors hover:bg-[#2ACED1]/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5">
                    <Download className="h-4 w-4" />
                    Import catalog
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[24px] border border-[#2ACED1]/10 bg-black/5 p-5 dark:bg-white/5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                      Active posture
                    </p>
                    <p className="mt-3 text-2xl font-bold text-[#000C22] dark:text-white">
                      Step-up at risk
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#000C22]/58 dark:text-[#D8F4F7]/58">
                      Use a review-first posture for ambiguous transactions and known risk clusters.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[#2ACED1]/10 bg-[#2ACED1]/5 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                      Control loop
                    </p>
                    <p className="mt-3 text-2xl font-bold text-[#000C22] dark:text-white">
                      Review, block, and learn
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#000C22]/58 dark:text-[#D8F4F7]/58">
                      Decisions feed back into rules and analytics so the system keeps improving.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="absolute inset-0 bg-[#000C22]/86 backdrop-blur-xl"
            />

            <motion.div
              layoutId={selectedTx.id}
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-[#2ACED1]/25 bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] dark:bg-[#011B3B]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#2ACED1]/10 bg-[#2ACED1]/5 p-6 md:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        selectedTx.risk >= 80
                          ? "bg-red-500 text-white"
                          : "bg-[#2ACED1] text-white"
                      }`}
                    >
                      Investigation trace
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#008E96] dark:text-[#2ACED1]">
                      {selectedTx.id}
                    </span>
                  </div>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#000C22] dark:text-white md:text-4xl">
                    {selectedTx.customer}
                  </h3>
                  <p className="mt-2 text-sm text-[#000C22]/58 dark:text-[#D8F4F7]/58">
                    {selectedTx.email} - {selectedTx.country}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="rounded-full p-2 text-[#000C22]/48 transition-colors hover:bg-black/5 hover:text-[#000C22] dark:text-[#D8F4F7]/48 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex gap-2 border-b border-[#2ACED1]/10 bg-black/5 px-4 py-3 dark:bg-white/5">
                {[
                  { id: "signals", label: "Signal breakdown", icon: Activity },
                  { id: "network", label: "Link analysis", icon: Share2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = detailTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setDetailTab(tab.id as DetailTab)}
                      className={`relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors ${
                        active
                          ? "bg-white text-[#008E96] shadow-sm dark:bg-[#000C22] dark:text-[#2ACED1]"
                          : "text-[#000C22]/55 hover:text-[#000C22] dark:text-[#D8F4F7]/55 dark:hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="custom-scrollbar flex-1 overflow-y-auto p-6 md:p-8">
                {detailTab === "signals" ? (
                  <div className="space-y-10">
                    <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                      <div className="rounded-[28px] border border-[#2ACED1]/15 bg-black/5 p-6 dark:bg-white/5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                          Aggregate risk
                        </p>
                        <div className="mt-6 flex items-center justify-center">
                          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-[#2ACED1]/10">
                            <svg className="absolute inset-0 h-full w-full -rotate-90">
                              <circle
                                cx="80"
                                cy="80"
                                r="72"
                                stroke="#2ACED1"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray="452"
                                strokeDashoffset={452 - (452 * selectedTx.risk) / 100}
                              />
                            </svg>
                            <div className="text-center">
                              <p className="text-4xl font-bold text-[#000C22] dark:text-white">
                                {selectedTx.risk}
                              </p>
                              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#008E96] dark:text-[#2ACED1]">
                                Risk score
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[28px] border border-[#2ACED1]/15 bg-black/5 p-6 dark:bg-white/5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                          Signals
                        </p>
                        <div className="mt-5 space-y-5">
                          {signalBreakdown.map((signal) => (
                            <div key={signal.label} className="space-y-2">
                              <div className="flex items-center justify-between gap-4 text-xs font-semibold">
                                <span className="text-[#000C22] dark:text-white">{signal.label}</span>
                                <span className={signalToneClass[signal.tone]}>{signal.status}</span>
                              </div>
                              <div className="h-2 rounded-full bg-black/10 dark:bg-white/10">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${signal.score}%` }}
                                  className={`h-full rounded-full ${
                                    signal.tone === "danger"
                                      ? "bg-red-500"
                                      : signal.tone === "warning"
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                  }`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-3 text-lg font-semibold text-[#000C22] dark:text-white">
                        <Fingerprint className="h-5 w-5 text-[#2ACED1]" />
                        Entity diagnostics
                      </h4>
                      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {[
                          { label: "Country", value: selectedTx.country, detail: "Watchlist matched" },
                          { label: "IP velocity", value: `${selectedTx.network} links`, detail: "Cluster active" },
                          { label: "Email", value: selectedTx.email, detail: "Disposable risk checked" },
                          { label: "Reason", value: selectedTx.reason, detail: "Primary signal" },
                        ].map((meta) => (
                          <div
                            key={meta.label}
                            className="rounded-2xl border border-[#2ACED1]/10 bg-white/70 p-4 dark:bg-white/5"
                          >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                              {meta.label}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-[#000C22] dark:text-white">
                              {meta.value}
                            </p>
                            <p className="mt-1 text-[10px] font-medium text-[#2ACED1]">
                              {meta.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-[28px] border border-[#2ACED1]/15 bg-black/5 p-6 dark:bg-white/5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                            Link network
                          </p>
                          <h4 className="mt-2 text-xl font-semibold text-[#000C22] dark:text-white">
                            Clustered identities and shared behavior
                          </h4>
                        </div>
                        <Share2 className="h-5 w-5 text-[#2ACED1]" />
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[
                          { label: "Shared card", value: "1" },
                          { label: "Shared IP", value: "4" },
                          { label: "Shared device", value: "2" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-2xl border border-white/10 bg-white/70 p-4 dark:bg-[#000C22]"
                          >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#000C22]/38 dark:text-[#D8F4F7]/38">
                              {item.label}
                            </p>
                            <p className="mt-2 text-2xl font-bold text-[#000C22] dark:text-white">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        "Same card used across multiple identities",
                        "Multiple reviews from nearby IP ranges",
                        "Shared device fingerprint in recent attempts",
                        "Pattern matches previous blocked clusters",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-[#2ACED1]/10 bg-white/70 p-4 dark:bg-white/5"
                        >
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#2ACED1]/10 text-[#2ACED1]">
                            <AlertTriangle className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-sm leading-6 text-[#000C22] dark:text-[#D8F4F7]">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
