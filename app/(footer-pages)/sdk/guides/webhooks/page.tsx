"use client";

import React from "react";
import { ScrollReveal } from "@/components/atoms/ScrollReveal";
import { Globe, Terminal, Copy, Check, ShieldCheck, ArrowRight, Zap, Info, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function WebhooksGuide() {
  const [copied, setCopied] = useState("");

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const steps = [
    {
      title: "Set up your endpoint",
      desc: "Create a route on your server that accepts POST requests with a JSON body. This endpoint will receive event data from Kopo Pay.",
      code: `app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['kopopay-signature'];
  let event;

  try {
    event = kopopay.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(\`Webhook Error: \${err.message}\`);
    return;
  }
  // Handle the event
  response.send();
});`,
      lang: "javascript",
    },
    {
      title: "Handle specific events",
      desc: "Use a switch statement to handle the event types your application cares about. Always return a 200 OK response quickly.",
      code: `switch (event.type) {
  case 'payment_intent.succeeded':
    const paymentIntent = event.data.object;
    // Fulfill the purchase...
    break;
  case 'payment_method.attached':
    const paymentMethod = event.data.object;
    // Handle PM attachment...
    break;
  default:
    console.log(\`Unhandled event type \${event.type}\`);
}`,
      lang: "javascript",
    },
    {
      title: "Register your endpoint",
      desc: "Go to the Developer Dashboard or use the API to register your webhook URL and select the events you want to receive.",
      code: `const webhookEndpoint = await kopopay.webhookEndpoints.create({
  url: 'https://example.com/webhook',
  enabled_events: [
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
  ],
});`,
      lang: "javascript",
    },
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12">
      <ScrollReveal>
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[#2ACED1] font-bold text-sm mb-4">
            <Globe className="w-4 h-4" /> Developer Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#000C22] dark:text-white mb-6">
            Webhooks
          </h1>
          <p className="text-lg text-[#000C22]/70 dark:text-[#D8F4F7]/70 leading-relaxed">
            Webhooks allow your application to react to events that happen in your Kopo Pay account, 
            like successful payments, subscription renewals, or dispute updates.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          <ScrollReveal>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 flex gap-6 mb-8">
              <ShieldCheck className="w-8 h-8 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-[#000C22] dark:text-white mb-1 text-sm">Security Best Practice</h4>
                <p className="text-xs text-[#000C22]/60 dark:text-[#D8F4F7]/60 leading-relaxed">
                  Always verify webhook signatures to ensure requests are coming from Kopo Pay. 
                  This prevents attackers from spoofing events to your server.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {steps.map((step, i) => (
            <ScrollReveal key={i} direction="bottom" delay={i * 0.1}>
              <div className="relative pl-12 border-l-2 border-[#2ACED1]/20">
                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-[#2ACED1] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-500/30">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-[#000C22] dark:text-white mb-3">{step.title}</h3>
                <p className="text-[#000C22]/60 dark:text-[#D8F4F7]/60 mb-6">{step.desc}</p>
                
                <div className="relative group">
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                    <button 
                      onClick={() => copy(step.code)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition"
                    >
                      {copied === step.code ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="bg-[#011B3B] rounded-2xl p-6 text-sm font-mono text-cyan-400/90 overflow-x-auto shadow-inner">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <aside className="space-y-8">
          <ScrollReveal direction="right">
            <div className="bg-white/50 dark:bg-[#011B3B]/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sticky top-28">
              <h4 className="font-bold text-[#000C22] dark:text-white mb-4">Webhook Details</h4>
              <ul className="space-y-3 text-sm text-[#000C22]/60 dark:text-[#D8F4F7]/50">
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Signature Verification</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Event Types List</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Retries & Failures</li>
                <li className="flex items-center gap-2 hover:text-[#2ACED1] cursor-pointer transition"><ChevronRight className="w-3 h-3" /> Best Practices</li>
              </ul>

              <div className="mt-8 pt-8 border-t border-white/5">
                <h4 className="font-bold text-[#000C22] dark:text-white mb-4">Testing Tools</h4>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between text-sm p-3 rounded-xl bg-white/5 hover:bg-[#2ACED1]/10 transition group">
                    <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-[#2ACED1]" /> Kopo Pay CLI</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                  <button className="w-full flex items-center justify-between text-sm p-3 rounded-xl bg-white/5 hover:bg-[#2ACED1]/10 transition group">
                    <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#2ACED1]" /> Event Logs</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </aside>
      </div>
    </div>
  );
}
