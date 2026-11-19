import type { Metadata } from "next";
import { ContactPage } from "@/components/InfoPages";

export const metadata: Metadata = { title: "تواصلي معنا — Contact" };

export default function Page() {
  return <ContactPage />;
}
