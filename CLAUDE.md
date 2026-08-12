# CLAUDE.md — tbk-as.no Rebuild

This file orients any Claude Code session working in this folder. Read this first.

## What this project is

**tbk-as.no**, the website of **Teknisk Byggkontroll AS**, a one-man technical
building-inspection company run by **Olav L. Strøm** in Fiskum, Norway (serving
the central Østlandet region), rebuilt as a Next.js site. The old site was
WordPress; this is a clean Next.js app pushed to GitHub (`TerjeFevaag/tbk-as`,
`master`), ready for Vercel.

**Status: the initial rebuild is complete and merged to `master`.** All 13 tasks
from the implementation plan below have shipped, plus several rounds of
client-requested follow-up changes (logo swap, nav dropdown, footer credit,
image-to-page reconciliation, SEO/EEAT pass, restoring the homepage's
"Kontroll på energi og inneklima" and "Artikler" sections that the initial
rebuild had dropped — see git log for the full history). This file now
documents the site as it actually is; treat it as the source of truth over the
plan/spec docs where they've diverged.

The original design decisions and rationale (still useful for *why*, even
though the build is done) live in:
- **Spec:** `docs/superpowers/specs/2026-08-11-tbk-as-nextjs-design.md`
- **Implementation plan:** `docs/superpowers/plans/2026-08-11-tbk-as-nextjs-rebuild.md`

New work on this project is incremental (bug fixes, small features, content
tweaks) — there's no need to re-run the plan task-by-task. Use your judgment on
whether a change warrants an isolated worktree (this repo's convention so far:
yes, for anything more than a one-line fix — see Git / GitHub below).

## Folder layout

- `app/`, `components/`, `content/`, `public/` — the Next.js project (created by the plan).
- `docs/superpowers/` — spec and plan docs.
- `Current Website/` — **reference only**, a full WordPress page export of the live
  site (HTML + assets). Used to extract exact copy, contact details, nav structure,
  and brand colors. Git-ignored, never copy this folder's HTML/CSS/JS into the new
  site — only reuse the text/image content it documents.
- `Teknisk Byggkontroll _ Info, images and text/` — **reference only**, new copy
  (2 Word docs: Innregulering varmeanlegg, Sprinklerkontroll) and photos supplied
  directly by Olav for the rebuild. Git-ignored.
- `Teknisk Byggkontroll _ Info, images and text.zip` — zipped duplicate of the above
  folder. Git-ignored, ignore it.
- `Notes.txt` — the original brief from Terje Fevåg (project lead / web consultant)
  describing what changed (3 services instead of 10, which pages to keep, suggested
  copy for the Uavhengig kontroll page). Git-ignored but keep reading it if anything
  in the spec seems ambiguous — it's the ground truth for intent.

## Brand quick reference

- Logo: the client's real logo file, `public/images/logo.png` (swirl mark +
  "TEKNISK BYGGKONTROLL" wordmark). An earlier hand-drawn SVG approximation was
  replaced with this actual file — don't regenerate a vector version unless asked.
  Displayed at `h-[54px]` in the header (deliberately 1.5x the original size, per
  a direct request — don't "fix" this back down without checking first).
- Colors: primary orange `#ef7c2f`, accent tint `#e98a2f`, secondary slate `#4b5766`,
  muted gray `#6b6969`, background gray `#eaedf1`, error `#b30000`.
- Contact block (verbatim, must match everywhere it appears):
  Teknisk Byggkontroll AS · Havnehagan 22, 3322 Fiskum · Tlf: 948 51 228 ·
  E-post: olav@tbk-as.no · Org.nr.: 914 217 288 MVA · Konto nr.: 2480 10 80185
- Footer includes a web-design credit — "Nettside: Fevaag Web Consulting" linking
  to `http://fevaag.no/` — required, don't remove it.
- Main nav: "Tjenester" shows the 3 services as a dropdown (hover/focus on
  desktop, tap-to-expand accordion on mobile) — see `components/site-header.tsx`.

## Homepage structure

`app/page.tsx` sections, top to bottom — keep this order, all of it was
restored from the old site's homepage after an earlier rebuild pass dropped
two of them:

1. `Hero`
2. Tjenester (service cards)
3. "Kontroll på energi og inneklima" — photo + copy block on the company's
   energi/inneklima expertise, reusing `innregulering-1.png`.
4. "Uavhengig og nøytral" quote band (`bg-brand-bg`)
5. "Artikler" — latest 3 articles (`ArticleCard`, sorted by `publishedAt`
   desc) plus a "Se alle artikler" link to `/artikler`.
6. Closing contact CTA band (`bg-brand-slate`)

## Scope guardrails (don't relitigate these — they were explicitly decided)

- **3 services only**: Innregulering, Uavhengig kontroll i byggesak, Sprinklerkontroll.
  The old site's other 8 service pages (Energimerking, Funksjonskontroll VVS,
  Inneklimaanalyse, Radonkontroll-as-a-service, Termografi og trykktesting,
  Prosjektledelse VVS-as-a-service, ITB Koordinator, Enova Søknader) are **not**
  being rebuilt as service pages.
- **No "Våre kunder" page** — dropped, not in scope.
- **Norwegian only** — no i18n, no English version.
- **No CMS** — content is hardcoded in typed TS modules under `content/`. This was
  an explicit choice for build speed over editability; don't introduce a CMS
  without asking first.
- **Contact form has no backend** — it's a fully-styled, client-validated stub.
  Submitting it just shows a success message; no email is actually sent. There's a
  `// TODO(contact-backend):` marker at the wiring point. Don't silently "finish" this
  by picking a backend — that's an explicit follow-up decision for later.
- **6 old articles are migrated as-is**, even ones about now-dropped services
  (e.g. Radonmåling) — this was a deliberate choice (SEO/history continuity), not
  an oversight.
- **Uavhengig kontroll i byggesak page has no real photos** — use the styled
  gradient placeholder (`components/service-hero-placeholder.tsx`), not
  AI-generated images (that option was explicitly declined) and not stock
  photography pulled from the internet.
- **Client-supplied images are matched to pages by what they actually depict**,
  not just by folder/filename guesswork — verified during a follow-up pass:
  - The two "Innregulering vent*" photos (air-balancing flow hoods) depict
    *ventilation* work, not heating — they live on the `innregulering-ventilasjon`
    **article** (`content/articles.ts`), not the `innregulering` **service**
    (which only covers varme/kjøle per the scope decision above).
  - `Innregulering vent 3.png` (a flat vector illustration of two workers and
    ductwork) was excluded entirely — it reads as AI-generated/synthetic, not a
    real photo, and this site's rule is real photos only.
- **Two articles use old low-quality images by explicit client override** of the
  real-photos-only rule, not an oversight: `innregulering-varmeanlegg`'s cover is
  a clip-art heating-balancing diagram, and `radonmaling-vinterhalvaret`'s cover
  is a cartoon shaking-house icon (both sourced from the old WordPress export).
  Both were flagged to the user as sub-real-photo quality before being added
  back — if this comes up again, don't silently swap them for something else.
  Two other gaps remain unresolved because no source image exists at all: the
  `leier-du-ut-bolig` article and the `uavhengig-kontroll-i-byggesak` service
  (still on the gradient placeholder) — ask the user for real photos from Olav
  before adding anything there.
- Vercel project setup and `tbk-as.no` DNS cutover are **out of scope** — the user
  handles that themselves once the repo is ready.

## Git / GitHub

- Repo: **`TerjeFevaag/tbk-as`** (private), already created and pushed —
  `master` tracks `origin/master`. The `gh` CLI has multiple accounts
  authenticated on this machine (`abdullahshekha`, `TerjeFevaag`, `workagentic`) —
  confirm `gh auth status` shows `TerjeFevaag` as active before pushing; switch
  with `gh auth switch --hostname github.com --user TerjeFevaag` if needed.
- `.gitignore` already excludes the reference source folders and the zip — don't
  remove those entries.
- Working convention so far: non-trivial changes happen in an isolated worktree
  (`.claude/worktrees/<name>`, via the harness's worktree tool), then merged
  locally to `master` and pushed once verified — not left as open PRs. Small,
  clearly-scoped fixes (e.g. a one-line style tweak) have been made directly on
  `master`. Use judgment; ask if unsure which fits.
- `CLAUDE.md` itself gets an auto-generated `<!-- BEGIN:nextjs-agent-rules -->`
  block re-appended by `next dev` (see bottom of this file) — this is expected,
  not a stray edit. Attempts to commit changes to `CLAUDE.md` may get blocked by
  a permission classifier; that's a harness restriction on this specific file,
  not a project rule.

## Design quality bar

The user's explicit requirement: **this must not look like a templated/AI-made
site.** Use the `frontend-design` skill during any layout/styling work for
typography, spacing, and motion decisions. Reference photography that's actually
available (`Teknisk Byggkontroll _ Info, images and text/`) rather than generic
stock imagery or obvious placeholder gradients wherever a real photo exists.

Service detail pages (`app/tjenester/[slug]/page.tsx`) follow a specific
structure, added after the user called the original single-column layout
"boring" — don't regress it back to plain stacked paragraphs:
- Content column is `max-w-6xl`, matching the header nav's width (it was
  previously a narrower `max-w-3xl` and looked inconsistent — this was a
  reported bug, not a style choice).
- A sticky sidebar (desktop) with a quick-facts card, an auto-generated
  in-page table of contents, and a contact CTA card.
- A `Service.stat` callout (a striking figure pulled from real copy, not
  invented) and `Service.quickFacts` (short scannable facts) in
  `content/services.ts` feed this — populate them for any new service.
- `bullets[].style: "steps"` renders a numbered sequence — use it only for a
  genuinely ordered process (there's exactly one today: "Hvordan gjennomføres
  kontrollen?"). Everything else renders as check-icon bullets.

## SEO / E-E-A-T

- `app/layout.tsx` emits sitewide `LocalBusiness` JSON-LD; service/article
  detail pages emit their own `Service`/`Article` JSON-LD.
- Article pages carry a visible byline ("Skrevet av Olav L. Strøm, uavhengig
  kontrollør...") for E-E-A-T — keep this if articles are edited or added.
- Every page sets an explicit `alternates.canonical`. Keep this pattern for any
  new route.

## Verification

There's no unit test suite (static content site, no business logic to unit test).
"Done" means: `npm run build` passes cleanly (no type or lint errors), and every
route has been visually checked in a browser at both desktop and mobile widths
(use the `run` skill to launch the dev server) — per Task 12 of the plan.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
