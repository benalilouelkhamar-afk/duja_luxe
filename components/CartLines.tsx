"use client";

import Link from "next/link";
import { colors, getProductById, imagesFor } from "@/data/products";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { ProductImage } from "./ProductImage";
import { QtyStepper } from "./QtyStepper";
import { TrashIcon } from "./Icons";

export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, setQty, remove } = useCart();
  const { t, tr, lang } = useLang();
  return (
    <ul className="divide-y divide-plum/10">
      {lines.map((l) => {
        const p = getProductById(l.productId);
        if (!p) return null;
        return (
          <li key={l.key} className="flex gap-3 py-3">
            <Link
              href={`/produit/${p.slug}`}
              onClick={onNavigate}
              className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-2xl bg-mauve-200"
            >
              <ProductImage src={imagesFor(p, l.color)[0]} alt={tr(p.name)} label={tr(p.name)} sizes="80px" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <Link href={`/produit/${p.slug}`} onClick={onNavigate} className="font-bold leading-snug text-ink hover:text-plum">
                  {tr(p.name)}
                </Link>
                <button
                  type="button"
                  onClick={() => remove(l.key)}
                  aria-label={`${t("remove")} — ${tr(p.name)}`}
                  className="grid size-8 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-plum/10 hover:text-plum-800"
                >
                  <TrashIcon width={17} height={17} />
                </button>
              </div>
              <p className="text-xs text-ink-soft">
                {l.color && (
                  <>
                    <span
                      className="me-1 inline-block size-2.5 rounded-full align-middle ring-1 ring-black/15"
                      style={{ background: colors[l.color].hex }}
                    />
                    {tr(colors[l.color].label)} ·{" "}
                  </>
                )}
                {t("size")}: {l.size}
              </p>
              <div className="mt-auto flex items-center justify-between gap-2">
                <QtyStepper value={l.qty} onChange={(q) => setQty(l.key, q)} small label={tr(p.name)} />
                <span className="text-sm font-bold text-plum-800">
                  {p.price === null ? t("price_whatsapp") : formatPrice(p.price * l.qty, lang)}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
