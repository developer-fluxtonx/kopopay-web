"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToNewDocs() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sdk/docs");
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2ACED1] border-t-transparent" />
        <p className="text-sm font-medium text-[#000C22]/60 dark:text-[#D8F4F7]/60">
          Redirecting to the new documentation...
        </p>
      </div>
    </div>
  );
}
