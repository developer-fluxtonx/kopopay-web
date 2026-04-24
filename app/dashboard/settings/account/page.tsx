import { SettingsSectionLanding } from "@/components/templates/SettingsSectionLanding";
import { settingsGroups } from "../settings.config";

const group = settingsGroups.find((item) => item.id === "account")!;

if (!group) {
  throw new Error("Account settings group is missing from the registry.");
}

export default function AccountSettingsGroupPage() {
  return (
    <SettingsSectionLanding
      group={group}
      intro="Business identity, team access, public profile, compliance, and perks all belong together because they define how the account operates."
    />
  );
}
