"use client";

import { CheckCircle2, FileText, Lock, ShieldCheck, Upload } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { SettingsPanel } from "@/components/templates/SettingsLayout";

const docs = [
  { name: "PCI attestation", status: "Current", updated: "Apr 12, 2026" },
  { name: "MSA agreement", status: "Signed", updated: "Mar 28, 2026" },
  { name: "Tax documents", status: "Uploaded", updated: "Apr 18, 2026" },
  { name: "Legacy export archive", status: "Stored", updated: "Feb 02, 2026" },
];

export default function ComplianceDocumentsSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsPanel
        title="Compliance and documents"
        description="PCI compliance, documents, and legacy exports."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "PCI status", value: "Compliant" },
            { label: "Documents", value: "4 stored" },
            { label: "Exports", value: "12 archived" },
            { label: "Retention", value: "12 months" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                  <ShieldCheck className="h-5 w-5 text-[#2ACED1]" />
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
          title="Documents"
          description="Keep the important files close and audit-friendly."
          action={
            <Button type="button" variant="action">
              <Upload className="h-4 w-4" />
              Upload document
            </Button>
          }
        >
          <div className="space-y-3">
            {docs.map((doc) => (
              <div
                key={doc.name}
                className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                    <FileText className="h-5 w-5 text-[#2ACED1]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                      {doc.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                      Updated {doc.updated}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#2ACED1]/10 px-3 py-1 text-xs font-semibold text-[#008E96]">
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </SettingsPanel>

        <SettingsPanel
          title="Compliance checklist"
          description="A fast read on what is already covered."
        >
          <div className="space-y-3">
            {[
              "PCI attestation uploaded and current.",
              "Standard contract signed by the legal owner.",
              "Legacy exports retained in archive storage.",
              "Evidence packages ready for manual review.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-sm leading-6 text-[#000C22]/70 dark:text-[#D8F4F7]/70">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 p-4">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#2ACED1]" />
              <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                Document policy
              </p>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
              Compliance documents can be synced later from your backend or a
              document service.
            </p>
          </div>
        </SettingsPanel>
      </div>
    </div>
  );
}
