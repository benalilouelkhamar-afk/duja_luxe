"use client";

import { useLang } from "@/lib/i18n";

export function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-plum-800"
    >
      {t("skip")}
    </a>
  );
}
