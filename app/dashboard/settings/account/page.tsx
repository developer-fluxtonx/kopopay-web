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
      notes={[
        "Business and legal details are separated from public profile data.",
        "Team access and security controls stay close to the account owner.",
        "Compliance and perks can be wired to backend services without changing the folder tree.",
      ]}
      nextSteps={[
        "Business profile API",
        "Team and security API",
        "Compliance and document sync API",
      ]}
    />
  );
}
