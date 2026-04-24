export type KycStatus = "not_started" | "in_progress" | "verified";
export type KycStepStatus = "pending" | "current" | "completed";
export type KycStepId = "profile" | "document" | "address" | "review";

export interface KycStep {
  id: KycStepId;
  title: string;
  description: string;
  eta: string;
  status: KycStepStatus;
}

export interface KycProfileStepDraft {
  fullName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  countryOfResidence: string;
  occupation: string;
}

export interface KycDocumentStepDraft {
  documentType: string;
  documentNumber: string;
  issuingCountry: string;
  expiryDate: string;
  frontFileName: string;
  backFileName: string;
  selfieFileName: string;
}

export interface KycAddressStepDraft {
  addressLine1: string;
  addressLine2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  proofDocumentType: string;
  proofFileName: string;
}

export interface KycReviewStepDraft {
  useOfAccount: string;
  expectedMonthlyVolume: string;
  sourceOfFunds: string;
  confirmAccurate: boolean;
  acceptTerms: boolean;
}

export interface KycDraft {
  profile: KycProfileStepDraft;
  document: KycDocumentStepDraft;
  address: KycAddressStepDraft;
  review: KycReviewStepDraft;
}

export interface KycProfile {
  status: KycStatus;
  currentStep: KycStepId;
  submittedAt: string | null;
  verifiedAt: string | null;
  steps: KycStep[];
  draft: KycDraft;
}

type KycStepDefinition = Omit<KycStep, "status">;
type KycSeed = {
  name?: string;
  email?: string;
};

const KYC_STEP_DEFINITIONS: KycStepDefinition[] = [
  {
    id: "profile",
    title: "Profile details",
    description:
      "Confirm the legal owner details that appear across your account and payout records.",
    eta: "2 min",
  },
  {
    id: "document",
    title: "Identity document",
    description:
      "Add a government-issued ID so regulated payment actions can be unlocked safely.",
    eta: "3 min",
  },
  {
    id: "address",
    title: "Proof of address",
    description:
      "Attach the operating address used for settlements, statements, and compliance checks.",
    eta: "2 min",
  },
  {
    id: "review",
    title: "Final review",
    description:
      "Review the submitted details before Kopo Pay enables send and receive capabilities.",
    eta: "1 min",
  },
];

const VERIFIED_STEP_ID =
  KYC_STEP_DEFINITIONS[KYC_STEP_DEFINITIONS.length - 1].id;

const buildSteps = (completedCount: number): KycStep[] =>
  KYC_STEP_DEFINITIONS.map((step, index) => ({
    ...step,
    status:
      index < completedCount
        ? "completed"
        : index === completedCount
          ? "current"
          : "pending",
  }));

const getCompletedStepCount = (profile: KycProfile) =>
  profile.steps.filter((step) => step.status === "completed").length;

const mergeStepDraft = <T extends object>(defaults: T, incoming?: Partial<T>) => ({
  ...defaults,
  ...(incoming ?? {}),
});

const normalizeDraft = (
  draft?: Partial<KycDraft> | null,
  seed: KycSeed = {}
): KycDraft => {
  const defaults = createDefaultKycDraft(seed);

  return {
    profile: mergeStepDraft(defaults.profile, draft?.profile),
    document: mergeStepDraft(defaults.document, draft?.document),
    address: mergeStepDraft(defaults.address, draft?.address),
    review: mergeStepDraft(defaults.review, draft?.review),
  };
};

export const KYC_PHASES = KYC_STEP_DEFINITIONS;
export const KYC_OVERVIEW_ROUTE = "/dashboard/settings/personal/verification";

export const createDefaultKycDraft = (seed: KycSeed = {}): KycDraft => ({
  profile: {
    fullName: seed.name ?? "John Doe",
    email: seed.email ?? "john@kopopay.com",
    dateOfBirth: "1993-04-12",
    phoneNumber: "+1 415 555 0192",
    countryOfResidence: "United States",
    occupation: "Business owner",
  },
  document: {
    documentType: "Passport",
    documentNumber: "A12345678",
    issuingCountry: "United States",
    expiryDate: "2031-08-30",
    frontFileName: "passport-front-demo.jpg",
    backFileName: "passport-back-demo.jpg",
    selfieFileName: "selfie-demo.jpg",
  },
  address: {
    addressLine1: "123 Market Street",
    addressLine2: "Suite 500",
    city: "San Francisco",
    region: "California",
    postalCode: "94105",
    country: "United States",
    proofDocumentType: "Bank statement",
    proofFileName: "statement-mar-2026.pdf",
  },
  review: {
    useOfAccount: "Receiving customer payments and vendor payouts",
    expectedMonthlyVolume: "$15,000 - $25,000",
    sourceOfFunds: "Customer payments",
    confirmAccurate: true,
    acceptTerms: true,
  },
});

export const createDefaultKycProfile = (seed: KycSeed = {}): KycProfile => ({
  status: "not_started",
  currentStep: KYC_STEP_DEFINITIONS[0].id,
  submittedAt: null,
  verifiedAt: null,
  steps: buildSteps(0),
  draft: createDefaultKycDraft(seed),
});

export const normalizeKycProfile = (
  profile?: Partial<KycProfile> | null,
  seed: KycSeed = {}
): KycProfile => {
  if (!profile) {
    return createDefaultKycProfile(seed);
  }

  const draft = normalizeDraft(profile.draft, seed);

  if (profile.status === "verified") {
    const timestamp =
      profile.verifiedAt ?? profile.submittedAt ?? new Date().toISOString();

    return {
      status: "verified",
      currentStep: VERIFIED_STEP_ID,
      submittedAt: profile.submittedAt ?? timestamp,
      verifiedAt: timestamp,
      steps: KYC_STEP_DEFINITIONS.map((step) => ({
        ...step,
        status: "completed",
      })),
      draft,
    };
  }

  const completedIds = new Set(
    (profile.steps ?? [])
      .filter((step) => step.status === "completed")
      .map((step) => step.id)
  );
  const completedCount = KYC_STEP_DEFINITIONS.filter((step) =>
    completedIds.has(step.id)
  ).length;
  const nextIndex = Math.min(completedCount, KYC_STEP_DEFINITIONS.length - 1);

  return {
    status: completedCount === 0 ? "not_started" : "in_progress",
    currentStep: KYC_STEP_DEFINITIONS[nextIndex].id,
    submittedAt: profile.submittedAt ?? null,
    verifiedAt: null,
    steps: buildSteps(completedCount),
    draft,
  };
};

export const completeKycStep = (
  profile: KycProfile,
  stepId: KycStepId
): KycProfile => {
  const normalized = normalizeKycProfile(profile);

  if (normalized.status === "verified") {
    return normalized;
  }

  const stepIndex = KYC_STEP_DEFINITIONS.findIndex(
    (step) => step.id === stepId
  );

  if (stepIndex === -1) {
    return normalized;
  }

  const completedCount = Math.max(
    getCompletedStepCount(normalized),
    stepIndex + 1
  );
  const nextIndex = Math.min(completedCount, KYC_STEP_DEFINITIONS.length - 1);

  return {
    ...normalized,
    status: "in_progress",
    currentStep: KYC_STEP_DEFINITIONS[nextIndex].id,
    steps: buildSteps(completedCount),
  };
};

export const updateKycDraft = <T extends KycStepId>(
  profile: KycProfile,
  stepId: T,
  values: Partial<KycDraft[T]>
): KycProfile => {
  const normalized = normalizeKycProfile(profile);

  return {
    ...normalized,
    draft: {
      ...normalized.draft,
      [stepId]: {
        ...normalized.draft[stepId],
        ...values,
      },
    },
  };
};

export const submitKycProfile = (profile: KycProfile): KycProfile => {
  const normalized = normalizeKycProfile(profile);
  const allStepsCompleted = normalized.steps.every(
    (step) => step.status === "completed"
  );

  if (!allStepsCompleted) {
    return normalized;
  }

  const timestamp = new Date().toISOString();

  return {
    ...normalized,
    status: "verified",
    currentStep: VERIFIED_STEP_ID,
    submittedAt: timestamp,
    verifiedAt: timestamp,
    steps: KYC_STEP_DEFINITIONS.map((step) => ({
      ...step,
      status: "completed",
    })),
  };
};

export const resetKycProfile = (seed: KycSeed = {}): KycProfile =>
  createDefaultKycProfile(seed);

export const getKycCompletionPercent = (profile?: KycProfile | null) => {
  const normalized = normalizeKycProfile(profile);
  const completed = normalized.steps.filter(
    (step) => step.status === "completed"
  ).length;

  return Math.round((completed / normalized.steps.length) * 100);
};

export const getRemainingKycSteps = (profile?: KycProfile | null) =>
  normalizeKycProfile(profile).steps.filter(
    (step) => step.status !== "completed"
  );

export const isKycVerified = (profile?: KycProfile | null) =>
  normalizeKycProfile(profile).status === "verified";

export const isKycStepId = (value: string): value is KycStepId =>
  KYC_STEP_DEFINITIONS.some((step) => step.id === value);

export const getKycStepRoute = (stepId: KycStepId) =>
  `${KYC_OVERVIEW_ROUTE}/${stepId}`;

export const getKycCurrentStep = (profile?: KycProfile | null) =>
  normalizeKycProfile(profile).currentStep;
