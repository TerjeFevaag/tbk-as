import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatArticleDate } from "@/components/article-card";
import { articles } from "@/content/articles";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <main>
      {article.coverImage ? (
        <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-brand-bg">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/70 via-brand-slate/10 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-6xl px-6">
              <h1 className="max-w-xl font-serif text-4xl leading-tight text-white drop-shadow-sm md:text-6xl">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[32vh] min-h-[240px] w-full items-center bg-gradient-to-br from-brand-slate to-brand-orange">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h1 className="max-w-xl font-serif text-4xl leading-tight text-white md:text-6xl">
              {article.title}
            </h1>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-brand-orange">
          {formatArticleDate(article.publishedAt)}
        </p>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-brand-slate/90 md:text-lg">
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 border-t border-brand-gray/15 pt-8">
          <Link
            href="/artikler"
            className="inline-flex items-center text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange-light"
          >
            « Tilbake til artikler
          </Link>
        </div>
      </section>
    </main>
  );
}
