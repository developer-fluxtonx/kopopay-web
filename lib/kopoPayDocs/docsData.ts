export type DocsTopCategory = {
  title: string;
  href: string;
};

export type DocsSidebarItem = {
  title: string;
  href: string;
  description: string;
};

export type DocsSidebarGroup = {
  title: string;
  items: DocsSidebarItem[];
};

export type DocsPageData = {
  slug: string[];
  section: string;
  title: string;
  description: string;
  eyebrow: string;
  apiMeta?: {
    method: string;
    endpoint: string;
    auth?: string;
    note?: string;
  };
  highlights: string[];
  steps: string[];
  sections: {
    title: string;
    body: string;
    bullets?: string[];
    code?: string;
  }[];
  related: DocsSidebarItem[];
};

export const docsSectionLabels: Record<string, string> = {
  "new-business": "New business",
  "new-business-sandbox": "New business sandbox",
  "get-started": "Get started",
  payments: "Payments",
  revenue: "Revenue",
  "platforms-and-marketplaces": "Platforms and marketplaces",
  "money-management": "Money management",
  "developer-resources": "Developer resources",
  "apis-and-sdks": "APIs & SDKs",
  help: "Help",
};

export const docsTopCategories: DocsTopCategory[] = [
  { title: "New business", href: "/kopoPayDocs/new-business" },
  { title: "New business sandbox", href: "/kopoPayDocs/new-business-sandbox" },
  { title: "Get started", href: "/kopoPayDocs/get-started" },
  { title: "Payments", href: "/kopoPayDocs/payments" },
  { title: "Revenue", href: "/kopoPayDocs/revenue" },
  { title: "Platforms and marketplaces", href: "/kopoPayDocs/platforms-and-marketplaces" },
  { title: "Money management", href: "/kopoPayDocs/money-management" },
  { title: "Developer resources", href: "/kopoPayDocs/developer-resources" },
  { title: "APIs & SDKs", href: "/kopoPayDocs/apis-and-sdks" },
  { title: "Help", href: "/kopoPayDocs/help" },
];

export const docsSidebarGroups: DocsSidebarGroup[] = [
  {
    title: "New business",
    items: [
      { title: "Overview", href: "/kopoPayDocs/new-business/overview", description: "What to set up first" },
      { title: "Set up your account", href: "/kopoPayDocs/new-business/set-up-your-account", description: "Create and configure" },
      { title: "Add funds to your balance", href: "/kopoPayDocs/new-business/add-funds-to-your-balance", description: "Move money into Kopo Pay" },
      { title: "Account checklist", href: "/kopoPayDocs/new-business/account-checklist", description: "Go live checklist" },
      { title: "Acceptable verification documents", href: "/kopoPayDocs/new-business/acceptable-verification-documents", description: "Identity and business docs" },
      { title: "Account structure", href: "/kopoPayDocs/new-business/account-structure", description: "How accounts are organized" },
      { title: "Start a team", href: "/kopoPayDocs/new-business/start-a-team", description: "Invite your teammates" },
      { title: "Organizations", href: "/kopoPayDocs/new-business/organizations", description: "Manage multiple workspaces" },
      { title: "Multiple separate accounts", href: "/kopoPayDocs/new-business/multiple-separate-accounts", description: "Split business units cleanly" },
      { title: "Linked external accounts", href: "/kopoPayDocs/new-business/linked-external-accounts", description: "Connect bank accounts" },
      { title: "Settings", href: "/kopoPayDocs/new-business/settings", description: "Account preferences" },
      { title: "Profile", href: "/kopoPayDocs/new-business/profile", description: "Business profile details" },
      { title: "Branding", href: "/kopoPayDocs/new-business/branding", description: "Brand colors and identity" },
      { title: "Statement descriptors", href: "/kopoPayDocs/new-business/statement-descriptors", description: "What customers see" },
      { title: "Custom email domain", href: "/kopoPayDocs/new-business/custom-email-domain", description: "Send mail from your brand" },
      { title: "Custom domain", href: "/kopoPayDocs/new-business/custom-domain", description: "Use your own domain" },
      { title: "Single sign-on", href: "/kopoPayDocs/new-business/single-sign-on", description: "Centralized access" },
      { title: "Kopo Pay Verified", href: "/kopoPayDocs/new-business/kopo-pay-verified", description: "Trust and verification badge" },
    ],
  },
  {
    title: "Get started",
    items: [
      { title: "Start developing", href: "/kopoPayDocs/get-started/start-developing", description: "Build your first integration" },
      { title: "Build with AI agents", href: "/kopoPayDocs/get-started/build-with-ai-agents", description: "Automate with AI" },
      { title: "Use Kopo Pay without code", href: "/kopoPayDocs/get-started/use-kopo-pay-without-code", description: "No-code setup options" },
      { title: "Migrate to Kopo Pay", href: "/kopoPayDocs/get-started/migrate-to-kopo-pay", description: "Move from another stack" },
      { title: "Common use cases", href: "/kopoPayDocs/get-started/common-use-cases", description: "Patterns that work well" },
    ],
  },
  {
    title: "Payments",
    items: [
      { title: "Overview", href: "/kopoPayDocs/payments/overview", description: "Core payment flow" },
      { title: "Checkout", href: "/kopoPayDocs/payments/checkout", description: "Fast hosted checkout" },
      { title: "Payment Intents", href: "/kopoPayDocs/payments/payment-intents", description: "Flexible payment APIs" },
    ],
  },
  {
    title: "Revenue",
    items: [
      { title: "Subscriptions", href: "/kopoPayDocs/revenue/subscriptions", description: "Recurring billing" },
      { title: "Invoices", href: "/kopoPayDocs/revenue/invoices", description: "Collect payments cleanly" },
      { title: "Billing portal", href: "/kopoPayDocs/revenue/billing-portal", description: "Let customers self-serve" },
    ],
  },
  {
    title: "Platforms and marketplaces",
    items: [
      { title: "Connect overview", href: "/kopoPayDocs/platforms-and-marketplaces/connect-overview", description: "Build multi-party systems" },
      { title: "Onboarding", href: "/kopoPayDocs/platforms-and-marketplaces/onboarding", description: "Bring sellers and partners in" },
      { title: "Transfers", href: "/kopoPayDocs/platforms-and-marketplaces/transfers", description: "Route funds between parties" },
    ],
  },
  {
    title: "Money management",
    items: [
      { title: "Balances", href: "/kopoPayDocs/money-management/balances", description: "Track available funds" },
      { title: "Payouts", href: "/kopoPayDocs/money-management/payouts", description: "Move money to bank accounts" },
      { title: "Treasury", href: "/kopoPayDocs/money-management/treasury", description: "Manage stored value" },
    ],
  },
  {
    title: "Developer resources",
    items: [
      { title: "API reference", href: "/kopoPayDocs/developer-resources/api-reference", description: "Endpoints and payloads" },
      { title: "Webhooks", href: "/kopoPayDocs/developer-resources/webhooks", description: "Event-driven integrations" },
      { title: "Testing", href: "/kopoPayDocs/developer-resources/testing", description: "Local and sandbox workflows" },
    ],
  },
  {
    title: "APIs & SDKs",
    items: [
      { title: "SDKs", href: "/kopoPayDocs/apis-and-sdks/sdks", description: "Client libraries" },
      { title: "Authentication", href: "/kopoPayDocs/apis-and-sdks/authentication", description: "Secure access patterns" },
      { title: "Error handling", href: "/kopoPayDocs/apis-and-sdks/error-handling", description: "Reliable integration patterns" },
    ],
  },
  {
    title: "Help",
    items: [
      { title: "Support", href: "/kopoPayDocs/help/support", description: "Get help fast" },
      { title: "Status", href: "/kopoPayDocs/help/status", description: "Platform health" },
      { title: "Contact", href: "/kopoPayDocs/help/contact", description: "Talk to the team" },
    ],
  },
];

const makePage = (
  slug: string[],
  title: string,
  description: string,
  related: DocsSidebarItem[] = [],
  sections: DocsPageData["sections"] = []
): DocsPageData => ({
  slug,
  section: docsSectionLabels[slug[0]] ?? slug[0].replace(/-/g, " "),
  title,
  description,
  eyebrow: slug.length === 1 ? "Documentation" : "Guide",
  apiMeta: buildApiMetaForPage(slug),
  highlights: buildHighlightsForPage(slug),
  steps: buildStepsForPage(slug),
  sections: sections.length > 0 ? sections : buildSectionsForPage(slug, title, description),
  related,
});

const codeExample = (lines: string[]) => lines.join("\n");

const buildApiMetaForPage = (slug: string[]) => {
  const section = slug[0];
  const leaf = slug[slug.length - 1];

  if (section === "payments") {
    if (leaf === "checkout") {
      return { method: "POST", endpoint: "/v1/checkout/sessions", auth: "Server key", note: "Hosted flow" };
    }

    if (leaf === "payment-intents") {
      return { method: "POST", endpoint: "/v1/payment_intents", auth: "Server key", note: "Core payment object" };
    }

    return { method: "GET", endpoint: "/v1/payments", auth: "Server key", note: "Payments API" };
  }

  if (section === "revenue") {
    if (leaf === "subscriptions") {
      return { method: "POST", endpoint: "/v1/subscriptions", auth: "Server key", note: "Recurring billing" };
    }

    if (leaf === "invoices") {
      return { method: "POST", endpoint: "/v1/invoices", auth: "Server key", note: "Billing documents" };
    }

    return { method: "POST", endpoint: "/v1/billing_portal/sessions", auth: "Server key", note: "Customer self-serve" };
  }

  if (section === "platforms-and-marketplaces") {
    if (leaf === "onboarding") {
      return { method: "POST", endpoint: "/v1/accounts", auth: "Server key", note: "Connected account setup" };
    }

    if (leaf === "transfers") {
      return { method: "POST", endpoint: "/v1/transfers", auth: "Server key", note: "Move funds between parties" };
    }

    return { method: "GET", endpoint: "/v1/accounts", auth: "Server key", note: "Platform accounts" };
  }

  if (section === "money-management") {
    if (leaf === "balances") {
      return { method: "GET", endpoint: "/v1/balances", auth: "Server key", note: "Available and pending funds" };
    }

    if (leaf === "payouts") {
      return { method: "POST", endpoint: "/v1/payouts", auth: "Server key", note: "Move money to a bank account" };
    }

    return { method: "GET", endpoint: "/v1/treasury/financial_accounts", auth: "Server key", note: "Stored value and treasury" };
  }

  if (section === "developer-resources") {
    if (leaf === "api-reference") {
      return { method: "ANY", endpoint: "/v1/*", auth: "Server key", note: "Reference examples" };
    }

    if (leaf === "webhooks") {
      return { method: "POST", endpoint: "/webhooks", auth: "Signing secret", note: "Event callbacks" };
    }

    return { method: "POST", endpoint: "/v1/test_helpers/*", auth: "Server key", note: "Sandbox testing" };
  }

  if (section === "apis-and-sdks") {
    if (leaf === "authentication") {
      return { method: "HEADER", endpoint: "Authorization: Bearer sk_test_...", auth: "Secret key", note: "Keep secrets on the server" };
    }

    if (leaf === "error-handling") {
      return { method: "ERROR", endpoint: "Retry / backoff patterns", auth: "Client + server", note: "Stable failures" };
    }

    return { method: "SDK", endpoint: "@kopo/pay-js", auth: "Package install", note: "Client library" };
  }

  return undefined;
};

const buildHighlightsForPage = (slug: string[]) => {
  const section = slug[0];

  switch (section) {
    case "new-business":
      return ["Account setup", "Verification ready", "Team access prepared"];
    case "get-started":
      return ["Fast first steps", "Sandbox friendly", "Simple build path"];
    case "payments":
      return ["Hosted checkout", "Flexible payment flow", "Clear success path"];
    case "revenue":
      return ["Recurring billing", "Invoice control", "Customer self-service"];
    case "platforms-and-marketplaces":
      return ["Multi-party flow", "Onboarding ready", "Fund routing"];
    case "money-management":
      return ["Balance visibility", "Payout control", "Stored value"];
    case "developer-resources":
      return ["Reference docs", "Webhook focused", "Testing workflows"];
    case "apis-and-sdks":
      return ["Client libraries", "Auth patterns", "Error handling"];
    case "help":
      return ["Support access", "Service status", "Contact options"];
    default:
      return ["Simple setup flow", "Clean defaults with room to grow", "Works well for sandbox and production"];
  }
};

const buildStepsForPage = (slug: string[]) => {
  const section = slug[0];

  switch (section) {
    case "new-business":
      return [
        "Open the account page and complete the basic profile first.",
        "Verify the business details and review the checklist.",
        "Invite the team and confirm payout settings before launch.",
      ];
    case "get-started":
      return [
        "Read the overview and pick the shortest path for your use case.",
        "Try the sandbox or code sample before moving into production.",
        "Open the related guide for the next piece of the flow.",
      ];
    case "payments":
      return [
        "Choose the payment product that matches your integration style.",
        "Create the payment object and pass the right line items or amount.",
        "Handle confirmation, success, and error states in your app.",
      ];
    case "revenue":
      return [
        "Decide whether the flow is subscription-based or invoice-based.",
        "Keep billing actions small and webhook-driven.",
        "Use the related pages to handle retries, customer updates, and status changes.",
      ];
    case "platforms-and-marketplaces":
      return [
        "Map the parties in the flow before building the integration.",
        "Set up onboarding so the connected accounts are ready to receive funds.",
        "Route transfers only after the base payment flow is stable.",
      ];
    case "money-management":
      return [
        "Check balance views before setting payout rules.",
        "Keep payout timing predictable and easy to explain to finance teams.",
        "Use treasury or stored-value features only when the business model needs them.",
      ];
    case "developer-resources":
      return [
        "Start with the reference page for the exact API behavior you need.",
        "Use webhooks or testing pages to validate the integration end to end.",
        "Keep retry and error handling simple.",
      ];
    case "apis-and-sdks":
      return [
        "Pick the SDK or auth pattern that matches your stack.",
        "Use the smallest request example first and expand after it works.",
        "Handle errors in one place so the integration stays maintainable.",
      ];
    case "help":
      return [
        "Check status first if something feels off in production.",
        "Use support for account, billing, or integration questions.",
        "Reach out directly when you need a human response.",
      ];
    default:
      return [
        "Start from the overview and follow the recommended order.",
        "Configure the account or integration settings you need.",
        "Use the related pages for deeper details and edge cases.",
      ];
  }
};

const buildSectionsForPage = (slug: string[], title: string, description: string) => {
  const section = slug[0];
  const leaf = slug[slug.length - 1];

  if (section === "new-business") {
    return [
      {
        title: "What this page covers",
        body: "Use this path to prepare a brand new account without adding extra complexity too early.",
      },
      {
        title: "What to do first",
        body: "Keep the business profile accurate, confirm the verification path, and make the account easy for your team to own.",
        bullets: [
          "Use one clear business identity.",
          "Keep the profile and descriptor aligned.",
          "Start in sandbox before production.",
        ],
      },
      {
        title: "Good default path",
        body: "The safest order is profile, verification, team access, then production settings.",
      },
    ];
  }

  if (section === "get-started") {
    return [
      {
        title: "Quick start",
        body: "This section helps you move from first read to first working integration with a short path.",
      },
      {
        title: "Try it once",
        body: "Use sandbox first, confirm the core path, and then move to the production guide when the flow feels stable.",
        code: codeExample([
          "const session = await kopo.checkout.create({",
          "  mode: 'payment',",
          "  success_url: 'https://example.com/success',",
          "});",
        ]),
      },
    ];
  }

  if (section === "payments") {
    return [
      {
        title: "Payment flow",
        body: "The payment flow should stay short: create, confirm, and handle the result.",
      },
      {
        title: "Example",
        body: "Start with a hosted checkout or payment intent, then layer in custom logic only when needed.",
        code: codeExample([
          "await kopo.payments.create({",
          "  amount: 2000,",
          "  currency: 'usd',",
          "});",
        ]),
      },
      {
        title: "Watch for these cases",
        body: "Keep an eye on retries, card declines, and callback handling so the user never gets stuck.",
      },
    ];
  }

  if (section === "revenue") {
    return [
      {
        title: "Billing model",
        body: "Subscriptions, invoices, and portal access should stay easy to explain to customers and finance teams.",
      },
      {
        title: "Useful events",
        body: "Use webhooks to keep subscriptions and invoice status in sync.",
        code: codeExample([
          "if (event.type === 'invoice.paid') {",
          "  // mark invoice complete",
          "}",
        ]),
      },
    ];
  }

  if (section === "platforms-and-marketplaces") {
    return [
      {
        title: "Money flow",
        body: "Map how money moves between customers, the platform, and connected accounts before building the UI.",
      },
      {
        title: "Onboarding path",
        body: "Bring the connected account in first, then handle transfers after the base flow works.",
      },
      {
        title: "Example",
        body: "Keep the core flow small and add transfer logic only after onboarding is stable.",
        code: codeExample([
          "await kopo.transfers.create({",
          "  amount: 5000,",
          "  destination: 'acct_123',",
          "});",
        ]),
      },
    ];
  }

  if (section === "money-management") {
    return [
      {
        title: "Balance model",
        body: "Show available and pending balances separately so finance and operations see the same numbers.",
      },
      {
        title: "Payout timing",
        body: "Keep payout windows predictable and document them in one place.",
      },
      {
        title: "Stored value",
        body: "Use treasury features only if the business needs a tighter money control model.",
      },
    ];
  }

  if (section === "developer-resources") {
    return [
      {
        title: "Reference first",
        body: "This section is for exact API behavior, webhook payloads, and test steps.",
      },
      {
        title: "API example",
        body: "Keep the sample request short and readable.",
        code: codeExample([
          "const response = await fetch('/v1/payments', {",
          "  method: 'POST',",
          "  headers: { Authorization: `Bearer ${token}` },",
          "});",
        ]),
      },
    ];
  }

  if (section === "apis-and-sdks") {
    return [
      {
        title: "SDK path",
        body: "Choose the smallest client library that matches your stack, then add auth and error handling later.",
      },
      {
        title: "Auth example",
        body: "Keep secrets server-side and send the key in a secure request path.",
        code: codeExample(["Authorization: Bearer sk_test_123"]),
      },
      {
        title: "Error handling",
        body: "Show clear retry and failure states so the integration stays predictable.",
      },
    ];
  }

  if (section === "help") {
    return [
      {
        title: "Support",
        body: "Use support for account, billing, and integration questions.",
      },
      {
        title: "Status",
        body: "Check the status page before spending time debugging a platform issue.",
      },
      {
        title: "Contact",
        body: "Contact the team when you need a direct answer on the next step.",
      },
    ];
  }

  if (leaf === "overview") {
    return [
      {
        title: "Overview",
        body: description,
      },
      {
        title: "Start here",
        body: "Read the overview, then move into the linked page that matches your use case.",
      },
    ];
  }

  return [
    {
      title: "What this page covers",
      body: "Keep the flow short and clear. This page explains the main idea, the minimum setup, and where to go next.",
    },
    {
      title: "Good default path",
      body: "Most teams should follow the simple setup first, then move into customization after the core flow works.",
    },
  ];
};

export const docsPages: DocsPageData[] = [
  makePage(
    ["new-business"],
    "New business",
    "Set up your account, verify your details, and prepare to launch.",
    docsSidebarGroups[0].items.slice(0, 6),
    [
      {
        title: "First steps",
        body: "Create the account, add your business profile, and keep verification simple.",
        bullets: [
          "Use the profile page to keep the details clean.",
          "Keep the company name and descriptor consistent.",
          "Start in sandbox before production.",
        ],
      },
      {
        title: "Recommended setup",
        body: "Most teams should finish the checklist first, then wire up team access and payout settings.",
      },
    ]
  ),
  makePage(["new-business", "overview"], "Overview", "A calm starting point for the account setup flow.", docsSidebarGroups[0].items.slice(0, 4), [
    {
      title: "Overview",
      body: "This is the entry point for new accounts. Keep the setup short and move page by page.",
    },
    {
      title: "Short path",
      body: "Set up the account, verify the business, and review your balance before launch.",
      code: codeExample([
        "1. Create account",
        "2. Complete verification",
        "3. Add funds",
        "4. Launch",
      ]),
    },
  ]),
  makePage(["new-business", "set-up-your-account"], "Set up your account", "Create the account structure and core settings.", [], [
    {
      title: "Core settings",
      body: "Add the business name, legal details, and the base region first.",
    },
    {
      title: "Clean defaults",
      body: "Use the simplest account layout at the start. You can expand later without changing the flow.",
    },
  ]),
  makePage(["new-business", "add-funds-to-your-balance"], "Add funds to your balance", "Move money into the account so you can test flows.", [], [
    {
      title: "Purpose",
      body: "Funding the balance lets you test refunds, payouts, and balance views before going live.",
      bullets: ["Use a small test amount.", "Confirm the balance updates.", "Keep the transaction trace for support."],
    },
  ]),
  makePage(["new-business", "account-checklist"], "Account checklist", "Use this before you go live.", [], [
    {
      title: "Checklist",
      body: "Complete the minimum setup, then confirm the business details, security, and payout path.",
      bullets: ["Profile complete", "Verification complete", "Team access reviewed", "Payouts configured"],
    },
  ]),
  makePage(["new-business", "acceptable-verification-documents"], "Acceptable verification documents", "See which documents help with verification.", [], [
    {
      title: "Simple rule",
      body: "Use documents that clearly match the legal entity name and address on the account.",
    },
  ]),
  makePage(["new-business", "account-structure"], "Account structure", "Understand how accounts are organized.", [], [
    {
      title: "Structure",
      body: "Keep the structure small unless you really need separate business units.",
    },
  ]),
  makePage(["new-business", "start-a-team"], "Start a team", "Invite collaborators and assign access.", [], [
    {
      title: "Team access",
      body: "Add teammates with the least access they need to do the job.",
    },
  ]),
  makePage(["new-business", "organizations"], "Organizations", "Manage multiple workspaces under one umbrella.", [], [
    { title: "Why it helps", body: "Organizations keep workspace ownership and billing easy to manage." },
  ]),
  makePage(["new-business", "multiple-separate-accounts"], "Multiple separate accounts", "Separate business lines without mixing data.", [], [
    { title: "When to use", body: "Use this when teams, brands, or regions need different operational settings." },
  ]),
  makePage(["new-business", "linked-external-accounts"], "Linked external accounts", "Connect external accounts for payouts and transfers.", [], [
    { title: "External accounts", body: "Connect bank accounts after verification so payouts can flow cleanly." },
  ]),
  makePage(["new-business", "settings"], "Settings", "Tune account behavior and preferences.", [], [
    { title: "Settings", body: "Keep security, payouts, and branding settings grouped and easy to review." },
  ]),
  makePage(["new-business", "profile"], "Profile", "Keep your business profile current.", [], [
    { title: "Profile", body: "Use accurate business details so support and verification stay simple." },
  ]),
  makePage(["new-business", "branding"], "Branding", "Apply your logo, color, and visual identity.", [], [
    { title: "Branding", body: "Match the customer-facing pages to your brand without overcomplicating the setup." },
  ]),
  makePage(["new-business", "statement-descriptors"], "Statement descriptors", "Control what appears on customer statements.", [], [
    { title: "Descriptor", body: "Keep it short, recognizable, and consistent with your brand name." },
  ]),
  makePage(["new-business", "custom-email-domain"], "Custom email domain", "Send branded emails from your own domain.", [], [
    { title: "Email domain", body: "Use a verified sender domain when you want emails to look native to your brand." },
  ]),
  makePage(["new-business", "custom-domain"], "Custom domain", "Use a domain that matches your brand.", [], [
    { title: "Domain", body: "Point your docs or customer pages at a domain your team owns." },
  ]),
  makePage(["new-business", "single-sign-on"], "Single sign-on", "Centralize access for your team.", [], [
    { title: "SSO", body: "SSO keeps team access manageable as your org grows." },
  ]),
  makePage(["new-business", "kopo-pay-verified"], "Kopo Pay Verified", "Add the verification badge and trust signals.", [], [
    { title: "Verified", body: "Use the verified badge after the account is fully set up and reviewed." },
  ]),
  makePage(["new-business-sandbox"], "New business sandbox", "Practice the setup flow in a safe test environment.", [], [
    {
      title: "Sandbox rules",
      body: "The sandbox should mirror production structure without moving real money or sending real notifications.",
      bullets: [
        "Use test keys and test accounts only.",
        "Keep customer data synthetic.",
        "Reset the workspace between experiments.",
      ],
    },
    {
      title: "Safe testing",
      body: "Try the onboarding flow, payment flow, and webhook flow before turning anything on in production.",
      code: codeExample([
        "const session = await kopo.checkout.create({",
        "  mode: 'payment',",
        "  success_url: 'https://example.com/success',",
        "  test_mode: true,",
        "});",
      ]),
    },
  ]),
  makePage(["get-started"], "Get started", "Learn the fastest path from first login to first transaction.", docsSidebarGroups[1].items, [
    {
      title: "Fast path",
      body: "Start with one product path, confirm it works, and only then add deeper customization.",
      bullets: [
        "Pick one primary use case.",
        "Use sandbox before live configuration.",
        "Keep the first release intentionally small.",
      ],
    },
    {
      title: "Best order",
      body: "Development first, testing second, production last.",
      code: codeExample([
        "1. Read the overview",
        "2. Try the sandbox",
        "3. Build the first flow",
        "4. Switch to production",
      ]),
    },
    {
      title: "Starter flow",
      body: "Use the shortest possible code path first and expand only when the app needs more control.",
      code: codeExample([
        "await kopo.checkout.create({",
        "  mode: 'payment',",
        "  line_items: [{ price: 'price_123', quantity: 1 }],",
        "});",
      ]),
    },
  ]),
  makePage(["get-started", "start-developing"], "Start developing", "Build the first integration with a small, clear setup.", [], [
    {
      title: "Hello world",
      body: "A first integration should be tiny. Create one payment flow and verify the return path.",
      code: codeExample([
        "const session = await kopo.checkout.create({",
        "  mode: 'payment',",
        "  success_url: 'https://example.com/success',",
        "});",
      ]),
    },
  ]),
  makePage(["get-started", "build-with-ai-agents"], "Build with AI agents", "Use AI to speed up common implementation tasks.", [], [
    { title: "AI helpers", body: "Use AI for scaffolding, explanation, and repetitive checks. Keep the final logic human-reviewed." },
  ]),
  makePage(["get-started", "use-kopo-pay-without-code"], "Use Kopo Pay without code", "Launch with no-code or low-code options.", [], [
    { title: "No-code", body: "Use hosted tools when you want speed over deep customization." },
  ]),
  makePage(["get-started", "migrate-to-kopo-pay"], "Migrate to Kopo Pay", "Move from another provider with minimal friction.", [], [
    { title: "Migration", body: "Migrate in small steps. Start with payments, then move billing and payouts." },
  ]),
  makePage(["get-started", "common-use-cases"], "Common use cases", "See the most common implementation patterns.", [], [
    { title: "Use cases", body: "Keep the page short and focus on the flows teams ask for most often." },
  ]),
  makePage(["payments"], "Payments", "Create, confirm, and manage payments with one clean flow.", docsSidebarGroups[2].items, [
    {
      title: "Payments lifecycle",
      body: "Keep the lifecycle short: create, confirm, settle, and reconcile.",
      bullets: [
        "Create the payment object first.",
        "Confirm only when the user is ready.",
        "Handle success and failure states explicitly.",
      ],
    },
    {
      title: "Keep it simple",
      body: "Use a small set of APIs first, then add advanced routing later.",
      code: codeExample([
        "await kopo.payments.create({",
        "  amount: 2500,",
        "  currency: 'usd',",
        "});",
      ]),
    },
    {
      title: "Operational notes",
      body: "Make sure refunds, disputes, and retries each have a clear owner in your team.",
    },
  ]),
  makePage(["payments", "overview"], "Overview", "A quick tour of the payment products.", [], [
    { title: "Overview", body: "Choose the right product based on how much control you want over checkout." },
  ]),
  makePage(["payments", "checkout"], "Checkout", "Use a hosted checkout flow for speed and simplicity.", [], [
    {
      title: "Checkout flow",
      body: "Checkout handles the UI and payment confirmation so you can ship faster.",
      code: codeExample([
        "await kopo.checkout.create({",
        "  mode: 'payment',",
        "  line_items: [{ price: 'price_123', quantity: 1 }],",
        "});",
      ]),
    },
  ]),
  makePage(["payments", "payment-intents"], "Payment Intents", "Use the core payment API for flexible payment handling.", [], [
    { title: "Intents", body: "Use Payment Intents when you need a more custom payment flow." },
  ]),
  makePage(["revenue"], "Revenue", "Build recurring billing and invoicing flows that stay organized.", docsSidebarGroups[3].items, [
    {
      title: "Revenue model",
      body: "Use this area for recurring billing, invoices, and customer billing control.",
      bullets: [
        "Subscriptions handle repeat billing.",
        "Invoices are good for one-off or manual billing.",
        "Portal access keeps customer updates self-serve.",
      ],
    },
    {
      title: "Default setup",
      body: "Keep the first billing flow simple, then add proration, trials, or metered usage later.",
    },
  ]),
  makePage(["revenue", "subscriptions"], "Subscriptions", "Recurring billing for SaaS and membership products.", [], [
    { title: "Subscriptions", body: "Keep plans, trial periods, and billing cycles easy to understand." },
  ]),
  makePage(["revenue", "invoices"], "Invoices", "Send invoices and collect payment cleanly.", [], [
    { title: "Invoices", body: "Invoices are best when you need a clear payment request and history." },
  ]),
  makePage(["revenue", "billing-portal"], "Billing portal", "Let customers manage their own billing details.", [], [
    { title: "Billing portal", body: "Give customers a simple self-service place to update billing details." },
  ]),
  makePage(["platforms-and-marketplaces"], "Platforms and marketplaces", "Support multiple parties and complex fund flows.", docsSidebarGroups[4].items, [
    {
      title: "Platform model",
      body: "Use this section for split payments, onboarding, and connected accounts.",
      bullets: [
        "Map the parties before you build the UI.",
        "Decide who owns the customer relationship.",
        "Keep the fund flow visible for ops and support teams.",
      ],
    },
    {
      title: "Implementation order",
      body: "Get onboarding working first, then transfers, then reporting and exceptions.",
    },
  ]),
  makePage(["platforms-and-marketplaces", "connect-overview"], "Connect overview", "The base model for platform and marketplace products.", [], [
    { title: "Connect", body: "Connect gives you the primitives to move money across many parties." },
  ]),
  makePage(["platforms-and-marketplaces", "onboarding"], "Onboarding", "Bring sellers and partners into the platform.", [], [
    { title: "Onboarding", body: "Keep onboarding short and explain why each field is needed." },
  ]),
  makePage(["platforms-and-marketplaces", "transfers"], "Transfers", "Move funds between connected accounts.", [], [
    { title: "Transfers", body: "Use transfers when you need to route money after a payment is completed." },
  ]),
  makePage(["money-management"], "Money management", "Track balances, payouts, and stored value.", docsSidebarGroups[5].items, [
    {
      title: "Money overview",
      body: "This section keeps the balance and payout flows easy to scan.",
      bullets: [
        "Separate pending and available balances.",
        "Make payout schedules predictable.",
        "Keep treasury or stored-value features optional.",
      ],
    },
    {
      title: "Default flow",
      body: "Finance teams should be able to look at this section and know where money is and when it moves.",
    },
  ]),
  makePage(["money-management", "balances"], "Balances", "See available and pending funds at a glance.", [], [
    { title: "Balances", body: "Show available and pending values separately so teams know what is spendable." },
  ]),
  makePage(["money-management", "payouts"], "Payouts", "Send funds to bank accounts on a schedule.", [], [
    { title: "Payouts", body: "Use payouts to move funds into external accounts on a predictable cadence." },
  ]),
  makePage(["money-management", "treasury"], "Treasury", "Manage stored value and money movement.", [], [
    { title: "Treasury", body: "Treasury is for teams that need tighter control over stored money." },
  ]),
  makePage(["developer-resources"], "Developer resources", "Reference material for implementation and testing.", docsSidebarGroups[6].items, [
    {
      title: "Reference first",
      body: "Use this section for references, examples, and test workflows.",
      bullets: [
        "Keep examples short and copyable.",
        "Document webhook payloads clearly.",
        "Keep test steps visible and predictable.",
      ],
    },
    {
      title: "Debug path",
      body: "When something fails, start with the API reference, then check the webhook and test pages.",
    },
  ]),
  makePage(["developer-resources", "api-reference"], "API reference", "Endpoint documentation and request examples.", [], [
    { title: "API reference", body: "Keep endpoint docs short, with one clear request and one clear response example." },
  ]),
  makePage(["developer-resources", "webhooks"], "Webhooks", "Use events to keep systems in sync.", [], [
    {
      title: "Webhook setup",
      body: "Listen for events, verify signatures, and keep delivery handlers idempotent.",
      code: codeExample([
        "if (event.type === 'payment.succeeded') {",
        "  // update your system",
        "}",
      ]),
    },
  ]),
  makePage(["developer-resources", "testing"], "Testing", "Local, sandbox, and verification workflows.", [], [
    { title: "Testing", body: "Make test steps predictable so the team can debug without guessing." },
  ]),
  makePage(["apis-and-sdks"], "APIs & SDKs", "Use the right client library and API patterns.", docsSidebarGroups[7].items, [
    {
      title: "Choose the right tool",
      body: "Choose the SDK that fits your stack and keep auth consistent.",
      bullets: [
        "Server-side APIs keep secrets safe.",
        "SDKs speed up common integrations.",
        "Authentication should match your deployment model.",
      ],
    },
    {
      title: "Integration path",
      body: "Start with one SDK or one API path, then expand only after the first request works.",
    },
  ]),
  makePage(["apis-and-sdks", "sdks"], "SDKs", "Client libraries for common stacks.", [], [
    { title: "SDKs", body: "Use SDKs when you want a faster implementation path and a safer default setup." },
  ]),
  makePage(["apis-and-sdks", "authentication"], "Authentication", "Secure API access patterns.", [], [
    { title: "Auth", body: "Keep secrets server-side and rotate keys with a clear process." },
  ]),
  makePage(["apis-and-sdks", "error-handling"], "Error handling", "Predictable patterns for retries and failures.", [], [
    { title: "Errors", body: "Surface actionable errors and keep retry logic simple." },
  ]),
  makePage(["help"], "Help", "Find support, service status, and contact options.", docsSidebarGroups[8].items, [
    {
      title: "Help center",
      body: "This section keeps support and status easy to find.",
      bullets: [
        "Check status before opening a ticket.",
        "Use support for account or billing issues.",
        "Use contact when you need a direct response.",
      ],
    },
    {
      title: "Fastest path",
      body: "If you are stuck, start with status, then support, then contact.",
    },
  ]),
  makePage(["help", "support"], "Support", "Get help from the support team.", [], [
    { title: "Support", body: "Use support when you need help with account, integration, or product questions." },
  ]),
  makePage(["help", "status"], "Status", "Check platform health and incidents.", [], [
    { title: "Status", body: "Keep status visible so teams can check incidents without leaving docs." },
  ]),
  makePage(["help", "contact"], "Contact", "Reach out to the team directly.", [], [
    { title: "Contact", body: "Use the contact page when you need a direct conversation." },
  ]),
];

export const docsPageMap = new Map(
  docsPages.map((page) => [page.slug.join("/"), page])
);

export const docsFeaturedLinks = [
  docsTopCategories[0],
  docsTopCategories[2],
  docsTopCategories[3],
  docsTopCategories[7],
];

export const docsCategoryMap = new Map(
  docsTopCategories.map((item) => [item.href, item.title])
);
