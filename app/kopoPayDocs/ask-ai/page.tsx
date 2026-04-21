import Link from "next/link";

const prompts = [
  "How do I create my first payment integration?",
  "What's the fastest way to go live in sandbox?",
  "How should I structure a marketplace flow?",
];

export default function AskAiPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#011B3B] md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
          Ask AI
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#000C22] dark:text-white md:text-4xl">
          Ask a docs question and jump straight to the right page.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#000C22]/70 dark:text-[#D8F4F7]/70 md:text-lg">
          This is a lightweight docs helper page. Use it as a quick entry point into the docs
          structure without adding a heavy AI experience yet.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#011B3B] md:p-8">
          <label className="block">
            <span className="text-sm font-medium text-[#000C22]/70 dark:text-[#D8F4F7]/70">
              Ask a question
            </span>
            <textarea
              placeholder="What do you want to build?"
              className="mt-3 min-h-40 w-full rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-[#000C22] outline-none transition focus:border-[#2ACED1] dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <button className="rounded-xl bg-gradient-action-button px-5 py-3 text-sm font-semibold text-white">
              Search docs
            </button>
            <Link
              href="/kopoPayDocs"
              className="rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold text-[#000C22] transition hover:border-[#2ACED1]/30 hover:text-[#008E96] dark:border-white/10 dark:text-white"
            >
              Back to docs home
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-black/5 bg-[#F8FEFE] p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
          <h2 className="text-lg font-semibold text-[#000C22] dark:text-white">Popular prompts</h2>
          <div className="mt-4 grid gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                className="rounded-2xl border border-black/5 bg-white px-4 py-3 text-left text-sm text-[#000C22]/80 transition hover:border-[#2ACED1]/30 hover:bg-[#2ACED1]/5 dark:border-white/10 dark:bg-[#011B3B] dark:text-[#D8F4F7]/80"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

