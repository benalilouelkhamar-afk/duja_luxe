"use client";

import { useState } from "react";
import type { ColorId, Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { Modal } from "./Modal";
import { ColorPicker, SizePicker } from "./OptionPickers";
import { PriceTag } from "./PriceTag";

/** Small sheet to choose color + size before adding from the product grid. */
export function QuickAdd({ product, open, onClose }: { product: Product; open: boolean; onClose: () => void }) {
  const { t, tr } = useLang();
  const { add, setDrawerOpen } = useCart();
  const [color, setColor] = useState<ColorId | null>(product.colors[0] ?? null);
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [err, setErr] = useState(false);

  const submit = () => {
    if (!size) return setErr(true);
    add({ productId: product.id, color, size, qty: 1 });
    onClose();
    setDrawerOpen(true);
  };

  return (
    <Modal open={open} onClose={onClose} title={tr(product.name)}>
      <div className="space-y-5">
        <PriceTag product={product} />
        {product.colors.length > 0 && <ColorPicker name={`qa-${product.id}`} options={product.colors} value={color} onChange={setColor} />}
        <SizePicker
          name={`qa-${product.id}`}
          options={product.sizes}
          value={size}
          onChange={(s) => {
            setSize(s);
            setErr(false);
          }}
          error={err}
        />
        <button type="button" onClick={submit} className="w-full rounded-full bg-plum py-3.5 font-bold text-white transition hover:bg-plum-800">
          {t("add_to_cart")}
        </button>
      </div>
    </Modal>
  );
}
