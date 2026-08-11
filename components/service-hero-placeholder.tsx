/**
 * Full-width hero used for services that have no supplied client photography
 * ("Uavhengig kontroll i byggesak" as of Task 8). A gradient field carries an
 * inline SVG geometric pattern (a faint grid of right angles, echoing
 * building plans/inspection lines) with the service name overlaid in large
 * serif type — styled to look like a deliberate brand treatment rather than
 * a missing image.
 */
export function ServiceHeroPlaceholder({ name }: { name: string }) {
  return (
    <div className="relative flex h-[42vh] min-h-[320px] w-full items-center overflow-hidden bg-gradient-to-br from-brand-slate via-brand-slate to-brand-orange/40">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="service-hero-pattern"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 36 H72 M36 0 V72"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="36" cy="36" r="2.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#service-hero-pattern)" />
      </svg>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <h1 className="max-w-xl font-serif text-4xl leading-tight text-white drop-shadow-sm md:text-6xl">
          {name}
        </h1>
      </div>
    </div>
  );
}
