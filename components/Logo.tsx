import Image from "next/image";
import { settings } from "@/data/settings";

export function Logo({ size = 48, priority = false, className = "", alt = "DUJA LUXE" }: { size?: number; priority?: boolean; className?: string; alt?: string }) {
  return (
    <Image
      src={settings.logo}
      alt={alt}
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      className={`rounded-full ${className}`}
    />
  );
}
