"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { settings, type CategoryId } from "@/data/settings";
import { useLang } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";
import { SectionTitle } from "./SectionTitle";

export function ProductsSection() {
  const { t, tr } = useLang();
  const [cat, setCat] = useState<CategoryId>("all");
  const list = useMemo(() => (cat === "all" ? products : products.filter((p) => p.category === cat)), [cat]);

  return (
    <section id="products" aria-labelledby="products-title" className="mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6">
      <SectionTitle id="products-title" title={t("our_products")} />
      <div role="group" aria-label={t("our_products")} className="no-scrollbar -mx-4 mb-7 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {settings.categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            aria-pressed={cat === c.id}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition duration-200 ${
              cat === c.id ? "bg-plum text-white shadow-lift" : "glass text-plum-800 hover:bg-white"
            }`}
          >
            {tr(c.label)}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="glass mx-auto max-w-md rounded-3xl p-6 text-center text-ink">{t("no_products")}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" aria-live="polite">
          {list.map((p, k) => (
            <li key={p.id} className="animate-pop" style={{ animationDelay: `${Math.min(k, 10) * 40}ms` }}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
