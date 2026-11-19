"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductById, type ColorId } from "@/data/products";

export type CartLine = {
  /** unique per product + color + size */
  key: string;
  productId: string;
  color: ColorId | null;
  size: string;
  qty: number;
};
export type OrderItem = Omit<CartLine, "key">;

/** What the "Commander maintenant" sheet is ordering: one product, or the whole cart. */
export type OrderRequest = { items: OrderItem[]; fromCart: boolean };

type Ctx = {
  lines: CartLine[];
  count: number;
  /** null when at least one item has no price */
  total: number | null;
  add: (l: OrderItem) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  order: OrderRequest | null;
  openOrder: (o: OrderRequest) => void;
  closeOrder: () => void;
};

const CartContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "duja-cart-v1";
export const MAX_QTY = 10;

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    // drop lines whose product no longer exists
    return Array.isArray(parsed) ? parsed.filter((l) => getProductById(l.productId) && l.qty > 0) : [];
  } catch {
    return [];
  }
}

/** Total in MAD, or null when at least one item has no price yet. */
export function totalOf(items: OrderItem[]): number | null {
  let total: number | null = 0;
  for (const l of items) {
    const p = getProductById(l.productId);
    if (!p || p.price === null) return null;
    total += p.price * l.qty;
  }
  return total;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [order, setOrder] = useState<OrderRequest | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore saved cart after hydration
    setLines(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage full or blocked: cart still works for this visit */
    }
  }, [lines, ready]);

  const add = useCallback((l: OrderItem) => {
    const key = `${l.productId}|${l.color ?? "-"}|${l.size}`;
    setLines((prev) => {
      const found = prev.find((x) => x.key === key);
      if (found) return prev.map((x) => (x.key === key ? { ...x, qty: Math.min(MAX_QTY, x.qty + l.qty) } : x));
      return [...prev, { ...l, key }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => prev.map((x) => (x.key === key ? { ...x, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : x)));
  }, []);

  const remove = useCallback((key: string) => setLines((prev) => prev.filter((x) => x.key !== key)), []);
  const clear = useCallback(() => setLines([]), []);

  const openOrder = useCallback((o: OrderRequest) => {
    setDrawerOpen(false);
    setOrder(o);
  }, []);
  const closeOrder = useCallback(() => setOrder(null), []);

  const { count, total } = useMemo(
    () => ({ count: lines.reduce((n, l) => n + l.qty, 0), total: totalOf(lines) }),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{ lines, count, total, add, setQty, remove, clear, drawerOpen, setDrawerOpen, order, openOrder, closeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

/** Cart lines → order items (drops the internal key). */
export const toItems = (lines: CartLine[]): OrderItem[] =>
  lines.map((l) => ({ productId: l.productId, color: l.color, size: l.size, qty: l.qty }));
