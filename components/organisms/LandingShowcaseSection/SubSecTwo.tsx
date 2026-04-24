import React, { useEffect, useState } from "react";

const companies = ["Stripe", "PayPal", "Visa", "Mastercard", "Square", "Adyen", "KopoPay"];

const SubSecTwo: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % companies.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 shadow-[0_24px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl md:px-10 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(42,206,209,0.14),_transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:26px_26px] opacity-40" />

      <div className="relative mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
            Orchestration network
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
            Connect existing systems without changing the stack.
          </h3>
        </div>

        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#2ACED1] shadow-[0_0_16px_rgba(42,206,209,0.9)]" />
          {companies[current]}
        </div>
      </div>

      <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/10 px-3 py-10 backdrop-blur-xl md:min-h-[560px] md:px-8 md:py-14">
        <svg
          viewBox="0 0 1200 500"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Integration diagram"
        >
          <defs>
            <linearGradient id="coreGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#0F7C86" />
              <stop offset="100%" stopColor="#2ACED1" />
            </linearGradient>
            <filter id="connectorGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g fill="none" strokeLinecap="round" filter="url(#connectorGlow)">
            <path d="M215 96 H385" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeDasharray="6 8" />
            <path d="M385 96 H525" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeDasharray="6 8" />
            <path d="M525 96 H690" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeDasharray="6 8" />
            <path d="M690 96 H855" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeDasharray="6 8" />

            <path d="M425 188 V250" stroke="rgba(42,206,209,0.65)" strokeWidth="2.5" strokeDasharray="6 8" />
            <path d="M595 188 V250" stroke="rgba(42,206,209,0.65)" strokeWidth="2.5" strokeDasharray="6 8" />
            <path d="M595 250 H825" stroke="rgba(42,206,209,0.65)" strokeWidth="2.5" strokeDasharray="6 8" />
            <path d="M350 250 H540" stroke="rgba(42,206,209,0.65)" strokeWidth="2.5" strokeDasharray="6 8" />
            <path d="M602 325 V390" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeDasharray="5 8" />
            <path d="M586 390 C586 405 566 418 540 418" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
            <path d="M618 390 C618 405 638 418 664 418" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
          </g>

          <g>
            <rect x="245" y="58" width="96" height="44" rx="12" fill="#2ACED1" fillOpacity="0.16" stroke="#2ACED1" strokeOpacity="0.65" strokeWidth="1.2" />
            <text x="293" y="87" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700">ERP</text>

            <rect x="415" y="58" width="160" height="44" rx="12" fill="#2ACED1" fillOpacity="0.16" stroke="#2ACED1" strokeOpacity="0.65" strokeWidth="1.2" />
            <text x="495" y="87" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700">Subscriptions</text>

            <rect x="620" y="58" width="170" height="44" rx="12" fill="#2ACED1" fillOpacity="0.16" stroke="#2ACED1" strokeOpacity="0.65" strokeWidth="1.2" />
            <text x="705" y="87" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700">Legacy billing</text>

            <rect x="820" y="58" width="180" height="44" rx="12" fill="#2ACED1" fillOpacity="0.16" stroke="#2ACED1" strokeOpacity="0.65" strokeWidth="1.2" />
            <text x="910" y="87" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700">Booking system</text>

            <rect x="388" y="142" width="86" height="44" rx="12" fill="#2ACED1" fillOpacity="0.18" stroke="#2ACED1" strokeOpacity="0.7" />
            <text x="431" y="171" textAnchor="middle" fill="#9DEEFF" fontSize="17" fontWeight="700">SDK</text>

            <rect x="610" y="142" width="178" height="44" rx="12" fill="#2ACED1" fillOpacity="0.18" stroke="#2ACED1" strokeOpacity="0.7" />
            <text x="699" y="171" textAnchor="middle" fill="#9DEEFF" fontSize="17" fontWeight="700">Event Destinations</text>

            <rect x="298" y="230" width="180" height="46" rx="12" fill="#2ACED1" fillOpacity="0.15" stroke="#2ACED1" strokeOpacity="0.65" strokeWidth="1" />
            <text x="388" y="259" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="700">
              App Marketplace
            </text>

            <rect x="691" y="232" width="154" height="44" rx="12" fill="#2ACED1" fillOpacity="0.15" stroke="#2ACED1" strokeOpacity="0.65" strokeWidth="1" />
            <text x="768" y="260" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="700">
              Data Pipeline
            </text>

            <rect x="556" y="204" width="88" height="88" rx="18" fill="url(#coreGrad)" />
            <rect x="558" y="206" width="84" height="84" rx="16" fill="rgba(0,0,0,0.16)" />
            <image
              href="/brand-logos/kopoPayLogo.png"
              x="570"
              y="214"
              width="60"
              height="68"
              preserveAspectRatio="xMidYMid meet"
            />

            <rect x="552" y="314" width="96" height="40" rx="12" fill="#2ACED1" fillOpacity="0.18" stroke="#2ACED1" strokeOpacity="0.65" strokeWidth="1" />
            <text x="600" y="338" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">
              Orchestration
            </text>

            <rect x="517" y="410" width="66" height="42" rx="12" fill="#2ACED1" fillOpacity="0.18" stroke="#2ACED1" strokeOpacity="0.65" strokeWidth="1" />
            <rect x="617" y="410" width="66" height="42" rx="12" fill="#2ACED1" fillOpacity="0.18" stroke="#2ACED1" strokeOpacity="0.65" strokeWidth="1" />
            <text x="550" y="437" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700">
              PSP
            </text>
            <text x="650" y="437" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700">
              PSP
            </text>

            <g transform="translate(90 214)">
              <rect x="0" y="0" width="160" height="114" rx="24" fill="#ffffff" fillOpacity="0.04" stroke="#2ACED1" strokeOpacity="0.18" />
              <rect x="20" y="18" width="34" height="34" rx="10" fill="#2ACED1" fillOpacity="0.9" />
              <rect x="62" y="18" width="34" height="34" rx="10" fill="#1AB7BE" fillOpacity="0.9" />
              <rect x="20" y="62" width="34" height="34" rx="10" fill="#38D7DA" fillOpacity="0.9" />
              <rect x="62" y="62" width="34" height="34" rx="10" fill="#0F9CA6" fillOpacity="0.9" />
              <circle cx="126" cy="34" r="16" fill="#2ACED1" fillOpacity="0.45" />
              <circle cx="126" cy="34" r="8" fill="#9DEEFF" />
              <circle cx="126" cy="78" r="16" fill="#2ACED1" fillOpacity="0.32" />
              <circle cx="126" cy="78" r="8" fill="#ffffff" />
            </g>

            <rect x="986" y="250" width="56" height="56" rx="14" fill="#fff" fillOpacity="0.92" />
            <rect x="997" y="260" width="12" height="28" rx="6" fill="#2ACED1" />
            <rect x="1012" y="255" width="12" height="36" rx="6" fill="#034E78" />
            <rect x="1027" y="266" width="12" height="22" rx="6" fill="#2ACED1" />
          </g>
        </svg>
      </div>
    </section>
  );
};

export default SubSecTwo;
