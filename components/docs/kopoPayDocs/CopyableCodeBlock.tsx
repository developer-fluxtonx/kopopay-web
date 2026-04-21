"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyableCodeBlockProps {
  code: string;
}

export function CopyableCodeBlock({ code }: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const buttonLabel = useMemo(() => (copied ? "Copied" : "Copy"), [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-black/5 bg-black/[0.03] dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#000C22]/35 dark:border-white/10 dark:text-[#D8F4F7]/35">
        <span>Example</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#000C22]/65 transition hover:border-[#2ACED1]/30 hover:text-[#008E96] dark:border-white/10 dark:bg-[#011B3B] dark:text-[#D8F4F7]/65"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {buttonLabel}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-xs leading-6 text-[#000C22]/80 dark:text-[#D8F4F7]/80">
        <code>{code}</code>
      </pre>
    </div>
  );
}
