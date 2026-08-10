# tbk-as.no Next.js Rebuild — Design Spec

Date: 2026-08-11
Status: Approved

## Purpose

Replace the current WordPress site at tbk-as.no with a modern, professional, corporate
Next.js site for Teknisk Byggkontroll AS, a one-man technical building-inspection
company (Olav L. Strøm) based in Fiskum, serving the central Østlandet region of Norway.
The new site trims the service offering from 10 legacy services down to 3, and must not
look like a templated/AI-generated site — it should read as a boutique agency build.

## Source Material (in this folder)

- `Notes.txt` — brief from Terje (project lead / web consultant) to the builder.
- `Current Website/` — full WordPress page saves (HTML + assets) of the live site,
  used for content inventory, contact details, nav structure, and brand colors.
- `Teknisk Byggkontroll _ Info, images and text/` — new copy (2 Word docs) and photos
  for Innregulering and Sprinklerkontroll, plus Olav's portrait photo.
- These source folders are kept for reference but are **not** part of the Next.js
  project and are git-ignored.

## Content Scope

Pages (Norwegian/Bokmål only):

1. **Forside (Front page)** — hero, 3-service teaser grid, trust/credibility section,
   CTA to contact.
2. **Om oss (About)** — company description (from existing site copy) + Olav's
   portrait, contact block.
3. **Tjenester (Services overview)** — intro + links to the 3 service detail pages.
4. **Service detail pages** (3):
   - **Innregulering** (varme- og ventilasjonsanlegg) — full copy from
     `Innregulering varmeanlegg.docx`, images from `Innregulering*.jpg/png`.
   - **Uavhengig kontroll i byggesak** — copy from `Notes.txt` suggested text,
     images: styled placeholder blocks (no photos supplied yet).
   - **Sprinklerkontroll** — full copy from `Sprinklerkontroll.docx`, images from
     `Sprinkler 1-4.jpg` (note: `Sprinkler 1.jpg` is a dramatic house-fire photo, good
     for a hero/risk framing shot; verify the rest are contextually appropriate before
     placement).
5. **Artikler (Articles)** — archive + individual pages, migrating all 6 existing
   articles as-is (content extracted from the saved HTML in `Current Website/Articles/`):
   - Innregulering Varmeanlegg
   - Innregulering Ventilasjon
   - Leier du ut bolig?
   - Lekker boligen din varme?
   - Prosjektledelse Frydenhaug skole
   - Radonmåling i vinterhalvåret!
6. **Kontakt oss (Contact)** — contact details + styled contact form (UI only, no
   submit backend yet — see Contact Form below).

**Not migrated:** "Våre kunder" page (not in the requested page list, no real
client content in the source), and all 8 dropped legacy services (Energimerking,
Funksjonskontroll VVS, Inneklimaanalyse, Radonkontroll-as-a-service [article stays,
service page doesn't], Termografi og trykktesting, Prosjektledelse VVS-as-a-service
[article stays], ITB Koordinator, Enova Søknader).

## Brand

- **Logo**: swirl mark (orange/red gradient) + "TEKNISK BYGGKONTROLL" wordmark in a
  small-caps serif-ish sans. Source is a low-res PNG
  (`Current Website/*_files/teknisk_logo.png`); recreate as a clean SVG for crisp
  rendering at all sizes.
- **Colors** (extracted from the live site's CSS):
  - Primary/accent orange: `#ef7c2f` (secondary tint `#e98a2f`)
  - Secondary/dark slate: `#4b5766`
  - Warm gray (body text/muted): `#6b6969`
  - Light background gray: `#eaedf1`
  - Error/destructive: `#b30000`
- **Contact details** (must appear in footer + Contact page + About page):
  - Teknisk Byggkontroll AS
  - Havnehagan 22, 3322 Fiskum
  - Tlf: 948 51 228
  - E-post: olav@tbk-as.no
  - Org.nr.: 914 217 288 MVA
  - Konto nr.: 2480 10 80185

## Visual Direction

Modern corporate redesign — not a close copy of the old Bootstrap/WordPress layout.
Editorial typography, generous whitespace, full-bleed real photography (from the
supplied images), subtle scroll-triggered motion, no stock icon clutter. Design
details (exact type pairing, spacing scale, component styling) to be finalized during
implementation using the `frontend-design` skill so the result reads as intentional
and bespoke rather than a generic template.

## Technical Approach

- **Framework**: Next.js 15 (App Router), TypeScript, Tailwind CSS.
- **Content**: hardcoded typed TS data modules (e.g. `content/services.ts`,
  `content/articles.ts`, `content/site.ts` for brand/contact constants) — no CMS.
  Chosen for build speed; structured so a CMS could be layered on later if needed.
- **Images**: `next/image`, assets copied/optimized from source folders into
  `public/images/`.
- **Fonts**: self-hosted via `next/font`.
- **Contact form**: client-side validated UI component; submit handler is a stubbed
  no-op with a `// TODO` marking where a real backend (e.g. Resend) gets wired in
  later. Not part of this build.
- **SEO**: per-page metadata, Olav's portrait used on About + linked from relevant
  service pages for E-E-A-T/trust signals.

## Repository & Deployment

- New **private** GitHub repo: `TerjeFevaag/tbk-as`.
- Local reference folders (`Current Website/`, `Teknisk Byggkontroll _ Info, images and
  text/`, the `.zip`) stay on disk but are git-ignored — not pushed to the repo.
- Deployment: push to GitHub, import into Vercel manually (user-owned step, not part
  of this build). Vercel project creation and DNS cutover for tbk-as.no are explicitly
  out of scope.

## Out of Scope

- CMS integration
- Working contact-form backend/email delivery
- English translation / i18n
- "Våre kunder" page
- Vercel project setup and domain DNS cutover
- AI-generated imagery for the Uavhengig kontroll page (using placeholders instead)

## Testing

- `next build` must pass with no type errors before considering the build done.
- Manual visual QA of all pages at desktop + mobile breakpoints via the `run` skill
  (start dev server, view in browser) before marking complete.
