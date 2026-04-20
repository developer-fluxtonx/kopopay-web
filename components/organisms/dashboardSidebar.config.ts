// Icons are referenced by name here to keep this registry serializable
// and safe to import from server components. Client components should
// resolve the string to a real icon via the IconRegistry helper.

export interface SidebarRouteItem {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: string;
  accent: string;
  keywords?: string[];
}

export interface SidebarGroupItem {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: string;
  accent: string;
  items: SidebarRouteItem[];
}

export const dashboardMainNav: SidebarRouteItem[] = [
  {
    id: "home",
    label: "Home",
    description: "At a glance workspace overview.",
    href: "/dashboard",
    icon: "Home",
    accent: "#2ACED1",
    keywords: ["overview", "home", "summary"],
  },
  {
    id: "balances",
    label: "Balances",
    description: "Payout-ready funds and transfers.",
    href: "/dashboard/balances",
    icon: "Wallet",
    accent: "#034E78",
    keywords: ["payouts", "funds", "wallet"],
  },
  {
    id: "transactions",
    label: "Transactions",
    description: "Payments, captures, and activity.",
    href: "/dashboard/transactions",
    icon: "CreditCard",
    accent: "#008E96",
    keywords: ["payments", "charges", "ledger"],
  },
  {
    id: "send-money",
    label: "Send Money",
    description: "Transfer funds to anyone instantly.",
    href: "/dashboard/send",
    icon: "Send",
    accent: "#14B8A6",
    keywords: ["send", "transfer", "payout"],
  },
  {
    id: "receive-money",
    label: "Receive",
    description: "Accept payments via link or QR.",
    href: "/dashboard/receive",
    icon: "QrCode",
    accent: "#034E78",
    keywords: ["receive", "qr", "link"],
  },
  {
    id: "customers",
    label: "Customers",
    description: "Accounts, profiles, and support history.",
    href: "/dashboard/customers",
    icon: "Users",
    accent: "#0E7490",
    keywords: ["accounts", "profiles", "support"],
  },
  {
    id: "product-catalog",
    label: "Product catalog",
    description: "Browse products and pricing models.",
    href: "/dashboard/products",
    icon: "Package",
    accent: "#14B8A6",
    keywords: ["products", "catalog", "pricing"],
  },
  {
    id: "settings",
    label: "Settings",
    description: "Manage your account and preferences.",
    href: "/dashboard/settings",
    icon: "Settings2",
    accent: "#64748B",
    keywords: ["settings", "account", "profile"],
  },
];

export const dashboardShortcutSeeds: SidebarRouteItem[] = [
  {
    id: "shortcut-data-management",
    label: "Data management",
    description: "Reporting and data controls.",
    href: "/dashboard/products/reporting/data-management",
    icon: "Database",
    accent: "#2ACED1",
    keywords: ["data", "management", "reports"],
  },
  {
    id: "shortcut-api-keys",
    label: "API keys",
    description: "Developer access and keys.",
    href: "/dashboard/developer/api-keys",
    icon: "KeyRound",
    accent: "#034E78",
    keywords: ["keys", "developer", "api"],
  },
  {
    id: "shortcut-webhooks",
    label: "Webhooks",
    description: "Delivery endpoints and logs.",
    href: "/dashboard/developer/webhooks",
    icon: "Webhook",
    accent: "#008E96",
    keywords: ["webhooks", "events", "delivery"],
  },
];

const PRODUCT_PAYMENTS: SidebarGroupItem = {
  id: "payments",
  label: "Payments",
  description: "Checkout, analytics, disputes, Radar, links, and Terminal.",
  href: "/dashboard/products/payments",
  icon: "CreditCard",
  accent: "#2ACED1",
  items: [
    {
      id: "payments-overview",
      label: "Payments",
      description: "Core payments settings and surface controls.",
      href: "/dashboard/products/payments",
      icon: "CreditCard",
      accent: "#2ACED1",
      keywords: ["overview", "checkout", "payments"],
    },
    {
      id: "payments-analytics",
      label: "Analytics",
      description: "Authorization, conversion, and performance data.",
      href: "/dashboard/products/payments/analytics",
      icon: "BarChart3",
      accent: "#034E78",
      keywords: ["analytics", "metrics", "funnels"],
    },
    {
      id: "payments-disputes",
      label: "Disputes",
      description: "Chargebacks and evidence workflows.",
      href: "/dashboard/disputes",
      icon: "ShieldAlert",
      accent: "#008E96",
      keywords: ["disputes", "chargebacks", "evidence"],
    },
    {
      id: "payments-radar",
      label: "Radar",
      description: "Fraud rules and scoring controls.",
      href: "/dashboard/radar",
      icon: "Shield",
      accent: "#0E7490",
      keywords: ["fraud", "risk", "rules"],
    },
    {
      id: "payments-links",
      label: "Payment Links",
      description: "Shareable payment surfaces and flows.",
      href: "/dashboard/products/payments/payment-links",
      icon: "Link2",
      accent: "#14B8A6",
      keywords: ["links", "share", "checkout"],
    },
    {
      id: "payments-terminal",
      label: "Terminal",
      description: "In-person payment and reader controls.",
      href: "/dashboard/products/payments/terminal",
      icon: "Terminal",
      accent: "#034E78",
      keywords: ["terminal", "pos", "reader"],
    },
  ],
};

const PRODUCT_BILLING: SidebarGroupItem = {
  id: "billing",
  label: "Billing",
  description: "Subscriptions, invoices, usage, and recovery.",
  href: "/dashboard/billing",
  icon: "FileText",
  accent: "#034E78",
  items: [
    {
      id: "billing-overview",
      label: "Overview",
      description: "Billing surface summary and controls.",
      href: "/dashboard/billing",
      icon: "FileText",
      accent: "#034E78",
      keywords: ["billing", "overview"],
    },
    {
      id: "billing-subscriptions",
      label: "Subscriptions",
      description: "Plans, renewals, and recurring billing.",
      href: "/dashboard/products/billing/subscriptions",
      icon: "Users",
      accent: "#2ACED1",
      keywords: ["subscriptions", "plans", "renewals"],
    },
    {
      id: "billing-invoices",
      label: "Invoices",
      description: "Invoice flow and collection controls.",
      href: "/dashboard/products/billing/invoices",
      icon: "FileText",
      accent: "#008E96",
      keywords: ["invoices", "billing", "collections"],
    },
    {
      id: "billing-usage-based",
      label: "Usage-based",
      description: "Metered pricing and usage tracking.",
      href: "/dashboard/products/billing/usage-based",
      icon: "Database",
      accent: "#0E7490",
      keywords: ["usage", "metered", "pricing"],
    },
    {
      id: "billing-recovery",
      label: "Revenue recovery",
      description: "Dunning, retries, and recovery flows.",
      href: "/dashboard/products/billing/revenue-recovery",
      icon: "RefreshCw",
      accent: "#14B8A6",
      keywords: ["recovery", "dunning", "retry"],
    },
  ],
};

const PRODUCT_REPORTING: SidebarGroupItem = {
  id: "reporting",
  label: "Reporting",
  description: "Reports, custom metrics, Sigma, and data access.",
  href: "/dashboard/reports",
  icon: "BarChart3",
  accent: "#008E96",
  items: [
    {
      id: "reporting-reports",
      label: "Reports",
      description: "Shared dashboards and scheduled reports.",
      href: "/dashboard/reports",
      icon: "BarChart3",
      accent: "#008E96",
      keywords: ["reports", "dashboard", "overview"],
    },
    {
      id: "reporting-custom-metrics",
      label: "Custom metrics",
      description: "Define the metrics your team cares about.",
      href: "/dashboard/products/reporting/custom-metrics",
      icon: "Activity",
      accent: "#2ACED1",
      keywords: ["metrics", "analytics", "custom"],
    },
    {
      id: "reporting-sigma",
      label: "Sigma",
      description: "SQL access to reporting and exploration.",
      href: "/dashboard/products/reporting/sigma",
      icon: "Code",
      accent: "#034E78",
      keywords: ["sigma", "sql", "queries"],
    },
    {
      id: "reporting-revenue-recognition",
      label: "Revenue Recognition",
      description: "Accrual-ready revenue accounting flows.",
      href: "/dashboard/products/reporting/revenue-recognition",
      icon: "BookOpen",
      accent: "#0E7490",
      keywords: ["revenue", "recognition", "accounting"],
    },
    {
      id: "reporting-data-management",
      label: "Data management",
      description: "Exports, retention, and dataset controls.",
      href: "/dashboard/products/reporting/data-management",
      icon: "Database",
      accent: "#14B8A6",
      keywords: ["data", "management", "exports"],
    },
  ],
};

const PRODUCT_MORE: SidebarGroupItem = {
  id: "more",
  label: "More",
  description: "Profiles, tax, connect, identity, and platform tools.",
  href: "/dashboard/products/more",
  icon: "Layers3",
  accent: "#0E7490",
  items: [
    {
      id: "more-profiles",
      label: "Profiles",
      description: "Business identity and public profile controls.",
      href: "/dashboard/products/more/profiles",
      icon: "Globe",
      accent: "#2ACED1",
      keywords: ["profiles", "public", "identity"],
    },
    {
      id: "more-tax",
      label: "Tax",
      description: "Tax rules and collection setup.",
      href: "/dashboard/products/more/tax",
      icon: "FileText",
      accent: "#034E78",
      keywords: ["tax", "rules", "compliance"],
    },
    {
      id: "more-connect",
      label: "Connect",
      description: "Platform connections and partner flows.",
      href: "/dashboard/connect",
      icon: "Link2",
      accent: "#008E96",
      keywords: ["connect", "partners", "platform"],
    },
    {
      id: "more-identity",
      label: "Identity",
      description: "Verification and identity workflows.",
      href: "/dashboard/products/more/identity",
      icon: "BadgeCheck",
      accent: "#0E7490",
      keywords: ["identity", "verification", "kyc"],
    },
    {
      id: "more-atlas",
      label: "Atlas",
      description: "Company formation and startup setup.",
      href: "/dashboard/products/more/atlas",
      icon: "Package",
      accent: "#14B8A6",
      keywords: ["atlas", "formation", "startup"],
    },
    {
      id: "more-issuing",
      label: "Issuing",
      description: "Card programs and controls.",
      href: "/dashboard/products/more/issuing",
      icon: "CreditCard",
      accent: "#034E78",
      keywords: ["issuing", "cards", "programs"],
    },
    {
      id: "more-financial-connections",
      label: "Financial Connections",
      description: "Bank connections and linked accounts.",
      href: "/dashboard/products/more/financial-connections",
      icon: "Landmark",
      accent: "#2ACED1",
      keywords: ["financial", "connections", "banks"],
    },
    {
      id: "more-capital",
      label: "Capital",
      description: "Lending and financing surfaces.",
      href: "/dashboard/products/more/capital",
      icon: "Banknote",
      accent: "#0E7490",
      keywords: ["capital", "lending", "finance"],
    },
    {
      id: "more-climate",
      label: "Climate",
      description: "Impact and climate initiatives.",
      href: "/dashboard/products/more/climate",
      icon: "Leaf",
      accent: "#14B8A6",
      keywords: ["climate", "impact", "sustainability"],
    },
  ],
};

export const productSidebarSections: SidebarGroupItem[] = [
  PRODUCT_PAYMENTS,
  PRODUCT_BILLING,
  PRODUCT_REPORTING,
  PRODUCT_MORE,
];

export const productOperationsSection: SidebarGroupItem = {
  id: "operations",
  label: "Global payouts and workflows",
  description: "Operational controls that sit below the product surface.",
  href: "/dashboard/products/operations",
  icon: "Wallet",
  accent: "#2ACED1",
  items: [
    {
      id: "operations-global-payouts",
      label: "Global Payouts",
      description: "Disbursements and payout orchestration.",
      href: "/dashboard/products/operations/global-payouts",
      icon: "Wallet",
      accent: "#2ACED1",
      keywords: ["payouts", "global", "disbursements"],
    },
    {
      id: "operations-workflows",
      label: "Workflows",
      description: "Automations and process orchestration.",
      href: "/dashboard/products/operations/workflows",
      icon: "RefreshCw",
      accent: "#034E78",
      keywords: ["workflows", "automation", "process"],
    },
  ],
};

export const developerPrimaryItems: SidebarRouteItem[] = [
  {
    id: "developer-overview",
    label: "Overview",
    description: "Developer tools and integrations.",
    href: "/dashboard/developer",
    icon: "Code",
    accent: "#2ACED1",
    keywords: ["overview", "developer", "tools"],
  },
  {
    id: "developer-webhooks",
    label: "Webhooks",
    description: "Endpoint setup and delivery.",
    href: "/dashboard/developer/webhooks",
    icon: "Webhook",
    accent: "#034E78",
    keywords: ["webhooks", "delivery", "events"],
  },
  {
    id: "developer-events",
    label: "Events",
    description: "Event stream and payloads.",
    href: "/dashboard/developer/events",
    icon: "Activity",
    accent: "#008E96",
    keywords: ["events", "stream", "payloads"],
  },
  {
    id: "developer-logs",
    label: "Logs",
    description: "Integration logs and diagnostics.",
    href: "/dashboard/developer/logs",
    icon: "FileText",
    accent: "#0E7490",
    keywords: ["logs", "diagnostics", "history"],
  },
];

export const developerMoreItems: SidebarRouteItem[] = [
  {
    id: "developer-health",
    label: "Health",
    description: "Health status and uptime.",
    href: "/dashboard/developer/more/health",
    icon: "Shield",
    accent: "#2ACED1",
    keywords: ["health", "status", "uptime"],
  },
  {
    id: "developer-inspector",
    label: "Inspector",
    description: "Inspect requests and responses.",
    href: "/dashboard/developer/more/inspector",
    icon: "Search",
    accent: "#034E78",
    keywords: ["inspector", "search", "debug"],
  },
  {
    id: "developer-blueprints",
    label: "Blueprints",
    description: "Templates for repeatable integrations.",
    href: "/dashboard/developer/more/blueprints",
    icon: "BookOpen",
    accent: "#008E96",
    keywords: ["blueprints", "templates", "patterns"],
  },
  {
    id: "developer-shell",
    label: "Shell",
    description: "Command-line helper and quick ops.",
    href: "/dashboard/developer/more/shell",
    icon: "Terminal",
    accent: "#0E7490",
    keywords: ["shell", "cli", "terminal"],
  },
];

export const developerDocsItems: SidebarRouteItem[] = [
  {
    id: "developer-api-reference",
    label: "API reference",
    description: "Full public API documentation.",
    href: "/dashboard/developer/docs/api-reference",
    icon: "BookOpen",
    accent: "#2ACED1",
    keywords: ["api", "reference", "docs"],
  },
  {
    id: "developer-sdks",
    label: "SDKs",
    description: "Libraries for your stack.",
    href: "/dashboard/developer/docs/sdks",
    icon: "Code",
    accent: "#034E78",
    keywords: ["sdks", "libraries", "clients"],
  },
  {
    id: "developer-kopopayjs",
    label: "KopoPay.js",
    description: "Frontend checkout SDK and helpers.",
    href: "/dashboard/developer/docs/kopopay-js",
    icon: "Code",
    accent: "#008E96",
    keywords: ["js", "kopopay", "sdk"],
  },
  {
    id: "developer-cli",
    label: "CLI",
    description: "Command-line tooling and auth.",
    href: "/dashboard/developer/docs/cli",
    icon: "Terminal",
    accent: "#0E7490",
    keywords: ["cli", "shell", "terminal"],
  },
  {
    id: "developer-api-keys",
    label: "API keys",
    description: "Key management and rotation.",
    href: "/dashboard/developer/api-keys",
    icon: "KeyRound",
    accent: "#14B8A6",
    keywords: ["keys", "api", "secrets"],
  },
  {
    id: "developer-created-apps",
    label: "Created Apps",
    description: "Connected applications and ownership.",
    href: "/dashboard/developer/created-apps",
    icon: "Package",
    accent: "#034E78",
    keywords: ["apps", "connections", "created"],
  },
  {
    id: "developer-settings",
    label: "Developer Settings",
    description: "Integration defaults and preferences.",
    href: "/dashboard/developer/settings",
    icon: "Settings2",
    accent: "#2ACED1",
    keywords: ["settings", "developer", "defaults"],
  },
];

export const developerMenuMoreItem: SidebarRouteItem = {
  id: "developer-more",
  label: "More",
  description: "Additional tooling and utilities.",
  href: "/dashboard/developer/more",
  icon: "Layers3",
  accent: "#0E7490",
  keywords: ["more", "tools", "utilities"],
};

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ");

const titleCase = (value: string) =>
  normalize(value)
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const productSectionRoot = "/dashboard/products";
export const developerSectionRoot = "/dashboard/developer";

export function findProductSection(id: string) {
  return productSidebarSections.find((section) => section.id === id) ?? null;
}

export function findProductRoute(segments: string[]) {
  if (segments.length === 0) {
    return null;
  }

  if (segments[0] === "operations") {
    return (
      productOperationsSection.items.find((item) => item.href === `/dashboard/products/${segments.join("/")}`) ??
      null
    );
  }

  const section = findProductSection(segments[0]);
  if (!section) {
    return null;
  }

  return (
    section.items.find((item) => item.href === `/dashboard/products/${segments.join("/")}`) ??
    section.items[0] ??
    null
  );
}

export function resolveProductContext(segments: string[]) {
  if (segments.length === 0) {
    return {
      kind: "root" as const,
      title: "Product catalog",
      description: "Browse the platform's product surfaces and the settings that shape them.",
      accent: "#2ACED1",
      icon: "Package",
      breadcrumb: ["Dashboard", "Products"],
      section: null as SidebarGroupItem | null,
      item: null as SidebarRouteItem | null,
      children: [...productSidebarSections, productOperationsSection],
      note: "The sidebar now mirrors Stripe's grouped product navigation with cleaner route ownership.",
      nextSteps: ["Open a product surface", "Wire product data into APIs", "Add dedicated lifecycle pages"],
    };
  }

  if (segments[0] === "operations") {
    const section = productOperationsSection;
    const item = findProductRoute(segments);
    const childSection = section.items.length > 0 ? section : null;

    return {
      kind: segments.length === 1 ? ("section" as const) : ("leaf" as const),
      title: segments.length === 1 ? section.label : item?.label ?? titleCase(segments[segments.length - 1]),
      description:
        segments.length === 1
          ? section.description
          : item?.description ?? `Manage ${titleCase(segments[segments.length - 1])} in Kopo Pay.`,
      accent: item?.accent ?? section.accent,
      icon: item?.icon ?? section.icon,
      breadcrumb:
        segments.length === 1
          ? ["Dashboard", "Products", section.label]
          : ["Dashboard", "Products", section.label, item?.label ?? titleCase(segments[segments.length - 1])],
      section,
      item,
      children: childSection ? childSection.items : [],
      note:
        segments.length === 1
          ? "Operations are separated from the product groups so they stay easy to wire to backend jobs."
          : `${item?.label ?? titleCase(segments[segments.length - 1])} is ready for API wiring or feature expansion.`,
      nextSteps:
        segments.length === 1
          ? ["Open Global Payouts", "Open Workflows", "Wire operational APIs"]
          : ["Connect APIs", "Add permissions", "Persist configuration"],
    };
  }

  const section = findProductSection(segments[0]);
  if (!section) {
    const label = titleCase(segments[segments.length - 1]);
    return {
      kind: "leaf" as const,
      title: label,
      description: `Manage ${label.toLowerCase()} in Kopo Pay.`,
      accent: "#2ACED1",
      icon: "Package",
      breadcrumb: ["Dashboard", "Products", label],
      section: null as SidebarGroupItem | null,
      item: null as SidebarRouteItem | null,
      children: [],
      note: "This route is not yet registered, but the layout is ready for it.",
      nextSteps: ["Map it to an API", "Add a dedicated page", "Wire it into the sidebar"],
    };
  }

  const item = findProductRoute(segments);
  const isSectionRoot = segments.length === 1;

  return {
    kind: isSectionRoot ? ("section" as const) : ("leaf" as const),
    title: isSectionRoot ? section.label : item?.label ?? titleCase(segments[segments.length - 1]),
    description:
      isSectionRoot
        ? section.description
        : item?.description ?? `Manage ${titleCase(segments[segments.length - 1])} in Kopo Pay.`,
    accent: item?.accent ?? section.accent,
    icon: item?.icon ?? section.icon,
    breadcrumb:
      isSectionRoot
        ? ["Dashboard", "Products", section.label]
        : ["Dashboard", "Products", section.label, item?.label ?? titleCase(segments[segments.length - 1])],
    section,
    item,
    children: section.items,
    note:
      isSectionRoot
        ? `This section contains ${section.items.length} nested pages, each isolated for future APIs.`
        : `${item?.label ?? titleCase(segments[segments.length - 1])} is ready for backend wiring.`,
    nextSteps:
      isSectionRoot
        ? section.items.slice(0, 3).map((child) => `Open ${child.label}`)
        : ["Connect APIs", "Add permissions", "Persist configuration"],
  };
}

export function findDeveloperRoute(segments: string[]) {
  const route = `/dashboard/developer/${segments.join("/")}`;
  const allItems = [
    ...developerPrimaryItems,
    developerMenuMoreItem,
    ...developerMoreItems,
    ...developerDocsItems,
  ];

  return allItems.find((item) => item.href === route) ?? null;
}

export function resolveDeveloperContext(segments: string[]) {
  if (segments.length === 0) {
    return {
      kind: "root" as const,
      title: "Developer",
      description: "API keys, webhooks, events, and documentation live here.",
      accent: "#2ACED1",
      icon: "Code",
      breadcrumb: ["Dashboard", "Developer"],
      section: null as SidebarRouteItem | null,
      item: null as SidebarRouteItem | null,
      children: [
        ...developerPrimaryItems.slice(1),
        developerMenuMoreItem,
        ...developerDocsItems,
      ],
      note: "The developer dialog in the sidebar now points to real routes and a nested More flyout.",
      nextSteps: ["Open webhooks", "Review API keys", "Explore docs"],
    };
  }

  const route = findDeveloperRoute(segments);
  const leafLabel = route?.label ?? titleCase(segments[segments.length - 1]);

  if (segments[0] === "more") {
    return {
      kind: segments.length === 1 ? ("section" as const) : ("leaf" as const),
      title: segments.length === 1 ? developerMenuMoreItem.label : leafLabel,
      description:
        segments.length === 1
          ? developerMenuMoreItem.description
          : route?.description ?? `Manage ${leafLabel.toLowerCase()} from the developer tools area.`,
      accent: route?.accent ?? developerMenuMoreItem.accent,
      icon: route?.icon ?? developerMenuMoreItem.icon,
      breadcrumb:
        segments.length === 1
          ? ["Dashboard", "Developer", "More"]
          : ["Dashboard", "Developer", "More", leafLabel],
      section: developerMenuMoreItem,
      item: route ?? null,
      children: developerMoreItems,
      note:
        segments.length === 1
          ? "The More submenu is a right-side flyout in the sidebar dialog."
          : `${leafLabel} is part of the extended developer toolset.`,
      nextSteps:
        segments.length === 1
          ? developerMoreItems.map((item) => `Open ${item.label}`)
          : ["Connect APIs", "Add permissions", "Persist configuration"],
    };
  }

  if (segments[0] === "docs") {
    return {
      kind: segments.length === 1 ? ("section" as const) : ("leaf" as const),
      title: segments.length === 1 ? "Documentation" : leafLabel,
      description:
        segments.length === 1
          ? "Developer documentation, SDKs, and tooling."
          : route?.description ?? `Manage ${leafLabel.toLowerCase()} from the docs area.`,
      accent: route?.accent ?? "#2ACED1",
      icon: route?.icon ?? "BookOpen",
      breadcrumb:
        segments.length === 1
          ? ["Dashboard", "Developer", "Documentation"]
          : ["Dashboard", "Developer", "Documentation", leafLabel],
      section: null as SidebarRouteItem | null,
      item: route ?? null,
      children: developerDocsItems,
      note:
        segments.length === 1
          ? "Documentation stays grouped separately so it is easy to scan."
          : `${leafLabel} is wired as a documentation destination.`,
      nextSteps:
        segments.length === 1
          ? developerDocsItems.slice(0, 3).map((item) => `Open ${item.label}`)
          : ["Read docs", "Integrate the SDK", "Wire a test flow"],
    };
  }

  return {
    kind: "leaf" as const,
    title: leafLabel,
    description:
      route?.description ?? `Manage ${leafLabel.toLowerCase()} from the developer tools area.`,
    accent: route?.accent ?? "#2ACED1",
      icon: route?.icon ?? "Code",
    breadcrumb: ["Dashboard", "Developer", leafLabel],
    section: null as SidebarRouteItem | null,
    item: route ?? null,
    children: developerPrimaryItems.filter((item) => item.id !== "developer-overview"),
    note: `${leafLabel} is ready for backend wiring or SDK-driven integration.`,
    nextSteps: ["Connect APIs", "Add permissions", "Persist configuration"],
  };
}
