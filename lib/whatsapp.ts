import { settings } from "@/data/settings";

/** Build a wa.me link with a pre-filled message. */
export function waLink(message?: string) {
  const base = `https://wa.me/${settings.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
