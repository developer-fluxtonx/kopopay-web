import React from "react";
import Link from "next/link";
import { Button } from "../atoms/Button";
import { motion, useScroll, useTransform } from "framer-motion";

export const Navbar = () => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ["border-transparent", "border-black/5 dark:border-white/5"]
  );

  return (
    <motion.header
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b border-transparent dark:bg-[#000C22]/80"
    >
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-action-button flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-[#000C22] dark:text-white">
            Kopo Pay
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#000C22]/80 dark:text-[#D8F4F7]/80">
          <Link href="#products" className="hover:text-[#2ACED1] transition-colors">Products</Link>
          <Link href="#solutions" className="hover:text-[#2ACED1] transition-colors">Solutions</Link>
          <Link href="#developers" className="hover:text-[#2ACED1] transition-colors">Developers</Link>
          <Link href="#pricing" className="hover:text-[#2ACED1] transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="hidden sm:inline-block font-medium text-sm hover:text-[#2ACED1] transition-colors">
            Sign in
          </Link>
          <Button variant="primary" size="sm" className="hidden sm:inline-flex rounded-full px-5">
            Start now <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
