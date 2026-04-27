import { 
  Transaction, Customer, Product, Balance, Payout, 
  DashboardStats, ReportData, Dispute, RadarEvent, 
  RadarRule, ApiKey, Webhook, SettingsStats, WebhookPayload, UserProfile
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";
const USE_MOCK = API_BASE === "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  const txt = await res.text();
  return txt ? (JSON.parse(txt) as T) : (undefined as unknown as T);
}

// ─── CENTRALIZED MOCK DATA ───

const mockTransactions: Transaction[] = [
  {
    id: "TXN-20260415001",
    amount: 1250.0,
    currency: "USD",
    status: "Succeeded",
    date: "Apr 15, 2026",
    description: "Cloud Hosting - Monthly Subscription (O-8912)",
    method: "Visa •••• 4242",
    customer: { id: "cus_9821HY", name: "Sarah Johnson", email: "sarah@acme.com" },
  },
  {
    id: "TXN-20260415002",
    amount: -320.0,
    currency: "USD",
    status: "Processed",
    date: "Apr 15, 2026",
    description: "Refund",
    method: "Visa •••• 4242",
    customer: { id: "cus_9822AB", name: "Michael Chen", email: "michael@startup.io" },
  },
];

const mockCustomers: Customer[] = [
  { id: "cus_9821HY", name: "Sarah Johnson", email: "sarah@acme.com" },
  { id: "cus_9822AB", name: "Michael Chen", email: "michael@startup.io" },
];

const mockProducts: Product[] = [
  { id: "PROD_001", name: "Premium Subscription", price: "$49.00/mo", type: "Recurring", status: "Active", stock: "Unlimited", sales: "1,240" },
  { id: "PROD_002", name: "Enterprise License", price: "$499.00/yr", type: "Recurring", status: "Active", stock: "Unlimited", sales: "850" },
];

const mockBalance: Balance = { currency: "USD", available: 42580, pending: 8940 };

const mockPayouts: Payout[] = [
  { id: "PAY_101", bank: "Chase Bank •••• 4242", amount: "$12,450.00", status: "In Transit", date: "Scheduled: Apr 22" },
  { id: "PAY_102", bank: "Morgan Stanley •••• 9812", amount: "$8,200.00", status: "Paid", date: "Sent: Apr 19" },
];

const mockDashboardStats: DashboardStats = {
  revenue: 142580,
  availableBalance: 42850,
  pendingBalance: 12400,
  transactions: 3847,
  customers: 1293,
  processingTime: 1.2,
  revenueChange: "+12.5%",
  transactionsChange: "+8.2%",
  customersChange: "+3.1%",
  processingTimeChange: "-0.3s",
  revenueData: [
    { name: "Jan", revenue: 12400 },
    { name: "Feb", revenue: 18200 },
    { name: "Mar", revenue: 15800 },
    { name: "Apr", revenue: 23100 },
    { name: "May", revenue: 27600 },
    { name: "Jun", revenue: 32000 },
    { name: "Jul", revenue: 29500 },
  ],
  transactionData: [
    { name: "Mon", count: 120 },
    { name: "Tue", count: 190 },
    { name: "Wed", count: 150 },
    { name: "Thu", count: 210 },
    { name: "Fri", count: 260 },
    { name: "Sat", count: 180 },
    { name: "Sun", count: 95 },
  ],
  recentTransactions: [
    { id: "TXN001", name: "Sarah Johnson", type: "Payment", amount: "+$1,250.00", status: "Succeeded", time: "2 min ago" },
    { id: "TXN002", name: "Michael Chen", type: "Refund", amount: "-$320.00", status: "Processed", time: "15 min ago" },
    { id: "TXN003", name: "Priya Sharma", type: "Payment", amount: "+$4,800.00", status: "Succeeded", time: "1 hr ago" },
    { id: "TXN004", name: "James Wilson", type: "Payout", amount: "-$12,000.00", status: "Pending", time: "2 hr ago" },
    { id: "TXN005", name: "Elena Rodriguez", type: "Payment", amount: "+$890.00", status: "Succeeded", time: "3 hr ago" },
  ]
};

const mockReports: ReportData = {
  netRevenue: "$452,800.00",
  totalFees: "$18,420.00",
  refunds: "$2,100.00",
  revenueChange: "+12.5%",
  feesChange: "+8.2%",
  refundsChange: "-15.3%",
  revenueUp: true,
  feesUp: true,
  refundsUp: false,
  chartData: [
    { name: "Mon", net: 12000, gross: 12500, fees: 500 },
    { name: "Tue", net: 19000, gross: 19800, fees: 800 },
    { name: "Wed", net: 15000, gross: 15600, fees: 600 },
    { name: "Thu", net: 21000, gross: 21900, fees: 900 },
    { name: "Fri", net: 26000, gross: 27100, fees: 1100 },
    { name: "Sat", net: 18000, gross: 18700, fees: 700 },
    { name: "Sun", net: 9500, gross: 9900, fees: 400 },
  ],
  pieData: [
    { name: "Card Payments", value: 65, color: "#2ACED1" },
    { name: "Bank Transfers", value: 20, color: "#008E96" },
    { name: "Digital Wallets", value: 15, color: "#034E78" },
  ]
};

const mockDisputes: Dispute[] = [
  { id: "dp_01HV7Y", amount: "$1,250.00", reason: "Product not received", status: "Needs response", customer: "Sarah Johnson", deadline: "Apr 25, 2026", evidence: "0%" },
  { id: "dp_01HV6T", amount: "$320.00", reason: "Fraudulent", status: "Under review", customer: "Michael Chen", deadline: "Pending Review", evidence: "100%" },
  { id: "dp_01HV5X", amount: "$4,800.00", reason: "Unrecognized", status: "Won", customer: "Priya Sharma", deadline: "Closed", evidence: "100%" },
];

const mockRadarEvents: RadarEvent[] = [
  { id: "TXN-8821", customer: "Unknown", email: "temp4829@mail.ru", amount: "$4,200", risk: 92, reason: "IP velocity + new card", action: "Blocked", date: "2m ago" },
  { id: "TXN-8819", customer: "John Smith", email: "j.smith@gmail.com", amount: "$890", risk: 45, reason: "New device detected", action: "Review", date: "15m ago" },
];

const mockRadarRules: RadarRule[] = [
  { name: "Block high-risk countries", status: "Active", triggers: 23, description: "Block if IP country is on the critical risk list." },
  { name: "Require 3DS for > $500", status: "Active", triggers: 156, description: "Enforce 3D Secure for large transactions." },
];

const mockApiKeys: ApiKey[] = [
  { id: "KEY_001", name: "Default Live Key", type: "Publishable", value: "pk_live_51Hg8rKJKG...xR9dT", env: "Live", lastUsed: "2m ago" },
  { id: "KEY_002", name: "Production Secret", type: "Secret", value: "sk_live_51Hg8rKJKG...yB7pZ", env: "Live", lastUsed: "5m ago" },
];

const mockWebhooks: Webhook[] = [
  { url: "https://api.myapp.com/webhooks/kopo", events: "payment.succeeded, invoice.paid", status: "Active" },
];

const mockSettingsStats: SettingsStats = {
  groups: "3",
  pages: "18",
  apiReady: "100%",
  legacyRedirects: "6"
};

// Additional mock data for profile, audits, and extended radar logs
const mockUserProfile = {
  id: "user_001",
  name: "John Doe",
  email: "john@example.com",
  company: "Acme, Inc.",
  locale: "en-US",
  createdAt: "2024-01-01T00:00:00Z",
  metadata: {},
};

const mockApiKeyAudits: ApiKey[] = [
  { id: "AUD_001", name: "Key Created", type: "Audit", value: "", env: "Live", lastUsed: "2d ago" } as any,
];


// ─── API OBJECT ───

export const api = {
  // Stats & Overviews
  getDashboardStats: () => (USE_MOCK ? Promise.resolve(mockDashboardStats) : request<DashboardStats>(`/api/stats/dashboard`)),
  getReports: () => (USE_MOCK ? Promise.resolve(mockReports) : request<ReportData>(`/api/reports`)),
  getSettingsStats: () => (USE_MOCK ? Promise.resolve(mockSettingsStats) : request<SettingsStats>(`/api/stats/settings`)),

  // Transactions
  getTransactions: (query?: Record<string, string | number>) => {
    if (USE_MOCK) return Promise.resolve(mockTransactions.slice());
    const q = query ? "?" + new URLSearchParams(Object.entries(query).map(([k, v]) => [k, String(v)])) : "";
    return request<Transaction[]>(`/api/transactions${q}`);
  },
  getTransaction: (id: string) => {
    if (USE_MOCK) return Promise.resolve(mockTransactions.find((t) => t.id === id) ?? (mockTransactions[0] as Transaction));
    return request<Transaction>(`/api/transactions/${id}`);
  },

  // Customers
  getCustomers: () => (USE_MOCK ? Promise.resolve(mockCustomers.slice()) : request<Customer[]>(`/api/customers`)),
  getCustomer: (id: string) => (USE_MOCK ? Promise.resolve(mockCustomers.find((c) => c.id === id) ?? mockCustomers[0]) : request<Customer>(`/api/customers/${id}`)),

  // Products
  getProducts: () => (USE_MOCK ? Promise.resolve(mockProducts.slice()) : request<Product[]>(`/api/products`)),

  // Balances & payouts
  getBalance: () => (USE_MOCK ? Promise.resolve(mockBalance) : request<Balance>(`/api/balance`)),
  getPayouts: () => (USE_MOCK ? Promise.resolve(mockPayouts.slice()) : request<Payout[]>(`/api/payouts`)),

  // Disputes
  getDisputes: () => (USE_MOCK ? Promise.resolve(mockDisputes.slice()) : request<Dispute[]>(`/api/disputes`)),

  // Radar (Fraud)
  getRadarEvents: () => (USE_MOCK ? Promise.resolve(mockRadarEvents.slice()) : request<RadarEvent[]>(`/api/radar/events`)),
  getRadarRules: () => (USE_MOCK ? Promise.resolve(mockRadarRules.slice()) : request<RadarRule[]>(`/api/radar/rules`)),

  // Developer Utils
  getApiKeys: () => (USE_MOCK ? Promise.resolve(mockApiKeys.slice()) : request<ApiKey[]>(`/api/developer/keys`)),
  getWebhooks: () => (USE_MOCK ? Promise.resolve(mockWebhooks.slice()) : request<Webhook[]>(`/api/developer/webhooks`)),

  // API Key management
  createApiKey: (payload: Partial<ApiKey>) => {
    if (USE_MOCK) {
      const newKey: ApiKey = {
        id: `KEY_${Date.now()}`,
        name: payload.name || "New Key",
        type: payload.type || "Secret",
        value: `sk_${Math.random().toString(36).slice(2, 12)}`,
        env: payload.env || "Test",
        lastUsed: "Never",
      };
      mockApiKeys.unshift(newKey);
      return Promise.resolve(newKey);
    }
    return request<ApiKey>(`/api/developer/keys`, { method: "POST", body: JSON.stringify(payload) });
  },

  rotateApiKey: (id: string) => {
    if (USE_MOCK) {
      const idx = mockApiKeys.findIndex((k) => k.id === id);
      if (idx >= 0) {
        mockApiKeys[idx].value = `sk_rot_${Math.random().toString(36).slice(2, 12)}`;
        return Promise.resolve(mockApiKeys[idx]);
      }
      return Promise.reject(new Error("Key not found"));
    }
    return request<ApiKey>(`/api/developer/keys/${id}/rotate`, { method: "PUT" });
  },

  deleteApiKey: (id: string) => {
    if (USE_MOCK) {
      const idx = mockApiKeys.findIndex((k) => k.id === id);
      if (idx >= 0) mockApiKeys.splice(idx, 1);
      return Promise.resolve({ success: true } as any);
    }
    return request(`/api/developer/keys/${id}`, { method: "DELETE" });
  },

  // Webhook management
  createWebhook: (payload: WebhookPayload) => {
    if (USE_MOCK) {
      const wh: Webhook = { url: payload.url, events: Array.isArray(payload.events) ? payload.events.join(", ") : String(payload.events), status: payload.status || "Active" };
      mockWebhooks.push(wh);
      return Promise.resolve(wh);
    }
    return request<Webhook>(`/api/developer/webhooks`, { method: "POST", body: JSON.stringify(payload) });
  },

  updateWebhook: (id: string, payload: Partial<WebhookPayload>) => {
    if (USE_MOCK) {
      const idx = mockWebhooks.findIndex((w) => w.url.includes(id) || w.url === payload.url);
      if (idx >= 0) {
        mockWebhooks[idx] = { ...mockWebhooks[idx], ...payload, events: Array.isArray(payload.events) ? payload.events.join(", ") : (payload.events as any) } as Webhook;
        return Promise.resolve(mockWebhooks[idx]);
      }
      return Promise.reject(new Error("Webhook not found"));
    }
    return request<Webhook>(`/api/developer/webhooks/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  },

  deleteWebhook: (id: string) => {
    if (USE_MOCK) {
      const idx = mockWebhooks.findIndex((w) => w.url.includes(id));
      if (idx >= 0) mockWebhooks.splice(idx, 1);
      return Promise.resolve({ success: true } as any);
    }
    return request(`/api/developer/webhooks/${id}`, { method: "DELETE" });
  },

  // Profile
  getUserProfile: () => (USE_MOCK ? Promise.resolve(mockUserProfile) : request<UserProfile>(`/api/profile`)),
  updateUserProfile: (payload: Partial<UserProfile>) => {
    if (USE_MOCK) {
      Object.assign(mockUserProfile, payload);
      return Promise.resolve(mockUserProfile);
    }
    return request(`/api/profile`, { method: "PUT", body: JSON.stringify(payload) });
  },

  // Radar & audits
  getRadarLogs: () => (USE_MOCK ? Promise.resolve(mockRadarEvents.slice()) : request<RadarEvent[]>(`/api/radar/logs`)),
  getApiKeyAudits: () => (USE_MOCK ? Promise.resolve(mockApiKeyAudits.slice()) : request<any[]>(`/api/developer/keys/audit`)),

  // Generic helpers
  post: <T = any>(path: string, body: any) => (USE_MOCK ? Promise.resolve(({} as any) as T) : request<T>(path, { method: "POST", body: JSON.stringify(body) })),
  put: <T = any>(path: string, body: any) => (USE_MOCK ? Promise.resolve(({} as any) as T) : request<T>(path, { method: "PUT", body: JSON.stringify(body) })),
  del: <T = any>(path: string) => (USE_MOCK ? Promise.resolve(({} as any) as T) : request<T>(path, { method: "DELETE" })),
};

export default api;
