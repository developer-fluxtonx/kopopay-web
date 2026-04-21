import Link from "next/link";
import { docsFeaturedLinks, docsTopCategories } from "@/lib/kopoPayDocs/docsData";

export default function KopoPayDocsHomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#011B3B] md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
          Kopo pay Docs
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#000C22] dark:text-white md:text-4xl">
          Search docs, browse guides, and get building fast.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#000C22]/70 dark:text-[#D8F4F7]/70 md:text-lg">
          A simple docs home with clean navigation, fast pages, and one place for product and API
          guides.
        </p>
      </section>

      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#011B3B] md:p-8">
        <h2 className="text-lg font-semibold text-[#000C22] dark:text-white">Popular paths</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {docsFeaturedLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-black/5 px-4 py-4 transition hover:border-[#2ACED1]/25 hover:bg-[#2ACED1]/5 dark:border-white/10 dark:hover:bg-white/5"
            >
              <p className="text-sm font-semibold text-[#000C22] dark:text-white">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                Open this section and continue into its related pages.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-black/5 bg-[#F8FEFE] p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <h2 className="text-lg font-semibold text-[#000C22] dark:text-white">Browse all sections</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {docsTopCategories.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-medium text-[#000C22]/80 transition hover:border-[#2ACED1]/30 hover:bg-[#2ACED1]/5 dark:border-white/10 dark:bg-[#011B3B] dark:text-[#D8F4F7]/80"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
