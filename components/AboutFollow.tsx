"use client";

import { settings } from "@/data/settings";
import { useLang } from "@/lib/i18n";
import { InstagramIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function AboutSection() {
  const { t } = useLang();
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-4xl scroll-mt-20 px-4 sm:px-6">
      <Reveal className="glass rounded-[28px] px-6 py-9 text-center sm:px-12">
        <h2 id="about-title" className="text-3xl font-extrabold text-ink sm:text-4xl">
          {t("about_title")}
        </h2>
        <span aria-hidden className="mx-auto mt-3 block h-1 w-14 rounded-full bg-plum" />
        <div className="mt-6 space-y-4 text-[16px] leading-loose text-ink">
          <p>{t("about_p1")}</p>
          <p>{t("about_p2")}</p>
          <p className="font-extrabold text-plum-800">{t("about_p3")}</p>
        </div>
      </Reveal>
    </section>
  );
}

export function FollowSection() {
  const { t } = useLang();
  return (
    <section id="follow" aria-labelledby="follow-title" className="mx-auto max-w-3xl scroll-mt-20 px-4 text-center sm:px-6">
      <Reveal>
        <h2 id="follow-title" className="text-3xl font-extrabold text-ink sm:text-4xl">
          {t("follow_title")}
        </h2>
        <span aria-hidden className="mx-auto mt-3 block h-1 w-14 rounded-full bg-plum" />
        <a
          href={settings.contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="glass mt-6 inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-[15px] font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-white"
        >
          <span className="grid size-8 place-items-center rounded-full bg-plum text-white">
            <InstagramIcon width={18} height={18} />
          </span>
          {t("follow_text")}
          <span className="font-bold text-plum-800" dir="ltr">
            {settings.contact.instagramHandle}
          </span>
        </a>
      </Reveal>
    </section>
  );
}
