import type { Metadata, Viewport } from "next";
import { Playfair_Display, Tajawal } from "next/font/google";
import "./globals.css";
import { settings } from "@/data/settings";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { CartDrawer } from "@/components/CartDrawer";
import { OrderSheet } from "@/components/OrderSheet";
import { SkipLink } from "@/components/SkipLink";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const title = "DUJA LUXE — أزياء نسائية | Bouznika, Maroc";
const description =
  "DUJA LUXE ✨ بوتيك أزياء نسائية من بوزنيقة: جاكيتات جلد، معاطف وأطقم. توصيل لجميع المدن والدفع عند الاستلام. — Boutique de mode femme à Bouznika : vestes en cuir, manteaux, ensembles. Livraison partout au Maroc, paiement à la livraison.";

export const metadata: Metadata = {
  metadataBase: new URL(settings.siteUrl),
  title: { default: title, template: "%s | DUJA LUXE" },
  description,
  applicationName: "DUJA LUXE",
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    siteName: "DUJA LUXE",
    locale: "ar_MA",
    alternateLocale: ["fr_MA"],
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  // Demo: hidden from search engines until settings.allowIndexing = true
  robots: settings.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#6b4a72",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <Providers>
          <SkipLink />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingActions />
          <CartDrawer />
          <OrderSheet />
        </Providers>
      </body>
    </html>
  );
}
