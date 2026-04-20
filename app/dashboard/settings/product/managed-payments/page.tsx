"use client";

import { Wallet } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Button } from "@/components/atoms/Button";
import { SettingsPanel, SettingsToggleRow } from "@/components/templates/SettingsLayout";
import { useState } from "react";

export default function ManagedPaymentsSettingsPage() {
  const [controls, setControls] = useState({
    taxAutomation: true,
    fraudReview: true,
    disputesSupport: true,
  });

  return (
    <div className="space-y-6">
      <SettingsPanel
        title="Managed Payments"
        description="Kopo Pay's merchant of record handles global tax, fraud, and disputes."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Global regions", value: "12" },
            { label: "Tax coverage", value: "On" },
            { label: "Fraud policy", value: "Managed" },
            { label: "Disputes", value: "Assisted" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                  <Wallet className="h-5 w-5 text-[#2ACED1]" />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Enabled
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
          title="Coverage"
          description="Decide where Merchant of Record services are active."
          action={
            <Button type="button" variant="action">
              Save coverage
            </Button>
          }
        >
          <div className="space-y-3">
            <SettingsToggleRow
              title="Tax automation"
              description="Calculate and collect the right tax in supported regions."
              checked={controls.taxAutomation}
              onToggle={() => setControls((current) => ({ ...current, taxAutomation: !current.taxAutomation }))}
            />
            <SettingsToggleRow
              title="Fraud review"
              description="Route suspicious payments through a managed review flow."
              checked={controls.fraudReview}
              onToggle={() => setControls((current) => ({ ...current, fraudReview: !current.fraudReview }))}
            />
            <SettingsToggleRow
              title="Disputes support"
              description="Let the managed payment layer help with chargebacks."
              checked={controls.disputesSupport}
              onToggle={() => setControls((current) => ({ ...current, disputesSupport: !current.disputesSupport }))}
            />
          </div>
        </SettingsPanel>

        <SettingsPanel
          title="Managed payment features"
          description="Capabilities that help the platform feel global from day one."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: "Globe", label: "Local currencies", copy: "Display the right money format per market." },
                { icon: "ShieldCheck", label: "Tax handling", copy: "Reduce manual tax operations in supported flows." },
                { icon: "Shield", label: "Fraud support", copy: "Keep risk decisions close to the payment flow." },
                { icon: "SplitSquareVertical", label: "Disputes", copy: "Orchestrate chargeback handling with less friction." },
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
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </SettingsPanel>
      </div>
    </div>
  );
}
