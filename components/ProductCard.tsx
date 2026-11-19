"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { Badges } from "./Badges";
import { PriceTag } from "./PriceTag";
import { ProductImage } from "./ProductImage";
import { QuickAdd } from "./QuickAdd";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { t, tr } = useLang();
  const { add, setDrawerOpen } = useCart();
  const [quick, setQuick] = useState(false);
  const href = `/produit/${product.slug}`;
  const name = tr(product.name);

  const onAdd = () => {
    // Only one possible choice → add straight away, otherwise ask for size/color
    if (product.sizes.length === 1 && product.colors.length <= 1) {
      add({ productId: product.id, color: product.colors[0] ?? null, size: product.sizes[0], qty: 1 });
      setDrawerOpen(true);
    } else setQuick(true);
  };

  return (
    <article className="group glass flex h-full flex-col rounded-[22px] p-2.5 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-3">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#efe3f1]" tabIndex={-1} aria-hidden>
        <ProductImage
          src={product.images[0]}
          alt=""
          label={name}
          priority={priority}
          sizes="(min-width:1280px) 230px, (min-width:768px) 30vw, 46vw"
          className="transition duration-500 group-hover:scale-[1.04]"
        />
        <Badges product={product} className="absolute start-2 top-2" />
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 px-1 pt-3">
        <h3 className="text-[15px] font-bold leading-snug text-ink">
          <Link href={href} className="hover:text-plum">
            {name}
          </Link>
        </h3>
        <div className="min-h-7">
          <PriceTag product={product} />
        </div>
        <div className="mt-auto flex flex-col gap-2 pt-1.5">
          <Link
            href={href}
            className="rounded-full border border-plum/50 py-2 text-center text-[13px] font-bold text-plum-800 transition hover:bg-plum/10"
          >
            {t("view_details")}
          </Link>
          <button
            type="button"
            onClick={onAdd}
            disabled={!product.inStock}
            className="rounded-full bg-plum py-2 text-[13px] font-bold text-white transition hover:bg-plum-800 disabled:cursor-not-allowed disabled:bg-ink-soft/60"
          >
            {product.inStock ? t("add_to_cart") : t("badge_out")}
          </button>
        </div>
      </div>
      {quick && <QuickAdd product={product} open={quick} onClose={() => setQuick(false)} />}
    </article>
  );
}
