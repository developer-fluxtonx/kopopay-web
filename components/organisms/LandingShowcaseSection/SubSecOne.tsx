import React from "react";
import Link from "next/link";

const SubSecOne: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 shadow-[0_24px_100px_rgba(0,12,34,0.35)] md:px-10 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(42,206,209,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_28%)]" />

      <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70 backdrop-blur">
            Developer platform
          </div>

          <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[4.25rem] lg:leading-[0.98]">
            Reliable, extensible infrastructure for every stack.
            <span className="text-[#9DEEFF]"> Adapt Kopo Pay</span> to your business needs with flexible integration options.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            Accept payments, manage customers, and scale globally with infrastructure that fits
            the way your team already works.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/kopoPayDocs"
              className="inline-flex rounded-xl bg-gradient-action-button px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(42,206,209,0.32)] transition hover:translate-y-[-1px]"
            >
              View developer docs
            </Link>
              <button className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/25 hover:bg-white/10">
              View GitHub
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#071733] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
              <span>Integration flow</span>
              <span>Live</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-[0.9fr_1.2fr_1fr_1fr]">
              {["ERP", "Subscription", "Legacy billing", "Booking system"].map((item) => (
                <div
                  key={item}
                  className="flex min-h-[48px] items-center justify-center rounded-2xl border border-white/10 bg-[#22306E] px-2 py-3 text-center text-[9px] font-semibold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:px-3 sm:text-[10px] md:px-4 md:text-[11px]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="relative mt-6 flex h-[360px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 px-6 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(42,206,209,0.16),_transparent_34%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

              <div className="relative flex w-full items-center justify-center">
                <div className="absolute left-0 top-1/2 grid -translate-y-1/2 grid-cols-2 gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/95 text-[10px] font-bold text-[#000C22] shadow-lg">
                    ERP
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2ACED1]/30 bg-[#2ACED1]/15 text-[10px] font-bold text-[#9DEEFF] shadow-lg">
                    API
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/95 text-[10px] font-bold text-[#000C22] shadow-lg">
                    CRM
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#ffb86b]/30 bg-[#ffb86b]/15 text-[10px] font-bold text-[#ffd7a3] shadow-lg">
                    AI
                  </div>
                </div>

                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-[#2ACED1]/30 bg-[linear-gradient(135deg,#0A2A68,#1A49D8)] text-2xl font-black uppercase tracking-tight text-white shadow-[0_16px_40px_rgba(42,206,209,0.2)]">
                  K
                  <span className="absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_45%,rgba(255,255,255,0.08))] mix-blend-screen" />
                </div>

                <div className="absolute right-0 top-1/2 flex max-w-[42%] -translate-y-1/2 flex-col gap-3 sm:max-w-none">
                  {["SDK", "Event Destinations", "Data Pipeline"].map((item, index) => (
                    <div
                      key={item}
                      className={`max-w-full rounded-2xl border px-2.5 py-3 text-[10px] font-semibold leading-tight shadow-lg sm:px-3 sm:text-[11px] md:px-4 md:text-sm ${
                        index === 0
                          ? "border-[#2ACED1]/35 bg-[#2ACED1]/15 text-[#9DEEFF]"
                          : "border-white/10 bg-white/5 text-white"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <svg
                  viewBox="0 0 900 360"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <filter id="subOneGlow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g fill="none" strokeLinecap="round" filter="url(#subOneGlow)">
                    <path d="M215 140 C295 140 335 140 390 140" stroke="rgba(255,255,255,0.16)" strokeWidth="2" strokeDasharray="5 8" />
                    <path d="M515 140 C590 140 650 140 710 140" stroke="rgba(255,255,255,0.16)" strokeWidth="2" strokeDasharray="5 8" />
                    <path d="M215 220 C295 220 335 220 390 220" stroke="rgba(255,255,255,0.16)" strokeWidth="2" strokeDasharray="5 8" />
                    <path d="M515 220 C590 220 650 220 710 220" stroke="rgba(255,255,255,0.16)" strokeWidth="2" strokeDasharray="5 8" />
                    <path d="M220 140 C250 120 285 110 320 110" stroke="#2ACED1" strokeWidth="3" />
                    <path d="M220 220 C255 235 290 250 320 250" stroke="#2ACED1" strokeWidth="3" />
                    <path d="M580 140 C610 120 655 104 712 98" stroke="#2ACED1" strokeWidth="3" />
                    <path d="M580 220 C615 230 662 242 720 258" stroke="#2ACED1" strokeWidth="3" />
                  </g>

                  <g>
                    <circle cx="220" cy="140" r="10" fill="#2ACED1" />
                    <circle cx="220" cy="220" r="10" fill="#2ACED1" />
                    <circle cx="580" cy="140" r="10" fill="#2ACED1" />
                    <circle cx="580" cy="220" r="10" fill="#2ACED1" />
                    <circle cx="320" cy="110" r="7" fill="#7C4DFF" />
                    <circle cx="320" cy="250" r="7" fill="#FF8A65" />
                    <circle cx="712" cy="98" r="7" fill="#7C4DFF" />
                    <circle cx="720" cy="258" r="7" fill="#FF8A65" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubSecOne;
