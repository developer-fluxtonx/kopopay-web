import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kopo Pay - Stripe-like Payment Platform",
  description: "Next generation payment platform with advanced UI.",
};

import { GlobalBackground } from "@/components/organisms/GlobalBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans text-[var(--color-brand-navy-black)] dark:text-[var(--color-brand-cyan-light)] bg-transparent">
        <GlobalBackground />
        {children}
      </body>
    </html>
  );
}
