import { BarChart3, Code, FileText, Package, Shield, Wallet } from "lucide-react";
import { DashboardSurfacePage } from "@/components/templates/DashboardSurfacePage";
import {
  productOperationsSection,
  productSidebarSections,
  resolveProductContext,
} from "@/components/organisms/dashboardSidebar.config";

const countLeafRoutes = () =>
  productSidebarSections.reduce((total, section) => total + section.items.length, 0) +
  productOperationsSection.items.length;

export default function ProductSurfacePage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const segments = params.slug ?? [];
  const context = resolveProductContext(segments);
  const currentHref =
    segments.length === 0
      ? "/dashboard/products"
      : `/dashboard/products/${segments.join("/")}`;

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
            label: "Sections",
            value: "5",
            detail: "Payments, Billing, Reporting, More, and Operations.",
            icon: "Package",
            accent: "#2ACED1",
          },
          {
            label: "Routes",
            value: `${countLeafRoutes()}`,
            detail: "Every leaf is registered in one file.",
            icon: "FileText",
            accent: "#034E78",
          },
          {
            label: "API-ready",
            value: "Yes",
            detail: "Each group can attach to its own backend service.",
            icon: "Code",
            accent: "#008E96",
          },
          {
            label: "Focus",
            value: "Product",
            detail: "Stripe-style product surfaces with Kopo Pay styling.",
            icon: "BarChart3",
            accent: "#0E7490",
          },
        ]
          : [
          {
            label: "Leaf routes",
            value: `${Math.max(context.children.length, 1)}`,
            detail: "Nested pages stay isolated and ready for APIs.",
            icon: "FileText",
            accent: "#2ACED1",
          },
          {
            label: "Sibling pages",
            value: `${context.section?.items.length ?? 0}`,
            detail: "Related pages stay grouped under the same surface.",
            icon: "Package",
            accent: "#034E78",
          },
          {
            label: "Status",
            value: "Ready",
            detail: "The route exists and can accept real data later.",
            icon: "Shield",
            accent: "#008E96",
          },
          {
            label: "Owner",
            value: context.section?.label ?? "Operations",
            detail: "One shared navigation contract owns the surface.",
            icon: "Wallet",
            accent: "#0E7490",
          },
        ];

  return (
    <DashboardSurfacePage
      breadcrumb={context.breadcrumb}
      tag={context.kind === "root" ? "Product catalog" : context.section?.label ?? "Product"}
      title={context.title}
      description={context.description}
      icon={context.icon}
      accent={context.accent}
      primaryAction={{ label: "Back to catalog", href: "/dashboard/products" }}
      secondaryAction={
        context.section ? { label: `Open ${context.section.label}`, href: context.section.href } : undefined
      }
      stats={stats}
      links={links}
      notes={[
        context.note,
        "Every page in this tree can map to a dedicated API handler later.",
        "The sidebar registry and route resolver stay in sync.",
      ]}
      nextSteps={context.nextSteps}
      snippetTitle="Route example"
      snippet={currentHref}
    />
  );
}
