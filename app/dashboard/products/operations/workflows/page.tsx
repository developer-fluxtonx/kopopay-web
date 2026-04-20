"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Settings2, 
  Play, 
  Pause, 
  Trash2, 
  Activity, 
  Zap, 
  GitBranch, 
  Clock,
  ArrowRight
} from "lucide-react";
import { getIcon } from "@/components/IconRegistry";

const workflows = [
  { 
    id: "WF_101", 
    name: "High-value Transaction Alert", 
    description: "Notify compliance when a payment exceeds $10k.",
    triggers: ["Payment Created"],
    status: "Active",
    lastRun: "5m ago",
    runs: 1240,
    accent: "#2ACED1"
  },
  { 
    id: "WF_102", 
    name: "Customer Onboarding Sequence", 
    description: "Series of automated emails and checks for new signups.",
    triggers: ["Customer Created"],
    status: "Active",
    lastRun: "1hr ago",
    runs: 850,
    accent: "#008E96"
  },
  { 
    id: "WF_103", 
    name: "Failed Payment Retry", 
    description: "Automatic smart retries for card authorization failures.",
    triggers: ["Payment Failed"],
    status: "Active",
    lastRun: "12m ago",
    runs: 342,
    accent: "#034E78"
  },
  { 
    id: "WF_104", 
    name: "Monthly Revenue Report", 
    description: "Generate and email revenue summary to stakeholders.",
    triggers: ["Scheduled (Monthly)"],
    status: "Paused",
    lastRun: "15 days ago",
    runs: 12,
    accent: "#64748B"
  },
];

export default function WorkflowsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000C22] dark:text-white mb-1">Workflows</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Automate business processes and operational orchestration.</p>
          </div>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(42,206,209,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-action-button text-white font-bold shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Create Workflow
            </motion.button>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Workflows", value: "3", icon: "CheckCircle2", color: "text-emerald-500" },
          { label: "Total Runs (24h)", value: "2,450", icon: "Activity", color: "text-[#2ACED1]" },
          { label: "Success Rate", value: "99.9%", icon: "Zap", color: "text-amber-500" },
          { label: "Avg. Duration", value: "1.2s", icon: "Clock", color: "text-[#034E78]" },
        ].map((stat, i) => (
          <ScrollReveal key={i} direction="bottom" delay={i * 0.05}>
            <div className="p-4 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/10">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-[#000C22] dark:text-white">{stat.value}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal direction="bottom">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000C22]/30 dark:text-[#D8F4F7]/30" />
          <input 
            type="text" 
            placeholder="Search workflows by name or trigger..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-[#011B3B]/50 border border-[#2ACED1]/20 focus:border-[#2ACED1] outline-none transition-all placeholder:text-[#000C22]/30 dark:placeholder:text-white/30"
          />
        </div>
      </ScrollReveal>

      {/* Workflow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((wf, i) => (
          <ScrollReveal key={wf.id} direction="bottom" delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(42,206,209,0.15)" }}
              className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 backdrop-blur-sm border border-[#2ACED1]/20 hover:border-[#2ACED1]/60 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#2ACED1]/10">
                  <GitBranch className="w-6 h-6 text-[#2ACED1]" />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/30 dark:text-[#D8F4F7]/30 hover:text-[#2ACED1] transition-colors">
                    {wf.status === "Active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/30 dark:text-[#D8F4F7]/30 hover:text-[#2ACED1] transition-colors">
                    <Settings2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-500/10 text-[#000C22]/30 dark:text-[#D8F4F7]/30 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-[#000C22] dark:text-white group-hover:text-[#2ACED1] transition-colors mb-2">{wf.name}</h3>
                <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60 leading-relaxed">{wf.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {wf.triggers.map((trigger, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008E96]/10 text-[#008E96] text-[10px] font-bold uppercase tracking-wider">
                    <Activity className="w-3 h-3" /> {trigger}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-[#2ACED1]/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[10px] text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase mb-0.5">Runs</p>
                    <p className="text-sm font-bold text-[#000C22] dark:text-white">{wf.runs.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#000C22]/40 dark:text-[#D8F4F7]/40 font-bold uppercase mb-0.5">Last Run</p>
                    <p className="text-sm font-bold text-[#000C22] dark:text-white">{wf.lastRun}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${wf.status === "Active" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-gray-400"}`} />
                  <span className="text-xs font-bold text-[#000C22]/60 dark:text-[#D8F4F7]/60">{wf.status}</span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
