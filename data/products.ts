/**
 * ─────────────────────────────────────────────────────────────
 *  DUJA LUXE — products
 *
 *  • price: number in MAD (e.g. 349) — or null to show "السعر عبر واتساب".
 *  • images: files in /public/products (first image = main photo).
 *    An empty list (or a missing file) shows an elegant lilac placeholder.
 *  • colors: ids from the `colors` table below.
 *  • Items marked  // DEMO ITEM  are fake examples: delete them before going live.
 * ─────────────────────────────────────────────────────────────
 */
import type { Bilingual, CategoryId } from "./settings";

export type ColorId =
  | "noir"
  | "marron"
  | "bordeaux"
  | "rose"
  | "camel"
  | "kaki"
  | "blanc"
  | "beige"
  | "bleu";

/** Color dots shown on the product page. Add a color here, then use its id in products. */
export const colors: Record<ColorId, { label: Bilingual; hex: string }> = {
  noir: { label: { ar: "أسود", fr: "Noir" }, hex: "#1c1a1d" },
  marron: { label: { ar: "مارون", fr: "Marron" }, hex: "#5a3a2c" },
  bordeaux: { label: { ar: "بوردو", fr: "Bordeaux" }, hex: "#6d1f2e" },
  rose: { label: { ar: "وردي", fr: "Rose" }, hex: "#f1b6c9" },
  camel: { label: { ar: "كاميل", fr: "Camel" }, hex: "#a8693a" },
  kaki: { label: { ar: "كاكي", fr: "Kaki" }, hex: "#59574a" },
  blanc: { label: { ar: "أبيض", fr: "Blanc" }, hex: "#f7f5f2" },
  beige: { label: { ar: "بيج", fr: "Beige" }, hex: "#d9c3a5" },
  bleu: { label: { ar: "أزرق", fr: "Bleu" }, hex: "#8fb0d6" },
};

export type Product = {
  id: string;
  /** URL part: /produit/<slug> */
  slug: string;
  name: Bilingual;
  category: Exclude<CategoryId, "all">;
  /** Price in MAD, or null → "السعر عبر واتساب" */
  price: number | null;
  sizes: string[];
  colors: ColorId[];
  images: string[];
  /**
   * Optional photos per color: when the client picks a color, the gallery shows these
   * (e.g. { noir: ["/products/veste-noire.jpg"] }). Colors without an entry use `images`.
   */
  colorImages?: Partial<Record<ColorId, string[]>>;
  isNew: boolean;
  inStock: boolean;
  /** Shows the "كمية محدودة" badge */
  limited: boolean;
  description: Bilingual;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "veste-en-cuir",
    name: { ar: "جاكيت جلد", fr: "Veste en cuir" },
    category: "jackets",
    price: null, // TODO: price
    sizes: ["S", "M", "L", "XL"],
    colors: ["noir", "marron", "bordeaux"],
    images: [
      "/products/veste-cuir-duo-bordeaux-noir.jpg",
      "/products/veste-cuir-duo-noir-bordeaux.jpg",
      "/products/veste-cuir-duo-marron.jpg",
      "/products/veste-cuir-look.jpg",
    ],
    colorImages: {
      noir: ["/products/veste-cuir-noir.jpg", "/products/veste-cuir-duo-bordeaux-noir.jpg"],
      marron: ["/products/veste-cuir-marron.jpg", "/products/veste-cuir-duo-marron.jpg"],
      bordeaux: ["/products/veste-cuir-bordeaux.jpg", "/products/veste-cuir-duo-noir-bordeaux.jpg", "/products/veste-cuir-look.jpg"],
    },
    isNew: true,
    inStock: true,
    limited: false,
    description: {
      ar: "جاكيت جلد بقصة عصرية وسحاب أنيق، متوفرة بعدة ألوان ✨\nقطعة أساسية كتعطي لكل لوك لمسة راقية من الصباح حتى العشية.",
      fr: "Veste en cuir à la coupe moderne et zip élégant, disponible en plusieurs couleurs ✨\nLa pièce essentielle qui rend chaque look chic, du matin au soir.",
    },
  },
  {
    id: "p2",
    slug: "veste-cuir-marron",
    name: { ar: "جاكيت جلد مارون", fr: "Veste cuir marron" },
    category: "jackets",
    price: null, // TODO: price
    sizes: ["S", "M", "L", "XL"],
    colors: ["marron"],
    images: [
      "/products/veste-cuir-marron-ceinture-1.jpg",
      "/products/veste-cuir-marron-ceinture-2.jpg",
      "/products/veste-cuir-marron-ceinture-3.jpg",
      "/products/veste-cuir-marron-ceinture-4.jpg",
      "/products/veste-cuir-marron-ceinture-5.jpg",
      "/products/veste-cuir-marron-ceinture-6.jpg",
    ],
    isNew: false,
    inStock: true,
    limited: false,
    description: {
      ar: "جاكيت جلد مارون بحزام كيرسم الخصر ويعطي سيلويت رائعة.\nلون دافي كيمشي مع الجين، الكلاسيك والبوطات.",
      fr: "Veste cuir marron ceinturée qui sublime la taille.\nUne teinte chaude qui se porte avec un jean, une tenue classique ou des bottes.",
    },
  },
  {
    id: "p3",
    slug: "ensemble-veste-jupe",
    name: { ar: "جاكيت + جيب", fr: "Ensemble veste et jupe" },
    category: "ensembles",
    price: null, // TODO: price
    sizes: ["S", "M", "L"],
    colors: ["noir"],
    images: ["/products/ensemble-veste-jupe.jpg"],
    isNew: false,
    inStock: true,
    limited: false,
    description: {
      ar: "طقم جاكيت قصيرة وجيب بلمسة جلد، لوك كامل واجد فدقيقة 🖤\nمثالي للخرجات والمناسبات، وتقدري تلبسي كل قطعة بوحدها.",
      fr: "Ensemble veste courte et jupe effet cuir : un look complet en une minute 🖤\nParfait pour les sorties, et chaque pièce se porte aussi seule.",
    },
  },
  {
    id: "p4",
    slug: "manteau",
    name: { ar: "معطف", fr: "Manteau" },
    category: "manteaux",
    price: null, // TODO: price
    sizes: ["S", "M", "L", "XL"],
    colors: ["marron"],
    images: ["/products/manteau-cuir-long.jpg"],
    isNew: true,
    inStock: true,
    limited: false,
    description: {
      ar: "معطف طويل بحزام، أناقة كاملة لأيام البرد ✨\nقصة مستقيمة كتطوّل السيلويت وكتعطيك حضور راقي.",
      fr: "Manteau long ceinturé, l'élégance absolue pour les jours froids ✨\nUne coupe droite qui allonge la silhouette.",
    },
  },
  {
    id: "p5",
    slug: "parka",
    name: { ar: "باركا", fr: "Parka" },
    category: "manteaux",
    price: null, // TODO: price
    sizes: ["S", "M", "L", "XL"],
    colors: ["kaki"],
    images: ["/products/parka-capuche.jpg"],
    isNew: false,
    inStock: true,
    limited: false,
    description: {
      ar: "باركا دافية بكابيشون فيه الفرو وحزام فالخصر.\nعملية وأنيقة فنفس الوقت، رفيقتك فالشتا كاملة.",
      fr: "Parka chaude à capuche fourrée et taille ceinturée.\nPratique et élégante à la fois : votre alliée tout l'hiver.",
    },
  },
  {
    id: "p6",
    slug: "t-shirt",
    name: { ar: "تيشيرت", fr: "T-shirt" },
    category: "hauts",
    price: null, // TODO: price
    sizes: ["Taille standard"],
    colors: ["blanc"],
    images: ["/products/top-raye.jpg"],
    isNew: false,
    inStock: true,
    limited: false,
    description: {
      ar: "تيشيرت مخطط بكمام طوال، مريح وساهل يتنسق.\nكيمشي مزيان مع الجين الواسع ومع الجاكيتات.",
      fr: "T-shirt rayé à manches longues, confortable et facile à assortir.\nParfait avec un jean large ou sous une veste.",
    },
  },
  {
    id: "p7",
    slug: "veste-courte",
    name: { ar: "جاكيت قصيرة", fr: "Veste courte" },
    category: "jackets",
    price: null, // TODO: price
    sizes: ["S", "M", "L"],
    colors: ["marron"],
    images: ["/products/veste-courte-ceinture.jpg"],
    isNew: false,
    inStock: true,
    limited: true,
    description: {
      ar: "جاكيت قصيرة بحزام، ستايل عصري وجريء — كمية محدودة ⏳\nكتبان زوينة مع الجيب العالية والسراول الواسعة.",
      fr: "Veste courte ceinturée, style moderne et affirmé — quantité limitée ⏳\nSublime avec une jupe ou un pantalon taille haute.",
    },
  },

  // ── Pieces seen in the photos but not in the brief list — confirm names with the owner ──
  {
    id: "p8",
    slug: "veste-cuir-bicolore",
    name: { ar: "جاكيت جلد بوردو بلونين", fr: "Veste cuir bicolore bordeaux" },
    category: "jackets",
    price: null, // TODO: price
    sizes: ["S", "M", "L", "XL"],
    colors: ["bordeaux"],
    images: ["/products/veste-bicolore-1.jpg", "/products/veste-bicolore-2.jpg"],
    isNew: true,
    inStock: true,
    limited: false,
    description: {
      ar: "جاكيت جلد بقطع بوردو ومارون، تفاصيل كتخليها مميزة.\nقطعة ستايل كتلفت الانتباه بلا ما تكون مبالغة.",
      fr: "Veste en cuir à empiècements bordeaux et marron, des détails qui font la différence.\nUne pièce stylée qui attire le regard, sans en faire trop.",
    },
  },
  {
    id: "p9",
    slug: "veste-camel-poches",
    name: { ar: "جاكيت كاميل بجيوب", fr: "Veste camel à poches" },
    category: "jackets",
    price: null, // TODO: price
    sizes: ["S", "M", "L", "XL"],
    colors: ["camel"],
    images: ["/products/veste-camel-poches.jpg"],
    isNew: false,
    inStock: true,
    limited: false,
    description: {
      ar: "جاكيت كاميل بجيوب كبار وقصة أوفرسايز.\nلون دافي وترندي كيعطي لكل لوك طابع كاجوال شيك.",
      fr: "Veste camel oversize à grandes poches.\nUne couleur chaude et tendance pour un look casual chic.",
    },
  },
  {
    id: "p10",
    slug: "chemise-rose",
    name: { ar: "قميص وردي", fr: "Chemise rose" },
    category: "hauts",
    price: null, // TODO: price
    sizes: ["S", "M", "L"],
    colors: ["rose"],
    images: ["/products/chemise-rose.jpg"],
    isNew: false,
    inStock: true,
    limited: false,
    description: {
      ar: "قميص وردي ناعم، لمسة أنثوية للبس اليومي 🌸\nكيمشي مع الجين، الجيب ولا تحت الجاكيت.",
      fr: "Chemise rose douce, la touche féminine du quotidien 🌸\nÀ porter avec un jean, une jupe ou sous une veste.",
    },
  },
  {
    id: "p11",
    slug: "veste-rose-zippee",
    name: { ar: "جاكيت وردية", fr: "Veste rose" },
    category: "jackets",
    price: 149, // seen on Instagram: "149dh"
    sizes: ["S", "M", "L"],
    colors: ["rose"],
    images: ["/products/veste-rose-zippee.jpg"],
    isNew: true, // "الأكثر طلباً" on Instagram
    inStock: true,
    limited: false,
    description: {
      ar: "جاكيت وردية قصيرة بسحاب، ناعمة ومريحة.\nلوك سبور شيك مثالي للنهار.",
      fr: "Veste rose courte zippée, douce et confortable.\nUn look sport chic idéal pour la journée.",
    },
  },

  // ── DEMO ITEMS (fake examples to fill the grid — delete before going live) ──
  {
    id: "demo1", // DEMO ITEM
    slug: "blouse-satin",
    name: { ar: "بلوزة ساتان", fr: "Blouse en satin" },
    category: "hauts",
    price: 199,
    sizes: ["S", "M", "L"],
    colors: ["beige", "noir"],
    images: [],
    isNew: false,
    inStock: true,
    limited: false,
    description: {
      ar: "بلوزة ساتان لامعة بلمسة ناعمة.\nأناقة بسيطة للخدمة وللخرجات.",
      fr: "Blouse en satin fluide et lumineuse.\nUne élégance simple, au bureau comme en soirée.",
    },
  },
  {
    id: "demo2", // DEMO ITEM
    slug: "jupe-midi-plissee",
    name: { ar: "جيب ميدي بليسي", fr: "Jupe midi plissée" },
    category: "jupes",
    price: 229,
    sizes: ["S", "M", "L"],
    colors: ["beige", "noir"],
    images: [],
    isNew: true,
    inStock: true,
    limited: false,
    description: {
      ar: "جيب ميدي بليسي كتتحرك معاك بخفة.\nمثالية مع البلوزات والجاكيتات القصيرة.",
      fr: "Jupe midi plissée qui bouge avec vous.\nParfaite avec une blouse ou une veste courte.",
    },
  },
  {
    id: "demo3", // DEMO ITEM
    slug: "jupe-cuir",
    name: { ar: "جيب جلد", fr: "Jupe effet cuir" },
    category: "jupes",
    price: 249,
    sizes: ["S", "M", "L"],
    colors: ["noir", "marron"],
    images: [],
    isNew: false,
    inStock: false,
    limited: false,
    description: {
      ar: "جيب قصيرة بلمسة جلد وقصة مستقيمة.\nكتتنسق مع الجاكيتات ديال المجموعة.",
      fr: "Jupe courte effet cuir à coupe droite.\nAssortie aux vestes de la collection.",
    },
  },
  {
    id: "demo4", // DEMO ITEM
    slug: "robe-midi",
    name: { ar: "فستان ميدي", fr: "Robe midi" },
    category: "robes",
    price: 329,
    sizes: ["S", "M", "L", "XL"],
    colors: ["bordeaux", "noir"],
    images: [],
    isNew: true,
    inStock: true,
    limited: true,
    description: {
      ar: "فستان ميدي بقصة كترسم الجسم.\nأنيق للمناسبات والعشيات.",
      fr: "Robe midi ajustée qui épouse la silhouette.\nChic pour les occasions et les soirées.",
    },
  },
  {
    id: "demo5", // DEMO ITEM
    slug: "robe-longue",
    name: { ar: "فستان طويل", fr: "Robe longue" },
    category: "robes",
    price: 389,
    sizes: ["S", "M", "L", "XL"],
    colors: ["rose", "beige"],
    images: [],
    isNew: false,
    inStock: true,
    limited: false,
    description: {
      ar: "فستان طويل خفيف بكمام واسعين.\nراحة وأناقة فقطعة وحدة.",
      fr: "Robe longue fluide à manches amples.\nConfort et élégance en une seule pièce.",
    },
  },
];

/** Photos to show for a product in a given color (falls back to the general photos). */
export const imagesFor = (p: Product, color: ColorId | null) =>
  (color && p.colorImages?.[color]?.length ? p.colorImages[color]! : p.images);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
