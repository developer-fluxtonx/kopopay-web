"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 text-sm font-medium uppercase tracking-wider">Last updated: April 22, 2026</p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <div className="prose prose-lg dark:prose-invert prose-headings:text-[#000C22] dark:prose-headings:text-white prose-a:text-[#2ACED1] max-w-none text-[#000C22]/80 dark:text-[#D8F4F7]/80 leading-relaxed">
          <p>
            At Kopo Pay, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our payment infrastructure services. We obsess over protecting your data as much as we obsess over code quality.
          </p>
          
          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">1. Information We Collect</h3>
          <p>
            We may collect information about you in a variety of ways. The information we may collect via the Site includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4 marker:text-[#2ACED1]">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
            <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">2. Use of Your Information</h3>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4 marker:text-[#2ACED1]">
            <li>Create and manage your account.</li>
            <li>Process your transactions and send you related information.</li>
            <li>Respond to customer service requests and support needs.</li>
            <li>Increase the efficiency and operation of the Site.</li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">3. Security of Your Information</h3>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">4. Contact Us</h3>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@kopopay.com" className="font-semibold hover:underline">privacy@kopopay.com</a>.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
