import { SettingsSectionLanding } from "@/components/templates/SettingsSectionLanding";
import { settingsGroups } from "../settings.config";

const group = settingsGroups.find((item) => item.id === "personal")!;

if (!group) {
  throw new Error("Personal settings group is missing from the registry.");
}

export default function PersonalSettingsGroupPage() {
  return (
    <SettingsSectionLanding
      group={group}
      intro="Keep identity, verification, communication, and developer access together so the account owner can manage personal compliance work without jumping between unrelated areas."
    />
  );
}
