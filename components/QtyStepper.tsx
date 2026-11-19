"use client";

import { MAX_QTY } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { MinusIcon, PlusIcon } from "./Icons";

export function QtyStepper({
  value,
  onChange,
  small = false,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  small?: boolean;
  label?: string;
}) {
  const { t } = useLang();
  const btn = `grid place-items-center rounded-full text-plum-800 transition hover:bg-plum/10 disabled:opacity-40 ${small ? "size-7" : "size-10"}`;
  return (
    <div className={`inline-flex items-center rounded-full border border-plum/25 bg-white ${small ? "p-0.5" : "p-1"}`}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={`${t("decrease")} ${label ?? ""}`}>
        <MinusIcon width={small ? 14 : 18} height={small ? 14 : 18} />
      </button>
      <span className={`text-center font-bold tabular-nums ${small ? "w-6 text-sm" : "w-9"}`} aria-live="polite" aria-label={`${t("quantity")}: ${value}`}>
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label={`${t("increase")} ${label ?? ""}`}>
        <PlusIcon width={small ? 14 : 18} height={small ? 14 : 18} />
      </button>
    </div>
  );
}
