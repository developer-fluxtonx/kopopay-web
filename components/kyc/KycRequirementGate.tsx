"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Card } from "@/components/atoms/Card";
import {
  getKycCurrentStep,
  getKycStepRoute,
  getKycCompletionPercent,
  getRemainingKycSteps,
  type KycProfile,
} from "@/lib/kyc";
import { KycStatusBadge } from "./KycStatusBadge";

interface KycRequirementGateProps {
  featureName: string;
  profile?: KycProfile | null;
}

export function KycRequirementGate({
  featureName,
  profile,
}: KycRequirementGateProps) {
  const remainingSteps = getRemainingKycSteps(profile);
  const completionPercent = getKycCompletionPercent(profile);
  const currentStepHref = getKycStepRoute(getKycCurrentStep(profile));

  return (
    <Card className="overflow-hidden border border-[#2ACED1]/15 bg-white/85 dark:bg-[#011B3B]/80">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2ACED1]/10 px-3 py-1 text-xs font-semibold text-[#008E96]">
            <ShieldCheck className="h-3.5 w-3.5" />
            KYC gate enabled
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-[#000C22] dark:text-white">
                Verify your profile before you {featureName}.
              </h2>
              <KycStatusBadge profile={profile} />
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
              To keep money movement compliant, Kopo Pay only unlocks
              send and receive actions after the account holder completes
              identity verification.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={currentStepHref}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-action-button px-5 py-2.5 text-base font-medium text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2ACED1] focus:ring-offset-2"
            >
              Verify profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <div className="inline-flex items-center rounded-xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 px-4 py-2 text-sm font-medium text-[#000C22]/65 dark:text-[#D8F4F7]/65">
              Demo mode: verification completes instantly after final submit.
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              Completion
            </p>
            <p className="mt-3 text-3xl font-bold text-[#000C22] dark:text-white">
              {completionPercent}%
            </p>
            <div className="mt-4 h-2 rounded-full bg-[#000C22]/10 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2ACED1] to-[#034E78]"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white/70 p-5 dark:border-white/5 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              Remaining phases
            </p>
            <div className="mt-4 space-y-3">
              {remainingSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/70 p-3 dark:border-white/5 dark:bg-[#000C22]/30"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2ACED1]/10 text-xs font-bold text-[#008E96]">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                      {step.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
