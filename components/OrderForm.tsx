"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cities } from "@/data/settings";
import { totalOf, useCart, type OrderItem } from "@/lib/cart";
import { formatPrice, isValidMoroccanPhone } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { makeRef, orderMessage, type Customer } from "@/lib/order";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

const OTHER = "__other__";
type Errors = Partial<Record<"name" | "phone" | "city" | "address", string>>;
export const LAST_ORDER_KEY = "duja-last-order";
export type LastOrder = { url: string; name: string; ref: string };

/**
 * Name / phone / city / address form. On submit, WhatsApp opens on the shop's number
 * with the full order written, then the client lands on the thank-you page.
 */
export function OrderForm({ items, fromCart }: { items: OrderItem[]; fromCart: boolean }) {
  const { clear, closeOrder } = useCart();
  const { t, tr, lang } = useLang();
  const router = useRouter();
  const [f, setF] = useState({ name: "", phone: "", city: "", otherCity: "", address: "", note: "" });
  const [errors, setErrors] = useState<Errors>({});
  const total = totalOf(items);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((v) => ({ ...v, [k]: e.target.value }));
    // hide the error of the field being corrected
    const field = k === "otherCity" ? "city" : k;
    if (field in errors)
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof Errors];
        return next;
      });
  };
  const cityValue = f.city === OTHER ? f.otherCity.trim() : f.city;

  const validate = () => {
    const e: Errors = {};
    if (f.name.trim().length < 3) e.name = t("err_name");
    if (!isValidMoroccanPhone(f.phone)) e.phone = t("err_phone");
    if (!cityValue) e.city = t("err_city");
    if (f.address.trim().length < 4) e.address = t("err_address");
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`of-${first === "city" && f.city === OTHER ? "otherCity" : first}`)?.focus();
    return !first;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const c: Customer = { name: f.name.trim(), phone: f.phone.trim(), city: cityValue, address: f.address.trim(), note: f.note };
    const ref = makeRef();
    const url = waLink(orderMessage(items, c, total, ref, lang));
    const last: LastOrder = { url, name: c.name.split(/\s+/)[0], ref };
    try {
      sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(last));
    } catch {
      /* ignore */
    }
    window.open(url, "_blank", "noopener");
    if (fromCart) clear();
    closeOrder();
    router.push("/merci");
  };

  const input =
    "mt-1.5 w-full rounded-2xl border border-plum/25 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/70 focus:border-plum focus:outline-none focus:ring-3 focus:ring-mauve/50 aria-[invalid=true]:border-[#8a1f45]";
  const err = (k: keyof Errors) =>
    errors[k] && (
      <p id={`of-${k}-err`} className="mt-1 text-sm font-medium text-[#8a1f45]">
        {errors[k]}
      </p>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div>
        <label htmlFor="of-name" className="text-sm font-bold text-ink">{t("full_name")} *</label>
        <input id="of-name" autoComplete="name" value={f.name} onChange={set("name")} className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "of-name-err" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="of-phone" className="text-sm font-bold text-ink">{t("phone")} *</label>
        <input id="of-phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder="06 12 34 56 78" value={f.phone} onChange={set("phone")} className={`${input} ${lang === "ar" ? "text-right" : ""}`} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "of-phone-err" : undefined} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="of-city" className="text-sm font-bold text-ink">{t("city")} *</label>
        <select id="of-city" value={f.city} onChange={set("city")} className={input} aria-invalid={!!errors.city && f.city !== OTHER} aria-describedby={errors.city ? "of-city-err" : undefined}>
          <option value="">{t("choose_city")}</option>
          {cities.map((c) => (
            <option key={c.fr} value={tr(c)}>{tr(c)}</option>
          ))}
          <option value={OTHER}>{t("other_city")}</option>
        </select>
        {f.city === OTHER && (
          <input id="of-otherCity" aria-label={t("other_city_name")} placeholder={t("other_city_name")} value={f.otherCity} onChange={set("otherCity")} className={input} aria-invalid={!!errors.city} />
        )}
        {err("city")}
      </div>
      <div>
        <label htmlFor="of-address" className="text-sm font-bold text-ink">{t("address")} *</label>
        <input id="of-address" autoComplete="street-address" value={f.address} onChange={set("address")} className={input} aria-invalid={!!errors.address} aria-describedby={errors.address ? "of-address-err" : undefined} />
        {err("address")}
      </div>
      <div>
        <label htmlFor="of-note" className="text-sm font-bold text-ink">
          {t("note")} <span className="font-normal text-ink-soft">{t("optional")}</span>
        </label>
        <textarea id="of-note" rows={2} value={f.note} onChange={set("note")} className={input} />
      </div>
      <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f7a4c] px-4 py-4 text-base font-bold text-white shadow-lift transition duration-200 hover:-translate-y-0.5 hover:bg-[#186640]">
        <WhatsAppIcon />
        <span>
          {t("order_now")}
          {total !== null && <span className="whitespace-nowrap"> · {formatPrice(total, lang)}</span>}
        </span>
      </button>
      <p className="text-center text-sm text-ink-soft">{t("order_hint")}</p>
      <p className="text-center text-xs text-ink-soft">{t("cod_reminder")}</p>
    </form>
  );
}
