"use client";

import { CheckCircle2, ShieldAlert, ShieldCheck } from "lucide-react";
import { normalizeKycProfile, type KycProfile } from "@/lib/kyc";

interface KycStatusBadgeProps {
  profile?: KycProfile | null;
  className?: string;
}

const statusMap = {
  not_started: {
    label: "Verification required",
    className: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    Icon: ShieldAlert,
  },
  in_progress: {
    label: "Verification in progress",
    className: "border-[#2ACED1]/25 bg-[#2ACED1]/10 text-[#008E96] dark:text-[#6EE7F1]",
    Icon: ShieldCheck,
  },
  verified: {
    label: "Verified",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    Icon: CheckCircle2,
  },
} as const;

export function KycStatusBadge({
  profile,
  className = "",
}: KycStatusBadgeProps) {
  const normalized = normalizeKycProfile(profile);
  const config = statusMap[normalized.status];
  const Icon = config.Icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${config.className} ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}
