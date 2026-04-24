"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import { SettingsPanel } from "@/components/templates/SettingsLayout";
import {
  getKycCompletionPercent,
  getKycCurrentStep,
  getKycStepRoute,
  isKycVerified,
  KYC_OVERVIEW_ROUTE,
  normalizeKycProfile,
} from "@/lib/kyc";
import { useAuthStore } from "@/store/authStore";
import { kycStepIconMap } from "./kycFlowContent";
import { KycStatusBadge } from "./KycStatusBadge";

export function KycVerificationOverview() {
  const user = useAuthStore((state) => state.user);
  const resetKyc = useAuthStore((state) => state.resetKyc);

  const profile = normalizeKycProfile(user?.kyc);
  const currentStepId = getKycCurrentStep(profile);
  const currentStep = profile.steps.find((step) => step.id === currentStepId) ?? profile.steps[0];
  const completionPercent = getKycCompletionPercent(profile);
  const isVerified = isKycVerified(profile);
  const primaryHref = isVerified ? "/dashboard/send" : getKycStepRoute(currentStepId);

  return (
    <div className="space-y-6">
      <SettingsPanel
        title="Identity verification"
        description="Complete verification to unlock money movement across your account."
        action={
          <div className="flex flex-wrap gap-3">
            <KycStatusBadge profile={profile} />
            {!isVerified && (
              <Button variant="outline" type="button" onClick={resetKyc}>
                Reset demo
              </Button>
            )}
          </div>
        }
      >
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              Verification progress
            </p>
            <p className="mt-3 text-4xl font-bold text-[#000C22] dark:text-white">
              {completionPercent}%
            </p>
            <div className="mt-4 h-2 rounded-full bg-[#000C22]/10 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2ACED1] to-[#034E78]"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
              {isVerified
                ? "Your account is verified and ready for send and receive actions."
                : `${currentStep.title} is your next required step.`}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-action-button px-5 py-2.5 text-base font-medium text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              >
                {isVerified ? "Open send money" : completionPercent === 0 ? "Start verification" : "Continue verification"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              {!isVerified && (
                <Link
                  href={KYC_OVERVIEW_ROUTE}
                  className="inline-flex items-center justify-center rounded-xl border border-[#000C22]/15 px-4 py-2.5 text-sm font-semibold text-[#000C22] transition-colors hover:border-[#2ACED1]/40 hover:bg-[#2ACED1]/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                  Stay on overview
                </Link>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white/70 p-6 dark:border-white/5 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              Account holder
            </p>
            <p className="mt-3 text-lg font-bold text-[#000C22] dark:text-white">
              {user?.name ?? "John Doe"}
            </p>
            <p className="mt-1 text-sm text-[#000C22]/55 dark:text-[#D8F4F7]/55">
              {user?.email ?? "john@kopopay.com"}
            </p>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white/80 p-4 dark:border-white/5 dark:bg-[#000C22]/30">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ACED1]/10 text-[#008E96]">
                  {isVerified ? <CheckCircle2 className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                    {isVerified ? "Verification complete" : currentStep.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                    {isVerified ? "No further action is required right now." : currentStep.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SettingsPanel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {profile.steps.map((step, index) => {
          const Icon = kycStepIconMap[step.id];
          const isCurrent = step.status === "current";
          const isCompleted = step.status === "completed";
          const href = isCompleted || isCurrent ? getKycStepRoute(step.id) : undefined;

          const card = (
            <Card
              className={`h-full border p-5 transition-all duration-200 ${
                isCompleted
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : isCurrent
                    ? "border-[#2ACED1]/25 bg-[#2ACED1]/5"
                    : "border-black/5 bg-white/80 dark:border-white/5 dark:bg-[#011B3B]/80"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                    isCompleted
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                      : isCurrent
                        ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                        : "border-black/5 bg-black/5 text-[#000C22]/40 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/40"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#000C22]/45 dark:bg-white/10 dark:text-[#D8F4F7]/45">
                  {step.eta}
                </span>
              </div>

              <p className="mt-4 text-sm font-semibold text-[#000C22] dark:text-white">
                {index + 1}. {step.title}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                {step.description}
              </p>
            </Card>
          );

          if (!href) {
            return <div key={step.id}>{card}</div>;
          }

          return (
            <Link key={step.id} href={href} className="block">
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
