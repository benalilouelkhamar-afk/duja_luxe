import type { Metadata } from "next";
import { ExchangePage } from "@/components/InfoPages";

export const metadata: Metadata = { title: "سياسة الاستبدال — Politique d'échange" };

export default function Page() {
  return <ExchangePage />;
}
