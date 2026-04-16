"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  Send, 
  Download, 
  CreditCard, 
  Users, 
  FileText, 
  Briefcase, 
  ShieldAlert, 
  Settings,
  Code
} from "lucide-react";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { group: "Core", items: [
    { label: "Home", href: "/dashboard", icon: Home },
    { label: "Send Money", href: "/dashboard/send", icon: Send },
    { label: "Receive", href: "/dashboard/receive", icon: Download },
  ]},
  { group: "Payments", items: [
    { label: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
  ]},
  { group: "Business", items: [
    { label: "Billing", href: "/dashboard/billing", icon: FileText },
    { label: "Connect", href: "/dashboard/connect", icon: Briefcase },
    { label: "Radar", href: "/dashboard/radar", icon: ShieldAlert },
  ]},
  { group: "System", items: [
    { label: "Developer", href: "/dashboard/developer", icon: Code },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ]}
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#F9FAFB] dark:bg-[#000C22] overflow-hidden">
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="h-full border-r border-black/5 dark:border-white/5 bg-white dark:bg-[#011B3B] z-20 flex flex-col transition-all duration-300 relative"
      >
        <div className="h-16 flex items-center px-4 border-b border-black/5 dark:border-white/5 whitespace-nowrap overflow-hidden gap-3">
          <div className="w-8 h-8 rounded-md bg-gradient-action-button flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          {isSidebarOpen && <span className="font-bold tracking-tight">Kopo Pay</span>}
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-8 custom-scrollbar">
          {NAV_ITEMS.map((group, idx) => (
            <div key={idx} className="px-4">
              {isSidebarOpen && <h4 className="text-xs font-semibold text-[#000C22]/40 dark:text-[#D8F4F7]/40 uppercase tracking-wider mb-3 px-2">{group.group}</h4>}
              <nav className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-colors group ${
                        isActive 
                          ? "bg-[#2ACED1]/10 text-[#008E96] dark:text-[#2ACED1]" 
                          : "text-[#000C22]/70 dark:text-[#D8F4F7]/70 hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                      title={!isSidebarOpen ? item.label : undefined}
                    >
                      <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`} />
                      {isSidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white/50 dark:bg-[#011B3B]/50 backdrop-blur-md border-b border-black/5 dark:border-white/5 flex items-center justify-between px-8 z-10 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 -ml-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#000C22]/60 dark:text-white/60"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-medium text-[#000C22]/60 dark:text-white/60">Live Mode</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
