import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/content/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] w-full items-center overflow-hidden bg-brand-slate">
      <Image
        src="/images/services/sprinkler/sprinkler-1.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/35" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-orange">
          {siteConfig.shortName}
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-white md:text-6xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          Uavhengige tekniske kontroller og analyser du kan stole på, levert
          av en fagperson med solid erfaring fra sentrale Østlandet.
        </p>
        <Link
          href="/kontakt-oss"
          className="mt-10 inline-flex items-center rounded-sm bg-brand-orange px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-orange-light"
        >
          Ta kontakt
        </Link>
      </div>
    </section>
  );
}
