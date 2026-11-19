"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { getProduct, products, type ColorId } from "@/data/products";
import { settings } from "@/data/settings";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { directMessage } from "@/lib/order";
import { waLink } from "@/lib/whatsapp";
import { Badges } from "./Badges";
import { CashIcon, ChevronIcon, RulerIcon, TruckIcon, WhatsAppIcon } from "./Icons";
import { ColorPicker, SizePicker } from "./OptionPickers";
import { PriceTag } from "./PriceTag";
import { ProductCard } from "./ProductCard";
import { ProductImage } from "./ProductImage";
import { QtyStepper } from "./QtyStepper";
import { SectionTitle } from "./SectionTitle";
import { SizeGuideModal } from "./SizeGuide";

export function ProductDetail({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const { t, tr, lang } = useLang();
  const { add, setDrawerOpen } = useCart();
  const [color, setColor] = useState<ColorId | null>(product.colors[0] ?? null);
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [sizeErr, setSizeErr] = useState(false);
  const [guide, setGuide] = useState(false);
  const [img, setImg] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);

  const images = product.images.length ? product.images : [undefined];
  const name = tr(product.name);

  const related = [
    ...products.filter((p) => p.id !== product.id && p.category === product.category),
    ...products.filter((p) => p.id !== product.id && p.category !== product.category && p.images.length),
  ].slice(0, 4);

  const requireSize = () => {
    if (size) return true;
    setSizeErr(true);
    sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    sizeRef.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
    return false;
  };

  const onAdd = () => {
    if (!requireSize()) return;
    add({ productId: product.id, color, size: size!, qty });
    setDrawerOpen(true);
  };

  const onWhatsApp = () => {
    if (!requireSize()) return;
    const url = `${window.location.origin}/produit/${product.slug}`;
    window.open(waLink(directMessage({ productId: product.id, color, size: size!, qty }, lang, url)), "_blank", "noopener");
  };

  const goTo = (k: number) => {
    setImg(k);
    const el = track.current;
    if (el) el.scrollTo({ left: (lang === "ar" ? -1 : 1) * k * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-6 pt-6 sm:px-6 sm:pt-10">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/90">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">{t("home")}</Link>
          </li>
          <li aria-hidden><ChevronIcon width={14} height={14} className={lang === "ar" ? "rotate-180" : ""} /></li>
          <li>
            <Link href="/#products" className="hover:underline">{t("nav_products")}</Link>
          </li>
          <li aria-hidden><ChevronIcon width={14} height={14} className={lang === "ar" ? "rotate-180" : ""} /></li>
          <li aria-current="page" className="font-bold text-white">{name}</li>
        </ol>
      </nav>

      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        {/* Gallery */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="glass relative rounded-[28px] p-2.5">
            <div
              ref={track}
              className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-[22px]"
              onScroll={(e) => {
                const el = e.currentTarget;
                setImg(Math.round(Math.abs(el.scrollLeft) / el.clientWidth));
              }}
              aria-label={name}
            >
              {images.map((src, k) => (
                <div key={k} className="relative aspect-[4/5] w-full shrink-0 snap-center bg-[#efe3f1]">
                  <ProductImage src={src} alt={`${name} — ${t("photo_of")} ${k + 1}`} label={name} priority={k === 0} sizes="(min-width:768px) 45vw, 92vw" />
                </div>
              ))}
            </div>
            <Badges product={product} className="absolute start-5 top-5" />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
              {images.map((src, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => goTo(k)}
                  aria-label={`${t("photo_of")} ${k + 1}`}
                  aria-current={img === k}
                  className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl transition sm:w-20 ${img === k ? "ring-3 ring-plum" : "opacity-75 ring-1 ring-white hover:opacity-100"}`}
                >
                  <ProductImage src={src} alt="" label="" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="glass relative rounded-[28px] p-5 sm:p-7">
          <Badges product={product} className="mb-3" />
          <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{name}</h1>
          <p className="mt-1 font-serif text-sm tracking-wider text-ink-soft" lang={lang === "ar" ? "fr" : "ar"}>
            {lang === "ar" ? product.name.fr : product.name.ar}
          </p>
          <div className="mt-4">
            <PriceTag product={product} large />
          </div>

          <div className="mt-6 space-y-5">
            {product.colors.length > 0 && <ColorPicker name="pd" options={product.colors} value={color} onChange={setColor} />}
            <div ref={sizeRef}>
              <SizePicker
                name="pd"
                options={product.sizes}
                value={size}
                onChange={(s) => {
                  setSize(s);
                  setSizeErr(false);
                }}
                error={sizeErr}
              />
              <button type="button" onClick={() => setGuide(true)} className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-bold text-plum-800 underline underline-offset-4">
                <RulerIcon width={18} height={18} /> {t("size_guide")}
              </button>
            </div>
            <div>
              <p className="mb-2 text-sm font-bold text-ink">{t("quantity")}</p>
              <QtyStepper value={qty} onChange={setQty} label={name} />
            </div>
          </div>

          {product.inStock ? (
            <div className="mt-7 flex flex-col gap-3">
              <button type="button" onClick={onAdd} className="rounded-full bg-plum py-4 text-base font-bold text-white shadow-lift transition duration-200 hover:-translate-y-0.5 hover:bg-plum-800">
                {t("add_to_cart")}
              </button>
              <button type="button" onClick={onWhatsApp} className="flex items-center justify-center gap-2 rounded-full bg-[#1f7a4c] py-4 text-base font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#186640]">
                <WhatsAppIcon /> {t("order_whatsapp")}
              </button>
            </div>
          ) : (
            <div className="mt-7 space-y-3">
              <p className="rounded-2xl bg-ink/5 p-4 text-sm text-ink">{t("out_of_stock_msg")}</p>
              <a href={waLink(`${settings.nameWithSparkle} — ${name}`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#1f7a4c] py-4 font-bold text-white hover:bg-[#186640]">
                <WhatsAppIcon /> {t("contact_whatsapp")}
              </a>
            </div>
          )}

          <div className="mt-8 space-y-6 border-t border-plum/15 pt-6">
            <section>
              <h2 className="mb-2 text-lg font-extrabold text-ink">{t("description")}</h2>
              {tr(product.description)
                .split("\n")
                .map((line, k) => (
                  <p key={k} className="leading-loose text-ink">{line}</p>
                ))}
            </section>
            <section>
              <h2 className="mb-3 text-lg font-extrabold text-ink">{t("delivery_payment")}</h2>
              <ul className="space-y-2.5 text-[15px] text-ink">
                <li className="flex gap-2.5">
                  <TruckIcon className="mt-0.5 shrink-0 text-plum" />
                  <span>
                    {tr(settings.delivery.freeDelivery ? settings.delivery.freeDeliveryNote : settings.delivery.zones)} — {tr(settings.delivery.delay)}
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <CashIcon className="mt-0.5 shrink-0 text-plum" />
                  <span>{tr(settings.payment.method)} — {tr(settings.payment.note)}</span>
                </li>
              </ul>
              <Link href="/echange" className="mt-3 inline-block text-sm font-bold text-plum-800 underline underline-offset-4">
                {t("page_exchange")}
              </Link>
            </section>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-16">
          <SectionTitle id="related-title" title={t("you_may_like")} />
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <SizeGuideModal open={guide} onClose={() => setGuide(false)} />
    </div>
  );
}
