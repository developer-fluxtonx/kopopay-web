import { notFound } from "next/navigation";
import { DocsPage } from "@/components/docs/kopoPayDocs/DocsPage";
import { docsPageMap, docsPages } from "@/lib/kopoPayDocs/docsData";

export const dynamicParams = true;

export function generateStaticParams() {
  return docsPages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function KopoPayDocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug : [];

  if (slug.length === 0) {
    notFound();
  }

  const page = docsPageMap.get(slug.join("/"));

  if (!page) {
    notFound();
  }

  return <DocsPage page={page} />;
}
