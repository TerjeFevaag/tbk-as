import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
          404
        </p>
        <h1 className="mt-3 font-serif text-4xl text-brand-slate md:text-5xl">
          Siden finnes ikke
        </h1>
        <p className="mt-4 text-base leading-relaxed text-brand-slate/90 md:text-lg">
          Siden du ser etter finnes ikke, eller den kan ha blitt flyttet.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-sm bg-brand-orange px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange-light"
        >
          Til forsiden
        </Link>
      </section>
    </main>
  );
}
