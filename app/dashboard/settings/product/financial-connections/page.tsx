"use client";

import { Landmark, Sparkles } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { SettingsField, SettingsPanel, SettingsToggleRow, settingsControlClass } from "@/components/templates/SettingsLayout";
import { useState } from "react";

const institutions = ["Chase", "Bank of America", "Wells Fargo", "Capital One"];

export default function FinancialConnectionsSettingsPage() {
  const [features, setFeatures] = useState({
    featured: true,
    optimizeSearch: true,
    usageInsights: false,
  });

  return (
    <div className="space-y-6">
      <SettingsPanel
        title="Financial Connections"
        description="Appearance, featured institutions, optimizations, and usage details."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Connected banks", value: "4" },
            { label: "Link success", value: "98%" },
            { label: "Optimizations", value: "2 active" },
            { label: "Usage", value: "1,240 links" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                  <Landmark className="h-5 w-5 text-[#2ACED1]" />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Live
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
          title="Appearance"
          description="Choose how the bank-link experience feels inside your product."
          action={
            <Button type="button" variant="action">
              Save appearance
            </Button>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SettingsField label="Brand title">
              <input className={settingsControlClass} defaultValue="Kopo Pay" />
            </SettingsField>
            <SettingsField label="Accent color">
              <input className={`${settingsControlClass} h-12 p-2`} type="color" defaultValue="#2ACED1" />
            </SettingsField>
            <SettingsField label="Call to action">
              <input className={settingsControlClass} defaultValue="Connect your bank" />
            </SettingsField>
            <SettingsField label="Optimization label">
              <input className={settingsControlClass} defaultValue="Fast and secure" />
            </SettingsField>
          </div>
        </SettingsPanel>

        <SettingsPanel
          title="Feature toggles"
          description="Make the connection flow easier to find and easier to use."
        >
          <div className="space-y-3">
            <SettingsToggleRow
              title="Show featured institutions"
              description="Pin the most common banks to the top of the selector."
              checked={features.featured}
              onToggle={() => setFeatures((current) => ({ ...current, featured: !current.featured }))}
            />
            <SettingsToggleRow
              title="Optimize institution search"
              description="Improve search ordering based on usage patterns."
              checked={features.optimizeSearch}
              onToggle={() => setFeatures((current) => ({ ...current, optimizeSearch: !current.optimizeSearch }))}
            />
            <SettingsToggleRow
              title="Show usage insights"
              description="Surface connection rates and completion details."
              checked={features.usageInsights}
              onToggle={() => setFeatures((current) => ({ ...current, usageInsights: !current.usageInsights }))}
            />
          </div>
          <div className="mt-4 rounded-2xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#2ACED1]" />
              <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                Featured institutions
              </p>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {institutions.map((bank) => (
                <div
                  key={bank}
                  className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 text-sm font-medium text-[#000C22]/75 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/75"
                >
                  {bank}
                </div>
              ))}
            </div>
          </div>
        </SettingsPanel>
      </div>
    </div>
  );
}
