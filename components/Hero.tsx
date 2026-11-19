"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { products } from "@/data/products";
import { settings } from "@/data/settings";
import { useLang } from "@/lib/i18n";
import { ChevronIcon } from "./Icons";
import { ProductImage } from "./ProductImage";

/** Products shown in the hero carousel: the ones with a photo, new ones first. */
const slides = products
  .filter((p) => p.images.length > 0 && p.inStock)
  .sort((a, b) => Number(b.isNew) - Number(a.isNew))
  .slice(0, 6);

export function Hero() {
  const { t, tr, lang } = useLang();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  // only mount slides that were shown (or are next) so the page loads one big photo first
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  const show = useCallback((k: number) => {
    setI(k);
    setSeen((s) => (s.has(k) ? s : new Set(s).add(k)));
  }, []);
  const go = useCallback((d: number) => show((i + d + n) % n), [i, n, show]);

  // pre-load the next slide once the current one is shown
  useEffect(() => {
    const id = setTimeout(() => setSeen((s) => (s.has((i + 1) % n) ? s : new Set(s).add((i + 1) % n))), 1200);
    return () => clearTimeout(id);
  }, [i, n]);

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [paused, go, n]);

  const cur = slides[i];
  const small = slides[(i + 1) % n];
  const rtl = lang === "ar";
  // In RTL, "next" visually sits on the left.
  const prevSide = rtl ? "right-1 sm:-right-4" : "left-1 sm:-left-4";
  const nextSide = rtl ? "left-1 sm:-left-4" : "right-1 sm:-right-4";

  return (
    <section id="top" aria-label="DUJA LUXE" className="relative overflow-hidden">
      {/* soft light blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 start-1/3 size-96 rounded-full bg-mauve/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-40 -end-20 size-80 rounded-full bg-[#f3c6e6]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-8 sm:px-6 md:grid-cols-2 md:gap-8 md:pb-20 md:pt-14">
        {/* Text (start side = right in Arabic) */}
        <div className="animate-fade-up text-white">
          <p className="font-serif text-sm font-bold tracking-[0.35em] text-lilac">DUJA LUXE</p>
          <p className="mt-3 inline-block rounded-full bg-white/12 px-3.5 py-1.5 text-sm font-medium ring-1 ring-white/25"><bdi dir="ltr">Dispo 🇲🇦🚛</bdi> · {t("trust_delivery")}</p>
          <h1 className="mt-4 text-[2.6rem] font-extrabold leading-[1.15] sm:text-6xl lg:text-7xl">
            <span className="block">{t("hero_title_1")}</span>
            <span className="block text-[#f6dcf7]">{t("hero_title_2")}</span>
          </h1>
          <div className="glass mt-6 max-w-xl rounded-3xl p-4 text-[15px] leading-relaxed text-ink sm:p-5 sm:text-base">{t("hero_text")}</div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/#products"
              className="rounded-full bg-lilac px-7 py-3.5 font-bold text-plum-800 shadow-lift transition duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              {t("shop_now")}
            </Link>
            <Link
              href="/#about"
              className="rounded-full px-6 py-3.5 font-bold text-white ring-1 ring-white/70 transition duration-200 hover:bg-white/10"
            >
              {t("discover_duja")}
            </Link>
          </div>
          <div className="mt-7 flex items-center gap-3 text-sm text-white/90">
            <span aria-hidden className="h-px w-10 bg-white/60" />
            {t("hero_tag")}
            {settings.delivery.freeDelivery && <span className="hidden sm:inline">· {lang === "ar" ? "توصيل مجاني" : "Livraison gratuite"}</span>}
          </div>
        </div>

        {/* Carousel */}
        {n > 0 && (
          <div
            className="relative mx-auto w-full max-w-[420px] pb-14 md:max-w-[460px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) go((dx < 0 ? 1 : -1) * (rtl ? -1 : 1));
              touchX.current = null;
            }}
            role="region"
            aria-roledescription="carousel"
            aria-label={t("curated")}
          >
            {/* Big card */}
            <div className="glass relative ms-6 rounded-[28px] p-3 sm:ms-10">
              <Link href={`/produit/${cur.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-[#efe3f1]" aria-label={tr(cur.name)}>
                {slides.map((s, k) => (
                  <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`}
                    aria-hidden={k !== i}
                  >
                    {seen.has(k) && (
                      <ProductImage src={s.images[0]} alt={tr(s.name)} label={tr(s.name)} priority={k === 0} sizes="(min-width:768px) 420px, 85vw" />
                    )}
                  </div>
                ))}
              </Link>
            </div>

            {/* Small overlapping card (bottom-left) */}
            <div className="glass absolute bottom-6 left-0 w-[34%] rotate-[-4deg] rounded-[20px] p-1.5 transition-transform duration-300 hover:rotate-0">
              <button type="button" onClick={() => go(1)} className="relative block aspect-square w-full overflow-hidden rounded-[16px] bg-[#efe3f1]" aria-label={`${t("next")}: ${tr(small.name)}`}>
                <ProductImage src={small.images[0]} alt="" label={tr(small.name)} sizes="160px" />
              </button>
            </div>

            {/* Floating info card */}
            <div key={cur.id} className="glass animate-pop absolute end-0 top-6 max-w-[62%] rounded-2xl px-3.5 py-3 sm:-end-3">
              <p className="text-[11px] font-bold text-plum">{t("curated")} ✨</p>
              <p className="mt-0.5 truncate text-sm font-extrabold text-ink" aria-live="polite">
                {tr(cur.name)}
              </p>
              <Link href={`/produit/${cur.slug}`} className="mt-2 inline-block rounded-full bg-plum px-3 py-1 text-[11px] font-bold text-white hover:bg-plum-800">
                {t("discover_product")}
              </Link>
            </div>

            {/* Arrows */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t("prev")}
              className={`absolute top-[42%] ${prevSide} grid size-11 place-items-center rounded-full bg-white/90 text-plum-800 shadow-lift transition hover:scale-105`}
            >
              <ChevronIcon className={rtl ? "" : "rotate-180"} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t("next")}
              className={`absolute top-[42%] ${nextSide} grid size-11 place-items-center rounded-full bg-white/90 text-plum-800 shadow-lift transition hover:scale-105`}
            >
              <ChevronIcon className={rtl ? "rotate-180" : ""} />
            </button>

            {/* Dots */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5">
              {slides.map((s, k) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => show(k)}
                  aria-label={`${t("slide")} ${k + 1} / ${n}`}
                  aria-current={k === i}
                  className="grid h-6 min-w-6 place-items-center"
                >
                  <span className={`block h-2 rounded-full transition-all duration-300 ${k === i ? "w-7 bg-plum-800" : "w-2 bg-plum-800/35"}`} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
