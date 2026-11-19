"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Bilingual } from "@/data/settings";

export type Lang = "ar" | "fr";

/** All interface texts. Product and store texts live in /data. */
export const dict = {
  nav_home: { ar: "الرئيسية", fr: "Accueil" },
  nav_products: { ar: "المنتجات", fr: "Produits" },
  nav_about: { ar: "من نحن", fr: "À propos" },
  nav_follow: { ar: "تابعينا", fr: "Suivez-nous" },
  cart: { ar: "السلة", fr: "Panier" },
  open_cart: { ar: "فتح السلة", fr: "Ouvrir le panier" },
  open_menu: { ar: "القائمة", fr: "Menu" },
  close: { ar: "إغلاق", fr: "Fermer" },
  skip: { ar: "انتقلي إلى المحتوى", fr: "Aller au contenu" },

  hero_title_1: { ar: "أناقتك", fr: "Votre élégance," },
  hero_title_2: { ar: "تبدا من هنا ✨", fr: "commence ici ✨" },
  hero_text: {
    ar: "جاكيتات جلد، معاطف وأطقم مختارة بعناية لكل امرأة كتبغي تبان راقية فكل يوم. اختاري، اطلبي، وخلصي عند الاستلام 🤍",
    fr: "Vestes en cuir, manteaux et ensembles choisis avec soin pour toutes les femmes qui aiment être élégantes au quotidien. Choisissez, commandez, payez à la livraison 🤍",
  },
  shop_now: { ar: "تسوّقي الآن", fr: "Découvrir la boutique" },
  discover_duja: { ar: "اكتشفي DUJA ←", fr: "Découvrir DUJA →" },
  hero_tag: { ar: "الدفع عند الاستلام · جودة مضمونة", fr: "Paiement à la livraison · Qualité garantie" },
  curated: { ar: "مختارة بعناية", fr: "Sélection DUJA" },
  discover_product: { ar: "اكتشفي المنتج", fr: "Voir le produit" },
  prev: { ar: "السابق", fr: "Précédent" },
  next: { ar: "التالي", fr: "Suivant" },
  slide: { ar: "الشريحة", fr: "Diapositive" },

  dispo_now: { ar: "Dispo الآن", fr: "Dispo maintenant" },
  new_arrivals_sub: { ar: "آخر ما وصل للبوتيك", fr: "Les dernières arrivées" },
  our_products: { ar: "منتجاتنا", fr: "Nos produits" },
  no_products: { ar: "ما كاين حتى منتج فهاد الصنف دابا، رجعي قريباً 🤍", fr: "Aucun article dans cette catégorie pour le moment 🤍" },
  view_details: { ar: "عرض التفاصيل", fr: "Voir les détails" },
  add_to_cart: { ar: "أضيفي إلى السلة", fr: "Ajouter au panier" },
  price_whatsapp: { ar: "السعر عبر واتساب", fr: "Prix sur WhatsApp" },
  ask_price: { ar: "اسألي على الثمن", fr: "Demander le prix" },
  badge_new: { ar: "جديد", fr: "Nouveau" },
  badge_limited: { ar: "كمية محدودة", fr: "Quantité limitée" },
  badge_out: { ar: "نفذت الكمية", fr: "Épuisé" },

  trust_delivery: { ar: "توصيل لجميع المدن", fr: "Livraison partout au Maroc" },
  trust_cod: { ar: "الدفع عند الاستلام", fr: "Paiement à la livraison" },
  trust_quality: { ar: "جودة مضمونة", fr: "Qualité garantie" },
  trust_fast: { ar: "رد سريع على واتساب", fr: "Réponse rapide sur WhatsApp" },

  reviews_title: { ar: "آراء زبوناتنا", fr: "Avis de nos clientes" },
  reviews_sub: { ar: "ثقتكم هي أغلى حاجة عندنا 🤍", fr: "Votre confiance est notre plus belle récompense 🤍" },
  review_alt: { ar: "رأي زبونة", fr: "Avis cliente" },

  about_title: { ar: "من نحن", fr: "Qui sommes-nous" },
  about_p1: {
    ar: "DUJA LUXE بوتيك ملابس نسائية من بوزنيقة، كنختارو كل قطعة بعناية باش توصلك الأناقة والجودة بثمن معقول.",
    fr: "DUJA LUXE est une boutique de mode féminine née à Bouznika. Chaque pièce est choisie avec soin pour vous offrir élégance et qualité à prix juste.",
  },
  about_p2: {
    ar: "من الجاكيتات الجلد حتى المعاطف والأطقم، كنتبعو الترند وكنحافظو على الستايل الكلاسيكي اللي ما كيموتش.",
    fr: "Des vestes en cuir aux manteaux et ensembles, nous suivons les tendances tout en gardant un style intemporel.",
  },
  about_p3: {
    ar: "هدفنا بسيط: كل وحدة تحس براسها ملكة فكل لوك 👑",
    fr: "Notre objectif est simple : que chaque femme se sente reine dans chaque look 👑",
  },
  follow_title: { ar: "تابعينا", fr: "Suivez-nous" },
  follow_text: {
    ar: "تابعي جديد DUJA LUXE على إنستغرام قبل الجميع ✨",
    fr: "Découvrez les nouveautés DUJA LUXE en avant-première sur Instagram ✨",
  },
  footer_rights: { ar: "جميع الحقوق محفوظة", fr: "Tous droits réservés" },
  footer_links: { ar: "روابط مفيدة", fr: "Liens utiles" },

  ask_duja: { ar: "اسألي DUJA ✨", fr: "Demandez à DUJA ✨" },
  ask_hello: {
    ar: "مرحبا بيك فـ DUJA LUXE 🤍 اختاري سؤال ونجاوبك دغيا:",
    fr: "Bienvenue chez DUJA LUXE 🤍 Choisissez une question :",
  },
  contact_whatsapp: { ar: "تواصلي معنا على واتساب", fr: "Contactez-nous sur WhatsApp" },
  back_to_top: { ar: "الرجوع للأعلى", fr: "Retour en haut" },

  // Product page
  home: { ar: "الرئيسية", fr: "Accueil" },
  color: { ar: "اللون", fr: "Couleur" },
  size: { ar: "المقاس", fr: "Taille" },
  quantity: { ar: "الكمية", fr: "Quantité" },
  size_guide: { ar: "دليل المقاسات", fr: "Guide des tailles" },
  choose_size: { ar: "اختاري المقاس من فضلك", fr: "Veuillez choisir une taille" },
  order_whatsapp: { ar: "اطلبي مباشرة عبر واتساب", fr: "Commander sur WhatsApp" },
  description: { ar: "الوصف", fr: "Description" },
  delivery_payment: { ar: "التوصيل والدفع", fr: "Livraison et paiement" },
  you_may_like: { ar: "قد يعجبك أيضاً", fr: "Vous aimerez aussi" },
  photo_of: { ar: "صورة", fr: "Photo" },
  decrease: { ar: "نقص", fr: "Diminuer" },
  increase: { ar: "زيد", fr: "Augmenter" },
  out_of_stock_msg: { ar: "هاد القطعة نفذت حالياً — سولينا على واتساب على الرجوع ديالها", fr: "Article épuisé — demandez-nous sur WhatsApp quand il revient" },

  // Cart
  your_cart: { ar: "سلتك", fr: "Votre panier" },
  cart_empty: { ar: "السلة خاوية دابا 🤍", fr: "Votre panier est vide 🤍" },
  continue_shopping: { ar: "كملي التسوق", fr: "Continuer mes achats" },
  remove: { ar: "حذف", fr: "Supprimer" },
  total: { ar: "المجموع", fr: "Total" },
  total_whatsapp: { ar: "يُحدَّد عبر واتساب", fr: "Confirmé sur WhatsApp" },
  delivery: { ar: "التوصيل", fr: "Livraison" },
  free: { ar: "مجاني", fr: "Gratuite" },
  checkout: { ar: "إتمام الطلب", fr: "Finaliser la commande" },
  view_cart: { ar: "عرض السلة", fr: "Voir le panier" },
  checkout_title: { ar: "معلومات التوصيل", fr: "Informations de livraison" },
  full_name: { ar: "الاسم الكامل", fr: "Nom complet" },
  phone: { ar: "رقم الهاتف", fr: "Téléphone" },
  city: { ar: "المدينة", fr: "Ville" },
  choose_city: { ar: "اختاري المدينة", fr: "Choisissez la ville" },
  other_city: { ar: "أخرى", fr: "Autre" },
  other_city_name: { ar: "اسم المدينة", fr: "Nom de la ville" },
  address: { ar: "العنوان", fr: "Adresse" },
  note: { ar: "ملاحظة", fr: "Remarque" },
  optional: { ar: "(اختياري)", fr: "(facultatif)" },
  confirm_order: { ar: "تأكيد الطلب عبر واتساب", fr: "Confirmer sur WhatsApp" },
  err_name: { ar: "كتبي الاسم الكامل", fr: "Indiquez votre nom complet" },
  err_phone: { ar: "رقم غير صحيح (مثال: 0612345678 أو 212612345678+)", fr: "Numéro invalide (ex. 0612345678 ou +212612345678)" },
  err_city: { ar: "اختاري المدينة", fr: "Choisissez la ville" },
  err_address: { ar: "كتبي العنوان", fr: "Indiquez l'adresse" },
  cod_reminder: { ar: "الدفع عند الاستلام · غادي نأكدو معاك الطلب على واتساب", fr: "Paiement à la livraison · confirmation sur WhatsApp" },

  // Thanks
  thanks_title: { ar: "شكراً! 🤍", fr: "Merci ! 🤍" },
  thanks_text: {
    ar: "وصلنا طلبك على واتساب وغادي نأكدو معاك قريباً 🤍",
    fr: "Nous avons reçu votre commande sur WhatsApp, nous vous confirmons très vite 🤍",
  },
  thanks_reopen: { ar: "واتساب ما تحلش؟ ضغطي هنا", fr: "WhatsApp ne s'est pas ouvert ? Cliquez ici" },
  back_home: { ar: "الرجوع للرئيسية", fr: "Retour à l'accueil" },

  // Pages
  page_delivery: { ar: "التوصيل والدفع", fr: "Livraison et paiement" },
  page_exchange: { ar: "سياسة الاستبدال", fr: "Politique d'échange" },
  page_contact: { ar: "تواصلي معنا", fr: "Contactez-nous" },
  contact_text: {
    ar: "عندك سؤال على شي قطعة، المقاس ولا الطلب ديالك؟ حنا هنا باش نعاونوك 🤍",
    fr: "Une question sur un article, une taille ou votre commande ? Nous sommes là 🤍",
  },
  write_instagram: { ar: "راسلينا على إنستغرام", fr: "Écrivez-nous sur Instagram" },
  based_in: { ar: "مقرنا", fr: "Basées à" },
  demo_notice: { ar: "نسخة تجريبية", fr: "Version démo" },
} satisfies Record<string, Bilingual>;

export type DictKey = keyof typeof dict;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
  /** pick the right language from a { ar, fr } object */
  tr: (b: Bilingual) => string;
};

const LangContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "duja-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore saved preference after hydration
      if (saved === "fr" || saved === "ar") setLangState(saved);
    } catch {
      /* storage unavailable: keep Arabic */
    }
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback((k: DictKey) => dict[k][lang], [lang]);
  const tr = useCallback((b: Bilingual) => b[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t, tr }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
