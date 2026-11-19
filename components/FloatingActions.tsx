"use client";

import { useEffect, useRef, useState } from "react";
import { settings } from "@/data/settings";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { ArrowUpIcon, CloseIcon, WhatsAppIcon } from "./Icons";

type Msg = { from: "bot" | "me"; text: string };

export function FloatingActions() {
  const { t, tr, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [asked, setAsked] = useState<number[]>([]);
  const [showTop, setShowTop] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [asked]);

  const messages: Msg[] = [{ from: "bot", text: t("ask_hello") }];
  for (const i of asked) {
    messages.push({ from: "me", text: tr(settings.faq[i].q) }, { from: "bot", text: tr(settings.faq[i].a) });
  }

  return (
    <>
      {/* Ask DUJA — bottom-left */}
      <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-3">
        {open && (
          <div
            ref={panelRef}
            role="dialog"
            aria-label={t("ask_duja")}
            className="glass animate-pop flex max-h-[70dvh] w-[min(340px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <div className="flex items-center justify-between bg-plum px-4 py-3 text-white">
              <p className="font-bold">{t("ask_duja")}</p>
              <button type="button" onClick={() => setOpen(false)} aria-label={t("close")} className="grid size-8 place-items-center rounded-full hover:bg-white/15">
                <CloseIcon width={18} height={18} />
              </button>
            </div>
            <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-4" aria-live="polite">
              {messages.map((m, i) => (
                <p
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.from === "bot" ? "rounded-ss-sm bg-white text-ink" : "ms-auto rounded-se-sm bg-plum text-white"
                  }`}
                >
                  {m.text}
                </p>
              ))}
            </div>
            <div className="space-y-2 border-t border-plum/10 p-3">
              <div className="flex flex-wrap gap-1.5">
                {settings.faq.map((f, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAsked((a) => [...a.filter((x) => x !== i), i])}
                    className="rounded-full border border-plum/30 bg-white px-3 py-1.5 text-xs font-medium text-plum-800 transition hover:bg-plum hover:text-white"
                  >
                    {tr(f.q)}
                  </button>
                ))}
              </div>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#1f7a4c] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#186640]"
              >
                <WhatsAppIcon width={18} height={18} /> {t("contact_whatsapp")}
              </a>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="rounded-full bg-plum px-5 py-3 text-sm font-bold text-white shadow-lift ring-2 ring-white/50 transition duration-200 hover:-translate-y-0.5 hover:bg-plum-800"
        >
          {t("ask_duja")}
        </button>
      </div>

      {/* Back to top — bottom-right */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t("back_to_top")}
        className={`fixed bottom-4 right-4 z-40 grid size-12 place-items-center rounded-full bg-glass text-plum-800 shadow-lift ring-1 ring-plum/20 transition duration-300 hover:-translate-y-0.5 ${
          showTop ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUpIcon />
      </button>
    </>
  );
}
