import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ServiceHeroPlaceholder } from "@/components/service-hero-placeholder";
import { siteConfig } from "@/content/site";
import { services, type Service } from "@/content/services";
import {
  breadcrumbLd,
  businessId,
  jsonLdGraph,
} from "@/content/structured-data";

type Params = { slug: string };

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[æå]/g, "a")
    .replace(/ø/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-base leading-relaxed text-brand-slate/90 md:text-lg">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange"
      >
        <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6.5 10.2 9 12.7l4.5-5.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function StepsList({ items }: { items: string[] }) {
  return (
    <ol className="mt-4 space-y-6">
      {items.map((item, index) => (
        <li key={index} className="relative flex gap-4 pl-0">
          <div className="flex flex-col items-center">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange font-serif text-sm text-white">
              {index + 1}
            </span>
            {index < items.length - 1 && (
              <span aria-hidden="true" className="mt-1 w-px flex-1 bg-brand-gray/25" />
            )}
          </div>
          <span className="pb-2 pt-1.5 text-base leading-relaxed text-brand-slate/90 md:text-lg">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

function QuickFactsCard({ service }: { service: Service }) {
  if (!service.quickFacts || service.quickFacts.length === 0) return null;
  return (
    <div className="rounded-sm bg-brand-bg p-6">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
        I korte trekk
      </p>
      <ul className="mt-4 space-y-3">
        {service.quickFacts.map((fact, index) => (
          <li key={index} className="text-sm leading-relaxed text-brand-slate/90">
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CtaCard({ service }: { service: Service }) {
  return (
    <div className="rounded-sm bg-brand-slate p-6 text-white">
      <p className="font-serif text-lg leading-snug">
        Snakk med en fagperson om {service.name.toLowerCase()}
      </p>
      <Link
        href="/kontakt-oss"
        className="mt-4 inline-flex w-full items-center justify-center rounded-sm bg-brand-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-orange-light"
      >
        Kontakt oss
      </Link>
      <a
        href={siteConfig.phoneHref}
        className="mt-3 block text-center text-sm text-white/70 transition-colors hover:text-white"
      >
        eller ring {siteConfig.phone}
      </a>
    </div>
  );
}

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
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `${siteConfig.url}/tjenester/${service.slug}` },
    openGraph: {
      title: service.name,
      description: service.shortDescription,
      url: `${siteConfig.url}/tjenester/${service.slug}`,
      type: "website",
      images: service.heroImage ? [{ url: service.heroImage }] : undefined,
    },
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

  const tocEntries = [
    ...service.sections.map((s) => ({ heading: s.heading, id: slugify(s.heading) })),
    ...(service.bullets ?? []).map((b) => ({ heading: b.heading, id: slugify(b.heading) })),
  ];
  const showToc = tocEntries.length > 2;

  // Inline the first gallery image partway through the content; keep the rest
  // in a strip near the end so photos don't all pile up in one place.
  const [inlineImage, ...restGalleryImages] = service.galleryImages ?? [];
  const inlineAfterIndex = Math.min(1, service.sections.length - 1);

  const jsonLd = jsonLdGraph(
    {
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.shortDescription,
      provider: { "@id": businessId },
      areaServed: { "@type": "Place", name: siteConfig.areaServed },
      url: `${siteConfig.url}/tjenester/${service.slug}`,
    },
    breadcrumbLd([
      { name: "Hjem", path: "" },
      { name: "Tjenester", path: "/tjenester" },
      { name: service.name, path: `/tjenester/${service.slug}` },
    ]),
  );

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {service.heroImage ? (
        <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-brand-bg">
          <Image
            src={service.heroImage}
            alt={`${service.name} — Teknisk Byggkontroll AS`}
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

      <nav aria-label="Brødsmulesti" className="border-b border-brand-gray/15">
        <div className="mx-auto max-w-6xl px-6 py-3 text-xs text-brand-gray">
          <Link href="/" className="hover:text-brand-orange">
            Hjem
          </Link>{" "}
          /{" "}
          <Link href="/tjenester" className="hover:text-brand-orange">
            Tjenester
          </Link>{" "}
          / <span className="text-brand-slate">{service.name}</span>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-base leading-relaxed text-brand-slate/90 md:text-lg">
              {service.shortDescription}
            </p>

            {service.stat && (
              <div className="mt-10 border-l-2 border-brand-orange pl-6">
                <p className="font-serif text-4xl text-brand-slate md:text-5xl">
                  {service.stat.value}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-brand-slate/70">
                  {service.stat.label}
                </p>
              </div>
            )}

            <div className="mt-4 space-y-14 lg:hidden">
              <QuickFactsCard service={service} />
            </div>

            <div className="mt-12 space-y-14">
              {service.sections.map((section, index) => (
                <div key={section.heading} id={slugify(section.heading)} className="scroll-mt-24">
                  <h2 className="font-serif text-2xl text-brand-slate md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-brand-slate/90 md:text-lg">
                    {section.body.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                  {section.items && section.items.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <CheckItem key={itemIndex}>{item}</CheckItem>
                      ))}
                    </ul>
                  )}

                  {index === inlineAfterIndex && inlineImage && (
                    <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-sm bg-brand-bg">
                      <Image
                        src={inlineImage}
                        alt={`${service.name} — bilde fra oppdrag`}
                        fill
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {service.bullets && service.bullets.length > 0 && (
              <div className="mt-14 space-y-10 border-t border-brand-gray/15 pt-10">
                {service.bullets.map((bulletGroup) => (
                  <div
                    key={bulletGroup.heading}
                    id={slugify(bulletGroup.heading)}
                    className="scroll-mt-24"
                  >
                    <h2 className="font-serif text-2xl text-brand-slate md:text-3xl">
                      {bulletGroup.heading}
                    </h2>
                    {bulletGroup.style === "steps" ? (
                      <StepsList items={bulletGroup.items} />
                    ) : (
                      <ul className="mt-4 space-y-2">
                        {bulletGroup.items.map((item, index) => (
                          <CheckItem key={index}>{item}</CheckItem>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {restGalleryImages.length > 0 && (
              <div className="mt-14 border-t border-brand-gray/15 pt-10">
                <h2 className="font-serif text-2xl text-brand-slate md:text-3xl">
                  Fra oppdrag
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {restGalleryImages.map((src) => (
                    <div
                      key={src}
                      className="relative aspect-square overflow-hidden rounded-sm bg-brand-bg"
                    >
                      <Image
                        src={src}
                        alt={`${service.name} — bilde fra oppdrag`}
                        fill
                        sizes="(min-width: 768px) 33vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <QuickFactsCard service={service} />
              {showToc && (
                <div className="rounded-sm ring-1 ring-brand-slate/10 p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-orange">
                    Innhold
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {tocEntries.map((entry) => (
                      <li key={entry.id}>
                        <a
                          href={`#${entry.id}`}
                          className="text-sm leading-snug text-brand-slate/80 transition-colors hover:text-brand-orange"
                        >
                          {entry.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <CtaCard service={service} />
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-brand-gray/15 bg-brand-bg lg:hidden">
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
