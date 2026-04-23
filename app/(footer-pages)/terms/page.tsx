"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-[800px] mx-auto px-6">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight">Terms of Service</h1>
          <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 text-sm font-medium uppercase tracking-wider">Effective Date: April 22, 2026</p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <div className="prose prose-lg dark:prose-invert prose-headings:text-[#000C22] dark:prose-headings:text-white prose-a:text-[#2ACED1] max-w-none text-[#000C22]/80 dark:text-[#D8F4F7]/80 leading-relaxed">
          <p>
            Welcome to Kopo Pay. These Terms of Service ("Terms") govern your access to and use of our website, APIs, and other services (collectively, the "Services"). Please read them carefully.
          </p>
          
          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">1. Agreement to Terms</h3>
          <p>
            By using our Services, you agree to be bound by these Terms. If you don&apos;t agree to be bound by these Terms, do not use the Services. If you are accessing and using the Services on behalf of a company (such as your employer) or other legal entity, you represent and warrant that you have the authority to bind that company or other legal entity to these Terms.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">2. Changes to Terms or Services</h3>
          <p>
            We may update the Terms at any time, in our sole discretion. If we do so, we&apos;ll let you know either by posting the updated Terms on the Site or through other communications. It&apos;s important that you review the Terms whenever we update them.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">3. Account Registration</h3>
          <p>
            To use certain features of the Services, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">4. Prohibited Uses</h3>
          <p>
            You agree not to do any of the following:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4 marker:text-[#2ACED1]">
            <li>Post, upload, publish, submit or transmit any content that infringes, misappropriates or violates a third party&apos;s patent, copyright, trademark, trade secret, moral rights or other intellectual property rights.</li>
            <li>Use, display, mirror or frame the Services or any individual element within the Services.</li>
            <li>Access, tamper with, or use non-public areas of the Services, our computer systems, or the technical delivery systems of our providers.</li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">5. Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by law, Kopo Pay shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
