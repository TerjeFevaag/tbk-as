import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/content/articles";

export function formatArticleDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1));
  const formatted = new Intl.DateTimeFormat("nb-NO", {
    day: day ? "numeric" : undefined,
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
  return formatted;
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm bg-white ring-1 ring-brand-slate/10 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-bg">
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-slate to-brand-orange p-6">
            <span className="text-center font-serif text-xl leading-tight text-white/90 md:text-2xl">
              {article.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-brand-orange">
          {formatArticleDate(article.publishedAt)}
        </p>
        <h3 className="mt-2 font-serif text-xl text-brand-slate">
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-slate/80">
          {article.excerpt}
        </p>
        <Link
          href={`/artikler/${article.slug}`}
          className="mt-5 inline-flex items-center text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange-light"
        >
          Les mer »
        </Link>
      </div>
    </article>
  );
}
