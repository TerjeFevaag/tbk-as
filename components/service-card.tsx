import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm bg-white ring-1 ring-brand-slate/10 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-bg">
        {service.hasRealImage ? (
          <Image
            src={service.heroImage}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-slate to-brand-orange p-6">
            <span className="text-center font-serif text-xl leading-tight text-white/90 md:text-2xl">
              {service.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl text-brand-slate">
          {service.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-slate/80">
          {service.shortDescription}
        </p>
        <Link
          href={`/tjenester/${service.slug}`}
          className="mt-5 inline-flex items-center text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange-light"
        >
          Les mer »
        </Link>
      </div>
    </article>
  );
}
