import { Activity, BookOpen, Code, FileText, Shield, Terminal } from "lucide-react";
import { DashboardSurfacePage } from "@/components/templates/DashboardSurfacePage";
import {
  developerDocsItems,
  developerMoreItems,
  developerPrimaryItems,
  resolveDeveloperContext,
} from "@/components/organisms/dashboardSidebar.config";

const totalDeveloperRoutes =
  developerPrimaryItems.length + developerMoreItems.length + developerDocsItems.length;

export default function DeveloperSurfacePage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const segments = params.slug ?? [];
  const context = resolveDeveloperContext(segments);
  const currentHref =
    segments.length === 0
      ? "/dashboard/developer"
      : `/dashboard/developer/${segments.join("/")}`;

  const links = context.children
    .filter((item) => item.href !== currentHref)
    .map((item) => ({
      label: item.label,
      description: item.description,
      href: item.href,
      icon: item.icon,
      accent: item.accent,
    }));

  const stats =
    context.kind === "root"
      ? [
          {
            label: "Primary tools",
            value: "4",
            detail: "Overview, webhooks, events, and logs.",
            icon: "Code",
            accent: "#2ACED1",
          },
          {
            label: "Documentation",
            value: "7",
            detail: "API reference, SDKs, CLI, and more.",
            icon: "BookOpen",
            accent: "#034E78",
          },
          {
            label: "Nested routes",
            value: `${totalDeveloperRoutes}`,
            detail: "Every dialog entry has a route target.",
            icon: "FileText",
            accent: "#008E96",
          },
          {
            label: "Inspector",
            value: "Ready",
            detail: "More flyout, docs, and tools are wired together.",
            icon: "Shield",
            accent: "#0E7490",
          },
        ]
      : [
          {
            label: "Route",
            value: "Live",
            detail: "The path exists in the new developer tree.",
            icon: "Activity",
            accent: "#2ACED1",
          },
          {
            label: "Context",
            value: context.section?.label ?? "Developer",
            detail: "Nested tooling stays grouped by workflow.",
            icon: "Code",
            accent: "#034E78",
          },
          {
            label: "Docs",
            value: "Connected",
            detail: "References remain accessible from one dialog.",
            icon: "BookOpen",
            accent: "#008E96",
          },
          {
            label: "Tooling",
            value: "Fast",
            detail: "Optimized for compact, keyboard-friendly navigation.",
            icon: "Terminal",
            accent: "#0E7490",
          },
        ];

  return (
    <DashboardSurfacePage
      breadcrumb={context.breadcrumb}
      tag={context.kind === "root" ? "Developer tools" : context.section?.label ?? "Developer"}
      title={context.title}
      description={context.description}
      icon={context.icon}
      accent={context.accent}
      primaryAction={{ label: "Back to developer", href: "/dashboard/developer" }}
      secondaryAction={
        context.section ? { label: `Open ${context.section.label}`, href: context.section.href } : undefined
      }
      stats={stats}
      links={links}
      notes={[
        context.note,
        "The sidebar dialog routes directly to the same destinations as the surface pages.",
        "More flyout items and documentation pages are ready for backend wiring.",
      ]}
      nextSteps={context.nextSteps}
      snippetTitle="Example payload"
      snippet={`{
  "route": "${currentHref}",
  "title": "${context.title}",
  "status": "ready"
}`}
    />
  );
}
