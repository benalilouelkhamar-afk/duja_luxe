"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { WhatsAppIcon } from "./Icons";
import { LAST_ORDER_KEY, type LastOrder } from "./OrderForm";

export function ThankYou() {
  const { t, lang } = useLang();
  const [order, setOrder] = useState<LastOrder | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LAST_ORDER_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read the order saved just before the redirect
      if (raw) setOrder(JSON.parse(raw) as LastOrder);
    } catch {
      /* ignore */
    }
  }, []);
  const title = order?.name ? `${t("thanks")} ${order.name}${lang === "fr" ? " !" : "!"}` : `${t("thanks")}${lang === "fr" ? " !" : "!"}`;
  return (
    <div className="glass mx-auto max-w-lg animate-pop rounded-[28px] p-8 text-center sm:p-10">
      <p className="text-5xl" aria-hidden>🤍</p>
      <h1 className="mt-4 text-3xl font-extrabold text-ink">{title}</h1>
      {order?.ref && (
        <p className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-sm text-ink ring-1 ring-plum/15">
          {t("reference")}: <bdi dir="ltr" className="font-extrabold tracking-wider text-plum-800">{order.ref}</bdi>
        </p>
      )}
      <p className="mt-4 text-lg leading-relaxed text-ink">{t("thanks_text")}</p>
      {order?.url && (
        <div className="mt-6">
          <p className="text-sm text-ink-soft">{t("reopen_hint")}</p>
          <a
            href={order.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#1f7a4c] px-6 py-3 font-bold text-white transition hover:bg-[#186640]"
          >
            <WhatsAppIcon width={18} height={18} /> {t("reopen_whatsapp")}
          </a>
        </div>
      )}
      <div className="mt-6">
        <Link href="/" className="inline-block rounded-full bg-plum px-7 py-3.5 font-bold text-white hover:bg-plum-800">
          {t("back_home")}
        </Link>
      </div>
    </div>
  );
}
