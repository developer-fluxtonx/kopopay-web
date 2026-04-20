"use client";

import { Mail, Sparkles } from "lucide-react";
import { getIcon } from "@/components/IconRegistry";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  SettingsField,
  SettingsPanel,
  settingsControlClass,
} from "@/components/templates/SettingsLayout";

export default function StripeProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsPanel
        title="Stripe profile"
        description="Manage how you show up to other businesses."
        action={
          <Button type="button" variant="outline" size="sm">
            <Sparkles className="h-4 w-4" />
            Preview profile
          </Button>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="rounded-[24px] border border-[#2ACED1]/15 bg-[linear-gradient(180deg,rgba(42,206,209,0.12),rgba(3,78,120,0.08))] p-5 dark:bg-[linear-gradient(180deg,rgba(42,206,209,0.12),rgba(1,27,59,0.94))]">
            <div className="flex items-center justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 text-lg font-black text-[#000C22] shadow-sm dark:bg-[#011B3B] dark:text-white">
                K
              </div>
              <span className="rounded-full bg-[#2ACED1]/10 px-3 py-1 text-xs font-semibold text-[#008E96]">
                Live
              </span>
            </div>
            <div className="mt-5 space-y-3">
              <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                Public identity
              </p>
              <div className="flex gap-2">
                {["#2ACED1", "#034E78", "#008E96"].map((color) => (
                  <span
                    key={color}
                    className="h-8 w-8 rounded-full border border-white/60 shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                The profile block is the public face of your account across
                partner experiences.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Display name" defaultValue="Kopo Pay" />
            <Input label="Public website" defaultValue="https://kopopay.com" />
            <SettingsField label="Public description" className="sm:col-span-2">
              <textarea
                className={`${settingsControlClass} min-h-[140px] resize-none`}
                defaultValue="Kopo Pay helps merchants move money with a clean, fast payments stack."
              />
            </SettingsField>
            <SettingsField label="Logo">
              <input className={settingsControlClass} defaultValue="kopopay-logo.svg" />
            </SettingsField>
            <SettingsField label="Brand color">
              <input className={`${settingsControlClass} h-12 p-2`} type="color" defaultValue="#2ACED1" />
            </SettingsField>
          </div>
        </div>
      </SettingsPanel>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SettingsPanel
          title="Profile details"
          description="Control the public fields that other businesses see first."
          action={
            <Button type="button" variant="action">
              Save profile
            </Button>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Company name" defaultValue="Kopo Pay" />
            <Input label="Industry" defaultValue="Fintech" />
            <Input label="Support email" defaultValue="hello@kopopay.com" type="email" />
            <Input label="Support phone" defaultValue="+1 (555) 123-4567" />
            <Input label="Country" defaultValue="United States" />
            <Input label="Website domain" defaultValue="kopopay.com" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <SettingsField label="Social link">
              <input className={settingsControlClass} defaultValue="https://x.com/kopopay" />
            </SettingsField>
            <SettingsField label="Partner profile URL">
              <input className={settingsControlClass} defaultValue="https://partners.kopopay.com" />
            </SettingsField>
          </div>
        </SettingsPanel>

        <SettingsPanel
          title="Public preview"
          description="A quick look at how the profile appears to partners."
        >
          <div className="overflow-hidden rounded-[24px] border border-[#2ACED1]/15 bg-[#0D1117] p-5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ACED1]/15">
                  <Mail className="h-5 w-5 text-[#2ACED1]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Kopo Pay</p>
                  <p className="text-xs text-white/55">Public business profile</p>
                </div>
              </div>
              <span className="rounded-full bg-[#2ACED1]/15 px-3 py-1 text-xs font-semibold text-[#2ACED1]">
                Preview
              </span>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold">Fast, product-led payments</p>
              <p className="mt-1 text-xs leading-5 text-white/65">
                Public profile, email templates, and invoice branding all stay
                aligned.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2ACED1]" />
                <span className="text-xs font-semibold text-white/70">
                  Custom colors and typography are ready for API wiring.
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { icon: "ImageIcon", label: "Brand assets" },
                { icon: "Palette", label: "Color system" },
                { icon: "Globe", label: "Public URL" },
                { icon: "Link2", label: "Partner links" },
              ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/5 dark:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = getIcon(item.icon as string);
                    return <Icon className="h-4 w-4 text-[#2ACED1]" />;
                  })()}
                  <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SettingsPanel>
      </div>
    </div>
  );
}
