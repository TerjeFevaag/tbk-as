import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { articles } from "@/content/articles";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.url },
};

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
          Tjenester
        </p>
        <h2 className="mt-3 max-w-2xl font-serif text-3xl text-brand-slate md:text-4xl">
          Våre tjenester
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-28">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
              Erfaring og kompetanse
            </p>
            <h2 className="mt-3 font-serif text-3xl text-brand-slate md:text-4xl">
              Kontroll på energi og inneklima
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-slate/90 md:text-lg">
              Teknisk Byggkontroll har lang erfaring og høy kompetanse innen
              energiøkonomisering og inneklima. Som en uavhengig tredjepart
              kvalitetssikrer vi bygg og tekniske installasjoner gjennom
              uavhengig kontroll, innregulering og sprinklerkontroll – og
              dokumenterer resultatet i tydelige rapporter, slik at anlegget
              fungerer som prosjektert og energien ikke går til spille.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-slate/90 md:text-lg">
              Har du spørsmål eller et problem med energiforbruk eller
              inneklima?{" "}
              <Link
                href="/kontakt-oss"
                className="font-medium text-brand-orange transition-colors hover:text-brand-orange-light"
              >
                Ta kontakt
              </Link>{" "}
              for en uforpliktende samtale.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-brand-bg md:aspect-[3/4]">
            <Image
              src="/images/services/innregulering/innregulering-1.png"
              alt="Innregulering av teknisk anlegg"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-bg">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
            Uavhengig og nøytral
          </p>
          <p className="mt-4 max-w-2xl font-serif text-2xl leading-snug text-brand-slate md:text-3xl">
            Vi er en uavhengig og nøytral leverandør av målinger og analyser
            og ikke bundet til noen produsenter eller entreprenører som vil
            kunne påvirke vårt resultat.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
              Artikler
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl text-brand-slate md:text-4xl">
              Fra fagarkivet
            </h2>
          </div>
          <Link
            href="/artikler"
            className="inline-flex shrink-0 items-center text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange-light"
          >
            Se alle artikler »
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {[...articles]
            .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
            .slice(0, 3)
            .map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
        </div>
      </section>

      <section className="bg-brand-slate">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center md:py-20">
          <h2 className="max-w-xl font-serif text-2xl text-white md:text-3xl">
            Trenger du en uavhengig fagperson på ditt prosjekt?
          </h2>
          <Link
            href="/kontakt-oss"
            className="inline-flex shrink-0 items-center rounded-sm bg-brand-orange px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-orange-light"
          >
            Ta kontakt
          </Link>
        </div>
      </section>
    </main>
  );
}
