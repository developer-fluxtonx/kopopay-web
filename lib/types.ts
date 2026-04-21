// Lightweight API types for frontend -> backend contracts

export interface Customer {
  id: string;
  name: string;
  email?: string;
  createdAt?: string;
  // UI helpers
  payments?: number;
  volume?: number;
  joined?: string;
  status?: string;
}

export interface PaymentMethod {
  brand?: string;
  last4?: string;
  type?: string;
  issuer?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  description?: string;
  customer?: Customer | null;
  payment_method?: PaymentMethod | null;
  fraud_details?: Record<string, any>;
}

export interface Product {
  id: string;
  name: string;
  price?: number | string;
  type?: string;
  status?: string;
}

export interface Balance {
  currency: string;
  available: number;
  pending?: number;
}

export interface Payout {
  id: string;
  bank: string;
  amount: string;
  status: string;
  date?: string;
}

export interface DashboardStats {
  revenue: number;
  transactions: number;
  customers: number;
  processingTime: number;
  revenueChange: string;
  transactionsChange: string;
  customersChange: string;
  processingTimeChange: string;
  revenueData: { name: string; revenue: number }[];
  transactionData: { name: string; count: number }[];
  recentTransactions: { id: string; name: string; type: string; amount: string; status: string; time: string }[];
}

export interface ReportData {
  netRevenue: string;
  totalFees: string;
  refunds: string;
  revenueChange: string;
  feesChange: string;
  refundsChange: string;
  revenueUp: boolean;
  feesUp: boolean;
  refundsUp: boolean;
  chartData: { name: string; net: number; gross: number; fees: number }[];
  pieData: { name: string; value: number; color: string }[];
}

export interface Dispute {
  id: string;
  amount: string;
  reason: string;
  status: string;
  customer: string;
  deadline: string;
  evidence: string;
}

export interface RadarEvent {
  id: string;
  customer: string;
  email: string;
  amount: string;
  risk: number;
  reason: string;
  action: string;
  date: string;
}

export interface RadarRule {
  name: string;
  status: string;
  triggers: number;
  description: string;
}

export interface ApiKey {
  id: string;
  name: string;
  type: string;
  value: string;
  env: string;
  lastUsed: string;
}

export interface Webhook {
  url: string;
  events: string;
  status: string;
}

export interface SettingsStats {
  groups: string;
  pages: string;
  apiReady: string;
  legacyRedirects: string;
}

export interface ApiError {
  message?: string;
  code?: string;
}

// Extended types for richer pages and management actions
export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  company?: string;
  locale?: string;
  createdAt?: string;
  metadata?: Record<string, any>;
}

export interface RadarLog {
  id: string;
  eventId?: string;
  type: string;
  details?: Record<string, any>;
  riskScore?: number;
  createdAt?: string;
}

export interface ApiKeyAudit {
  id: string;
  action: string;
  by: string;
  time: string;
  details?: string;
}

export interface WebhookPayload {
  id?: string;
  url: string;
  events: string | string[];
  status?: string;
}
