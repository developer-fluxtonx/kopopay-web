"use client";

import { Copy, Eye, EyeOff, Plus, Terminal, Webhook } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/Card";
import {
  SettingsPanel,
  SettingsToggleRow,
} from "@/components/templates/SettingsLayout";

const endpoints = [
  {
    url: "https://api.kopopay.com/webhooks/payments",
    events: "payment.succeeded, payment.failed",
    status: "Active",
  },
  {
    url: "https://api.kopopay.com/webhooks/disputes",
    events: "charge.disputed, evidence.updated",
    status: "Testing",
  },
];

export default function DevelopersSettingsPage() {
  const [showKeys, setShowKeys] = useState(false);
  const [copied, setCopied] = useState<"live" | "test" | null>(null);
  const [liveMode, setLiveMode] = useState(false);

  const copyKey = async (value: string, label: "live" | "test") => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1500);
  };

  const liveKey = "pk_live_kopo_51Hg8rK...xR9dT";
  const testKey = "pk_test_kopo_51Hg8rK...mN3qW";

  return (
    <div className="space-y-6">
      <SettingsPanel
        title="Developer workspace"
        description="Workbench, API keys, webhook endpoints, and integration tools live here."
        action={
          <Button type="button" variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            New endpoint
          </Button>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Mode", value: liveMode ? "Live" : "Test" },
            { label: "Keys", value: "2 visible" },
            { label: "Endpoints", value: "2 connected" },
            { label: "CLI", value: "Ready" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                {item.label}
              </p>
              <p className="mt-3 text-lg font-bold text-[#000C22] dark:text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </SettingsPanel>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SettingsPanel
          title="API keys"
          description="Rotate, reveal, and audit keys without leaving the settings area."
          action={
            <Button type="button" variant="action" onClick={() => setLiveMode((value) => !value)}>
              {liveMode ? "Switch to test" : "Switch to live"}
            </Button>
          }
        >
          <div className="space-y-3">
            {[
              { label: "Publishable key", value: liveMode ? liveKey : testKey, kind: "test" as const },
              { label: "Secret key", value: liveMode ? "sk_live_kopo_..." : "sk_test_kopo_...", kind: "live" as const },
            ].map((key) => (
              <div
                key={key.label}
                className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                    {key.label}
                  </p>
                  <p className="mt-2 font-mono text-sm text-[#000C22] dark:text-white">
                    {showKeys ? key.value : "••••••••••••••••••••••••"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowKeys((value) => !value)}
                  >
                    {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showKeys ? "Hide" : "Reveal"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => copyKey(key.value, key.kind)}
                  >
                    <Copy className="h-4 w-4" />
                    {copied === key.kind ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </SettingsPanel>

        <div className="space-y-6">
          <SettingsPanel
            title="Workbench"
            description="Use a compact command surface for integration checks."
          >
            <Card className="overflow-hidden border border-[#2ACED1]/15 bg-[#0D1117] text-white">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <Terminal className="h-4 w-4 text-[#2ACED1]" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                  cURL
                </span>
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-6 text-[#D8F4F7]">
{`curl https://api.kopopay.com/v1/payments \
  -H "Authorization: Bearer sk_test_..." \
  -d amount=2000 \
  -d currency=usd \
  -d description="Payment for order #1234"`}
              </pre>
            </Card>
          </SettingsPanel>

          <SettingsPanel
            title="Developer toggles"
            description="Turn integration features on or off per environment."
            action={
              <Button type="button" variant="outline" size="sm">
                Open developer dashboard
              </Button>
            }
          >
            <div className="space-y-3">
              <SettingsToggleRow
                title="Allow webhook retries"
                description="Retry failed webhook deliveries with a backoff schedule."
                checked
                onToggle={() => undefined}
              />
              <SettingsToggleRow
                title="Lock production keys"
                description="Require a second confirmation before changing live keys."
                checked
                onToggle={() => undefined}
              />
            </div>
          </SettingsPanel>
        </div>
      </div>

      <SettingsPanel
        title="Webhook endpoints"
        description="Keep your event subscriptions organized and easy to audit."
      >
        <div className="space-y-3">
          {endpoints.map((endpoint) => (
            <div
              key={endpoint.url}
              className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2ACED1]/10">
                  <Webhook className="h-5 w-5 text-[#2ACED1]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                    {endpoint.url}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                    {endpoint.events}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#2ACED1]/10 px-3 py-1 text-xs font-semibold text-[#008E96]">
                {endpoint.status}
              </span>
            </div>
          ))}
        </div>
      </SettingsPanel>
    </div>
  );
}
