// Lightweight API types for frontend -> backend contracts

export interface Customer {
  id: string;
  name: string;
  email?: string;
  createdAt?: string;
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

export interface ApiError {
  message?: string;
  code?: string;
}
