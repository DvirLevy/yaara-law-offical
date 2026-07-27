# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for Yaara Levy Law Office (React + Vite + TypeScript + Tailwind + shadcn/ui). Site content is in Hebrew (RTL); code/docs are in English.

## Commands

```bash
npm run dev         # dev server (no cloud config needed — see Content loading)
npm run build        # tsc typecheck + production build
npm run preview       # serve the production build locally
npm run test            # run vitest suite once
npm run test:watch       # vitest watch mode
```

Run a single test file: `npx vitest run src/test/components/Hero.test.tsx`

## Architecture

**Content is separate from components.** Every section's copy lives in `content/*.ts` as plain `key: value` objects (no JSX). These modules serve two roles: the TypeScript type source, and the offline/fallback copy. `src/lib/content.ts`'s `useContent<T>(key, fallback)` returns the bundled fallback synchronously when `VITE_CONTENT_BASE_URL` is unset (local dev), or fetches `${VITE_CONTENT_BASE_URL}/{key}.json` at runtime in production, caching per session and silently falling back to bundled copy on failure. `Areas`/`Testimonials` go through typed wrapper hooks (`useAreas()`/`useTestimonials()` in `src/data/`) instead, since those content files export `{ meta, items }` rather than a flat object. `content/privacy.ts` only holds the modal title/subtitle/button — the privacy policy's rich legal copy stays as structured JSX directly in `PrivacyModal.tsx`.

**Images go through one indirection point.** `src/config/media.ts` exports `s3(path)`, which builds every image URL from `VITE_S3_BASE_URL`. Images are hosted on S3 (`yaara-law-website` bucket) — there's no local `public/assets` copy anymore, so `VITE_S3_BASE_URL` must be set (including in local dev) for images to render. Never hardcode image paths — always go through `s3()`.

**Code splitting is deliberate, not automatic.** `Navbar`/`Hero` are static imports (above the fold). Every other section (`CtaCard`, `Pillars`, `About`, `Testimonials`, `Areas`, `Contact`, `Footer`, `PrivacyModal`, `WaFab`) is `React.lazy()`-loaded in `App.tsx`, each behind its own `<Suspense>`. `vite.config.ts` has a `manualChunks` function that explicitly names these components (`SECTION_COMPONENTS` array) so each gets its own chunk (`section-hero.js`, ...) and pins vendor code into `vendor-react` / `vendor-ui` shared chunks. When adding a new lazy section component, add its name to `SECTION_COMPONENTS` in `vite.config.ts` too.

**Images use `<LazyImage>`** (`src/components/LazyImage.tsx`), not raw `<img>` — defaults to `loading="lazy"` + `decoding="async"`; pass `priority` for above-the-fold images (hero photo, navbar logo, privacy-modal logo) to opt into eager/high-`fetchPriority` loading.

**Design tokens live only in `tailwind.config.ts`.** The site is single-theme (light only, RTL). A prior multi-palette (`elegant`/`bold`/`warm`) / dark-mode setup was removed as dead code — don't reintroduce `dark:` variants or a palette switcher; `html { color-scheme: light }` is pinned in `index.css` and `darkMode: ['class']` means dark styles can never trigger from OS/browser settings. `src/components/ui/` holds shadcn/ui primitives (Button, Input, Textarea, Label, Checkbox, Card, Dialog) plus site-specific `Container` and `SectionLabel`/`SectionTitle`/`SectionLede` — compose sections from these rather than repeating markup/CSS.

**Responsive via Tailwind's `max-lg:`/`max-sm:` breakpoints** (desktop-first: base styles are desktop, overrides apply going down), not the conventional mobile-first `sm:`/`lg:` upward pattern.

**Forms don't submit anywhere yet.** `CtaCard.tsx` and `Contact.tsx` show a success message on submit with no actual request sent. Wiring a backend (EmailJS, Resend, Formspree, etc.) means editing each component's `handleSubmit`.

**Tests live under `src/test/`, mirroring `src/`**: every `src/components/*.tsx` has a matching `src/test/components/*.test.tsx` (vitest + Testing Library + jsdom) verifying render, bundled fallback copy, and relevant interactive behavior. `src/test/App.test.tsx` is an integration smoke test (hero renders eagerly, a lazy section resolves via Suspense).

## Environment variables

`VITE_CONTENT_BASE_URL` is optional. `VITE_S3_BASE_URL` is now required (including in local dev) — images are S3-only, there's no bundled fallback copy.

| Variable | Used for | Unset behavior |
|---|---|---|
| `VITE_S3_BASE_URL` | Image host (S3) via `src/config/media.ts` | Images fail to load — no local fallback |
| `VITE_CONTENT_BASE_URL` | Section copy CDN via `src/lib/content.ts` | Falls back to bundled `content/*.ts` |
