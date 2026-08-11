import Link from "next/link";

import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/content/services";

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
