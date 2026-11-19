"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang, type DictKey } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";
import { BagIcon, CloseIcon, MenuIcon } from "./Icons";

const links: { href: string; id: string; key: DictKey }[] = [
  { href: "/", id: "top", key: "nav_home" },
  { href: "/#products", id: "products", key: "nav_products" },
  { href: "/#about", id: "about", key: "nav_about" },
  { href: "/#follow", id: "follow", key: "nav_follow" },
];

export function Header() {
  const { t, lang, setLang } = useLang();
  const { count, setDrawerOpen } = useCart();
  const pathname = usePathname();
  const [active, setActive] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-spy on the home page
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["products", "about", "follow"];
    const onScroll = () => {
      let current = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the mobile menu on navigation
  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (id: string) => (pathname === "/" ? active === id : false);

  const navItem = (l: (typeof links)[number], mobile = false) => (
    <Link
      key={l.id}
      href={l.href}
      onClick={() => setMenuOpen(false)}
      aria-current={isActive(l.id) ? "page" : undefined}
      className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200 ${
        isActive(l.id) ? "bg-lilac text-plum-800" : "text-white/90 hover:bg-white/10 hover:text-white"
      } ${mobile ? "block w-full text-center" : ""}`}
    >
      {t(l.key)}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-plum/95 shadow-[0_6px_20px_-10px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="DUJA LUXE">
          <Logo size={44} priority alt="" className="ring-2 ring-white/40" />
          <span className="font-serif text-lg font-bold tracking-wider text-white">DUJA LUXE</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => navItem(l))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full bg-white/10 p-0.5 text-xs font-bold" role="group" aria-label="Langue / اللغة">
            {(["ar", "fr"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                lang={l}
                className={`min-w-9 rounded-full px-2.5 py-1.5 transition-colors ${
                  lang === l ? "bg-lilac text-plum-800" : "text-white/85 hover:text-white"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative grid size-10 place-items-center rounded-full bg-lilac text-plum-800 transition-transform duration-200 hover:scale-105"
            aria-label={`${t("open_cart")} (${count})`}
          >
            <BagIcon />
            {count > 0 && (
              <span className="absolute -top-1 -end-1 grid min-w-5 place-items-center rounded-full bg-plum-900 px-1 text-[11px] font-bold leading-5 text-white ring-2 ring-plum">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t("open_menu")}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="animate-pop border-t border-white/10 px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">{links.map((l) => navItem(l, true))}</div>
        </nav>
      )}
    </header>
  );
}
