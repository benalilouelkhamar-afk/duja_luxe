"use client";

import { LangProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <CartProvider>{children}</CartProvider>
    </LangProvider>
  );
}
