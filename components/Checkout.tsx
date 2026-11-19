"use client";

import Link from "next/link";
import { toItems, useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { CartLines } from "./CartLines";
import { CartSummary } from "./CartSummary";
import { OrderForm } from "./OrderForm";

/** /cart page: cart on one side, the same "Commander maintenant" form on the other. */
export function Checkout() {
  const { lines } = useCart();
  const { t } = useLang();

  if (lines.length === 0) {
    return (
      <div className="glass mx-auto max-w-md rounded-[28px] p-8 text-center">
        <p className="text-lg text-ink">{t("cart_empty")}</p>
        <Link href="/#products" className="mt-5 inline-block rounded-full bg-plum px-6 py-3 font-bold text-white hover:bg-plum-800">
          {t("continue_shopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <section aria-labelledby="cart-lines-title" className="glass rounded-[28px] p-5 sm:p-6 lg:self-start">
        <h2 id="cart-lines-title" className="mb-2 text-xl font-extrabold text-ink">{t("your_cart")}</h2>
        <CartLines />
        <div className="mt-3 border-t border-plum/15 pt-4">
          <CartSummary />
        </div>
      </section>

      <section aria-labelledby="co-title" className="glass rounded-[28px] p-5 sm:p-6">
        <h2 id="co-title" className="mb-4 text-xl font-extrabold text-ink">{t("checkout_title")}</h2>
        <OrderForm items={toItems(lines)} fromCart />
      </section>
    </div>
  );
}
