"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ApiReferenceRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the default section
    router.replace("/sdk/api-reference/authentication");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#000C22] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#2ACED1] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
