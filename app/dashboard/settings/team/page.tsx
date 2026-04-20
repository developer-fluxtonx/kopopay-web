import { redirect } from "next/navigation";

export default function LegacyTeamSettingsPage() {
  redirect("/dashboard/settings/account/team-security");
}
