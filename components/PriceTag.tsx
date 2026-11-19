"use client";

import type { Product } from "@/data/products";
import { settings } from "@/data/settings";
import { formatPrice } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

/** Price, or — when price is null — a WhatsApp pill asking for the price. */
export function PriceTag({ product, large = false }: { product: Product; large?: boolean }) {
  const { t, tr, lang } = useLang();
  if (product.price !== null) {
    return <span className={`font-extrabold text-plum-800 ${large ? "text-3xl" : "text-base"}`}>{formatPrice(product.price, lang)}</span>;
  }
  const msg =
    lang === "ar"
      ? `السلام عليكم ${settings.nameWithSparkle} بغيت نعرف الثمن ديال: ${tr(product.name)} 🙏`
      : `Bonjour ${settings.nameWithSparkle}, je voudrais connaître le prix de : ${tr(product.name)} 🙏`;
  return (
    <a
      href={waLink(msg)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#e3f4ea] font-bold text-[#17603b] ring-1 ring-[#17603b]/20 transition hover:bg-[#d2eedd] ${
        large ? "px-4 py-2 text-base" : "px-2 py-1 text-[11px] sm:text-xs"
      }`}
      aria-label={`${t("price_whatsapp")} — ${tr(product.name)}`}
    >
      <WhatsAppIcon width={large ? 18 : 14} height={large ? 18 : 14} />
      {t("price_whatsapp")}
    </a>
  );
}
