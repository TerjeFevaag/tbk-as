import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Artikler | Teknisk Byggkontroll AS",
  description:
    "Artikler og nyheter fra Teknisk Byggkontroll AS om innregulering, radonmåling, termografi og prosjektledelse.",
};

export default function ArtiklerPage() {
  const sortedArticles = [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
          Artikler
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl text-brand-slate md:text-5xl">
          Nyheter og fagartikler
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-slate/90 md:text-lg">
          Et utvalg artikler fra Teknisk Byggkontroll om innregulering,
          radonmåling, termografi og gjennomførte prosjekter.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {sortedArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
