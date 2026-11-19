import type { Lang } from "./i18n";

/** 349 → "349 درهم" (AR) / "349 DH" (FR). Western digits, thin grouping for 1 000+. */
export function formatPrice(value: number, lang: Lang) {
  const n = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value);
  return lang === "ar" ? `${n} درهم` : `${n} DH`;
}

/**
 * Moroccan phone: 05/06/07 + 8 digits (10 digits), or +212 / 00212 / 212 followed by 9 digits starting with 5, 6 or 7.
 * Spaces, dots and dashes are ignored.
 */
export function isValidMoroccanPhone(raw: string) {
  const v = raw.replace(/[\s.\-()]/g, "");
  return /^0[5-7]\d{8}$/.test(v) || /^(\+212|00212|212)[5-7]\d{8}$/.test(v);
}
