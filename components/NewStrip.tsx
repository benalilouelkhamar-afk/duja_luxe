"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useLang } from "@/lib/i18n";
import { ProductImage } from "./ProductImage";

/** Horizontal "Dispo الآن" strip of new items. */
export function NewStrip() {
  const { t, tr } = useLang();
  const items = products.filter((p) => p.isNew && p.inStock);
  if (!items.length) return null;
  return (
    <section aria-labelledby="dispo-title" className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="glass rounded-[28px] p-4 sm:p-5">
        <div className="mb-3 flex items-baseline justify-between gap-3 px-1">
          <h2 id="dispo-title" className="text-xl font-extrabold text-ink">
            {t("dispo_now")} <span aria-hidden>🇲🇦🚛</span>
          </h2>
          <p className="text-sm text-ink-soft">{t("new_arrivals_sub")}</p>
        </div>
        <ul className="no-scrollbar -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
          {items.map((p) => (
            <li key={p.id} className="w-32 shrink-0 snap-start sm:w-36">
              <Link href={`/produit/${p.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#efe3f1] ring-1 ring-white">
                  <ProductImage src={p.images[0]} alt="" label={tr(p.name)} sizes="144px" className="transition duration-500 group-hover:scale-105" />
                  <span className="absolute start-1.5 top-1.5 rounded-full bg-plum px-2 py-0.5 text-[10px] font-bold text-white">{t("badge_new")}</span>
                </div>
                <p className="mt-1.5 truncate text-center text-sm font-bold text-ink group-hover:text-plum">{tr(p.name)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
