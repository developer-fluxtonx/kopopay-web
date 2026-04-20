import { SettingsSectionLanding } from "@/components/templates/SettingsSectionLanding";
import { settingsGroups } from "../settings.config";

const group = settingsGroups.find((item) => item.id === "product")!;

if (!group) {
  throw new Error("Product settings group is missing from the registry.");
}

export default function ProductSettingsGroupPage() {
  return (
    <SettingsSectionLanding
      group={group}
      intro="Billing, financial connections, managed payments, Radar, and Sigma each map to a product surface that can grow independently."
      notes={[
        "Billing and invoicing can evolve separately from payment checkout behavior.",
        "Risk, reporting, and managed payments stay modular for backend integration.",
        "Each nested route is ready to become a product-specific settings API.",
      ]}
      nextSteps={[
        "Billing API",
        "Payments configuration API",
        "Risk and analytics service wiring",
      ]}
    />
  );
}
