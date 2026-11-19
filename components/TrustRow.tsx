"use client";

import { useLang } from "@/lib/i18n";
import { CashIcon, GemIcon, TruckIcon, WhatsAppIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function TrustRow() {
  const { t } = useLang();
  const items = [
    { icon: <TruckIcon width={24} height={24} />, label: t("trust_delivery") },
    { icon: <CashIcon width={24} height={24} />, label: t("trust_cod") },
    { icon: <GemIcon width={24} height={24} />, label: t("trust_quality") },
    { icon: <WhatsAppIcon width={24} height={24} />, label: t("trust_fast") },
  ];
  return (
    <section aria-label={t("trust_quality")} className="mx-auto max-w-7xl px-4 sm:px-6">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((it, k) => (
          <Reveal as="li" key={it.label} delay={k * 80} className="glass flex flex-col items-center gap-2 rounded-3xl px-3 py-5 text-center sm:flex-row sm:justify-center sm:text-start">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-plum text-white">{it.icon}</span>
            <span className="text-sm font-bold text-ink sm:text-[15px]">{it.label}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
