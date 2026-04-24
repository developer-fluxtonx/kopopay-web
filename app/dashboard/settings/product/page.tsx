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
    />
  );
}
