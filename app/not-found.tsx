import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 py-20">
      <div className="glass mx-auto max-w-md rounded-[28px] p-8 text-center">
        <p className="font-serif text-5xl font-bold text-plum">404</p>
        <p className="mt-3 text-lg text-ink">هاد الصفحة ما كايناش — Page introuvable</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-plum px-6 py-3 font-bold text-white hover:bg-plum-800">
          الرئيسية — Accueil
        </Link>
      </div>
    </div>
  );
}
