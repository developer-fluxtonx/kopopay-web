import { redirect } from "next/navigation";

export default function LegacyBrandingSettingsPage() {
  redirect("/dashboard/settings/account/stripe-profile");
}
