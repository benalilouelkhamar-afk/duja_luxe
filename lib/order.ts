import { colors, getProductById } from "@/data/products";
import { settings } from "@/data/settings";
import type { OrderItem } from "./cart";
import { formatPrice } from "./format";
import type { Lang } from "./i18n";

export type Customer = { name: string; phone: string; city: string; address: string; note: string };

/** Short order reference, e.g. "DL-K3F9Q" (time based, readable on the phone). */
export function makeRef() {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  const r = Math.floor(Math.random() * 36).toString(36).toUpperCase();
  return `DL-${t}${r}`;
}

const L = {
  ar: { hello: "السلام عليكم", newOrder: "طلب جديد", ref: "رقم الطلب", color: "اللون", size: "المقاس", qty: "الكمية", name: "الاسم", phone: "الهاتف", city: "المدينة", address: "العنوان", note: "ملاحظة", total: "المجموع", priceTbd: "السعر يُحدَّد عبر واتساب", delivery: "التوصيل", free: "مجاني", cod: "الدفع عند الاستلام 🙏" },
  fr: { hello: "Bonjour", newOrder: "nouvelle commande", ref: "Référence", color: "Couleur", size: "Taille", qty: "Quantité", name: "Nom", phone: "Tél", city: "Ville", address: "Adresse", note: "Remarque", total: "Total", priceTbd: "Prix à confirmer sur WhatsApp", delivery: "Livraison", free: "gratuite", cod: "Paiement à la livraison 🙏" },
};

function line(l: OrderItem, lang: Lang) {
  const p = getProductById(l.productId);
  if (!p) return "";
  const s = L[lang];
  const parts = [`• ${p.name[lang]}`];
  if (l.color) parts.push(`${s.color}: ${colors[l.color].label[lang]}`);
  parts.push(`${s.size}: ${l.size}`, `${s.qty}: ${l.qty}`);
  if (p.price !== null) parts.push(formatPrice(p.price * l.qty, lang));
  return parts.join(" — ");
}

/** The WhatsApp message sent to the shop: items, total, customer details, reference. */
export function orderMessage(items: OrderItem[], c: Customer, total: number | null, ref: string, lang: Lang) {
  const s = L[lang];
  const out = [`${s.hello} ${settings.nameWithSparkle} — ${s.newOrder}`, `${s.ref}: ${ref}`, "", ...items.map((l) => line(l, lang)), ""];
  out.push(`${s.total}: ${total === null ? s.priceTbd : formatPrice(total, lang)}`);
  if (settings.delivery.freeDelivery) out.push(`${s.delivery}: ${s.free}`);
  out.push("", `${s.name}: ${c.name}`, `${s.phone}: ${c.phone}`, `${s.city}: ${c.city}`, `${s.address}: ${c.address}`);
  if (c.note.trim()) out.push(`${s.note}: ${c.note.trim()}`);
  out.push("", s.cod);
  return out.join("\n");
}
