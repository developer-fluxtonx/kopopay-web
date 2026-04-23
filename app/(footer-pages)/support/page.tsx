"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { MessageCircle, Mail, Phone, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  const supportOptions = [
    {
      icon: <MessageCircle className="w-8 h-8 text-[#2ACED1]" />,
      title: "Chat with us",
      desc: "Get instant answers from our support team via live chat.",
      action: "Start Chat",
      link: "#"
    },
    {
      icon: <Mail className="w-8 h-8 text-[#2ACED1]" />,
      title: "Email Support",
      desc: "Send us a detailed message and we'll get back to you within 24 hours.",
      action: "Send Email",
      link: "mailto:support@kopopay.com"
    },
    {
      icon: <Phone className="w-8 h-8 text-[#2ACED1]" />,
      title: "Phone Support",
      desc: "Premium and Enterprise customers get 24/7 dedicated phone support.",
      action: "View Phone Numbers",
      link: "#"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-[#2ACED1]" />,
      title: "Documentation",
      desc: "Explore our comprehensive guides and API reference.",
      action: "Read Docs",
      link: "/kopoPayDocs"
    }
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <ScrollReveal>
          <h1 className="text-5xl md:text-6xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight">
            How can we <span className="text-[#2ACED1]">help you?</span>
          </h1>
          <p className="text-lg text-[#000C22]/70 dark:text-[#D8F4F7]/70">
            Our global support team is available 24/7 to help you build and scale with Kopo Pay.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {supportOptions.map((option, idx) => (
          <ScrollReveal key={idx} direction="bottom" delay={0.1 * idx}>
            <Link href={option.link}>
              <div className="group bg-white/40 dark:bg-[#011B3B]/40 border border-[#2ACED1]/20 hover:border-[#2ACED1] rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-[#2ACED1]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#000C22] dark:text-white">{option.title}</h3>
                <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 text-sm mb-8 flex-1">{option.desc}</p>
                <div className="flex items-center text-[#2ACED1] font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                  {option.action} <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
