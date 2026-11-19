"use client";

import { settings } from "@/data/settings";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useLang } from "@/lib/i18n";

export function CartSummary() {
  const { total } = useCart();
  const { t, tr, lang } = useLang();
  return (
    <dl className="space-y-1.5 text-sm">
      <div className="flex justify-between">
        <dt className="text-ink-soft">{t("delivery")}</dt>
        <dd className="font-medium text-ink">
          {settings.delivery.freeDelivery ? t("free") : tr(settings.delivery.feesNote)}
        </dd>
      </div>
      <div className="flex justify-between text-base">
        <dt className="font-bold">{t("total")}</dt>
        <dd className="font-extrabold text-plum-800">{total === null ? t("total_whatsapp") : formatPrice(total, lang)}</dd>
      </div>
    </dl>
  );
}
