"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { Form } from "@/components/molecules/Form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore(state => state.login);

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    setError("");
    
    // Simulate API Call
    setTimeout(() => {
      if (data.email === "test@kopopay.com" && data.password === "password123") {
        // Dummy Auth Logic
        login({
          id: "usr_dummy123",
          name: "John Doe",
          email: "test@kopopay.com",
          role: "merchant",
          verified: false // False to trigger 2FA / KYC
        });
        // defer navigation to avoid dispatching before router init
        setTimeout(() => import("@/lib/safeRouter").then(({ safePush }) => safePush(router, "/auth/2fa")), 0);
      } else {
        setError("Invalid email or password. Use test@kopopay.com / password123");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Sign in to your account" 
      subtitle="Enter your email and password to access your dashboard."
    >
      <Form onSubmit={handleLogin} defaultValues={{ email: "", password: "" }}>
        {({ register }) => (
          <>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
                {error}
              </div>
            )}
            
            <Input 
              label="Email address" 
              type="email" 
              placeholder="test@kopopay.com" 
              required 
              {...register("email")}
            />
            
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[#000C22]/80 dark:text-[#D8F4F7]/80">Password</label>
                <Link href="#" className="text-sm text-[#2ACED1] hover:underline">Forgot password?</Link>
              </div>
              <Input 
                type="password" 
                placeholder="password123" 
                required 
                {...register("password")}
              />
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Continue"}
            </Button>
          </>
        )}
      </Form>
      
      <p className="mt-6 text-center text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60">
        Don&apos;t have an account? <Link href="/auth/signup" className="text-[#2ACED1] font-medium hover:underline">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
