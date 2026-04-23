export interface SolutionPageEntry {
  slug: string;
  label: string;
}

export const solutionPages: SolutionPageEntry[] = [
  {
    slug: "enterprise",
    label: "Enterprise",
  },
];

export const getSolutionPage = (slug: string) =>
  solutionPages.find((page) => page.slug === slug) ?? null;
