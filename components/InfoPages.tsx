"use client";

import { settings } from "@/data/settings";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/whatsapp";
import { CashIcon, InstagramIcon, PinIcon, TruckIcon, WhatsAppIcon } from "./Icons";
import { Logo } from "./Logo";
import { PageTitle } from "./PageTitle";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="glass animate-pop rounded-[28px] p-6 leading-loose text-ink sm:p-9">{children}</div>
);
const Wrap = ({ children }: { children: React.ReactNode }) => <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">{children}</div>;

export function AboutPage() {
  const { t, tr } = useLang();
  return (
    <Wrap>
      <PageTitle k="about_title" />
      <Card>
        <div className="mb-6 flex justify-center">
          <Logo size={110} />
        </div>
        <div className="space-y-4 text-center text-[17px]">
          <p>{t("about_p1")}</p>
          <p>{t("about_p2")}</p>
          <p className="font-extrabold text-plum-800">{t("about_p3")}</p>
          <p className="font-serif text-sm tracking-[0.2em] text-ink-soft" lang="en">{settings.tagline}</p>
          <p className="text-sm text-ink-soft">{tr(settings.city)}</p>
        </div>
      </Card>
    </Wrap>
  );
}

export function DeliveryPage() {
  const { t, tr } = useLang();
  const d = settings.delivery;
  return (
    <Wrap>
      <PageTitle k="page_delivery" />
      <Card>
        <ul className="space-y-6">
          <li className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-plum text-white"><TruckIcon /></span>
            <div>
              <h2 className="text-lg font-extrabold">{t("delivery")}</h2>
              <p>{tr(d.zones)} 🇲🇦</p>
              <p>{tr(d.freeDelivery ? d.freeDeliveryNote : d.feesNote)}</p>
              <p>{tr(d.delay)}</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-plum text-white"><CashIcon /></span>
            <div>
              <h2 className="text-lg font-extrabold">{tr(settings.payment.method)}</h2>
              <p>{tr(settings.payment.note)}</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-plum text-white"><WhatsAppIcon /></span>
            <div>
              <h2 className="text-lg font-extrabold">{t("trust_fast")}</h2>
              {settings.faq.slice(3).map((f) => (
                <p key={f.q.fr}>{tr(f.a)}</p>
              ))}
            </div>
          </li>
        </ul>
      </Card>
    </Wrap>
  );
}

export function ExchangePage() {
  const { lang } = useLang();
  return (
    <Wrap>
      <PageTitle k="page_exchange" />
      <Card>
        <ol className="list-decimal space-y-3 ps-5 marker:font-bold marker:text-plum">
          {settings.exchangePolicy[lang].map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </Card>
    </Wrap>
  );
}

export function ContactPage() {
  const { t, tr } = useLang();
  return (
    <Wrap>
      <PageTitle k="page_contact" />
      <Card>
        <p className="text-center text-[17px]">{t("contact_text")}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#1f7a4c] px-5 py-4 font-bold text-white transition hover:bg-[#186640]">
            <WhatsAppIcon /> {t("contact_whatsapp")}
          </a>
          <a href={settings.contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-plum px-5 py-4 font-bold text-white transition hover:bg-plum-800">
            <InstagramIcon /> {t("write_instagram")}
          </a>
        </div>
        <dl className="mt-8 space-y-2 text-center">
          <div>
            <dt className="sr-only">WhatsApp</dt>
            <dd dir="ltr" className="font-bold text-plum-800">{settings.contact.whatsappDisplay}</dd>
          </div>
          <div>
            <dt className="sr-only">Instagram</dt>
            <dd dir="ltr" className="font-bold text-plum-800">{settings.contact.instagramHandle}</dd>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-ink-soft">
            <dt><PinIcon width={18} height={18} /><span className="sr-only">{t("based_in")}</span></dt>
            <dd>{tr(settings.city)}</dd>
          </div>
        </dl>
      </Card>
    </Wrap>
  );
}
