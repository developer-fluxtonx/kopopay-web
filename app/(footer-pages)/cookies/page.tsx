"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";

export default function CookiesPolicyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#000C22] dark:text-white mb-6 tracking-tight">Cookies Policy</h1>
          <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 text-sm font-medium uppercase tracking-wider">Last updated: April 22, 2026</p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <div className="prose prose-lg dark:prose-invert prose-headings:text-[#000C22] dark:prose-headings:text-white prose-a:text-[#2ACED1] max-w-none text-[#000C22]/80 dark:text-[#D8F4F7]/80 leading-relaxed">
          <p>
            This Cookie Policy explains how Kopo Pay ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
          
          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">1. What are cookies?</h3>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">2. Why do we use cookies?</h3>
          <p>
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">3. How can I control cookies?</h3>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4 border-b border-[#2ACED1]/20 pb-2">4. Updates to this policy</h3>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
