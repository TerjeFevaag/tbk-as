import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ServiceHeroPlaceholder } from "@/components/service-hero-placeholder";
import { services } from "@/content/services";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} | Teknisk Byggkontroll AS`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <main>
      {service.hasRealImage ? (
        <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-brand-bg">
          <Image
            src={service.heroImage}
            alt={service.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/70 via-brand-slate/10 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-6xl px-6">
              <h1 className="max-w-xl font-serif text-4xl leading-tight text-white drop-shadow-sm md:text-6xl">
                {service.name}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <ServiceHeroPlaceholder name={service.name} />
      )}

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-base leading-relaxed text-brand-slate/90 md:text-lg">
          {service.shortDescription}
        </p>

        <div className="mt-12 space-y-14">
          {service.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-serif text-2xl text-brand-slate md:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-slate/90 md:text-lg">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {service.bullets && service.bullets.length > 0 && (
          <div className="mt-14 space-y-10 border-t border-brand-gray/15 pt-10">
            {service.bullets.map((bulletGroup) => (
              <div key={bulletGroup.heading}>
                <h2 className="font-serif text-2xl text-brand-slate md:text-3xl">
                  {bulletGroup.heading}
                </h2>
                <ul className="mt-4 space-y-2">
                  {bulletGroup.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-base leading-relaxed text-brand-slate/90 md:text-lg"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {service.galleryImages && service.galleryImages.length > 0 && (
          <div className="mt-14 border-t border-brand-gray/15 pt-10">
            <h2 className="font-serif text-2xl text-brand-slate md:text-3xl">
              Fra oppdrag
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {service.galleryImages.map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-sm bg-brand-bg"
                >
                  <Image
                    src={src}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="border-t border-brand-gray/15 bg-brand-bg">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-20">
          <h2 className="font-serif text-2xl text-brand-slate md:text-3xl">
            Ønsker du {service.name.toLowerCase()}?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-brand-slate/90 md:text-lg">
            Ta kontakt for en uforpliktende vurdering av ditt behov.
          </p>
          <Link
            href="/kontakt-oss"
            className="mt-8 inline-flex items-center justify-center rounded-sm bg-brand-orange px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange-light"
          >
            Kontakt oss
          </Link>
        </div>
      </section>
    </main>
  );
}
