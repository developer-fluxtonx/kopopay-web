"use client";

import React from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <DashboardLayout>{children}</DashboardLayout>;
}
