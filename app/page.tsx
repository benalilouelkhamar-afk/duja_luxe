import { Hero } from "@/components/Hero";
import { NewStrip } from "@/components/NewStrip";
import { ProductsSection } from "@/components/ProductsSection";
import { TrustRow } from "@/components/TrustRow";
import { Reviews } from "@/components/Reviews";
import { AboutSection, FollowSection } from "@/components/AboutFollow";

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <Hero />
      <div className="-mt-6 space-y-16 sm:-mt-8 sm:space-y-20">
        <NewStrip />
        <ProductsSection />
        <TrustRow />
        <Reviews />
        <AboutSection />
        <FollowSection />
      </div>
    </div>
  );
}
