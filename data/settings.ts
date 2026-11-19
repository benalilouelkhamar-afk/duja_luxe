/**
 * ─────────────────────────────────────────────────────────────
 *  DUJA LUXE — store settings
 *  Edit this file to change the store's info. Every text that
 *  exists in two languages is written as { ar: "...", fr: "..." }.
 *  Values marked "TODO: confirm" are assumptions to check with the owner.
 * ─────────────────────────────────────────────────────────────
 */

export type Bilingual = { ar: string; fr: string };

export type CategoryId =
  | "all"
  | "jackets"
  | "manteaux"
  | "ensembles"
  | "hauts"
  | "jupes"
  | "robes";

export const settings = {
  /** Brand name as shown in titles and messages */
  name: "DUJA LUXE",
  nameWithSparkle: "DUJA LUXE ✨",
  tagline: "Style • Elegance • Quality",
  /** Logo file in /public. Replace /public/logo.png with the real logo (same name). */
  logo: "/logo.png",

  city: { ar: "بوزنيقة، المغرب", fr: "Bouznika, Maroc" } as Bilingual,

  /** Public site URL (used for SEO / Open Graph). Change after you buy the domain. */
  siteUrl: "https://duja-luxe.vercel.app", // TODO: confirm domain (dujaluxe.ma / .com)
  /** false = demo hidden from Google (noindex). Set to true when the owner approves the site. */
  allowIndexing: false,

  contact: {
    /** WhatsApp number in international format, digits only (no +, no spaces). */
    whatsapp: "212651508257",
    /** Same number, formatted for display */
    whatsappDisplay: "06 51 50 82 57",
    instagram: "https://www.instagram.com/duja.luxe/",
    instagramHandle: "@duja.luxe",
    /** TikTok profile URL, or null to hide the TikTok button */
    tiktok: null as string | null, // TODO: does DUJA have TikTok?
  },

  delivery: {
    /** Show "توصيل مجاني" everywhere. Set to false if delivery is paid. */
    freeDelivery: true, // TODO: confirm (some posts say free delivery)
    freeDeliveryNote: {
      ar: "التوصيل مجاني لجميع المدن المغربية 🚛",
      fr: "Livraison gratuite partout au Maroc 🚛",
    } as Bilingual,
    /** Used when freeDelivery is false */
    feesNote: {
      ar: "مصاريف التوصيل: تُحدَّد حسب المدينة (سيتم تأكيدها عبر واتساب).",
      fr: "Frais de livraison : selon la ville (confirmés sur WhatsApp).",
    } as Bilingual,
    delay: {
      ar: "مدة التوصيل: من 24 إلى 72 ساعة حسب المدينة.", // TODO: confirm
      fr: "Délai : 24 à 72 h selon la ville.", // TODO: confirm
    } as Bilingual,
    zones: { ar: "توصيل لجميع المدن المغربية", fr: "Livraison partout au Maroc" } as Bilingual,
  },

  payment: {
    method: { ar: "الدفع عند الاستلام", fr: "Paiement à la livraison" } as Bilingual,
    note: {
      ar: "ما كتخلصي حتى توصلك السلعة وتشوفيها بعينيك 🤍",
      fr: "Vous payez seulement à la réception de votre commande 🤍",
    } as Bilingual,
  },

  /** Exchange / return policy — placeholder text, TODO: confirm with the owner */
  exchangePolicy: {
    ar: [
      "يمكنك طلب استبدال القطعة خلال 48 ساعة من الاستلام، بشرط أن تكون في حالتها الأصلية مع الملصق.",
      "مصاريف التوصيل الخاصة بالاستبدال تكون على حساب الزبونة، إلا إذا كان الخطأ من عندنا.",
      "لا يتم استرجاع المبلغ، الاستبدال فقط (بمقاس آخر أو بقطعة أخرى).",
      "للاستبدال: تواصلي معنا على واتساب مع رقم الطلب وصورة القطعة.",
    ],
    fr: [
      "Échange possible sous 48 h après réception, article dans son état d'origine avec étiquette.",
      "Les frais de livraison de l'échange sont à la charge de la cliente, sauf erreur de notre part.",
      "Pas de remboursement : échange uniquement (autre taille ou autre article).",
      "Pour un échange : contactez-nous sur WhatsApp avec votre commande et une photo de l'article.",
    ],
  },

  /** Category filter chips (order = display order) */
  categories: [
    { id: "all", label: { ar: "الكل", fr: "Tout" } },
    { id: "jackets", label: { ar: "جاكيتات", fr: "Vestes" } },
    { id: "manteaux", label: { ar: "معاطف", fr: "Manteaux" } },
    { id: "ensembles", label: { ar: "أطقم", fr: "Ensembles" } },
    { id: "hauts", label: { ar: "توبات", fr: "Hauts" } },
    { id: "jupes", label: { ar: "تنانير", fr: "Jupes" } },
    { id: "robes", label: { ar: "فساتين", fr: "Robes" } },
  ] as { id: CategoryId; label: Bilingual }[],

  /**
   * Size guide (cm) — editable table shown in the "دليل المقاسات" modal.
   * TODO: replace with the real measurements of DUJA's pieces.
   */
  sizeGuide: {
    headers: {
      ar: ["المقاس", "الصدر", "الخصر", "الأرداف", "يناسب"],
      fr: ["Taille", "Poitrine", "Taille", "Hanches", "Équivaut"],
    },
    rows: [
      ["S", "84–88", "66–70", "90–94", "36"],
      ["M", "88–94", "70–76", "94–100", "38"],
      ["L", "94–100", "76–82", "100–106", "40"],
      ["XL", "100–106", "82–88", "106–112", "42"],
    ],
    note: {
      ar: "إلا كنتي بين جوج مقاسات، خودي المقاس الأكبر. ماشي متأكدة؟ سولينا على واتساب 🤍",
      fr: "Entre deux tailles ? Prenez la plus grande. Un doute ? Écrivez-nous sur WhatsApp 🤍",
    },
  },

  /**
   * Client reviews — screenshots from the "رأيك" highlight.
   * Put the files in /public/clientes and list them here, e.g. "/clientes/avis-1.jpg".
   * While this list is empty, the site shows DEMO text reviews (see demoReviews).
   */
  reviewScreenshots: [] as string[],

  /** DEMO reviews — shown only while reviewScreenshots is empty. Remove when you have real ones. */
  demoReviews: [
    { name: "Salma — الرباط", text: { ar: "الجاكيت وصلاتني فنهار، الجودة واعرة والمقاس مضبوط 😍", fr: "Veste reçue en un jour, qualité top et taille parfaite 😍" } },
    { name: "Hiba — الدار البيضاء", text: { ar: "تعامل راقي ورد سريع فالواتساب، شكراً DUJA 🤍", fr: "Service très pro et réponse rapide sur WhatsApp, merci DUJA 🤍" } },
    { name: "Nour — طنجة", text: { ar: "الباركا دافية بزاف وكيف فالتصويرة بالضبط ✨", fr: "La parka est très chaude et exactement comme en photo ✨" } },
  ],

  /** "اسألي DUJA" quick answers */
  faq: [
    {
      q: { ar: "واش التوصيل لجميع المدن؟", fr: "Vous livrez partout ?" },
      a: {
        ar: "إيه، كنوصلو لجميع المدن المغربية 🚛 والتوصيل مجاني. المدة من 24 حتى 72 ساعة.",
        fr: "Oui, nous livrons partout au Maroc 🚛, livraison gratuite. Délai : 24 à 72 h.",
      },
    },
    {
      q: { ar: "كيفاش نخلص؟", fr: "Comment payer ?" },
      a: {
        ar: "الدفع عند الاستلام 🤍 كتخلصي غير ملي توصلك السلعة.",
        fr: "Paiement à la livraison 🤍 vous payez à la réception.",
      },
    },
    {
      q: { ar: "شنو المقاس لي يناسبني؟", fr: "Quelle taille choisir ?" },
      a: {
        ar: "شوفي دليل المقاسات فصفحة المنتج، ولا صيفطي لينا الطول والوزن فواتساب ونعاونوك 😊",
        fr: "Consultez le guide des tailles sur la fiche produit, ou envoyez-nous taille et poids sur WhatsApp 😊",
      },
    },
    {
      q: { ar: "كيفاش ندير الطلب؟", fr: "Comment commander ?" },
      a: {
        ar: "اختاري اللون والمقاس، ضغطي على «اطلبي الآن»، عمري الاسم والهاتف والمدينة والعنوان — غادي يتحل واتساب بالطلب مكتوب، غير ضغطي «إرسال» ✨",
        fr: "Choisissez couleur et taille, appuyez sur « Commander maintenant », remplissez nom, téléphone, ville et adresse — WhatsApp s'ouvre avec la commande écrite, il ne reste qu'à appuyer sur Envoyer ✨",
      },
    },
  ] as { q: Bilingual; a: Bilingual }[],
};

/** Moroccan cities for the checkout form ("other" is added automatically). */
export const cities: Bilingual[] = [
  { ar: "الدار البيضاء", fr: "Casablanca" },
  { ar: "الرباط", fr: "Rabat" },
  { ar: "بوزنيقة", fr: "Bouznika" },
  { ar: "المحمدية", fr: "Mohammedia" },
  { ar: "تمارة", fr: "Témara" },
  { ar: "سلا", fr: "Salé" },
  { ar: "القنيطرة", fr: "Kénitra" },
  { ar: "الجديدة", fr: "El Jadida" },
  { ar: "سطات", fr: "Settat" },
  { ar: "برشيد", fr: "Berrechid" },
  { ar: "بنسليمان", fr: "Benslimane" },
  { ar: "الصخيرات", fr: "Skhirat" },
  { ar: "مراكش", fr: "Marrakech" },
  { ar: "فاس", fr: "Fès" },
  { ar: "مكناس", fr: "Meknès" },
  { ar: "طنجة", fr: "Tanger" },
  { ar: "تطوان", fr: "Tétouan" },
  { ar: "أكادير", fr: "Agadir" },
  { ar: "وجدة", fr: "Oujda" },
  { ar: "الناظور", fr: "Nador" },
  { ar: "الحسيمة", fr: "Al Hoceïma" },
  { ar: "بني ملال", fr: "Béni Mellal" },
  { ar: "خريبكة", fr: "Khouribga" },
  { ar: "آسفي", fr: "Safi" },
  { ar: "الصويرة", fr: "Essaouira" },
  { ar: "العرائش", fr: "Larache" },
  { ar: "خنيفرة", fr: "Khénifra" },
  { ar: "تازة", fr: "Taza" },
  { ar: "الراشيدية", fr: "Errachidia" },
  { ar: "ورزازات", fr: "Ouarzazate" },
  { ar: "العيون", fr: "Laâyoune" },
  { ar: "الداخلة", fr: "Dakhla" },
];
