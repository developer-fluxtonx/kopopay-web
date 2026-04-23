"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Search, ChevronRight, Copy, Check, Lock, Zap, Globe, CreditCard, Users, ArrowUpRight, RefreshCcw, Receipt, FileText, Layers, Shield } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Endpoint {
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  path: string;
  description: string;
  params?: { name: string; type: string; required: boolean; desc: string }[];
  returns: string;
  example: { request: string; response: string };
}

interface ApiSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  baseObject: string;
  endpoints: Endpoint[];
}

interface ApiGroup {
  label: string;
  items: ApiSection[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const apiGroups: ApiGroup[] = [
  {
    label: "Core Payments",
    items: [
      {
        id: "authentication",
        label: "Authentication",
        icon: <Lock className="w-4 h-4" />,
        description: "Authenticate API requests using your secret API key.",
        baseObject: "",
        endpoints: [
          {
            method: "POST",
            path: "/v1/auth/token",
            description: "Generate a short-lived bearer token.",
            params: [{ name: "api_key", type: "string", required: true, desc: "Secret API key." }],
            returns: "Bearer token object.",
            example: {
              request: `curl https://api.kopopay.com/v1/auth/token -d api_key="sk_live_..."`,
              response: `{ "token": "tok_live_...", "expires_in": 3600 }`,
            },
          },
        ],
      },
      {
        id: "payments",
        label: "Payments",
        icon: <Zap className="w-4 h-4" />,
        description: "Manage one-time payments from customers.",
        baseObject: "payment",
        endpoints: [
          {
            method: "POST",
            path: "/v1/payments",
            description: "Create a payment.",
            params: [
              { name: "amount", type: "integer", required: true, desc: "Smallest currency unit." },
              { name: "currency", type: "string", required: true, desc: "ISO code." },
              { name: "source", type: "string", required: true, desc: "Token/ID." },
            ],
            returns: "Payment object.",
            example: {
              request: `curl https://api.kopopay.com/v1/payments -d amount=2000 -d currency="usd"`,
              response: `{ "id": "pay_123", "amount": 2000, "status": "succeeded" }`,
            },
          },
        ],
      },
      {
        id: "refunds",
        label: "Refunds",
        icon: <RefreshCcw className="w-4 h-4" />,
        description: "Refund payments to customers.",
        baseObject: "refund",
        endpoints: [
          {
            method: "POST",
            path: "/v1/refunds",
            description: "Create a refund.",
            params: [
              { name: "payment", type: "string", required: true, desc: "Payment ID." },
              { name: "amount", type: "integer", required: false, desc: "Amount." },
            ],
            returns: "Refund object.",
            example: {
              request: `curl https://api.kopopay.com/v1/refunds -d payment="pay_123"`,
              response: `{ "id": "re_123", "amount": 2000, "status": "succeeded" }`,
            },
          },
        ],
      },
      {
        id: "payment-methods",
        label: "Payment Methods",
        icon: <CreditCard className="w-4 h-4" />,
        description: "Manage stored payment instruments.",
        baseObject: "payment_method",
        endpoints: [
          {
            method: "POST",
            path: "/v1/payment_methods",
            description: "Create a payment method.",
            params: [{ name: "type", type: "string", required: true, desc: "'card', etc." }],
            returns: "PaymentMethod object.",
            example: {
              request: `curl https://api.kopopay.com/v1/payment_methods -d type="card"`,
              response: `{ "id": "pm_123", "type": "card" }`,
            },
          },
        ],
      },
    ],
  },
  {
    label: "Billing & Revenue",
    items: [
      {
        id: "products",
        label: "Products & Prices",
        icon: <Layers className="w-4 h-4" />,
        description: "Products describe what you sell, and Prices define how much and how often to charge.",
        baseObject: "product",
        endpoints: [
          {
            method: "POST",
            path: "/v1/products",
            description: "Create a product.",
            params: [{ name: "name", type: "string", required: true, desc: "Product name." }],
            returns: "Product object.",
            example: {
              request: `curl https://api.kopopay.com/v1/products -d name="Gold Plan"`,
              response: `{ "id": "prod_123", "name": "Gold Plan" }`,
            },
          },
          {
            method: "POST",
            path: "/v1/prices",
            description: "Create a price for a product.",
            params: [
              { name: "product", type: "string", required: true, desc: "Product ID." },
              { name: "unit_amount", type: "integer", required: true, desc: "Amount in cents." },
              { name: "currency", type: "string", required: true, desc: "ISO code." },
            ],
            returns: "Price object.",
            example: {
              request: `curl https://api.kopopay.com/v1/prices -d product="prod_123" -d unit_amount=1000 -d currency="usd"`,
              response: `{ "id": "price_123", "unit_amount": 1000 }`,
            },
          },
        ],
      },
      {
        id: "subscriptions",
        label: "Subscriptions",
        icon: <RefreshCcw className="w-4 h-4" />,
        description: "Manage recurring billing subscriptions.",
        baseObject: "subscription",
        endpoints: [
          {
            method: "POST",
            path: "/v1/subscriptions",
            description: "Create a subscription.",
            params: [
              { name: "customer", type: "string", required: true, desc: "Customer ID." },
              { name: "items", type: "array", required: true, desc: "Price IDs." },
            ],
            returns: "Subscription object.",
            example: {
              request: `curl https://api.kopopay.com/v1/subscriptions -d customer="cus_123"`,
              response: `{ "id": "sub_123", "status": "active" }`,
            },
          },
        ],
      },
      {
        id: "invoices",
        label: "Invoices",
        icon: <Receipt className="w-4 h-4" />,
        description: "Manage billing statements.",
        baseObject: "invoice",
        endpoints: [
          {
            method: "GET",
            path: "/v1/invoices/:id",
            description: "Retrieve an invoice.",
            params: [{ name: "id", type: "string", required: true, desc: "Invoice ID." }],
            returns: "Invoice object.",
            example: {
              request: `curl https://api.kopopay.com/v1/invoices/in_123`,
              response: `{ "id": "in_123", "amount_due": 2000 }`,
            },
          },
        ],
      },
    ],
  },
  {
    label: "Security & Fraud",
    items: [
      {
        id: "disputes",
        label: "Disputes",
        icon: <Shield className="w-4 h-4" />,
        description: "Manage chargebacks and challenged payments.",
        baseObject: "dispute",
        endpoints: [
          {
            method: "GET",
            path: "/v1/disputes",
            description: "List disputes.",
            params: [],
            returns: "List of disputes.",
            example: {
              request: `curl https://api.kopopay.com/v1/disputes`,
              response: `{ "object": "list", "data": [] }`,
            },
          },
        ],
      },
      {
        id: "radar",
        label: "Radar",
        icon: <Shield className="w-4 h-4" />,
        description: "Radar provides real-time fraud detection and prevention using machine learning.",
        baseObject: "radar_rule",
        endpoints: [
          {
            method: "POST",
            path: "/v1/radar/rules",
            description: "Create a new Radar rule.",
            params: [{ name: "action", type: "string", required: true, desc: "'block', 'review', or 'allow'" }],
            returns: "RadarRule object.",
            example: {
              request: `curl https://api.kopopay.com/v1/radar/rules -d action="block" -d query=":amount_in_usd: > 1000"`,
              response: `{ "id": "rdr_123", "action": "block" }`,
            },
          },
        ],
      },
      {
        id: "3d-secure",
        label: "3D Secure",
        icon: <Lock className="w-4 h-4" />,
        description: "3D Secure adds an extra layer of protection for card-not-present transactions.",
        baseObject: "three_d_secure",
        endpoints: [
          {
            method: "POST",
            path: "/v1/3d_secure",
            description: "Initiate 3D Secure authentication.",
            params: [{ name: "amount", type: "integer", required: true, desc: "Amount." }],
            returns: "3D Secure object.",
            example: {
              request: `curl https://api.kopopay.com/v1/3d_secure -d amount=2000 -d card="tok_123"`,
              response: `{ "id": "tds_123", "status": "redirect", "url": "https://..." }`,
            },
          },
        ],
      },
      {
        id: "identity",
        label: "Identity",
        icon: <Users className="w-4 h-4" />,
        description: "Verify the identity of your users to prevent fraud and comply with regulations.",
        baseObject: "verification_session",
        endpoints: [
          {
            method: "POST",
            path: "/v1/identity/verification_sessions",
            description: "Start a verification session.",
            params: [{ name: "type", type: "string", required: true, desc: "'document' or 'id_number'" }],
            returns: "VerificationSession object.",
            example: {
              request: `curl https://api.kopopay.com/v1/identity/verification_sessions -d type="document"`,
              response: `{ "id": "vs_123", "status": "requires_input" }`,
            },
          },
        ],
      },
    ],
  },
  {
    label: "Money Movement",
    items: [
      {
        id: "balances",
        label: "Balances",
        icon: <FileText className="w-4 h-4" />,
        description: "View account balance and transaction history.",
        baseObject: "balance",
        endpoints: [
          {
            method: "GET",
            path: "/v1/balance",
            description: "Retrieve current balance.",
            params: [],
            returns: "Balance object.",
            example: {
              request: `curl https://api.kopopay.com/v1/balance`,
              response: `{ "object": "balance", "available": [{ "amount": 5000, "currency": "usd" }] }`,
            },
          },
        ],
      },
      {
        id: "payouts",
        label: "Payouts",
        icon: <ArrowUpRight className="w-4 h-4" />,
        description: "Send funds from your balance to bank accounts.",
        baseObject: "payout",
        endpoints: [
          {
            method: "POST",
            path: "/v1/payouts",
            description: "Create a payout.",
            params: [
              { name: "amount", type: "integer", required: true, desc: "Amount." },
              { name: "currency", type: "string", required: true, desc: "ISO code." },
            ],
            returns: "Payout object.",
            example: {
              request: `curl https://api.kopopay.com/v1/payouts -d amount=1000 -d currency="usd"`,
              response: `{ "id": "po_123", "amount": 1000, "status": "pending" }`,
            },
          },
        ],
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        id: "customers",
        label: "Customers",
        icon: <Users className="w-4 h-4" />,
        description: "Manage customer profiles for recurring billing.",
        baseObject: "customer",
        endpoints: [
          {
            method: "POST",
            path: "/v1/customers",
            description: "Create a customer.",
            params: [{ name: "email", type: "string", required: false, desc: "Email." }],
            returns: "Customer object.",
            example: {
              request: `curl https://api.kopopay.com/v1/customers -d email="user@example.com"`,
              response: `{ "id": "cus_123", "email": "user@example.com" }`,
            },
          },
        ],
      },
      {
        id: "files",
        label: "Files",
        icon: <FileText className="w-4 h-4" />,
        description: "Manage files for disputes, identity verification, and more.",
        baseObject: "file",
        endpoints: [
          {
            method: "POST",
            path: "/v1/files",
            description: "Upload a file.",
            params: [{ name: "purpose", type: "string", required: true, desc: "e.g., 'dispute_evidence'" }],
            returns: "File object.",
            example: {
              request: `curl https://api.kopopay.com/v1/files -F purpose="dispute_evidence" -F file="@receipt.png"`,
              response: `{ "id": "file_123", "purpose": "dispute_evidence" }`,
            },
          },
        ],
      },
      {
        id: "webhooks",
        label: "Webhooks",
        icon: <Globe className="w-4 h-4" />,
        description: "Webhooks allow you to receive real-time notifications when events happen in your Kopo Pay account.",
        baseObject: "webhook_endpoint",
        endpoints: [
          {
            method: "POST",
            path: "/v1/webhook_endpoints",
            description: "Create a webhook endpoint.",
            params: [
              { name: "url", type: "string", required: true, desc: "The URL where Kopo Pay will send events." },
              { name: "enabled_events", type: "array", required: true, desc: "List of events to enable (e.g., ['*'] for all)." },
              { name: "description", type: "string", required: false, desc: "An optional description for the endpoint." },
            ],
            returns: "WebhookEndpoint object.",
            example: {
              request: `curl https://api.kopopay.com/v1/webhook_endpoints \n  -d url="https://example.com/webhooks" \n  -d enabled_events[]="payment.succeeded"`,
              response: `{ "id": "we_123", "secret": "whsec_...", "status": "enabled" }`,
            },
          },
          {
            method: "GET",
            path: "/v1/webhook_endpoints",
            description: "List all webhook endpoints.",
            params: [{ name: "limit", type: "integer", required: false, desc: "Max number of items to return." }],
            returns: "List of WebhookEndpoint objects.",
            example: {
              request: `curl https://api.kopopay.com/v1/webhook_endpoints`,
              response: `{ "object": "list", "data": [{ "id": "we_123", "url": "..." }] }`,
            },
          },
          {
            method: "DELETE",
            path: "/v1/webhook_endpoints/:id",
            description: "Delete a webhook endpoint.",
            params: [{ name: "id", type: "string", required: true, desc: "The ID of the endpoint to delete." }],
            returns: "Deleted object confirmation.",
            example: {
              request: `curl -X DELETE https://api.kopopay.com/v1/webhook_endpoints/we_123`,
              response: `{ "id": "we_123", "deleted": true }`,
            },
          },
          {
            method: "GET",
            path: "/v1/events",
            description: "List of all event types you can listen for.",
            params: [],
            returns: "Events Reference Guide.",
            example: {
              request: `// Core Payment Events:
// - payment.succeeded: Payment was successful
// - payment.failed: Payment attempt failed
// - payment.captured: Payment was captured
//
// Subscription Events:
// - subscription.created: New subscription started
// - subscription.deleted: Subscription canceled
//
// Security Events:
// - dispute.created: New chargeback opened
// - radar.early_fraud_warning: Fraud detected`,
              response: `{ "info": "Use these event types in enabled_events parameter." }`,
            },
          },
        ],
      },
    ],
  },
];

const allSections = apiGroups.flatMap(g => g.items);

// ─── Sub-components ───────────────────────────────────────────────────────────

const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  POST: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  DELETE: "bg-red-500/15 text-red-400 border-red-500/30",
  PUT: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  PATCH: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition"
      title="Copy"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function EndpointCard({ ep }: { ep: Endpoint }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-4 bg-white/5 hover:bg-white/10 transition text-left"
      >
        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border font-mono ${methodColors[ep.method]}`}>
          {ep.method}
        </span>
        <code className="text-sm font-mono text-white/80 flex-1">{ep.path}</code>
        <span className="text-xs text-white/40 hidden md:block">{ep.description}</span>
        <ChevronRight className={`w-4 h-4 text-white/40 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>

      {open && (
        <div className="px-6 pb-6 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#030E1E]">
          <div>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">{ep.description}</p>
            {ep.params && ep.params.length > 0 && (
              <>
                <h5 className="text-xs uppercase tracking-widest text-white/30 font-bold mb-3">Parameters</h5>
                <div className="space-y-3">
                  {ep.params.map((p) => (
                    <div key={p.name} className="flex flex-col gap-1 border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <code className="text-sm font-mono text-[#2ACED1]">{p.name}</code>
                        <span className="text-xs text-white/30 font-mono">{p.type}</span>
                        {p.required && (
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30">
                            required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            <p className="text-xs text-white/40 mt-6 italic">{ep.returns}</p>
          </div>
          <div className="space-y-4">
            <div>
              <h5 className="text-xs uppercase tracking-widest text-white/30 font-bold mb-2">Request</h5>
              <div className="relative rounded-xl bg-[#011B3B] border border-white/10 p-4 overflow-x-auto">
                <CopyButton code={ep.example.request} />
                <pre className="text-xs font-mono text-white/80 whitespace-pre-wrap leading-relaxed pr-6">{ep.example.request}</pre>
              </div>
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-widest text-white/30 font-bold mb-2">Response</h5>
              <div className="relative rounded-xl bg-[#011B3B] border border-white/10 p-4 overflow-x-auto">
                <CopyButton code={ep.example.response} />
                <pre className="text-xs font-mono text-[#2ACED1]/80 whitespace-pre-wrap leading-relaxed pr-6">{ep.example.response}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApiReferenceDetail() {
  const router = useRouter();
  const params = useParams();
  const [search, setSearch] = useState("");
  
  const currentSlug = params?.slug as string || "authentication";
  const activeSection = allSections.find((s) => s.id === currentSlug) || allSections[0];

  const filteredGroups = search
    ? apiGroups.map(g => ({
        ...g,
        items: g.items.filter(s => 
          s.label.toLowerCase().includes(search.toLowerCase()) ||
          s.endpoints.some(ep => ep.path.toLowerCase().includes(search.toLowerCase()))
        )
      })).filter(g => g.items.length > 0)
    : apiGroups;

  const navigateTo = (id: string) => {
    router.push(`/sdk/api-reference/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#000C22]">
      {/* Top banner */}
      <div className="border-b border-white/5 bg-[#011B3B]/60 backdrop-blur-xl px-6 py-4 max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-widest">API Version: 2026-04-22</span>
              </div>
              <h1 className="text-3xl font-bold text-white">API Reference</h1>
              <p className="text-white/50 text-sm mt-1">Base URL: <code className="text-[#2ACED1]">https://api.kopopay.com</code></p>
            </div>
            <div className="flex gap-3 text-xs text-white/50 font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">Content-Type: application/json</div>
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">Auth: Bearer sk_live_...</div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-[1280px] mx-auto flex h-[calc(100vh-80px)] overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 border-r border-white/5 pt-8 pr-4 overflow-y-auto custom-scrollbar h-full">
          <div className="relative mb-6 px-2">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search APIs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 placeholder:text-white/25 text-sm focus:outline-none focus:ring-1 focus:ring-[#2ACED1]/40 transition"
            />
          </div>

          <nav className="space-y-8 flex-1 pb-12 px-2">
            {filteredGroups.map((g, gi) => (
              <div key={gi}>
                <h6 className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-4 px-3">
                  {g.label}
                </h6>
                <div className="space-y-1">
                  {g.items.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => navigateTo(s.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                        currentSlug === s.id
                          ? "bg-[#2ACED1]/15 text-[#2ACED1] border border-[#2ACED1]/20 shadow-[0_0_20px_rgba(42,206,209,0.1)]"
                          : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <span className={`${currentSlug === s.id ? "text-[#2ACED1]" : "text-white/20"}`}>
                        {s.icon}
                      </span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 lg:px-10 py-8 min-w-0 overflow-y-auto custom-scrollbar h-full">
          <ScrollReveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#2ACED1]/10 border border-[#2ACED1]/20 flex items-center justify-center text-[#2ACED1]">
                  {activeSection.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{activeSection.label}</h2>
                {activeSection.baseObject && (
                  <code className="text-xs font-mono px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white/40">
                    {activeSection.baseObject}
                  </code>
                )}
              </div>
              <p className="text-white/60 leading-relaxed max-w-2xl">{activeSection.description}</p>
            </div>

            <div className="space-y-4">
              {activeSection.endpoints.map((ep, i) => (
                <EndpointCard key={i} ep={ep} />
              ))}
            </div>
          </ScrollReveal>

          {/* Mobile section nav */}
          <div className="lg:hidden mt-20 space-y-8 pb-32">
            {apiGroups.map((g, gi) => (
              <div key={gi}>
                <h6 className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4">{g.label}</h6>
                <div className="grid grid-cols-2 gap-3">
                  {g.items.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => navigateTo(s.id)}
                      className={`flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-medium transition-all ${
                        currentSlug === s.id
                          ? "bg-[#2ACED1]/15 text-[#2ACED1] border border-[#2ACED1]/20"
                          : "text-white/50 border border-white/10 hover:text-white"
                      }`}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
