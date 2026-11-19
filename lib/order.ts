import { colors, getProductById } from "@/data/products";
import { settings } from "@/data/settings";
import type { CartLine } from "./cart";
import { formatPrice } from "./format";
import type { Lang } from "./i18n";

export type Customer = { name: string; phone: string; city: string; address: string; note: string };

const L = {
  ar: { hello: "السلام عليكم", newOrder: "طلب جديد:", color: "اللون", size: "المقاس", qty: "الكمية", name: "الاسم", phone: "الهاتف", city: "المدينة", address: "العنوان", note: "ملاحظة", total: "المجموع", priceTbd: "السعر يُحدَّد عبر واتساب", cod: "الدفع عند الاستلام 🙏", interested: "بغيت نطلب هاد القطعة:", info: "الاسم / المدينة / العنوان:" },
  fr: { hello: "Bonjour", newOrder: "nouvelle commande :", color: "Couleur", size: "Taille", qty: "Quantité", name: "Nom", phone: "Tél", city: "Ville", address: "Adresse", note: "Remarque", total: "Total", priceTbd: "Prix à confirmer sur WhatsApp", cod: "Paiement à la livraison 🙏", interested: "Je souhaite commander cet article :", info: "Nom / Ville / Adresse :" },
};

function line(l: Omit<CartLine, "key">, lang: Lang) {
  const p = getProductById(l.productId);
  if (!p) return "";
  const s = L[lang];
  const parts = [`• ${p.name[lang]}`];
  if (l.color) parts.push(`${s.color}: ${colors[l.color].label[lang]}`);
  parts.push(`${s.size}: ${l.size}`, `${s.qty}: ${l.qty}`);
  if (p.price !== null) parts.push(formatPrice(p.price * l.qty, lang));
  return parts.join(" — ");
}

/** Full order message sent from the checkout form. */
export function orderMessage(lines: CartLine[], c: Customer, total: number | null, lang: Lang) {
  const s = L[lang];
  const out = [`${s.hello} ${settings.nameWithSparkle} ${s.newOrder}`, ...lines.map((l) => line(l, lang)), ""];
  out.push(`${s.total}: ${total === null ? s.priceTbd : formatPrice(total, lang)}`);
  out.push(`${s.name}: ${c.name} | ${s.phone}: ${c.phone} | ${s.city}: ${c.city} | ${s.address}: ${c.address}`);
  if (c.note.trim()) out.push(`${s.note}: ${c.note.trim()}`);
  out.push(s.cod);
  return out.join("\n");
}

/** Short message for "اطلبي مباشرة عبر واتساب" on a product page. */
export function directMessage(l: Omit<CartLine, "key">, lang: Lang, url: string) {
  const s = L[lang];
  return [`${s.hello} ${settings.nameWithSparkle} ${s.interested}`, line(l, lang), url, "", s.info, s.cod].join("\n");
}
