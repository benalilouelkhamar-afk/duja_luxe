export function SectionTitle({ title, sub, id, light = false }: { title: string; sub?: string; id?: string; light?: boolean }) {
  return (
    <div className="mb-8 text-center">
      <h2 id={id} className={`text-3xl font-extrabold sm:text-4xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <span aria-hidden className={`mx-auto mt-3 block h-1 w-14 rounded-full ${light ? "bg-lilac" : "bg-plum"}`} />
      {sub && <p className={`mt-3 text-[15px] ${light ? "text-white/90" : "text-ink-soft"}`}>{sub}</p>}
    </div>
  );
}
