"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CommandCenter } from "@/components/organisms/CommandCenter";
import { DashboardSidebar } from "@/components/organisms/DashboardSidebar";
import { Bell } from "lucide-react";
import Link from "next/link";

import { useConfigStore } from "@/store/configStore";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isTestMode, toggleTestMode } = useConfigStore();

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${
      isTestMode 
        ? "bg-[#F9FAFB] dark:bg-[#000C22]" 
        : "bg-[#F9FAFB] dark:bg-[#000C22]"
    }`}>
      {isTestMode && (
        <div className="absolute top-0 left-0 right-0 z-[100] h-1 bg-[#2ACED1] opacity-50" />
      )}
      <CommandCenter />
      <DashboardSidebar isSidebarOpen={isSidebarOpen} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-black/5 bg-white/50 px-8 backdrop-blur-md dark:border-white/5 dark:bg-[#011B3B]/50">
          <div className="flex items-center gap-4">
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
            
            {isTestMode && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ACED1]/10 border border-[#2ACED1]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2ACED1] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#2ACED1]">Test Mode</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pr-4 border-r border-black/5 dark:border-white/5">
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isTestMode ? "text-[#000C22]/40 dark:text-white/40" : "text-[#2ACED1]"}`}>
                Live
              </span>
              <button 
                onClick={toggleTestMode}
                className={`relative w-10 h-5 rounded-full transition-all duration-300 p-1 ${isTestMode ? "bg-[#2ACED1]" : "bg-black/10 dark:bg-white/10"}`}
              >
                <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-300 shadow-sm ${isTestMode ? "translate-x-5" : "translate-x-0"}`} />
              </button>
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isTestMode ? "text-[#2ACED1]" : "text-[#000C22]/40 dark:text-white/40"}`}>
                Test
              </span>
            </div>

            <Link href="/dashboard/notifications" className="relative p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group">
               <Bell className="w-5 h-5 text-[#000C22]/60 dark:text-white/60 group-hover:text-[#2ACED1]" />
               <span className="absolute top-1 right-1 w-2 h-2 bg-[#2ACED1] rounded-full border-2 border-white dark:border-[#011B3B]" />
            </Link>
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
