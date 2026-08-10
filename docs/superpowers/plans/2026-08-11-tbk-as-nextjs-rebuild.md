# tbk-as.no Next.js Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild tbk-as.no as a modern, professional Next.js site for Teknisk Byggkontroll AS, matching the approved design spec, ready to push to GitHub and deploy on Vercel.

**Architecture:** Next.js 15 App Router + TypeScript + Tailwind CSS, static content in typed TS data modules (no CMS, no database), all pages statically rendered. Brand assets (logo SVG, photos) live in `public/`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, next/font, next/image. No test framework is added — this is a static content site with no business logic; verification is `next build` passing type-check/lint plus manual visual QA in a browser (per the `run` skill) at the end of each page task.

## Global Constraints

- Norwegian (Bokmål) only, no i18n.
- Brand colors (exact hex, from spec): primary/accent `#ef7c2f`, accent tint `#e98a2f`, secondary slate `#4b5766`, muted warm gray `#6b6969`, light background `#eaedf1`, error `#b30000`.
- Contact block (must appear in footer, Contact page, About page, verbatim):
  Teknisk Byggkontroll AS · Havnehagan 22, 3322 Fiskum · Tlf: 948 51 228 · E-post: olav@tbk-as.no · Org.nr.: 914 217 288 MVA · Konto nr.: 2480 10 80185
- Only 3 services: Innregulering, Uavhengig kontroll i byggesak, Sprinklerkontroll. No other service pages.
- No "Våre kunder" page.
- Contact form UI must be fully styled and validated client-side, but submit is a stubbed no-op with a `// TODO(contact-backend):` comment — do not wire a real backend.
- Reference source folders (`Current Website/`, `Teknisk Byggkontroll _ Info, images and text/`, the `.zip`) are git-ignored — never add them to the Next.js app or commit them.
- Repo: push to `TerjeFevaag/tbk-as` (private) on GitHub once the site builds cleanly.
- Design must read as a bespoke corporate site, not a generic template — use the `frontend-design` skill during layout/styling tasks for type pairing, spacing, and motion decisions.

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.eslintrc` (or `eslint.config.mjs`)

**Interfaces:**
- Produces: a runnable Next.js 15 + TypeScript + Tailwind v4 project at the repo root that later tasks add files into.

- [ ] **Step 1: Run the Next.js scaffolder**

```bash
cd "C:\Users\OK COMPUTER\Desktop\Terje Websites\tbk-as"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
```

When prompted about the existing non-empty directory, confirm continuing (the scaffolder only touches its own files; `Current Website/`, `Teknisk Byggkontroll _ Info, images and text/`, `Notes.txt`, `docs/`, `.gitignore` are untouched since they're not Next.js file names).

- [ ] **Step 2: Verify the scaffold builds**

Run: `npm run build`
Expected: build completes with the default Next.js starter page, exit code 0.

- [ ] **Step 3: Replace the default homepage placeholder**

Edit `app/page.tsx` to a minimal placeholder so later tasks have a clean slate:

```tsx
export default function Home() {
  return <main className="p-8">TBK AS — under construction</main>;
}
```

- [ ] **Step 4: Confirm reference folders are still git-ignored**

Run: `git status --short`
Expected: only new Next.js scaffold files show as untracked/added — `Current Website/`, `Teknisk Byggkontroll _ Info, images and text/`, and the `.zip` must NOT appear.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs app eslint.config.mjs public
git commit -m "Scaffold Next.js 15 + TypeScript + Tailwind project"
```

---

### Task 2: Brand tokens, fonts, and logo asset

**Files:**
- Create: `content/site.ts`
- Create: `public/images/logo.svg`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `content/site.ts` exporting:
  ```ts
  export const siteConfig = {
    name: "Teknisk Byggkontroll AS",
    shortName: "Teknisk Byggkontroll",
    tagline: "Uavhengig kontroll av bygg, varme og brannsikkerhet",
    address: "Havnehagan 22, 3322 Fiskum",
    phone: "948 51 228",
    phoneHref: "tel:+4794851228",
    email: "olav@tbk-as.no",
    orgNr: "914 217 288 MVA",
    kontoNr: "2480 10 80185",
    url: "https://www.tbk-as.no",
  } as const;
  ```
  This is consumed by the footer (Task 3), About page (Task 6), and Contact page (Task 9).

- [ ] **Step 1: Write `content/site.ts`** with the exact object above.

- [ ] **Step 2: Recreate the logo as an SVG**

Read the reference raster at `Current Website/Om oss - Teknisk Byggkontroll_files/teknisk_logo.png` for exact proportions/colors, then hand-author `public/images/logo.svg`: an orange/red gradient swirl mark (`#ef7c2f` → `#e98a2f`) to the left of the wordmark "TEKNISK BYGGKONTROLL" set in small caps, dark slate (`#4b5766`) fill. Keep it a single scalable `<svg viewBox="0 0 320 48">` so it can be dropped into the header at any size without pixelation.

- [ ] **Step 3: Add brand colors to Tailwind theme**

In `app/globals.css` (Tailwind v4 uses `@theme` inline in CSS), add:

```css
@theme {
  --color-brand-orange: #ef7c2f;
  --color-brand-orange-light: #e98a2f;
  --color-brand-slate: #4b5766;
  --color-brand-gray: #6b6969;
  --color-brand-bg: #eaedf1;
  --color-brand-error: #b30000;
}
```

- [ ] **Step 4: Add self-hosted fonts via next/font**

In `app/layout.tsx`, import a serif display font and a sans body font via `next/font/google` (e.g. `Fraunces` for headings, `Inter` for body — both are Google fonts self-hosted at build time by `next/font`, no runtime network request), apply their CSS variables to `<html>`, and reference them in `app/globals.css` via `font-family: var(--font-fraunces)` / `var(--font-inter)` on heading/body base styles.

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build passes; `next/font` fonts download at build time without error.

- [ ] **Step 6: Commit**

```bash
git add content/site.ts public/images/logo.svg app/globals.css app/layout.tsx
git commit -m "Add brand tokens, fonts, and logo SVG"
```

---

### Task 3: Site shell — header nav and footer

**Files:**
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `siteConfig` from `content/site.ts` (Task 2), `public/images/logo.svg` (Task 2).
- Produces: `<SiteHeader />` and `<SiteFooter />` components rendered in the root layout on every page, wrapping `{children}`.

- [ ] **Step 1: Write `components/site-header.tsx`**

A sticky header with the logo (linking to `/`) on the left and nav links on the right: Hjem (`/`), Tjenester (`/tjenester`), Om oss (`/om-oss`), Artikler (`/artikler`), Kontakt oss (`/kontakt-oss`). Use a `<nav>` with a mobile hamburger toggle (client component, `"use client"`, `useState` for open/closed) collapsing to a full-screen menu below `md` breakpoint.

- [ ] **Step 2: Write `components/site-footer.tsx`**

Renders `siteConfig.name`, `siteConfig.address`, phone (as `<a href={siteConfig.phoneHref}>`), email (as `<a href={"mailto:" + siteConfig.email}>`), org.nr, konto nr, and a copyright line with the current year computed via `new Date().getFullYear()`, on a `bg-brand-slate text-white` background.

- [ ] **Step 3: Wire into `app/layout.tsx`**

```tsx
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
// ...
<body>
  <SiteHeader />
  {children}
  <SiteFooter />
</body>
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, open `http://localhost:3000`, confirm header/footer render on the placeholder homepage, nav links resolve (pages don't exist yet — 404 is expected for now except `/`), mobile menu toggles at narrow viewport.

- [ ] **Step 5: Commit**

```bash
git add components/site-header.tsx components/site-footer.tsx app/layout.tsx
git commit -m "Add site header and footer shell"
```

---

### Task 4: Service content data module

**Files:**
- Create: `content/services.ts`

**Interfaces:**
- Produces:
  ```ts
  export type Service = {
    slug: string;
    name: string;
    shortDescription: string;
    heroImage: string; // path under /public/images
    sections: { heading: string; body: string[] }[]; // body = paragraphs
    bullets?: { heading: string; items: string[] }[];
  };
  export const services: Service[] = [ /* 3 entries, slugs: "innregulering", "uavhengig-kontroll-i-byggesak", "sprinklerkontroll" */ ];
  ```
  Consumed by the Tjenester overview page (Task 7) and service detail page (Task 8).

- [ ] **Step 1: Read source copy**

Read `Teknisk Byggkontroll _ Info, images and text/Innregulering varmeanlegg.docx` and `Sprinklerkontroll.docx` (already extracted in this conversation — reuse that text) and the "Uavhengig kontroll Byggesak" suggested text from `Notes.txt`.

- [ ] **Step 2: Write `content/services.ts`**

Populate all 3 `Service` entries with the `Service` type above, using the full docx/notes copy verbatim (Norwegian), broken into `sections` matching each doc's headings (e.g. for Innregulering: "Hvorfor bør varme- og kjøleanlegg innreguleres", "Hva er innregulering?", "Fordeler med riktig innregulering" as a `bullets` entry, "Hvor mye energi kan man spare?", "Når bør anlegget innreguleres?" as a `bullets` entry, "Hva bør en innregulering omfatte?", "Riktig effekt på riktig sted"). Do the same structural mapping for Sprinklerkontroll's headings, and for Uavhengig kontroll use the shorter Notes.txt copy (heading "Uavhengig kontroll Byggesak", "Hva kontrolleres?" bullets, "Hvordan gjennomføres kontrollen?" bullets, "Fordeler" bullets). Replace the generic placeholder `[Firmanavn]` / `post@firma.no` / `00 00 00 00` in the Notes.txt copy with the real `siteConfig` values. Set `heroImage` to `/images/services/innregulering-hero.jpg`, `/images/services/uavhengig-kontroll-hero.jpg` (styled placeholder per spec — use a CSS gradient placeholder component instead of a real file, see Task 8 Step 3), `/images/services/sprinkler-hero.jpg`.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no type errors.

- [ ] **Step 4: Commit**

```bash
git add content/services.ts
git commit -m "Add service content data module"
```

---

### Task 5: Article content data module and image migration

**Files:**
- Create: `content/articles.ts`
- Create: `public/images/articles/*` (migrated images)

**Interfaces:**
- Produces:
  ```ts
  export type Article = {
    slug: string;
    title: string;
    publishedAt: string; // ISO date, best-effort from original if findable, else omit precision to YYYY-MM
    excerpt: string;
    coverImage?: string;
    body: string[]; // paragraphs, Norwegian, HTML-stripped
  };
  export const articles: Article[] = [ /* 6 entries */ ];
  ```
  Consumed by the Articles archive and article detail page (Task 10).

- [ ] **Step 1: Extract text from each saved article HTML**

For each of the 6 files in `Current Website/Articles/*.html`, strip WordPress/theme boilerplate (nav, sidebar, footer, share buttons) and keep only the article title and body paragraphs, converting to plain paragraph strings for the `body` array.

- [ ] **Step 2: Copy relevant images**

For each article, copy any inline content images referenced from its matching `_files/` folder into `public/images/articles/<slug>/`, using `next/image`-friendly filenames (lowercase, hyphenated, no spaces/parentheses).

- [ ] **Step 3: Write `content/articles.ts`** with all 6 entries populated from Steps 1–2, slugs: `innregulering-varmeanlegg`, `innregulering-ventilasjon`, `leier-du-ut-bolig`, `lekker-boligen-din-varme`, `prosjektledelse-frydenhaug-skole`, `radonmaling-vinterhalvaret`.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no type errors.

- [ ] **Step 5: Commit**

```bash
git add content/articles.ts public/images/articles
git commit -m "Migrate article content and images"
```

---

### Task 6: Om oss (About) page

**Files:**
- Create: `app/om-oss/page.tsx`
- Copy: Olav's portrait from `Teknisk Byggkontroll _ Info, images and text/Olav Passfoto.jpg` to `public/images/olav-strom.jpg`

**Interfaces:**
- Consumes: `siteConfig` from `content/site.ts`.
- Produces: page at route `/om-oss`.

- [ ] **Step 1: Copy the portrait image** to `public/images/olav-strom.jpg`.

- [ ] **Step 2: Write `app/om-oss/page.tsx`**

Render the existing About copy (from the old site, reused verbatim):

> "Teknisk Byggkontroll har basert sin virksomhet med fokus på at kundenes behov kommer først. Hele vår bedrift er fokuserte på å møte disse behovene. Som et resultat av dette kommer en høy andel av vårt salg fra tidligere kunder og personer som har blitt anbefalt å bruke vår bedrift."
>
> "Vi er en uavhengig og nøytral leverandør av målinger og analyser og ikke bundet til noen produsenter eller entreprenører som vil kunne påvirke vårt resultat."
>
> "Vi håper å kunne gi deg denne muligheten til å gi deg den beste servicen i denne bransjen."
>
> "Vi er beliggende på Fiskum og dekker det sentrale østlandet."

Layout: two-column on desktop — portrait (`next/image`, `public/images/olav-strom.jpg`, with a caption "Olav L. Strøm") beside the text; contact block below using `siteConfig` fields; export `metadata: Metadata` with title `"Om oss | Teknisk Byggkontroll AS"`.

- [ ] **Step 3: Verify**

Run: `npm run dev`, visit `/om-oss`, confirm portrait renders, text matches source, contact block shows correct phone/email/address.

- [ ] **Step 4: Commit**

```bash
git add app/om-oss public/images/olav-strom.jpg
git commit -m "Add Om oss page"
```

---

### Task 7: Tjenester (Services overview) page

**Files:**
- Create: `app/tjenester/page.tsx`
- Create: `components/service-card.tsx`

**Interfaces:**
- Consumes: `services` array from `content/services.ts` (Task 4).
- Produces: `<ServiceCard service={Service} />` reusable component (also consumed by the homepage in Task 11); page at route `/tjenester`.

- [ ] **Step 1: Write `components/service-card.tsx`**

Props: `{ service: Service }`. Renders `service.heroImage` (or a gradient placeholder if the file doesn't exist on disk — check via a `hasRealImage` boolean field added to a subset of entries, defaulting to a styled `bg-gradient-to-br from-brand-slate to-brand-orange` div with the service name overlaid when no image is available), `service.name`, `service.shortDescription`, and a "Les mer »" link to `/tjenester/${service.slug}`.

- [ ] **Step 2: Write `app/tjenester/page.tsx`**

Intro paragraph (reused from old site): "Teknisk Byggkontroll er en uavhengig og nøytral leverandør av målinger og analyser og ikke bundet til noen produsenter eller entreprenører som vil kunne påvirke vårt resultat." Then a 3-column grid of `<ServiceCard>` mapped over `services`. Export `metadata` with title `"Tjenester | Teknisk Byggkontroll AS"`.

- [ ] **Step 3: Verify**

Run: `npm run dev`, visit `/tjenester`, confirm 3 cards render with correct names/descriptions and links.

- [ ] **Step 4: Commit**

```bash
git add app/tjenester/page.tsx components/service-card.tsx
git commit -m "Add Tjenester overview page"
```

---

### Task 8: Service detail page (dynamic route)

**Files:**
- Create: `app/tjenester/[slug]/page.tsx`
- Create: `components/service-hero-placeholder.tsx`

**Interfaces:**
- Consumes: `services` from `content/services.ts` (Task 4).
- Produces: 3 statically-generated pages at `/tjenester/innregulering`, `/tjenester/uavhengig-kontroll-i-byggesak`, `/tjenester/sprinklerkontroll`.

- [ ] **Step 1: Copy real images**

Copy `Innregulering.png`, `Innregulering 2.jpg`, `Innregulering vent.jpg`, `Innregulering vent 3.png` to `public/images/services/innregulering/`, and `Sprinkler 1.jpg` through `Sprinkler 4.jpg` to `public/images/services/sprinkler/`, renamed to lowercase-hyphenated filenames (e.g. `innregulering-1.png`, `sprinkler-1.jpg`).

- [ ] **Step 2: Write `components/service-hero-placeholder.tsx`**

For the "Uavhengig kontroll i byggesak" page, which has no supplied photos: a full-width `bg-gradient-to-br from-brand-slate via-brand-slate to-brand-orange/40` block with a subtle geometric pattern (SVG background, inline) and the service name in large white type overlaid — styled well enough to look intentional, not like a broken image.

- [ ] **Step 3: Write `app/tjenester/[slug]/page.tsx`**

```ts
import { services } from "@/content/services";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return { title: `${service.name} | Teknisk Byggkontroll AS` };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();
  // render hero (real image via next/image for innregulering/sprinklerkontroll,
  // <ServiceHeroPlaceholder name={service.name} /> for uavhengig-kontroll-i-byggesak),
  // then map service.sections to headed paragraph blocks, and service.bullets to
  // <ul> lists, then a closing CTA linking to /kontakt-oss.
}
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, visit all 3 service URLs, confirm correct copy/images/placeholder render, confirm an invalid slug (`/tjenester/does-not-exist`) 404s.

- [ ] **Step 5: Commit**

```bash
git add app/tjenester/[slug] components/service-hero-placeholder.tsx public/images/services
git commit -m "Add service detail pages"
```

---

### Task 9: Kontakt oss (Contact) page with stub form

**Files:**
- Create: `app/kontakt-oss/page.tsx`
- Create: `components/contact-form.tsx`

**Interfaces:**
- Consumes: `siteConfig` from `content/site.ts`.
- Produces: page at route `/kontakt-oss`; `<ContactForm />` client component reused nowhere else in this plan but structured to be droppable onto other pages later.

- [ ] **Step 1: Write `components/contact-form.tsx`**

`"use client"` component with controlled inputs (navn, e-post, telefon, melding), client-side validation (required navn/e-post/melding, e-post regex check) surfacing inline error text in `text-brand-error`. On valid submit:

```tsx
// TODO(contact-backend): wire this to a real email delivery service (e.g. Resend)
// once a backend decision is made. Currently a no-op that only shows a success message.
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!isValid) return;
  setSubmitted(true);
}
```

Show a "Takk! Vi tar kontakt så snart som mulig." confirmation in place of the form when `submitted` is true (this is purely client-state, resets on reload — acceptable since there's no backend yet).

- [ ] **Step 2: Write `app/kontakt-oss/page.tsx`**

Two-column layout: contact block (address, phone as tel: link, email as mailto: link, org.nr, konto nr from `siteConfig`) beside `<ContactForm />`. Export `metadata` with title `"Kontakt oss | Teknisk Byggkontroll AS"`.

- [ ] **Step 3: Verify**

Run: `npm run dev`, visit `/kontakt-oss`, submit the form with invalid data (confirm inline errors), then valid data (confirm success message appears, no network request is made — check browser devtools Network tab shows nothing fired).

- [ ] **Step 4: Commit**

```bash
git add app/kontakt-oss components/contact-form.tsx
git commit -m "Add Kontakt oss page with stub contact form"
```

---

### Task 10: Artikler (Articles) archive and detail pages

**Files:**
- Create: `app/artikler/page.tsx`
- Create: `app/artikler/[slug]/page.tsx`
- Create: `components/article-card.tsx`

**Interfaces:**
- Consumes: `articles` from `content/articles.ts` (Task 5).
- Produces: archive at `/artikler`, 6 detail pages at `/artikler/<slug>`.

- [ ] **Step 1: Write `components/article-card.tsx`**

Props `{ article: Article }`, renders `coverImage` (if present) via `next/image`, `title`, `excerpt`, formatted `publishedAt`, link to `/artikler/${article.slug}`.

- [ ] **Step 2: Write `app/artikler/page.tsx`**

Grid of `<ArticleCard>` mapped over `articles` sorted by `publishedAt` descending. Export `metadata` with title `"Artikler | Teknisk Byggkontroll AS"`.

- [ ] **Step 3: Write `app/artikler/[slug]/page.tsx`**

Same `generateStaticParams`/`generateMetadata`/`notFound()` pattern as Task 8's service detail page, adapted for `articles`: render `title`, formatted `publishedAt`, `coverImage` if present, then `body` paragraphs.

- [ ] **Step 4: Verify**

Run: `npm run dev`, visit `/artikler`, confirm all 6 cards render, click through each to its detail page, confirm content matches the migrated source, confirm invalid slug 404s.

- [ ] **Step 5: Commit**

```bash
git add app/artikler components/article-card.tsx
git commit -m "Add Artikler archive and detail pages"
```

---

### Task 11: Front page (Forside)

**Files:**
- Modify: `app/page.tsx`
- Create: `components/hero.tsx`

**Interfaces:**
- Consumes: `services` from `content/services.ts`, `siteConfig` from `content/site.ts`, `<ServiceCard>` from Task 7.
- Produces: final homepage at `/`.

- [ ] **Step 1: Write `components/hero.tsx`**

Full-viewport-height hero with a background image (use `public/images/services/sprinkler/sprinkler-1.jpg`, the house-fire photo, dimmed with a dark overlay for text legibility — a strong, credibility-building opener for a safety/inspection company), `siteConfig.tagline` as the headline, a one-sentence sub-line, and a CTA button to `/kontakt-oss`.

- [ ] **Step 2: Rewrite `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/content/services";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold text-brand-slate">Våre tjenester</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
      {/* trust/credibility section: independence statement reused from Om oss,
          plus a CTA banner linking to /kontakt-oss */}
    </>
  );
}
```

Add the trust section using the same independence statement from Task 6 ("Vi er en uavhengig og nøytral leverandør...") and a closing CTA banner.

- [ ] **Step 3: Verify**

Run: `npm run dev`, visit `/`, confirm hero, 3 service cards, trust section, and CTA all render correctly at desktop and mobile widths (resize browser or use devtools device toolbar).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/hero.tsx
git commit -m "Build final front page"
```

---

### Task 12: SEO metadata, sitemap, and final QA pass

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

**Interfaces:**
- Produces: root `metadata` export in `app/layout.tsx` (site-wide title template `"%s | Teknisk Byggkontroll AS"`, default description using `siteConfig.tagline`), `app/sitemap.ts` exporting a `MetadataRoute.Sitemap` listing all static routes plus generated service/article slugs, `app/robots.ts` allowing all crawlers and pointing to the sitemap.

- [ ] **Step 1: Add root metadata to `app/layout.tsx`**

```ts
export const metadata: Metadata = {
  title: { default: "Teknisk Byggkontroll AS", template: "%s | Teknisk Byggkontroll AS" },
  description: siteConfig.tagline,
  metadataBase: new URL(siteConfig.url),
};
```

- [ ] **Step 2: Write `app/sitemap.ts`** listing `/`, `/om-oss`, `/tjenester`, each service slug under `/tjenester/`, `/artikler`, each article slug under `/artikler/`, `/kontakt-oss`.

- [ ] **Step 3: Write `app/robots.ts`** allowing all, referencing the sitemap.

- [ ] **Step 4: Full build verification**

Run: `npm run build`
Expected: exit code 0, no type errors, no lint errors, all static routes listed in the build output (11 total: `/`, `/om-oss`, `/tjenester`, 3× `/tjenester/[slug]`, `/artikler`, 6× `/artikler/[slug]`, `/kontakt-oss`, plus `/sitemap.xml`, `/robots.txt`).

- [ ] **Step 5: Manual visual QA**

Use the `run` skill to start the dev server and check every route in a browser at both a desktop (~1440px) and mobile (~390px) width: `/`, `/om-oss`, `/tjenester`, all 3 service pages, `/artikler`, at least 2 article pages, `/kontakt-oss` (including the form validation/success states from Task 9). Fix any visual regressions found before proceeding.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/sitemap.ts app/robots.ts
git commit -m "Add SEO metadata, sitemap, and robots.txt"
```

---

### Task 13: Push to GitHub

**Files:** none (repository operation only)

**Interfaces:** none

- [ ] **Step 1: Confirm active GitHub account**

Run: `gh auth status`
Expected: `TerjeFevaag` shows as the active account (already switched during brainstorming — re-run `gh auth switch --hostname github.com --user TerjeFevaag` if it has changed since).

- [ ] **Step 2: Create the GitHub repo**

```bash
gh repo create TerjeFevaag/tbk-as --private --source=. --remote=origin
```

- [ ] **Step 3: Push**

```bash
git push -u origin master
```

- [ ] **Step 4: Verify**

Run: `gh repo view TerjeFevaag/tbk-as --web=false`
Expected: repo details print with no error, confirming the push succeeded.

---

## Post-Plan (not part of this plan, user-owned)

- Import `TerjeFevaag/tbk-as` into Vercel and configure the `tbk-as.no` custom domain / DNS.
- Decide on and wire a real contact-form backend (replace the Task 9 stub).
