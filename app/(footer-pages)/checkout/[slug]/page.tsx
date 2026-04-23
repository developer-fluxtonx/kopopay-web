import { notFound } from "next/navigation";
import { EnterpriseSolutionPage } from "@/components/solutions/enterprise/EnterpriseSolutionPage";
import { getSolutionPage, solutionPages } from "@/components/solutions/solutionPages";

export function generateStaticParams() {
  return solutionPages.map((page) => ({ slug: page.slug }));
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSolutionPage(slug);

  if (!page) {
    notFound();
  }

  if (page.slug === "enterprise") {
    return <EnterpriseSolutionPage />;
  }

  notFound();
}
