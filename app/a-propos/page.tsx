import type { Metadata } from "next";
import { AboutPage } from "@/components/InfoPages";

export const metadata: Metadata = { title: "من نحن — À propos" };

export default function Page() {
  return <AboutPage />;
}
