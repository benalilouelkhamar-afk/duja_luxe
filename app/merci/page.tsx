import type { Metadata } from "next";
import { ThankYou } from "@/components/ThankYou";

export const metadata: Metadata = { title: "شكراً — Merci" };

export default function ThanksPage() {
  return (
    <div className="px-4 py-16">
      <ThankYou />
    </div>
  );
}
