import React from "react";

const SubSecThird: React.FC = () => {
  return (
    <section className="relative w-full pt-16 md:pt-24">
      <div className="relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[4rem] lg:leading-[0.95]">
            Scale with confidence.
            <span className="text-white/65"> Handle thousands of transactions per second with consistent speed and reliability, even during peak traffic periods.</span>
          </h2>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/10 px-4 py-10 md:px-8 md:py-14">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="waveLeft" x1="0" x2="1">
                <stop offset="0%" stopColor="#ffb18c" />
                <stop offset="100%" stopColor="#ff7eb3" />
              </linearGradient>
              <linearGradient id="waveRight" x1="0" x2="1">
                <stop offset="0%" stopColor="#8a3dff" />
                <stop offset="100%" stopColor="#c86cff" />
              </linearGradient>
              <filter id="waveBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.6" />
              </filter>
            </defs>

            <g filter="url(#waveBlur)" opacity="0.95">
              {[...Array(34)].map((_, index) => (
                <path
                  key={index}
                  d={`M0 ${158 + index * 2} C220 ${112 + index}, 360 ${198 - index * 0.7}, 520 ${150 + index * 0.55} C690 ${98 + index}, 840 ${100 + index * 0.55}, 1200 ${72 + index * 0.7}`}
                  stroke={index < 16 ? "url(#waveLeft)" : "url(#waveRight)"}
                  strokeOpacity={0.18 + index * 0.014}
                  strokeWidth={2.1}
                  fill="none"
                />
              ))}
            </g>
          </svg>

          <div className="relative z-10 flex flex-col gap-10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                Reliability
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
                Built to keep every transaction moving smoothly.
              </h3>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { value: "500M+", label: "API requests per day", accent: "from-[#ffbf99] to-[#ff7eb3]" },
                { value: "10K+", label: "API requests per second", accent: "from-[#ff8fe6] to-[#c86cff]" },
                { value: "150K+", label: "Transactions per minute", accent: "from-[#9a8cff] to-[#6d7dff]" },
              ].map((item) => (
                <div key={item.value} className="space-y-2">
                  <div className={`bg-gradient-to-r ${item.accent} bg-clip-text text-5xl font-semibold tracking-[-0.05em] text-transparent md:text-6xl`}>
                    {item.value}
                  </div>
                  <p className="max-w-[14rem] text-sm font-medium leading-6 text-white/75">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubSecThird;
