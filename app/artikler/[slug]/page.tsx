import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatArticleDate } from "@/components/article-card";
import { articles } from "@/content/articles";
import { siteConfig } from "@/content/site";

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
    alternates: { canonical: `${siteConfig.url}/artikler/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${siteConfig.url}/artikler/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.coverImage ? [{ url: article.coverImage }] : undefined,
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    image: article.coverImage ? `${siteConfig.url}${article.coverImage}` : undefined,
    author: {
      "@type": "Person",
      name: "Olav L. Strøm",
      jobTitle: "Uavhengig kontrollør",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/artikler/${article.slug}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      <nav aria-label="Brødsmulesti" className="border-b border-brand-gray/15">
        <div className="mx-auto max-w-3xl px-6 py-3 text-xs text-brand-gray">
          <Link href="/" className="hover:text-brand-orange">
            Hjem
          </Link>{" "}
          /{" "}
          <Link href="/artikler" className="hover:text-brand-orange">
            Artikler
          </Link>{" "}
          / <span className="text-brand-slate">{article.title}</span>
        </div>
      </nav>

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-gray">
          <p className="font-medium uppercase tracking-[0.1em] text-brand-orange">
            {formatArticleDate(article.publishedAt)}
          </p>
          <span aria-hidden="true">·</span>
          <p>
            Skrevet av <span className="text-brand-slate">Olav L. Strøm</span>, uavhengig
            kontrollør hos {siteConfig.shortName}
          </p>
        </div>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-brand-slate/90 md:text-lg">
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {article.images && article.images.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-3">
            {article.images.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-sm bg-brand-bg"
              >
                <Image
                  src={src}
                  alt={`${article.title} — bilde fra oppdrag`}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

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
