import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt oss | Teknisk Byggkontroll AS",
  description:
    "Ta kontakt med Teknisk Byggkontroll AS for innregulering, uavhengig kontroll i byggesak eller sprinklerkontroll.",
};

export default function KontaktOssPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
          Kontakt oss
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl text-brand-slate md:text-5xl">
          Ta kontakt for en uforpliktende samtale
        </h1>

        <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
              Kontaktinformasjon
            </p>
            <div className="mt-4 space-y-1 text-brand-slate">
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
            </div>
            <div className="mt-6 space-y-1 text-sm text-brand-gray">
              <p>Org.nr.: {siteConfig.orgNr}</p>
              <p>Konto nr.: {siteConfig.kontoNr}</p>
            </div>
          </div>

          <div className="max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
