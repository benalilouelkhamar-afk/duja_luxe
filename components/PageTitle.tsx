"use client";

import { useLang, type DictKey } from "@/lib/i18n";

export function PageTitle({ k }: { k: DictKey }) {
  const { t } = useLang();
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{t(k)}</h1>
      <span aria-hidden className="mx-auto mt-3 block h-1 w-14 rounded-full bg-lilac" />
    </div>
  );
}
