"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { Button } from "@/components/atoms/Button";
import { useAuthStore } from "@/store/authStore";

const OTP_LENGTH = 6;
const DEMO_CODE = "123456";

export default function TwoFactorPage() {
  const router = useRouter();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [codeDigits, setCodeDigits] = useState(Array.from({ length: OTP_LENGTH }, () => ""));
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Enter the 6-digit code to continue.");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);

  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const hasHydrated = useAuthStore(state => state.hasHydrated);
  const setVerified = useAuthStore(state => state.setVerified);

  const otpValue = useMemo(() => codeDigits.join(""), [codeDigits]);
  const isComplete = otpValue.length === OTP_LENGTH && !codeDigits.includes("");

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated) {
      const t = setTimeout(() => import("@/lib/safeRouter").then(({ safePush }) => safePush(router, "/auth/login")), 0);
      return () => clearTimeout(t);
    }
  }, [hasHydrated, isAuthenticated, router]);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown(current => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const focusDigit = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setError("");
    setStatus("Checking code format...");

    setCodeDigits(current => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    if (digit && index < OTP_LENGTH - 1) {
      window.requestAnimationFrame(() => focusDigit(index + 1));
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !codeDigits[index] && index > 0) {
      window.requestAnimationFrame(() => focusDigit(index - 1));
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const nextDigits = Array.from({ length: OTP_LENGTH }, (_, index) => pasted[index] ?? "");
    setCodeDigits(nextDigits);
    setError("");
    setStatus("Code pasted. Review and submit.");

    const nextFocus = Math.min(pasted.length, OTP_LENGTH - 1);
    window.requestAnimationFrame(() => focusDigit(nextFocus));
  };

  const handleVerify = () => {
    if (!isComplete) {
      setError("Enter all 6 digits first.");
      setStatus("The code is incomplete.");
      return;
    }

    setIsLoading(true);
    setError("");
    setStatus("Verifying your code...");

    setTimeout(() => {
      if (otpValue === DEMO_CODE) {
        setVerified(true);
        setStatus("Verification complete. Redirecting to dashboard...");
        import("@/lib/safeRouter").then(({ safePush }) => safePush(router, "/dashboard"));
      } else {
        setError("Invalid code. Please use 123456.");
        setStatus("The code did not match. Please try again.");
        setCodeDigits(Array.from({ length: OTP_LENGTH }, () => ""));
        window.requestAnimationFrame(() => focusDigit(0));
      }
      setIsLoading(false);
    }, 900);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setError("");
    setStatus("A new verification code has been sent to your email.");
    setResendCooldown(30);
    setCodeDigits(Array.from({ length: OTP_LENGTH }, () => ""));
    window.requestAnimationFrame(() => focusDigit(0));
  };

  if (!hasHydrated) {
    return (
      <AuthLayout title="Two-step verification" subtitle="Preparing your secure session.">
        <div className="rounded-2xl border border-[#000C22]/10 dark:border-white/10 bg-white dark:bg-[#011B3B] p-6">
          <div className="h-4 w-32 rounded-full bg-[#000C22]/10 dark:bg-white/10 animate-pulse" />
          <div className="mt-4 h-10 rounded-xl bg-[#000C22]/10 dark:bg-white/10 animate-pulse" />
          <div className="mt-4 grid grid-cols-6 gap-2">
            {Array.from({ length: OTP_LENGTH }, (_, index) => (
              <div key={index} className="h-14 rounded-xl bg-[#000C22]/10 dark:bg-white/10 animate-pulse" />
            ))}
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (!user) return null;

  return (
    <AuthLayout
      title="Two-step verification"
      subtitle={`We sent a verification code to ${user.email}. Enter it below.`}
    >
      <div className="mb-5 rounded-2xl border border-[#000C22]/10 dark:border-white/10 bg-[#F7FBFC] dark:bg-white/5 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#000C22]/50 dark:text-[#D8F4F7]/50">Verification step</p>
            <p className="mt-1 text-sm font-semibold text-[#000C22] dark:text-white">Secure access for {user.name}</p>
          </div>
          <span className="rounded-full bg-[#2ACED1]/10 px-3 py-1 text-xs font-medium text-[#008E96]">
            Session active
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white/80 dark:bg-[#011B3B] px-3 py-2 border border-black/5 dark:border-white/10">
            <p className="text-[#000C22]/50 dark:text-[#D8F4F7]/50 text-xs">Destination</p>
            <p className="mt-1 font-medium text-[#000C22] dark:text-white">{user.email}</p>
          </div>
          <div className="rounded-xl bg-white/80 dark:bg-[#011B3B] px-3 py-2 border border-black/5 dark:border-white/10">
            <p className="text-[#000C22]/50 dark:text-[#D8F4F7]/50 text-xs">Expected code</p>
            <p className="mt-1 font-medium text-[#000C22] dark:text-white">6 digits</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="rounded-xl border border-[#000C22]/10 dark:border-white/10 bg-white dark:bg-[#011B3B] p-3">
          <p className="text-sm font-medium text-[#000C22] dark:text-white">Step 2 of 2</p>
          <p className="mt-1 text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60">
            Enter the current verification code from your authenticator app or secure message.
          </p>
        </div>

        <div
          className="flex items-center justify-between gap-2 sm:gap-3"
          onPaste={handlePaste}
        >
          {codeDigits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              value={digit}
              onChange={(event) => updateDigit(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              aria-label={`Verification digit ${index + 1}`}
              className="h-14 w-11 sm:h-16 sm:w-12 rounded-xl border border-[#000C22]/10 dark:border-white/10 bg-white dark:bg-[#011B3B] text-center text-xl font-semibold tracking-[0.2em] text-[#000C22] dark:text-white outline-none transition focus:border-[#2ACED1] focus:ring-4 focus:ring-[#2ACED1]/20"
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60">
            {status}
          </p>
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-[#2ACED1] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            disabled={resendCooldown > 0}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
          </button>
        </div>

        <Button
          type="button"
          variant="primary"
          className="w-full mt-1"
          onClick={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify & Continue"}
        </Button>

        <div className="flex items-center justify-between pt-2 text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">
          <Link href="/auth/login" className="hover:text-[#2ACED1]">
            Back to sign in
          </Link>
          <span>Code expires in about 5 minutes</span>
        </div>
      </div>
    </AuthLayout>
  );
}
