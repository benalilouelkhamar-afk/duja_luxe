"use client";

import Image from "next/image";
import { settings } from "@/data/settings";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Reviews() {
  const { t, tr } = useLang();
  const shots = settings.reviewScreenshots;
  return (
    <section aria-labelledby="reviews-title" className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionTitle id="reviews-title" title={t("reviews_title")} sub={t("reviews_sub")} />
      {shots.length > 0 ? (
        <ul className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:px-0">
          {shots.map((src, k) => (
            <li key={src} className="w-[62vw] max-w-64 shrink-0 snap-center md:w-auto md:max-w-none">
              <div className="glass rounded-[24px] p-2">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-mauve-200">
                  <Image src={src} alt={`${t("review_alt")} ${k + 1}`} fill sizes="(min-width:768px) 22vw, 62vw" className="object-cover" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        // DEMO reviews — replaced automatically when settings.reviewScreenshots is filled
        <ul className="grid gap-4 md:grid-cols-3">
          {settings.demoReviews.map((r, k) => (
            <Reveal as="li" key={r.name} delay={k * 100} className="glass flex flex-col gap-3 rounded-3xl p-5">
              <p aria-label="5/5" className="text-lg tracking-widest text-[#b0791e]">★★★★★</p>
              <p className="leading-relaxed text-ink">“{tr(r.text)}”</p>
              <p className="mt-auto text-sm font-bold text-plum-800">{r.name}</p>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
