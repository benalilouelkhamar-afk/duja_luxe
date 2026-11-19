"use client";

import { colors, getProductById, imagesFor } from "@/data/products";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { Modal } from "./Modal";
import { OrderForm } from "./OrderForm";
import { ProductImage } from "./ProductImage";

/** "Commander maintenant" sheet: short recap of what is ordered + the delivery form. */
export function OrderSheet() {
  const { order, closeOrder } = useCart();
  const { t, tr, lang } = useLang();
  if (!order) return null;
  return (
    <Modal open onClose={closeOrder} title={t("order_now")}>
      <ul className="mb-5 space-y-2.5 rounded-2xl bg-white/70 p-3 ring-1 ring-plum/10">
        {order.items.map((l, k) => {
          const p = getProductById(l.productId);
          if (!p) return null;
          return (
            <li key={k} className="flex items-center gap-3">
              <div className="relative aspect-[4/5] w-12 shrink-0 overflow-hidden rounded-xl bg-mauve-200">
                <ProductImage src={imagesFor(p, l.color)[0]} alt="" label="" sizes="48px" />
              </div>
              <div className="min-w-0 flex-1 text-sm">
                <p className="truncate font-bold text-ink">{tr(p.name)}</p>
                <p className="text-xs text-ink-soft">
                  {l.color && `${tr(colors[l.color].label)} · `}
                  {t("size")}: {l.size} · ×{l.qty}
                </p>
              </div>
              <span className="text-sm font-bold text-plum-800">
                {p.price === null ? t("price_whatsapp") : formatPrice(p.price * l.qty, lang)}
              </span>
            </li>
          );
        })}
      </ul>
      <h3 className="mb-3 font-extrabold text-ink">{t("checkout_title")}</h3>
      <OrderForm items={order.items} fromCart={order.fromCart} />
    </Modal>
  );
}
