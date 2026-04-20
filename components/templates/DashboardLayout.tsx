"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CommandCenter } from "@/components/organisms/CommandCenter";
import { DashboardSidebar } from "@/components/organisms/DashboardSidebar";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB] dark:bg-[#000C22]">
      <CommandCenter />
      <DashboardSidebar isSidebarOpen={isSidebarOpen} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-black/5 bg-white/50 px-8 backdrop-blur-md dark:border-white/5 dark:bg-[#011B3B]/50">
          <button
            type="button"
            onClick={() => setIsSidebarOpen((current) => !current)}
            className="rounded-lg p-2 text-[#000C22]/60 transition-colors hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/5"
            aria-label="Toggle sidebar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-[#000C22]/60 dark:text-white/60">
                Live Mode
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-6xl"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
