"use client";

import { ShieldAlert } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Button } from "@/components/atoms/Button";
import { SettingsPanel, SettingsToggleRow } from "@/components/templates/SettingsLayout";
import { useState } from "react";

export default function RadarSettingsPage() {
  const [rules, setRules] = useState({
    allowReview: true,
    blockHighRisk: true,
    customList: false,
  });

  return (
    <div className="space-y-6">
      <SettingsPanel
        title="Radar"
        description="Manage fraud protection and customization capabilities for your account."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Risk score", value: "Low" },
            { label: "Blocked", value: "14" },
            { label: "Reviews", value: "3 open" },
            { label: "Rules", value: "8 active" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                  <ShieldAlert className="h-5 w-5 text-[#2ACED1]" />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Active
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-[#000C22] dark:text-white">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </SettingsPanel>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SettingsPanel
          title="Protection rules"
          description="Tune the risk posture for checkout and account activity."
          action={
            <Button type="button" variant="action">
              Save Radar rules
            </Button>
          }
        >
          <div className="space-y-3">
            <SettingsToggleRow
              title="Allow review queue"
              description="Route uncertain transactions through manual review."
              checked={rules.allowReview}
              onToggle={() => setRules((current) => ({ ...current, allowReview: !current.allowReview }))}
            />
            <SettingsToggleRow
              title="Block high-risk transactions"
              description="Automatically stop transactions that exceed your threshold."
              checked={rules.blockHighRisk}
              onToggle={() => setRules((current) => ({ ...current, blockHighRisk: !current.blockHighRisk }))}
            />
            <SettingsToggleRow
              title="Custom watch lists"
              description="Use allow and block lists from your backend later."
              checked={rules.customList}
              onToggle={() => setRules((current) => ({ ...current, customList: !current.customList }))}
            />
          </div>
        </SettingsPanel>

        <SettingsPanel
          title="Fraud tooling"
          description="Useful controls for the risk team and operations."
        >
          <div className="space-y-3">
            {[
              { icon: "AlertTriangle", label: "Manual review thresholds" },
                { icon: "StopCircle", label: "Blocklists and allowlists" },
                { icon: "SlidersHorizontal", label: "Custom controls" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
              >
                <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = getIcon(item.icon as string);
                      return <Icon className="h-4 w-4 text-[#2ACED1]" />;
                    })()}
                  <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                    {item.label}
                  </p>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                  Keep the risk team close to the settings that matter.
                </p>
              </div>
            ))}
          </div>
        </SettingsPanel>
      </div>
    </div>
  );
}
