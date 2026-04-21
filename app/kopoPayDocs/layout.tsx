import type { ReactNode } from "react";
import { DocsShell } from "@/components/docs/kopoPayDocs/DocsShell";

export default function KopoPayDocsLayout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}

