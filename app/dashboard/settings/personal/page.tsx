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
      intro="Keep identity, communication, and developer access together so the account owner can manage the section without jumping between unrelated areas."
      notes={[
        "Identity, recovery, and active sessions stay in one place.",
        "Communication preferences can be wired to email, SMS, and push APIs separately.",
        "Developer tools stay isolated from account-level business controls.",
      ]}
      nextSteps={[
        "Personal details API",
        "Communication preferences API",
        "Developer keys and webhook API",
      ]}
    />
  );
}
