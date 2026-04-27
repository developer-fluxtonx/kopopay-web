"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Shield, 
  CreditCard, 
  Settings, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Search,
  MoreHorizontal,
  Trash2,
  CheckCheck
} from "lucide-react";

const initialNotifications = [
  {
    id: "1",
    type: "security",
    title: "New Login Detected",
    description: "A new login was detected from a Windows device in London, UK.",
    time: "2 mins ago",
    unread: true,
    action: "Review Security"
  },
  {
    id: "2",
    type: "payment",
    title: "High Value Payment Received",
    description: "Transaction #TX-94021 for $12,500.00 has been successfully processed.",
    time: "1 hour ago",
    unread: true,
    action: "View Transaction"
  },
  {
    id: "3",
    type: "system",
    title: "Webhook Endpoint Failure",
    description: "Your endpoint https://api.myshop.com/webhooks failed with a 500 error.",
    time: "3 hours ago",
    unread: false,
    action: "Debug Webhook"
  },
  {
    id: "4",
    type: "business",
    title: "Payout Scheduled",
    description: "Your payout of $45,200.00 is scheduled for April 28, 2026.",
    time: "5 hours ago",
    unread: false,
    action: "Payout Details"
  },
  {
    id: "5",
    type: "security",
    title: "Identity Verification Required",
    description: "Please complete your secondary KYC to increase your monthly volume limit.",
    time: "1 day ago",
    unread: true,
    action: "Start KYC"
  }
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");
  const [notifications, setNotifications] = useState(initialNotifications);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "security": return <Shield className="w-5 h-5 text-amber-500" />;
      case "payment": return <CreditCard className="w-5 h-5 text-[#2ACED1]" />;
      case "system": return <Zap className="w-5 h-5 text-indigo-500" />;
      default: return <Bell className="w-5 h-5 text-[#2ACED1]" />;
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const filtered = notifications.filter(n => {
    if (filter === "unread") return n.unread;
    return true;
  });

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <ScrollReveal direction="left">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-[#000C22] dark:text-white mb-2 tracking-tight">Notification Center</h1>
            <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Real-time alerts and critical updates for your workspace.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <div className="flex items-center gap-3">
             <button onClick={markAllRead} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black/5 dark:bg-white/5 text-[#000C22]/60 dark:text-white/60 text-xs font-black hover:bg-[#2ACED1]/10 hover:text-[#2ACED1] transition-all">
                <CheckCheck className="w-4 h-4" /> Mark all as read
             </button>
             <Link href="/dashboard/settings/personal/communication" className="p-3 rounded-2xl bg-[#2ACED1] text-white shadow-xl shadow-[#2ACED1]/20">
                <Settings className="w-5 h-5" />
             </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Tabs ─── */}
      <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/5">
        {["all", "unread", "archived"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-6 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
              filter === tab ? "text-[#2ACED1]" : "text-[#000C22]/40 dark:text-white/40"
            }`}
          >
            {tab}
            {filter === tab && (
              <motion.div layoutId="notif-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2ACED1]" />
            )}
          </button>
        ))}
      </div>

      {/* ─── Search ─── */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2ACED1]" />
        <input 
          placeholder="Search notifications..." 
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-[#011B3B] border border-black/5 dark:border-white/5 text-sm font-bold shadow-sm focus:border-[#2ACED1] transition-all outline-none"
        />
      </div>

      {/* ─── Notification List ─── */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className={`group p-6 rounded-[2rem] border transition-all cursor-pointer flex items-start justify-between ${
                notif.unread 
                  ? "bg-white dark:bg-[#011B3B] border-[#2ACED1]/20 shadow-lg shadow-[#2ACED1]/5" 
                  : "bg-white/50 dark:bg-white/5 border-black/5 dark:border-white/5"
              }`}
            >
              <div className="flex gap-6">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                   notif.unread ? "bg-[#2ACED1]/10" : "bg-black/5 dark:bg-white/5"
                 }`}>
                    {getTypeIcon(notif.type)}
                 </div>
                 <div className="space-y-1">
                    <div className="flex items-center gap-3">
                       <h3 className={`text-sm font-black ${notif.unread ? "text-[#000C22] dark:text-white" : "text-[#000C22]/60 dark:text-white/60"}`}>
                          {notif.title}
                       </h3>
                       {notif.unread && <span className="w-2 h-2 rounded-full bg-[#2ACED1] shadow-sm shadow-[#2ACED1]/50" />}
                    </div>
                    <p className={`text-xs font-medium leading-relaxed max-w-xl ${notif.unread ? "text-[#000C22]/70 dark:text-[#D8F4F7]/70" : "text-[#000C22]/40 dark:text-white/40"}`}>
                       {notif.description}
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                       <span className="text-[10px] font-bold text-[#000C22]/30 dark:text-white/20 uppercase tracking-widest">{notif.time}</span>
                       <button className="text-[10px] font-black text-[#2ACED1] uppercase tracking-widest hover:underline">
                          {notif.action}
                       </button>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                 <button className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-[#000C22]/40">
                    <Trash2 className="w-4 h-4" />
                 </button>
                 <button className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-[#000C22]/40">
                    <MoreHorizontal className="w-4 h-4" />
                 </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ─── Empty State ─── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
           <div className="w-20 h-20 rounded-[2.5rem] bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#2ACED1]/30" />
           </div>
           <h3 className="text-xl font-black text-[#000C22] dark:text-white mb-2">You're all caught up!</h3>
           <p className="text-sm text-[#000C22]/40 dark:text-white/40">No new notifications to display in this category.</p>
        </div>
      )}
    </div>
  );
}
