import Link from "next/link";
import { docsPages, type DocsPageData } from "@/lib/kopoPayDocs/docsData";
import { CopyableCodeBlock } from "./CopyableCodeBlock";

interface DocsPageProps {
  page: DocsPageData;
}

const toAnchorId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function DocsPage({ page }: DocsPageProps) {
  const visibleSections = page.sections.slice(0, 6);
  const pageIndex = docsPages.findIndex((item) => item.slug.join("/") === page.slug.join("/"));
  const prevPage = pageIndex > 0 ? docsPages[pageIndex - 1] : undefined;
  const nextPage = pageIndex >= 0 && pageIndex < docsPages.length - 1 ? docsPages[pageIndex + 1] : undefined;

  return (
    <article className="space-y-8">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#011B3B] md:p-8">
        <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#000C22]/45 dark:text-[#D8F4F7]/45">
          <Link href="/kopoPayDocs" className="transition hover:text-[#008E96] dark:hover:text-[#9DEEFF]">
            Kopo Pay Docs
          </Link>
          <span>/</span>
          <Link
            href={`/kopoPayDocs/${page.slug[0]}`}
            className="transition hover:text-[#008E96] dark:hover:text-[#9DEEFF]"
          >
            {page.section}
          </Link>
          {page.slug.length > 1 && (
            <>
              <span>/</span>
              <span className="text-[#000C22]/70 dark:text-[#D8F4F7]/70">{page.title}</span>
            </>
          )}
        </nav>

        <div className="inline-flex items-center rounded-full border border-[#2ACED1]/20 bg-[#2ACED1]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#008E96] dark:text-[#9DEEFF]">
          {page.eyebrow}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#000C22] dark:text-white md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#000C22]/70 dark:text-[#D8F4F7]/70 md:text-lg">
          {page.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
          <span className="rounded-full border border-[#2ACED1]/20 bg-[#2ACED1]/8 px-3 py-1 text-[#008E96] dark:text-[#9DEEFF]">
            {page.eyebrow}
          </span>
          <span className="rounded-full border border-black/5 bg-black/[0.03] px-3 py-1 text-[#000C22]/55 dark:border-white/10 dark:bg-white/5 dark:text-[#D8F4F7]/55">
            {page.section}
          </span>
          {page.apiMeta && (
            <>
              <span className="rounded-full border border-black/5 bg-black/[0.03] px-3 py-1 text-[#000C22]/55 dark:border-white/10 dark:bg-white/5 dark:text-[#D8F4F7]/55">
                {page.apiMeta.method}
              </span>
              <span className="rounded-full border border-black/5 bg-black/[0.03] px-3 py-1 text-[#000C22]/55 dark:border-white/10 dark:bg-white/5 dark:text-[#D8F4F7]/55">
                {page.apiMeta.auth ?? "API ready"}
              </span>
            </>
          )}
        </div>
      </section>

      {page.apiMeta && (
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              Method
            </p>
            <p className="mt-2 text-sm font-semibold text-[#000C22] dark:text-white">{page.apiMeta.method}</p>
          </div>
          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              Endpoint
            </p>
            <p className="mt-2 text-sm font-semibold text-[#000C22] dark:text-white">{page.apiMeta.endpoint}</p>
          </div>
          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
              Notes
            </p>
            <p className="mt-2 text-sm font-semibold text-[#000C22] dark:text-white">
              {page.apiMeta.note ?? "Ready for integration"}
            </p>
          </div>
        </section>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        {page.highlights.map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <p className="text-sm font-semibold text-[#000C22] dark:text-white">{item}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#011B3B] md:p-8">
          <h2 className="text-lg font-semibold text-[#000C22] dark:text-white">Quick steps</h2>
          <ol className="mt-4 space-y-3">
            {page.steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-[#000C22]/70 dark:text-[#D8F4F7]/70">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2ACED1]/10 text-[11px] font-semibold text-[#008E96]">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-3xl border border-black/5 bg-[#F8FEFE] p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
          <h2 className="text-lg font-semibold text-[#000C22] dark:text-white">Related pages</h2>
          <div className="mt-4 grid gap-2">
            {page.related.length > 0 ? (
              page.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm transition hover:border-[#2ACED1]/30 hover:bg-[#2ACED1]/5 dark:border-white/10 dark:bg-[#011B3B] dark:text-white"
                >
                  <span className="block font-medium">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-[#000C22]/50 dark:text-[#D8F4F7]/50">
                    {item.description}
                  </span>
                </Link>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-[#000C22]/55 dark:border-white/10 dark:text-[#D8F4F7]/55">
                No related pages yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="grid gap-4">
          {page.sections.map((section) => {
            const anchorId = toAnchorId(section.title);

            return (
              <div
                key={section.title}
                id={anchorId}
                className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm scroll-mt-32 dark:border-white/10 dark:bg-[#011B3B] md:p-8"
              >
                <h2 className="text-lg font-semibold text-[#000C22] dark:text-white">{section.title}</h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-[#000C22]/70 dark:text-[#D8F4F7]/70">
                  {section.body}
                </p>
                {section.bullets && (
                  <ul className="mt-4 grid gap-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-6 text-[#000C22]/70 dark:text-[#D8F4F7]/70">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2ACED1]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.code && <CopyableCodeBlock code={section.code} />}
              </div>
            );
          })}
        </div>

        {visibleSections.length > 1 && (
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#011B3B]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                On this page
              </p>
              <nav className="mt-4 grid gap-1">
                {visibleSections.map((section) => {
                  const anchorId = toAnchorId(section.title);

                  return (
                    <a
                      key={section.title}
                      href={`#${anchorId}`}
                      className="rounded-2xl px-3 py-2 text-sm text-[#000C22]/70 transition hover:bg-black/[0.03] hover:text-[#008E96] dark:text-[#D8F4F7]/70 dark:hover:bg-white/5 dark:hover:text-[#9DEEFF]"
                    >
                      {section.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}
      </section>

      {(prevPage || nextPage) && (
        <section className="grid gap-3 md:grid-cols-2">
          {prevPage ? (
            <Link
              href={`/kopoPayDocs/${prevPage.slug.join("/")}`}
              className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm transition hover:border-[#2ACED1]/30 hover:bg-[#2ACED1]/5 dark:border-white/10 dark:bg-[#011B3B] dark:hover:bg-white/5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                Previous
              </p>
              <p className="mt-2 text-sm font-semibold text-[#000C22] dark:text-white">{prevPage.title}</p>
              <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                {prevPage.description}
              </p>
            </Link>
          ) : (
            <div className="rounded-3xl border border-dashed border-black/10 p-5 text-sm text-[#000C22]/50 dark:border-white/10 dark:text-[#D8F4F7]/50">
              Start of docs
            </div>
          )}
          {nextPage ? (
            <Link
              href={`/kopoPayDocs/${nextPage.slug.join("/")}`}
              className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm transition hover:border-[#2ACED1]/30 hover:bg-[#2ACED1]/5 dark:border-white/10 dark:bg-[#011B3B] dark:hover:bg-white/5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#000C22]/35 dark:text-[#D8F4F7]/35">
                Next
              </p>
              <p className="mt-2 text-sm font-semibold text-[#000C22] dark:text-white">{nextPage.title}</p>
              <p className="mt-1 text-xs leading-5 text-[#000C22]/55 dark:text-[#D8F4F7]/55">
                {nextPage.description}
              </p>
            </Link>
          ) : (
            <div className="rounded-3xl border border-dashed border-black/10 p-5 text-sm text-[#000C22]/50 dark:border-white/10 dark:text-[#D8F4F7]/50">
              End of docs
            </div>
          )}
        </section>
      )}
    </article>
  );
}
