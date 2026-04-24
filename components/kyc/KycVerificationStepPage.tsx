"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  LockKeyhole,
  ScanFace,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import {
  SettingsField,
  SettingsPanel,
  SettingsToggleRow,
  settingsControlClass,
} from "@/components/templates/SettingsLayout";
import {
  getKycCurrentStep,
  getKycStepRoute,
  isKycVerified,
  KYC_OVERVIEW_ROUTE,
  KYC_PHASES,
  normalizeKycProfile,
  type KycAddressStepDraft,
  type KycDocumentStepDraft,
  type KycProfileStepDraft,
  type KycReviewStepDraft,
  type KycStepId,
} from "@/lib/kyc";
import { safePush, safeReplace } from "@/lib/safeRouter";
import { useAuthStore } from "@/store/authStore";
import {
  kycAddressUploads,
  kycCountryOptions,
  kycDocumentTypeOptions,
  kycDocumentUploads,
  kycProofDocumentOptions,
  kycReviewHighlights,
  kycSourceOfFundsOptions,
  kycStepContent,
  kycStepIconMap,
  kycUseOfAccountOptions,
  kycVolumeOptions,
} from "./kycFlowContent";
import { KycStatusBadge } from "./KycStatusBadge";

interface KycVerificationStepPageProps {
  stepId: KycStepId;
}

const surfaceClass =
  "rounded-3xl border border-black/5 bg-white/70 p-5 dark:border-white/5 dark:bg-white/5";

function VerificationHintCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className={surfaceClass}>
      <p className="text-sm font-semibold text-[#000C22] dark:text-white">
        {title}
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2ACED1]/10 text-[#008E96]">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
            <p className="text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerificationUploadCard({
  title,
  description,
  helper,
  fileName,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  helper: string;
  fileName: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className={`${surfaceClass} h-full`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#008E96]">
          <FileText className="h-5 w-5" />
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          Ready
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-[#000C22] dark:text-white">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
        {description}
      </p>

      <div className="mt-4 rounded-2xl border border-black/5 bg-white/80 p-4 dark:border-white/5 dark:bg-[#000C22]/30">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
          Attached file
        </p>
        <p className="mt-2 text-sm font-medium text-[#000C22] dark:text-white">
          {fileName}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs leading-5 text-[#000C22]/50 dark:text-[#D8F4F7]/50">
          {helper}
        </p>
        <Button type="button" variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

function StepSummaryCard({
  icon: Icon,
  title,
  rows,
}: {
  icon: typeof ShieldCheck;
  title: string;
  rows: Array<{ label: string; value: string }>;
}) {
  return (
    <Card className="h-full border border-black/5 bg-white/80 p-5 dark:border-white/5 dark:bg-[#011B3B]/80">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#008E96]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-sm font-semibold text-[#000C22] dark:text-white">
        {title}
      </p>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="rounded-2xl border border-black/5 bg-white/70 p-3 dark:border-white/5 dark:bg-[#000C22]/30">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              {row.label}
            </p>
            <p className="mt-1 text-sm text-[#000C22] dark:text-white">
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function KycVerificationStepPage({
  stepId,
}: KycVerificationStepPageProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const updateKycDraft = useAuthStore((state) => state.updateKycDraft);
  const completeKycStep = useAuthStore((state) => state.completeKycStep);
  const submitKyc = useAuthStore((state) => state.submitKyc);

  const profile = normalizeKycProfile(user?.kyc, {
    name: user?.name,
    email: user?.email,
  });
  const currentStepId = getKycCurrentStep(profile);
  const currentIndex = KYC_PHASES.findIndex((step) => step.id === currentStepId);
  const stepIndex = KYC_PHASES.findIndex((step) => step.id === stepId);
  const stepMeta = profile.steps.find((step) => step.id === stepId) ?? profile.steps[0];
  const isVerified = isKycVerified(profile);
  const isLocked = !isVerified && stepIndex > currentIndex;
  const previousStep = stepIndex > 0 ? KYC_PHASES[stepIndex - 1] : null;
  const nextStep = stepIndex < KYC_PHASES.length - 1 ? KYC_PHASES[stepIndex + 1] : null;
  const isFinalStep = stepId === "review";
  const StepIcon = kycStepIconMap[stepId];
  const content = kycStepContent[stepId];

  const profileDraft = profile.draft.profile;
  const documentDraft = profile.draft.document;
  const addressDraft = profile.draft.address;
  const reviewDraft = profile.draft.review;

  const canContinue = {
    profile:
      Boolean(profileDraft.fullName.trim()) &&
      Boolean(profileDraft.email.trim()) &&
      Boolean(profileDraft.dateOfBirth.trim()) &&
      Boolean(profileDraft.phoneNumber.trim()) &&
      Boolean(profileDraft.countryOfResidence.trim()) &&
      Boolean(profileDraft.occupation.trim()),
    document:
      Boolean(documentDraft.documentType.trim()) &&
      Boolean(documentDraft.documentNumber.trim()) &&
      Boolean(documentDraft.issuingCountry.trim()) &&
      Boolean(documentDraft.expiryDate.trim()) &&
      Boolean(documentDraft.frontFileName.trim()) &&
      Boolean(documentDraft.backFileName.trim()) &&
      Boolean(documentDraft.selfieFileName.trim()),
    address:
      Boolean(addressDraft.addressLine1.trim()) &&
      Boolean(addressDraft.city.trim()) &&
      Boolean(addressDraft.region.trim()) &&
      Boolean(addressDraft.postalCode.trim()) &&
      Boolean(addressDraft.country.trim()) &&
      Boolean(addressDraft.proofDocumentType.trim()) &&
      Boolean(addressDraft.proofFileName.trim()),
    review:
      Boolean(reviewDraft.useOfAccount.trim()) &&
      Boolean(reviewDraft.expectedMonthlyVolume.trim()) &&
      Boolean(reviewDraft.sourceOfFunds.trim()) &&
      reviewDraft.confirmAccurate &&
      reviewDraft.acceptTerms,
  }[stepId];

  useEffect(() => {
    if (isLocked) {
      safeReplace(router, getKycStepRoute(currentStepId));
    }
  }, [currentStepId, isLocked, router]);

  const handleProfileChange = (
    field: keyof KycProfileStepDraft,
    value: string
  ) => {
    updateKycDraft("profile", { [field]: value } as Partial<KycProfileStepDraft>);
  };

  const handleDocumentChange = (
    field: keyof KycDocumentStepDraft,
    value: string
  ) => {
    updateKycDraft("document", {
      [field]: value,
    } as Partial<KycDocumentStepDraft>);
  };

  const handleAddressChange = (
    field: keyof KycAddressStepDraft,
    value: string
  ) => {
    updateKycDraft("address", {
      [field]: value,
    } as Partial<KycAddressStepDraft>);
  };

  const handleReviewChange = (
    field: keyof KycReviewStepDraft,
    value: string | boolean
  ) => {
    updateKycDraft("review", {
      [field]: value,
    } as Partial<KycReviewStepDraft>);
  };

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    if (isFinalStep) {
      submitKyc();
      safePush(router, KYC_OVERVIEW_ROUTE);
      return;
    }

    completeKycStep(stepId);

    if (nextStep) {
      safePush(router, getKycStepRoute(nextStep.id));
      return;
    }

    safePush(router, KYC_OVERVIEW_ROUTE);
  };

  const renderProfileStep = () => (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div className={`${surfaceClass} space-y-5`}>
        <div className="grid gap-5 md:grid-cols-2">
          <SettingsField label="Legal full name">
            <input
              type="text"
              value={profileDraft.fullName}
              onChange={(event) =>
                handleProfileChange("fullName", event.target.value)
              }
              className={settingsControlClass}
              placeholder="John Doe"
            />
          </SettingsField>
          <SettingsField label="Email address">
            <input
              type="email"
              value={profileDraft.email}
              onChange={(event) =>
                handleProfileChange("email", event.target.value)
              }
              className={settingsControlClass}
              placeholder="john@kopopay.com"
            />
          </SettingsField>
          <SettingsField label="Date of birth">
            <input
              type="date"
              value={profileDraft.dateOfBirth}
              onChange={(event) =>
                handleProfileChange("dateOfBirth", event.target.value)
              }
              className={settingsControlClass}
            />
          </SettingsField>
          <SettingsField label="Phone number">
            <input
              type="tel"
              value={profileDraft.phoneNumber}
              onChange={(event) =>
                handleProfileChange("phoneNumber", event.target.value)
              }
              className={settingsControlClass}
              placeholder="+1 415 555 0192"
            />
          </SettingsField>
          <SettingsField label="Country of residence">
            <select
              value={profileDraft.countryOfResidence}
              onChange={(event) =>
                handleProfileChange("countryOfResidence", event.target.value)
              }
              className={settingsControlClass}
            >
              {kycCountryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </SettingsField>
          <SettingsField label="Occupation">
            <input
              type="text"
              value={profileDraft.occupation}
              onChange={(event) =>
                handleProfileChange("occupation", event.target.value)
              }
              className={settingsControlClass}
              placeholder="Business owner"
            />
          </SettingsField>
        </div>
      </div>

      <div className="space-y-5">
        <VerificationHintCard title="Before you continue" items={content.checklist} />
        <div className={surfaceClass}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#008E96]">
            <UserRound className="h-5 w-5" />
          </div>
          <p className="mt-4 text-sm font-semibold text-[#000C22] dark:text-white">
            Details should match your ID
          </p>
          <p className="mt-2 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
            Use the same legal owner information that will appear on the
            document you upload in the next step.
          </p>
        </div>
      </div>
    </div>
  );

  const renderDocumentStep = () => (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <div className={`${surfaceClass} space-y-5`}>
          <div className="grid gap-5 md:grid-cols-2">
            <SettingsField label="Document type">
              <select
                value={documentDraft.documentType}
                onChange={(event) =>
                  handleDocumentChange("documentType", event.target.value)
                }
                className={settingsControlClass}
              >
                {kycDocumentTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </SettingsField>
            <SettingsField label="Document number">
              <input
                type="text"
                value={documentDraft.documentNumber}
                onChange={(event) =>
                  handleDocumentChange("documentNumber", event.target.value)
                }
                className={settingsControlClass}
                placeholder="A12345678"
              />
            </SettingsField>
            <SettingsField label="Issuing country">
              <select
                value={documentDraft.issuingCountry}
                onChange={(event) =>
                  handleDocumentChange("issuingCountry", event.target.value)
                }
                className={settingsControlClass}
              >
                {kycCountryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </SettingsField>
            <SettingsField label="Expiry date">
              <input
                type="date"
                value={documentDraft.expiryDate}
                onChange={(event) =>
                  handleDocumentChange("expiryDate", event.target.value)
                }
                className={settingsControlClass}
              />
            </SettingsField>
          </div>
        </div>

        <div className="space-y-5">
          <VerificationHintCard title="Document standards" items={content.checklist} />
          <div className={surfaceClass}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#008E96]">
              <ScanFace className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-semibold text-[#000C22] dark:text-white">
              Identity check
            </p>
            <p className="mt-2 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
              Front, back, and selfie evidence are captured separately so the
              review stays clear and consistent.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {kycDocumentUploads.map((upload) => (
          <VerificationUploadCard
            key={upload.id}
            title={upload.title}
            description={upload.description}
            helper={upload.helper}
            fileName={
              documentDraft[upload.id as keyof KycDocumentStepDraft] as string
            }
            actionLabel="Use sample file"
            onAction={() =>
              handleDocumentChange(
                upload.id as keyof KycDocumentStepDraft,
                upload.sampleFileName
              )
            }
          />
        ))}
      </div>
    </div>
  );

  const renderAddressStep = () => (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <div className={`${surfaceClass} space-y-5`}>
          <div className="grid gap-5 md:grid-cols-2">
            <SettingsField label="Address line 1" className="md:col-span-2">
              <input
                type="text"
                value={addressDraft.addressLine1}
                onChange={(event) =>
                  handleAddressChange("addressLine1", event.target.value)
                }
                className={settingsControlClass}
                placeholder="123 Market Street"
              />
            </SettingsField>
            <SettingsField label="Address line 2" className="md:col-span-2">
              <input
                type="text"
                value={addressDraft.addressLine2}
                onChange={(event) =>
                  handleAddressChange("addressLine2", event.target.value)
                }
                className={settingsControlClass}
                placeholder="Suite 500"
              />
            </SettingsField>
            <SettingsField label="City">
              <input
                type="text"
                value={addressDraft.city}
                onChange={(event) =>
                  handleAddressChange("city", event.target.value)
                }
                className={settingsControlClass}
                placeholder="San Francisco"
              />
            </SettingsField>
            <SettingsField label="State / region">
              <input
                type="text"
                value={addressDraft.region}
                onChange={(event) =>
                  handleAddressChange("region", event.target.value)
                }
                className={settingsControlClass}
                placeholder="California"
              />
            </SettingsField>
            <SettingsField label="Postal code">
              <input
                type="text"
                value={addressDraft.postalCode}
                onChange={(event) =>
                  handleAddressChange("postalCode", event.target.value)
                }
                className={settingsControlClass}
                placeholder="94105"
              />
            </SettingsField>
            <SettingsField label="Country">
              <select
                value={addressDraft.country}
                onChange={(event) =>
                  handleAddressChange("country", event.target.value)
                }
                className={settingsControlClass}
              >
                {kycCountryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </SettingsField>
          </div>
        </div>

        <div className="space-y-5">
          <VerificationHintCard title="Accepted proof" items={content.checklist} />
          <div className={surfaceClass}>
            <SettingsField label="Proof document type">
              <select
                value={addressDraft.proofDocumentType}
                onChange={(event) =>
                  handleAddressChange("proofDocumentType", event.target.value)
                }
                className={settingsControlClass}
              >
                {kycProofDocumentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </SettingsField>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        {kycAddressUploads.map((upload) => (
          <VerificationUploadCard
            key={upload.id}
            title={upload.title}
            description={upload.description}
            helper={upload.helper}
            fileName={addressDraft.proofFileName}
            actionLabel="Use sample file"
            onAction={() =>
              handleAddressChange("proofFileName", upload.sampleFileName)
            }
          />
        ))}

        <div className={surfaceClass}>
          <p className="text-sm font-semibold text-[#000C22] dark:text-white">
            Address reminder
          </p>
          <p className="mt-2 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
            The address in this step should match the location shown on your
            selected proof document.
          </p>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <StepSummaryCard
          icon={UserRound}
          title="Profile details"
          rows={[
            { label: "Name", value: profileDraft.fullName },
            { label: "Email", value: profileDraft.email },
            { label: "Residence", value: profileDraft.countryOfResidence },
          ]}
        />
        <StepSummaryCard
          icon={ScanFace}
          title="Identity document"
          rows={[
            { label: "Type", value: documentDraft.documentType },
            { label: "Number", value: documentDraft.documentNumber },
            { label: "Issuing country", value: documentDraft.issuingCountry },
          ]}
        />
        <StepSummaryCard
          icon={ShieldCheck}
          title="Proof of address"
          rows={[
            { label: "Address", value: addressDraft.addressLine1 },
            { label: "City", value: `${addressDraft.city}, ${addressDraft.region}` },
            { label: "Proof", value: addressDraft.proofDocumentType },
          ]}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className={`${surfaceClass} space-y-5`}>
          <div className="grid gap-5 md:grid-cols-2">
            <SettingsField label="Use of account" className="md:col-span-2">
              <select
                value={reviewDraft.useOfAccount}
                onChange={(event) =>
                  handleReviewChange("useOfAccount", event.target.value)
                }
                className={settingsControlClass}
              >
                {kycUseOfAccountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </SettingsField>
            <SettingsField label="Expected monthly volume">
              <select
                value={reviewDraft.expectedMonthlyVolume}
                onChange={(event) =>
                  handleReviewChange("expectedMonthlyVolume", event.target.value)
                }
                className={settingsControlClass}
              >
                {kycVolumeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </SettingsField>
            <SettingsField label="Source of funds">
              <select
                value={reviewDraft.sourceOfFunds}
                onChange={(event) =>
                  handleReviewChange("sourceOfFunds", event.target.value)
                }
                className={settingsControlClass}
              >
                {kycSourceOfFundsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </SettingsField>
          </div>

          <div className="space-y-3">
            <SettingsToggleRow
              title="I confirm the details are accurate."
              description="Use the final review step to check profile, document, and address data."
              checked={reviewDraft.confirmAccurate}
              onToggle={() =>
                handleReviewChange(
                  "confirmAccurate",
                  !reviewDraft.confirmAccurate
                )
              }
            />
            <SettingsToggleRow
              title="I agree to proceed with verification."
              description="Submitting in demo mode marks the profile as verified instantly."
              checked={reviewDraft.acceptTerms}
              onToggle={() =>
                handleReviewChange("acceptTerms", !reviewDraft.acceptTerms)
              }
            />
          </div>
        </div>

        <div className="space-y-5">
          <VerificationHintCard title="Before submitting" items={content.checklist} />
          <div className={`${surfaceClass} space-y-4`}>
            {kycReviewHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-black/5 bg-white/80 p-4 dark:border-white/5 dark:bg-[#000C22]/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ACED1]/10 text-[#008E96]">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  if (isVerified) {
    return (
      <SettingsPanel
        title="Verification complete"
        description="Your profile is already verified and ready for money movement."
        action={<KycStatusBadge profile={profile} />}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border border-emerald-500/20 bg-emerald-500/5 p-5">
            <p className="text-sm font-semibold text-[#000C22] dark:text-white">
              Verification finished successfully.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
              You can now send and receive money from the dashboard.
            </p>
          </Card>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={KYC_OVERVIEW_ROUTE}
              className="inline-flex items-center justify-center rounded-xl border border-[#000C22]/15 px-4 py-2.5 text-sm font-semibold text-[#000C22] transition-colors hover:border-[#2ACED1]/40 hover:bg-[#2ACED1]/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
            >
              Back to verification
            </Link>
            <Link
              href="/dashboard/send"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-action-button px-5 py-2.5 text-base font-medium text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              Open send money
            </Link>
          </div>
        </div>
      </SettingsPanel>
    );
  }

  if (isLocked) {
    return (
      <SettingsPanel
        title="Step locked"
        description="Finish the current verification step before moving ahead."
      >
        <div className="rounded-2xl border border-black/5 bg-white/70 p-5 dark:border-white/5 dark:bg-white/5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2ACED1]/10 text-[#008E96]">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                Continue from {profile.steps[currentIndex]?.title ?? "your current step"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                The verification flow stays in sequence so each phase is completed properly.
              </p>
            </div>
          </div>
        </div>
      </SettingsPanel>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={KYC_OVERVIEW_ROUTE}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#000C22]/60 transition-colors hover:text-[#2ACED1] dark:text-[#D8F4F7]/60"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to verification
        </Link>
        <KycStatusBadge profile={profile} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SettingsPanel
          title="Verification steps"
          description="Complete each step in order."
        >
          <div className="space-y-3">
            {profile.steps.map((step, index) => {
              const Icon = kycStepIconMap[step.id];
              const isCurrent = step.id === stepId;
              const isCompleted = step.status === "completed";
              const href =
                step.status === "completed" || step.id === currentStepId
                  ? getKycStepRoute(step.id)
                  : undefined;

              const contentCard = (
                <div
                  className={`rounded-2xl border p-4 transition-colors ${
                    isCurrent
                      ? "border-[#2ACED1]/25 bg-[#2ACED1]/5"
                      : isCompleted
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-black/5 bg-white/70 dark:border-white/5 dark:bg-white/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                        isCompleted
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                          : isCurrent
                            ? "border-[#2ACED1]/30 bg-[#2ACED1]/10 text-[#008E96]"
                            : "border-black/5 bg-black/5 text-[#000C22]/40 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/40"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                          {index + 1}. {step.title}
                        </p>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                          {step.eta}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );

              if (!href) {
                return <div key={step.id}>{contentCard}</div>;
              }

              return (
                <Link key={step.id} href={href} className="block">
                  {contentCard}
                </Link>
              );
            })}
          </div>
        </SettingsPanel>

        <SettingsPanel
          title={stepMeta.title}
          description={stepMeta.description}
          action={
            <div className="inline-flex items-center gap-2 rounded-full bg-[#2ACED1]/10 px-3 py-1 text-xs font-semibold text-[#008E96]">
              <StepIcon className="h-3.5 w-3.5" />
              Step {stepIndex + 1} of {KYC_PHASES.length}
            </div>
          }
        >
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                {content.eyebrow}
              </p>
              <p className="mt-3 text-xl font-bold text-[#000C22] dark:text-white">
                {content.title}
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#000C22]/60 dark:text-[#D8F4F7]/60">
                {content.description}
              </p>
            </div>

            {stepId === "profile" && renderProfileStep()}
            {stepId === "document" && renderDocumentStep()}
            {stepId === "address" && renderAddressStep()}
            {stepId === "review" && renderReviewStep()}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-white/70 px-4 py-4 dark:border-white/5 dark:bg-white/5">
              <Link
                href={previousStep ? getKycStepRoute(previousStep.id) : KYC_OVERVIEW_ROUTE}
                className="inline-flex items-center justify-center rounded-xl border border-[#000C22]/15 px-4 py-2.5 text-sm font-semibold text-[#000C22] transition-colors hover:border-[#2ACED1]/40 hover:bg-[#2ACED1]/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
              >
                Back
              </Link>

              <Button
                type="button"
                variant="action"
                onClick={handleContinue}
                disabled={!canContinue}
              >
                {isFinalStep ? "Submit verification" : "Save and continue"}
                {!isFinalStep && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </SettingsPanel>
      </div>
    </div>
  );
}
