"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { HeroBackground } from "@/components/organisms/HeroBackground";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { InteractiveLightRays } from "@/components/atoms/InteractiveLightRays";
import { AnimatedGlobe } from "@/components/atoms/AnimatedGlobe";
import { ScrollProgressReveal } from "@/components/atoms/ScrollProgressReveal";
import { Button } from "@/components/atoms/Button";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronRight, ShieldCheck, Zap, Globe, ArrowRight, Code, Terminal, Layers, LifeBuoy } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const CompanyLogos = [
  "Amazon", "Shopify", "Google", "Microsoft", "Uber", "Spotify", "Booking.com", "Salesforce", "Slack"
];

const AnimatedCounter = ({ target, prefix = "", suffix = "", decimals = 0, trigger }: { target: number, prefix?: string, suffix?: string, decimals?: number, trigger: number }) => {
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => {
    return prefix + latest.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    count.set(0);
    const controls = animate(count, target, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [target, trigger, count]);

  return <motion.span>{display}</motion.span>;
};

export default function LandingPage() {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrigger(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen relative selection:bg-[#2ACED1] selection:text-white pb-0 overflow-hidden">
      <Navbar />
      
      {/* ─── Hero Section ─── */}
      {/* Reduced pt-32 to pt-12 (80% space reduction) */}
      <section className="relative pt-12 pb-8 md:pt-16 md:pb-16 px-6 min-h-[80vh] flex items-center">
        <HeroBackground />
        
        <ScrollProgressReveal 
          direction="down" 
          distance={100} 
          opacityRange={[0, 0.7, 1, 1]} 
          opacityOutput={[1, 1, 0, 0]}
          yRange={[0, 0, 1, 1]}
          className="max-w-[1280px] w-full mx-auto relative z-20 flex flex-col md:flex-row items-center pointer-events-none"
        >
          <div className="w-full md:w-[60%] flex flex-col items-start text-left pointer-events-auto">
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14A9AE]/10 dark:bg-black/40 backdrop-blur-md border border-[#2ACED1]/30 mb-8 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#2ACED1] animate-pulse"></span>
                <span className="text-xs font-semibold tracking-wide text-[#000C22] dark:text-[#D8F4F7]">Now Live — Kopo Pay V2</span>
              </div>
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-bold tracking-tight leading-[1.05] mb-8 text-[#000C22] dark:text-white drop-shadow-sm"
            >
              Financial <br/>
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #2ACED1, #008E96, #034E78)" }}>
                infrastructure
              </span> <br/>
              for the internet.
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="text-lg md:text-xl text-[#000C22]/80 dark:text-[#D8F4F7]/90 max-w-lg mb-10 leading-relaxed font-medium"
            >
              Millions of businesses use Kopo Pay to accept payments, grow their revenue, and accelerate new business opportunities globally.
            </motion.p>
            
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button size="lg" variant="action" className="rounded-full shadow-[0_8px_30px_rgb(42,206,209,0.3)] px-8 hover:shadow-[0_12px_40px_rgb(42,206,209,0.5)] transition-all duration-300">
                Start now <ChevronRight className="ml-1 w-5 h-5" />
              </Button>
              
              <Button size="lg" variant="secondary" className="rounded-full px-8 bg-white dark:bg-[#011B3B] border border-black/10 dark:border-white/10 shadow-sm hover:border-[#2ACED1]/50 hover:shadow-[0_8px_20px_rgb(42,206,209,0.15)] transition-all duration-300 gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </Button>
            </motion.div>
          </div>
        </ScrollProgressReveal>
      </section>

      {/* ─── Marquee Section (Slowed down 50%) ─── */}
      <section className="relative z-20 overflow-hidden py-4 border-y border-[#2ACED1]/10 bg-white/10 dark:bg-black/10">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
          className="flex w-fit whitespace-nowrap"
        >
          {[...CompanyLogos, ...CompanyLogos, ...CompanyLogos].map((logo, i) => (
            <div key={i} className="mx-16 flex items-center justify-center">
              <span className="text-xl md:text-2xl font-bold text-[#000C22]/30 dark:text-[#D8F4F7]/40 uppercase tracking-widest">{logo}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── NEW: Developer Experience Section ─── */}
      <section className="relative z-20 max-w-[1280px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollProgressReveal direction="left">
            <h4 className="text-[#2ACED1] font-bold text-sm uppercase tracking-widest mb-4">Developer First</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight leading-tight">
              The world&apos;s most powerful <br/> and easy-to-use APIs
            </h2>
            <p className="text-lg text-[#000C22]/80 dark:text-[#D8F4F7]/80 mb-8 leading-relaxed">
              We believe payments is a problem rooted in code, not finance. We obsess over clean abstractions that help your team build faster.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2ACED1]/20 flex items-center justify-center">
                   <Code className="w-3.5 h-3.5 text-[#008E96]" />
                </div>
                <span className="font-semibold text-[#000C22]/80 dark:text-[#D8F4F7]/90 text-sm">Prebuilt Checkout UI</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2ACED1]/20 flex items-center justify-center">
                   <Terminal className="w-3.5 h-3.5 text-[#008E96]" />
                </div>
                <span className="font-semibold text-[#000C22]/80 dark:text-[#D8F4F7]/90 text-sm">Comprehensive Client-side SDKs</span>
              </div>
            </div>
          </ScrollProgressReveal>

          <ScrollProgressReveal direction="right">
            <div className="rounded-2xl bg-[#011B3B] border border-white/10 shadow-2xl overflow-hidden shadow-cyan-500/10">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 text-center text-[11px] text-white/40 font-mono">checkout.ts</div>
              </div>
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-white/90">
                  <code className="language-typescript">
{`const checkout = await kopo.checkout.create({
  success_url: 'https://example.com/success',
  line_items: [
    { price: 'price_123', quantity: 1 },
  ],
  mode: 'payment',
});`}
                  </code>
                </pre>
              </div>
            </div>
          </ScrollProgressReveal>
        </div>
      </section>

      {/* ─── NEW: Backbone & Looping Stats Section (Blueish Navy Gradient) ─── */}
      <section className="relative z-20 pt-28 pb-0 overflow-hidden group min-h-[800px] flex flex-col">
        {/* Updated to the blueish navy gradient as requested */}
        <div className="absolute inset-0 bg-gradient-primary-button -z-10" />
        
        <div className="max-w-[1280px] mx-auto px-6 text-center text-white relative z-20 flex-1 flex flex-col justify-center">
          <ScrollReveal direction="top">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight">
              The backbone of global commerce
            </h2>
          </ScrollReveal>

          {/* Greenish Horizontal Borders added around the loop section */}
          <div className="py-20 border-y border-[#2ACED1]/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { value: 135, suffix: "+", label: "Currencies supported", dir: "left" as const },
                { value: 1.9, prefix: "$", suffix: "T", decimals: 1, label: "Payments volume", dir: "bottom" as const },
                { value: 99.99, suffix: "%", decimals: 2, label: "Historical uptime", dir: "bottom" as const },
                { value: 200, suffix: "M+", label: "Active subscriptions", dir: "right" as const },
              ].map((stat, i) => (
                <ScrollReveal key={i} direction={stat.dir} delay={i * 0.1}>
                  <p className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-md">
                    <AnimatedCounter target={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix} decimals={stat.decimals || 0} trigger={trigger} />
                  </p>
                  <p className="text-sm font-bold opacity-80 uppercase tracking-widest">{stat.label}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Further refined overlap: Reduced to -mt-4 for a subtle touch with the border */}
        <div className="-mt-4 relative z-30">
          <InteractiveLightRays />
        </div>
      </section>

      {/* ─── Feature Showcase ─── */}
      <section className="relative z-20 max-w-[1280px] mx-auto px-6 py-24">
        <ScrollReveal direction="top" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000C22] dark:text-white mb-4 tracking-tight">
            A fully integrated suite of payments products
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="bottom" delay={0.15} className="text-center mb-16">
          <p className="text-[#000C22]/70 dark:text-[#D8F4F7]/70 max-w-2xl mx-auto text-lg font-medium">
            We bring together everything that&apos;s required to build websites and apps that accept payments and send payouts globally.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              color: "#2ACED1",
              bgColor: "#2ACED1",
              title: "Blazing Fast Payments",
              text: "React Server Components with edge caching ensure instant load times and 60fps scrolling across every device.",
              dir: "left" as const,
            },
            {
              icon: ShieldCheck,
              color: "#034E78",
              bgColor: "#034E78",
              title: "Enterprise Radar",
              text: "Machine learning fraud detection with 3D Secure, risk scoring, and intelligent block/allow lists to protect revenue.",
              dir: "bottom" as const,
            },
            {
              icon: Globe,
              color: "#008E96",
              bgColor: "#008E96",
              title: "Global Connect",
              text: "Multi-party routing, split payments, and scheduled instant payouts for complex marketplace and SaaS architectures.",
              dir: "right" as const,
            }
          ].map((feature, i) => (
            <ScrollProgressReveal key={i} direction={feature.dir === "bottom" ? "up" : feature.dir}>
              <motion.div 
                whileHover={{ y: -6 }}
                className="p-8 rounded-2xl bg-[#F8FEFE]/80 dark:bg-[#011B3B]/60 backdrop-blur-sm border border-[#2ACED1]/30 shadow-sm hover:border-[#2ACED1] hover:shadow-[0_8px_30px_rgb(42,206,209,0.2)] dark:hover:shadow-[0_8px_30px_rgb(42,206,209,0.15)] transition-all duration-300 group cursor-pointer h-full"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm"
                  style={{ backgroundColor: `${feature.bgColor}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#000C22] dark:text-white mb-3">{feature.title}</h3>
                <p className="text-[#000C22]/70 dark:text-[#D8F4F7]/70 leading-relaxed font-medium">{feature.text}</p>
                <div className="mt-5 flex items-center text-sm font-bold text-[#2ACED1] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </motion.div>
            </ScrollProgressReveal>
          ))}
        </div>
      </section>

      {/* ─── NEW: Global Scale Section ─── */}
      <section className="relative z-20 py-24 bg-[#D8F4F7]/10">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollProgressReveal direction="right" className="order-2 lg:order-1 relative">
                <div className="w-full aspect-square max-w-[500px] mx-auto relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[100px]" />
                    <AnimatedGlobe />
                </div>
            </ScrollProgressReveal>
            <ScrollProgressReveal direction="left" className="order-1 lg:order-2">
                <h4 className="text-[#2ACED1] font-bold text-sm uppercase tracking-widest mb-4">Global Scale</h4>
                <h2 className="text-4xl md:text-5xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight leading-tight">
                    Scale globally with <br/> optimized infrastructure
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-2">
                        <Layers className="w-6 h-6 text-[#2ACED1]" />
                        <h5 className="font-bold text-[#000C22]/90 dark:text-white">Robust Platform</h5>
                        <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/70">Highly available and globally distributed systems with 99.99% uptime.</p>
                    </div>
                    <div className="space-y-2">
                        <LifeBuoy className="w-6 h-6 text-[#2ACED1]" />
                        <h5 className="font-bold text-[#000C22]/90 dark:text-white">Expert Support</h5>
                        <p className="text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/70">24/7 dedicated support team to keep your business running smoothly.</p>
                    </div>
                </div>
            </ScrollProgressReveal>
          </div>
        </div>
      </section>

      {/* ─── Footer (Updated with Blueish Navy Color) ─── */}
      <ScrollReveal direction="bottom">
        <footer className="bg-gradient-primary-button py-16 px-6 relative z-20 text-white border-none">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <ScrollReveal direction="left" delay={0.1}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg">
                    <span className="text-[#008E96] font-bold text-lg">K</span>
                  </div>
                  <span className="text-xl font-bold tracking-tight">Kopo Pay</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed max-w-[200px]">
                  Powering the next generation of global commerce. Built for developers by developers.
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="bottom" delay={0.2}>
                <h6 className="font-bold mb-4 uppercase text-xs tracking-widest">Products</h6>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="hover:text-white cursor-pointer transition">Payments</li>
                  <li className="hover:text-white cursor-pointer transition">Checkout</li>
                  <li className="hover:text-white cursor-pointer transition">Subscriptions</li>
                  <li className="hover:text-white cursor-pointer transition">Invoicing</li>
                </ul>
              </ScrollReveal>

              <ScrollReveal direction="bottom" delay={0.3}>
                <h6 className="font-bold mb-4 uppercase text-xs tracking-widest">Developers</h6>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="hover:text-white cursor-pointer transition">Documentation</li>
                  <li className="hover:text-white cursor-pointer transition">API Reference</li>
                  <li className="hover:text-white cursor-pointer transition">SDKs</li>
                  <li className="hover:text-white cursor-pointer transition">Status</li>
                </ul>
              </ScrollReveal>

              <ScrollReveal direction="bottom" delay={0.4}>
                <h6 className="font-bold mb-4 uppercase text-xs tracking-widest">Resources</h6>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="hover:text-white cursor-pointer transition">Pricing</li>
                  <li className="hover:text-white cursor-pointer transition">Support</li>
                  <li className="hover:text-white cursor-pointer transition">Privacy</li>
                  <li className="hover:text-white cursor-pointer transition">Terms</li>
                </ul>
              </ScrollReveal>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-white/40">
              <p>© 2026 Kopo Pay, Inc. All rights reserved.</p>
              <div className="flex gap-6">
                 <span>Privacy Policy</span>
                 <span>Terms of Service</span>
                 <span>Cookies</span>
              </div>
            </div>
          </div>
        </footer>
      </ScrollReveal>
    </main>
  );
}
