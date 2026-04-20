// Use serializable icon name strings here; resolve to actual icon components
// on the client with the IconRegistry.

export type SettingsGroupId = "personal" | "account" | "product";

export interface SettingsPageItem {
  id: string;
  groupId: SettingsGroupId;
  label: string;
  description: string;
  href: string;
  icon: string;
  accent: string;
  keywords?: string[];
}

export interface SettingsGroupItem {
  id: SettingsGroupId;
  label: string;
  description: string;
  href: string;
  accent: string;
  items: SettingsPageItem[];
}

export interface SettingsStat {
  label: string;
  value: string;
  detail: string;
  icon: string;
  accent: string;
}

const PERSONAL_SETTINGS: SettingsPageItem[] = [
  {
    id: "personal-details",
    groupId: "personal",
    label: "Personal details",
    description: "Contact information, password, authentication methods, and your active sessions.",
    href: "/dashboard/settings/personal/details",
    icon: "Users",
    accent: "#2ACED1",
    keywords: ["profile", "identity", "password", "sessions"],
  },
  {
    id: "communication-preferences",
    groupId: "personal",
    label: "Communication preferences",
    description: "Customize the emails, SMS, and push notifications you receive.",
    href: "/dashboard/settings/personal/communication",
    icon: "Bell",
    accent: "#008E96",
    keywords: ["notifications", "alerts", "digest", "quiet hours"],
  },
  {
    id: "developers",
    groupId: "personal",
    label: "Developers",
    description: "Workbench, developer tools, and more.",
    href: "/dashboard/settings/personal/developers",
    icon: "Code",
    accent: "#034E78",
    keywords: ["api", "workbench", "webhooks", "keys"],
  },
];

const ACCOUNT_SETTINGS: SettingsPageItem[] = [
  {
    id: "business",
    groupId: "account",
    label: "Business",
    description: "Account details, account health, public info, payouts, legal entity, custom domains, and more.",
    href: "/dashboard/settings/account/business",
    icon: "Building2",
    accent: "#0E7490",
    keywords: ["account", "payouts", "legal", "domains"],
  },
  {
    id: "team-security",
    groupId: "account",
    label: "Team and security",
    description: "Team members, roles, account security, authorized apps, and shared resources.",
    href: "/dashboard/settings/account/team-security",
    icon: "Shield",
    accent: "#034E78",
    keywords: ["team", "roles", "security", "apps"],
  },
  {
    id: "plans-fees",
    groupId: "account",
    label: "Plans and fees",
    description: "Cost management for Kopo Pay products and services.",
    href: "/dashboard/settings/account/plans-fees",
    icon: "CreditCard",
    accent: "#2ACED1",
    keywords: ["cost", "pricing", "fees", "spend"],
  },
  {
    id: "stripe-profile",
    groupId: "account",
    label: "Stripe profile",
    description: "Manage how you show up to other businesses.",
    href: "/dashboard/settings/account/stripe-profile",
    icon: "Globe",
    accent: "#008E96",
    keywords: ["public profile", "brand", "identity"],
  },
  {
    id: "compliance-documents",
    groupId: "account",
    label: "Compliance and documents",
    description: "PCI compliance, documents, and legacy exports.",
    href: "/dashboard/settings/account/compliance-documents",
    icon: "FileText",
    accent: "#0F766E",
    keywords: ["pci", "documents", "exports", "compliance"],
  },
  {
    id: "perks",
    groupId: "account",
    label: "Perks",
    description: "Discounts on tools to run your startup.",
    href: "/dashboard/settings/account/perks",
    icon: "Gift",
    accent: "#14B8A6",
    keywords: ["discounts", "startup", "partners"],
  },
];

const PRODUCT_SETTINGS: SettingsPageItem[] = [
  {
    id: "billing",
    groupId: "product",
    label: "Billing",
    description: "Subscriptions, invoices, quotes, and customer portal.",
    href: "/dashboard/settings/product/billing",
    icon: "FileText",
    accent: "#2ACED1",
    keywords: ["subscriptions", "invoices", "portal"],
  },
  {
    id: "financial-connections",
    groupId: "product",
    label: "Financial Connections",
    description: "Appearance, featured institutions, optimizations, and usage details.",
    href: "/dashboard/settings/product/financial-connections",
    icon: "Landmark",
    accent: "#008E96",
    keywords: ["banks", "connections", "institutions", "link"],
  },
  {
    id: "managed-payments",
    groupId: "product",
    label: "Managed Payments",
    description: "Kopo Pay's merchant of record handles global tax, fraud, and disputes.",
    href: "/dashboard/settings/product/managed-payments",
    icon: "Wallet",
    accent: "#034E78",
    keywords: ["merchant of record", "tax", "fraud", "disputes"],
  },
  {
    id: "payments",
    groupId: "product",
    label: "Payments",
    description: "Checkout, payment methods, currency conversion, and more.",
    href: "/dashboard/settings/product/payments",
    icon: "CreditCard",
    accent: "#14B8A6",
    keywords: ["checkout", "methods", "currencies", "conversion"],
  },
  {
    id: "radar",
    groupId: "product",
    label: "Radar",
    description: "Manage fraud protection and customization capabilities for your account.",
    href: "/dashboard/settings/product/radar",
    icon: "ShieldAlert",
    accent: "#0F766E",
    keywords: ["fraud", "risk", "rules", "blocklist"],
  },
  {
    id: "sigma",
    groupId: "product",
    label: "Sigma",
    description: "Manage your Sigma features.",
    href: "/dashboard/settings/product/sigma",
    icon: "BarChart3",
    accent: "#034E78",
    keywords: ["analytics", "reports", "queries", "exports"],
  },
];

export const settingsGroups: SettingsGroupItem[] = [
  {
    id: "personal",
    label: "Personal settings",
    description: "Personal details, communication preferences, and developer tools.",
    href: "/dashboard/settings/personal",
    accent: "#2ACED1",
    items: PERSONAL_SETTINGS,
  },
  {
    id: "account",
    label: "Account settings",
    description: "Business, team access, cost controls, profile, compliance, and perks.",
    href: "/dashboard/settings/account",
    accent: "#034E78",
    items: ACCOUNT_SETTINGS,
  },
  {
    id: "product",
    label: "Product settings",
    description: "Billing, financial connections, managed payments, Radar, and Sigma.",
    href: "/dashboard/settings/product",
    accent: "#008E96",
    items: PRODUCT_SETTINGS,
  },
];

export const settingsPages: SettingsPageItem[] = settingsGroups.flatMap(
  (group) => group.items
);

export const settingsNavItems = settingsPages;

export const settingsOverviewStats: SettingsStat[] = [
  {
    label: "Groups",
    value: "3",
    detail: "Personal, account, and product settings are separated cleanly.",
    icon: "LayoutGrid",
    accent: "#2ACED1",
  },
  {
    label: "Pages",
    value: "18",
    detail: "Three section hubs and fifteen leaf routes now live in the tree.",
    icon: "FileText",
    accent: "#034E78",
  },
  {
    label: "API-ready",
    value: "100%",
    detail: "The shared layout and registry are ready for backend wiring.",
    icon: "Code",
    accent: "#008E96",
  },
  {
    label: "Legacy redirects",
    value: "6",
    detail: "Old settings routes can redirect cleanly into the new tree.",
    icon: "Briefcase",
    accent: "#14B8A6",
  },
];
