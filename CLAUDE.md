# CLAUDE.md — tbk-as.no Rebuild

This file orients any Claude Code session working in this folder. Read this first.

## What this project is

Rebuilding **tbk-as.no**, the website of **Teknisk Byggkontroll AS**, a one-man
technical building-inspection company run by **Olav L. Strøm** in Fiskum, Norway
(serving the central Østlandet region), as a modern Next.js site. The old site is
WordPress; this rebuild is a clean Next.js app pushed to GitHub and deployed on
Vercel.

The full design decisions and rationale live in:
- **Spec:** `docs/superpowers/specs/2026-08-11-tbk-as-nextjs-design.md`
- **Implementation plan:** `docs/superpowers/plans/2026-08-11-tbk-as-nextjs-rebuild.md`

**Start any implementation work by reading the plan and executing it task-by-task**
(it names its own required execution skill at the top —
`superpowers:subagent-driven-development` or `superpowers:executing-plans`). Don't
re-derive the design from scratch; it's already decided and approved.

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

- Logo: swirl mark + "TEKNISK BYGGKONTROLL" wordmark, recreated as `public/images/logo.svg`.
- Colors: primary orange `#ef7c2f`, accent tint `#e98a2f`, secondary slate `#4b5766`,
  muted gray `#6b6969`, background gray `#eaedf1`, error `#b30000`.
- Contact block (verbatim, must match everywhere it appears):
  Teknisk Byggkontroll AS · Havnehagan 22, 3322 Fiskum · Tlf: 948 51 228 ·
  E-post: olav@tbk-as.no · Org.nr.: 914 217 288 MVA · Konto nr.: 2480 10 80185

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
  gradient placeholder built in the plan (Task 8), not AI-generated images (that
  option was explicitly declined) and not stock photography pulled from the internet.
- Vercel project setup and `tbk-as.no` DNS cutover are **out of scope** — the user
  handles that themselves once the repo is ready.

## Git / GitHub

- Repo: **`TerjeFevaag/tbk-as`** (private). The `gh` CLI has multiple accounts
  authenticated on this machine (`abdullahshekha`, `TerjeFevaag`, `workagentic`) —
  confirm `gh auth status` shows `TerjeFevaag` as active before creating/pushing to
  the repo; switch with `gh auth switch --hostname github.com --user TerjeFevaag`
  if needed.
- `.gitignore` already excludes the reference source folders and the zip — don't
  remove those entries.

## Design quality bar

The user's explicit requirement: **this must not look like a templated/AI-made
site.** Use the `frontend-design` skill during any layout/styling work for
typography, spacing, and motion decisions. Reference photography that's actually
available (`Teknisk Byggkontroll _ Info, images and text/`) rather than generic
stock imagery or obvious placeholder gradients wherever a real photo exists.

## Verification

There's no unit test suite (static content site, no business logic to unit test).
"Done" means: `npm run build` passes cleanly (no type or lint errors), and every
route has been visually checked in a browser at both desktop and mobile widths
(use the `run` skill to launch the dev server) — per Task 12 of the plan.
