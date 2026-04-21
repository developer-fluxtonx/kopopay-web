"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { Form } from "@/components/molecules/Form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { useAuthStore } from "@/store/authStore";

export default function TwoFactorPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setVerified = useAuthStore(state => state.setVerified);

  useEffect(() => {
    // If not logged in, boot them to login
    if (!isAuthenticated) {
      const t = setTimeout(() => import("@/lib/safeRouter").then(({ safePush }) => safePush(router, "/auth/login")), 0);
      return () => clearTimeout(t);
    }
  }, [isAuthenticated, router]);

  const handleVerify = async (data: any) => {
    setIsLoading(true);
    setError("");
    
    setTimeout(() => {
      if (data.code === "123456") {
        setVerified(true);
        // After 2FA, normally we go to dashboard. But let's verify if KYC is done?
        // For now, straight to dashboard. Use safePush to avoid race conditions.
        import("@/lib/safeRouter").then(({ safePush }) => safePush(router, "/dashboard"));
      } else {
        setError("Invalid code. Please use 123456.");
      }
      setIsLoading(false);
    }, 1000);
  };

  if (!user) return null;

  return (
    <AuthLayout 
      title="Two-step verification" 
      subtitle={`We sent a verification code to ${user.email}. Enter it below.`}
    >
      <Form onSubmit={handleVerify} defaultValues={{ code: "" }}>
        {({ register }) => (
          <>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
                {error}
              </div>
            )}
            
            <Input 
              label="6-digit code" 
              type="text" 
              maxLength={6}
              placeholder="123456" 
              required 
              className="tracking-widest text-lg font-mono text-center"
              {...register("code")}
            />

            <Button type="submit" variant="primary" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify & Continue"}
            </Button>
          </>
        )}
      </Form>
    </AuthLayout>
  );
}
