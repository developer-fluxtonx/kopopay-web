import { redirect } from "next/navigation";

export default function LegacyPaymentsSettingsPage() {
  redirect("/dashboard/settings/product/payments");
}
