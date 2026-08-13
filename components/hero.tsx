import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/content/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] w-full items-center overflow-hidden bg-brand-slate">
      <Image
        src="/images/services/sprinkler/sprinkler-4.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="anim-kenburns object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-32">
        <p
          className="anim-rise text-xs font-medium uppercase tracking-[0.2em] text-brand-orange"
          style={{ animationDelay: "0.05s" }}
        >
          {siteConfig.shortName}
        </p>
        <h1
          className="anim-rise mt-4 max-w-2xl font-serif text-4xl leading-tight text-white md:text-6xl"
          style={{ animationDelay: "0.15s" }}
        >
          {siteConfig.tagline}
        </h1>
        <p
          className="anim-rise mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
          style={{ animationDelay: "0.3s" }}
        >
          Uavhengige tekniske kontroller og analyser du kan stole på, levert
          av en fagperson med solid erfaring fra sentrale Østlandet.
        </p>
        <Link
          href="/kontakt-oss"
          className="anim-rise mt-10 inline-flex items-center rounded-sm bg-brand-orange px-7 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-brand-orange-light"
          style={{ animationDelay: "0.45s" }}
        >
          Ta kontakt
        </Link>
      </div>
    </section>
  );
}
