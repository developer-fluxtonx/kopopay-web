import { redirect } from "next/navigation";

export default function LegacyNotificationsSettingsPage() {
  redirect("/dashboard/settings/personal/communication");
}
