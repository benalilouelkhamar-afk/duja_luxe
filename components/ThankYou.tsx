"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { WhatsAppIcon } from "./Icons";

export function ThankYou() {
  const { t } = useLang();
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read the last order link saved before redirect
      setUrl(sessionStorage.getItem("duja-last-order"));
    } catch {
      /* ignore */
    }
  }, []);
  return (
    <div className="glass mx-auto max-w-lg animate-pop rounded-[28px] p-8 text-center sm:p-10">
      <p className="text-5xl" aria-hidden>🤍</p>
      <h1 className="mt-4 text-3xl font-extrabold text-ink">{t("thanks_title")}</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink">{t("thanks_text")}</p>
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#17603b] underline underline-offset-4">
          <WhatsAppIcon width={18} height={18} /> {t("thanks_reopen")}
        </a>
      )}
      <div className="mt-7">
        <Link href="/" className="inline-block rounded-full bg-plum px-7 py-3.5 font-bold text-white hover:bg-plum-800">
          {t("back_home")}
        </Link>
      </div>
    </div>
  );
}
