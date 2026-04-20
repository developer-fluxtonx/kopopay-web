import { Transaction, Customer, Product, Balance, Payout } from "./types";

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

// Simple in-file mock data used when NEXT_PUBLIC_API_BASE is not set (development)
const mockTransactions: Transaction[] = [
  {
    id: "TXN-20260415001",
    amount: 1250.0,
    currency: "USD",
    status: "Succeeded",
    date: "Apr 15, 2026",
    description: "Cloud Hosting - Monthly Subscription (O-8912)",
    customer: { id: "cus_9821HY", name: "Sarah Johnson", email: "sarah@acme.com" },
  },
  {
    id: "TXN-20260415002",
    amount: -320.0,
    currency: "USD",
    status: "Processed",
    date: "Apr 15, 2026",
    description: "Refund",
    customer: { id: "cus_9822AB", name: "Michael Chen", email: "michael@startup.io" },
  },
];

const mockCustomers: Customer[] = [
  { id: "cus_9821HY", name: "Sarah Johnson", email: "sarah@acme.com" },
  { id: "cus_9822AB", name: "Michael Chen", email: "michael@startup.io" },
];

const mockProducts: Product[] = [
  { id: "PROD_001", name: "Premium Subscription", price: "$49.00/mo", type: "Recurring", status: "Active" },
  { id: "PROD_002", name: "Enterprise License", price: "$499.00/yr", type: "Recurring", status: "Active" },
];

const mockBalance: Balance = { currency: "USD", available: 42580, pending: 8940 };

const mockPayouts: Payout[] = [
  { id: "PAY_101", bank: "Chase Bank •••• 4242", amount: "$12,450.00", status: "In Transit", date: "Scheduled: Apr 22" },
  { id: "PAY_102", bank: "Morgan Stanley •••• 9812", amount: "$8,200.00", status: "Paid", date: "Sent: Apr 19" },
];

export const api = {
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

  // Generic helpers
  post: <T = any>(path: string, body: any) => (USE_MOCK ? Promise.resolve(({} as any) as T) : request<T>(path, { method: "POST", body: JSON.stringify(body) })),
  put: <T = any>(path: string, body: any) => (USE_MOCK ? Promise.resolve(({} as any) as T) : request<T>(path, { method: "PUT", body: JSON.stringify(body) })),
  del: <T = any>(path: string) => (USE_MOCK ? Promise.resolve(({} as any) as T) : request<T>(path, { method: "DELETE" })),
};

export default api;
