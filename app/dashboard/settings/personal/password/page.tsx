"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import {
  SettingsField,
  SettingsPanel,
  SettingsToggleRow,
  settingsControlClass,
} from "@/components/templates/SettingsLayout";
import {
  getDefaultDemoPassword,
  getStoredDemoCredential,
  getStoredDemoPassword,
  setStoredDemoPassword,
} from "@/lib/demoCredentials";
import { evaluatePasswordPolicy } from "@/lib/passwordPolicy";
import { useAuthStore } from "@/store/authStore";

const formatTimestamp = (value: string) => {
  if (!value || value === "Never") {
    return "Never";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export default function PasswordSecurityPage() {
  const user = useAuthStore((state) => state.user);
  const accountEmail = user?.email ?? (process.env.NEXT_PUBLIC_DEMO_EMAIL ?? "test@kopopay.com");
  const accountName = user?.name ?? "John Doe";
  const defaultPassword = getDefaultDemoPassword();
  const credentialRecord = getStoredDemoCredential(accountEmail);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signOutOtherSessions, setSignOutOtherSessions] = useState(true);
  const [require2FAOnNextLogin, setRequire2FAOnNextLogin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(credentialRecord.updatedAt);

  const passwordPolicy = useMemo(
    () =>
      evaluatePasswordPolicy({
        password: newPassword,
        currentPassword,
        email: accountEmail,
        name: accountName,
      }),
    [accountEmail, accountName, currentPassword, newPassword]
  );

  const expectedCurrentPassword = getStoredDemoPassword(accountEmail);
  const doesConfirmationMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;
  const canSubmit =
    currentPassword.length > 0 &&
    confirmPassword.length > 0 &&
    doesConfirmationMatch &&
    passwordPolicy.rules.every((rule) => rule.passed);

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    if (currentPassword !== expectedCurrentPassword) {
      setError("Current password is incorrect for this demo account.");
      return;
    }

    if (!passwordPolicy.rules.every((rule) => rule.passed)) {
      setError("Your new password does not meet the security requirements yet.");
      return;
    }

    if (!doesConfirmationMatch) {
      setError("Confirm password must match the new password exactly.");
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      const nextRecord = setStoredDemoPassword(accountEmail, newPassword);
      setLastUpdatedAt(nextRecord.updatedAt);
      setSuccess(
        "Password updated successfully. Your next login will use the new password in demo mode."
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsSubmitting(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <SettingsPanel
          title="Reset password"
          description="Update your account password securely."
          action={
            <Link
              href="/dashboard/settings/personal/details"
              className="inline-flex items-center gap-2 rounded-xl border border-[#000C22]/15 px-4 py-2 text-sm font-semibold text-[#000C22] transition-colors hover:border-[#2ACED1]/40 hover:bg-[#2ACED1]/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
            >
              Back to profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        >
          <div className="space-y-5">
            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                {success}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <SettingsField
                label="Current password"
                hint="Use your current account password."
              >
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#000C22]/30" />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    className={`${settingsControlClass} pl-10`}
                    placeholder="Enter current password"
                  />
                </div>
              </SettingsField>

              <SettingsField
                label="New password"
                hint="Use a long unique password you do not reuse anywhere else."
              >
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#000C22]/30" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className={`${settingsControlClass} pl-10`}
                    placeholder="Create a new password"
                  />
                </div>
              </SettingsField>

              <div className="md:col-span-2">
                <SettingsField
                  label="Confirm new password"
                  hint="Confirmation must match exactly before the update is allowed."
                >
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#000C22]/30" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      className={`${settingsControlClass} pl-10`}
                      placeholder="Re-enter the new password"
                    />
                  </div>
                </SettingsField>
              </div>
            </div>

            <div className="rounded-2xl border border-[#2ACED1]/15 bg-[#2ACED1]/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#000C22] dark:text-white">
                    Strength score: {passwordPolicy.score}%
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                    Account: {accountEmail}
                  </p>
                </div>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#008E96] dark:bg-[#000C22]/50">
                  {passwordPolicy.label}
                </span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-[#000C22]/10 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#2ACED1] to-[#034E78]"
                  style={{ width: `${passwordPolicy.score}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <SettingsToggleRow
                title="Sign out other active sessions"
                description="Recommended after a password change so older sessions cannot continue using stale credentials."
                checked={signOutOtherSessions}
                onToggle={() => setSignOutOtherSessions((current) => !current)}
              />
              <SettingsToggleRow
                title="Require 2FA on the next sign in"
                description="Ask for an extra verification step after the password is changed."
                checked={require2FAOnNextLogin}
                onToggle={() => setRequire2FAOnNextLogin((current) => !current)}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-white/70 px-4 py-4 dark:border-white/5 dark:bg-white/5">
              <p className="text-sm leading-6 text-[#000C22]/65 dark:text-[#D8F4F7]/65">
                Last updated: <span className="font-semibold">{formatTimestamp(lastUpdatedAt)}</span>
              </p>
              <Button
                type="button"
                variant="action"
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update password"}
              </Button>
            </div>
          </div>
        </SettingsPanel>

        <SettingsPanel
          title="Password requirements"
          description={`Use a strong password for ${accountName}.`}
        >
            <div className="space-y-3">
              {passwordPolicy.rules.map((rule) => (
                <div
                  key={rule.id}
                  className={`flex items-start gap-3 rounded-2xl border p-4 ${
                    rule.passed
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : "border-black/5 bg-white/70 dark:border-white/5 dark:bg-white/5"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      rule.passed
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                        : "bg-black/5 text-[#000C22]/40 dark:bg-[#000C22]/30 dark:text-[#D8F4F7]/40"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-6 text-[#000C22]/70 dark:text-[#D8F4F7]/70">
                    {rule.label}
                  </p>
                </div>
              ))}
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  confirmPassword.length === 0
                    ? "border-black/5 bg-white/70 text-[#000C22]/60 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/60"
                    : doesConfirmationMatch
                      ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300"
                      : "border-red-500/20 bg-red-500/10 text-red-600"
                }`}
              >
                {confirmPassword.length === 0
                  ? "Confirm your new password to continue."
                  : doesConfirmationMatch
                    ? "Passwords match."
                    : "Passwords do not match yet."}
              </div>
              <div className="rounded-2xl border border-black/5 bg-white/70 p-4 text-sm text-[#000C22]/65 dark:border-white/5 dark:bg-white/5 dark:text-[#D8F4F7]/65">
                Demo default password: <span className="font-semibold">{defaultPassword}</span>
              </div>
            </div>
        </SettingsPanel>
      </div>
    </div>
  );
}
