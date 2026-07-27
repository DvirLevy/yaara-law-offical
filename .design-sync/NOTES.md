# design-sync notes — yaara-law-tsx

## Repo shape

This repo is a single marketing website (Vite + React + TypeScript + Tailwind),
**not** a dedicated design-system package. `package.json` has no `main`/`module`/
`exports` field and no library build — `npm run build` (`tsc && vite build`)
produces the bundled *site*, not a component-per-export entry.

The synced "design system" is the small set of shadcn/ui primitives under
`src/components/ui/` (Button, Card family, Checkbox, Container, Dialog family,
Input, Label, SectionLabel/Title/Lede, Textarea) — 9 source files, 25 exported
components/sub-parts.

## How the entry was resolved (no library build)

`cfg.pkg = "yaara-law"` matches the repo's own `package.json` name (not a
published package). Since there is no `dist/index.*` entry, the build was run
with a **placeholder `--entry` path that doesn't exist**
(`./dist/ds-entry-placeholder.mjs`) purely so the converter's `PKG_DIR`
directory-walk lands on the repo root's `package.json` (which has a `name`
field) instead of trying — and failing — to read
`node_modules/yaara-law/package.json` (never installed, since this package is
never published). The build then falls into the documented **synth-entry
fallback**: `resolvePackage` sees no real dist entry and synthesizes one from
`cfg.srcDir` (`src/components/ui`) by re-exporting every `.tsx` file in it.

**On any re-sync, keep using this exact `--entry` flag** (or a similarly
nonexistent path under the repo) — omitting `--entry` makes the converter look
for `node_modules/yaara-law/package.json`, which doesn't exist, and the build
throws in `exportedNames`/`projectFor` before it even reaches shape detection.

## cssEntry

`cfg.cssEntry` points at `dist/assets/index-CiC0ipWh.css` — the **compiled**
Tailwind stylesheet, produced by `npm run build` (the real site build, not the
DS converter). This filename is content-hashed by Vite and **will change on
every `npm run build`** — before any re-sync, re-run `npm run build` and update
`cfg.cssEntry` to the new hashed filename under `dist/assets/`.

## Fonts

- `[FONT_MISSING]` fires for **"Inter" and "David Libre"** — these are
  **fallback stack entries only** (see `tailwind.config.ts`:
  `sans: ['Heebo', 'Inter', ...]`, `serif: ['"Frank Ruhl Libre"', '"David
  Libre"', 'serif']`). The site never actually loads them; they're pure CSS
  fallback keywords. **Accepted as-is** — no action needed, this is not a real
  gap.
- The two fonts the site **does** load — **Heebo** and **Frank Ruhl Libre** —
  are Google Fonts pulled via a `<link>` tag in `index.html`, not shipped in
  the repo. Declared via `cfg.runtimeFontPrefixes: ["Heebo", "Frank Ruhl
  Libre"]` so `[FONT_MISSING]` doesn't fire for them — any design built with
  this synced library should load them the same way (Google Fonts `<link>`,
  same family names/weights as in `index.html`).

## Grouping

All 25 components landed in the `general` group — the converter's group
heuristic derives group names from `src/` subdirectory names, but every
component here lives flat in `src/components/ui/` with no subfolders. Not
worth fixing via `cfg` for a set this small; a future re-sync could add
`componentSrcMap`-adjacent grouping if the primitive count grows.

## Dialog family — preview composition

`Dialog`, `DialogPortal`, `DialogOverlay`, `DialogClose`, `DialogTrigger`,
`DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`,
`DialogDescription` are all Radix-derived sub-parts of one compound component.
Each has its own authored preview file in `.design-sync/previews/`, but they
all re-export the **same** composition from
`.design-sync/previews/_shared/dialogDemo.tsx` (an open dialog styled like the
site's real `PrivacyModal.tsx`) — that's the only truthful render for a leaf
that only makes sense inside its parent. Configured with
`cfg.overrides.<Name>: {"cardMode": "single", "viewport": "560x420"}` for all
ten so the fixed-position overlay renders contained within its card instead of
escaping to the full page. Card family (`Card`, `CardHeader`, `CardTitle`,
`CardDescription`, `CardContent`, `CardFooter`) and Section family
(`SectionLabel`, `SectionTitle`, `SectionLede`) use the same shared-demo
pattern via `_shared/cardDemo.tsx` and `_shared/sectionDemo.tsx`.

## Re-sync risks

- **`cfg.cssEntry`'s hashed filename WILL go stale** the next time `npm run
  build` runs with any CSS-affecting change — re-verify/update it every
  re-sync (see "cssEntry" above).
- **The `--entry` placeholder path is a required workaround**, not a real
  file — don't "fix" it by pointing at something real; there is nothing real
  to point at without adding an actual library build to this repo.
- If this repo ever gains a real component-library build (separate `dist/`
  with `main`/`module`/`exports`), switch `cfg` back to normal dist-entry mode
  and drop the placeholder `--entry` and `srcDir` synth-fallback path — the
  `.d.ts` extraction will be meaningfully stronger from real shipped types.
- Preview content (Hebrew copy, Card/Dialog compositions) was authored from
  the live site's real components (`CtaCard.tsx`, `Contact.tsx`,
  `PrivacyModal.tsx`) at time of sync — if those components' copy or structure
  changes significantly, the previews will drift from what the site actually
  looks like (still valid previews, just no longer a mirror of current
  production copy).
