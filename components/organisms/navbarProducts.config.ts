export interface NavbarProductLink {
  id: string;
  label: string;
  description: string;
  href: string;
}

export interface NavbarProductColumn {
  id: string;
  label: string;
  description: string;
  links: NavbarProductLink[];
}

export interface NavbarSolutionLink {
  id: string;
  label: string;
  description: string;
  href: string;
}

export interface NavbarSolutionColumn {
  id: string;
  label: string;
  description: string;
  links: NavbarSolutionLink[];
}

export interface NavbarItem {
  href: string;
  label: string;
}

export const navbarProductColumns: NavbarProductColumn[] = [
  {
    id: "payments",
    label: "Payments",
    description: "Accept payments online, in person, and with optimized checkout flows.",
    links: [
      {
        id: "payments-overview",
        label: "Payments",
        description: "Global payment infrastructure",
        href: "/payments",
      },
      {
        id: "payments-analytics",
        label: "Analytics",
        description: "Conversion and performance insights",
        href: "/dashboard/products/payments/analytics",
      },
      {
        id: "payments-disputes",
        label: "Disputes",
        description: "Chargeback response workflows",
        href: "/dashboard/disputes",
      },
      {
        id: "payments-radar",
        label: "Radar",
        description: "Fraud controls and risk rules",
        href: "/dashboard/radar",
      },
      {
        id: "payments-links",
        label: "Payment Links",
        description: "No-code payment pages",
        href: "/dashboard/products/payments/payment-links",
      },
      {
        id: "payments-terminal",
        label: "Terminal",
        description: "In-person payments",
        href: "/dashboard/products/payments/terminal",
      },
    ],
  },
  {
    id: "revenue",
    label: "Revenue",
    description: "Manage subscriptions, invoicing, reporting, and revenue operations.",
    links: [
      {
        id: "revenue-billing",
        label: "Billing",
        description: "Billing control center",
        href: "/dashboard/billing",
      },
      {
        id: "revenue-subscriptions",
        label: "Subscriptions",
        description: "Recurring billing management",
        href: "/dashboard/products/billing/subscriptions",
      },
      {
        id: "revenue-invoicing",
        label: "Invoicing",
        description: "One-time and recurring invoices",
        href: "/dashboard/products/billing/invoices",
      },
      {
        id: "revenue-usage-based",
        label: "Usage-based billing",
        description: "Metered pricing workflows",
        href: "/dashboard/products/billing/usage-based",
      },
      {
        id: "revenue-tax",
        label: "Tax",
        description: "Tax rules and compliance setup",
        href: "/dashboard/products/more/tax",
      },
      {
        id: "revenue-recovery",
        label: "Revenue Recovery",
        description: "Retries and dunning flows",
        href: "/dashboard/products/billing/revenue-recovery",
      },
      {
        id: "revenue-recognition",
        label: "Revenue Recognition",
        description: "Accounting-ready revenue views",
        href: "/dashboard/products/reporting/revenue-recognition",
      },
      {
        id: "revenue-sigma",
        label: "Sigma",
        description: "Custom reporting queries",
        href: "/dashboard/products/reporting/sigma",
      },
      {
        id: "revenue-data-management",
        label: "Data Management",
        description: "Exports and dataset controls",
        href: "/dashboard/products/reporting/data-management",
      },
    ],
  },
  {
    id: "money-management",
    label: "Money Management",
    description: "Move funds, manage balances, and expand financial operations.",
    links: [
      {
        id: "money-global-payouts",
        label: "Global Payouts",
        description: "Send payouts to third parties",
        href: "/dashboard/products/operations/global-payouts",
      },
      {
        id: "money-financial-connections",
        label: "Financial Connections",
        description: "Linked accounts and bank data",
        href: "/dashboard/products/more/financial-connections",
      },
      {
        id: "money-capital",
        label: "Capital",
        description: "Business financing tools",
        href: "/dashboard/products/more/capital",
      },
      {
        id: "money-issuing",
        label: "Issuing",
        description: "Physical and virtual cards",
        href: "/dashboard/products/more/issuing",
      },
    ],
  },
  {
    id: "platforms-marketplaces",
    label: "Platforms & Marketplaces",
    description: "Build partner, seller, and platform experiences on top of Kopo Pay.",
    links: [
      {
        id: "platforms-connect",
        label: "Connect",
        description: "Payments for platforms",
        href: "/dashboard/connect",
      },
      {
        id: "platforms-profiles",
        label: "Profiles",
        description: "Business identity surfaces",
        href: "/dashboard/products/more/profiles",
      },
      {
        id: "platforms-identity",
        label: "Identity",
        description: "Verification workflows",
        href: "/dashboard/products/more/identity",
      },
      {
        id: "platforms-atlas",
        label: "Atlas",
        description: "Company formation support",
        href: "/dashboard/products/more/atlas",
      },
    ],
  },
];

export const navbarSolutionColumns: NavbarSolutionColumn[] = [
  {
    id: "by-stage",
    label: "By Stage",
    description: "Starting points for teams moving from launch mode to scale.",
    links: [
      {
        id: "solutions-enterprises",
        label: "Enterprises",
        description: "Complex payments and revenue at scale",
        href: "/checkout/enterprise",
      },
      {
        id: "solutions-startups",
        label: "Startups",
        description: "Launch quickly with simple setup",
        href: "/pricing",
      },
      {
        id: "solutions-global-businesses",
        label: "Global businesses",
        description: "Cross-border expansion guidance",
        href: "/sdk/guides/international",
      },
      {
        id: "solutions-saas-stage",
        label: "SaaS",
        description: "Recurring revenue playbooks",
        href: "/subscriptions",
      },
    ],
  },
  {
    id: "by-use-case",
    label: "By Use Case",
    description: "Popular integration patterns supported by existing Kopo Pay pages.",
    links: [
      {
        id: "solutions-ecommerce",
        label: "Ecommerce",
        description: "Checkout and conversion flows",
        href: "/checkout",
      },
      {
        id: "solutions-embedded-finance",
        label: "Embedded finance",
        description: "Platform payouts and financial services",
        href: "/dashboard/connect",
      },
      {
        id: "solutions-finance-automation",
        label: "Finance automation",
        description: "Invoicing and back-office workflows",
        href: "/invoicing",
      },
      {
        id: "solutions-in-app-payments",
        label: "In-app payments",
        description: "Accept payments inside product flows",
        href: "/sdk/guides/accept-a-payment",
      },
      {
        id: "solutions-platforms",
        label: "Platforms",
        description: "Connected account architecture",
        href: "/sdk/guides/connect",
      },
      {
        id: "solutions-saas",
        label: "SaaS",
        description: "Subscriptions and billing models",
        href: "/subscriptions",
      },
    ],
  },
  {
    id: "by-industry",
    label: "By Industry",
    description: "Existing pages that best map to industry-focused solution journeys.",
    links: [
      {
        id: "solutions-retail",
        label: "Retail",
        description: "Payments, checkout, and omnichannel flows",
        href: "/payments",
      },
      {
        id: "solutions-hospitality",
        label: "Hospitality, travel, and leisure",
        description: "Reservation and cross-border payment patterns",
        href: "/sdk/guides/international",
      },
      {
        id: "solutions-media",
        label: "Media and entertainment",
        description: "Recurring access and subscriber revenue",
        href: "/subscriptions",
      },
      {
        id: "solutions-nonprofits",
        label: "Nonprofits",
        description: "Support and implementation guidance",
        href: "/support",
      },
    ],
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    description: "Support, docs, and technical resources around the platform.",
    links: [
      {
        id: "solutions-partners",
        label: "Partners",
        description: "Talk to the team and get implementation help",
        href: "/support",
      },
      {
        id: "solutions-documentation",
        label: "Documentation",
        description: "Guides and product docs",
        href: "/sdk/docs",
      },
      {
        id: "solutions-api-reference",
        label: "API reference",
        description: "Reference for integration details",
        href: "/sdk/api-reference",
      },
      {
        id: "solutions-sdks",
        label: "SDKs",
        description: "Client libraries and platform tooling",
        href: "/sdks",
      },
    ],
  },
];

export const marketingNavItems: NavbarItem[] = [
  { href: "/payments", label: "Products" },
  { href: "/checkout", label: "Solutions" },
  { href: "/sdk/docs", label: "Developers" },
  { href: "/pricing", label: "Pricing" },
];
