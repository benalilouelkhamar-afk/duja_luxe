"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cities } from "@/data/settings";
import { useCart } from "@/lib/cart";
import { isValidMoroccanPhone } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { orderMessage, type Customer } from "@/lib/order";
import { waLink } from "@/lib/whatsapp";
import { CartLines } from "./CartLines";
import { CartSummary } from "./CartSummary";
import { WhatsAppIcon } from "./Icons";

const OTHER = "__other__";
type Errors = Partial<Record<"name" | "phone" | "city" | "address", string>>;

export function Checkout() {
  const { lines, total, clear } = useCart();
  const { t, tr, lang } = useLang();
  const router = useRouter();
  const [f, setF] = useState({ name: "", phone: "", city: "", otherCity: "", address: "", note: "" });
  const [errors, setErrors] = useState<Errors>({});

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const cityValue = f.city === OTHER ? f.otherCity.trim() : f.city;

  const validate = () => {
    const e: Errors = {};
    if (f.name.trim().length < 3) e.name = t("err_name");
    if (!isValidMoroccanPhone(f.phone)) e.phone = t("err_phone");
    if (!cityValue) e.city = t("err_city");
    if (f.address.trim().length < 4) e.address = t("err_address");
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`co-${first === "city" && f.city === OTHER ? "otherCity" : first}`)?.focus();
    return !first;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const c: Customer = { name: f.name.trim(), phone: f.phone.trim(), city: cityValue, address: f.address.trim(), note: f.note };
    const url = waLink(orderMessage(lines, c, total, lang));
    try {
      sessionStorage.setItem("duja-last-order", url);
    } catch {
      /* ignore */
    }
    window.open(url, "_blank", "noopener");
    clear();
    router.push("/merci");
  };

  if (lines.length === 0) {
    return (
      <div className="glass mx-auto max-w-md rounded-[28px] p-8 text-center">
        <p className="text-lg text-ink">{t("cart_empty")}</p>
        <Link href="/#products" className="mt-5 inline-block rounded-full bg-plum px-6 py-3 font-bold text-white hover:bg-plum-800">
          {t("continue_shopping")}
        </Link>
      </div>
    );
  }

  const input =
    "mt-1.5 w-full rounded-2xl border border-plum/25 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/70 focus:border-plum focus:outline-none focus:ring-3 focus:ring-mauve/50 aria-[invalid=true]:border-[#8a1f45]";
  const err = (k: keyof Errors) =>
    errors[k] && (
      <p id={`co-${k}-err`} className="mt-1 text-sm font-medium text-[#8a1f45]">
        {errors[k]}
      </p>
    );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <section aria-labelledby="cart-lines-title" className="glass rounded-[28px] p-5 sm:p-6 lg:self-start">
        <h2 id="cart-lines-title" className="mb-2 text-xl font-extrabold text-ink">{t("your_cart")}</h2>
        <CartLines />
        <div className="mt-3 border-t border-plum/15 pt-4">
          <CartSummary />
        </div>
      </section>

      <form onSubmit={submit} noValidate className="glass space-y-4 rounded-[28px] p-5 sm:p-6" aria-labelledby="co-title">
        <h2 id="co-title" className="text-xl font-extrabold text-ink">{t("checkout_title")}</h2>
        <div>
          <label htmlFor="co-name" className="text-sm font-bold text-ink">{t("full_name")} *</label>
          <input id="co-name" autoComplete="name" value={f.name} onChange={set("name")} className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "co-name-err" : undefined} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="co-phone" className="text-sm font-bold text-ink">{t("phone")} *</label>
          <input id="co-phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder="06 12 34 56 78" value={f.phone} onChange={set("phone")} className={`${input} ${lang === "ar" ? "text-right" : ""}`} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "co-phone-err" : undefined} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="co-city" className="text-sm font-bold text-ink">{t("city")} *</label>
          <select id="co-city" value={f.city} onChange={set("city")} className={input} aria-invalid={!!errors.city && f.city !== OTHER} aria-describedby={errors.city ? "co-city-err" : undefined}>
            <option value="">{t("choose_city")}</option>
            {cities.map((c) => (
              <option key={c.fr} value={tr(c)}>{tr(c)}</option>
            ))}
            <option value={OTHER}>{t("other_city")}</option>
          </select>
          {f.city === OTHER && (
            <input id="co-otherCity" aria-label={t("other_city_name")} placeholder={t("other_city_name")} value={f.otherCity} onChange={set("otherCity")} className={input} aria-invalid={!!errors.city} />
          )}
          {err("city")}
        </div>
        <div>
          <label htmlFor="co-address" className="text-sm font-bold text-ink">{t("address")} *</label>
          <input id="co-address" autoComplete="street-address" value={f.address} onChange={set("address")} className={input} aria-invalid={!!errors.address} aria-describedby={errors.address ? "co-address-err" : undefined} />
          {err("address")}
        </div>
        <div>
          <label htmlFor="co-note" className="text-sm font-bold text-ink">
            {t("note")} <span className="font-normal text-ink-soft">{t("optional")}</span>
          </label>
          <textarea id="co-note" rows={3} value={f.note} onChange={set("note")} className={input} />
        </div>
        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f7a4c] py-4 text-base font-bold text-white shadow-lift transition duration-200 hover:-translate-y-0.5 hover:bg-[#186640]">
          <WhatsAppIcon /> {t("confirm_order")}
        </button>
        <p className="text-center text-sm text-ink-soft">{t("cod_reminder")}</p>
      </form>
    </div>
  );
}
