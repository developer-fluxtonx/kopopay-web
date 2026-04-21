import { notFound } from "next/navigation";
import { DocsPage } from "@/components/docs/kopoPayDocs/DocsPage";
import { docsPageMap } from "@/lib/kopoPayDocs/docsData";

export function renderDocsPage(slug: string[]) {
  const page = docsPageMap.get(slug.join("/"));

  if (!page) {
    notFound();
  }

  return <DocsPage page={page} />;
}
