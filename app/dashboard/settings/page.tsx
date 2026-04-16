"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { motion } from "framer-motion";
import { User, Shield, Bell, CreditCard, Palette, Users as UsersIcon, ChevronRight } from "lucide-react";

const settingsSections = [
  { icon: User, title: "Profile", desc: "Personal and business information", color: "#2ACED1" },
  { icon: Shield, title: "Security", desc: "2FA, sessions, and API access", color: "#034E78" },
  { icon: Bell, title: "Notifications", desc: "Email and push notification preferences", color: "#008E96" },
  { icon: CreditCard, title: "Payment Methods", desc: "Manage your linked cards and banks", color: "#2ACED1" },
  { icon: Palette, title: "Branding", desc: "Customize logo, colors, and email templates", color: "#034E78" },
  { icon: UsersIcon, title: "Team", desc: "Invite members and manage roles", color: "#008E96" },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <ScrollReveal direction="left">
        <h1 className="text-2xl font-bold text-[#000C22] dark:text-white mb-1">Settings</h1>
        <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 font-medium">Manage your account settings and preferences.</p>
      </ScrollReveal>

      {/* Profile Card */}
      <ScrollReveal direction="top" delay={0.1}>
        <motion.div whileHover={{ boxShadow: "0 10px 30px rgba(42,206,209,0.1)" }}
          className="p-6 rounded-2xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2ACED1] to-[#034E78] flex items-center justify-center text-white font-bold text-2xl shadow-lg">J</div>
            <div>
              <h2 className="text-lg font-bold text-[#000C22] dark:text-white">John Doe</h2>
              <p className="text-sm text-[#000C22]/50 dark:text-[#D8F4F7]/50">test@kopopay.com • Merchant Account</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScrollReveal direction="left" delay={0.15}>
              <Input label="Full Name" defaultValue="John Doe" />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <Input label="Email" defaultValue="test@kopopay.com" type="email" />
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.25}>
              <Input label="Business Name" defaultValue="Kopo Pay Demo" />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.3}>
              <Input label="Phone" defaultValue="+1 (555) 123-4567" />
            </ScrollReveal>
          </div>
          <ScrollReveal direction="bottom" delay={0.35}>
            <Button variant="action" className="mt-6 rounded-xl shadow-[0_4px_15px_rgba(42,206,209,0.2)]">Save Changes</Button>
          </ScrollReveal>
        </motion.div>
      </ScrollReveal>

      {/* Settings Navigation */}
      <ScrollReveal direction="bottom" delay={0.15}>
        <h2 className="text-lg font-bold text-[#000C22] dark:text-white mb-4">Account Settings</h2>
        <div className="flex flex-col gap-3">
          {settingsSections.map((section, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.06}>
              <motion.div
                whileHover={{ x: 4, boxShadow: "0 6px 20px rgba(42,206,209,0.1)" }}
                className="p-4 rounded-xl bg-white/80 dark:bg-[#011B3B]/80 border border-[#2ACED1]/20 hover:border-[#2ACED1]/50 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: section.color + "15" }}>
                    <section.icon className="w-5 h-5" style={{ color: section.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#000C22] dark:text-white group-hover:text-[#2ACED1] transition-colors">{section.title}</p>
                    <p className="text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">{section.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#000C22]/30 dark:text-[#D8F4F7]/30 group-hover:text-[#2ACED1] transition-colors" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
