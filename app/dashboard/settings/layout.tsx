import React from "react";
import { SettingsLayout } from "@/components/templates/SettingsLayout";

export default function DashboardSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
