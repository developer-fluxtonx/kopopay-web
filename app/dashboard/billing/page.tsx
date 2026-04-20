"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { motion } from "framer-motion";
import { CreditCard, RefreshCw, Plus, ArrowUpRight, Check, Zap } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";

const plans = [
  { name: "Starter", price: 29, interval: "mo", features: ["Up to 100 customers", "Basic analytics", "Email support"], color: "#2ACED1", popular: false },
  { name: "Growth", price: 79, interval: "mo", features: ["Up to 1,000 customers", "Advanced analytics", "Priority support", "Custom branding"], color: "#008E96", popular: true },
  { name: "Enterprise", price: 299, interval: "mo", features: ["Unlimited customers", "AI-powered dunning", "Dedicated manager", "Custom integrations", "SLA guarantee"], color: "#034E78", popular: false },
];

const activeSubscriptions = [
  { customer: "Acme Corp", plan: "Growth", mrr: 79, status: "Active", nextBilling: "May 1, 2026" },
  { customer: "TechStart Inc", plan: "Enterprise", mrr: 299, status: "Active", nextBilling: "Apr 28, 2026" },
  { customer: "DesignLab", plan: "Starter", mrr: 29, status: "Past Due", nextBilling: "Apr 10, 2026" },
  { customer: "CloudNine", plan: "Growth", mrr: 79, status: "Active", nextBilling: "May 5, 2026" },
];

export default function BillingPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="left">
        <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-1">Billing & Subscriptions</h1>
        <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage subscription plans, track MRR, and handle billing cycles.</p>
      </ScrollReveal>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "MRR", value: "$12,480", icon: "TrendingUp", change: "+8.3%", dir: "left" as const },
          { label: "Active Subs", value: "156", icon: "Users", change: "+12", dir: "bottom" as const },
          { label: "Churn Rate", value: "2.1%", icon: "RefreshCw", change: "-0.4%", dir: "bottom" as const },
          { label: "Avg. Revenue", value: "$80", icon: "CreditCard", change: "+$5", dir: "right" as const },
        ].map((m, i) => (
          <ScrollReveal key={i} direction={m.dir} delay={i * 0.08}>
            <motion.div whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(42,206,209,0.15)" }}
              className="p-5 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 hover:border-[#2ACED1]/60 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#2ACED1]/10 flex items-center justify-center">
                  {(() => {
                    const Icon = getIcon(m.icon as string);
                    return <Icon className="w-4 h-4 text-[#2ACED1]" />;
                  })()}
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />{m.change}</span>
              </div>
              <p className="text-2xl font-bold text-[#000C22] dark:text-white">{m.value}</p>
              <p className="text-xs font-medium text-[#000C22]/50 dark:text-[#D8F4F7]/50 mt-1">{m.label}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Plans */}
      <ScrollReveal direction="top"><h2 className="text-lg font-bold text-[#000C22] dark:text-white">Subscription Plans</h2></ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <ScrollReveal key={i} direction={["left", "bottom", "right"][i] as "left" | "bottom" | "right"} delay={i * 0.1}>
            <motion.div whileHover={{ y: -6, boxShadow: "0 12px 35px rgba(42,206,209,0.2)" }}
              className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 relative overflow-hidden ${plan.popular ? "bg-gradient-to-br from-[#011B3B] to-[#034E78] border-[#2ACED1]/50 text-white" : "bg-white/80 dark:bg-[#011B3B]/80 border-[#2ACED1]/20"}`}>
              {plan.popular && <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#2ACED1] text-[#000C22] text-xs font-bold rounded-full flex items-center gap-1"><Zap className="w-3 h-3" />Popular</div>}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-sm opacity-60">/{plan.interval}</span>
              </div>
              <ul className="flex flex-col gap-2 mb-6">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm font-medium">
                    <Check className="w-4 h-4 text-[#2ACED1] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${plan.popular ? "bg-[#2ACED1] text-[#000C22] shadow-[0_4px_15px_rgba(42,206,209,0.4)]" : "bg-[#2ACED1]/10 text-[#2ACED1] hover:bg-[#2ACED1]/20 border border-[#2ACED1]/30"}`}>
                Get Started
              </motion.button>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Active Subscriptions Table */}
      <ScrollReveal direction="bottom" delay={0.1}>
        <h2 className="text-lg font-bold text-[#000C22] dark:text-white mb-4">Active Subscriptions</h2>
        <motion.div whileHover={{ boxShadow: "0 10px 30px rgba(42,206,209,0.08)" }}
          className="rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 overflow-hidden transition-shadow">
          <table className="w-full"><thead><tr className="border-b border-[#000C22]/5 dark:border-white/5">
            {["Customer", "Plan", "MRR", "Status", "Next Billing"].map(h => (
              <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider text-[#000C22]/40 dark:text-[#D8F4F7]/40 px-6 py-3">{h}</th>
            ))}
          </tr></thead><tbody>
            {activeSubscriptions.map((sub, i) => (
              <tr key={i} className="border-b border-[#000C22]/5 dark:border-white/5 last:border-0 hover:bg-[#2ACED1]/5 transition-colors cursor-pointer">
                <td className="px-6 py-4 text-sm font-semibold text-[#000C22] dark:text-white">{sub.customer}</td>
                <td className="px-6 py-4 text-sm text-[#000C22]/70 dark:text-[#D8F4F7]/70">{sub.plan}</td>
                <td className="px-6 py-4 text-sm font-bold text-emerald-600">${sub.mrr}</td>
                <td className="px-6 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${sub.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{sub.status}</span></td>
                <td className="px-6 py-4 text-sm text-[#000C22]/50 dark:text-[#D8F4F7]/50">{sub.nextBilling}</td>
              </tr>
            ))}
          </tbody></table>
        </motion.div>
      </ScrollReveal>
    </div>
  );
}
