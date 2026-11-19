import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = { title: "السلة — Panier" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageTitle k="your_cart" />
      <Checkout />
    </div>
  );
}
