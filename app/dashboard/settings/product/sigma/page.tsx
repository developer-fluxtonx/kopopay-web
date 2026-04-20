"use client";

import { BarChart3, Code, FileText, PlayCircle, Plus } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { SettingsField, SettingsPanel, settingsControlClass } from "@/components/templates/SettingsLayout";

const reports = [
  { name: "Monthly revenue", cadence: "Scheduled", status: "Active" },
  { name: "Disputes trend", cadence: "Weekly", status: "Active" },
  { name: "Fraud by region", cadence: "Manual", status: "Draft" },
];

export default function SigmaSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsPanel
        title="Sigma"
        description="Manage your Sigma features."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Reports", value: "3" },
            { label: "Queries", value: "12" },
            { label: "Schedules", value: "4" },
            { label: "Exports", value: "21" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                  <BarChart3 className="h-5 w-5 text-[#2ACED1]" />
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Ready
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
          title="Scheduled reports"
          description="Keep analytics exports predictable and easy to audit."
          action={
            <Button type="button" variant="action">
              <Plus className="h-4 w-4" />
              New report
            </Button>
          }
        >
          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.name}
                className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                    <FileText className="h-5 w-5 text-[#2ACED1]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                      {report.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                      {report.cadence}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#2ACED1]/10 px-3 py-1 text-xs font-semibold text-[#008E96]">
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        </SettingsPanel>

        <SettingsPanel
          title="Query access"
          description="Control who can create and execute Sigma queries."
        >
          <div className="grid gap-4">
            <SettingsField label="Default dataset">
              <select className={`${settingsControlClass} appearance-none`} defaultValue="payments">
                <option value="payments">Payments</option>
                <option value="billing">Billing</option>
                <option value="risk">Risk</option>
              </select>
            </SettingsField>
            <SettingsField label="Sigma query starter">
              <textarea
                className={`${settingsControlClass} min-h-[160px] resize-none font-mono text-sm`}
                defaultValue="SELECT date, sum(amount) FROM payments GROUP BY date ORDER BY date DESC;"
              />
            </SettingsField>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" size="sm">
                <PlayCircle className="h-4 w-4" />
                Test query
              </Button>
              <Button type="button" variant="outline" size="sm">
                <Code className="h-4 w-4" />
                Open workbench
              </Button>
            </div>
          </div>
        </SettingsPanel>
      </div>
    </div>
  );
}
