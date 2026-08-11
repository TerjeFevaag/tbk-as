import type { Metadata } from "next";
import Image from "next/image";

import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Om oss | Teknisk Byggkontroll AS",
  description:
    "Møt Olav L. Strøm, uavhengig og nøytral leverandør av tekniske kontroller og analyser i Fiskum og sentrale Østlandet.",
};

export default function OmOssPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
          Om oss
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl text-brand-slate md:text-5xl">
          En uavhengig fagperson du kan stole på
        </h1>

        <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <figure className="md:sticky md:top-28 md:self-start">
            <div className="overflow-hidden rounded-sm bg-brand-bg">
              <Image
                src="/images/olav-strom.jpg"
                alt="Olav L. Strøm"
                width={640}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <figcaption className="mt-3 text-sm text-brand-gray">
              Olav L. Strøm
            </figcaption>
          </figure>

          <div className="max-w-2xl space-y-6 text-base leading-relaxed text-brand-slate/90 md:text-lg">
            <p>
              Teknisk Byggkontroll har basert sin virksomhet med fokus på at
              kundenes behov kommer først. Hele vår bedrift er fokuserte på å
              møte disse behovene. Som et resultat av dette kommer en høy
              andel av vårt salg fra tidligere kunder og personer som har
              blitt anbefalt å bruke vår bedrift.
            </p>
            <p>
              Vi er en uavhengig og nøytral leverandør av målinger og
              analyser og ikke bundet til noen produsenter eller
              entreprenører som vil kunne påvirke vårt resultat.
            </p>
            <p>
              Vi håper å kunne gi deg denne muligheten til å gi deg den beste
              servicen i denne bransjen.
            </p>
            <p>Vi er beliggende på Fiskum og dekker det sentrale østlandet.</p>
          </div>
        </div>

        <div className="mt-16 border-t border-brand-gray/15 pt-10 md:mt-24">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
            Kontakt
          </p>
          <div className="mt-4 grid gap-1 text-brand-slate sm:grid-cols-2 sm:gap-x-8">
            <p>{siteConfig.name}</p>
            <p>{siteConfig.address}</p>
            <p>
              <a
                href={siteConfig.phoneHref}
                className="transition-colors hover:text-brand-orange"
              >
                Tlf: {siteConfig.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-brand-orange"
              >
                E-post: {siteConfig.email}
              </a>
            </p>
            <p>Org.nr.: {siteConfig.orgNr}</p>
            <p>Konto nr.: {siteConfig.kontoNr}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
