"use client";

import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useLang } from "@/lib/i18n";

/** Price, or "السعر عبر واتساب" while the price is not set (price: null). */
export function PriceTag({ product, large = false }: { product: Product; large?: boolean }) {
  const { t, lang } = useLang();
  if (product.price !== null) {
    return <span className={`font-extrabold text-plum-800 ${large ? "text-3xl" : "text-base"}`}>{formatPrice(product.price, lang)}</span>;
  }
  return (
    <span className={`inline-block whitespace-nowrap rounded-full bg-plum/8 font-bold text-plum-800 ${large ? "px-4 py-1.5 text-base" : "px-2 py-0.5 text-[11px] sm:text-xs"}`}>
      {t("price_whatsapp")}
    </span>
  );
}
