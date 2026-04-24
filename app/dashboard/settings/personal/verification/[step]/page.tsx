import { notFound } from "next/navigation";
import { KycVerificationStepPage } from "@/components/kyc/KycVerificationStepPage";
import { isKycStepId } from "@/lib/kyc";

export default async function KycVerificationPhasePage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;

  if (!isKycStepId(step)) {
    notFound();
  }

  return <KycVerificationStepPage stepId={step} />;
}
