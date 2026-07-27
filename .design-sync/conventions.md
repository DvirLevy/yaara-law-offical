## Using this library

This is the shared UI kit for **Yaara Levy Law Office** — a single-theme
(always light), RTL Hebrew marketing site. It ships 25 small components:
`Button`, the `Card` family (`Card`, `CardHeader`, `CardTitle`,
`CardDescription`, `CardContent`, `CardFooter`), `Checkbox`, `Container`, the
`Dialog` family (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`,
`DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`,
`DialogOverlay`, `DialogPortal`), `Input`, `Label`, the section-heading trio
(`SectionLabel`, `SectionTitle`, `SectionLede`), and `Textarea`.

**No provider or wrapper needed.** There is no ThemeProvider, no context root —
every component is self-contained and can be dropped in directly. `Dialog` is
a compound Radix primitive: `DialogTrigger`/`DialogContent`/etc. only render
meaningfully nested inside a `<Dialog>` root, same as any Radix dialog.

**No dark mode.** The site is permanently light — never reach for a `dark:`
variant or add a theme toggle; none of the tokens below have a dark
counterpart.

## The styling idiom: Tailwind utility classes, not CSS variables

Style by composing Tailwind utility classes from this project's own palette —
**not** generic Tailwind grays/blues, and not `var(--token)` custom
properties (this DS doesn't expose tokens that way; colors compile straight
into utility classes). Real, verified-present classes:

| Purpose | Classes |
|---|---|
| Primary brand red (buttons, active states, accents) | `bg-primary` / `text-primary` / `border-primary`, foreground text `text-primary-foreground` |
| Body text, page background | `text-foreground` on `bg-background` |
| Secondary / muted text | `text-ink-soft` (secondary copy), `text-ink-faint` (placeholders, faint labels) |
| Card / panel surfaces | `bg-card` (off-white panel), `shadow-card` / `shadow-card-lg` for elevation |
| Hairline borders/dividers | `border-hairline`, `border-border` |
| Page-width wrapper | `max-w-container` (1260px) — or just use the shipped `<Container>` component |
| Headings | `font-serif` (Frank Ruhl Libre — display/heading face) |
| Body copy | `font-sans` (Heebo — the default, usually omit it) |

Structural radius is **always `rounded-none`** (or omitted — square corners are
the brand look; don't add rounded corners). Buttons/inputs have no rounding
anywhere in the real site.

## Where the truth lives

Read `styles.css` (and its one `@import`, `_ds_bundle.css`) before styling
anything non-trivial — it's the actual compiled Tailwind output for this
project, so every class above (and everything not worth enumerating here:
spacing scale, `text-[…]` arbitrary sizes used throughout the real site,
`tracking-[…]` letter-spacing, etc.) is verifiable there. Per-component
`.prompt.md` files under `components/<group>/<Name>/` document each
component's actual prop surface.

## Fonts

Two families load via Google Fonts (not shipped as files — load the same way,
a `<link>` in `<head>`, matching weights 300–800): **Heebo** (`font-sans`,
default body) and **Frank Ruhl Libre** (`font-serif`, headings/display). Any
other names in the font stack (`Inter`, `David Libre`) are just fallback
keywords — never actually requested, not worth sourcing.

## A real composition

This is exactly how the site's own lead-capture card composes `Card` +
`Button` (ported from `CtaCard.tsx`):

```tsx
<Card className="max-w-md p-8">
  <CardHeader>
    <CardTitle className="text-xl">ייצוג דיירים בהתחדשות עירונית</CardTitle>
    <CardDescription>ליווי משפטי מלא לאורך כל הפרויקט.</CardDescription>
  </CardHeader>
  <CardContent className="mt-4">
    <p className="text-ink-soft">
      משרדנו מבטיח שהאינטרסים והזכויות שלכם נשמרים לאורך כל הדרך.
    </p>
  </CardContent>
  <CardFooter className="mt-6">
    <Button size="sm">קביעת פגישה</Button>
  </CardFooter>
</Card>
```

`Button` takes `variant` (`primary` | `ghost` | `link`) and `size` (`default` |
`sm` | `pill`) — sweep `variant` before reaching for a custom className.
