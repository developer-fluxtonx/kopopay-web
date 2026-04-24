"use client";

import {
  CreditCard,
  FileSearch,
  Home,
  ScanFace,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { KycStepId } from "@/lib/kyc";

interface KycUploadSlot {
  id: string;
  title: string;
  description: string;
  helper: string;
  sampleFileName: string;
}

interface KycStepContent {
  eyebrow: string;
  title: string;
  description: string;
  checklist: string[];
}

export const kycStepIconMap: Record<KycStepId, LucideIcon> = {
  profile: UserRound,
  document: CreditCard,
  address: Home,
  review: FileSearch,
};

export const kycStepContent: Record<KycStepId, KycStepContent> = {
  profile: {
    eyebrow: "Account owner",
    title: "Tell us who owns this profile",
    description:
      "These details should match the person listed on your government-issued document.",
    checklist: [
      "Use the legal name shown on your ID.",
      "Provide a direct phone number for verification follow-ups.",
      "Make sure the residence country matches your payout region.",
    ],
  },
  document: {
    eyebrow: "Identity document",
    title: "Add your government-issued ID",
    description:
      "We'll use this document to verify the account owner before payment actions are enabled.",
    checklist: [
      "Use a valid passport, driver license, or national ID.",
      "Document number and issuing country should match the uploaded file.",
      "Selfie check helps confirm the document belongs to the same person.",
    ],
  },
  address: {
    eyebrow: "Proof of address",
    title: "Confirm the address tied to this account",
    description:
      "This address is used for statements, settlements, and compliance reviews.",
    checklist: [
      "Use the same address that appears on your proof document.",
      "Proof document should be recent and clearly readable.",
      "PO boxes should be avoided unless your compliance policy allows them.",
    ],
  },
  review: {
    eyebrow: "Final review",
    title: "Check the details before submitting",
    description:
      "Review the profile, document, and address information before enabling money movement.",
    checklist: [
      "Confirm all information belongs to the same account owner.",
      "Monthly volume and source of funds help prepare future risk checks.",
      "Submitting completes the demo verification instantly.",
    ],
  },
};

export const kycCountryOptions = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Pakistan",
  "Canada",
];

export const kycDocumentTypeOptions = [
  "Passport",
  "Driver license",
  "National ID card",
];

export const kycProofDocumentOptions = [
  "Bank statement",
  "Utility bill",
  "Lease agreement",
];

export const kycUseOfAccountOptions = [
  "Receiving customer payments and vendor payouts",
  "Freelance and services income",
  "Ecommerce settlements",
];

export const kycVolumeOptions = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $25,000",
  "Over $25,000",
];

export const kycSourceOfFundsOptions = [
  "Customer payments",
  "Business revenue",
  "Salary and savings",
];

export const kycDocumentUploads: KycUploadSlot[] = [
  {
    id: "frontFileName",
    title: "Front of document",
    description: "Clear color image of the main identity page or front side.",
    helper: "All corners should be visible.",
    sampleFileName: "passport-front-demo.jpg",
  },
  {
    id: "backFileName",
    title: "Back of document",
    description: "Required when the document has details on the reverse side.",
    helper: "Skip only if your document does not have a back side.",
    sampleFileName: "passport-back-demo.jpg",
  },
  {
    id: "selfieFileName",
    title: "Selfie check",
    description: "Quick face match for the same account owner.",
    helper: "Use a well-lit image with no obstructions.",
    sampleFileName: "selfie-demo.jpg",
  },
];

export const kycAddressUploads: KycUploadSlot[] = [
  {
    id: "proofFileName",
    title: "Proof of address",
    description: "Upload a recent statement or bill that shows your address.",
    helper: "Use a recent statement, utility bill, or lease document.",
    sampleFileName: "statement-mar-2026.pdf",
  },
];

export const kycReviewHighlights = [
  {
    title: "Profile check",
    description: "Owner identity details are ready for review.",
    icon: ShieldCheck,
  },
  {
    title: "Document check",
    description: "Identity evidence is attached and ready for validation.",
    icon: ScanFace,
  },
  {
    title: "Address check",
    description: "Settlement address and proof document are included.",
    icon: Home,
  },
];
