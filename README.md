# YL Law — React + Vite + TypeScript + Tailwind + shadcn/ui

Website for Yaara Levy Law Office. Site content is in Hebrew (RTL); this
README is in English for the dev team.

---

## Install & run

```bash
npm install
cp .env.example .env   # optional locally — see "Environment variables" below
npm run dev             # dev server
npm run build            # type-check + production build
npm run preview          # serve the production build locally
npm run test              # run the vitest suite once
npm run test:watch         # vitest in watch mode
```

---

## Project structure

```
content/                     # ← EDIT COPY HERE. Also the TS type source
├── navbar.ts, hero.ts, cta.ts, pillars.ts, about.ts, footer.ts, privacy.ts
├── testimonials.ts          # meta + all testimonial entries
└── areas.ts                 # meta + all 9 practice areas

src/
├── main.tsx, App.tsx, index.css
├── vite-env.d.ts            # import.meta.env typings (VITE_S3_BASE_URL, VITE_CONTENT_BASE_URL)
├── lib/
│   ├── content.ts           # useContent() — runtime content loader, see below
│   └── utils.ts             # cn() class-merge helper (shadcn convention)
├── config/
│   └── media.ts             # S3_BASE_URL + s3() helper for all image URLs
├── components/
│   ├── ui/                  # shadcn/ui primitives: button, input, textarea,
│   │                          label, checkbox, card, dialog, container,
│   │                          section-heading — the design system building
│   │                          blocks every section is composed from
│   ├── LazyImage.tsx        # <img> wrapper: lazy-loading + async decode by default
│   ├── Navbar.tsx / Hero.tsx        # static imports — above the fold
│   └── CtaCard.tsx / Pillars.tsx / About.tsx / Testimonials.tsx /
│       Areas.tsx / Contact.tsx / Footer.tsx / PrivacyModal.tsx / WaFab.tsx
│       # React.lazy()-loaded from App.tsx — each gets its own build chunk
├── data/
│   ├── testimonials.ts      # useTestimonials() — typed wrapper over useContent()
│   └── areas.ts             # useAreas() — typed wrapper over useContent()
└── test/
    ├── App.test.tsx
    └── components/          # one *.test.tsx per src/components/*.tsx
```

Every section component has a matching `*.test.tsx` under `src/test/components/`, mirroring `src/components/`.

---

## Editing site copy

Every section's text lives in a small TypeScript module under `content/`,
each exporting a plain object (or array, for repeated items like pillars,
practice areas, testimonials) of `key: value` string pairs — no JSX, no
markup, just data.

```ts
// content/hero.ts
export default {
  eyebrow_line1: "מחפשים ייצוג מקצועי שישמור על האינטרסים שלכם",
  eyebrow_line2_bold: "בפרויקטי התחדשות עירונית?",
  firm_label: "משרד עורכי דין",
  name: "יערה לוי",
  badge: "ייצוג דיירים · התחדשות עירונית",
}
```

These modules serve **two** purposes now — the TypeScript type source, *and*
the fallback/offline copy (see "Content loading" below). Edit them locally
and they still work with no cloud configured at all.

The privacy-policy body text (headings, paragraphs, legal lists) stays as
structured JSX in `PrivacyModal.tsx` rather than a content module — flattening
rich, multi-level legal copy into key/value pairs would be fragile. Edit it
directly there; `content/privacy.ts` only holds the modal title/subtitle/button.

---

## Content loading — runtime fetch in production, static in dev

`src/lib/content.ts` exports `useContent<T>(key, fallback)`:

- **Local dev / `VITE_CONTENT_BASE_URL` unset** — returns `fallback` (the
  bundled `content/*.ts` value) synchronously. No network request, no cloud
  dependency to run `npm run dev`.
- **Built bundle with `VITE_CONTENT_BASE_URL` set** — fetches
  `${VITE_CONTENT_BASE_URL}/{key}.json` once at runtime, caches it in memory
  for the session, and silently keeps showing the bundled fallback if the
  fetch fails or hasn't resolved yet.

Every section component calls it with its own key, e.g. `Hero.tsx`:

```ts
const t = useContent('hero', heroFallback)
```

`Areas` and `Testimonials` go through typed wrapper hooks instead
(`useAreas()` / `useTestimonials()` in `src/data/`) since their content
files export a `{ meta, items }` shape rather than a flat object.

To wire up the CDN, upload one JSON file per `content/*.ts` module (`hero.json`,
`about.json`, `areas.json` with `{ meta, items }`, ...) to the URL in
`VITE_CONTENT_BASE_URL`, keeping the same keys as the TS fallback.

---

## Images — served from S3

`src/config/media.ts` builds every image URL from one base:

```ts
const S3_BASE_URL = import.meta.env.VITE_S3_BASE_URL || '/assets'
export const s3 = (path: string) => `${S3_BASE_URL}/${path}`
```

There's no local `public/assets` copy anymore, so the `/assets` fallback
above is currently dead — `VITE_S3_BASE_URL` must be set (including in local
dev) or images won't load. Set your bucket / CloudFront domain in `.env`:

```
VITE_S3_BASE_URL=https://yaara-law-website.s3.eu-north-1.amazonaws.com
```

Upload these files to that bucket, preserving the names used in components:
```
logo-transparent.png
yaara-cutout.png
yaara-portrait.jpg
```

---

## Environment variables

See `.env.example`. `VITE_CONTENT_BASE_URL` is optional — the app runs fully
offline for copy with it unset. `VITE_S3_BASE_URL` is now required
(including in local dev): there's no bundled image fallback.

| Variable | Used for | Unset behavior |
|---|---|---|
| `VITE_S3_BASE_URL` | Image host (S3) | Images fail to load — no local fallback |
| `VITE_CONTENT_BASE_URL` | Section copy CDN/API | Falls back to bundled `content/*.ts` |

---

## Lazy loading & code splitting

**Images** — every image goes through `<LazyImage>` (`src/components/LazyImage.tsx`),
a thin `<img>` wrapper defaulting to `loading="lazy"` + `decoding="async"`.
Above-the-fold images (hero photo, navbar logo, privacy-modal logo) pass
`priority` to opt back into eager, high-`fetchPriority` loading.

**Components** — `Navbar` and `Hero` are static imports (above the fold, no
loading flash on first paint). Every other section
(`CtaCard`/`Pillars`/`About`/`Testimonials`/`Areas`/`Contact`/`Footer`/
`PrivacyModal`/`WaFab`) is `React.lazy()`-loaded in `App.tsx` behind its own
`<Suspense>` boundary, so the page's initial JS payload only includes what's
needed for first paint.

`vite.config.ts` pairs this with an explicit `manualChunks` function: every
lazy section gets its own named chunk (`section-hero.js`, `section-about.js`,
...) and vendor code is split into `vendor-react` (React/ReactDOM) and
`vendor-ui` (Radix primitives, lucide-react, cva, tailwind-merge, clsx) so
sections share vendor code instead of duplicating it. Verified with
`npm run build`:

```
dist/assets/section-hero-*.js
dist/assets/section-about-*.js
dist/assets/section-contact-*.js
... (one per lazy section)
dist/assets/vendor-react-*.js
dist/assets/vendor-ui-*.js
```

---

## Design system — Tailwind + shadcn/ui

`tailwind.config.ts` is the single source of truth for design tokens (colors,
fonts, shadows, radii, marquee/pulse keyframes) — lifted 1:1 from the site's
one and only visual theme. `src/components/ui/` holds the shadcn/ui
primitives (Button, Input, Textarea, Label, Checkbox, Card, Dialog) plus two
site-specific building blocks, `Container` and `SectionLabel`/`SectionTitle`/
`SectionLede`, that every section composes from instead of repeating
markup/CSS.

**Always light theme.** The original prototype shipped three interchangeable
palettes (`elegant`/`bold`/`warm`) behind a `data-direction` attribute, but
nothing in the UI ever let a visitor switch between them — it was hardcoded
to `elegant`. That dead-code path (and the dark `bold` palette) has been
removed; `tailwind.config.ts` only encodes the one light palette the site
actually ships. `html { color-scheme: light }` is pinned in `index.css`, no
`dark:` Tailwind variants are used anywhere, and `darkMode: ['class']` means
even an accidental `dark:` utility would never be triggered by the visitor's
OS/browser dark-mode setting — only by a literal `dark` class, which nothing
in the app ever adds.

**Fully responsive.** Every section was rebuilt mobile-first with Tailwind's
`max-lg:`/`max-sm:` breakpoints (desktop styles are the default; overrides
apply going down), covering phone, tablet and desktop.

---

## Forms

Both forms (`CtaCard.tsx`, `Contact.tsx`) currently just show a success
message — no request is actually sent. Wire up a real backend (EmailJS,
Resend, Formspree, etc.) inside each component's `handleSubmit`.

---

## Testing

`vitest` + `@testing-library/react` + `jsdom`. Every component in
`src/components/` has a matching `*.test.tsx` under `src/test/components/`
covering: it renders, its bundled fallback copy appears, and (where relevant)
its interactive/anchor behavior — e.g. `CtaCard` opens the privacy modal,
`PrivacyModal` mounts only when `open`, `LazyImage` toggles
`loading`/`fetchpriority` correctly. `src/test/App.test.tsx` is an
integration smoke test asserting the hero renders eagerly and a lazy-loaded
section (Footer) resolves via `Suspense`.

```bash
npm run test
```

---

## Stack

- **React 18** + **TypeScript**
- **Vite 5** — `manualChunks` per section, see "Lazy loading & code splitting"
- **Tailwind CSS 3** + **shadcn/ui** (Radix primitives + `class-variance-authority`)
- **Vitest** + **Testing Library**
- **Heebo** + **Frank Ruhl Libre** (Google Fonts)
- Images: S3/CloudFront via `VITE_S3_BASE_URL` (falls back to `public/assets`)
- Copy: runtime-fetched via `VITE_CONTENT_BASE_URL` in production, static
  `content/*.ts` in dev (see "Content loading")
