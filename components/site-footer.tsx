import { siteConfig } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-slate text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-serif text-xl">{siteConfig.name}</p>
            <p className="mt-3 max-w-xs text-sm text-white/70">{siteConfig.tagline}</p>
          </div>

          <div className="text-sm text-white/80">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-brand-orange-light">
              Kontakt
            </p>
            <p>{siteConfig.address}</p>
            <p className="mt-1">
              <a href={siteConfig.phoneHref} className="transition-colors hover:text-white">
                Tlf: {siteConfig.phone}
              </a>
            </p>
            <p className="mt-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-white"
              >
                E-post: {siteConfig.email}
              </a>
            </p>
          </div>

          <div className="text-sm text-white/80">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-brand-orange-light">
              Foretaksinformasjon
            </p>
            <p>Org.nr.: {siteConfig.orgNr}</p>
            <p className="mt-1">Konto nr.: {siteConfig.kontoNr}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>
            &copy; {year} {siteConfig.name}. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  );
}
