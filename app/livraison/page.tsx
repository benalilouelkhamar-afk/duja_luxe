import type { Metadata } from "next";
import { DeliveryPage } from "@/components/InfoPages";

export const metadata: Metadata = { title: "التوصيل والدفع — Livraison et paiement" };

export default function Page() {
  return <DeliveryPage />;
}
