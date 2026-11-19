"use client";

import Link from "next/link";
import { settings } from "@/data/settings";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./Icons";

export function Footer() {
  const { t, tr } = useLang();
  const social = [
    { href: waLink(), label: "WhatsApp", icon: <WhatsAppIcon /> },
    { href: settings.contact.instagram, label: "Instagram", icon: <InstagramIcon /> },
    ...(settings.contact.tiktok ? [{ href: settings.contact.tiktok, label: "TikTok", icon: <TikTokIcon /> }] : []),
  ];
  const pages = [
    { href: "/a-propos", label: t("nav_about") },
    { href: "/livraison", label: t("page_delivery") },
    { href: "/echange", label: t("page_exchange") },
    { href: "/contact", label: t("page_contact") },
  ];
  return (
    <footer className="mt-16 bg-plum text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-24 pt-12 text-center sm:pb-12">
        <Logo size={88} alt="" className="ring-4 ring-white/25" />
        <p className="mt-4 font-serif text-2xl font-bold tracking-wider">DUJA LUXE</p>
        <p className="mt-1 font-serif text-sm tracking-[0.2em] text-white/85" lang="en">
          {settings.tagline}
        </p>
        <p className="mt-2 text-sm text-white/85">{tr(settings.city)}</p>

        <ul className="mt-6 flex gap-3">
          {social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-11 place-items-center rounded-full bg-white/12 ring-1 ring-white/25 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-plum"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>

        <nav aria-label={t("footer_links")} className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-white/90 underline-offset-4 hover:text-white hover:underline">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-8 text-xs text-white/75">
          © {new Date().getFullYear()} DUJA LUXE — {t("footer_rights")}
        </p>
      </div>
    </footer>
  );
}
