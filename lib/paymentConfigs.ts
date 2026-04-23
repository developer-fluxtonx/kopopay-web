import { 
  CreditCard, 
  Wallet, 
  Smartphone, 
  Landmark, 
  Coins, 
  Zap, 
  ShieldCheck, 
  Globe 
} from "lucide-react";

export type PaymentMethodId = "cards" | "apple_pay" | "google_pay" | "bank_transfer" | "crypto" | "link";

export interface PaymentMethodConfig {
  id: PaymentMethodId;
  title: string;
  description: string;
  icon: any; // Lucide Icon
  color: string;
  category: "traditional" | "digital" | "bank" | "payout";
  docsHref: string;
  isAvailable: boolean;
}

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: "cards",
    title: "Credit & Debit Cards",
    description: "Visa, Mastercard, Amex, and Discover supported globally.",
    icon: CreditCard,
    color: "#2ACED1",
    category: "traditional",
    docsHref: "/kopoPayDocs/payments/overview",
    isAvailable: true,
  },
  {
    id: "apple_pay",
    title: "Apple Pay",
    description: "One-click biometric checkout for iOS and macOS users.",
    icon: Smartphone,
    color: "#000000",
    category: "digital",
    docsHref: "/kopoPayDocs/payments/checkout",
    isAvailable: true,
  },
  {
    id: "google_pay",
    title: "Google Pay",
    description: "Seamless payments for Android and Chrome users.",
    icon: Wallet,
    color: "#4285F4",
    category: "digital",
    docsHref: "/kopoPayDocs/payments/checkout",
    isAvailable: true,
  },
  {
    id: "bank_transfer",
    title: "Bank Transfers",
    description: "Direct bank settlement via ACH, SEPA, or SWIFT.",
    icon: Landmark,
    color: "#034E78",
    category: "bank",
    docsHref: "/kopoPayDocs/payments/overview",
    isAvailable: true,
  },
  {
    id: "crypto",
    title: "Cryptocurrency",
    description: "Accept BTC, ETH, and USDC with instant conversion.",
    icon: Coins,
    color: "#F7931A",
    category: "digital",
    docsHref: "/kopoPayDocs/payments/crypto",
    isAvailable: false, // In development
  },
  {
    id: "link",
    title: "Payment Links",
    description: "No-code links to collect payments anywhere.",
    icon: Zap,
    color: "#2ACED1",
    category: "traditional",
    docsHref: "/kopoPayDocs/payments/payment-intents",
    isAvailable: true,
  }
];

export const PAYOUT_METHODS = [
  {
    id: "bank",
    title: "Standard Bank Payout",
    detail: "Settlement in 1-3 business days",
    icon: Landmark,
    description: "The reliable way to receive funds directly in your corporate account."
  },
  {
    id: "instant",
    title: "Instant Settlement",
    detail: "Available in minutes",
    icon: Zap,
    description: "Accelerate your cash flow with real-time payouts to supported accounts."
  }
];
