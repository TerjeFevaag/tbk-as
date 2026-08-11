import type { Metadata } from "next";

import { ServiceCard } from "@/components/service-card";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Tjenester | Teknisk Byggkontroll AS",
  description:
    "Innregulering, uavhengig kontroll i byggesak og sprinklerkontroll fra Teknisk Byggkontroll AS.",
};

export default function TjenesterPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
          Tjenester
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl text-brand-slate md:text-5xl">
          Hva vi kan hjelpe deg med
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-slate/90 md:text-lg">
          Teknisk Byggkontroll er en uavhengig og nøytral leverandør av
          målinger og analyser og ikke bundet til noen produsenter eller
          entreprenører som vil kunne påvirke vårt resultat.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </main>
  );
}
