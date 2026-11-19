import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { ProductDetail } from "@/components/ProductDetail";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/produit/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  const title = `${p.name.ar} — ${p.name.fr}`;
  const description = `${p.description.ar.split("\n")[0]} — ${p.description.fr.split("\n")[0]}`;
  return {
    title,
    description,
    alternates: { canonical: `/produit/${p.slug}` },
    openGraph: { title, description, images: p.images[0] ? [{ url: p.images[0] }] : undefined },
  };
}

export default async function ProductPage(props: PageProps<"/produit/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail key={product.slug} slug={product.slug} />;
}
