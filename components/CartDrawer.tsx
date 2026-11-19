"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { toItems, useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { CartLines } from "./CartLines";
import { CartSummary } from "./CartSummary";
import { BagIcon, CloseIcon, WhatsAppIcon } from "./Icons";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, count, total, openOrder } = useCart();
  const { t, lang } = useLang();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setDrawerOpen(false), [pathname, setDrawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a,button,input,select,textarea");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [drawerOpen, setDrawerOpen]);

  if (!drawerOpen) return null;
  const rtl = lang === "ar";
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-plum-900/50 backdrop-blur-[2px]" onClick={() => setDrawerOpen(false)} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("your_cart")}
        tabIndex={-1}
        className={`absolute inset-y-0 ${rtl ? "left-0 animate-slide-in-left" : "right-0 animate-slide-in-right"} flex w-[min(420px,100vw)] flex-col bg-glass shadow-2xl outline-none`}
      >
        <div className="flex items-center justify-between bg-plum px-5 py-4 text-white">
          <p className="flex items-center gap-2 text-lg font-bold">
            <BagIcon /> {t("your_cart")} <span className="text-sm font-medium text-white/80">({count})</span>
          </p>
          <button type="button" onClick={() => setDrawerOpen(false)} aria-label={t("close")} className="grid size-9 place-items-center rounded-full hover:bg-white/15">
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="text-lg text-ink">{t("cart_empty")}</p>
            <Link href="/#products" onClick={() => setDrawerOpen(false)} className="rounded-full bg-plum px-6 py-3 font-bold text-white hover:bg-plum-800">
              {t("continue_shopping")}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <CartLines onNavigate={() => setDrawerOpen(false)} />
            </div>
            <div className="space-y-3 border-t border-plum/15 bg-white/60 p-5">
              <CartSummary />
              <button
                type="button"
                onClick={() => openOrder({ items: toItems(lines), fromCart: true })}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f7a4c] px-4 py-3.5 font-bold text-white transition hover:bg-[#186640]"
              >
                <WhatsAppIcon />
                <span>
                  {t("order_now")}
                  {total !== null && <span className="whitespace-nowrap"> · {formatPrice(total, lang)}</span>}
                </span>
              </button>
              <button type="button" onClick={() => setDrawerOpen(false)} className="block w-full text-center text-sm font-medium text-plum-800 underline-offset-4 hover:underline">
                {t("continue_shopping")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
