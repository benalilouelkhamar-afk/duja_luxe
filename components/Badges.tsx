"use client";

import type { Product } from "@/data/products";
import { useLang } from "@/lib/i18n";

export function Badges({ product, className = "" }: { product: Product; className?: string }) {
  const { t } = useLang();
  const items: { label: string; cls: string }[] = [];
  if (!product.inStock) items.push({ label: t("badge_out"), cls: "bg-ink text-white" });
  else {
    if (product.isNew) items.push({ label: t("badge_new"), cls: "bg-plum text-white" });
    if (product.limited) items.push({ label: t("badge_limited"), cls: "bg-[#8a1f45] text-white" });
  }
  if (!items.length) return null;
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((b) => (
        <span key={b.label} className={`rounded-full px-2.5 py-1 text-[11px] font-bold leading-none shadow-sm ${b.cls}`}>
          {b.label}
        </span>
      ))}
    </div>
  );
}
