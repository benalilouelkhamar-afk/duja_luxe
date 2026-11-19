"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { CloseIcon } from "./Icons";

/** Accessible centered modal (bottom sheet on mobile). */
export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a,button,input,select,textarea");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-plum-900/55 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="animate-pop relative max-h-[90dvh] w-full overflow-y-auto rounded-t-3xl bg-glass p-5 shadow-2xl outline-none sm:max-w-lg sm:rounded-3xl sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <button type="button" onClick={onClose} aria-label={t("close")} className="grid size-9 place-items-center rounded-full text-plum-800 hover:bg-plum/10">
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
