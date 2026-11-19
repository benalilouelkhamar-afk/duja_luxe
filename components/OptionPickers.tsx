"use client";

import { colors, type ColorId } from "@/data/products";
import { useLang } from "@/lib/i18n";

export function ColorPicker({
  options,
  value,
  onChange,
  name,
}: {
  options: ColorId[];
  value: ColorId | null;
  onChange: (c: ColorId) => void;
  name: string;
}) {
  const { t, tr } = useLang();
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold text-ink">
        {t("color")}: <span className="font-medium text-ink-soft">{value ? tr(colors[value].label) : ""}</span>
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((c) => (
          <label key={c} className="cursor-pointer">
            <input
              type="radio"
              name={`${name}-color`}
              value={c}
              checked={value === c}
              onChange={() => onChange(c)}
              className="peer sr-only"
            />
            <span
              title={tr(colors[c].label)}
              className="block size-9 rounded-full ring-1 ring-black/15 transition peer-checked:ring-[3px] peer-checked:ring-plum peer-checked:ring-offset-2 peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-plum-800"
              style={{ background: colors[c].hex }}
            />
            <span className="sr-only">{tr(colors[c].label)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function SizePicker({
  options,
  value,
  onChange,
  name,
  error,
}: {
  options: string[];
  value: string | null;
  onChange: (s: string) => void;
  name: string;
  error?: boolean;
}) {
  const { t, lang } = useLang();
  const label = (s: string) => (s === "Taille standard" && lang === "ar" ? "مقاس موحد" : s);
  return (
    <fieldset aria-describedby={error ? `${name}-size-err` : undefined}>
      <legend className="mb-2 text-sm font-bold text-ink">
        {t("size")} <span className="text-[#8a1f45]">*</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((s) => (
          <label key={s} className="cursor-pointer">
            <input type="radio" name={`${name}-size`} value={s} checked={value === s} onChange={() => onChange(s)} className="peer sr-only" />
            <span className="grid h-10 min-w-12 place-items-center rounded-full border border-plum/30 bg-white px-3.5 text-sm font-bold text-plum-800 transition peer-checked:border-plum peer-checked:bg-plum peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-plum-800 hover:border-plum">
              {label(s)}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-size-err`} role="alert" className="mt-2 text-sm font-medium text-[#8a1f45]">
          {t("choose_size")}
        </p>
      )}
    </fieldset>
  );
}
