"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { Form } from "@/components/molecules/Form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => {
      // Demo signup completes locally and returns users to login.
      alert("Account created! Please log in with the demo credentials.");
      // defer via safePush to avoid router initialization races
      import("@/lib/safeRouter").then(({ safePush }) => safePush(router, "/auth/login"));
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Join Kopo Pay to start accepting payments and scaling your business."
    >
      <Form<SignupFormValues> onSubmit={handleSignup} defaultValues={{ name: "", email: "", password: "" }}>
        {({ register }) => (
          <>
            <Input 
              label="Full name" 
              type="text" 
              placeholder="Jane Doe" 
              required 
              {...register("name")}
            />
            
            <Input 
              label="Email address" 
              type="email" 
              placeholder="jane@example.com" 
              required 
              {...register("email")}
            />
            
            <Input 
              label="Password" 
              type="password" 
              placeholder="At least 8 characters" 
              required 
              {...register("password")}
            />

            <Button type="submit" variant="primary" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </>
        )}
      </Form>
      
      <p className="mt-6 text-center text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/60">
        Already have an account? <Link href="/auth/login" className="text-[#2ACED1] font-medium hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
